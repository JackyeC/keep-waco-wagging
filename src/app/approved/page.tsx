import type { Metadata } from "next";
import { BadgeCheck, TriangleAlert, Ban, Search, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ApprovedListingCard } from "@/components/approved/ApprovedListingCard";
import {
  ApprovedStatusBadge,
  PendingBadge,
} from "@/components/approved/ApprovedStatusBadge";
import { getApprovedListingsByGroup } from "@/data/approvedListings";
import { servicePageMetadata } from "@/lib/metadata";

const description =
  "Keep Waco Wagging Approved is our editorial guide to dog-friendly Waco — not just where dogs are allowed, but where we'd genuinely recommend a Waco dog parent visit with their dog. Places stay Not Yet Evaluated until we have enough evidence to make a responsible recommendation.";

export const metadata: Metadata = servicePageMetadata(
  "/approved",
  "Keep Waco Wagging Approved | Waco's Real Dog-Friendly Guide",
  description,
);

const statusLegend = [
  {
    kind: "approved" as const,
    icon: BadgeCheck,
    text: "A place we would genuinely recommend visiting with your dog when conditions are right.",
  },
  {
    kind: "cautions" as const,
    icon: TriangleAlert,
    text: "Dogs are permitted, but there are real limitations worth knowing before you go.",
  },
  {
    kind: "not_recommended" as const,
    icon: Ban,
    text: "Dogs may be allowed, but the experience or safety makes it one we wouldn't recommend.",
  },
  {
    kind: "pending" as const,
    icon: Search,
    text: "A discovery lead we're still researching. It does NOT carry a Keep Waco Wagging Approved seal yet.",
  },
];

const ratingDimensions = [
  { title: "Welcome", copy: "Are dogs truly welcome, and are the rules clear?" },
  { title: "Safety", copy: "Traffic, fencing, escape risks, and space between dogs." },
  { title: "Comfort", copy: "Shade, surface temperature, noise, and crowding." },
  { title: "Dog basics", copy: "Water, potty access, waste stations, and seating." },
  { title: "Dog-parent experience", copy: "Can you actually enjoy it while managing your dog?" },
  { title: "The extra wag", copy: "Pup cups, treats, dog events, and other special touches." },
];

export default function ApprovedDirectoryPage() {
  const explore = getApprovedListingsByGroup("explore");
  const resources = getApprovedListingsByGroup("resources");

  return (
    <>
      <PageHeader
        eyebrow="Keep Waco Wagging Approved"
        title="Dog-friendly isn't good enough."
        description={
          <>
            <p>{description}</p>
            <p className="text-[15px]">
              &ldquo;Dog friendly&rdquo; just means dogs are allowed. Keep Waco
              Wagging Approved means we&rsquo;d actually recommend the outing —
              and a place stays <strong>Not Yet Evaluated</strong> until we have
              enough evidence to say so responsibly.
            </p>
          </>
        }
        tone="sage"
      />

      <div className="bg-gold-100">
        <div className="mx-auto max-w-[1200px] px-6 py-3 text-center text-[13px] text-gold-600">
          <strong className="font-semibold">Preview:</strong> sample listings
          show how an evaluated report looks; real places appear as
          research leads until Keep Waco Wagging has evaluated them.
        </div>
      </div>

      {/* Status legend */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What the ratings mean"
          title="Three honest ratings — earned, not bought"
          description="Every evaluated place gets one verdict, based on the whole experience. Until then, it stays a research lead."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statusLegend.map(({ kind, icon: Icon, text }) => (
            <div key={kind} className="card-panel p-6">
              <Icon className="h-6 w-6 text-wag-sage" aria-hidden="true" />
              <div className="mt-3">
                {kind === "pending" ? (
                  <PendingBadge />
                ) : (
                  <ApprovedStatusBadge status={kind} />
                )}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-body-muted">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Explore Waco With Your Dog */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Explore Waco with your dog"
          title="Places to go with your dog"
          description="Restaurants, breweries, coffee, parks, trails, shops, hotels, markets, and events — where Keep Waco Wagging Approved matters most."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {explore.map((listing) => (
            <ApprovedListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      {/* Waco Dog Resources */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Waco dog resources"
          title="Groomers, vets & dog services"
          description="Service providers you use for your dog — kept separate from places you visit with your dog for fun."
        />
        {resources.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((listing) => (
              <ApprovedListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-[15px] text-body-muted">
            Resource listings are being organized here.
          </p>
        )}
      </Section>

      {/* How we rate + trust */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="How we rate"
          title="Six things we look at"
          description="Every evaluation weighs the same six dimensions, with Central Texas heat treated as a real safety factor. Unknown stays unknown — we don't invent answers."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ratingDimensions.map((d) => (
            <div key={d.title} className="rounded-[18px] border border-border bg-soft-cream p-5">
              <h3 className="font-display text-[1.25rem] font-medium text-serif-ink">
                {d.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-body-muted">
                {d.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-[18px] bg-sage-50 p-6 ring-1 ring-sage-200">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-wag-sage" aria-hidden="true" />
          <p className="text-[14.5px] leading-relaxed text-bark-soft">
            <span className="font-semibold text-bark">
              Businesses can&rsquo;t buy a Keep Waco Wagging Approved rating.
            </span>{" "}
            Approval is an editorial recommendation from Keep Waco Wagging.
            Community tips are welcome discovery leads — but they&rsquo;re never
            treated as verified facts, and sponsorship never determines approval.
          </p>
        </div>
      </Section>
    </>
  );
}
