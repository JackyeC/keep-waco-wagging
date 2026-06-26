/**
 * Printify pet accessories catalog — customization blueprint for Shopify listings.
 *
 * Source: https://printify.com/app/products/accessories/pets (15 products)
 * Workflow: Printify Product Creator → publish to Shopify → auto-sync on /shop.
 */

import { kwwBreedLabels } from "@/data/kwwBreeds";

export type PrintifyPetStatus = "live" | "draft" | "planned";

export type PrintifyPetBlueprint = {
  id: string;
  printifyProductId: number;
  printifyUrl: string;
  printifyName: string;
  /** KWW listing title pattern — breed editions follow hoodie naming. */
  suggestedTitle: string;
  designNotes: string;
  suggestedShopifyTags: string[];
  status: PrintifyPetStatus;
  shopifyHandle?: string;
};

const PRINTIFY_PETS = "https://printify.com/app/products";

/** Shared design elements across the KWW merch line. */
export const kwwPetDesignSystem = {
  primary: "Waco skyline + Keep Waco Wagging wordmark",
  breeds: kwwBreedLabels,
  accent: "Platinum Scoops badge on select items (mats, bowls, tags)",
  phrases: ["Waco Dog Mom", "Waco Dog Dad", "Scoop Happens", "Keep Waco Wagging"],
} as const;

