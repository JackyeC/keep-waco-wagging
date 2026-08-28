import type { Metadata } from "next";
import Link from "next/link";
import { Bath, CalendarHeart, GraduationCap, Home, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RoverReferralCta } from "@/components/RoverReferralCta";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/dog-care",
  "Dog Care in Waco | Boarding, Daycare, Training & Poop Scooping",
  "Trusted Waco dog care from Keep Waco Wagging and Platinum Scoops — home-based boarding and daycare, lifestyle training, summer dog camp, and weekly poop scooping across Waco and McLennan County.",
);

const services = [
  {
    icon: Home,
    title: "Boarding & Daycare",
    copy: "A calm Waco home, not a kennel — full-time attention, enrichment, and daily photo updates.",
    href: "/pet-care",
    cta: "See Boarding & Daycare",
  },
  {
    icon: GraduationCap,
    title: "Lifestyle Training",
    copy: "Practical, real-life skills — patio manners, loose-leash walks, and calm-home coaching.",
    href: "/training",
    cta: "See Training",
  },
  {
    icon: Bath,
    title: "Poop Scooping & Yard Service",
    copy: "Weekly dog waste removal from Platinum Scoops so your yard stays usable through the Texas heat.",
    href: "/platinum-scoops",
    cta: "See Poop Scooping",
  },
  {
    icon: Sparkles,
    title: "Summer Dog Camp",
    copy: "Themed weeks of supervised play, enrichment, and rest — drop in for a day or join the week.",
    href: "/summer-daycare",
    cta: "See Summer Camp",
  },
  {
    icon: CalendarHeart,
    title: "Dog of Honor Wedding Care",
    copy: "A dedicated wedding dog chaperone so your pup can be part of the big day.",
    href: "/pet-care/weddings-events",
    cta: "See Wedding Pet Care",
  },
] as const;

export default function DogCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Dog Care"
        title="Trusted dog care for Waco families"
        description="When your dog should stay somewhere safe — boarding, daycare, training, camp, and poop scooping from the family behind Keep Waco Wagging. For other local groomers, vets, and sitters, use the directory. We recommend more than our own work."
        tone="sage"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/book" variant="sage" size="lg">
            Book Dog Care
          </Button>
          <Button href="/dog-friendly-waco" variant="secondary" size="lg">
            Other local resources
          </Button>
        </div>
      </PageHeader>

      <div className="bg-cream pt-12">
        <RoverReferralCta />
      </div>

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we offer"
          title="Ways we care for your dog"
          description="Every service is run by real people who get to know your dog. Book through our booking hub or reach out directly."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="card-panel flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-[1.4rem] font-medium text-serif-ink">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body-muted">
                  {service.copy}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={service.href}
                    className="text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:text-wag-sage"
                  >
                    {service.cta} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-[20px] bg-sage-50 p-8 ring-1 ring-sage-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[15px] leading-relaxed text-bark-soft">
            Not sure which service fits? Our booking hub walks you through
            boarding, daycare, training, camp, and wedding care.
          </p>
          <Button href="/book" variant="sage" size="lg" className="shrink-0">
            Book Dog Care
          </Button>
        </div>
      </Section>
    </>
  );
}
