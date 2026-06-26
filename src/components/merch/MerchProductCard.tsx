import { ExternalLink } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { MerchProduct } from "@/data/merchStore";

export function MerchProductCard({ product }: { product: MerchProduct }) {
  const href = product.shopifyProductUrl!;

  return (
    <article className="flex h-full flex-col overflow-hidden border border-clay bg-white">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand/50 p-4 sm:p-6">
          {product.image?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="h-full w-full object-contain"
            />
          ) : (
            <ImagePlaceholder alt={product.name} />
          )}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl text-bark">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-bark-soft">
          {product.description}
        </p>
        {product.sizesOrColorsNote && (
          <p className="mt-3 text-xs text-bark-faint">{product.sizesOrColorsNote}</p>
        )}
        {product.price && (
          <p className="mt-3 font-display text-lg text-bark">{product.price}</p>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-bark px-4 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-bark-soft"
        >
          Shop now
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>
        <p className="mt-2 text-[11px] leading-relaxed text-bark-faint">
          Opens our Shopify store for checkout.
        </p>
      </div>
    </article>
  );
}
