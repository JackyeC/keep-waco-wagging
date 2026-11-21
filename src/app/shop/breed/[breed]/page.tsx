import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { ShopPurchaseNotes } from "@/components/merch/ShopPurchaseNotes";
import { ShopShell } from "@/components/merch/ShopShell";
import { ShopJsonLd } from "@/components/seo/ShopJsonLd";
import { servicePageMetadata } from "@/lib/metadata";
import { getShopCatalogView } from "@/lib/shopCatalogView";
import { withProductArt } from "@/lib/shopSlots";
import { cityConfig } from "@/lib/site";

export const revalidate = 600;

type Params = { breed: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { breed: breedId } = await params;
  const { merch } = await getShopCatalogView();
  const shelf = merch.breeds.find((breed) => breed.id === breedId);
  if (!shelf) return { title: "Breed not found" };
  const kinds = [
    ...new Set(
      shelf.products.map((product) => {
        const name = product.name.toLowerCase();
        if (name.includes("hoodie")) return "hoodies";
        if (name.includes("crewneck")) return "crewnecks";
        if (name.includes("tote")) return "totes";
        if (/tee|t-shirt/.test(name)) return "tees";
        if (name.includes("mug")) return "mugs";
        if (name.includes("sticker")) return "stickers";
        return "merch";
      }),
    ),
  ];
  const list = kinds.filter((kind) => kind !== "merch").slice(0, 3).join(", ");
  return servicePageMetadata(
    `/shop/breed/${shelf.id}`,
    `${shelf.label} Waco Dog Merch | Keep Waco Wagging`,
    `Shop ${shelf.label} pieces from Keep Waco Wagging in ${cityConfig.homeCity}, ${cityConfig.stateAbbr}. ${list || "Merch"} with the Waco skyline, made to order.`,
  );
}

export default async function BreedShopPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { breed: breedId } = await params;
  const { cartOptionsByHandle, merch } = await getShopCatalogView();
  const shelf = merch.breeds.find((breed) => breed.id === breedId);
  if (!shelf) notFound();

  const products = shelf.products.map(withProductArt);
  const options = Object.fromEntries(
    products
      .map((product) => [product.slug, cartOptionsByHandle[product.slug]] as const)
      .filter((entry) => entry[1]),
  );

  return (
    <ShopShell cartOptionsByHandle={options} backHref="/shop">
      <ShopJsonLd
        products={products}
        cartOptionsByHandle={cartOptionsByHandle}
        pageUrl={`${cityConfig.url}/shop/breed/${shelf.id}`}
        pageName={`${shelf.label} merch`}
      />
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6">
        <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Shop by breed
        </p>
        <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.02] font-medium text-serif-ink">
          {shelf.label}
        </h1>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed font-light text-body-muted">
          Pieces we print with a {shelf.label} and the Waco skyline. Nothing else is in this set.
        </p>
        <div className="mt-5 max-w-xl">
          <ShopPurchaseNotes />
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <MerchProductCard
              key={product.slug}
              product={product}
              frame="square"
              showBenefit
              ctaStyle="button"
              purchaseNote="Made to order. Shipping at checkout."
              detailViewSource="breed"
            />
          ))}
        </div>
      </div>
    </ShopShell>
  );
}
