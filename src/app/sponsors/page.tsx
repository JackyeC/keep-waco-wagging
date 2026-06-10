import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SponsorInquiryForm } from "@/components/SponsorInquiryForm";
import { sponsorProspects, sponsorTypes } from "@/data/sponsors";

export const metadata: Metadata = {
  title: "Sponsor Keep Waco Wagging | Reach Waco Dog Parents",
  description:
    "Sponsor Keep Waco Wagging to reach local dog parents through directory listings, featured placements, newsletter mentions, local guides, spotlights, events, and giveaways.",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Reach Waco dog parents where they are already looking for trusted local recommendations."
        description="Keep Waco Wagging connects local dog parents with places, services, products, and businesses that make life with dogs easier in Waco."
        tone="gold"
      />
      <Section tone="paper">
        <SectionHeading
          eyebrow="Sponsor options"
          title="Natural placements for dog-friendly local businesses"
          description="If your business serves pet families, dog-friendly visitors, homeowners, renters, or local families, sponsorship may be a natural fit."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorTypes.map((type) => (
            <article key={type} className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
              <Megaphone className="h-5 w-5 text-sage-600" />
              <h3 className="mt-3 font-semibold">{type}</h3>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading
          eyebrow="Internal prospect notes"
          title="Starter sponsor prospects"
          description="This list is for planning only. Contact info is not published until verified."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsorProspects.map((prospect) => (
            <article key={prospect.id} className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
              <h3 className="font-semibold">{prospect.name}</h3>
              <p className="mt-1 text-sm text-bark-soft">{prospect.category}</p>
              <p className="mt-3 text-xs leading-relaxed text-bark-faint">{prospect.notes}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="paper" id="sponsor-inquiry">
        <SectionHeading
          eyebrow="Sponsor inquiry"
          title="Interested in reaching Waco dog parents?"
          description="Tell us about your business and we'll follow up with sponsor options."
        />
        <div className="mt-8 max-w-3xl">
          <SponsorInquiryForm />
        </div>
      </Section>
    </>
  );
}
