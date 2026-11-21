import { ShopInfoPage, shopInfoMetadata } from "@/components/merch/ShopInfoPage";

export const revalidate = 600;

export const metadata = shopInfoMetadata(
  "/shop/returns",
  "Returns and Exchanges | Keep Waco Wagging",
  "Keep Waco Wagging merch is made to order. Wrong size or color is not a standard return. Damaged or incorrect orders should be reported within 14 days.",
);

export default function ReturnsPage() {
  return (
    <ShopInfoPage
      shopifyHandle="returns-and-exchanges"
      title="Returns and exchanges"
      intro="This is the returns page from our store. It uses hello@keepwacowagging.com. The rest of Keep Waco Wagging uses info@keepwacowagging.com."
    />
  );
}
