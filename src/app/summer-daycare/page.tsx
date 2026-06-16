import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SitePhoto } from "@/components/SitePhoto";
import { summerDaycare, daycareThemes } from "@/data/summerDaycare";
import { sitePhotos } from "@/data/sitePhotos";
import { cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = {
  title: `Summer Dog Daycare Camp in ${cityConfig.city} | Thirteen Weeks of Summer`,
  description:
    `A themed weekly summer daycare calendar for ${cityConfig.city} dogs — splash days, sniff safaris, manners camp, and more. Home-based, full-time care. Reserve your dog's spot on Rover.`,
};

export default function SummerDaycarePage() {
  return (
    <>
      <PageHeader
        eyebrow={summerDaycare.seasonLabel}
        title="Thirteen Weeks of Summer"
        description={summerDaycare.intro}
        tone="gold"
      />

      {/* Lede + Rover stats as prose */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="lede">
            A small-group summer camp run out of our home — a new theme every
            week, plenty of shade and water, and the same calm, full-time care
            your dog already knows.
          </p>
          <div className="mt-8 space-y-6 leading-relaxed text-bark-soft">
            <p>
              Each week runs Monday through Friday. Drop in for a single day or
              join the whole themed week of play, enrichment, and rest. Because
              groups stay small, every dog gets real attention from the people
              who own the home — not a rotating crew.
            </p>
            <p>
              {summerDaycare.heatNote}
            </p>
            <p className="text-bark">
              {cityConfig.rover.rating} · {cityConfig.rover.reviewCount} Rover
              reviews · Star Sitter with repeat families · 30 years caring for
              dogs in Central Texas.
            </p>
          </div>
        </div>
      </section>

      {/* Full-bleed photo break */}
      <section className="relative h-[56vh] min-h-[22rem] w-full">
        <SitePhoto
          src={sitePhotos.summerCamp.src}
          alt={sitePhotos.summerCamp.alt}
          sizes="100vw"
        />
      </section>

      {/* The calendar — editorial timeline */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">The calendar</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">
              A new theme every week
            </h2>
            <p className="mt-4 leading-relaxed text-bark-soft">
              Reserve any week your dog wants to join. Availability lives on our
              Rover profile — request the dates and we will confirm.
            </p>
          </div>

          <div className="mt-16">
            {daycareThemes.map((theme) => (
              <article
                key={theme.week}
                className="grid grid-cols-1 gap-4 border-t border-clay py-10 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-2">
                  <p className="eyebrow text-gold-600">
                    {`Week ${String(theme.week).padStart(2, "0")}`}
                  </p>
                  <p className="mt-1 text-sm text-bark-faint">
                    {theme.dateRange}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl">{theme.name}</h3>
                  <p className="mt-3 max-w-prose leading-relaxed text-bark-soft">
                    {theme.blurb}
                  </p>
                  {theme.note && (
                    <p className="mt-3 max-w-prose text-sm italic text-bark-soft">
                      {theme.note}
                    </p>
                  )}
                </div>
                <div className="md:col-span-3">
                  <ul className="space-y-1.5 text-sm text-bark-soft">
                    {theme.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            <hr className="rule" />
          </div>
        </div>
      </section>

      {/* How it works + pricing — clean prose */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow">How it works</p>
            </div>
            <div className="md:col-span-8 md:col-start-4">
              <div className="space-y-8 leading-relaxed text-bark-soft">
                <div>
                  <h3 className="font-display text-xl text-bark">Pricing</h3>
                  <p className="mt-2 max-w-prose">
                    Daycare runs {summerDaycare.dailyRate}. Book a single day or
                    the full themed week. Boarding rates and add-ons are listed
                    on our Rover profile.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-bark">
                    Hours &amp; booking
                  </h3>
                  <p className="mt-2 max-w-prose">
                    {summerDaycare.hours} When your dog wants in, request the
                    dates on Rover — that is where current openings live.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-bark">
                    Holidays &amp; closures
                  </h3>
                  <p className="mt-2 max-w-prose">{summerDaycare.closures}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={ctas.bookPetCare.href}
                  className="inline-flex items-center gap-2 bg-bark px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-bark-soft"
                >
                  Reserve on Rover
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/downloads/summer-daycare-2026.pdf"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download the 2026 calendar (PDF)
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
