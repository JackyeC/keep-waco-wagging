import Link from "next/link";
import type { ShopLine } from "@/lib/merchLines";
import { publicMerchAlt } from "@/lib/merchCopy";
import { lineArtSrc } from "@/lib/shopSlots";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";

export function BreedLineCard({ line }: { line: ShopLine }) {
  const fallback = line.representative.image?.src ?? "";
  const src = fallback ? lineArtSrc(line.id, fallback) : "";
  const alt = publicMerchAlt(
    line.label,
    line.representative.image?.alt,
    `Waco skyline ${line.singular} for the breeds in the shop.`,
  );

  return (
    <article className="flex h-full flex-col rounded-[20px] border border-border bg-soft-cream p-3">
      <Link href={`/shop/line/${line.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-[14px] bg-garment-tray">
          {src ? (
            <ShopifyProductImage
              src={src}
              alt={alt}
              sizes="(max-width: 640px) 46vw, 280px"
              className="object-contain p-4 sm:p-6"
            />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="line-clamp-2 min-h-[2.7em] font-display text-[1.2rem] leading-snug font-medium text-serif-ink sm:text-[1.35rem]">
          <Link href={`/shop/line/${line.id}`} className="hover:text-rose-deep">
            {line.label}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[3.9em] text-[14px] leading-snug font-light text-body-muted">
          One {line.singular} design. {line.breeds.length}{" "}
          {line.breeds.length === 1 ? "breed" : "breeds"} in the shop, each
          with the Waco skyline.
        </p>
        <div className="mt-auto pt-4">
          {line.priceLabel && (
            <p className="text-[15px] font-medium text-serif-ink">{line.priceLabel}</p>
          )}
          <Link
            href={`/shop/line/${line.id}`}
            className="btn-pill btn-sage mt-3 inline-flex min-h-11 w-full px-4 py-3 text-[11px]"
          >
            Choose a breed
          </Link>
        </div>
      </div>
    </article>
  );
}
