import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  GraduationCap,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sparkle,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DogDirectoryCard } from "@/components/DogDirectoryCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { platinumScoops } from "@/data/platinumScoops";
import { getFeaturedDirectoryListings } from "@/data/directory";
import { SitePhoto } from "@/components/SitePhoto";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waco Dog Care: Poop Scooping, Boarding & Daycare | Platinum Scoops",
  description:
    "Platinum Scoops makes Waco dog life easier: recurring poop scooping, trusted boarding and daycare, training support, and premium event dog care. Cleaner yards, better routines, more fun together.",
};

const services = [
  {
    icon: Sparkles,
    image: sitePhotos.scooping,
    title: "Poop Scooping",
    body:
      "Reliable weekly and every-other-week yard cleanups, plus odor support and the Platinum Fresh enzyme treatment. The same technician, every visit.",
    price: "Starts at $25/week · first cleanup included",
    cta: ctas.bookScoops,
    variant: "sponsor" as const,
    href: "/platinum-scoops",
  },
  {
    icon: Home,
    image: sitePhotos.boardingDogs,
    title: "Boarding & Daycare",
    body:
      "Full-time, home-based care with Jackye and Todd — routines, socialization, structured rest, and real updates. Boarding, daycare, drop-ins, and walks.",
    price: `${cityConfig.rover.rating}★ on Rover · ${cityConfig.rover.reviewCount} reviews`,
    cta: ctas.bookPetCare,
    variant: "primary" as const,
    href: "/pet-care",
  },
  {
    icon: GraduationCap,
    image: sitePhotos.training,
    title: "Training Support",
    body:
      "Practical, real-life help for walks, manners, and calmer days. Now forming — join the waitlist and we'll reach out as spots open.",
    price: "Now forming · waitlist open",
    cta: ctas.trainingWaitlist,
    variant: "secondary" as const,
    href: "/pet-care",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Licensed, insured, and local",
    body: "A family-run Waco business — not a faceless app or a side gig.",
  },
  {
    icon: Star,
    title: "Trusted by Waco dog families",
    body: `${cityConfig.rover.rating}-star care on Rover and 35+ scooping reviews.`,
  },
  {
    icon: Users,
    title: "One team for the whole routine",
    body: "Cleaner yards, trusted care, and community — all in one place.",
  },
];

