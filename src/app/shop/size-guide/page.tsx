import { ShopInfoPage, shopInfoMetadata } from "@/components/merch/ShopInfoPage";

export const revalidate = 600;

export const metadata = shopInfoMetadata(
  "/shop/size-guide",
  "Size Guide | Keep Waco Wagging",
  "Size help for Keep Waco Wagging tees, hoodies, totes, and mugs. Some tees include 3XL and 4XL. Check the sizes listed on the product.",
);

export default function SizeGuidePage() {
  return (
    <ShopInfoPage
      shopifyHandle="size-guide"
      title="Size guide"
      intro="This is the size guide from our store. Some tees list sizes through 3XL or 4XL on the product itself. If you are between sizes, the guide below says to consider sizing up. Questions go to hello@keepwacowagging.com. The rest of the site uses info@keepwacowagging.com."
    />
  );
}
