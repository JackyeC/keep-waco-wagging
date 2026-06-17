import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SitePhoto } from "@/components/SitePhoto";
import { summerDaycare, daycareThemes } from "@/data/summerDaycare";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: `Summer Dog Daycare Camp in ${cityConfig.city} | Thirteen Weeks of Summer`,
  description: `A themed weekly summer daycare calendar for ${cityConfig.city} dogs — splash days, sniff safaris, manners camp, and more. Home-based, full-time care. Reserve your dog's spot on Rover.`,
};

const masthead = [
  { label: "Weeks", value: "13" },
  { label: "Days", value: "Mon to Fri" },
  { label: "Ages", value: "All dogs" },
  { label: "Location", value: "Waco, TX" },
];

const howItWorks = [
  { title: "Drop in for a day", body: "Need coverage for a single day? Book it. No weekly commitment required." },
  { title: "Join the week", body: "Lean into the theme — five days of play, enrichment, and rest built around one idea." },
  { title: "Small group", body: "Groups stay small on purpose, so every dog gets real attention, not crowd control." },
  { title: "Same calm care", body: "The same two people who own the home run every day. No rotating crew." },
];

const timeline = [
  { time: "7:30 AM", caption: "Morning play", photo: sitePhotos.campTimeline1 },
  { time: "11:00 AM", caption: "Cool-down", photo: sitePhotos.campTimeline2 },
  { time: "2:00 PM", caption: "Quiet hour", photo: sitePhotos.campTimeline3 },
  { time: "5:30 PM", caption: "Last walk", photo: sitePhotos.campTimeline4 },
];

const faqs = [
  {
    q: "Do you have to book the whole week?",
    a: "No. Drop in for a single day or join the full themed week — whatever fits your schedule. Availability lives on our Rover profile.",
  },
  {
    q: "What about the Texas heat?",
    a: summerDaycare.heatNote,
  },
  {
    q: "What kinds of dogs are a good fit?",
    a: "Social dogs of all ages who enjoy a home environment. We keep groups small and read every dog — if a day should be quieter, we make it quieter.",
  },
  {
    q: "How do I reserve a spot?",
    a: "Request your dates on our Rover profile. That is where current openings live, and we will confirm from there.",
  },
];

