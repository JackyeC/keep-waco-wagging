import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { CommunityPartners } from "@/components/CommunityPartners";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SponsorInquiryForm } from "@/components/SponsorInquiryForm";
import { sponsorTiers } from "@/data/communityPartners";
import { sponsorTypes } from "@/data/sponsors";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/sponsors",
  "Sponsor Keep Waco Wagging | Reach Waco Dog Parents",
  `${brandLanguage.communityLine}. Sponsor placements include camp weeks, photo booths, treats, and community partner spots.`,
);

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Reach Waco dog parents where they are already looking for trusted local recommendations."
        description={`${brandLanguage.primaryName} connects local dog parents with places, services, products, and businesses that make life with dogs easier in Waco. ${brandLanguage.communityPartnersWelcome}.`}
        tone="gold"
        showPublisher
      />
      <Section tone="paper">
        <CommunityPartners showInquiryLink={false} />
      </Section>
      <Section tone="sand">
        <SectionHeading
          eyebrow="Camp & event tiers"
          title="Sponsor a week, booth, or treat table"
          description={brandLanguage.sponsorCampInquiry}
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {sponsorTiers.map((tier) => (
            <li
              key={tier}
              className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-bark ring-1 ring-inset ring-clay"
            >
              {tier}
            </li>
          ))}
        </ul>
      </Section>
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
      <Section tone="sand" id="sponsor-inquiry">
        <SectionHeading
          eyebrow="Sponsor inquiry"
          title="Interested in reaching Waco dog parents?"
          description="Tell us about your business and we'll follow up with sponsor options."
        />
        <div className="mt-8 max-w-3xl">
          <SponsorInquiryForm />
        </div>
      </Section>

      <NewsletterSignup sourcePage="/sponsors" variant="section" />
    </>
  );
}
