import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { SitePhoto } from "@/components/SitePhoto";
import { sitePhotos } from "@/data/sitePhotos";
import { getFeaturedProductRecommendations } from "@/data/products";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waco Dog Care: Poop Scooping, Boarding & Daycare | Platinum Scoops",
  description:
    "Platinum Scoops makes Waco dog life easier: recurring poop scooping, trusted boarding and daycare, training support, and premium event dog care. Cleaner yards, better routines, more fun together.",
};

const services = [
  {
    title: "Rover Boarding & Daycare",
    body:
      "Full-time, home-based care with Jackye and Todd — routines, socialization, structured rest, and honest updates while you are away.",
    href: "/pet-care",
    label: "Explore boarding",
  },
  {
    title: "Platinum Scoops Yard Care",
    body:
      "Reliable weekly and every-other-week yard cleanups with the Platinum Fresh enzyme treatment — the same technician, every visit.",
    href: "/platinum-scoops",
    label: "Learn about scooping",
  },
  {
    title: "Summer Daycare Camp",
    body:
      "Thirteen themed weeks of supervised play, enrichment, and rest — small groups, heat-smart days, real care from the people who own the home.",
    href: "/summer-daycare",
    label: "See the calendar",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProductRecommendations(3);

  return (
    <>
      {/* Hero — full-bleed photo with overlaid serif display */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[34rem] w-full">
          <SitePhoto
            src={sitePhotos.hero.src}
            alt={sitePhotos.hero.alt}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-bark/25 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
              <p className="eyebrow text-cream/80">{cityConfig.sponsor.line}</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl text-cream md:text-6xl lg:text-7xl">
                Waco dog care that makes life easier.
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={ctas.bookPetCare.href}
                  className="inline-flex items-center gap-2 bg-cream px-7 py-3.5 text-sm font-semibold text-bark transition-colors hover:bg-sand"
                >
                  Book pet care on Rover
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/summer-daycare"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:decoration-cream"
                >
                  Or explore summer daycare
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lede — Rover stats woven into prose */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow">Central Texas, since 1996</p>
            </div>
            <div className="md:col-span-8 md:col-start-4">
              <p className="lede max-w-2xl text-balance">
                Five-star rated across {cityConfig.rover.reviewCount} reviews on
                Rover, a recognized Star Sitter with repeat families who keep
                coming back, and three decades caring for dogs in and around
                Waco. We are a family-run home — not an app, not a side gig.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
              >
                Meet Jackye and Todd
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we do — clean 3-column editorial */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">
              Three ways we keep Waco wagging
            </h2>
          </div>
          <hr className="rule mt-12" />
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="py-12 md:px-8 md:py-14 md:first:pl-0 md:last:pr-0">
                <h3 className="font-display text-2xl">{service.title}</h3>
                <p className="mt-4 max-w-prose leading-relaxed text-bark-soft">
                  {service.body}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
                >
                  {service.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull-quote moment — full-bleed clay */}
      <section className="bg-clay py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <hr className="rule mx-auto w-16 border-bark/30" />
          <blockquote className="display-quote my-8 italic">
            “They treat our dog like one of their own. We leave town without a
            second thought — and come home to a calmer, happier dog every time.”
          </blockquote>
          <hr className="rule mx-auto w-16 border-bark/30" />
          <p className="eyebrow mt-8 text-bark-soft">A repeat Rover family</p>
        </div>
      </section>

      {/* Editor's picks — sparse product grid */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">From the shop</p>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">
                Things we actually use
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
            >
              See all picks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductRecommendationCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection tone="sand" />

      {/* Newsletter — minimal framing */}
      <section id="email-list" className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">Stay in the loop</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">
                The Waco dog parent list
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-bark-soft">
                Pet care updates, dog-friendly Waco finds, Yappy Hour invites,
                and first dibs on event spots — sent occasionally, never spam.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <EmailSignupForm />
            </div>
          </div>
        </div>
      </section>

      {/* Founders teaser — full-bleed photo break */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-6">
              <SitePhoto
                src={sitePhotos.founders.src}
                alt={sitePhotos.founders.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <p className="eyebrow">The people</p>
              <h2 className="mt-4 font-display text-3xl md:text-5xl">
                A family-run home for Waco dogs
              </h2>
              <p className="mt-6 max-w-prose leading-relaxed text-bark-soft">
                Jackye and Todd Clayton have spent their lives around dogs.
                What began as a practical way to help neighbors keep cleaner
                yards grew into full-time, home-based care and a local guide to
                dog-friendly Waco.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
              >
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
