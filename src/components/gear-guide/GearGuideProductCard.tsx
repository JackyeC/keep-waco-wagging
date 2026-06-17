import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { GearGuideBadgePill } from "@/components/gear-guide/GearGuideBadge";
import type { GearGuideProduct } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GearGuideProductCard({
  product,
  featured = false,
  className,
}: {
  product: GearGuideProduct;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col border border-clay bg-white",
        featured ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-0" : "",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-sand/50",
          featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[280px]" : "aspect-[4/3]",
        )}
      >
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            className="h-full w-full object-contain p-4 sm:p-6"
          />
        ) : (
          <ImagePlaceholder alt={product.imageAlt} showCaption />
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:justify-center lg:border-l lg:border-clay")}>
        <GearGuideBadgePill badge={product.badge} />
        <h3
          className={cn(
            "mt-3 font-display text-bark",
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {product.name}
        </h3>

        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-bark">Why it made the list</dt>
            <dd className="mt-1 leading-relaxed text-bark-soft">
              {product.whyItMadeTheList}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-bark">Best for</dt>
            <dd className="mt-1 leading-relaxed text-bark-soft">
              {product.bestFor.join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-bark">Not ideal for</dt>
            <dd className="mt-1 leading-relaxed text-bark-soft">
              {product.notIdealFor.join(" · ")}
            </dd>
          </div>
          {product.platinumScoopsNote && (
            <div className="border-l-2 border-gold-400 pl-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-bark-faint">
                Platinum Scoops note
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-bark-soft">
                {product.platinumScoopsNote}
              </dd>
            </div>
          )}
        </dl>

        {product.affiliateReady && product.amazonUrl ? (
          <Link
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="editorial-link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            View Product <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : (
          <p className="caption mt-5">Product link coming soon — we verify listings before adding affiliate links.</p>
        )}
      </div>
    </article>
  );
}
