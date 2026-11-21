/**
 * Swappable shop art. Drop a file at the public path and the page picks it up.
 * Until then, product cards and breed tiles use the Shopify photo for that item.
 *
 * Hero and Open Graph files in /public/shop/merch are temporary compositions
 * of a real catalog photo on the site cream. Replace the files. Keep the sizes.
 */

export const shopGraphics = {
  hero: {
    src: "/shop/merch/hero.webp",
    width: 2400,
    height: 1067,
    alt: "Keep Waco Wagging shop banner space. A golden retriever skyline mug sits to the side so the center stays open for the headline.",
  },
  heroMobile: {
    src: "/shop/merch/hero-mobile.webp",
    width: 1080,
    height: 1350,
    alt: "Keep Waco Wagging shop banner for phones.",
  },
  og: {
    src: "/shop/merch/og.webp",
    width: 1200,
    height: 630,
    alt: "Keep Waco Wagging dog merch from China Spring, Texas.",
  },
  lineDir: "/shop/merch/lines",
  breedDir: "/shop/merch/breeds",
  productDir: "/shop/merch/products",
} as const;

export function lineArtSlot(lineId: string): string {
  return `${shopGraphics.lineDir}/${lineId}.webp`;
}

export function breedArtSlot(breedId: string): string {
  return `${shopGraphics.breedDir}/${breedId}.webp`;
}

export function productArtSlot(handle: string): string {
  return `${shopGraphics.productDir}/${handle}.webp`;
}

export const placeitGraphics = [
  {
    file: "public/shop/merch/hero.webp",
    width: 2400,
    height: 1067,
    ratio: "2400:1067 (about 2.25:1)",
    notes:
      "Desktop banner. Keep the center calm. The headline sits in a cream panel over the middle, so put the dog and the product left or right of center. Export WebP or JPG. If you export JPG, save it as hero.webp or ask us to swap the extension.",
  },
  {
    file: "public/shop/merch/hero-mobile.webp",
    width: 1080,
    height: 1350,
    ratio: "4:5",
    notes:
      "Optional phone art. The live mobile hero is short on purpose so the first buy button stays on screen. This file is used when you add it, still cropped toward center. A phone crop of the desktop banner is about 390 by 608 if you design that safe zone inside the 2400 by 1067 file.",
  },
  {
    file: "public/shop/merch/og.webp",
    width: 1200,
    height: 630,
    ratio: "1.91:1",
    notes:
      "Link preview for Facebook, iMessage, and X. Keep the dog or product readable at small size. Leave the center reasonably clear.",
  },
  {
    file: "public/shop/merch/lines/{line}.webp",
    width: 2000,
    height: 2000,
    ratio: "1:1",
    notes:
      "One mockup per product line, not per breed. Current files: waco-skyline-tee.webp, waco-skyline-hoodie.webp, waco-skyline-crewneck.webp, waco-skyline-tote.webp. Square, product filling most of the frame, cream or garment-tray background.",
  },
  {
    file: "public/shop/merch/breeds/{breed}.webp",
    width: 1200,
    height: 1200,
    ratio: "1:1",
    notes:
      "One tile per breed that Shopify tags with Breed:. Use the breed name as the file, lowercase with hyphens, matching the tag (golden-retriever.webp, rescue-mutt.webp). The shop hides a tile's custom art until the file exists.",
  },
  {
    file: "public/shop/merch/products/{handle}.webp",
    width: 2000,
    height: 2000,
    ratio: "1:1",
    notes:
      "Optional per-product mockup. The handle is the Shopify product handle. Used on that product's page and card. Skip this until a specific product needs its own art. Line and breed files cover the repetitive pieces.",
  },
] as const;
