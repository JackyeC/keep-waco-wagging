import type { Metadata } from "next";
import { ArrowRight, Heart, Home, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DogDirectoryCard } from "@/components/DogDirectoryCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EmailSignupForm } from "@/components/EmailSignupForm";
import { PetCard } from "@/components/PetCard";
import { AdSlot } from "@/components/AdSlot";
import { platinumScoops } from "@/data/platinumScoops";
import { getFeaturedDirectoryListings } from "@/data/directory";
import { getFeaturedProductRecommendations } from "@/data/products";
import { pets } from "@/data/pets";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Keep Waco Wagging | Dog-Friendly Waco Guide & Pet Care Resources",
  description:
    "Keep Waco Wagging is a local guide for Waco dog parents, featuring dog-friendly places, Platinum Scoops yard cleanup, Rover pet care, product recommendations, and local resources.",
};

const paths = [
  {
    title: "Cleaner Yards",
    icon: Sparkles,
    body:
      "Book reliable scooping, yard odor support, and practical cleanup help from Platinum Scoops.",
    href: "/platinum-scoops",
    cta: "Book a Scoop",
  },
  {
    title: "Trusted Pet Care",
    icon: Home,
    body:
      "Home-based boarding, daycare, drop-ins, and dog walking with Jackye and Todd.",
    href: "/pet-care",
    cta: "Book Pet Care",
  },
  {
    title: "Dog-Friendly Waco",
    icon: MapPin,
    body:
      "Find patios, parks, coffee shops, breweries, attractions, and local dog resources.",
    href: "/dog-friendly-waco",
    cta: "Explore the Guide",
  },
];

export default function HomePage() {
  const directory = getFeaturedDirectoryListings(4);
  const products = getFeaturedProductRecommendations(4);

  return (
    <>
      <section className="bg-gradient-to-br from-sage-100 via-cream to-sky-100">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-24">
          <div>
            <Badge tone="gold">{cityConfig.sponsor.line}</Badge>
            <h1 className="mt-5 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Waco&apos;s local guide for happier dogs, cleaner yards, and better
              dog-friendly days.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bark-soft">
              Keep Waco Wagging helps Waco dog parents find trusted pet care,
              dog-friendly places, useful products, and practical local resources
              — all presented by Platinum Scoops.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={ctas.bookScoops.href} size="lg">
                {ctas.bookScoops.label}
              </Button>
              <Button href={ctas.exploreDirectory.href} variant="secondary" size="lg">
                {ctas.exploreDirectory.label}
              </Button>
            </div>
            <p className="mt-5 text-sm font-medium text-bark-soft">
              Locally owned. Family-run. Built for Waco dog families.
            </p>
          </div>
          <div className="rounded-card bg-white/80 p-6 ring-1 ring-inset ring-clay/70">
            <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
              Quick trust check
            </p>
            <ul className="mt-4 space-y-3">
              {platinumScoops.trustSignals.map((signal) => (
                <li key={signal} className="flex items-start gap-3 text-sm text-bark-soft">
                  <Heart className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="gold">Presented by Platinum Scoops</Badge>
          <h2 className="mt-4 text-3xl">Helpful local guide first. Cleaner yards close by.</h2>
          <p className="mt-4 leading-relaxed text-bark-soft">
            Platinum Scoops supports Keep Waco Wagging so Waco dog parents have
            one friendly place to find practical pet care, verified dog-friendly
            stops, and resources that make life with dogs easier.
          </p>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Start here" title="Choose what you need today" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <article key={path.title} className="rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bark-soft">{path.body}</p>
                <Button href={path.href} variant="secondary" size="sm" className="mt-5">
                  {path.cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="paper">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured listings"
            title="Dog-friendly Waco places to start with"
            description="Policies can change, so we label unverified details and encourage you to check before visiting."
          />
          <Button href="/dog-friendly-waco" variant="ghost">View directory</Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {directory.map((listing) => (
            <DogDirectoryCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Section>

      <Section tone="sky">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Recommended products"
            title="Practical dog gear, not random junk"
            description="Product links are placeholders until final Amazon products are selected."
          />
          <Button href="/shop" variant="secondary">Visit shop</Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductRecommendationCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Meet the Platinum Scoops pack"
          title="The dogs behind the dog people"
          description="Real dogs, real routines, and a home that understands multi-dog life."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </Section>

      <TestimonialsSection tone="sand" />

      <Section tone="paper">
        <SectionHeading eyebrow="From our sponsors" title="Supporting Waco dog parents" align="center" />
        <div className="mx-auto mt-8 max-w-md">
          <AdSlot placement="home" />
        </div>
      </Section>

      <Section tone="sage">
        <div className="grid gap-8 rounded-card bg-white p-8 ring-1 ring-inset ring-clay/70 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="For local businesses"
              title="Reach Waco dog parents where they already look for recommendations"
              description="Directory listings, sponsor spots, newsletter mentions, local guides, spotlights, events, and giveaways can all fit naturally here."
            />
            <Button href="/sponsors" className="mt-6">
              {ctas.becomeSponsor.label}
            </Button>
          </div>
          <EmailSignupForm compact />
        </div>
      </Section>

      <Section tone="paper" id="email-list">
        <div className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Email list"
            title="Join the Waco Dog Parent List"
            description="The best local dog-friendly finds, pet care updates, product recommendations, and Waco dog parent tips."
            align="center"
          />
          <div className="mt-8">
            <EmailSignupForm />
          </div>
        </div>
      </Section>
    </>
  );
}
