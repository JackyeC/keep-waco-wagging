import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { ProductRecommendation } from "@/lib/types";

export function ProductRecommendationCard({
  product,
}: {
  product: ProductRecommendation;
}) {
  return (
    <article className="flex h-full flex-col rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
      <div className="flex flex-wrap gap-2">
        <Badge tone="sage">{product.category}</Badge>
        {!product.affiliateReady && <Badge tone="gold">Product link coming soon</Badge>}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-bark">{product.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-bark-soft">
        {product.description}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
        <span className="font-semibold text-bark">Why we recommend it:</span>{" "}
        {product.whyWeLikeIt}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.bestFor.map((item) => (
          <span
            key={item}
            className="rounded-full bg-sand px-2 py-0.5 text-xs font-medium text-bark-soft"
          >
            {item}
          </span>
        ))}
      </div>
      {product.amazonUrl ? (
        <Link
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-800"
        >
          View product <ExternalLink className="h-4 w-4" />
        </Link>
      ) : (
        <p className="mt-4 text-xs text-bark-faint">
          Placeholder recommendation until final Amazon product URL is added.
        </p>
      )}
    </article>
  );
}
