import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { WeekendGuideBlock } from "@/components/WeekendGuideBlock";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Badge } from "@/components/ui/Badge";
import { weekendBlocks, weekendEdition } from "@/data/weekend";

export const metadata: Metadata = {
  title: "Where to Wag This Weekend",
  description:
    "Your weekly guide to dog-friendly Waco — events, patio picks, parks and trails, a training skill of the week, weather reminders, and local shoutouts.",
};

export default function WeekendPage() {
  return (
    <>
      <PageHeader
        eyebrow="Updated weekly"
        title="Where to Wag This Weekend"
        description={weekendEdition.intro}
        tone="sky"
        showSponsor
      >
        <Badge tone="sky">{weekendEdition.label}</Badge>
      </PageHeader>

      <Section tone="paper">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          This weekend&apos;s dog-friendly ideas
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {weekendBlocks.map((block) => (
            <WeekendGuideBlock key={block.id} block={block} />
          ))}
        </div>
      </Section>

      <Section tone="sand" id="newsletter">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}
