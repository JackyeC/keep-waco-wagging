import type { MerchProduct } from "@/data/merchStore";
import {
  batch1ArtworkHoldHandles,
  batch1CuratedHandles,
  batch1ExcludedHandles,
  batch1HeldFromCuratedSet,
} from "@/data/batch1CuratedCollection";

/** Anchor copy — used on /shop and launch materials. */
export const merchAnchorLine =
  "Cute shirts. Local impact. More tails wagging.";

export const merchPurposeLine =
  "Every Keep Waco Wagging order helps local dogs through our volunteer work with Pet Circle Regional Animal Center.";

/**
 * Curated hero row for /shop — canonical Shopify handles.
 * Waco-local, owner-vibe aligned (no generic national dog-shop phrases).
 */
/** Batch 1 curated collection — same set as /shop/collection */
export const featuredProductHandles = batch1CuratedHandles;

/**
 * SKUs hidden on keepwacowagging.com/shop until drafted in Shopify.
 * Source: output/BATCH1_PRODUCT_CURATION.csv (HIDE + DUPLICATE)
 */
export const excludedProductHandles = batch1ExcludedHandles;

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
      /coffee|dog kisses|make waco|treat people|scoop happens|goes to camp/i.test(
        `${p.slug} ${p.name}`,
      ) && !/paw.?print/i.test(`${p.slug} ${p.name}`),
  },
];

/** @deprecated Batch 1 uses Shopify variant price as display source of truth. */
export function getCharmDisplayPrice(product: MerchProduct): string {
  return product.price ?? "";
}

export function isExcludedProduct(product: MerchProduct): boolean {
  return (
    excludedProductHandles.has(product.slug) ||
    batch1ArtworkHoldHandles.has(product.slug) ||
    batch1HeldFromCuratedSet.has(product.slug)
  );
}

/** Filters off-brand/duplicate SKUs; prices stay as fetched from Shopify. */
export function curateCatalog(products: MerchProduct[]): MerchProduct[] {
  return products.filter((p) => !isExcludedProduct(p));
}

export function pickCuratedCollectionProducts(
  catalog: MerchProduct[],
): MerchProduct[] {
  const byHandle = new Map(catalog.map((p) => [p.slug, p]));
  return batch1CuratedHandles
    .map((handle) => byHandle.get(handle))
    .filter((p): p is MerchProduct => Boolean(p));
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
