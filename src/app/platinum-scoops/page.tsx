import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { EditorialServiceCard } from "@/components/EditorialServiceCard";
import { SitePhoto } from "@/components/SitePhoto";
import { platinumScoops } from "@/data/platinumScoops";
import { sitePhotos } from "@/data/sitePhotos";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Poop Scooping Waco | Platinum Scoops Dog Waste Removal",
  description:
    "Book local dog waste removal in Waco with Platinum Scoops. Weekly scooping starts at $25/week with the first cleanup included.",
};

export default function PlatinumScoopsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platinum Scoops"
        title="Dog waste removal for cleaner Waco yards"
        description={platinumScoops.description}
        tone="sand"
        image={sitePhotos.scooping}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
            {ctas.bookScoops.label}
          </Button>
          <Button href={platinumScoops.phoneHref} variant="secondary" size="lg">
            Call {platinumScoops.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Why families choose us"
          title="Reliable scooping, same technician every visit"
          description={platinumScoops.pricing}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platinumScoops.trustSignals.map((signal) => (
            <EditorialServiceCard key={signal} title={signal} />
          ))}
        </div>
        {/* TODO: Confirm Platinum Scoops review count and licensing details for public marketing copy. */}
      </Section>

      <Section tone="sand" id="yard-services">
        <SectionHeading
          eyebrow="Yard services"
          title="What we scoop and how often"
          description="Residential and commercial pet waste cleanup across greater Waco."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platinumScoops.yardServices.map((service) => (
            <EditorialServiceCard key={service} title={service} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-inset ring-clay/60">
            <SitePhoto
              src={sitePhotos.community.src}
              alt={sitePhotos.community.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Service area"
              title="Greater Waco and nearby communities"
              description={`We serve ${platinumScoops.serviceAreas.join(", ")}.`}
            />
            <p className="mt-4 text-sm leading-relaxed text-bark-soft">
              Platinum Fresh enzyme treatment is included to support cleaner,
              fresher outdoor spaces for your dogs and your family.
            </p>
            <Button href={ctas.bookScoops.href} variant="sponsor" className="mt-6">
              {ctas.bookScoops.label}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70 sm:p-10">
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mt-3 font-display text-3xl">Book your first cleanup</h2>
          <p className="mx-auto mt-3 max-w-2xl text-bark-soft">
            First cleanup included. No long-term commitment. Cancel anytime.
            Book online for current availability or call with questions about
            your yard.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={ctas.bookScoops.href} variant="sponsor">
              {ctas.bookScoops.label}
            </Button>
            <Button href={platinumScoops.phoneHref} variant="secondary">
              {platinumScoops.phoneNumeric}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
