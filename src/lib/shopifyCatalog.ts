import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { MerchCategory, MerchProduct } from "@/data/merchStore";
import { merchCategoryMeta, shopifyStoreConfig } from "@/data/merchStore";
import {
  isMissingStorefrontProductResponse,
  isPublishedStorefrontProduct,
} from "@/lib/shopCatalogRules";
import {
  parseProductCartOptions,
  type ProductCartOptions,
  type ShopifyRawVariant,
} from "@/lib/shopifyProductDetails";

const PAGE_LIMIT = 250;
const MAX_PAGES = 20;
const SHOPIFY_PRODUCTS_PATH = "/products.json";
const WAG_FRIDAY_PRODUCTS_PATH =
  "/collections/black-friday-wag-sale/products.json";

/**
 * Homepage merch strip only. /shop renders this catalog uncached so a Shopify
 * price edit is on the next page view. The previous 10-minute page cache was
 * serving stale prices until a later visitor triggered regeneration.
 */
export const SHOPIFY_CATALOG_REVALIDATE_SECONDS = 60;

const CATEGORY_ORDER: MerchCategory[] = [
  "pet_accessories",
  "drinkware",
  "stickers",
  "apparel",
  "bags",
  "other",
];

type ShopifyApiProduct = {
  id: number;
  title: string;
  handle: string;
  published_at?: string | null;
  body_html?: string;
  product_type?: string;
  /** List feed returns an array. The single-product feed returns a comma-separated string. */
  tags?: string[] | string;
  options?: { name: string; values: string[] }[];
  images?: { src: string; alt?: string | null }[];
  variants?: ShopifyRawVariant[];
};

export type MerchCategoryGroup = {
  category: MerchCategory;
  label: string;
  description: string;
  products: MerchProduct[];
};

export type ShopifyCatalogResult = {
  products: MerchProduct[];
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  error?: string;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function cleanListingDescription(html: string): string {
  return stripHtml(html)
    .replace(/DRAFT\s*[—-]\s*pending review\.?\s*/gi, "")
    .replace(/Not yet published\.?\s*/gi, "")
    .trim();
}

function tagText(tags: ShopifyApiProduct["tags"]): string {
  if (Array.isArray(tags)) return tags.join(" ");
  return tags ?? "";
}

function getMerchCategory(product: ShopifyApiProduct): MerchCategory {
  const type = (product.product_type ?? "").toLowerCase();
  const title = product.title.toLowerCase();
  const tags = tagText(product.tags).toLowerCase();

  if (
    type === "pets" ||
    /bandana|collar|leash|bowl|pet tag|feeding mat|pet bed|pet tank|trucker hat/.test(
      `${title} ${tags}`,
    )
  ) {
    return "pet_accessories";
  }
  if (type === "hoodie" || type === "sweatshirt" || type === "t-shirt") {
    return "apparel";
  }
  if (type === "bags") return "bags";
  if (type === "mug") return "drinkware";
  if (type === "paper products" || title.includes("sticker")) return "stickers";
  return "other";
}

function formatPrice(amount: string): string {
  const n = Number(amount);
  if (Number.isNaN(n)) return amount;
  return `$${n.toFixed(2)}`;
}

function variantNote(product: ShopifyApiProduct): string | undefined {
  const colors = new Set<string>();
  const sizes = new Set<string>();
  for (const v of product.variants ?? []) {
    if (v.option1 && v.option1 !== "Default Title") colors.add(v.option1);
    if (v.option2) sizes.add(v.option2);
  }
  const parts: string[] = [];
  if (colors.size) parts.push([...colors].slice(0, 6).join(", "));
  if (sizes.size) parts.push([...sizes].join(", "));
  return parts.length ? parts.join(" · ") : undefined;
}

function mapProduct(
  product: ShopifyApiProduct,
  cartOptionsByHandle: Record<string, ProductCartOptions>,
  descriptionLimit = 220,
): MerchProduct | null {
  const storefront = shopifyStoreConfig.storefrontUrl;
  if (!storefront || !isPublishedStorefrontProduct(product)) return null;

  const image = product.images?.[0];
  const imageSrc = image?.src?.startsWith("//")
    ? `https:${image.src}`
    : image?.src;
  const variant =
    product.variants?.find((v) => v.available !== false) ?? product.variants?.[0];

  const optionNames = {
    option1: product.options?.[0]?.name,
    option2: product.options?.[1]?.name,
  };
  const cartOptions = parseProductCartOptions(
    product.handle,
    product.variants ?? [],
    optionNames,
  );
  cartOptionsByHandle[product.handle] = cartOptions;

  const description = cleanListingDescription(product.body_html ?? "");
  const shortDescription =
    description.length > descriptionLimit
      ? `${description.slice(0, descriptionLimit - 1).trim()}…`
      : description;

  return {
    id: `shopify-${product.id}`,
    name: product.title,
    slug: product.handle,
    description: shortDescription || product.title,
    image: imageSrc
      ? {
          src: imageSrc,
          alt: image?.alt?.trim() || product.title,
        }
      : undefined,
    price: variant?.price ? formatPrice(variant.price) : undefined,
    sizesOrColorsNote: variantNote(product),
    shopifyProductUrl: `${storefront}/products/${product.handle}`,
    availability: "available",
    category: getMerchCategory(product),
    supportsLocalCart: cartOptions.supportsLocalCart,
    cartOption1Label: cartOptions.option1Label,
    cartOption1Values: cartOptions.option1Values,
    cartOption2Label: cartOptions.option2Label,
    cartOption2Values: cartOptions.option2Values,
  };
}

function sortProducts(products: MerchProduct[]): MerchProduct[] {
  return [...products].sort((a, b) => {
    const typeOrder = (name: string) => {
      const t = name.toLowerCase();
      if (t.includes("bandana") || t.includes("collar")) return 0;
      if (t.includes("bowl") || t.includes("mat") || t.includes("leash")) return 1;
      if (t.includes("hoodie")) return 2;
      if (t.includes("crewneck") || t.includes("sweatshirt")) return 3;
      if (t.includes("tote")) return 4;
      if (t.includes("mug")) return 5;
      if (t.includes("sticker")) return 6;
      return 7;
    };
    const ta = typeOrder(a.name);
    const tb = typeOrder(b.name);
    if (ta !== tb) return ta - tb;
    return a.name.localeCompare(b.name);
  });
}

function shopifyJsonUrl(pathname: string, page: number): string {
  const url = new URL(pathname, shopifyStoreConfig.storefrontUrl);
  url.searchParams.set("limit", String(PAGE_LIMIT));
  url.searchParams.set("page", String(page));
  return url.toString();
}

/**
 * Public Online Store feed. Drafts are absent. `published_at` is checked
 * again so an unpublished row cannot slip through if the payload changes.
 */
async function fetchProductPages(pathname: string): Promise<ShopifyApiProduct[]> {
  const products: ShopifyApiProduct[] = [];
  const seen = new Set<number>();

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const res = await fetch(shopifyJsonUrl(pathname, page), { cache: "no-store" });
    if (!res.ok) {
      if (page === 1) {
        throw new Error(`Shopify catalog request failed (${res.status})`);
      }
      break;
    }

    const data = (await res.json()) as { products?: ShopifyApiProduct[] };
    const batch = data.products ?? [];
    let added = 0;
    for (const product of batch) {
      if (seen.has(product.id)) continue;
      seen.add(product.id);
      if (!isPublishedStorefrontProduct(product)) continue;
      products.push(product);
      added += 1;
    }
    if (batch.length < PAGE_LIMIT || added === 0) break;
  }

  return products;
}

