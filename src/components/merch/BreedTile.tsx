import Link from "next/link";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";

export function BreedTile({
  href,
  src,
  alt,
  label,
  detail,
}: {
  href: string;
  src?: string;
  alt: string;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[18px] border border-border bg-soft-cream p-3 transition-colors hover:border-wag-sage"
    >
      <div className="relative aspect-square overflow-hidden rounded-[12px] bg-garment-tray">
        {src ? (
          <ShopifyProductImage
            src={src}
            alt={alt}
            width={800}
            sizes="(max-width: 640px) 42vw, 160px"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <p className="mt-3 font-display text-[1.15rem] leading-tight font-medium text-serif-ink">
        {label}
      </p>
      <p className="mt-1 text-[12px] font-light text-label-muted">{detail}</p>
    </Link>
  );
}
