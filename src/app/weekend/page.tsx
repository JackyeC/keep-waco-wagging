import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { WeekendGuideBlock } from "@/components/WeekendGuideBlock";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AdSlot } from "@/components/AdSlot";
import { Badge } from "@/components/ui/Badge";
import { weekendBlocks, weekendEdition } from "@/data/weekend";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/weekend",
  "Waco Dog Weekend | What To Do With Your Dog This Weekend",
  "A curated weekend guide for Waco dog parents — a patio, a park, a heat check, and what to skip. Not a scraped list of everything that allows dogs.",
);

export default function WeekendPage() {
  return (
    <>
      <PageHeader
        eyebrow="Waco Dog Weekend"
        title="What can we do with the dog this weekend?"
        description={
          <>
            <p>{weekendEdition.intro}</p>
            <p className="text-[15px]">
              {brandLanguage.heroLine} We pick a few things worth considering —
              including when the weather says stay home.
            </p>
          </>
        }
        tone="sky"
        showSponsor
      >
        <Badge tone="sky">{weekendEdition.label}</Badge>
      </PageHeader>

      <Section tone="paper">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          This week&rsquo;s picks
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {weekendBlocks.map((block) => (
            <WeekendGuideBlock key={block.id} block={block} />
          ))}
          <AdSlot placement="weekend" />
        </div>
      </Section>

      <Section tone="sand" id="newsletter">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup variant="card" sourcePage="/weekend" />
        </div>
      </Section>
    </>
  );
}
