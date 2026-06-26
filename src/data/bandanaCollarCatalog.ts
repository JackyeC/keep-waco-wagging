/**
 * Keep Waco Wagging — Pet Bandana Collar breed editions (Printify #563).
 *
 * Printify setup:
 * 1. https://printify.com/app/products/563/generic-brand/pet-bandana-collar
 * Design files: source-designs/merch/ (see README) — export hoodie layers from Printify.
 * Asset manifest: src/data/merchDesignAssets.ts
 * 3. Publish to Shopify with title, handle, tags, and description from this file.
 * 4. Replace generic listing `stylish-pet-bandana-collar-perfect-for-pets-on-every-occasion`
 *    after Golden Retriever edition is live (or republish that product as GR).
 *
 * Design layout (bandana print area):
 * - Lower third: Waco skyline horizontal band (match hoodie skyline asset).
 * - Center: breed silhouette — reuse hoodie breed PNG for each edition.
 * - Upper area: small Keep Waco Wagging wordmark (cream on navy or navy on cream).
 * - Background: solid navy, black, or cream — match hoodie colorway when possible.
 */

import { kwwBreeds, type KwwBreed } from "@/data/kwwBreeds";

export const bandanaCollarPrintify = {
  productId: 563,
  url: "https://printify.com/app/products/563/generic-brand/pet-bandana-collar",
  printProvider: "Printed Mint",
  sizes: ["S", "M", "L"] as const,
  suggestedRetail: "$25.38",
  genericShopifyHandle:
    "stylish-pet-bandana-collar-perfect-for-pets-on-every-occasion",
} as const;

export type BandanaCollarListing = {
  breed: KwwBreed;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  imageAlt: string;
  hoodieHandle: string;
};

const sharedTags = [
  "Dog Lover",
  "KWW Breeds",
  "Product Type: Bandana Collar",
  "Dog Accessories",
  "Waco",
  "Pet Bandana",
  "Dog Bandana Gift",
];

function bandanaDescription(breedLabel: string): string {
  return `Keep Waco Wagging bandana collar for ${breedLabel} lovers — Waco skyline, breed art, and an adjustable collar strap. Made from 100% polyester with an all-over print and hemmed edges; quick-drying for walks, Yappy Hours, and everyday Waco dog life. Adjustable strap fits comfortably so your pup can play and explore. Made to order and fulfilled through Printify via our Shopify store.`;
}

function bandanaDescriptionHtml(breedLabel: string): string {
  return `<p>${bandanaDescription(breedLabel)}</p>`;
}

export function buildBandanaCollarListing(breed: KwwBreed): BandanaCollarListing {
  const title = `Keep Waco Wagging — ${breed.label} Bandana Collar`;
  const handle = `keep-waco-wagging-${breed.id}-bandana-collar`;

  return {
    breed,
    title,
    handle,
    description: bandanaDescription(breed.label),
    descriptionHtml: bandanaDescriptionHtml(breed.label),
    tags: [breed.breedTag, ...sharedTags],
    imageAlt: `Keep Waco Wagging ${breed.label} bandana collar with Waco skyline design`,
    hoodieHandle: `keep-waco-wagging-${breed.id}-hoodie`,
  };
}

export const bandanaCollarListings: readonly BandanaCollarListing[] = kwwBreeds.map(
  buildBandanaCollarListing,
);

export function getBandanaCollarListing(breedId: string): BandanaCollarListing | undefined {
  const breed = kwwBreeds.find((b) => b.id === breedId);
  return breed ? buildBandanaCollarListing(breed) : undefined;
}
