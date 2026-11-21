import { ShopInfoPage, shopInfoMetadata } from "@/components/merch/ShopInfoPage";

export const revalidate = 600;

export const metadata = shopInfoMetadata(
  "/shop/shipping",
  "Shipping and Production | Keep Waco Wagging",
  "Made to order shipping for Keep Waco Wagging merch. Production is about 3 to 5 business days, then the order ships. Timing shows at checkout.",
);

export default function ShippingPage() {
  return (
    <ShopInfoPage
      shopifyHandle="shipping-and-production"
      title="Shipping and production"
      intro="This is the shipping page from our store, shown here so you can read it on Keep Waco Wagging. Order questions on this page go to hello@keepwacowagging.com. The rest of the site uses info@keepwacowagging.com."
    />
  );
}
