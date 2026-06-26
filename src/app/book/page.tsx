import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CampSponsorCallout } from "@/components/CampSponsorCallout";
import { CommunityPartners } from "@/components/CommunityPartners";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PresentingSponsor } from "@/components/PresentingSponsor";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { communityPartners } from "@/data/communityPartners";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/book",
  "Book Pet Care & Camp in Waco",
  `${brandLanguage.heroLine}. ${brandLanguage.brandByLine}.`,
);

const bookingPaths = [
  {
    title: "Poop scoop & yard care",
    description:
      "Recurring pet waste removal and one-time yard cleanups across greater Waco.",
    href: ctas.bookScoops.href,
    external: true,
    label: ctas.bookScoops.label,
    learnHref: "/platinum-scoops",
  },
  {
    title: "Daycare & boarding",
    description:
      "Home-based dog daycare and boarding with full-time care professionals on Rover.",
    href: ctas.bookPetCare.href,
    external: true,
    label: "Book on Rover",
    learnHref: "/pet-care",
  },
  {
    title: "Lifestyle training",
    description:
      "Patio manners, loose-leash walks, puppy field trips, and calm-home coaching in Waco.",
    href: ctas.trainingWaitlist.href,
    external: true,
    label: "Ask about training",
    learnHref: "/training",
  },
  {
    title: brandLanguage.dogCampName,
    description:
      "Thirteen themed summer weeks — drop in for a day or join the full week. Reserve on Rover.",
    href: ctas.bookPetCare.href,
    external: true,
    label: "Reserve on Rover",
    learnHref: "/summer-daycare",
    learnLabel: "View camp details",
  },
  {
    title: "Dog of Honor Wedding Pet Care",
    description:
      "A dedicated wedding pet attendant for Waco weddings and special celebrations.",
    href: ctas.eventCare.href,
    external: false,
    label: ctas.eventCare.label,
    learnHref: "/pet-care/weddings-events",
  },
];

export default function BookPage() {
  return (
    <>
      <section className="border-b border-clay bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="font-display text-lg tracking-tight text-bark sm:text-xl">
            {brandLanguage.primaryName}
          </p>
          <PresentingSponsor className="mt-3" showServices />
          <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            Book pet care in Waco
          </h1>
          <p className="dek mt-5 max-w-2xl">{brandLanguage.heroLine}</p>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Services"
          title="Choose how you want to book"
          description={brandLanguage.sponsorServices}
        />
        <ul className="mt-10 divide-y divide-clay border-y border-clay">
          {bookingPaths.map((path) => (
            <li
              key={path.title}
              className="grid gap-4 py-7 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <h3 className="font-display text-xl text-bark">{path.title}</h3>
                <p className="dek mt-2 text-sm">{path.description}</p>
                <Link
                  href={path.learnHref}
                  className="mt-2 inline-block text-xs font-medium text-sage-700 hover:underline"
                >
                  {path.learnLabel ?? "Learn more about this service"} →
                </Link>
              </div>
              {path.external ? (
                <a
                  href={path.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-bark px-5 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-bark-soft"
                >
                  {path.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Button href={path.href} size="sm">
                  {path.label}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <CampSponsorCallout tone="cream" />
          <div>
            <p className="eyebrow">{brandLanguage.brandByLine}</p>
            <h2 className="headline-secondary mt-3">{cityConfig.sponsor.name}</h2>
            <p className="dek mt-4 text-base">
              {communityPartners[0]?.sponsorDescription}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={ctas.learnScoops.href} variant="secondary" size="sm">
                About {cityConfig.sponsor.name}
              </Button>
              <Button href={ctas.becomeSponsor.href} variant="ghost" size="sm">
                {brandLanguage.communityPartnersWelcome}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <CommunityPartners />
      </Section>

      <NewsletterSignup
        id="updates-signup"
        sourcePage="/book"
        variant="section"
      />
    </>
  );
}
