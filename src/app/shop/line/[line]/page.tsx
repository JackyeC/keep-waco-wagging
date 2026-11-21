import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreedTile } from "@/components/merch/BreedTile";
import { ShopShell } from "@/components/merch/ShopShell";
import { servicePageMetadata } from "@/lib/metadata";
import { getShopCatalogView } from "@/lib/shopCatalogView";
import { productForBreedOnLine } from "@/lib/merchLines";
import { breedArtSrc } from "@/lib/shopSlots";

export const revalidate = 600;

type Params = { line: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { line: lineId } = await params;
  const { merch } = await getShopCatalogView();
  const line = merch.lines.find((item) => item.id === lineId);
  if (!line) return { title: "Line not found" };
  return servicePageMetadata(
    `/shop/line/${line.id}`,
    `${line.label} by Breed | Keep Waco Wagging`,
    `Choose a breed for the Keep Waco Wagging ${line.label.toLowerCase()}. ${line.breeds.length} breeds, made to order in China Spring, TX.`,
  );
}

export default async function ShopLinePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { line: lineId } = await params;
  const { merch } = await getShopCatalogView();
  const line = merch.lines.find((item) => item.id === lineId);
  if (!line) notFound();

  return (
    <ShopShell cartOptionsByHandle={{}} backHref="/shop">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-6">
        <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          Breed line
        </p>
        <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] font-medium text-serif-ink">
          {line.label}
        </h1>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed font-light text-body-muted">
          One {line.singular}. Pick the breed and you&apos;ll land on that piece, ready to add to your bag.
          {line.priceLabel ? ` ${line.priceLabel}.` : ""}
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {line.breeds.map((breed) => {
            const product = productForBreedOnLine(line, breed.id);
            if (!product) return null;
            const src = product.image?.src
              ? breedArtSrc(breed.id, product.image.src)
              : undefined;
            return (
              <li key={breed.id}>
                <BreedTile
                  href={`/shop/product/${product.slug}`}
                  src={src}
                  alt={`${breed.label} ${line.singular}, Keep Waco Wagging`}
                  label={breed.label}
                  detail={product.price ?? line.priceLabel}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </ShopShell>
  );
}
