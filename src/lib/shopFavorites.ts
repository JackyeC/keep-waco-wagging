import type { MerchProduct } from "@/data/merchStore";
import { isPlaceholderDogImage } from "@/lib/shopImagePolicy";

/**
 * Wag Club and the paw print tees, from the live catalog.
 * No mugs, no loud colorways, no mockup dogs. Shiloh is the only real dog
 * approved for this shop, and these frames do not use a dog photo.
 * The hero product is not repeated in the favorites row.
 *
 * The Pack Tee is the same paw artwork family, but its front photo shows a
 * mug and the other frames are blank backs, so it stays off this row.
 */
export const shopHeroPick = {
  handle: "wag-club-t-shirt-the-wag-club-paw-print-tee-keep-waco-wagging",
  imageMatch: "12969041703673114159",
  alt: "The Wag Club tee in cream, with the paw emblem",
} as const;

export const shopFavoritePicks = [
  {
    handle: "wag-club-weekender-bag-keep-waco-wagging-travel-tote",
    imageMatch: "10274178421619052137",
    alt: "The Wag Club weekender with the paw emblem",
  },
  {
    handle: "keep-waco-wagging-dog-t-shirt-cute-paw-print-graphic-tee",
    imageMatch: "10135971154443887651",
    alt: "Keep Waco Wagging paw print tee in black",
  },
  {
    handle: "keep-waco-wagging-dog-t-shirt-cute-paw-print-rescue-tee",
    imageMatch: "17713565362421050226",
    alt: "Keep Waco Wagging rescue paw tee in white",
  },
] as const;

export type ShopFavorite = {
  product: MerchProduct;
  src: string;
  alt: string;
};

function isMug(product: MerchProduct): boolean {
  return /mug/i.test(`${product.name} ${product.productType ?? ""} ${product.slug}`);
}

export function resolveShopHero(products: MerchProduct[]): ShopFavorite | null {
  const product = products.find((item) => item.slug === shopHeroPick.handle);
  if (!product || isMug(product)) return null;
  const matched = [product.image, ...(product.gallery ?? [])].find(
    (image) =>
      image?.src.includes(shopHeroPick.imageMatch) && !isPlaceholderDogImage(image.src),
  );
  if (!matched?.src) return null;
  return { product, src: matched.src, alt: shopHeroPick.alt };
}

export function resolveShopFavorites(products: MerchProduct[]): ShopFavorite[] {
  const favorites: ShopFavorite[] = [];
  for (const pick of shopFavoritePicks) {
    const product = products.find((item) => item.slug === pick.handle);
    if (!product || isMug(product)) continue;
    const matched = [product.image, ...(product.gallery ?? [])].find(
      (image) => image?.src.includes(pick.imageMatch) && !isPlaceholderDogImage(image.src),
    );
    if (!matched?.src) continue;
    favorites.push({ product, src: matched.src, alt: pick.alt });
  }
  return favorites;
}
