import type { MerchProduct } from "@/data/merchStore";

/** Anchor copy — used on /shop and launch materials. */
export const merchAnchorLine =
  "Cute shirts. Local impact. More tails wagging.";

export const merchPurposeLine =
  "Every Keep Waco Wagging order helps local dogs through our volunteer work with Pet Circle Regional Animal Center.";

/**
 * Curated hero row for /shop — canonical Shopify handles (see docs/merch-launch-kit.md).
 * Order matters for display.
 */
export const featuredProductHandles = [
  "waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt",
  "waco-skyline-t-shirt-waco-dog-dad-graphic-tee",
  "anti-social-dog-club-t-shirt-where-people-arent-pet-lover-tee",
  "keep-waco-wagging-rescue-mutt-hoodie",
  "keep-waco-wagging-ceramic-mug",
  "keep-waco-wagging-golden-retriever-tote-bag",
] as const;

/**
 * Near-duplicate SKUs hidden on keepwacowagging.com/shop until archived in Shopify.
 * Canonical versions stay visible.
 */
export const excludedProductHandles = new Set<string>([
  "dog-lover-t-shirt-keep-waco-wagging-cute-paw-print-graphic",
  "keep-waco-wagging-dog-t-shirt-cute-paw-print-rescue-tee",
  "keep-waco-wagging-schnauzer-edition-1",
  "waco-dog-mom-t-shirt",
]);

/** Breeds available in the skyline product line — shop-by-breed picker. */
export const merchBreeds = [
  { id: "golden-retriever", label: "Golden Retriever" },
  { id: "labrador", label: "Labrador" },
  { id: "frenchie", label: "Frenchie" },
  { id: "doodle", label: "Doodle" },
  { id: "maltipoo", label: "Maltipoo" },
  { id: "rescue-mutt", label: "Rescue Mutt" },
  { id: "pittie", label: "Pittie" },
  { id: "schnauzer", label: "Schnauzer" },
  { id: "husky", label: "Husky" },
  { id: "yorkie", label: "Yorkie" },
  { id: "corgi", label: "Corgi" },
  { id: "dachshund", label: "Dachshund" },
  { id: "chihuahua", label: "Chihuahua" },
  { id: "german-shepherd", label: "German Shepherd" },
  { id: "australian-shepherd", label: "Australian Shepherd" },
  { id: "catahoula", label: "Catahoula" },
] as const;

export type MerchBreedId = (typeof merchBreeds)[number]["id"];

export type DesignCollection = {
  id: string;
  label: string;
  description: string;
  /** Match product slug or display name. */
  matches: (product: MerchProduct) => boolean;
};

/** Message-first groupings — how people shop. */
export const designCollections: DesignCollection[] = [
  {
    id: "dog-mom",
    label: "Dog Mom",
    description: "For the woman whose camera roll is 90% dog.",
    matches: (p) =>
      /dog mom|dog-mom|dog mama/i.test(`${p.slug} ${p.name}`) &&
      !/mug|tumbler|hat/i.test(p.slug),
  },
  {
    id: "dog-dad",
    label: "Dog Dad",
    description: "The leash is his, the couch is the dog's.",
    matches: (p) => /dog dad|dog-dad/i.test(`${p.slug} ${p.name}`),
  },
  {
    id: "anti-social",
    label: "Anti-Social Dog Club",
    description: "Rather be with my dog.",
    matches: (p) => /anti-social|anti social/i.test(`${p.slug} ${p.name}`),
  },
  {
    id: "rescue",
    label: "Rescue & Mutt",
    description: "No papers, all heart.",
    matches: (p) =>
      /rescue|mutt|adopt/i.test(`${p.slug} ${p.name}`) &&
      !/paw-print-rescue-tee/i.test(p.slug),
  },
  {
    id: "landmark",
    label: "Waco Skyline & Landmarks",
    description: "Bridge, skyline, courthouse — drawn for Waco dog people.",
    matches: (p) =>
      /landmark|skyline|suspension-bridge|courthouse/i.test(
        `${p.slug} ${p.name}`,
      ) && !/dog-dad/i.test(p.slug),
  },
  {
    id: "sayings",
    label: "Waco Sayings",
    description: "Local pride and dog-person philosophy.",
    matches: (p) =>
      /coffee|dog kisses|make waco|treat people|paw print|scoop happens|goes to camp/i.test(
        `${p.slug} ${p.name}`,
      ),
  },
];

/** Suggested charm prices for display until Shopify admin prices are rounded (§1). */
export function getCharmDisplayPrice(product: MerchProduct): string {
  const hay = `${product.slug} ${product.name}`.toLowerCase();

  if (hay.includes("hoodie")) return "$57.99";
  if (hay.includes("crewneck") || hay.includes("sweatshirt")) return "$47.99";
  if (hay.includes("tote")) return "$24.99";
  if (hay.includes("tumbler")) return "$39.99";
  if (hay.includes("mug")) return "$17.99";
  if (hay.includes("sticker")) return "$4.99";
  if (hay.includes("bandana")) return "$21.99";
  if (
    hay.includes("t-shirt") ||
    hay.includes("tee") ||
    hay.includes("tank")
  ) {
    return "$27.99";
  }

  return product.price ?? "";
}

export function applyCharmPricing(product: MerchProduct): MerchProduct {
  return { ...product, price: getCharmDisplayPrice(product) };
}

export function isExcludedProduct(product: MerchProduct): boolean {
  return excludedProductHandles.has(product.slug);
}

export function curateCatalog(products: MerchProduct[]): MerchProduct[] {
  return products
    .filter((p) => !isExcludedProduct(p))
    .map(applyCharmPricing);
}

export function pickFeaturedProducts(
  catalog: MerchProduct[],
  limit: number = featuredProductHandles.length,
): MerchProduct[] {
  const byHandle = new Map(catalog.map((p) => [p.slug, p]));
  const picked: MerchProduct[] = [];

  for (const handle of featuredProductHandles) {
    const product = byHandle.get(handle);
    if (product) picked.push(product);
  }

  if (picked.length >= limit) return picked.slice(0, limit);

  for (const product of catalog) {
    if (picked.length >= limit) break;
    if (!picked.some((p) => p.slug === product.slug)) picked.push(product);
  }

  return picked;
}

export function filterByBreed(
  catalog: MerchProduct[],
  breedId: MerchBreedId,
): MerchProduct[] {
  const needle = breedId.replace(/-/g, "[-\\s]?");
  const re = new RegExp(needle, "i");
  return catalog.filter((p) => re.test(`${p.slug} ${p.name}`));
}

export type DesignCollectionGroup = DesignCollection & {
  products: MerchProduct[];
};

export function groupByDesign(
  catalog: MerchProduct[],
  maxPerCollection = 6,
): DesignCollectionGroup[] {
  return designCollections
    .map((collection) => ({
      ...collection,
      products: catalog
        .filter(collection.matches)
        .slice(0, maxPerCollection),
    }))
    .filter((group) => group.products.length > 0);
}

export function getAccessoryProducts(catalog: MerchProduct[]): MerchProduct[] {
  return catalog.filter((p) => {
    const cat = p.category;
    return (
      cat === "bags" ||
      cat === "drinkware" ||
      cat === "stickers" ||
      cat === "pet_accessories"
    );
  });
}