export default function HomePage() {
  const directory = getFeaturedDirectoryListings(3);

  return (
    <>
      {/* 1. Hero — service-first */}
      <section className="bg-gradient-to-br from-sage-100 via-cream to-sky-100">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <Badge tone="gold">{cityConfig.sponsor.line}</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Waco dog care that makes life easier.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bark-soft">
              Recurring poop scooping, trusted boarding and daycare, training
              support, and premium event dog care — for dog families who want
              cleaner yards, better routines, and more fun together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
                {ctas.bookScoops.label}
              </Button>
              <Button href={ctas.bookPetCare.href} variant="secondary" size="lg">
                {ctas.bookPetCare.label}
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-bark-soft">
              <li className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                {cityConfig.rover.rating} on Rover ({cityConfig.rover.reviewCount} reviews)
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-sage-600" />
                Licensed &amp; insured
              </li>
              <li className="flex items-center gap-1.5">
                <Home className="h-4 w-4 text-sage-600" />
                Family-run in Waco
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-md ring-1 ring-inset ring-clay/60">
              <SitePhoto
                src={sitePhotos.hero.src}
                alt={sitePhotos.hero.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="rounded-card bg-white/85 p-6 ring-1 ring-inset ring-clay/70 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
                Why families trust us
              </p>
              <ul className="mt-4 space-y-3">
                {platinumScoops.trustSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-3 text-sm text-bark-soft">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core services */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Our services"
          title="Pick the help your dog family needs"
          description="We handle the messy and practical parts so you get cleaner yards, trusted care, and more good days together."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="flex flex-col overflow-hidden rounded-card bg-white shadow-sm ring-1 ring-inset ring-clay/70"
              >
                <div className="relative aspect-[16/10]">
                  <SitePhoto
                    src={service.image.src}
                    alt={service.image.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-bark-soft">
                  {service.body}
                </p>
                <p className="mt-4 text-sm font-semibold text-sage-700">
                  {service.price}
                </p>
                <Button
                  href={service.cta.href}
                  variant={service.variant}
                  className="mt-5 self-start"
                >
                  {service.cta.label} <ArrowRight className="h-4 w-4" />
                </Button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Platinum Pup Event Care — smaller supporting teaser */}
        <div className="mt-6 grid items-center gap-0 overflow-hidden rounded-card bg-gradient-to-br from-gold-100 via-cream to-cream ring-1 ring-inset ring-gold-200 lg:grid-cols-[220px_1fr_auto]">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[200px]">
            <SitePhoto
              src={sitePhotos.community.src}
              alt={sitePhotos.community.alt}
              sizes="220px"
            />
          </div>
          <div className="p-7">
            <div className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-gold-600" />
              <Badge tone="gold">Premium add-on service</Badge>
            </div>
            <h3 className="mt-3 text-2xl font-semibold">Platinum Pup Event Care</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bark-soft">
              A dedicated dog attendant for Waco weddings, parties, photos, and
              special events — so your pup can be there for the sweet moments
              without a guest managing the leash all day.
            </p>
          </div>
          <div className="px-7 pb-7 lg:p-7">
            <Button href={ctas.eventCare.href} variant="primary" size="lg" className="shrink-0">
              {ctas.eventCare.label}
            </Button>
          </div>
        </div>
      </Section>

      {/* 3. Trust proof / reviews */}
      <Section tone="sand">
        <div className="grid gap-5 sm:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="flex items-start gap-3 rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{reason.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-bark-soft">{reason.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <TestimonialsSection tone="paper" />

      {/* 4. Email capture */}
      <Section tone="sage" id="email-list">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Stay in the loop"
            title="Join the Waco Dog Parent List"
            description="Pet care updates, dog-friendly Waco finds, Yappy Hour invites, and first dibs on event spots — straight to your inbox."
            align="center"
          />
          <div className="mt-8">
            <EmailSignupForm />
          </div>
        </div>
      </Section>

      {/* 5. Events / community preview */}
      <Section tone="sky">
        <SectionHeading
          eyebrow="Community & events"
          title="More ways to play, socialize, and stay connected"
          description="Once your routine is handled, the fun begins — themed daycare weeks and casual dog meetups around Waco."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70">
            <div className="relative aspect-[16/9]">
              <SitePhoto
                src={sitePhotos.boarding.src}
                alt={sitePhotos.boarding.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
              <CalendarDays className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold">Summer Daycare Camp</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-bark-soft">
              A new theme every week — splash days, sniff safaris, manners camp,
              and more — with calm, full-time home care. Reserve weeks on Rover.
            </p>
            <Button href={ctas.summerDaycare.href} variant="secondary" size="sm" className="mt-5 self-start">
              {ctas.summerDaycare.label} <ArrowRight className="h-4 w-4" />
            </Button>
            </div>
          </article>
          <article className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70">
            <div className="relative aspect-[16/9]">
              <SitePhoto
                src={sitePhotos.yappyHoursCard.src}
                alt={sitePhotos.yappyHoursCard.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Users className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-semibold">Yappy Hours</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-bark-soft">
              Free dog meetups at dog-friendly Waco spots, plus members-only
              backyard socials for current Platinum Scoops and Rover families.
            </p>
            <Button href="/yappy-hours" variant="secondary" size="sm" className="mt-5 self-start">
              RSVP for a Yappy Hour <ArrowRight className="h-4 w-4" />
            </Button>
            </div>
          </article>
        </div>
      </Section>

      {/* 6. Dog-friendly guide preview — supporting trust content */}
      <Section tone="paper">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Dog-friendly Waco"
            title="Where to take your pup around town"
            description="A free local guide to patios, parks, and dog-friendly stops. Policies change, so we label unverified details — check before you go."
          />
          <Button href="/dog-friendly-waco" variant="ghost">View the guide</Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {directory.map((listing) => (
            <DogDirectoryCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      {/* 7. Shop — de-emphasized, last */}
      <Section tone="sand">
        <div className="flex flex-col items-start gap-4 rounded-card bg-white p-7 ring-1 ring-inset ring-clay/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Dog gear we actually recommend</h3>
              <p className="mt-1 text-sm text-bark-soft">
                Practical picks for Waco dog life — leashes, cleanup, enrichment, and more.
              </p>
            </div>
          </div>
          <Button href="/shop" variant="secondary" className="shrink-0">
            Visit the shop <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
