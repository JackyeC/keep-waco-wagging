/**
 * Batch 1 curated collection — owner-approved 2026-07-04 revision.
 * Local preview only. Do not create Shopify collection until owner approves deploy.
 */

export const batch1CuratedCollectionMeta = {
  id: "waco-dog-life-collection",
  title: "Waco Dog Life Collection",
  description:
    "Three launch favorites for Waco dog parents — dog mom tee and drinkware. More pieces return after artwork review.",
  localRoute: "/shop/collection",
  maxProducts: 3,
} as const;

/** FEATURE NOW — visible on /shop/collection */
export const batch1FeatureNowHandles = [
  "waco-dog-mom-tee-cute-city-dog-mom-graphic-t-shirt",
  "keep-waco-wagging-ceramic-mug",
  "waco-dog-mom-coffee-mug-dog-mom-social-club-accent-ceramic-mug-11-15oz",
] as const;

/** CONDITIONAL — owner artwork revision pending; not displayed on storefront */
export const batch1ConditionalArtworkHandles = [
  "waco-skyline-t-shirt-waco-dog-dad-graphic-tee",
] as const;

/** Removed from curated collection — still live in Shopify; not featured on collection */
export const batch1HeldFromCuratedHandles = [
  "walks-treats-waco-streets",
  "keep-waco-wagging-golden-retriever-hoodie",
  "keep-waco-wagging-frenchie-hoodie",
  "keep-waco-wagging-labrador-hoodie",
  "keep-waco-wagging-golden-retriever-tote-bag",
  "keep-waco-wagging-frenchie-tote-bag",
  "waco-dog-mom-20oz-tumbler-insulated-travel-cup-for-dog-lovers",
] as const;

/** Visible curated set — FEATURE NOW only */
export const batch1CuratedHandles = batch1FeatureNowHandles;

/** Approved for Shopify Draft when owner executes — not drafted in this batch */
export const batch1DraftCandidateHandles = [
  "anti-social-dog-club-t-shirt-where-people-arent-pet-lover-tee",
  "dog-lover-t-shirt-keep-waco-wagging-cute-paw-print-graphic",
  "dog-moms-co-pilot-trucker-hat",
  "keep-waco-wagging-dog-t-shirt-cute-paw-print-graphic-tee",
  "keep-waco-wagging-dog-t-shirt-cute-paw-print-rescue-tee",
  "pet-tank-top-i-still-live-with-my-parents-funny-dog-shirt",
  "pit-bull-mom-t-shirt-you-don-t-scare-me-i-m-a-pit-bull-mom",
  "stylish-pet-bandana-collar-perfect-for-pets-on-every-occasion",
  "keep-waco-wagging-t-shirt-waco-landmark-dog-tee",
] as const;

/** Hidden from keepwacowagging.com curated views (draft candidates + duplicates) */
export const batch1ExcludedHandles = new Set<string>([
  ...batch1DraftCandidateHandles,
  // DUPLICATE CANDIDATE — not drafted yet
  "waco-dog-mom-t-shirt",
  "keep-waco-wagging-chihuahua-edition-1",
  "keep-waco-wagging-dachshund-edition-1",
  "keep-waco-wagging-doodle-edition-1",
  "keep-waco-wagging-frenchie-edition-1",
  "keep-waco-wagging-german-shepherd-edition-1",
  "keep-waco-wagging-golden-retriever-edition-1",
  "keep-waco-wagging-labrador-edition-1",
  "keep-waco-wagging-maltipoo-edition-1",
  "keep-waco-wagging-pittie-edition-1",
  "keep-waco-wagging-yorkie-edition",
  "keep-waco-wagging-schnauzer-edition-1",
  "keep-waco-wagging-australian-shepherd-edition",
  "keep-waco-wagging-catahoula-edition",
  "keep-waco-wagging-corgi-edition",
  "keep-waco-wagging-rescue-mutt-edition",
  "keep-waco-wagging-siberian-husky-edition",
]);

/** Not displayed until owner approves artwork */
export const batch1ArtworkHoldHandles = new Set<string>([
  ...batch1ConditionalArtworkHandles,
  "keep-waco-wagging-pittie-hoodie",
  "keep-waco-wagging-rescue-mutt-hoodie",
  "keep-waco-wagging-yorkie-hoodie",
  "pet-bandana-treats-welcome-dog-bandana-with-bone-paw-graphic-cute-puppy-scarf-for-dogs-cats-gift-for-new-pets",
  "keep-waco-wagging-pittie-tote-bag",
  "keep-waco-wagging-rescue-mutt-tote-bag",
  "keep-waco-wagging-yorkie-tote-bag",
]);

/** Held from collection — excluded from featured rows on /shop */
export const batch1HeldFromCuratedSet = new Set<string>(
  batch1HeldFromCuratedHandles,
);
