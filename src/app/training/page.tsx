import type { Metadata } from "next";
import { ChevronDown, ClipboardCheck, Award } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TrainingServiceCard } from "@/components/TrainingServiceCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { trainingServices, trainingFaqs } from "@/data/trainingServices";
import { ctas, sponsorLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lifestyle Dog Training in Waco",
  description:
    "Lifestyle dog training in Waco builds real-world skills for walks, patios, parks, guests, and everyday life. Loose-leash walking, puppy field trips, patio manners, and more.",
};

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lifestyle Dog Training"
        title="Training for Real Life, Not Just Perfect Living Rooms"
        description="Build the skills your dog needs for walks, patios, parks, guests, and everyday Waco life."
        tone="sage"
      >
        <Button href={ctas.bookTraining.href} size="lg">
          {ctas.bookTraining.label}
        </Button>
      </PageHeader>

      {/* Positioning */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-bark-soft">
            Lifestyle dog training helps dogs and their humans build real-world
            skills for everyday life in Waco. Instead of drilling commands in a
            quiet room, we practice the things you actually do — calm walks,
            polite greetings, settling on a patio, and staying confident when the
            world gets busy.
          </p>
        </div>
      </Section>

      {/* Service cards */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="What we work on"
          title="Sessions built around your real routine"
          description="Pick the focus that fits your dog right now — or start with an assessment and we'll build a plan together."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainingServices.map((service) => (
            <TrainingServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      {/* Good Waco Citizen */}
      <Section tone="sky">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex justify-center">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-sky-600 text-white shadow-sm">
              <Award className="h-12 w-12" strokeWidth={1.5} />
            </span>
          </div>
          <div>
            <SectionHeading
              eyebrow="A local training path"
              title="The Good Waco Citizen Plan"
            />
            <p className="mt-4 leading-relaxed text-bark-soft">
              We&apos;re building a local training path inspired by real-life
              manners, public confidence, and responsible dog ownership — the
              kind of everyday skills that make Waco more welcoming for all dogs.
              Think calm greetings, polite leash walking, settling in public, and
              being a great neighbor.
            </p>
            <p className="mt-3 text-sm text-bark-faint">
              {/* TODO: Do not claim formal AKC certification unless/until added. */}
              A community-focused program — not a formal certification.
            </p>
            <div className="mt-6">
              <Button href={ctas.bookTraining.href} variant="primary">
                Ask About the Good Waco Citizen Plan
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <TestimonialsSection tone="sand" limit={2} />

      {/* FAQ */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Good questions"
          title="Lifestyle training FAQ"
        />
        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {trainingFaqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70 open:ring-sage-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-bark">
                {faq.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-sage-600 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-bark-soft">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Assessment CTA */}
      <Section tone="sand" id="assessment">
        <div className="overflow-hidden rounded-card bg-sage-700 p-8 text-white sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-600 px-3 py-1 text-xs font-semibold">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Start here
              </span>
              <h2 className="mt-4 text-2xl text-white sm:text-3xl">
                Book a Lifestyle Training Assessment
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-sage-100">
                We&apos;ll look at how your dog handles distractions, recovery,
                and settling, then recommend the right next step — whether that&apos;s
                quiet practice or working up to a busy Waco patio.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Button href={`mailto:${sponsorLinks.email}?subject=Lifestyle%20Training%20Assessment`} variant="secondary" size="lg">
                Book your assessment
              </Button>
              <Button
                href={ctas.learnScoops.href}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                {ctas.learnScoops.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
