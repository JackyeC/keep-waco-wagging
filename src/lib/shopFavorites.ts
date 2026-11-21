import type { MerchProduct } from "@/data/merchStore";
import { isPlaceholderDogImage } from "@/lib/shopImagePolicy";

/**
 * Real product photos from the live catalog. No mugs, no blank shots,
 * and no mockup dogs. The printed art is the product. Shiloh is the only
 * real dog approved for this shop, and these frames do not use a dog photo.
 */
export const shopFavoritePicks = [
  {
    handle: "keep-waco-wagging-clip-on-pet-bandana",
    imageMatch: "1073059622731279723",
    alt: "Keep Waco Wagging clip-on dog bandana with the Waco skyline",
  },
  {
    handle: "keep-waco-wagging-sticker-golden-skyline",
    imageMatch: "672840462404029373",
    alt: "Golden retriever Waco skyline sticker",
  },
  {
    handle: "dog-rescue-volunteer-t-shirt-things-we-do-at-keep-waco-wagging-graphic-tee",
    imageMatch: "5151942644271125694",
    alt: "Things We Do at Keep Waco Wagging tee",
  },
  {
    handle: "keep-waco-wagging-dog-t-shirt-cute-paw-print-graphic-tee",
    imageMatch: "10135971154443887651",
    alt: "Keep Waco Wagging paw print tee",
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
