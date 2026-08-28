import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import { BeforeYouGo } from "@/components/directory/BeforeYouGo";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DirectoryBadge } from "@/components/DirectoryBadge";
import { LastVerifiedBadge } from "@/components/LastVerifiedBadge";
import { DogDirectoryCard } from "@/components/DogDirectoryCard";
import { DirectoryListingJsonLd } from "@/components/seo/StructuredData";
import {
  directoryListings,
  getDirectoryListingBySlug,
} from "@/data/directory";
import { getRelatedDirectoryListings, isPublishableDirectoryValue } from "@/lib/directoryPublish";
import { servicePageMetadata } from "@/lib/metadata";
import { ctas } from "@/lib/site";

export function generateStaticParams() {
  return directoryListings.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getDirectoryListingBySlug(slug);
  if (!listing) return { title: "Dog-friendly Waco listing not found" };

  const title = `${listing.name} | Dog-Friendly Waco`;
  const description =
    listing.description.length > 155
      ? `${listing.description.slice(0, 152).trimEnd()}…`
      : listing.description;

  return servicePageMetadata(
    `/dog-friendly-waco/${listing.slug}`,
    title,
    description,
  );
}

function mapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export default async function DogDirectoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getDirectoryListingBySlug(slug);
  if (!listing) notFound();

  const nearby = getRelatedDirectoryListings(listing.slug);
  const phone = isPublishableDirectoryValue(listing.phone)
    ? listing.phone
    : undefined;

  return (
    <>
      <DirectoryListingJsonLd
        name={listing.name}
        description={listing.description}
        path={`/dog-friendly-waco/${listing.slug}`}
        category={listing.category}
        address={listing.address}
        phone={phone}
        website={listing.website}
      />
      <PageHeader
        eyebrow={listing.category}
        title={listing.name}
        description={listing.description}
        tone="sage"
      >
        <div className="flex flex-wrap gap-2">
          {(listing.badges ?? []).map((badge) => (
            <DirectoryBadge key={badge} label={badge} />
          ))}
          <LastVerifiedBadge date={listing.lastVerified} />
        </div>
      </PageHeader>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
            <BeforeYouGo listing={listing} />
          </article>

          <aside className="space-y-4">
            <div className="rounded-card bg-cream p-5 ring-1 ring-inset ring-clay/70">
              <h2 className="font-semibold">Listing details</h2>
              {listing.address && (
                <p className="mt-3 flex gap-2 text-sm text-bark-soft">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {listing.address}
                </p>
              )}
              {phone && (
                <p className="mt-2 flex gap-2 text-sm text-bark-soft">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  {phone}
                </p>
              )}
              <div className="mt-4 flex flex-col gap-2">
                {listing.address && (
                  <Button
                    href={mapsDirectionsUrl(listing.address)}
                    variant="secondary"
                    size="sm"
                  >
                    Get directions <MapPin className="h-4 w-4" />
                  </Button>
                )}
                {listing.website && (
                  <Button href={listing.website} variant="secondary" size="sm">
                    Visit website <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="rounded-card bg-sage-50 p-5 ring-1 ring-inset ring-sage-200">
              <h2 className="font-semibold">Own or manage this place?</h2>
              <p className="mt-2 text-sm leading-relaxed text-bark-soft">
                Claim this listing, suggest an update, or ask about featured
                placement for Waco dog parents.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button href="/submit-a-place" size="sm">Suggest an update</Button>
                <Button href="/sponsors" variant="secondary" size="sm">
                  Become a sponsor
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading title="More dog-friendly Waco spots" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {nearby.map((item) => (
            <DogDirectoryCard key={item.id} listing={item} />
          ))}
        </div>
        <Button href={ctas.exploreDirectory.href} variant="secondary" className="mt-8">
          Back to directory
        </Button>
      </Section>
    </>
  );
}
