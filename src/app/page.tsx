import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { CTASection } from "@/components/CTASection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PresentingSponsor } from "@/components/PresentingSponsor";
import { SitePhoto } from "@/components/SitePhoto";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { getRecentPosts } from "@/data/blog";
import { sitePhotos } from "@/data/sitePhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { roverCredentialsLine } from "@/lib/roverCredentials";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Waco Dog Boarding, Daycare & Poop Scooping",
  `${brandLanguage.heroLine}. ${brandLanguage.brandByLine}. Serving ${cityConfig.serviceAreas.slice(0, 4).join(", ")}, and greater ${cityConfig.county}.`,
);

const trustStrip = [
  brandLanguage.brandByLine.toUpperCase(),
  roverCredentialsLine.toUpperCase(),
  "WACO, TEXAS",
  "FULL-TIME PET CARE",
];

const whyChooseUs = [
  {
    title: "Full-time care, not a side gig",
    detail:
      "Jackye and Todd Clayton built this around dogs — boarding, daycare, scooping, and training are the work, not an after-hours add-on.",
  },
  {
    title: "Home-based boarding and daycare",
    detail:
      "Dogs stay in a calm Waco home with walks, enrichment, rest, and updates — not a warehouse kennel.",
  },
  {
    title: "Family-run Waco business",
    detail:
      "Keep Waco Wagging is the local pet-care home of Platinum Scoops — the same family behind boarding, daycare, scooping, and training.",
  },
  {
    title: roverCredentialsLine,
    detail: `Pet care ratings and reviews on Rover for ${cityConfig.city} dog families across ${cityConfig.serviceAreas.slice(0, 3).join(", ")}, and surrounding ${cityConfig.county} communities.`,
  },
];

const serviceTeasers = [
  {
    title: "Poop scooping & yard care",
    photo: sitePhotos.platinumScoopsSprayer,
    dek: "Weekly scooping, one-time cleanups, and odor support so your yard stays usable through Texas heat. Starts at $25/week with the first cleanup included.",
    href: "/platinum-scoops",
    label: "Poop scooping in Waco",
  },
  {
    title: "Daycare & boarding",
    photo: sitePhotos.poolProperty,
    dek: `${roverCredentialsLine}. Home-based daycare and boarding with full-time attention.`,
    href: "/pet-care",
    label: "Daycare & boarding",
  },
  {
    title: "Lifestyle training",
    photo: sitePhotos.borderCollieJoy,
    dek: "Patio manners, loose-leash walks, puppy field trips, and calm-home skills — practical coaching in real Waco settings.",
    href: "/training",
    label: "Training & real-life skills",
  },
  {
    title: "Platinum Pup event care",
    photo: sitePhotos.frenchieSinkBath,
    dek: "A dedicated dog attendant for weddings, parties, and special events — calm handling, ceremony support, and safe handoff.",
    href: "/pet-care/weddings-events",
    label: "Event dog care",
  },
  {
    title: brandLanguage.dogCampName,
    photo: sitePhotos.poolPack,
    dek: "Thirteen themed summer weeks of supervised play, enrichment, and rest. Drop in for a day or join the full week.",
    href: "/summer-daycare",
    label: "Summer dog camp",
  },
];

