import type { Metadata } from "next";
import { BadgeCheck, TriangleAlert, Ban, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ApprovedListingCard } from "@/components/approved/ApprovedListingCard";
import { ApprovedStatusBadge } from "@/components/approved/ApprovedStatusBadge";
import {
  approvedListings,
  approvedIsPreview,
} from "@/data/approvedListings";
import { servicePageMetadata } from "@/lib/metadata";

const description =
  "Keep Waco Wagging Approved is our editorial guide to dog-friendly Waco — not just where dogs are allowed, but where we'd genuinely recommend a Waco dog parent visit with their dog, based on the whole experience.";

export const metadata: Metadata = servicePageMetadata(
  "/approved",
  "Keep Waco Wagging Approved | Waco's Real Dog-Friendly Guide",
  description,
);

const statusLegend = [
  {
    status: "approved" as const,
    icon: BadgeCheck,
    text: "A place we would genuinely recommend visiting with your dog when conditions are right.",
  },
  {
    status: "cautions" as const,
    icon: TriangleAlert,
    text: "Dogs are permitted, but there are real limitations worth knowing before you go.",
  },
  {
    status: "not_recommended" as const,
    icon: Ban,
    text: "Dogs may be allowed, but the experience or safety makes it one we wouldn't recommend.",
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
              shade, water, room to breathe, and a good time for you and your
              dog.
            </p>
          </>
        }
        tone="sage"
      />

      {approvedIsPreview && (
        <div className="bg-gold-100">
          <div className="mx-auto max-w-[1200px] px-6 py-3 text-center text-[13px] text-gold-600">
            <strong className="font-semibold">Preview:</strong> these are
            clearly-labeled sample listings while we build the guide. Real Keep
            Waco Wagging Approved ratings are on the way.
          </div>
        </div>
      )}

      {/* Status legend */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="What the ratings mean"
          title="Three honest ratings"
          description="Every place gets one status, based on the whole experience — never on whether a business paid us."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {statusLegend.map(({ status, icon: Icon, text }) => (
            <div key={status} className="card-panel p-6">
              <Icon className="h-6 w-6 text-wag-sage" aria-hidden="true" />
              <div className="mt-3">
                <ApprovedStatusBadge status={status} />
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-body-muted">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Listings */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="The guide"
          title="Approved places to explore"
          description="Quick-scan cards show shade, water, potty access, noise, crowds, and which dogs will enjoy each spot."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approvedListings.map((listing) => (
            <ApprovedListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      {/* How we rate + trust */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="How we rate"
          title="Six things we look at"
          description="Every listing is evaluated across the same six dimensions, with Central Texas heat treated as a real safety factor."
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
            Sponsors may advertise, but sponsorship never determines approval —
            trust matters more than the number of approved places.
          </p>
        </div>
      </Section>
    </>
  );
}
