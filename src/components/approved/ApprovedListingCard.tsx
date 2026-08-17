import Image from "next/image";
import Link from "next/link";
import { PawPrint, Search } from "lucide-react";
import { ApprovedStatusBadge } from "@/components/approved/ApprovedStatusBadge";
import { ApprovedQuickAttributes } from "@/components/approved/ApprovedAttributes";
import type { ApprovedListing } from "@/data/approvedListings";

export function ApprovedListingCard({ listing }: { listing: ApprovedListing }) {
  const href = `/approved/${listing.slug}`;

  return (
    <article className="card-panel flex flex-col overflow-hidden">
      <Link href={href} className="group relative block">
        {listing.featuredImage && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-sage-50">
            <Image
              src={listing.featuredImage.src}
              alt={listing.featuredImage.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <ApprovedStatusBadge status={listing.status} />
        </div>
        {listing.isSample && (
          <span className="absolute top-3 right-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-label-muted uppercase shadow-sm">
            Sample
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          {listing.category} · {listing.city}
        </p>
        <h3 className="mt-1.5 font-display text-[1.35rem] leading-snug font-medium text-serif-ink">
          <Link href={href} className="hover:text-wag-sage">
            {listing.name}
          </Link>
        </h3>

        <div className="mt-4">
          <ApprovedQuickAttributes listing={listing} />
        </div>

        {listing.bestFor.length > 0 && (
          <p className="mt-4 flex items-start gap-1.5 text-[13px] text-bark-soft">
            <PawPrint className="mt-0.5 h-4 w-4 shrink-0 text-wag-sage" aria-hidden="true" />
            <span>
              <span className="font-medium text-bark">Best for:</span>{" "}
              {listing.bestFor.join(", ")}
            </span>
          </p>
        )}

        <p className="mt-3 text-[14px] leading-relaxed text-body-muted">
          {listing.shortSummary}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            See Full Dog-Friendly Report
          </Link>
        </div>
      </div>
    </article>
  );
}