export default function SummerDaycarePage() {
  return (
    <>
      {/* ── HERO ── full-bleed poolProperty */}
      <section className="relative h-[80vh] min-h-[32rem] w-full">
        <SitePhoto
          src={sitePhotos.poolProperty.src}
          alt={sitePhotos.poolProperty.alt}
          priority
          sizes="100vw"
        />
        {/* Layered overlays: vertical bottom shade + strong bottom-left radial for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-bark/95 via-bark/55 to-bark/15" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 80% at 22% 78%, rgba(26,42,61,0.95) 0%, rgba(26,42,61,0.7) 30%, rgba(26,42,61,0.25) 60%, rgba(26,42,61,0) 80%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
            <p className="eyebrow text-gold-200" style={{textShadow: "0 1px 8px rgba(0,0,0,0.85)"}}>Summer 2026</p>
            <h1 className="display mt-4 max-w-3xl text-white" style={{textShadow: "0 2px 24px rgba(0,0,0,0.7)"}}>
              Thirteen weeks of summer.
            </h1>
            <p className="dek mt-5 inline-block max-w-xl rounded-sm bg-bark/80 px-5 py-3 backdrop-blur-sm" style={{color: "#f6f1e7"}}>
              A small-group summer camp run out of our home — a new theme every
              week, plenty of shade and water, and the same calm care your dog
              already knows.
            </p>
            <a
              href="#weeks"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-bark transition-colors hover:bg-gold-500"
            >
              See the weeks ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── METADATA RAIL ── */}
      <section className="bg-cream">
        <hr className="hairline" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 divide-gold-400/30 md:grid-cols-4 md:divide-x">
            {masthead.map((item, i) => (
              <div
                key={item.label}
                className={"py-6 md:px-8 md:first:pl-0 md:last:pr-0" + (i > 0 ? " md:pl-8" : "")}
              >
                <dt className="smallcaps text-gold-500">{item.label}</dt>
                <dd className="smallcaps mt-2 text-bark">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <hr className="hairline" />
      </section>

      {/* ── SECTION 01 — HOW IT WORKS ── */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 01 — How it works</p>
          <hr className="hairline mt-6" />
          <div className="mt-12 grid grid-cols-1 divide-gold-400/30 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
            {howItWorks.map((col, i) => (
              <div
                key={col.title}
                className={"py-6 lg:px-8 lg:first:pl-0 lg:last:pr-0" + (i > 0 ? " lg:pl-8" : "")}
              >
                <h3 className="font-display text-xl text-bark">{col.title}</h3>
                <p className="dek mt-3 text-base">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 02 — A DAY AT CAMP ── editorial timeline */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 02 — A day at camp</p>
          <hr className="hairline mt-6" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((moment, i) => (
              <figure
                key={moment.time}
                className={"py-2 lg:px-6 lg:first:pl-0 lg:last:pr-0" + (i > 0 ? " lg:border-l lg:border-gold-400/30" : "")}
              >
                <p className="smallcaps text-gold-500">{moment.time}</p>
                <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream">
                  <SitePhoto
                    src={moment.photo.src}
                    alt={moment.photo.alt}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <figcaption className="caption mt-3">{moment.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 03 — THE THEMED WEEKS ── editorial table-like list */}
      <section id="weeks" className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 03 — The themed weeks</p>
          <h2 className="heading mt-3">A new theme every week.</h2>
          <p className="dek mt-4 max-w-2xl">
            Reserve any week your dog wants to join. Availability lives on our
            Rover profile — request the dates and we will confirm.
          </p>
          <div className="mt-12">
            {daycareThemes.map((theme) => (
              <article
                key={theme.week}
                className="grid grid-cols-1 gap-2 border-t border-gold-400/30 py-7 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-3">
                  <p className="smallcaps text-gold-500">
                    {`Week ${String(theme.week).padStart(2, "0")}`}
                  </p>
                  <p className="caption mt-1">{theme.dateRange}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-xl text-bark">{theme.name}</h3>
                  <p className="caption mt-2 max-w-prose">{theme.blurb}</p>
                  {theme.note && (
                    <p className="caption mt-2 max-w-prose text-bark-faint">{theme.note}</p>
                  )}
                </div>
              </article>
            ))}
            <hr className="hairline" />
          </div>
        </div>
      </section>

      {/* ── SECTION 04 — FAQ ── editorial Q&A */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 04 — Questions</p>
          <hr className="hairline mt-6" />
          <dl className="mt-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-t border-gold-400/30 py-7 first:border-t-0">
                <dt className="font-display text-xl italic text-bark">{faq.q}</dt>
                <dd className="dek mt-3 text-base">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── SECTION 05 — PRICING / CTA ── */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 05 — Pricing & booking</p>
          <hr className="hairline mt-6" />
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-7 space-y-8 leading-relaxed text-bark-soft">
              <div>
                <h3 className="font-display text-xl text-bark">Pricing</h3>
                <p className="dek mt-2 max-w-prose text-base">
                  Daycare runs {summerDaycare.dailyRate}. Book a single day or the
                  full themed week. Boarding rates and add-ons are listed on our
                  Rover profile.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-bark">Hours &amp; booking</h3>
                <p className="dek mt-2 max-w-prose text-base">
                  {summerDaycare.hours} When your dog wants in, request the dates
                  on Rover — that is where current openings live.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl text-bark">Holidays &amp; closures</h3>
                <p className="dek mt-2 max-w-prose text-base">{summerDaycare.closures}</p>
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <a
                href={ctas.bookPetCare.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-bark px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-bark-soft"
              >
                Reserve on Rover
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="smallcaps mt-6 text-bark-soft">
                {cityConfig.rover.rating} ★ · {cityConfig.rover.reviewCount} reviews · Star Sitter
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
