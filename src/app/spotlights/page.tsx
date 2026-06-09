import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BusinessSpotlightCard } from "@/components/BusinessSpotlightCard";
import { CTASection } from "@/components/CTASection";
import { spotlights } from "@/data/spotlights";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Local Business Spotlights",
  description:
    "Meet the Waco-area businesses that welcome and support dog parents — dog-friendly places, pet services, local makers, restaurants and patios, and community partners.",
};

const categories = [
  "Dog-friendly places",
  "Pet services",
  "Local makers",
  "Restaurants and patios",
  "Community partners",
];

export default function SpotlightsPage() {
  const featured = spotlights.filter((s) => s.featured);
  const rest = spotlights.filter((s) => !s.featured);

  return (
    <>
      <PageHeader
        eyebrow="Local Business Spotlights"
        title="Waco businesses worth wagging about"
        description="Keep Waco Wagging promotes Waco-area businesses that welcome or support dog parents — from patios with water bowls to the pet services we trust."
        tone="sky"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-100"
            >
              {c}
            </span>
          ))}
        </div>
      </PageHeader>

      {featured.length > 0 && (
        <Section tone="paper">
          <h2 className="text-2xl font-semibold sm:text-3xl">Featured spotlights</h2>
          <div className="mt-8 grid gap-6">
            {featured.map((s) => (
              <BusinessSpotlightCard key={s.id} spotlight={s} />
            ))}
          </div>
        </Section>
      )}

      {rest.length > 0 && (
        <Section tone="sand">
          <h2 className="text-2xl font-semibold sm:text-3xl">More local favorites</h2>
          <div className="mt-8 grid gap-6">
            {rest.map((s) => (
              <BusinessSpotlightCard key={s.id} spotlight={s} />
            ))}
          </div>
        </Section>
      )}

      <CTASection
        eyebrow="For Waco businesses"
        title="Run a dog-friendly business in Waco?"
        description="Get your spot in front of local dog parents. Free basic listings, featured spotlights, and newsletter mentions available."
        primary={ctas.getListed}
        secondary={ctas.learnScoops}
      />
    </>
  );
}
