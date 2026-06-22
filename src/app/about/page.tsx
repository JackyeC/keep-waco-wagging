import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SitePhoto } from "@/components/SitePhoto";
import { sitePhotos } from "@/data/sitePhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { roverCredentialsLine } from "@/lib/roverCredentials";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/about",
  "About Keep Waco Wagging",
  `Meet Jackye and Todd Clayton — full-time Waco pet care professionals. ${brandLanguage.brandByLine}.`,
);

const masthead = [
  { label: "Founders", value: "Jackye + Todd Clayton" },
  { label: "Based", value: "Waco, Texas" },
  { label: "On Rover", value: roverCredentialsLine },
  { label: "Filed under", value: "Boarding · Yard care · Summer camp" },
];

const whatYouGet = [
  "Daily photo updates",
  "Medication on schedule",
  "Routine kept exactly",
  "Real attention not rotating crew",
  "Real home not a kennel",
  "Rover Star Sitter on Rover",
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO STRIP ── asymmetric, not full-bleed */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">About</p>
              <h1 className="display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Full-time pet care for Waco dog families.
              </h1>
              <p className="dek mt-6">
                Keep Waco Wagging is the work of one family — Jackye and Todd
                Clayton — who look after other people&rsquo;s dogs as if they were
                their own. Not an app, not a side gig. A home.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand">
                <SitePhoto
                  src={sitePhotos.jackyeGoldendoodleTee.src}
                  alt={sitePhotos.jackyeGoldendoodleTee.alt}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METADATA RAIL ── masthead style */}
      <section className="bg-cream">
        <hr className="hairline" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 divide-gold-400/30 md:grid-cols-4 md:divide-x">
            {masthead.map((item, i) => (
              <div
                key={item.label}
                className={
                  "py-6 md:px-8 md:first:pl-0 md:last:pr-0" +
                  (i > 0 ? " md:pl-8" : "")
                }
              >
                <dt className="smallcaps text-gold-500">{item.label}</dt>
                <dd className="smallcaps mt-2 text-bark">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <hr className="hairline" />
      </section>

      {/* ── SECTION 01 — THE WORK ── asymmetric, drop cap */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 01 — The work</p>
          <hr className="hairline mt-6" />
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="space-y-6 leading-relaxed text-bark-soft md:columns-2 md:gap-10 md:space-y-0 [&>p]:mb-6">
                <p className="drop-cap">
                  Jackye and Todd Clayton are Waco-based pet care professionals,
                  lifelong dog people, and the founders of Platinum Scoops. For
                  years, friends and neighbors trusted us with their dogs when
                  they traveled — and asked us to help keep their yards clean
                  while they were busy with everything else.
                </p>
                <p>
                  That word-of-mouth turned into something steadier. Today we run
                  a full-time, home-based pet care practice: boarding and daycare
                  on Rover, recurring yard care through Platinum Scoops, and a
                  themed summer camp that gives Waco dogs somewhere to belong when
                  school is out and the heat is on.
                </p>
                <p>
                  Our own pack — three resident dogs and a rotating foster — keeps
                  us honest. We know what high energy looks like, what a senior
                  dog needs, how to give medication without a fight, and how to
                  read the moment a play session should become a nap.
                </p>
              </div>
            </div>
            <div className="md:col-span-4">
              <p className="caption">
                Pictured: Jackye + a Waco border collie, summer 2025.
              </p>
              <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand">
                <SitePhoto
                  src={sitePhotos.jackyeCollieTree.src}
                  alt={sitePhotos.jackyeCollieTree.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── frenchieSinkBath backdrop, 65% overlay */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <SitePhoto
            src={sitePhotos.frenchieSinkBath.src}
            alt={sitePhotos.frenchieSinkBath.alt}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bark/[0.65]" />
        </div>
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 md:py-36 lg:px-8">
          <hr className="hairline mx-auto w-20" />
          <blockquote className="my-10">
            <p className="font-display text-[1.75rem] italic leading-snug text-cream sm:text-[2.5rem] md:text-[2.75rem]">
              &ldquo;We did not set out to build a business. We set out to take
              good care of dogs. The rest followed.&rdquo;
            </p>
          </blockquote>
          <p className="smallcaps text-gold-200">Jackye Clayton</p>
          <hr className="hairline mx-auto mt-10 w-20" />
        </div>
      </section>

      {/* ── SECTION 02 — THE FAMILY ── */}
      <section className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 02 — The family</p>
          <hr className="hairline mt-6" />
          <div className="mt-12 grid grid-cols-1 items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <figure>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream">
                  <SitePhoto
                    src={sitePhotos.toddGoldendoodle.src}
                    alt={sitePhotos.toddGoldendoodle.alt}
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>
                <figcaption className="caption mt-3">
                  Todd Clayton — founder of Platinum Scoops. Quiet operations,
                  loud yard cleanup.
                </figcaption>
              </figure>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="space-y-6 leading-relaxed text-bark-soft">
                <p>
                  Todd is the steady half of the operation. He founded Platinum
                  Scoops — the recurring yard-cleanup service that started this
                  whole thing — and still runs the routes that keep Waco yards
                  usable through the worst of the Texas heat.
                </p>
                <p>
                  Together, Jackye and Todd built a family business the slow way:
                  one neighbor, one dog, one clean yard at a time. They have been
                  dog people from way back — the kind who can tell you which dog
                  on the block needs a slower introduction and which one just
                  needs a job to do.
                </p>
                <p>
                  When you book with Keep Waco Wagging, you are working with the
                  two people who own the home, do the work, and answer the phone.
                  That is the whole point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 03 — WHAT YOU GET ── hairline bullets, 3 cols */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">No. 03 — What you get</p>
          <hr className="hairline mt-6" />
          <ul className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-3">
            {whatYouGet.map((item) => (
              <li
                key={item}
                className="border-t border-gold-400/30 py-5 font-display text-xl text-bark"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <a
              href={ctas.bookPetCare.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-bark px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-bark-soft"
            >
              Book pet care on Rover
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER TAG ROW ── */}
      <section className="bg-cream pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <hr className="hairline" />
          <p className="smallcaps mt-6 text-bark-soft">
            Filed under: Boarding · Daycare · Yard care · Summer camp · {cityConfig.city} · {brandLanguage.brandByLine}
          </p>
        </div>
      </section>
    </>
  );
}
