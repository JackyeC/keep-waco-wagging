import type { Metadata } from "next";
import Link from "next/link";
import { PublisherNote } from "@/components/PublisherNote";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/Button";
import { GearGuideDepartmentSection } from "@/components/gear-guide/GearGuideDepartmentSection";
import {
  GEAR_GUIDE_AFFILIATE_DISCLOSURE,
  gearGuideCoverLines,
  getGearGuideDepartments,
  getGearGuideToc,
} from "@/data/gearGuide";
import { sitePhotos } from "@/data/sitePhotos";
import { ctas, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Keep Waco Wagging Gear Guide | Dog Products We Use in Waco, TX",
  description:
    "Real dog gear from the Platinum Scoops shopping list: cleanup supplies, leashes, enrichment toys, grooming tools, safety gear, and Waco dog-care picks.",
};

export default function ShopPage() {
  const departments = getGearGuideDepartments();
  const toc = getGearGuideToc();

  return (
    <>
      {/* Magazine cover hero */}
      <section className="relative border-b border-clay bg-bark text-cream">
        <div className="relative min-h-[min(88vh,920px)] w-full">
          <SitePhoto
            src={sitePhotos.training.src}
            alt="A dog working on a puzzle enrichment toy in a calm home environment"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/75 to-bark/30" />
          <div className="absolute inset-0 flex flex-col">
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <PublisherNote light />
                <p className="max-w-xs text-right text-[10px] font-medium uppercase tracking-[0.2em] text-cream/50 sm:text-xs">
                  {siteConfig.name} · Field Guide Edition
                </p>
              </div>

              <div className="pb-4 sm:pb-8">
                <p className="eyebrow text-cream/60">The Gear Guide</p>
                <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">
                  The Keep Waco Wagging Gear Guide
                </h1>
                <p className="mt-4 max-w-2xl text-base font-medium text-cream/90 sm:text-lg">
                  Real products from the Platinum Scoops shopping list
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base">
                  Tested, bought, considered, or recommended for Waco heat, daycare
                  days, boarding stays, muddy paws, leash tangles, cleanup jobs, and
                  everyday dog-parent chaos.
                </p>

                <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:max-w-3xl">
                  {gearGuideCoverLines.map((line) => (
                    <li
                      key={line}
                      className="border-l border-cream/25 pl-3 text-xs leading-snug text-cream/70 sm:text-sm"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="#guide-contents" variant="secondary" size="lg" className="border-cream/30 bg-cream/10 text-cream hover:bg-cream/20">
                    Read the Guide
                  </Button>
                  <Button href="/pet-care" variant="sponsor" size="lg">
                    Book Platinum Scoops Care
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate disclosure — top */}
      <section className="border-b border-clay bg-cream py-6">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-bark-faint">
            {GEAR_GUIDE_AFFILIATE_DISCLOSURE}{" "}
            <Link href="/affiliate-disclosure" className="font-medium text-sage-700 underline-offset-2 hover:underline">
              Read full disclosure
            </Link>
          </p>
        </div>
      </section>

      {/* Editor's note */}
      <section className="border-b border-clay bg-paper py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="editorial-panel grid gap-10 p-8 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Editor&apos;s note</p>
              <h2 className="headline-tertiary mt-3">A note from Platinum Scoops</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-bark-soft sm:text-base lg:col-span-8">
              <p className="lede text-bark">We buy dog gear differently now.</p>
              <p>
                When you care for multiple dogs, the cute stuff gets humbled fast. The
                best products are usually the ones that are easy to clean, hard to
                destroy, simple to store, and useful more than once.
              </p>
              <p>
                This guide is built from our real Platinum Scoops shopping list:
                leashes, cleaners, treats, toys, feeding mats, safety tools, grooming
                supplies, and the everyday dog-care gear we have bought, used,
                restocked, tested, considered, or learned from.
              </p>
              <p>
                Some of these are exact products we use. Some are similar to what we
                use. Some are products worth considering. Some belong in the
                &ldquo;use carefully&rdquo; category. All of them are here because real
                dog life is messy, hot, funny, loud, and occasionally covered in mystery
                moisture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-clay bg-sand/40 py-12 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="eyebrow">Why these made the list</p>
          <p className="mt-4 text-sm leading-relaxed text-bark-soft sm:text-base">
            We look for products that are practical, easy to clean, sturdy enough for
            real dogs, useful in Texas weather, and simple for busy pet parents to keep
            up with. Cute is a bonus. Practical wins.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section id="guide-contents" className="scroll-mt-20 border-b border-clay bg-cream py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Contents</p>
          <h2 className="headline-secondary mt-3">In this guide</h2>
          <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Gear guide departments">
            {toc.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className="group border border-clay bg-white p-4 transition hover:border-sage-300 hover:shadow-sm sm:p-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-bark-faint">
                  {item.number}
                </p>
                <p className="mt-1 font-display text-lg text-bark group-hover:text-sage-800">
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-bark-soft sm:text-sm">
                  {item.blurb}
                </p>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 md:space-y-20 lg:px-8">
          {departments.map((department) => (
            <GearGuideDepartmentSection key={department.id} department={department} />
          ))}
        </div>
      </section>

      {/* Affiliate disclosure — bottom */}
      <section className="border-t border-clay bg-cream py-10">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-bark-faint">
            {GEAR_GUIDE_AFFILIATE_DISCLOSURE}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={ctas.bookScoops.href} variant="sponsor" size="md">
              Book Poop Scooping
            </Button>
            <Button href={ctas.bookPetCare.href} variant="secondary" size="md">
              Book Daycare or Boarding
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
