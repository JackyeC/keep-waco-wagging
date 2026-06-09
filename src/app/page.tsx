import Link from "next/link";
import { ArrowRight, GraduationCap, CalendarDays, Star } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CategoryCard } from "@/components/CategoryCard";
import { DirectoryCard } from "@/components/DirectoryCard";
import { BlogCard } from "@/components/BlogCard";
import { BusinessSpotlightCard } from "@/components/BusinessSpotlightCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PlatinumScoopsCTA } from "@/components/PlatinumScoopsCTA";
import { PodcastBanner } from "@/components/PodcastBanner";
import { SponsorStrip } from "@/components/SponsorStrip";
import { RoverCTA } from "@/components/RoverCTA";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { quickCategories } from "@/data/categories";
import { getFeaturedListings } from "@/data/listings";
import { getRecentPosts } from "@/data/blog";
import { getFeaturedSpotlight } from "@/data/spotlights";
import { getPetOfTheWeek } from "@/data/pets";
import { ctas } from "@/lib/site";

export default function HomePage() {
  const featuredListing = getFeaturedListings()[0];
  const recentPosts = getRecentPosts(3);
  const spotlight = getFeaturedSpotlight();
  const petOfWeek = getPetOfTheWeek();

  return (
    <>
      <Hero />

      {/* 1. Quick category cards */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Start here"
          title="Everything dog-friendly in Waco"
          description="Browse by what you need today — a patio, a trail, a weekend plan, or a little help with training."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickCategories.map((item) => (
            <CategoryCard key={item.label} item={item} />
          ))}
        </div>
      </Section>

      {/* 2. Featured this week */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Featured this week"
          title="Three good reasons to get out there"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListing && <DirectoryCard listing={featuredListing} />}

          {/* Weekend / event idea */}
          <article className="flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70">
            <div className="aspect-[16/10]">
              <ImagePlaceholder label="Where to Wag This Weekend" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <Badge tone="sky">Weekend idea</Badge>
              <h3 className="mt-3 text-lg font-semibold">
                A dog-friendly weekend in Waco
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-bark-soft">
                A morning trail, a shaded patio lunch, and an easy evening
                stroll. Our weekly guide makes planning simple.
              </p>
              <Link
                href="/weekend"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-800"
              >
                <CalendarDays className="h-4 w-4" />
                See this weekend&apos;s guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Training tip */}
          <article className="flex flex-col overflow-hidden rounded-card bg-sage-700 text-white">
            <div className="flex flex-1 flex-col p-6">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sage-600 px-2.5 py-0.5 text-xs font-medium">
                <GraduationCap className="h-3.5 w-3.5" /> Training tip
              </span>
              <h3 className="mt-4 text-xl font-semibold">
                Practice &ldquo;settle on a mat&rdquo;
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sage-100">
                Five short reps at home this week sets your dog up to relax under
                the table on your next patio outing. Calm is a skill — and it&apos;s
                trainable.
              </p>
              <Button
                href={ctas.trainingHelp.href}
                variant="secondary"
                size="sm"
                className="mt-4 w-fit"
              >
                Get training help
              </Button>
            </div>
          </article>
        </div>
      </Section>

      {/* Podcast banner */}
      <PodcastBanner />

      {/* Pet of the Week */}
      <Section tone="paper">
        <div className="grid items-center gap-8 rounded-card bg-gradient-to-br from-sky-50 to-sage-50 p-6 ring-1 ring-inset ring-sage-200 sm:p-8 lg:grid-cols-[300px_1fr]">
          <div className="overflow-hidden rounded-card ring-1 ring-inset ring-clay/70">
            <div className="aspect-square">
              <ImagePlaceholder
                src={petOfWeek.photoUrl}
                alt={petOfWeek.name}
                label={petOfWeek.name}
              />
            </div>
          </div>
          <div>
            <Badge tone="gold">
              <Star className="mr-1 h-3 w-3" /> Pet of the Week
            </Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl">Meet {petOfWeek.name}</h2>
            <p className="mt-1 text-bark-soft">
              {petOfWeek.breed}
              {petOfWeek.ageOrStage ? ` · ${petOfWeek.ageOrStage}` : ""} ·{" "}
              {petOfWeek.neighborhood}
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-bark-soft">
              {petOfWeek.bio}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/pets">See the Wagging Wall</Button>
              <Button href="/pets#submit" variant="secondary">
                Submit your pup
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Is your dog ready for public places? */}
      <Section tone="sky">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Real-life readiness"
              title="Is your dog ready for public places?"
            />
            <p className="mt-4 max-w-xl leading-relaxed text-bark-soft">
              Not every dog is ready for patios, markets, parks, or busy places
              just yet — and that&apos;s completely okay. Calm behavior in public
              is a set of skills you can build together. Lifestyle dog training
              helps you and your pup develop the real-world confidence to enjoy
              more of Waco, with less stress.
            </p>
            <div className="mt-6">
              <Button href={ctas.bookTraining.href} size="lg">
                {ctas.bookTraining.label}
              </Button>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              "Calmly settling on a patio while you eat",
              "Walking on a loose leash past distractions",
              "Recovering quickly when something startles them",
              "Greeting people and dogs politely",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-card bg-white p-4 ring-1 ring-inset ring-clay/70"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-bold text-sage-700">
                  ✓
                </span>
                <span className="text-sm text-bark-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 4. Presented by Platinum Scoops */}
      <PlatinumScoopsCTA />

      {/* Rover + shop revenue surfaces */}
      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-2">
          <RoverCTA />
          <article className="overflow-hidden rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 sm:p-8">
            <Badge tone="sage">Shop</Badge>
            <h3 className="mt-3 text-xl font-semibold">Dog gear we actually use</h3>
            <p className="mt-2 text-sm leading-relaxed text-bark-soft">
              Leashes, travel bowls, training tools, and backyard favorites —
              curated for Waco weather and real-life dog outings.
            </p>
            <Button href={ctas.shopGear.href} variant="secondary" className="mt-5">
              {ctas.shopGear.label}
            </Button>
          </article>
        </div>
      </Section>

      {/* Client testimonials */}
      <TestimonialsSection tone="sand" />

      {/* 5. Latest guides */}
      <Section tone="paper">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="From the blog"
            title="Latest guides & tips"
          />
          <Button href="/blog" variant="ghost" className="hidden sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Section>

      {/* 6. Local business spotlight */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Local business spotlight"
          title="Waco businesses worth knowing"
          description="We highlight local spots that genuinely welcome and support dog parents."
        />
        <div className="mt-8">
          <BusinessSpotlightCard spotlight={spotlight} />
        </div>
        <div className="mt-6">
          <Button href="/spotlights" variant="secondary">
            See more spotlights <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* Sponsor showcase */}
      <SponsorStrip />

      {/* 7. Newsletter signup */}
      <Section tone="paper">
        <NewsletterSignup />
      </Section>
    </>
  );
}
