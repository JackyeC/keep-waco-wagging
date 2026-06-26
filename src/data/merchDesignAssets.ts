/**
 * Merch design asset manifest — where print files live (repo vs Printify vs missing).
 *
 * Listing copy: src/data/bandanaCollarCatalog.ts
 * Folder guide: source-designs/merch/README.md
 */

import { kwwBreeds } from "@/data/kwwBreeds";

export const merchBrandAssets = {
  logoFull: {
    path: "/brand/keep-waco-wagging-logo.webp",
    inRepo: true,
    use: "Stickers, tags, social — full lockup with Platinum Scoops",
  },
  logoMark: {
    path: "/brand/keep-waco-wagging-mark.webp",
    inRepo: true,
    use: "Header mark — dogs + Waco skyline reference for bandana layout",
  },
  logoPng: {
    path: "/brand/keep-waco-wagging-logo.png",
    inRepo: true,
    use: "PNG fallback for design tools",
  },
} as const;

export type MerchDesignLocation = "in_repo" | "printify_only" | "shopify_mockup_only" | "missing";

export type MerchDesignAsset = {
  breedId: string;
  breedLabel: string;
  hoodieShopifyHandle: string;
  /** Shopify product photo — reference only, not a print file */
  hoodieMockupUrl: string;
  breedSilhouettePath: string;
  bandanaPrintPath: string;
  breedSilhouetteStatus: MerchDesignLocation;
  bandanaPrintStatus: MerchDesignLocation;
  printifyHoodieNote: string;
};

/** Hoodie mockups on Shopify CDN — visual reference when building bandana art */
const hoodieMockups: Record<string, string> = {
  "golden-retriever":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/34606626669541465_2048.jpg?v=1782334790",
  "frenchie":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/10022311326708646766_2048.jpg?v=1782333221",
  "rescue-mutt":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/5846209191690200474_2048.jpg?v=1782334777",
  "labrador":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/2728234966238312242_2048.jpg?v=1782333205",
  "corgi":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/2710070202762500164_2048.jpg?v=1782333268",
  "doodle":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/11585849063511688953_2048.jpg?v=1782333252",
  "pittie":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/2993769171711365779_2048.jpg?v=1782334784",
  "schnauzer":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/18272253328739169071_2048.jpg?v=1782334770",
  "siberian-husky":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/17295745613315765414_2048.jpg?v=1782334762",
  "yorkie":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/12974037598887744522_2048.jpg?v=1782334755",
  "chihuahua":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/1023964348034616524_2048.jpg?v=1782333316",
  "dachshund":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/15200232266270736407_2048.jpg?v=1782333283",
  "german-shepherd":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/4309882301100210164_2048.jpg?v=1782333236",
  "australian-shepherd":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/1407993642293467898_2048.jpg?v=1782333329",
  "catahoula":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/17689196908635357475_2048.jpg?v=1782333299",
  "maltipoo":
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/18250803047061778839_2048.jpg?v=1782333182",
};

export const liveBandanaCollar = {
  shopifyHandle: "stylish-pet-bandana-collar-perfect-for-pets-on-every-occasion",
  mockupUrls: [
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/536003208664660182_2048.jpg?v=1742696877",
    "https://cdn.shopify.com/s/files/1/0625/4041/5063/files/1395157564009763970_2048.jpg?v=1742696881",
  ],
  designStatus: "printify_only" as MerchDesignLocation,
  note: "Generic Printify paw design — not KWW skyline/breed art yet",
};

export const sharedMerchDesignPaths = {
  skylineBand: "source-designs/merch/shared/waco-skyline-band.png",
  wordmark: "source-designs/merch/shared/keep-waco-wagging-wordmark.png",
} as const;

function breedSilhouettePath(breedId: string): string {
  return `source-designs/merch/breeds/${breedId}.png`;
}

function bandanaPrintPath(breedId: string): string {
  return `source-designs/merch/bandana-collar/${breedId}-printify-563.png`;
}

/** All breed design assets — print files are not in repo until exported from Printify */
export const merchDesignAssets: readonly MerchDesignAsset[] = kwwBreeds.map((breed) => ({
  breedId: breed.id,
  breedLabel: breed.label,
  hoodieShopifyHandle: `keep-waco-wagging-${breed.id}-hoodie`,
  hoodieMockupUrl: hoodieMockups[breed.id] ?? "",
  breedSilhouettePath: breedSilhouettePath(breed.id),
  bandanaPrintPath: bandanaPrintPath(breed.id),
  breedSilhouetteStatus: "missing",
  bandanaPrintStatus: "missing",
  printifyHoodieNote: `Printify → My products → Keep Waco Wagging — ${breed.label} Hoodie → Edit → export layers`,
}));

export function getMerchDesignAsset(breedId: string): MerchDesignAsset | undefined {
  return merchDesignAssets.find((a) => a.breedId === breedId);
}