export default function HomePage() {
  const recentPosts = getRecentPosts(3);

  return (
    <>
      {/* ── HERO ── service proposition first; brand as supporting context */}
      <section className="relative min-h-[34rem] w-full overflow-hidden bg-bark lg:min-h-[40rem]">
        <SitePhoto
          src={sitePhotos.hero.src}
          alt={sitePhotos.hero.alt}
          priority
          sizes="100vw"
          className="!object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/75 to-bark/30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 15% 85%, rgba(26,42,61,0.95) 0%, rgba(26,42,61,0.55) 45%, rgba(26,42,61,0) 75%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
            <PresentingSponsor light />
            <h1
              className="display mt-4 max-w-2xl text-white"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
            >
              {brandLanguage.heroLine}
            </h1>
            <p
              className="mt-4 flex items-center gap-1.5 text-sm font-medium text-cream/90"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.85)" }}
            >
              <MapPin className="h-4 w-4 shrink-0 text-gold-300" aria-hidden />
              {cityConfig.city}, {cityConfig.stateAbbr} · {cityConfig.county}
            </p>
            <p className="dek mt-4 max-w-xl text-cream/90">
              {brandLanguage.brandRelationship} {cityConfig.sponsor.name} is
              the family-run team behind scooping, boarding, training, and event
              care.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-sm bg-gold-400 px-7 py-3.5 text-sm font-semibold tracking-wide text-bark transition-colors hover:bg-gold-500"
              >
                Book a service
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:decoration-cream"
              >
                See our services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── proof high on the page */}
      <section className="bg-cream" aria-label="Trust and credentials">
        <hr className="hairline" />
        <div className="overflow-hidden py-4">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <span
                key={dup}
                aria-hidden={dup === 1}
                className="smallcaps flex shrink-0 items-center gap-4 px-2 text-bark"
              >
                {trustStrip.map((item) => (
                  <span key={item} className="flex items-center gap-4">
                    <span>{item}</span>
                    <span className="text-gold-400">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <hr className="hairline" />
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Why Waco dog families choose us</p>
              <h2 className="heading mt-4 text-3xl md:text-4xl">
                Local, full-time, and built around real dogs in real homes.
              </h2>
              <blockquote className="mt-8 border-l-2 border-gold-400 pl-5">
                <p className="font-display text-xl italic leading-snug text-bark md:text-2xl">
                  &ldquo;They are not boarding. They are visiting — bathed in
                  the kitchen sink, dried with the good towels.&rdquo;
                </p>
                <footer className="smallcaps mt-4 text-gold-600">
                  {cityConfig.founders.jackye}, founder
                </footer>
              </blockquote>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-clay border-y border-clay">
                {whyChooseUs.map((item) => (
                  <li key={item.title} className="py-6 first:pt-0 last:pb-0">
                    <h3 className="font-display text-xl text-bark">
                      {item.title}
                    </h3>
                    <p className="dek mt-2 text-base">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Our services</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="heading max-w-xl text-3xl md:text-4xl">
              Poop scooping, pet care, training, events, and summer camp.
            </h2>
            <Link
              href="/book"
              className="smallcaps inline-flex items-center gap-1.5 text-gold-600 hover:text-gold-700"
            >
              All booking options →
            </Link>
          </div>
          <hr className="hairline mt-8" />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {serviceTeasers.map((service) => (
              <article key={service.title} className="flex flex-col">
                <Link
                  href={service.href}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-cream"
                >
                  <SitePhoto
                    src={service.photo.src}
                    alt={service.photo.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </Link>
                <h3 className="heading mt-5 text-xl">
                  <Link href={service.href} className="hover:text-sage-700">
                    {service.title}
                  </Link>
                </h3>
                <p className="dek mt-2 flex-1 text-sm">{service.dek}</p>
                <Link
                  href={service.href}
                  className="smallcaps mt-4 inline-flex items-center gap-1.5 text-gold-600 hover:text-gold-700"
                >
                  {service.label} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection tone="paper" limit={3} />

      <section className="bg-sand py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="eyebrow">Local guides</p>
              <h2 className="heading mt-3 text-2xl md:text-3xl">
                Dog-friendly Waco resources
              </h2>
              <p className="dek mt-4 text-base">
                {brandLanguage.communityLine}. Guides and editorial content
                support local discovery — services are how we earn your trust
                every week.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/dog-friendly-waco"
                  className="smallcaps text-gold-600 hover:text-gold-700"
                >
                  Dog-friendly directory →
                </Link>
                <Link
                  href="/blog"
                  className="smallcaps text-bark-soft hover:text-bark"
                >
                  Read the blog →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-3">
                {recentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to book?"
        title="Tell us what your dog needs — we'll point you to the right service."
        description={`Call ${cityConfig.sponsor.phoneDisplay} (${cityConfig.sponsor.phoneNumeric}), email ${cityConfig.publicEmail}, or start online.`}
        primary={{ label: ctas.bookService.label, href: ctas.bookService.href }}
        secondary={{ label: "Contact us", href: "/contact" }}
        tone="sage"
      />

      <NewsletterSignup id="updates-signup" sourcePage="/" />
    </>
  );
}
