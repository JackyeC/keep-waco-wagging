import type { MerchProduct } from "@/data/merchStore";
import { isPlaceholderDogImage } from "@/lib/shopImagePolicy";

/**
 * Waco Dog Mom, Waco Dog Dad, and the Waco Dog Walking Club, from the live catalog.
 * No mugs, no loud colorways, no mockup dogs. Shiloh is the only real dog
 * approved for this shop, and these frames do not use a dog photo.
 * The hero photos are not repeated in the favorites row.
 */
export const shopHeroPicks = [
  {
    handle: "waco-dog-mom-t-shirt",
    imageMatch: "10650650911220363321",
    alt: "Waco Dog Mom skyline tee in black",
  },
  {
    handle: "waco-skyline-t-shirt-waco-dog-dad-graphic-tee",
    imageMatch: "37425529920658566",
    alt: "Waco Dog Dad skyline tee in black",
  },
] as const;

export const shopFavoritePicks = [
  {
    handle: "waco-dog-mom-t-shirt",
    imageMatch: "17896959639961470096",
    alt: "Waco Dog Mom skyline tee in brown",
  },
  {
    handle: "waco-skyline-t-shirt-waco-dog-dad-graphic-tee",
    imageMatch: "2238538218113388859",
    alt: "Waco Dog Dad skyline tee in dark chocolate",
  },
  {
    handle:
      "waco-dog-walking-club-shirt-vintage-dog-walker-crest-tee-comfort-colors-dog-mom-gift-walk-wag-repeat-waco-texas-t-shirt",
    imageMatch: "11061171435498927367",
    alt: "Waco Dog Walking Club tee in bay",
  },
  {
    handle:
      "waco-dog-walking-club-shirt-vintage-dog-walker-crest-tee-comfort-colors-dog-mom-gift-walk-wag-repeat-waco-texas-t-shirt",
    imageMatch: "18201643258596499947",
    alt: "Waco Dog Walking Club tee in ivory",
    title: "Waco Dog Walking Club Tee, Ivory",
  },
] as const;

export const featuredShopImageIds = [
  ...shopHeroPicks.map((pick) => pick.imageMatch),
  ...shopFavoritePicks.map((pick) => pick.imageMatch),
] as const;

export type ShopFavorite = {
  product: MerchProduct;
  src: string;
  alt: string;
  title?: string;
};

function isMug(product: MerchProduct): boolean {
  return /mug/i.test(`${product.name} ${product.productType ?? ""} ${product.slug}`);
}

function resolvePick(
  products: MerchProduct[],
  pick: { handle: string; imageMatch: string; alt: string; title?: string },
): ShopFavorite | null {
  const product = products.find((item) => item.slug === pick.handle);
  if (!product || isMug(product)) return null;
  const matched = [product.image, ...(product.gallery ?? [])].find(
    (image) => image?.src.includes(pick.imageMatch) && !isPlaceholderDogImage(image.src),
  );
  if (!matched?.src) return null;
  return { product, src: matched.src, alt: pick.alt, title: pick.title };
}

export function resolveShopHero(products: MerchProduct[]): ShopFavorite[] {
  return shopHeroPicks.flatMap((pick) => {
    const resolved = resolvePick(products, pick);
    return resolved ? [resolved] : [];
  });
}

export function resolveShopFavorites(products: MerchProduct[]): ShopFavorite[] {
  return shopFavoritePicks.flatMap((pick) => {
    const resolved = resolvePick(products, pick);
    return resolved ? [resolved] : [];
  });
}
