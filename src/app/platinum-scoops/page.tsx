import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { scoopsServices } from "@/data/scoopsServices";
import { ctas, sponsorLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet Platinum Scoops — Waco Pet Waste Removal & Yard Care",
  description:
    "Platinum Scoops is the Waco pet care brand behind Keep Waco Wagging. Pet waste removal, yard odor support, pre-party yard prep, and lifestyle dog support across greater Waco.",
};

const whatWeDo = [
  "Pet waste removal",
  "Yard odor support",
  "Dog-friendly yard education",
  "Lifestyle dog support",
  "Local Waco pet-parent resources",
];

export default function PlatinumScoopsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Presented by Platinum Scoops"
        title="Meet Platinum Scoops"
        description="The Waco pet care brand behind Keep Waco Wagging."
        tone="gold"
      />

      {/* Intro copy */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-bark-soft">
            Platinum Scoops helps Waco dog families keep their yards cleaner,
            fresher, and easier to enjoy. As the presenting sponsor of Keep Waco
            Wagging, Platinum Scoops supports local dog parents with practical
            education, pet waste cleanup, yard care, and lifestyle support.
          </p>
        </div>
      </Section>

      {/* 1. What Platinum Scoops does */}
      <Section tone="sand">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What we do"
              title="Cleaner yards, calmer routines"
            />
            <ul className="mt-6 space-y-3">
              {whatWeDo.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-bark-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-gradient-to-br from-gold-100 via-cream to-sage-50 p-8 ring-1 ring-inset ring-gold-200">
            <p className="font-display text-2xl leading-snug text-bark">
              &ldquo;A clean yard is the foundation of a calmer, happier life
              with your dog.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-gold-600">
              — The Platinum Scoops team
            </p>
          </div>
        </div>
      </Section>

      {/* 2. Why we created Keep Waco Wagging */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Our why"
            title="Why we created Keep Waco Wagging"
          />
          <div className="mt-4 space-y-4 leading-relaxed text-bark-soft">
            <p>
              Waco dog parents kept asking us the same questions: Where can I
              take my dog? Which patios actually welcome dogs? Is there a good
              trail nearby? Who do you trust for grooming, the vet, or daycare?
            </p>
            <p>
              We realized there wasn&apos;t one trusted place to find dog-friendly
              spots, local pet resources, training tips, and weekend ideas — so
              we built it. Keep Waco Wagging is our way of giving back to the
              local dog community that makes this work so rewarding.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Services preview */}
      <Section tone="sand" id="services">
        <SectionHeading
          eyebrow="Services preview"
          title="How we can help"
          description="From recurring scooping to a fresh, guest-ready yard — plus a path to calmer routines through lifestyle dog training."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scoopsServices.map((service) => (
            <article
              key={service.id}
              className="flex h-full flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-bark-soft">
                {service.summary}
              </p>
              {service.href && (
                <Button
                  href={service.href}
                  variant="secondary"
                  size="sm"
                  className="mt-4 w-fit"
                >
                  Learn more
                </Button>
              )}
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-bark-faint">
          {sponsorLinks.pricingNote}{" "}
          <a
            href={sponsorLinks.phoneHref}
            className="font-medium text-sage-700 hover:text-sage-800"
          >
            {sponsorLinks.phone}
          </a>{" "}
          ·{" "}
          <a
            href={sponsorLinks.email}
            className="font-medium text-sage-700 hover:text-sage-800"
          >
            {sponsorLinks.email}
          </a>
        </p>
      </Section>

      {/* 4. CTA section */}
      <Section tone="paper" id="book">
        <div className="overflow-hidden rounded-card bg-gradient-to-r from-gold-500 to-gold-400 p-8 text-center sm:p-14">
          <h2 className="mx-auto max-w-2xl text-2xl text-bark sm:text-3xl md:text-4xl">
            Want a cleaner yard or a calmer dog routine?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-bark/80">
            {sponsorLinks.pricingNote}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={sponsorLinks.booking}
              variant="primary"
              size="lg"
              className="w-full bg-bark text-white hover:bg-bark/90 sm:w-auto"
            >
              {ctas.bookScoops.label}
            </Button>
            <Button
              href={sponsorLinks.phoneHref}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Call {sponsorLinks.phone}
            </Button>
            <Button
              href={ctas.trainingHelp.href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Lifestyle Training
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
