import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EditorialTeaser } from "@/components/EditorialFeature";
import { EditorialPhotoSpread } from "@/components/EditorialPhotoSpread";
import { rover } from "@/data/rover";
import { SitePhoto } from "@/components/SitePhoto";
import { editorialSpreads, sitePhotos } from "@/data/sitePhotos";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Daycare & Boarding Waco | Platinum Scoops Pet Care",
  description:
    "Home-based dog boarding, daycare, drop-ins, and walks in Waco with Jackye and Todd — full-time pet care professionals on Rover.",
};

export default function PetCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Home Stay"
        title="Daycare and boarding in a calm Waco home"
        description={`${rover.positioning}. ${rover.tagline}. Check Rover for current availability, rates, and open dates.`}
        tone="cream"
        image={{
          ...sitePhotos.boarding,
          caption: sitePhotos.boarding.alt,
        }}
      >
        <Button href={ctas.bookPetCare.href} variant="primary" size="lg">
          Check Daycare Availability
        </Button>
      </PageHeader>

      <Section tone="paper" className="!py-10">
        <dl className="grid divide-y divide-clay border-y border-clay sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Stat label="Rover rating" value={`${rover.rating} stars`} detail={`${rover.reviewCount} reviews`} />
          <Stat label="Care model" value="Full-time" detail="Pet care is the profession, not a side gig." />
          <Stat label="Daily rhythm" value="Structured" detail="Walks, play, enrichment, rest, and updates." />
        </dl>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Services on Rover"
          title="Boarding, daycare, drop-ins, and walks"
          description={rover.pricingNote}
        />
        <div className="mt-10 divide-y divide-clay border-y border-clay">
          {rover.services.map((service) => (
            <div
              key={service.name}
              className="flex items-baseline justify-between gap-4 py-4 sm:py-5"
            >
              <h3 className="font-medium text-bark">{service.name}</h3>
              <p className="shrink-0 font-display text-xl text-bark">{service.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button href={ctas.bookPetCare.href} size="lg">
            Check Daycare Availability
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="What dogs can expect"
          title="Care with rhythm, updates, and rest"
          size="compact"
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <p className="leading-relaxed text-bark-soft">{rover.bio}</p>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-sand">
              <SitePhoto
                src={sitePhotos.boardingDogs.src}
                alt={sitePhotos.boardingDogs.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="caption mt-2">{sitePhotos.boardingDogs.alt}</figcaption>
          </figure>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-sand">
              <SitePhoto
                src={sitePhotos.boardingHome.src}
                alt={sitePhotos.boardingHome.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <figcaption className="caption mt-2">{sitePhotos.boardingHome.alt}</figcaption>
          </figure>
          <div className="space-y-0 divide-y divide-clay border-y border-clay">
            <aside className="py-6">
              <p className="eyebrow">Environment</p>
              <h3 className="headline-tertiary mt-2">A lived-in Waco dog home</h3>
              <p className="mt-3 text-sm leading-relaxed text-bark-soft">
                Resident dogs and experience supporting group dynamics,
                high-energy dogs, puppies, seniors, and medication support.
              </p>
            </aside>
            <EditorialTeaser
              department="Summer camp"
              title="Summer Daycare Camp"
              dek="Themed weeks all summer — splash days, sniff safaris, manners camp, and more. Reserve weeks on Rover."
              href={ctas.summerDaycare.href}
              ctaLabel={ctas.summerDaycare.label}
              image={sitePhotos.summerCamp}
              className="border-t-0 pt-6"
            />
            <EditorialTeaser
              department="Events"
              title="Platinum Pup Event Care"
              dek="A dedicated dog attendant for weddings, parties, photos, and special events in the Waco area."
              href={ctas.eventCare.href}
              ctaLabel={ctas.eventCare.label}
              className="border-t-0"
            />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <EditorialPhotoSpread
          eyebrow="Home Stay"
          title="Summer camp in the backyard"
          photos={editorialSpreads.summerWeeks}
          layout="strip"
        />
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FitList title="Good fit for" items={rover.goodFit} />
          <FitList
            title="May not be the best fit for"
            items={rover.mayNotBeFit}
            note="No judgment — some dogs simply need a different setup to stay safe and comfortable."
          />
        </div>
      </Section>

      <TestimonialsSection tone="paper" />

      <Section tone="sand">
        <div className="editorial-panel mx-auto max-w-xl p-8 text-center sm:p-10">
          <p className="eyebrow">Availability</p>
          <h2 className="headline-tertiary mt-3">Ready to check dates?</h2>
          <p className="mt-3 text-sm leading-relaxed text-bark-soft">
            Availability and prices can change. Rover is the best place to see
            current openings and request care.
          </p>
          <Button href={ctas.bookPetCare.href} size="lg" className="mt-6">
            Check Daycare Availability
          </Button>
        </div>
      </Section>
    </>
  );
}

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="px-0 py-5 sm:px-6 sm:py-6">
      <dt className="eyebrow">{label}</dt>
      <dd className="headline-tertiary mt-2">{value}</dd>
      <dd className="mt-1 text-sm text-bark-soft">{detail}</dd>
    </div>
  );
}

function FitList({
  title,
  items,
  note,
}: {
  title: string;
  items: readonly string[];
  note?: string;
}) {
  return (
    <div>
      <p className="eyebrow eyebrow-brass">{title}</p>
      <ul className="mt-4 space-y-3 border-t border-clay pt-4">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-bark-soft">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-bark-faint" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      {note && (
        <p className="caption mt-4">{note}</p>
      )}
    </div>
  );
}
