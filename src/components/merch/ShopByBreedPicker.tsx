"use client";

import { useMemo, useState } from "react";
import type { MerchProduct } from "@/data/merchStore";
import {
  filterByBreed,
  merchBreeds,
  type MerchBreedId,
} from "@/data/merchCuration";
import { ShopProductGrid } from "@/components/merch/ShopProductGrid";

export function ShopByBreedPicker({
  catalog,
}: {
  catalog: MerchProduct[];
}) {
  const [breedId, setBreedId] = useState<MerchBreedId | "all">("all");

  const filtered = useMemo(() => {
    if (breedId === "all") return catalog.slice(0, 12);
    return filterByBreed(catalog, breedId);
  }, [breedId, catalog]);

  return (
    <section className="mt-16">
      <div className="max-w-2xl">
        <p className="eyebrow tracking-[0.22em]">Shop by breed</p>
        <h2 className="heading mt-1.5 text-[36px]">
          Find your dog on the{" "}
          <span className="font-script text-rose">skyline</span>
        </h2>
        <p className="dek mt-3 text-[15px]">
          Sixteen breed editions — tees, hoodies, crewnecks, and totes. Pick
          your breed, then choose your garment on Shopify.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setBreedId("all")}
          className={
            breedId === "all"
              ? "rounded-full bg-wag-sage px-4 py-2 text-xs font-medium tracking-[0.12em] text-cream uppercase"
              : "rounded-full border border-border bg-soft-cream px-4 py-2 text-xs font-medium tracking-[0.12em] text-body-muted uppercase hover:border-rose hover:text-rose"
          }
        >
          All breeds
        </button>
        {merchBreeds.map((breed) => (
          <button
            key={breed.id}
            type="button"
            onClick={() => setBreedId(breed.id)}
            className={
              breedId === breed.id
                ? "rounded-full bg-wag-sage px-4 py-2 text-xs font-medium tracking-[0.12em] text-cream uppercase"
                : "rounded-full border border-border bg-soft-cream px-4 py-2 text-xs font-medium tracking-[0.12em] text-body-muted uppercase hover:border-rose hover:text-rose"
            }
          >
            {breed.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length > 0 ? (
          <ShopProductGrid products={filtered} columns={3} />
        ) : (
          <p className="rounded-[20px] border border-border bg-soft-cream p-8 text-center text-sm font-light text-body-muted-light">
            No products matched that breed yet — try another, or browse the full
            catalog on Shopify.
          </p>
        )}
      </div>
    </section>
  );
}
