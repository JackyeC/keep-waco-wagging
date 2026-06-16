import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { ServicePathCard } from "@/components/ServicePathCard";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/Button";
import { sitePhotos } from "@/data/sitePhotos";
import { getFeaturedProductRecommendations } from "@/data/products";
import { cityConfig, ctas, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waco Dog Care: Poop Scooping, Boarding & Daycare | Platinum Scoops",
  description:
    "Platinum Scoops makes Waco dog life easier: recurring poop scooping, trusted boarding and daycare, and a local dog-parent guide from Keep Waco Wagging.",
};

export default function HomePage() {
  const featuredProducts = getFeaturedProductRecommendations(3);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[72vh] min-h-[28rem] w-full sm:min-h-[32rem]">
          <SitePhoto
            src={sitePhotos.hero.src}
            alt={sitePhotos.hero.alt}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/75 via-bark/30 to-bark/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
              <p className="eyebrow text-cream/75">{cityConfig.sponsor.name}</p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl text-cream md:text-5xl lg:text-6xl">
                Waco dog care that makes life easier.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                Book yard scooping, check boarding and daycare availability, and
                explore the local guide from {siteConfig.name}.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
                  {ctas.bookScoops.label}
                </Button>
                <Button href={ctas.bookPetCare.href} variant="secondary" size="lg">
                  Check daycare &amp; boarding
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four paths */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Start here</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              What do you need today?
            </h2>
            <p className="mt-4 leading-relaxed text-bark-soft">
              {cityConfig.sponsor.name} handles the services. {siteConfig.name}{" "}
              helps you find dog-friendly Waco, gear we use, and community
              events.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ServicePathCard
              step="01"
              title="Book poop scooping"
              description="Recurring yard cleanups with the same technician, enzyme treatment included, and no long-term contract."
              href={ctas.bookScoops.href}
              ctaLabel="Book a scoop"
              external
            />
            <ServicePathCard
              step="02"
              title="Daycare & boarding"
              description="Home-based care with Jackye and Todd. Check current availability and rates on Rover."
              href={ctas.bookPetCare.href}
              ctaLabel="Check availability"
              external
            />
            <ServicePathCard
              step="03"
              title="Dog gear we use"
              description="Practical Amazon picks for Waco summers — crates, cooling, walking gear, and everyday care."
              href="/shop"
              ctaLabel="Browse the shop"
            />
            <ServicePathCard
              step="04"
              title="The Waco dog guide"
              description="Dog-friendly places, Yappy Hours, summer camp, and the story behind Keep Waco Wagging."
              href="/about"
              ctaLabel="About the guide"
            />
          </div>
        </div>
      </section>

      {/* Poop scooping spotlight */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-inset ring-clay/60">
              <SitePhoto
                src={sitePhotos.scooping.src}
                alt={sitePhotos.scooping.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="eyebrow">{cityConfig.sponsor.name}</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Cleaner yards for Waco dog families
              </h2>
              <p className="mt-4 leading-relaxed text-bark-soft">
                {cityConfig.sponsor.pricingNote}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={ctas.bookScoops.href} variant="sponsor">
                  {ctas.bookScoops.label}
                </Button>
                <Button href="/platinum-scoops" variant="secondary">
                  Learn about scooping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daycare spotlight */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-inset ring-clay/60">
                <SitePhoto
                  src={sitePhotos.boarding.src}
                  alt={sitePhotos.boarding.alt}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow">Daycare &amp; boarding</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Home-based care with Jackye and Todd
              </h2>
              <p className="mt-4 leading-relaxed text-bark-soft">
                {cityConfig.rover.rating} stars across {cityConfig.rover.reviewCount}{" "}
                Rover reviews. Full-time pet care professionals — not a side gig.
                Rover is the best place to see current openings and pricing.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={ctas.bookPetCare.href} variant="primary">
                  {ctas.bookPetCare.label}
                </Button>
                <Button href="/pet-care" variant="secondary">
                  Explore pet care
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop picks */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{siteConfig.name}</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Things we actually use
              </h2>
              <p className="mt-3 text-bark-soft">
                Curated gear for Central Texas dog parents — linked to Amazon with
                our affiliate tag.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
            >
              See all picks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductRecommendationCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection tone="paper" />

      {/* Community guide */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{siteConfig.name}</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Your local Waco dog-parent guide
              </h2>
              <p className="mt-4 leading-relaxed text-bark-soft">
                Presented by {cityConfig.sponsor.name}. We share dog-friendly
                places, practical care tips, community events, and the gear we
                reach for every day in Central Texas.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
              >
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:col-span-7 lg:aspect-[16/10]">
              <SitePhoto
                src={sitePhotos.community.src}
                alt={sitePhotos.community.alt}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="email-list" className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Stay in the loop</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                The Waco dog parent list
              </h2>
              <p className="mt-4 leading-relaxed text-bark-soft">
                Pet care updates, dog-friendly Waco finds, and Yappy Hour invites
                — sent occasionally, never spam.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <EmailSignupForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
