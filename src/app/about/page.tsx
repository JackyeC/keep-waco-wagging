import type { Metadata } from "next";
import Link from "next/link";
import { Heart, MapPin, Sparkles, Store, GraduationCap, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/Button";
import { RoverCTA } from "@/components/RoverCTA";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { cityConfig, siteConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Keep Waco Wagging",
  description:
    "Keep Waco Wagging is a local guide for Waco dog parents, presented by Platinum Scoops — dog-friendly places, local businesses, events, training tips, and yard care education.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A warm, local guide for Waco dog parents"
        description="Keep Waco Wagging is a local guide for Waco dog parents, presented by Platinum Scoops. We help families find dog-friendly places, local businesses, events, training tips, yard care education, and practical resources for enjoying life with dogs in Waco."
        tone="sage"
        showSponsor
      />

      {/* Founder story */}
      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-card bg-gradient-to-br from-sage-50 to-cream p-7 ring-1 ring-inset ring-sage-200">
            <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
              Meet the founder
            </p>
            <h2 className="mt-2 text-2xl">{cityConfig.founder.name}</h2>
            <p className="mt-1 text-sm font-medium text-bark-soft">
              {cityConfig.founder.title}
            </p>
            <p className="mt-4 leading-relaxed text-bark-soft">
              {cityConfig.founder.bio}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={ctas.bookTraining.href} size="sm">
                Book training
              </Button>
              <Button href={ctas.bookRover.href} variant="secondary" size="sm">
                Book on Rover
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold">Lifestyle dog training</h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-soft">
                I help Waco dog families build real-world skills — calm patios,
                polite greetings, loose-leash walks, and confidence in busy places.
                Training that fits your actual routine, not just a quiet living room.
              </p>
              <Link
                href="/training"
                className="mt-3 inline-block text-sm font-semibold text-sage-700 hover:text-sage-800"
              >
                Explore training services →
              </Link>
            </div>
            <RoverCTA variant="inline" />
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section tone="sand">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-card bg-sage-50 p-7 ring-1 ring-inset ring-sage-200">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-600 text-white">
              <Heart className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-2xl">Our mission</h2>
            <p className="mt-3 leading-relaxed text-bark-soft">
              To help Waco dog parents enjoy calmer outings, cleaner yards,
              better manners, and more fun with their dogs — by being the one
              trusted, friendly place to find dog-friendly spots, local
              resources, and real-life training help.
            </p>
          </div>
          <div className="rounded-card bg-sky-50 p-7 ring-1 ring-inset ring-sky-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-2xl">Who it&apos;s for</h2>
            <p className="mt-3 leading-relaxed text-bark-soft">
              Dog parents in {siteConfig.serviceAreas.join(", ")}, and nearby
              {cityConfig.county} areas who want dog-friendly patios, parks and
              trails, local events, trusted pet businesses, weekend ideas, and
              practical advice for taking dogs into public spaces.
            </p>
          </div>
        </div>
      </Section>

      {/* Why Platinum Scoops sponsors it */}
      <Section tone="paper">
        <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Presented by Platinum Scoops"
              title="Why Platinum Scoops sponsors Keep Waco Wagging"
            />
            <div className="mt-4 space-y-4 leading-relaxed text-bark-soft">
              <p>
                Platinum Scoops is a Waco-based pet care and yard care brand that
                works with local dog families every day. We see firsthand how
                much easier life with a dog becomes when you have the right
                places to go, the right local pros to call, and a little help
                building everyday skills.
              </p>
              <p>
                Sponsoring Keep Waco Wagging is how we give back: investing in
                free, practical education and a trusted local guide — trust
                first, always. When you&apos;re ready for a cleaner yard or calmer
                routine, we hope you&apos;ll think of us.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={ctas.learnScoops.href} variant="sponsor">
                {ctas.learnScoops.label}
              </Button>
              <Button href={ctas.bookScoops.href} variant="secondary">
                {ctas.bookScoops.label}
              </Button>
            </div>
          </div>
          <div className="rounded-card bg-gradient-to-br from-gold-100 via-cream to-sage-50 p-7 ring-1 ring-inset ring-gold-200">
            <Sparkles className="h-7 w-7 text-gold-500" />
            <p className="mt-3 font-display text-xl leading-snug">
              Built to grow into a local media brand, business directory,
              newsletter, and community hub for Waco dog parents — and a model
              we can bring to other cities.
            </p>
          </div>
        </div>
      </Section>

      <TestimonialsSection tone="sand" limit={2} />

      {/* How businesses can participate */}
      <Section tone="paper">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <Store className="h-10 w-10" strokeWidth={1.5} />
            </span>
          </div>
          <div>
            <SectionHeading
              eyebrow="For local businesses"
              title="How local businesses can participate"
            />
            <p className="mt-4 leading-relaxed text-bark-soft">
              If you run a dog-friendly, pet-related, or dog-parent-useful
              business in the Waco area, you can join the directory, be featured
              in a spotlight, get a newsletter mention, or promote an event.
              Free basic listings are always available.
            </p>
            <div className="mt-6">
              <Button href={ctas.getListed.href}>{ctas.getListed.label}</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <Section tone="sand">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}
