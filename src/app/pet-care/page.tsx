import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { designPhotos } from "@/data/designPhotos";
import { sitePhotos } from "@/data/sitePhotos";
import {
  petCareHubTrustLine,
  petCareProviderLine,
} from "@/data/petCareLandings";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/pet-care",
  "Pet Care in Waco TX | Boarding, Daycare & More | Platinum Scoops",
  "Home-based dog boarding, dog daycare, training, and more in Waco, TX. Pet care provided by Platinum Scoops. Choose boarding or daycare to see routines, rates, and how to request care on Rover.",
  designPhotos.svcBoard,
);

const pathways = [
  {
    title: "Dog Boarding",
    detail:
      "Overnight home-based care — walks, enrichment, rest, and daily updates in a Waco home, not a kennel.",
    href: "/dog-boarding-waco-tx",
    cta: "Explore boarding",
    image: sitePhotos.boardingHome,
    rateHint: "Overnight stays",
  },
  {
    title: "Dog Daycare",
    detail:
      "Small-group daytime care with play, enrichment, and real rest — without the warehouse feel.",
    href: "/dog-daycare-waco-tx",
    cta: "Explore daycare",
    image: sitePhotos.boardingDogs,
    rateHint: "Daytime care",
  },
] as const;

export default function PetCareHubPage() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
              Pet care in Waco
            </span>
            <h1 className="display mt-3.5 text-balance">
              A calm Waco home, not a{" "}
              <span className="font-script text-[clamp(2.75rem,5vw,4.25rem)] text-rose">
                kennel
              </span>
            </h1>
            <p className="mt-4 text-[13px] font-medium tracking-[0.04em] text-wag-sage">
              {petCareProviderLine}
            </p>
            <p className="mt-3 text-xs font-medium tracking-[0.14em] text-label-muted uppercase">
              {petCareHubTrustLine}
            </p>
            <p className="dek mt-4 max-w-md">
              Choose overnight boarding or daytime daycare to see how care works,
              what it costs, and how to request dates on Rover.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/dog-boarding-waco-tx" className="btn-pill btn-sage px-7 py-4">
                Dog boarding
              </Link>
              <Link
                href="/dog-daycare-waco-tx"
                className="btn-pill btn-rose-outline px-7 py-3.5"
              >
                Dog daycare
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] max-h-[440px] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src={designPhotos.aboutHero.src}
              alt={designPhotos.aboutHero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="text-center">
          <p className="eyebrow tracking-[0.22em]">Choose your path</p>
          <h2 className="heading mt-1.5 text-[38px]">
            Boarding or daycare — pick the page that fits
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {pathways.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-border bg-soft-cream transition-colors hover:border-rose"
            >
              <div className="relative h-[200px] w-full">
                <Image
                  src={path.image.src}
                  alt={path.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col px-6 py-5">
                <span className="text-[10.5px] font-medium tracking-[0.16em] text-rose-deep uppercase">
                  {path.rateHint}
                </span>
                <h3 className="mt-1 font-display text-[28px] font-semibold text-serif-ink">
                  {path.title}
                </h3>
                <p className="body-light mt-2 flex-1 text-[14px]">{path.detail}</p>
                <span className="mt-4 text-[11.5px] font-medium tracking-[0.12em] text-wag-sage uppercase">
                  {path.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="rounded-[24px] border border-border bg-soft-cream p-8 md:p-10">
          <div className="text-center text-[15px] tracking-wide text-rose" aria-hidden>
            ★★★★★
          </div>
          <blockquote className="mx-auto mt-3.5 max-w-3xl text-center font-display text-[26px] leading-snug text-serif-ink italic">
            &ldquo;She was sick with pancreatitis — they followed all my detailed
            instructions and sent photos and videos daily. I can only give them my
            highest recommendation.&rdquo;
          </blockquote>
          <p className="mt-4 text-center text-xs font-medium tracking-[0.14em] text-label-muted uppercase">
            Linda · Rover
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="text-center">
          <p className="eyebrow tracking-[0.22em]">More pet care</p>
          <h2 className="heading mt-1.5 text-[34px]">Other services</h2>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Poop scooping", href: "/platinum-scoops" },
            { label: "Lifestyle training", href: "/training" },
            { label: "Wedding pet care", href: "/pet-care/weddings-events" },
            { label: "Summer Dog Camp", href: "/summer-daycare" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[16px] border border-border bg-soft-cream px-5 py-4 text-center transition-colors hover:border-rose"
            >
              <span className="font-display text-[18px] font-semibold text-serif-ink">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-[13px] font-light text-body-muted-light">
          {brandLanguage.sponsorServices} Summer Dog Camp is seasonal themed
          programming — not the same as year-round daycare.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6 pb-6">
        <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-12">
          <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
            {cityConfig.founders.names}
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-[36px] leading-tight font-medium">
            Ready to request care on{" "}
            <span className="font-script text-[42px] text-blush">Rover</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] font-light opacity-92">
            {petCareProviderLine} Open the service page that matches your need,
            then request dates on Rover.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/dog-boarding-waco-tx" className="btn-pill bg-cream px-7 py-3.5 text-wag-sage">
              Boarding details
            </Link>
            <Link
              href="/dog-daycare-waco-tx"
              className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream"
            >
              Daycare details
            </Link>
            <a
              href={ctas.bookPetCare.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream"
            >
              Rover profile
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
