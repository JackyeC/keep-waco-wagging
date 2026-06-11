import type { Metadata } from "next";
import { Check, Heart, Star } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { rover } from "@/data/rover";
import { ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waco Dog Boarding, Daycare & Pet Care | Jackye and Todd",
  description:
    "Home-based dog boarding, daycare, drop-ins, and dog walking in Waco with Jackye and Todd, full-time pet care professionals.",
};

export default function PetCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Pet care"
        title="Home-based Waco dog boarding, daycare, drop-ins, and walks"
        description={`${rover.positioning}. ${rover.tagline}. Dogs get practical care, structure, updates, and a family-run environment.`}
        tone="sky"
      >
        <Button href={ctas.bookPetCare.href} size="lg">
          {ctas.bookPetCare.label}
        </Button>
      </PageHeader>

      <Section tone="paper">
        <div className="grid gap-4 rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 sm:grid-cols-3">
          <TrustItem icon={<Star className="h-5 w-5" />} title={`${rover.rating} stars`} body={`${rover.reviewCount} Rover reviews`} />
          <TrustItem icon={<Heart className="h-5 w-5" />} title="Full-time care" body="Pet care is the profession, not a side gig." />
          <TrustItem icon={<Check className="h-5 w-5" />} title="Home routine" body="Walks, play, enrichment, structured rest, and updates." />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Services and prices"
          title="Rover services"
          description={rover.pricingNote}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rover.services.map((service) => (
            <article key={service.name} className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="mt-2 text-2xl font-semibold text-sage-700">{service.price}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="sage">
        <div className="rounded-card bg-white p-8 ring-1 ring-inset ring-clay/70 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl">
            <Badge tone="gold">New this summer</Badge>
            <h2 className="mt-3 text-3xl">Summer Daycare Camp</h2>
            <p className="mt-3 text-bark-soft">
              A new themed week all summer long — splash days, sniff safaris,
              manners camp, and more — with the same calm, full-time home care.
              Reserve the weeks your dog wants on Rover.
            </p>
          </div>
          <div className="mt-6 shrink-0 lg:mt-0">
            <Button href="/summer-daycare" size="lg">
              See the summer calendar
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What dogs can expect" title="Care with rhythm, updates, and rest" />
            <p className="mt-4 leading-relaxed text-bark-soft">{rover.bio}</p>
          </div>
          <div className="rounded-card bg-sage-50 p-6 ring-1 ring-inset ring-sage-200">
            <h3 className="text-xl font-semibold">Home environment</h3>
            <p className="mt-3 text-sm leading-relaxed text-bark-soft">
              A lived-in Waco dog home with three resident dogs and a foster.
              Visiting dogs are supported with routine, supervision, and
              attention to group dynamics.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="sky">
        <div className="grid gap-8 lg:grid-cols-2">
          <FitList title="Good fit for" items={rover.goodFit} tone="sage" />
          <FitList
            title="May not be the best fit for"
            items={rover.mayNotBeFit}
            tone="gold"
            note="No judgment — some dogs simply need a different setup to stay safe and comfortable."
          />
        </div>
      </Section>

      <TestimonialsSection tone="paper" />

      <Section tone="sand">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70">
          <h2 className="text-3xl">Ready to check dates on Rover?</h2>
          <p className="mx-auto mt-3 max-w-xl text-bark-soft">
            Availability and prices can change, so Rover is the best place to see
            current openings and request care.
          </p>
          <Button href={ctas.bookPetCare.href} size="lg" className="mt-6">
            Book Pet Care
          </Button>
        </div>
      </Section>
    </>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
        {icon}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-bark-soft">{body}</p>
      </div>
    </div>
  );
}

function FitList({
  title,
  items,
  tone,
  note,
}: {
  title: string;
  items: readonly string[];
  tone: "sage" | "gold";
  note?: string;
}) {
  return (
    <div className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
      <Badge tone={tone}>{title}</Badge>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-bark-soft">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
            {item}
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-xs leading-relaxed text-bark-faint">{note}</p>}
    </div>
  );
}
