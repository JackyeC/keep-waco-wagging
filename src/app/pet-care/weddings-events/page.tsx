import type { Metadata } from "next";
import { Check, Heart, PawPrint, Sparkle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EventCareInquiryForm } from "@/components/EventCareInquiryForm";
import {
  eventCareAddOn,
  eventCareFit,
  eventCareIncludes,
  eventCarePackages,
  eventCarePolicies,
} from "@/data/eventCare";
import { sitePhotos } from "@/data/sitePhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { cityConfig, ctas } from "@/lib/site";

const pageTitle = "Wedding Dog Attendant in Waco | Dog of Honor";
const pageDescription =
  "Include your dog in your wedding with a dedicated Dog of Honor wedding pet attendant in Waco. Ceremony support, photo handling, potty breaks, water, quiet time, and safe handoff.";

export const metadata: Metadata = {
  ...servicePageMetadata("/pet-care/weddings-events", pageTitle, pageDescription),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${cityConfig.url}/pet-care/weddings-events`,
    siteName: cityConfig.name,
    type: "website",
    images: [
      {
        url: cityConfig.brand.logo.full.src,
        alt: cityConfig.brand.logo.full.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [cityConfig.brand.logo.full.src],
  },
};

export default function EventCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Dog of Honor by Keep Waco Wagging"
        title="Wedding Dog Attendant in Waco"
        description={
          <>
            <p className="font-display text-xl text-bark sm:text-2xl">
              Make Your Dog Part of the Big Day
            </p>
            <p>
              Your dog can be part of your wedding, proposal, photo session, or
              special celebration without asking a guest to manage the leash.
            </p>
            <p>
              Our dedicated wedding pet attendant handles leash support, potty
              breaks, water, ceremony participation, photos, quiet breaks, and a
              safe handoff when your dog&apos;s part of the celebration is
              complete.
            </p>
          </>
        }
        tone="gold"
        image={sitePhotos.community}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#inquiry" size="lg">
            {ctas.planDogBigDay.label}
          </Button>
          <Button href="#inquiry" variant="secondary" size="lg">
            {ctas.eventCare.label}
          </Button>
        </div>
      </PageHeader>

      {/* Intro */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkle className="mx-auto h-7 w-7 text-gold-600" />
          <h2 className="mt-4 text-3xl">
            Your Dog Is Family. Let Them Be Part of the Memory.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-bark-soft">
            Whether your dog is walking down the aisle, joining family photos,
            greeting guests, or making a short appearance, your wedding pet
            attendant helps everything go more smoothly. We manage your
            dog&apos;s comfort, safety, timing, and routine so you can stay
            present and enjoy the moment.
          </p>
        </div>
      </Section>

      {/* What the service can include */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="What's involved"
          title="What Your Wedding Pet Attendant Can Provide"
          description="Every wedding and celebration is different. We build the right level of wedding pet care around your timeline, your venue, and your dog."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {eventCareIncludes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-card bg-white p-4 text-sm leading-relaxed text-bark-soft ring-1 ring-inset ring-clay/70"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Packages */}
      <Section tone="paper" id="packages">
        <SectionHeading
          eyebrow="Packages"
          title="Choose the level of support that fits your day"
          description="Starting prices below. Final pricing depends on location, duration, number of dogs, and event needs."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {eventCarePackages.map((pkg) => (
            <article
              key={pkg.name}
              className={`flex flex-col rounded-card bg-white p-7 ring-1 ring-inset ${
                pkg.featured
                  ? "ring-2 ring-gold-400 shadow-md"
                  : "ring-clay/70"
              }`}
            >
              {pkg.featured && (
                <Badge tone="gold" className="mb-3 self-start">
                  Most popular
                </Badge>
              )}
              <h3 className="text-xl font-semibold">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bark-soft">
                {pkg.bestFor}
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-bark-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-2xl font-semibold text-sage-700">
                {pkg.startingAt}
              </p>
              <Button href="#inquiry" variant={pkg.featured ? "primary" : "secondary"} className="mt-5">
                {ctas.eventCare.label}
              </Button>
            </article>
          ))}
        </div>

        {/* Add-on */}
        <div className="mt-6 grid items-center gap-6 rounded-card bg-sage-50 p-7 ring-1 ring-inset ring-sage-200 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Badge tone="sage">Add-on</Badge>
            <h3 className="mt-3 text-2xl font-semibold">{eventCareAddOn.name}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bark-soft">
              {eventCareAddOn.description}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {eventCareAddOn.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-bark-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-white p-6 text-center ring-1 ring-inset ring-clay/70">
            <p className="text-2xl font-semibold text-sage-700">{eventCareAddOn.startingAt}</p>
            <Button href="#inquiry" variant="secondary" className="mt-4 w-full">
              Add to My Inquiry
            </Button>
          </div>
        </div>
      </Section>

      {/* Fit note */}
      <Section tone="sky">
        <SectionHeading
          eyebrow="Honest fit check"
          title="Is this right for your dog?"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
            <Badge tone="sage">A good fit</Badge>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed text-bark-soft">
              <Heart className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" />
              {eventCareFit.goodFit}
            </p>
          </div>
          <div className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
            <Badge tone="gold">May not be a fit</Badge>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed text-bark-soft">
              <PawPrint className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              {eventCareFit.notFit}
            </p>
          </div>
        </div>
      </Section>

      {/* Policies */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Good to know"
          title="Our Wedding Pet Attendant Policies"
          description="A few ground rules keep every dog, guest, and moment safe."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {eventCarePolicies.map((policy) => (
            <li key={policy} className="flex items-start gap-3 text-sm leading-relaxed text-bark-soft">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
              {policy}
            </li>
          ))}
        </ul>
      </Section>

      {/* Inquiry form */}
      <Section tone="sand" id="inquiry">
        <SectionHeading
          eyebrow="Tell us about your event"
          title="Start Your Wedding Pet Care Inquiry"
          description="Tell us about your wedding or special event, your dog, and the moment you are hoping to create. We will help you decide what level of support makes sense."
        />
        <div className="mt-8">
          <EventCareInquiryForm />
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="sage">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70 sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl">
            Let Your Dog Be Part of the Day Without Handing the Leash to Your Maid
            of Honor.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-bark-soft">
            Tell us about your wedding or special event, your dog, and the role you
            would love them to play. We will help you build a safe, realistic plan.
          </p>
          <Button href="#inquiry" size="lg" className="mt-6">
            {ctas.planDogBigDay.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
