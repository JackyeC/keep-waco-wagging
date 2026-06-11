import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DirectoryBadge } from "@/components/DirectoryBadge";
import { LastVerifiedBadge } from "@/components/LastVerifiedBadge";
import type { DogDirectoryListing } from "@/lib/types";

export function DogDirectoryCard({ listing }: { listing: DogDirectoryListing }) {
  return (
    <article className="flex h-full flex-col rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200">
      <div className="flex flex-wrap items-center gap-2">
        <DirectoryBadge label={listing.category} />
        {listing.isSponsored && <DirectoryBadge label="Sponsored" />}
        {listing.sponsorTier === "featured" && <DirectoryBadge label="Featured" />}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-bark">{listing.name}</h3>
      {listing.neighborhood && (
        <p className="mt-1 inline-flex items-center gap-1 text-sm text-bark-soft">
          <MapPin className="h-3.5 w-3.5" />
          {listing.neighborhood}
        </p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
        {listing.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(listing.badges ?? []).slice(0, 4).map((badge) => (
          <DirectoryBadge key={badge} label={badge} />
        ))}
      </div>
      <div className="mt-4">
        <LastVerifiedBadge date={listing.lastVerified} />
      </div>
      <Link
        href={`/dog-friendly-waco/${listing.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-800"
      >
        View details <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
