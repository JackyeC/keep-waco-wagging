/**
 * Keep Waco Wagging merchandise — Shopify storefront configuration.
 *
 * Checkout, payment, and fulfillment happen on Shopify. This file is the
 * single source of truth for storefront URL, shop status, and curated fallbacks.
 */

export type MerchAvailability = "available" | "coming_soon";

export type MerchCategory =
  | "pet_accessories"
  | "apparel"
  | "bags"
  | "drinkware"
  | "stickers"
  | "other";

export const merchCategoryMeta: Record<
  MerchCategory,
  { label: string; description: string }
> = {
  pet_accessories: {
    label: "Pet accessories",
    description:
      "Bandanas, collars, and gear for dogs — Waco skyline and breed editions.",
  },
  apparel: {
    label: "Apparel",
    description: "Hoodies, crewnecks, and tees for Waco dog people.",
  },
  bags: {
    label: "Tote bags",
    description: "Canvas totes for walks, camp, and market runs.",
  },
  drinkware: {
    label: "Drinkware",
    description: "Mugs and tumblers for coffee breaks and kibble time.",
  },
  stickers: {
    label: "Stickers",
    description: "Skyline, breed, and Platinum Scoops sticker packs.",
  },
  other: {
    label: "More merch",
    description: "Additional items from our Shopify catalog.",
  },
};

export type MerchProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: { src: string; alt: string };
  price?: string;
  sizesOrColorsNote?: string;
  shopifyProductUrl?: string;
  availability: MerchAvailability;
  featured?: boolean;
  category?: MerchCategory;
  /** Local bag support — populated from live Shopify variant data */
  supportsLocalCart?: boolean;
  cartOption1Label?: string | null;
  cartOption1Values?: string[];
  cartOption2Label?: string | null;
  cartOption2Values?: string[];
};

/** Internal planning concepts — never rendered on the public site. */
export const proposedMerchConcepts = [
  { id: "concept-dog-mama-script", name: "Dog Mama Tee — Waco, Texas" },
  { id: "concept-coffee-kisses", name: "Raised on Coffee & Dog Kisses Tee" },
  { id: "concept-dogs-make-waco", name: "Dogs Make Waco Better Tee" },
  { id: "concept-treat-people", name: "Treat People, Love Dogs Tee" },
  { id: "concept-personalized", name: 'Personalized "Shirts for [Name]" Dog Tee' },
] as const;

const SHOPIFY_STORE = "https://keepwacowagging.myshopify.com";

export const shopifyStoreConfig = {
  enabled: true,
  /** Connect in Shopify admin — links use storefrontUrl until live. */
  preferredDomain: "shop.keepwacowagging.com",
  storefrontUrl: SHOPIFY_STORE,
  collectionUrl: `${SHOPIFY_STORE}/collections/all`,
  fulfillmentNote:
    "Products are made to order and fulfilled through Printify via our Shopify store. Shipping details are shown at checkout.",
  externalCheckoutNote:
    "Checkout happens on our Shopify store — you will leave keepwacowagging.com to complete your order.",
  priceDisplayNote:
    "Prices shown match Shopify checkout for your selected size and color.",
} as const;

/** Fallback when products.json is unavailable — matches featuredProductHandles in merchCuration.ts */
export const liveMerchProducts: readonly MerchProduct[] = [
  {
    id: "waco-dog-mom-tee",
    name: "Waco Dog Mom Tee",
    slug: "waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt",
    description:
      "For the woman whose camera roll is 90% dog. Soft, true-to-size, made to order.",
    price: "$27.99",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt`,
    availability: "available",
    featured: true,
    category: "apparel",
  },
  {
    id: "waco-dog-dad-tee",
    name: "Waco Dog Dad Tee — Skyline",
    slug: "waco-skyline-t-shirt-waco-dog-dad-graphic-tee",
    description:
      "Hand-drawn Waco skyline for Texas dog dads. Relaxed fit, made to order.",
    price: "$26.99",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/waco-skyline-t-shirt-waco-dog-dad-graphic-tee`,
    availability: "available",
    featured: true,
    category: "apparel",
  },
  {
    id: "golden-retriever-hoodie",
    name: "Keep Waco Wagging — Golden Retriever Hoodie",
    slug: "keep-waco-wagging-golden-retriever-hoodie",
    description: "Waco skyline golden retriever edition — premium fleece.",
    price: "$58.00",
    sizesOrColorsNote: "Natural, Sage, Blossom · S–3XL",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-golden-retriever-hoodie`,
    availability: "available",
    featured: true,
    category: "apparel",
  },
  {
    id: "ceramic-mug",
    name: "Keep Waco Wagging Ceramic Mug",
    slug: "keep-waco-wagging-ceramic-mug",
    description:
      "Wrap-around Waco skyline and golden retriever — 11oz or 15oz.",
    price: "$17.99",
    sizesOrColorsNote: "11oz and 15oz",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-ceramic-mug`,
    availability: "available",
    featured: true,
    category: "drinkware",
  },
  {
    id: "golden-retriever-tote",
    name: "Keep Waco Wagging — Golden Retriever Tote Bag",
    slug: "keep-waco-wagging-golden-retriever-tote-bag",
    description: "Heavy cotton canvas with the Waco skyline and your breed.",
    price: "$24.99",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-golden-retriever-tote-bag`,
    availability: "available",
    featured: true,
    category: "bags",
  },
];

function isPurchasable(product: MerchProduct): boolean {
  return (
    product.availability === "available" &&
    Boolean(product.shopifyProductUrl?.trim()) &&
    Boolean(product.price?.trim())
  );
}

export function getShopifyStorefrontUrl(): string | null {
  const url = shopifyStoreConfig.storefrontUrl?.trim();
  return url || null;
}

export function getShopifyCollectionUrl(): string | null {
  const url = shopifyStoreConfig.collectionUrl?.trim();
  return url || null;
}

export function isMerchStoreLive(): boolean {
  if (!shopifyStoreConfig.enabled) return false;
  return liveMerchProducts.some(isPurchasable);
}

export function getPurchasableMerchProducts(): MerchProduct[] {
  return liveMerchProducts.filter(isPurchasable);
}

export function getFeaturedMerchProducts(limit = 6): MerchProduct[] {
  const purchasable = getPurchasableMerchProducts();
  const featured = purchasable.filter((p) => p.featured);
  const source = featured.length > 0 ? featured : purchasable;
  return source.slice(0, limit);
}

export function hasMerchStorefrontUrl(): boolean {
  return Boolean(getShopifyStorefrontUrl());
}
