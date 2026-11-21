import { batch1ArtworkHoldHandles } from "@/data/batch1CuratedCollection";
import type { MerchProduct } from "@/data/merchStore";

/** Live catalog, minus pieces the owner has not approved for the storefront. */
export function visibleShopProducts(products: MerchProduct[]): MerchProduct[] {
  return products.filter((product) => !batch1ArtworkHoldHandles.has(product.slug));
}

export function findGiftCardProduct(
  products: MerchProduct[],
): MerchProduct | undefined {
  return products.find((product) =>
    /gift\s*card|gift\s*certificate/i.test(
      `${product.name} ${product.productType ?? ""} ${(product.tags ?? []).join(" ")}`,
    ),
  );
}
