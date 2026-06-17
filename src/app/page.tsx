import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SitePhoto } from "@/components/SitePhoto";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waco Dog Care: Boarding, Daycare & Yard Care | Platinum Scoops",
  description:
    "Platinum Scoops makes Waco dog life easier: trusted boarding and daycare, recurring yard cleanup, and a themed summer camp. Cleaner yards, better routines, more fun together.",
};

const marqueeItems = [
  "30 YEARS",
  "5.0 ★ ROVER",
  "76 REVIEWS",
  "STAR SITTER",
  "WACO, TEXAS",
  "SINCE 1996",
];

const services = [
  {
    title: "Boarding & Daycare",
    photo: sitePhotos.poolProperty,
    dek: "Star Sitter on Rover. Full-time, home-based, all-day attention. 5.0 stars, 76 reviews.",
    href: cityConfig.rover.profileUrl,
    external: true,
    label: "Book on Rover",
  },
  {
    title: "Yard Care by Platinum Scoops",
    photo: sitePhotos.platinumScoopsSprayer,
    dek: "Recurring yard cleanup so your yard stays usable. Texas heat means weekly is the move.",
    href: "https://platinumscoops.com",
    external: true,
    label: "See the service",
  },
  {
    title: "Summer Camp",
    photo: sitePhotos.poolPack,
    dek: "Themed weeks of supervised play, enrichment, and rest. Drop in for a day or join the week.",
    href: "/summer-daycare",
    external: false,
    label: "See the weeks",
  },
];

const galleryStrip = [
  sitePhotos.jackyeKitchenPoodle,
  sitePhotos.borderCollieJoy,
  sitePhotos.jackyeSmallDog,
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── full-bleed jackyeCollieTree, 88vh, bottom-left legibility overlay */}
      <section className="relative h-[88vh] min-h-[34rem] w-full">
        <SitePhoto
          src={sitePhotos.jackyeCollieTree.src}
          alt={sitePhotos.jackyeCollieTree.alt}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-bark/75 via-bark/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
            <p className="eyebrow text-gold-200">{`Presented by ${cityConfig.sponsor.name}`}</p>
            <h1 className="display mt-4 max-w-3xl text-cream">
              Waco dog care that makes life easier.
            </h1>
            <p className="dek mt-5 max-w-xl text-cream/85">
              Boarding, daycare, yard care, and summer camp — from one family who
              has cared for Central Texas dogs since 1996.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={ctas.bookPetCare.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-gold-400 px-7 py-3.5 text-sm font-semibold tracking-wide text-bark transition-colors hover:bg-gold-500"
              >
                Book pet care on Rover
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/summer-daycare"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:decoration-cream"
              >
                Or explore summer daycare
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── navy ink on cream, hairline rules top & bottom */}
      <section className="bg-cream">
        <hr className="hairline" />
        <div className="overflow-hidden py-4">
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <span
                key={dup}
                aria-hidden={dup === 1}
                className="smallcaps flex shrink-0 items-center gap-4 px-2 text-bark"
              >
                {marqueeItems.map((item) => (
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

      {/* ── SECTION 01 — WHAT WE DO ── three editorial cards */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 01 — What we do</p>
          <hr className="hairline mt-6" />
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand">
                  <SitePhoto
                    src={service.photo.src}
                    alt={service.photo.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="heading mt-6 text-2xl">{service.title}</h3>
                <p className="dek mt-3 flex-1 text-base">{service.dek}</p>
                {service.external ? (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="smallcaps mt-5 inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600"
                  >
                    {service.label} →
                  </a>
                ) : (
                  <Link
                    href={service.href}
                    className="smallcaps mt-5 inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600"
                  >
                    {service.label} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── full-bleed frenchieSinkBath backdrop, 60% navy overlay */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <SitePhoto
            src={sitePhotos.frenchieSinkBath.src}
            alt={sitePhotos.frenchieSinkBath.alt}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bark/60" />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 md:py-36 lg:px-8">
          <hr className="hairline mx-auto w-20" />
          <blockquote className="my-10">
            <p className="font-display text-[1.75rem] italic leading-snug text-cream sm:text-[2.5rem] md:text-[2.75rem]">
              &ldquo;They are not boarding. They are visiting. And visiting means
              being treated like family — bathed in the kitchen sink, dried with
              the good towels.&rdquo;
            </p>
          </blockquote>
          <p className="smallcaps text-gold-200">Jackye Clayton, Founder</p>
          <hr className="hairline mx-auto mt-10 w-20" />
        </div>
      </section>

      {/* ── SECTION 02 — THE SHOP TEASER ── on sand */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">No. 02 — Things we actually use</p>
              <h2 className="heading mt-5">
                Practical gear, vetted by 30 years of dog people.
              </h2>
              <p className="dek mt-5">
                No filler, no fads. The bowls, mats, balms, and toys we reach for
                every day in Central Texas — and the ones we hand new adopters.
              </p>
              <Link
                href="/shop"
                className="smallcaps mt-6 inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600"
              >
                See the shop →
              </Link>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <figure>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream">
                  <SitePhoto
                    src={sitePhotos.productDetail1.src}
                    alt={sitePhotos.productDetail1.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="caption mt-3">
                  No. 04 · Slow feeder bowl — for the Lab who inhales dinner
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 03 — INSIDE THE HOME ── 3-photo 1:1 strip with hairlines */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow italic">No. 03 — Inside the home</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3">
            {galleryStrip.map((photo, i) => (
              <div
                key={photo.src}
                className={
                  "relative aspect-square w-full overflow-hidden bg-sand" +
                  (i > 0 ? " sm:border-l sm:border-gold-400/30" : "")
                }
              >
                <SitePhoto
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
