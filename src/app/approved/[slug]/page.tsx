import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Ban,
  CalendarClock,
  Check,
  ExternalLink,
  Flame,
  MapPin,
  PawPrint,
  Search,
  TriangleAlert,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ApprovedStatusBadge } from "@/components/approved/ApprovedStatusBadge";
import { ApprovedAtAGlance } from "@/components/approved/ApprovedAttributes";
import {
  approvedListings,
  getApprovedListingBySlug,
  type ApprovedListing,
} from "@/data/approvedListings";
import { servicePageMetadata } from "@/lib/metadata";
import { cityConfig } from "@/lib/site";

export function generateStaticParams() {
  return approvedListings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getApprovedListingBySlug(slug);
  if (!listing) return { title: "Listing not found | Keep Waco Wagging Approved" };
  return servicePageMetadata(
    `/approved/${listing.slug}`,
    `${listing.name} | Keep Waco Wagging Approved`,
    listing.shortSummary,
    listing.featuredImage
      ? { src: listing.featuredImage.src, alt: listing.featuredImage.alt }
      : undefined,
  );
}

function mapsUrl(listing: ApprovedListing): string | undefined {
  if (listing.mapUrl) return listing.mapUrl;
  if (listing.address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(listing.address)}`;
  }
  return undefined;
}

export default async function ApprovedListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getApprovedListingBySlug(slug);
  if (!listing) notFound();

  const directions = mapsUrl(listing);
  const reportSubject = encodeURIComponent(
    `Keep Waco Wagging Approved — update for ${listing.name}`,
  );

  return (
    <>
      {/* Overview / header */}
      <section className="border-b border-clay bg-sage-50">
        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:py-16">
          <Link
            href="/approved"
            className="text-[12px] font-medium tracking-[0.14em] text-label-muted uppercase hover:text-wag-sage"
          >
            ← Keep Waco Wagging Approved
          </Link>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
            <div>
              <ApprovedStatusBadge status={listing.status} size="lg" />
              <p className="mt-4 text-[12px] font-medium tracking-[0.16em] text-label-muted uppercase">
                {listing.category} · {listing.city}
              </p>
              <h1 className="mt-2 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
                {listing.name}
              </h1>
              {listing.isSample && (
                <p className="mt-3 inline-block rounded-full bg-cream px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-label-muted uppercase ring-1 ring-border">
                  Sample listing — layout preview only
                </p>
              )}
              {listing.address && (
                <p className="mt-4 flex items-center gap-2 text-[14px] text-bark-soft">
                  <MapPin className="h-4 w-4 shrink-0 text-wag-sage" aria-hidden="true" />
                  {listing.address}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                {directions && (
                  <Button href={directions} variant="sage" size="md">
                    Get directions <MapPin className="h-4 w-4" />
                  </Button>
                )}
                {listing.website && (
                  <Button href={listing.website} variant="secondary" size="md">
                    Visit website <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            {listing.featuredImage && (
              <figure className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-sage-100">
                <Image
                  src={listing.featuredImage.src}
                  alt={listing.featuredImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </figure>
            )}
          </div>
        </div>
      </section>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          {/* Main column */}
          <div className="max-w-2xl">
            {/* The Wag Report */}
            <h2 className="heading text-[clamp(1.6rem,3vw,2.1rem)]">The Wag Report</h2>
            <p className="dek mt-4">{listing.fullReview}</p>

            {listing.heatWarning && (
              <div className="mt-6 flex items-start gap-3 rounded-[16px] bg-gold-100 p-5 ring-1 ring-gold-400/40">
                <Flame className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold tracking-[0.06em] text-gold-600 uppercase">
                    Hot weather warning
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-bark-soft">
                    {listing.heatWarning}
                  </p>
                </div>
              </div>
            )}

            {/* Best for / not ideal for */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-display text-[1.3rem] font-medium text-serif-ink">
                  <PawPrint className="h-5 w-5 text-wag-sage" aria-hidden="true" /> Best for
                </h3>
                {listing.bestFor.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {listing.bestFor.map((t) => (
                      <li key={t} className="rounded-full bg-sage-100 px-3 py-1 text-[12px] font-medium text-sage-700">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-[14px] text-body-muted">
                    We wouldn&rsquo;t recommend this as a dog outing.
                  </p>
                )}
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-display text-[1.3rem] font-medium text-serif-ink">
                  <TriangleAlert className="h-5 w-5 text-gold-600" aria-hidden="true" /> May not be ideal for
                </h3>
                {listing.notIdealFor.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {listing.notIdealFor.map((t) => (
                      <li key={t} className="rounded-full bg-clay px-3 py-1 text-[12px] font-medium text-bark-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-[14px] text-body-muted">—</p>
                )}
              </div>
            </div>

            {/* What we love */}
            {listing.whatWeLove.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-[1.45rem] font-medium text-serif-ink">
                  What we love
                </h3>
                <ul className="mt-4 space-y-2">
                  {listing.whatWeLove.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-bark-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-wag-sage" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What dog parents should know */}
            {listing.cautions.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-[1.45rem] font-medium text-serif-ink">
                  What dog parents should know
                </h3>
                <ul className="mt-4 space-y-2">
                  {listing.cautions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-bark-soft">
                      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* The extra wag */}
            {listing.extraWag.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-[1.45rem] font-medium text-serif-ink">
                  The extra wag
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {listing.extraWag.map((item) => (
                    <li key={item} className="rounded-full border border-border bg-cream px-3.5 py-1.5 text-[12.5px] font-medium text-body-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Event details */}
            {listing.event && (
              <div className="mt-10 rounded-[18px] border border-border bg-soft-cream p-6">
                <h3 className="flex items-center gap-2 font-display text-[1.45rem] font-medium text-serif-ink">
                  <CalendarClock className="h-5 w-5 text-wag-sage" aria-hidden="true" /> Event details
                </h3>
                <div className="mt-4 grid gap-x-6 gap-y-2 text-[14px] text-bark-soft sm:grid-cols-2">
                  {listing.event.date && <p><span className="font-medium text-bark">Date:</span> {listing.event.date}</p>}
                  {(listing.event.startTime || listing.event.endTime) && (
                    <p><span className="font-medium text-bark">Time:</span> {listing.event.startTime}{listing.event.endTime ? `–${listing.event.endTime}` : ""}</p>
                  )}
                  {listing.event.expectedCrowd && <p><span className="font-medium text-bark">Expected crowd:</span> {listing.event.expectedCrowd}</p>}
                  <p><span className="font-medium text-bark">Loud music:</span> {listing.event.loudMusic ? "Yes" : "No"}</p>
                  <p><span className="font-medium text-bark">Fireworks:</span> {listing.event.fireworks ? "Yes" : "No"}</p>
                  <p><span className="font-medium text-bark">Food:</span> {listing.event.food ? "Yes" : "No"}</p>
                  {listing.event.weatherNotes && <p className="sm:col-span-2"><span className="font-medium text-bark">Weather:</span> {listing.event.weatherNotes}</p>}
                </div>
              </div>
            )}

            {/* Verdict */}
            <div className="mt-10 rounded-[20px] bg-wag-sage p-6 text-cream sm:p-8">
              <p className="text-[12px] font-medium tracking-[0.2em] text-blush uppercase">
                Keep Waco Wagging verdict
              </p>
              <p className="mt-3 font-display text-[1.4rem] leading-snug font-medium">
                {listing.shortSummary}
              </p>
              {listing.bestTime && (
                <p className="mt-3 text-[14.5px] text-cream/85">
                  <span className="font-semibold text-cream">Best time to visit:</span>{" "}
                  {listing.bestTime}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card-panel p-6">
              <h2 className="font-display text-[1.35rem] font-medium text-serif-ink">
                At a glance
              </h2>
              <div className="mt-4">
                <ApprovedAtAGlance listing={listing} />
              </div>
            </div>

            {(listing.bestTime || listing.avoid || listing.crowdWarning) && (
              <div className="rounded-[18px] border border-border bg-soft-cream p-6">
                <h2 className="font-display text-[1.35rem] font-medium text-serif-ink">
                  When to go
                </h2>
                <div className="mt-3 space-y-2 text-[14px] text-bark-soft">
                  {listing.bestTime && <p><span className="font-medium text-bark">Best time:</span> {listing.bestTime}</p>}
                  {listing.avoid && <p><span className="font-medium text-bark">Avoid:</span> {listing.avoid}</p>}
                  {listing.crowdWarning && <p><span className="font-medium text-bark">Crowd warning:</span> {listing.crowdWarning}</p>}
                </div>
              </div>
            )}

            <div className="rounded-[18px] bg-sage-50 p-6 ring-1 ring-sage-200">
              <p className="flex items-center gap-2 text-[14px] font-medium text-bark">
                {listing.personallyVisited ? (
                  <>
                    <PawPrint className="h-4 w-4 text-wag-sage" aria-hidden="true" />
                    Visited by Keep Waco Wagging
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 text-wag-sage" aria-hidden="true" />
                    Researched by Keep Waco Wagging
                  </>
                )}
              </p>
              {listing.verifiedDate && (
                <p className="mt-2 text-[12.5px] text-label-muted">
                  Last checked: {listing.verifiedDate}
                </p>
              )}
              <div className="mt-4">
                <Button
                  href={`mailto:${cityConfig.publicEmail}?subject=${reportSubject}`}
                  variant="secondary"
                  size="sm"
                >
                  Report an Update
                </Button>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-label-muted">
                Spotted a change — new shade, a missing water bowl, a policy
                update? Let us know. Reports are reviewed before any rating
                changes.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Not-recommended reinforcement */}
      {listing.status === "not_recommended" && (
        <Section tone="sand" className="!py-10">
          <div className="mx-auto flex max-w-2xl items-start gap-3 text-center">
            <Ban className="mt-0.5 h-5 w-5 shrink-0 text-bark-soft" aria-hidden="true" />
            <p className="text-left text-[14.5px] leading-relaxed text-bark-soft">
              Dogs may technically be allowed here, but based on the whole
              experience we wouldn&rsquo;t recommend it as a dog outing. &ldquo;Dog
              allowed&rdquo; is not the same as dog friendly.
            </p>
          </div>
        </Section>
      )}
    </>
  );
}
