import { unstable_cache } from "next/cache";
import type { MerchCategory, MerchProduct } from "@/data/merchStore";
import { curateCatalog } from "@/data/merchCuration";
import { merchCategoryMeta, shopifyStoreConfig } from "@/data/merchStore";
import { publicMerchDescription } from "@/lib/merchCopy";
import { isPlaceholderDogImage } from "@/lib/shopImagePolicy";
import {
  parseProductCartOptions,
  type ProductCartOptions,
  type ShopifyRawVariant,
} from "@/lib/shopifyProductDetails";

const SHOPIFY_PRODUCTS_URL = `${shopifyStoreConfig.storefrontUrl}/products.json?limit=250`;
const SHOPIFY_CATALOG_REVALIDATE_SECONDS = 600;

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
  body_html?: string;
  product_type?: string;
  tags?: string[];
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
  /** Curated subset used by the homepage and the launch collection. */
  products: MerchProduct[];
  /** Every active Shopify product, including breed variants. */
  allProducts: MerchProduct[];
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  error?: string;
};

function absoluteImageSrc(src: string): string {
  return src.startsWith("//") ? `https:${src}` : src;
}

function pickGallery(
  images: { src: string; alt?: string | null }[] | undefined,
  name: string,
): { src: string; alt: string }[] {
  const normalized = (images ?? [])
    .map((image, index) => {
      const src = image.src ? absoluteImageSrc(image.src) : "";
      if (!src) return null;
      if (isPlaceholderDogImage(src)) return null;
      const alt = image.alt?.trim() || `${name}, photo ${index + 1}`;
      return { src, alt, index };
    })
    .filter((image): image is { src: string; alt: string; index: number } =>
      Boolean(image),
    );

  const charts = normalized.filter((image) =>
    /size|chart/i.test(`${image.alt} ${image.src}`),
  );
  const rest = normalized.filter((image) => !charts.includes(image));
  return [...rest.slice(0, 8), ...charts.slice(0, 2)].map(({ src, alt }) => ({
    src,
    alt,
  }));
}

function getMerchCategory(product: ShopifyApiProduct): MerchCategory {
  const type = (product.product_type ?? "").toLowerCase();
  const title = product.title.toLowerCase();
  const tags = (product.tags ?? []).join(" ").toLowerCase();

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
): MerchProduct | null {
  const storefront = shopifyStoreConfig.storefrontUrl;
  if (!storefront) return null;

  const gallery = pickGallery(product.images, product.title);
  const image = gallery[0];
  const imageSrc = image?.src;
  const variant =
    product.variants?.find((v) => v.available !== false) ?? product.variants?.[0];
  if (!imageSrc || !variant?.price) return null;

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

  const description =
    publicMerchDescription(product.body_html ?? "") || product.title;

  return {
    id: `shopify-${product.id}`,
    name: product.title,
    slug: product.handle,
    description,
    image: {
      src: imageSrc,
      alt: image.alt || product.title,
    },
    gallery,
    price: formatPrice(variant.price),
    sizesOrColorsNote: variantNote(product),
    shopifyProductUrl: `${storefront}/products/${product.handle}`,
    availability: "available",
    category: getMerchCategory(product),
    productType: product.product_type?.trim() || undefined,
    tags: product.tags ?? [],
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

async function fetchFreshShopifyCatalog(): Promise<ShopifyCatalogResult> {
  const cartOptionsByHandle: Record<string, ProductCartOptions> = {};

  try {
    // Shopify's raw response is ~2.3 MB, above Next.js' per-entry Data Cache
    // limit. Fetch it uncached, discard unused fields, then cache only the
    // substantially smaller mapped catalog returned by this function.
    const res = await fetch(SHOPIFY_PRODUCTS_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        products: [],
        allProducts: [],
        cartOptionsByHandle,
        error: "Could not load products from Shopify.",
      };
    }

    const data = (await res.json()) as { products?: ShopifyApiProduct[] };
    const mapped = (data.products ?? [])
      .map((p) => mapProduct(p, cartOptionsByHandle))
      .filter((p): p is MerchProduct => p !== null);

    const allProducts = sortProducts(mapped);
    return {
      products: curateCatalog(allProducts),
      allProducts,
      cartOptionsByHandle,
    };
  } catch {
    return {
      products: [],
      allProducts: [],
      cartOptionsByHandle,
      error: "Shopify catalog request failed.",
    };
  }
}

/**
 * Live catalog used by shop routes.
 *
 * This project does not enable Cache Components, so `unstable_cache` is the
 * supported Next.js 16 cache API for the transformed non-fetch result. Both
 * shop routes share the same reduced catalog for ten minutes instead of
 * downloading Shopify's full feed on every render.
 */
export const fetchShopifyCatalog = unstable_cache(
  fetchFreshShopifyCatalog,
  ["shopify-catalog-v3", SHOPIFY_PRODUCTS_URL],
  {
    revalidate: SHOPIFY_CATALOG_REVALIDATE_SECONDS,
    tags: ["shopify-catalog"],
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
