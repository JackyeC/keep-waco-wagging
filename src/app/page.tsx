import type { Metadata } from "next";
import Link from "next/link";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { EditorialFeature, EditorialTeaser } from "@/components/EditorialFeature";
import { PublisherNote } from "@/components/PublisherNote";
import { ServiceIndex } from "@/components/ServiceIndex";
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
      {/* Magazine cover hero */}
      <section className="relative border-b border-clay">
        <div className="relative min-h-[78vh] w-full sm:min-h-[82vh]">
          <SitePhoto
            src={sitePhotos.hero.src}
            alt={sitePhotos.hero.alt}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/85 via-bark/35 to-bark/5" />
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
              <PublisherNote light />
            </div>
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
              <p className="eyebrow text-cream/70">{siteConfig.name}</p>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.035em] text-cream">
                Waco dog life, thoughtfully tended.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                Book yard scooping through {cityConfig.sponsor.name}. Check
                daycare and boarding availability. Browse gear we reach for in
                Central Texas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
                  Book a Scoop
                </Button>
                <Button href={ctas.bookPetCare.href} variant="secondary" size="lg" className="border-cream/30 bg-cream/10 text-cream hover:bg-cream/20 hover:border-cream/50">
                  Check Daycare Availability
                </Button>
              </div>
              <p className="caption mt-6 max-w-md text-cream/55">
                {sitePhotos.hero.alt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact service index */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="eyebrow">In this guide</p>
            <h2 className="headline-secondary mt-3">Where to go first</h2>
            <p className="mt-3 text-sm leading-relaxed text-bark-soft">
              {cityConfig.sponsor.name} handles the services. {siteConfig.name}{" "}
              is the local field guide — places, events, and practical picks.
            </p>
          </div>
          <ServiceIndex
            className="mt-10"
            items={[
              {
                department: "Yard Notes",
                title: "Recurring poop scooping",
                description:
                  "Same technician, enzyme treatment included, no long-term contract. First cleanup included.",
                href: ctas.bookScoops.href,
                ctaLabel: "Book a Scoop",
                external: true,
              },
              {
                department: "Home Stay",
                title: "Daycare & boarding",
                description:
                  "Home-based care with Jackye and Todd. Availability and rates on Rover.",
                href: ctas.bookPetCare.href,
                ctaLabel: "Check availability",
                external: true,
              },
              {
                department: "The Edit",
                title: "Dog gear we actually use",
                description:
                  "Practical Amazon picks for Waco summers — crates, cooling, walking gear, everyday care.",
                href: "/shop",
                ctaLabel: "Browse picks",
              },
              {
                department: "Field Guide",
                title: "Dog-friendly Waco",
                description:
                  "Patios, trails, Yappy Hours, and the story behind this guide.",
                href: "/about",
                ctaLabel: "Read the guide",
              },
            ]}
          />
        </div>
      </section>

      {/* Lead feature — Yard Notes */}
      <section className="border-t border-clay bg-paper-grain py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <EditorialFeature
            size="lead"
            department="Yard Notes"
            title="Cleaner yards for Waco dog families"
            dek={cityConfig.sponsor.pricingNote}
            image={sitePhotos.scooping}
            caption={sitePhotos.scooping.alt}
            ctas={[
              { label: "Book a Scoop", href: ctas.bookScoops.href, variant: "sponsor" },
              { label: "About scooping", href: "/platinum-scoops", variant: "secondary" },
            ]}
          />
        </div>
      </section>

      {/* Supporting departments */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <EditorialFeature
              size="supporting"
              department="Home Stay"
              title="Daycare and boarding in a calm Waco home"
              dek={`${cityConfig.rover.rating} stars across ${cityConfig.rover.reviewCount} Rover reviews. Full-time pet care professionals — Rover is the best place to see current openings and pricing.`}
              image={sitePhotos.boarding}
              caption={sitePhotos.boarding.alt}
              ctas={[
                { label: "Check Daycare Availability", href: ctas.bookPetCare.href, variant: "primary" },
                { label: "Explore pet care", href: "/pet-care", variant: "secondary" },
              ]}
            />
            <div className="flex flex-col justify-between gap-8 border-t border-clay pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
              <EditorialTeaser
                department="Field Guide"
                title="Your local Waco dog-parent guide"
                dek={`Presented by ${cityConfig.sponsor.name}. Dog-friendly places, Yappy Hours, summer camp, and practical recommendations for Central Texas.`}
                href="/dog-friendly-waco"
                ctaLabel="Explore dog-friendly Waco"
              />
              <figure className="mt-auto">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <SitePhoto
                    src={sitePhotos.community.src}
                    alt={sitePhotos.community.alt}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="caption mt-2">{sitePhotos.community.alt}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* The Edit — shop module (smaller visual weight) */}
      <section className="border-t border-clay bg-sand py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-clay pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow eyebrow-brass">The Edit</p>
              <h2 className="headline-tertiary mt-2">Dog gear we actually use</h2>
              <p className="mt-2 text-sm leading-relaxed text-bark-soft">
                Curated for Central Texas — linked to Amazon with our affiliate tag.
              </p>
            </div>
            <Link href="/shop" className="editorial-link">
              See all picks
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductRecommendationCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection tone="paper" />

      {/* Newsletter — classified-style placement */}
      <section id="email-list" className="border-t border-clay bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="editorial-panel grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Stay in the loop</p>
              <h2 className="headline-tertiary mt-3">The Waco dog parent list</h2>
              <p className="mt-3 text-sm leading-relaxed text-bark-soft">
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
