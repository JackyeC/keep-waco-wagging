import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { TrainingServiceCard } from "@/components/TrainingServiceCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { trainingFaqs, trainingServices } from "@/data/trainingServices";
import { sitePhotos } from "@/data/sitePhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/training",
  "Lifestyle Dog Training Waco",
  "Practical dog training in Waco — patio manners, loose-leash walks, puppy socialization, and calm-home skills. Keep Waco Wagging by Platinum Scoops.",
);

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Training for real life"
        title="Lifestyle dog training in Waco"
        description="Training built for the outings you actually take — patios, sidewalks, guests at the door, and busy public places. Not formal obedience in a quiet room."
        tone="cream"
        showSiteName
        image={{
          ...sitePhotos.borderCollieJoy,
          caption: sitePhotos.borderCollieJoy.alt,
        }}
      >
        <Button href={ctas.trainingWaitlist.href} variant="primary" size="lg">
          Ask about training
        </Button>
      </PageHeader>

      <Section tone="paper" className="!py-10">
        <p className="caption max-w-3xl text-bark-faint">
          Session length, pricing, and booking flow for lifestyle training are
          not yet published — contact us to discuss fit and availability before
          booking.
        </p>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="What we coach"
          title="Skills for patios, walks, puppies, and calm homes"
          description={`Coaching from ${cityConfig.founders.names} — the same family-run team behind ${cityConfig.sponsor.name} pet care.`}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainingServices.map((service) => (
            <TrainingServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Also on the site"
          title="Training & events"
          description="Lifestyle training pairs with our wedding pet attendant services for weddings and special celebrations."
          size="compact"
        />
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button href="/pet-care/weddings-events" variant="secondary">
            Dog of Honor Wedding Pet Care
          </Button>
          <Button href="/pet-care" variant="ghost">
            Daycare & boarding
          </Button>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="FAQ" title="Common questions" size="compact" />
        <dl className="mt-8 divide-y divide-clay border-y border-clay">
          {trainingFaqs.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-display text-lg text-bark">{item.q}</dt>
              <dd className="dek mt-2 text-base">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTASection
        eyebrow={brandLanguage.brandByLine}
        title="Ready to talk about your dog's goals?"
        description={`Email ${cityConfig.publicEmail} or call ${cityConfig.sponsor.phoneDisplay} to discuss lifestyle training in ${cityConfig.city}.`}
        primary={{
          label: ctas.trainingWaitlist.label,
          href: ctas.trainingWaitlist.href,
        }}
        secondary={{ label: ctas.bookService.label, href: ctas.bookService.href }}
        tone="sage"
      />
    </>
  );
}
