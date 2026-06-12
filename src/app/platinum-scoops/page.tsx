import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SitePhoto } from "@/components/SitePhoto";
import { platinumScoops } from "@/data/platinumScoops";
import { sitePhotos } from "@/data/sitePhotos";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Platinum Scoops Waco | Dog Waste Removal & Cleaner Yard Service",
  description:
    "Book local dog waste removal in Waco with Platinum Scoops. Weekly scooping starts at $25/week with the first cleanup included.",
};

export default function PlatinumScoopsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Presented by Platinum Scoops"
        title="Cleaner yards for Waco dog families"
        description={platinumScoops.description}
        tone="gold"
        image={sitePhotos.scooping}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.bookScoops.href} size="lg">
            Book a Scoop
          </Button>
          <Button href={platinumScoops.phoneHref} variant="secondary" size="lg">
            Call {platinumScoops.phoneDisplay}
          </Button>
        </div>
      </PageHeader>

      <Section tone="paper">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platinumScoops.trustSignals.map((signal) => (
            <div key={signal} className="flex items-start gap-3 rounded-card bg-white p-4 ring-1 ring-inset ring-clay/70">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" />
              <span className="text-sm font-medium text-bark-soft">{signal}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand" id="yard-services">
        <SectionHeading
          eyebrow="Yard services"
          title="Dog waste removal and yard odor support"
          description={platinumScoops.pricing}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platinumScoops.yardServices.map((service) => (
            <ServiceCard key={service} title={service} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-md ring-1 ring-inset ring-clay/60">
            <SitePhoto
              src={sitePhotos.boarding.src}
              alt={sitePhotos.boarding.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-8">
            <div>
              <SectionHeading
                eyebrow="Pet care services"
                title="More ways Platinum Scoops supports dog families"
                description={platinumScoops.petCarePricing}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {platinumScoops.petCareServices.map((service) => (
                  <ServiceCard key={service} title={service} />
                ))}
              </div>
            </div>
            <div className="rounded-card bg-gradient-to-br from-gold-100 via-cream to-sage-50 p-8 ring-1 ring-inset ring-gold-200">
              <Sparkles className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 text-2xl">Spotless yard from $3.57/day</h3>
              <p className="mt-3 text-sm leading-relaxed text-bark-soft">
                First cleanup included. No commitment. Cancel anytime. Platinum
                Fresh enzyme treatment is included to support cleaner, fresher dog
                spaces.
              </p>
              <Button href={ctas.bookScoops.href} variant="sponsor" className="mt-6">
                Book a Scoop
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sage">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70">
          <Badge tone="gold">Family-run Waco business</Badge>
          <h2 className="mt-4 text-3xl">Ready for a cleaner yard?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-bark-soft">
            Book online for current availability and service details, or call us
            if you have questions about service areas and yard needs.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={ctas.bookScoops.href}>Book a Scoop</Button>
            <Button href={platinumScoops.phoneHref} variant="secondary">
              {platinumScoops.phoneNumeric}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function ServiceCard({ title }: { title: string }) {
  return (
    <article className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
      <Check className="h-5 w-5 text-sage-600" />
      <h3 className="mt-3 text-base font-semibold text-bark">{title}</h3>
    </article>
  );
}
