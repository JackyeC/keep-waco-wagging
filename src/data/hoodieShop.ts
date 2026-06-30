import { shopifyStoreConfig } from "@/data/merchStore";

export const hoodieColors = [
  { name: "Black", hex: "#2B2B2B" },
  { name: "Navy", hex: "#2B3A55" },
  { name: "White", hex: "#F2EEE6" },
] as const;

export const hoodieSizes = ["S", "M", "L", "XL", "2XL"] as const;

export type HoodieColor = (typeof hoodieColors)[number]["name"];
export type HoodieSize = (typeof hoodieSizes)[number];

export type HoodieProductConfig = {
  id: string;
  handle: string;
  name: string;
  blurb: string;
  tag?: string;
  imageSrc?: string;
  imageAlt: string;
};

/** Featured hoodies from KWWP Storefront.dc.html — variant IDs resolved live from Shopify. */
export const featuredHoodies: HoodieProductConfig[] = [
  {
    id: "gr",
    handle: "keep-waco-wagging-golden-retriever-hoodie",
    name: "Golden Retriever Hoodie",
    tag: "Bestseller",
    blurb:
      "Waco skyline with a Golden Retriever. Premium unisex fleece, printed on demand.",
    imageAlt: "Keep Waco Wagging Golden Retriever hoodie with Waco skyline art",
  },
  {
    id: "fr",
    handle: "keep-waco-wagging-frenchie-hoodie",
    name: "Frenchie Hoodie",
    blurb:
      "Waco-skyline Frenchie edition — same premium fleece, proudly local.",
    imageAlt: "Keep Waco Wagging Frenchie hoodie with Waco skyline art",
  },
  {
    id: "rm",
    handle: "keep-waco-wagging-rescue-mutt-hoodie",
    name: "Rescue Mutt Hoodie",
    blurb:
      "Rescue mutt edition with the iconic Waco skyline — for every dog who found their person.",
    imageAlt: "Keep Waco Wagging rescue mutt hoodie with Waco skyline art",
  },
];

export const hoodieDisplayPrice = 58;

export function hoodieProductUrl(handle: string): string {
  return `${shopifyStoreConfig.storefrontUrl}/products/${handle}`;
}

export function formatHoodiePrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
