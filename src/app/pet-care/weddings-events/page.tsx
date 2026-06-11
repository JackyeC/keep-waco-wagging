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
import { ctas } from "@/lib/site";

const eventCareTitle = "Platinum Pup Event Care | Wedding Dog Attendant in Waco";
const eventCareDescription =
  "Include your dog in your Waco wedding, party, photo session, or special event with Platinum Pup Event Care from Platinum Scoops. We help with calm handling, potty breaks, photos, ceremony support, and post-event decompression.";

export const metadata: Metadata = {
  title: eventCareTitle,
  description: eventCareDescription,
  openGraph: {
    title: eventCareTitle,
    description: eventCareDescription,
    url: "/pet-care/weddings-events",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: eventCareTitle,
    description: eventCareDescription,
  },
};

export default function EventCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Platinum Pup Event Care"
        title="Include your dog in the big day — without making your guests manage the leash."
        description="Platinum Pup Event Care gives Waco pet parents a dedicated dog attendant for weddings, parties, photos, proposals, and special events. We help your pup show up for the sweet moments, then step away for breaks, water, rest, and calm support."
        tone="gold"
        image={sitePhotos.community}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#inquiry" size="lg">
            Ask About Event Dog Care
          </Button>
          <Button href="#packages" variant="secondary" size="lg">
            Plan My Pup&apos;s Big Day
          </Button>
        </div>
      </PageHeader>

      {/* Intro */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkle className="mx-auto h-7 w-7 text-gold-600" />
          <h2 className="mt-4 text-3xl">
            Dogs are family, and sometimes they belong in the memory too.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-bark-soft">
            Whether your dog is walking down the aisle, joining family photos,
            greeting guests, or simply making a short appearance, Platinum Pup
            Event Care helps make the moment smoother. We focus on your dog&apos;s
            comfort, timing, safety, and routine so you can stay present at your
            event.
          </p>
        </div>
      </Section>

      {/* What the service can include */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="What's involved"
          title="What event care can include"
          description="Every event is different. We build the right level of support around your timeline, your venue, and your dog."
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
                Ask About This Package
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
          title="Our event care policies"
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
          title="Start your Platinum Pup Event Care inquiry"
          description="Share your event, your dog, and the moment you're hoping to create. We'll help you decide what level of support makes sense."
        />
        <div className="mt-8">
          <EventCareInquiryForm />
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="sage">
        <div className="rounded-card bg-white p-8 text-center ring-1 ring-inset ring-clay/70 sm:p-12">
          <h2 className="mx-auto max-w-2xl text-3xl">
            Want your dog there without handing the leash to your maid of honor?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-bark-soft">
            Tell us about your event, your dog, and the moment you&apos;re hoping
            to create. We&apos;ll help you decide what level of support makes
            sense.
          </p>
          <Button href="#inquiry" size="lg" className="mt-6">
            {ctas.eventCare.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
