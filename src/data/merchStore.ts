/**
 * Keep Waco Wagging merchandise — Shopify storefront configuration.
 *
 * Checkout, payment, and fulfillment happen on Shopify. This file is the
 * single source of truth for storefront URL, shop status, and live products.
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
      "Bandanas, collars, bowls, mats, and gear for dogs — customized with Waco skyline and breed editions.",
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
    description: "Mugs and bowls for coffee breaks and kibble time.",
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
};

/** Internal planning concepts — never rendered on the public site. */
export const proposedMerchConcepts = [
  { id: "concept-keep-waco-wagging", name: "Keep Waco Wagging" },
  { id: "concept-waco-dog-mom", name: "Waco Dog Mom" },
  { id: "concept-waco-dog-dad", name: "Waco Dog Dad" },
  { id: "concept-my-dog-goes-to-camp", name: "My Dog Goes to Camp" },
  { id: "concept-scoop-happens", name: "Scoop Happens" },
] as const;

const SHOPIFY_STORE = "https://keepwacowagging.myshopify.com";

export const shopifyStoreConfig = {
  enabled: true,
  preferredDomain: "shop.keepwacowagging.com",
  storefrontUrl: SHOPIFY_STORE,
  /** Full catalog on Shopify (hoodies, crewnecks, totes, mugs, stickers). */
  collectionUrl: `${SHOPIFY_STORE}/collections/all`,
  fulfillmentNote:
    "Products are made to order and fulfilled through Printify via our Shopify store. Shipping details are shown at checkout.",
  externalCheckoutNote:
    "Checkout happens on our Shopify store — you will leave keepwacowagging.com to complete your order.",
} as const;

export const liveMerchProducts: readonly MerchProduct[] = [
  {
    id: "golden-retriever-hoodie",
    name: "Keep Waco Wagging — Golden Retriever Hoodie",
    slug: "keep-waco-wagging-golden-retriever-hoodie",
    description:
      "Premium unisex hoodie with the Waco skyline and a Golden Retriever. Printed on demand on Gildan Heavy Blend fleece.",
    image: {
      src: "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/34606626669541465_2048.jpg?v=1782334790",
      alt: "Keep Waco Wagging Golden Retriever hoodie with Waco skyline design",
    },
    price: "$58.00",
    sizesOrColorsNote: "Black, Navy, White · S–2XL",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-golden-retriever-hoodie`,
    availability: "available",
    featured: true,
  },
  {
    id: "frenchie-hoodie",
    name: "Keep Waco Wagging — Frenchie Hoodie",
    slug: "keep-waco-wagging-frenchie-hoodie",
    description:
      "Waco skyline Frenchie edition hoodie — same premium fleece, local design, printed on demand.",
    image: {
      src: "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/10022311326708646766_2048.jpg?v=1782333221",
      alt: "Keep Waco Wagging Frenchie hoodie with Waco skyline design",
    },
    price: "$58.00",
    sizesOrColorsNote: "Black, Navy, White · S–2XL",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-frenchie-hoodie`,
    availability: "available",
    featured: true,
  },
  {
    id: "rescue-mutt-hoodie",
    name: "Keep Waco Wagging — Rescue Mutt Hoodie",
    slug: "keep-waco-wagging-rescue-mutt-hoodie",
    description:
      "Rescue mutt edition with the iconic Waco skyline — for every dog who found their person.",
    image: {
      src: "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/5846209191690200474_2048.jpg?v=1782334777",
      alt: "Keep Waco Wagging Rescue Mutt hoodie with Waco skyline design",
    },
    price: "$58.00",
    sizesOrColorsNote: "Black, Navy, White · S–2XL",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-rescue-mutt-hoodie`,
    availability: "available",
    featured: true,
  },
  {
    id: "ceramic-mug",
    name: "Keep Waco Wagging Ceramic Mug",
    slug: "keep-waco-wagging-ceramic-mug",
    description:
      "Ceramic mug with the Keep Waco Wagging panoramic wrap — golden retriever, Waco skyline, and Platinum Scoops badge.",
    image: {
      src: "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/10156724552256787043_2048.jpg?v=1782333039",
      alt: "Keep Waco Wagging ceramic mug with Waco skyline and golden retriever design",
    },
    price: "$18.00",
    sizesOrColorsNote: "11oz and 15oz",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-ceramic-mug`,
    availability: "available",
    featured: true,
  },
  {
    id: "golden-retriever-tote",
    name: "Keep Waco Wagging — Golden Retriever Tote Bag",
    slug: "keep-waco-wagging-golden-retriever-tote-bag",
    description:
      "Sturdy cotton canvas tote with the Waco skyline and Golden Retriever — great for dog walks and market runs.",
    image: {
      src: "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/4046125557823106859_2048.jpg?v=1782333320",
      alt: "Keep Waco Wagging Golden Retriever tote bag",
    },
    price: "$25.00",
    sizesOrColorsNote: "Natural or Black · 15\" × 16\"",
    shopifyProductUrl: `${SHOPIFY_STORE}/products/keep-waco-wagging-golden-retriever-tote-bag`,
    availability: "available",
    featured: true,
  },
];

function isPurchasable(product: MerchProduct): boolean {
  return (
    product.availability === "available" &&
    Boolean(product.shopifyProductUrl?.trim()) &&
    Boolean(product.image?.src) &&
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

export function getFeaturedMerchProducts(limit = 5): MerchProduct[] {
  const purchasable = getPurchasableMerchProducts();
  const featured = purchasable.filter((p) => p.featured);
  const source = featured.length > 0 ? featured : purchasable;
  return source.slice(0, limit);
}

export function hasMerchStorefrontUrl(): boolean {
  return Boolean(getShopifyStorefrontUrl());
}
