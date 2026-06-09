import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getShopProductUrl } from "@/data/shop";
import type { ShopProduct } from "@/lib/types";

export function ProductCard({ product }: { product: ShopProduct }) {
  const href = getShopProductUrl(product);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200">
      <div className="aspect-square">
        <ImagePlaceholder
          src={product.imageUrl}
          alt={product.name}
          label={product.name}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="sage">{product.category}</Badge>
          {product.featured && <Badge tone="gold">Staff pick</Badge>}
        </div>
        <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-bark-soft">
          {product.summary}
        </p>
        <p className="mt-3 flex-1 text-xs leading-relaxed text-bark-faint">
          {product.whyWeLoveIt}
        </p>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 hover:text-sage-800"
        >
          View on Amazon
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