async function fetchFreshShopifyCatalog(): Promise<ShopifyCatalogResult> {
  const cartOptionsByHandle: Record<string, ProductCartOptions> = {};

  try {
    const raw = await fetchProductPages(SHOPIFY_PRODUCTS_PATH);
    const mapped = raw
      .map((product) => mapProduct(product, cartOptionsByHandle))
      .filter((product): product is MerchProduct => product !== null);

    return {
      products: sortProducts(mapped),
      cartOptionsByHandle,
    };
  } catch {
    return {
      products: [],
      cartOptionsByHandle,
      error: "Shopify catalog request failed.",
    };
  }
}

/**
 * Uncached catalog for /shop and product pages. `cache: "no-store"` opts those
 * routes into dynamic rendering, so the HTML is not the stale ISR snapshot
 * that was still showing the old Printify prices.
 */
export const fetchShopifyCatalog = cache(fetchFreshShopifyCatalog);

/**
 * Short cache for the homepage strip only. This project does not enable Cache
 * Components, so `unstable_cache` is the supported Next.js 16 API for the
 * mapped result. The cache key is versioned so a deploy does not reuse a
 * previous catalog entry.
 */
export const fetchCachedShopifyCatalog = unstable_cache(
  fetchFreshShopifyCatalog,
  ["shopify-catalog-v2", shopifyStoreConfig.storefrontUrl],
  {
    revalidate: SHOPIFY_CATALOG_REVALIDATE_SECONDS,
    tags: ["shopify-catalog"],
  },
);

/** Handles in the Black Friday Wag Sale collection. Empty when Shopify is down. */
export const fetchWagFridayHandles = cache(async (): Promise<string[]> => {
  try {
    const products = await fetchProductPages(WAG_FRIDAY_PRODUCTS_PATH);
    return products.map((product) => product.handle);
  } catch {
    return [];
  }
});

export const fetchShopifyProduct = cache(
  async (
    handle: string,
  ): Promise<{ product: MerchProduct; cartOptions: ProductCartOptions } | null> => {
    const res = await fetch(
      `${shopifyStoreConfig.storefrontUrl}/products/${encodeURIComponent(handle)}.json`,
      { cache: "no-store" },
    );
    if (isMissingStorefrontProductResponse(res.status)) return null;
    if (!res.ok) {
      throw new Error(`Shopify product request failed (${res.status})`);
    }

    const data = (await res.json()) as { product?: ShopifyApiProduct };
    const product = data.product;
    if (!product || !isPublishedStorefrontProduct(product)) return null;

    const cartOptionsByHandle: Record<string, ProductCartOptions> = {};
    const mapped = mapProduct(product, cartOptionsByHandle, 4000);
    const cartOptions = cartOptionsByHandle[product.handle];
    if (!mapped || !cartOptions) return null;
    return { product: mapped, cartOptions };
  },
);

export function groupMerchByCategory(products: MerchProduct[]): MerchCategoryGroup[] {
  const buckets = new Map<MerchCategory, MerchProduct[]>();
  for (const product of products) {
    const category = product.category ?? "other";
    const list = buckets.get(category) ?? [];
    list.push(product);
    buckets.set(category, list);
  }

  return CATEGORY_ORDER.filter((category) => buckets.has(category)).map(
    (category) => ({
      category,
      label: merchCategoryMeta[category].label,
      description: merchCategoryMeta[category].description,
      products: buckets.get(category)!,
    }),
  );
}
