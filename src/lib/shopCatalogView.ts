import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import {
  buildMerchMerchandising,
  type ShopMerchandising,
} from "@/lib/merchLines";
import type { MerchProduct } from "@/data/merchStore";
import type { ProductCartOptions } from "@/lib/shopifyProductDetails";

export type ShopCatalogView = {
  products: MerchProduct[];
  allProducts: MerchProduct[];
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  error?: string;
  merch: ShopMerchandising;
};

export async function getShopCatalogView(): Promise<ShopCatalogView> {
  const catalog = await fetchShopifyCatalog();
  return {
    ...catalog,
    allProducts: catalog.allProducts ?? [],
    merch: buildMerchMerchandising(catalog.allProducts ?? []),
  };
}
