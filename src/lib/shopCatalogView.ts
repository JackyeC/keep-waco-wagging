import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import {
  buildMerchMerchandising,
  type ShopMerchandising,
} from "@/lib/merchLines";
import { visibleShopProducts } from "@/lib/shopPublicCatalog";
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
  const allProducts = visibleShopProducts(catalog.allProducts ?? []);
  return {
    ...catalog,
    allProducts,
    merch: buildMerchMerchandising(allProducts),
  };
}
