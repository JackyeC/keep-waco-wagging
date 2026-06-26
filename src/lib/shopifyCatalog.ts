import type { MerchProduct } from "@/data/merchStore";
import { shopifyStoreConfig } from "@/data/merchStore";

const SHOPIFY_PRODUCTS_URL = `${shopifyStoreConfig.storefrontUrl}/products.json?limit=250`;

type ShopifyApiProduct = {
  id: number;
  title: string;
  handle: string;
  body_html?: string;
  product_type?: string;
  images?: { src: string; alt?: string | null }[];
  variants?: {
    price: string;
    option1?: string | null;
    option2?: string | null;
    available?: boolean;
  }[];
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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
    if (v.option1) colors.add(v.option1);
    if (v.option2) sizes.add(v.option2);
  }
  const parts: string[] = [];
  if (colors.size) parts.push([...colors].slice(0, 6).join(", "));
  if (sizes.size) parts.push([...sizes].join(", "));
  return parts.length ? parts.join(" · ") : undefined;
}

function mapProduct(product: ShopifyApiProduct): MerchProduct | null {
  const storefront = shopifyStoreConfig.storefrontUrl;
  if (!storefront) return null;

  const image = product.images?.[0];
  const variant = product.variants?.find((v) => v.available) ?? product.variants?.[0];
  if (!image?.src || !variant?.price) return null;

  const description = stripHtml(product.body_html ?? "");
  const shortDescription =
    description.length > 200 ? `${description.slice(0, 197).trim()}…` : description;

  return {
    id: `shopify-${product.id}`,
    name: product.title,
    slug: product.handle,
    description: shortDescription || product.title,
    image: {
      src: image.src,
      alt: image.alt?.trim() || product.title,
    },
    price: formatPrice(variant.price),
    sizesOrColorsNote: variantNote(product),
    shopifyProductUrl: `${storefront}/products/${product.handle}`,
    availability: "available",
  };
}

/** Live catalog from Shopify — used on /shop so the grid stays in sync with the store. */
export async function fetchShopifyCatalog(): Promise<MerchProduct[]> {
  try {
    const res = await fetch(SHOPIFY_PRODUCTS_URL, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as { products?: ShopifyApiProduct[] };
    const mapped = (data.products ?? [])
      .map(mapProduct)
      .filter((p): p is MerchProduct => p !== null);

    return mapped.sort((a, b) => {
      const typeOrder = (name: string) => {
        const t = name.toLowerCase();
        if (t.includes("hoodie")) return 0;
        if (t.includes("crewneck") || t.includes("sweatshirt")) return 1;
        if (t.includes("tote")) return 2;
        if (t.includes("mug")) return 3;
        return 4;
      };
      const ta = typeOrder(a.name);
      const tb = typeOrder(b.name);
      if (ta !== tb) return ta - tb;
      return a.name.localeCompare(b.name);
    });
  } catch {
    return [];
  }
}
