import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ProductRecommendation } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductRecommendationCard({
  product,
  compact = false,
}: {
  product: ProductRecommendation;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border-t border-clay pt-5",
        !compact && "sm:border sm:border-clay sm:pt-0",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-sand/60",
          compact ? "aspect-square" : "aspect-[4/3]",
        )}
      >
        <ImagePlaceholder
          src={product.imageUrl}
          alt={product.title}
          className="object-contain p-4"
        />
      </div>
      <div className={cn("flex flex-1 flex-col", compact ? "mt-4" : "p-5")}>
        <p className="eyebrow">{product.category}</p>
        <h3 className="headline-tertiary mt-2 text-[1.125rem]">{product.title}</h3>
        {!compact && (
          <>
            <p className="mt-2 text-sm leading-relaxed text-bark-soft">
              {product.description}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
              <span className="font-medium text-bark">Why we recommend it:</span>{" "}
              {product.whyWeLikeIt}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.bestFor.map((item) => (
                <span
                  key={item}
                  className="border border-clay px-2 py-0.5 text-xs text-bark-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </>
        )}
        {compact && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-bark-soft">
            {product.whyWeLikeIt}
          </p>
        )}
        {product.amazonUrl ? (
          <Link
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="editorial-link mt-4 inline-flex items-center gap-1"
          >
            View on Amazon <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <p className="caption mt-4">
            Placeholder recommendation until final Amazon product URL is added.
          </p>
        )}
        {!product.affiliateReady && !compact && (
          <Badge tone="gold" className="mt-3 w-fit">
            Product link coming soon
          </Badge>
        )}
      </div>
    </article>
  );
}