export const printifyPetBlueprints: readonly PrintifyPetBlueprint[] = [
  {
    id: "pet-bandana-collar",
    printifyProductId: 563,
    printifyUrl: `${PRINTIFY_PETS}/563/generic-brand/pet-bandana-collar`,
    printifyName: "Pet Bandana Collar",
    suggestedTitle: "Keep Waco Wagging — {Breed} Bandana Collar",
    designNotes:
      "16 breed editions in bandanaCollarCatalog.ts — skyline band + hoodie breed art. Sizes S–L.",
    suggestedShopifyTags: ["Product Type: Bandana Collar", "KWW Breeds", "Dog Accessories", "Waco"],
    status: "live",
    shopifyHandle: "stylish-pet-bandana-collar-perfect-for-pets-on-every-occasion",
  },
  {
    id: "pet-bandana",
    printifyProductId: 562,
    printifyUrl: `${PRINTIFY_PETS}/562/evergreen/pet-bandana`,
    printifyName: "Pet Bandana (Evergreen)",
    suggestedTitle: "Keep Waco Wagging — {Breed} Pet Bandana",
    designNotes: "Clip-over bandana — skyline repeat or centered breed + wordmark. Good for golden/skyline sticker art.",
    suggestedShopifyTags: ["Product Type: Bandana", "KWW Breeds", "Dog Accessories"],
    status: "planned",
  },
  {
    id: "clip-on-bandana",
    printifyProductId: 1672,
    printifyUrl: `${PRINTIFY_PETS}/1672/generic-brand/clip-on-pet-bandana`,
    printifyName: "Clip-on Pet Bandana",
    suggestedTitle: "Keep Waco Wagging Clip-On Bandana",
    designNotes: "Smaller print area — minimalist skyline stripe + paw or breed icon.",
    suggestedShopifyTags: ["Product Type: Bandana", "Dog Accessories"],
    status: "planned",
  },
  {
    id: "pet-food-mat",
    printifyProductId: 855,
    printifyUrl: `${PRINTIFY_PETS}/855/generic-brand/pet-food-mat-12x18`,
    printifyName: "Pet Food Mat (12×18)",
    suggestedTitle: "Keep Waco Wagging Pet Food Mat — Waco Skyline",
    designNotes:
      "Panoramic skyline wrap (like mug). Add Platinum Scoops badge in corner. Pairs with stainless bowls in Gear Guide.",
    suggestedShopifyTags: ["Product Type: Feeding Mat", "Platinum Scoops", "Waco"],
    status: "planned",
  },
  {
    id: "pet-feeding-mats",
    printifyProductId: 623,
    printifyUrl: `${PRINTIFY_PETS}/623/generic-brand/pet-feeding-mats`,
    printifyName: "Pet Feeding Mats",
    suggestedTitle: "Keep Waco Wagging Feeding Mat",
    designNotes: "Smaller mat option — repeat paw + skyline pattern.",
    suggestedShopifyTags: ["Product Type: Feeding Mat", "Waco"],
    status: "planned",
  },
  {
    id: "pet-bowl",
    printifyProductId: 570,
    printifyUrl: `${PRINTIFY_PETS}/570/generic-brand/pet-bowl`,
    printifyName: "Pet Bowl",
    suggestedTitle: "Keep Waco Wagging Ceramic Pet Bowl",
    designNotes: "Wrap design like mug — golden + skyline or breed edition. 11oz-style footprint.",
    suggestedShopifyTags: ["Product Type: Bowl", "KWW Breeds"],
    status: "planned",
  },
  {
    id: "pet-bowl-18oz",
    printifyProductId: 1520,
    printifyUrl: `${PRINTIFY_PETS}/1520/polar-camel/pet-bowl-18oz`,
    printifyName: "Pet Bowl, 18oz (Polar Camel)",
    suggestedTitle: "Keep Waco Wagging Stainless Pet Bowl — 18oz",
    designNotes: "Engraved or printed band — skyline + wordmark. Premium tier vs ceramic bowl.",
    suggestedShopifyTags: ["Product Type: Bowl", "Waco"],
    status: "planned",
  },
  {
    id: "pet-tag",
    printifyProductId: 566,
    printifyUrl: `${PRINTIFY_PETS}/566/generic-brand/pet-tag`,
    printifyName: "Pet Tag",
    suggestedTitle: "Keep Waco Wagging Pet ID Tag",
    designNotes: "Round tag — KWW mark on front; back for custom engraving (phone). Offer skyline or paw variants.",
    suggestedShopifyTags: ["Product Type: Pet Tag", "Waco"],
    status: "planned",
  },
  {
    id: "pet-tag-engraving",
    printifyProductId: 10674,
    printifyUrl: `${PRINTIFY_PETS}/10674/generic-brand/pet-tag-engraving`,
    printifyName: "Pet Tag (Engraving)",
    suggestedTitle: "Keep Waco Wagging Engraved Pet Tag",
    designNotes: "Engraved skyline line art + Keep Waco Wagging. 5 color options — navy + gold preferred.",
    suggestedShopifyTags: ["Product Type: Pet Tag", "Waco"],
    status: "planned",
  },
  {
    id: "dog-collar",
    printifyProductId: 784,
    printifyUrl: `${PRINTIFY_PETS}/784/generic-brand/dog-collar`,
    printifyName: "Dog Collar",
    suggestedTitle: "Keep Waco Wagging Dog Collar — Waco Skyline",
    designNotes: "Subtle skyline repeat on collar strap. Pair with bandana collar as a set.",
    suggestedShopifyTags: ["Product Type: Collar", "Dog Accessories", "Waco"],
    status: "planned",
  },
  {
    id: "clip-on-collar",
    printifyProductId: 1677,
    printifyUrl: `${PRINTIFY_PETS}/1677/generic-brand/clip-on-pet-collar`,
    printifyName: "Clip-on Pet Collar",
    suggestedTitle: "Keep Waco Wagging Clip-On Collar",
    designNotes: "Lightweight collar — wordmark + small skyline icon.",
    suggestedShopifyTags: ["Product Type: Collar", "Dog Accessories"],
    status: "planned",
  },
  {
    id: "retractable-leash",
    printifyProductId: 2791,
    printifyUrl: `${PRINTIFY_PETS}/2791/generic-brand/retractable-pet-leash`,
    printifyName: "Retractable Pet Leash",
    suggestedTitle: "Keep Waco Wagging Retractable Leash",
    designNotes: "Handle grip print area — KWW wordmark. Matches Waco walk culture / camp branding.",
    suggestedShopifyTags: ["Product Type: Leash", "Dog Accessories", "Waco"],
    status: "planned",
  },
  {
    id: "pet-bed",
    printifyProductId: 419,
    printifyUrl: `${PRINTIFY_PETS}/419/generic-brand/pet-bed`,
    printifyName: "Pet Bed",
    suggestedTitle: "Keep Waco Wagging Pet Bed — Rescue Mutt Edition",
    designNotes: "Large print zone — rescue mutt + skyline (boarding/camp crossover).",
    suggestedShopifyTags: ["Product Type: Pet Bed", "KWW Breeds", "Waco"],
    status: "planned",
  },
  {
    id: "pet-tank-top",
    printifyProductId: 571,
    printifyUrl: `${PRINTIFY_PETS}/571/doggie-skins/pet-tank-top`,
    printifyName: "Pet Tank Top",
    suggestedTitle: "Keep Waco Wagging — {Breed} Pet Tank",
    designNotes: "Summer camp / Yappy Hours tie-in. Breed edition on back, wordmark on chest.",
    suggestedShopifyTags: ["Product Type: Pet Apparel", "KWW Breeds", "Yappy Hours"],
    status: "planned",
  },
  {
    id: "dog-trucker-hat",
    printifyProductId: 5378,
    printifyUrl: `${PRINTIFY_PETS}/5378/puplid/dog-foam-trucker-hat`,
    printifyName: "Dog Foam Trucker Hat",
    suggestedTitle: "Keep Waco Wagging Dog Trucker Hat",
    designNotes: "Foam front panel — skyline or Platinum Scoops scoop logo. Fun Yappy Hours accessory.",
    suggestedShopifyTags: ["Product Type: Pet Apparel", "Platinum Scoops"],
    status: "planned",
  },
  {
    id: "ceramic-mug",
    printifyProductId: 0,
    printifyUrl: `${PRINTIFY_PETS}/search-catalog?searchKey=mug`,
    printifyName: "Ceramic Mug (existing)",
    suggestedTitle: "Keep Waco Wagging Ceramic Mug",
    designNotes: "Panoramic wrap live — remove DRAFT copy in Shopify and publish.",
    suggestedShopifyTags: ["Product Type: Mug", "Waco"],
    status: "draft",
    shopifyHandle: "keep-waco-wagging-ceramic-mug",
  },
  {
    id: "kww-sticker",
    printifyProductId: 0,
    printifyUrl: `${PRINTIFY_PETS}/search-catalog?searchKey=sticker`,
    printifyName: "KWW / Waco / Platinum Scoops Stickers",
    suggestedTitle: "Keep Waco Wagging Sticker — Golden + Skyline",
    designNotes: "Publish golden skyline, Waco Texas, and Platinum Scoops logo stickers — remove DRAFT copy.",
    suggestedShopifyTags: ["Product Type: Sticker", "Waco"],
    status: "draft",
    shopifyHandle: "keep-waco-wagging-sticker-golden-skyline",
  },
];

export function getPlannedPetAccessories(): PrintifyPetBlueprint[] {
  return printifyPetBlueprints.filter((p) => p.status === "planned");
}

export function getDraftPetListings(): PrintifyPetBlueprint[] {
  return printifyPetBlueprints.filter((p) => p.status === "draft");
}

export function getLivePetAccessories(): PrintifyPetBlueprint[] {
  return printifyPetBlueprints.filter((p) => p.status === "live");
}
