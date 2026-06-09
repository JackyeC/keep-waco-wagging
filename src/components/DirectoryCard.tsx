import Link from "next/link";
import { MapPin, Droplets, Sun, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Listing } from "@/lib/types";

export function DirectoryCard({ listing }: { listing: Listing }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200">
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImagePlaceholder src={listing.imageUrl} alt={listing.name} label={listing.name} />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="sage">{listing.category}</Badge>
          {listing.featured && <Badge tone="gold">Featured</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{listing.name}</h3>
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-bark-soft">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {listing.area}
        </p>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-bark-soft">
          {listing.dogFriendlyNotes}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {listing.shadeAvailable && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2 py-0.5 text-[11px] font-medium text-bark-soft">
              <Sun className="h-3 w-3" /> Shade
            </span>
          )}
          {listing.waterAvailable && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium text-sky-700">
              <Droplets className="h-3 w-3" /> Water
            </span>
          )}
          {listing.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sage-50 px-2 py-0.5 text-[11px] font-medium text-sage-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/directory/${listing.slug}`}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-sage-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
