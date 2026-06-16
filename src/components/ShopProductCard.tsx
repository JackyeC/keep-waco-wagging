import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ProductRecommendation } from "@/lib/types";

/** Target-style compact product tile for the shop catalog grid. */
export function ShopProductCard({ product }: { product: ProductRecommendation }) {
  const href = product.amazonUrl ?? "#";

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f6f6f6] p-4 ring-1 ring-inset ring-black/[0.04] transition-shadow group-hover:shadow-md">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <ImagePlaceholder alt={product.title} label={product.title} />
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col px-0.5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-bark-faint">
          {product.category}
        </p>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-1 line-clamp-2 text-sm leading-snug text-bark hover:underline"
        >
          {product.title}
        </Link>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-bark-soft">
          {product.description}
        </p>

        {product.amazonUrl ? (
          <Link
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-bark px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-bark/90"
          >
            Shop on Amazon
          </Link>
        ) : (
          <p className="mt-3 text-xs text-bark-faint">Link coming soon</p>
        )}
      </div>
    </article>
  );
}
