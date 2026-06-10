import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { cityConfig, monetization } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `Affiliate and sponsorship disclosure for ${cityConfig.name}.`,
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Disclosure"
        title="Affiliate & sponsorship disclosure"
        description="Transparency matters. Here's how Keep Waco Wagging earns money while staying useful and local-first."
        tone="sage"
      />
      <Section tone="paper">
        <div className="mx-auto max-w-3xl space-y-6 rounded-card bg-white p-7 text-sm leading-relaxed text-bark-soft ring-1 ring-inset ring-clay/70">
          <p className="font-semibold text-bark">{monetization.affiliateDisclosure}</p>
          <p>{monetization.productDisclosure}</p>
          <div>
            <h2 className="text-lg font-semibold text-bark">Amazon links</h2>
            <p className="mt-2">
              Some shop links may be Amazon affiliate links. Amazon does not
              sponsor, endorse, or approve Keep Waco Wagging. Product links are
              recommendations from practical dog-care experience and may earn a
              commission at no extra cost to you.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-bark">Sponsored placements</h2>
            <p className="mt-2">
              Paid directory listings, sponsor ads, newsletter mentions, guides,
              business spotlights, events, and giveaways are labeled when they
              are sponsored.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-bark">Platinum Scoops</h2>
            <p className="mt-2">
              Keep Waco Wagging is presented by Platinum Scoops, a Waco-based
              business founded by Jackye and Todd Clayton. Platinum Scoops is a
              core part of the site, but the guide is built to be useful to Waco
              dog parents first.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
