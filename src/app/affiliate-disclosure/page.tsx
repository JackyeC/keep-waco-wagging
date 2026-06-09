import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { monetization, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `Affiliate and sponsorship disclosure for ${siteConfig.name}.`,
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Affiliate & sponsorship disclosure"
        description="Transparency matters — here's how we earn and how we label paid content."
        tone="sage"
      />

      <Section tone="paper">
        <div className="prose-bark mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-bark-soft">
          <p>{monetization.affiliateDisclosure}</p>

          <div>
            <h2 className="text-lg font-semibold text-bark">Amazon Associates</h2>
            <p className="mt-2">
              {siteConfig.name} is a participant in the Amazon Services LLC
              Associates Program, an affiliate advertising program designed to
              provide a means for sites to earn advertising fees by advertising
              and linking to Amazon.com. Product links on our Shop page include
              our affiliate tracking tag.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Rover & partners</h2>
            <p className="mt-2">
              We may link to third-party services such as Rover for dog sitting
              and walking. These are services we personally offer or genuinely
              recommend. Compensation terms vary by platform.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">
              Sponsored listings & ads
            </h2>
            <p className="mt-2">
              Paid business listings, display ads, and sponsored spotlights are
              always labeled (Presenting Sponsor, Sponsored, or Ad). Editorial
              recommendations are separate from paid placements unless clearly
              marked as sponsored content.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-bark">Platinum Scoops</h2>
            <p className="mt-2">
              {siteConfig.name} is presented by Platinum Scoops, a Waco pet care
              company operated by the site founder. Platinum Scoops services,
              training offerings, and yard care are core to our business model.
            </p>
          </div>

          <p className="text-xs text-bark-faint">
            Last updated: June 2026. Questions? Contact us through Platinum
            Scoops or the Get Listed form.
          </p>
        </div>
      </Section>
    </>
  );
}
