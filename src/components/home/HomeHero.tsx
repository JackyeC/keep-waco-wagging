import Image from "next/image";
import Link from "next/link";
import { designPhotos } from "@/data/designPhotos";
import {
  brandLanguage,
  cityConfig,
  ctas,
} from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

export function HomeHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-2">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
            {brandLanguage.brandByLine}
          </span>
          <h1 className="display mt-3.5 text-balance">
            Full-time care for Waco&apos;s{" "}
            <span className="font-script text-[clamp(2.75rem,5vw,4.375rem)] text-rose">
              dog families
            </span>
          </h1>
          <p className="mt-4 text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
            {cityConfig.city}, {cityConfig.stateAbbr} · {cityConfig.county}
          </p>
          <p className="dek mt-3.5 max-w-md">
            {brandLanguage.brandRelationship} — the family-run team behind
            boarding, daycare, scooping, training, and event care.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={ctas.bookService.href} className="btn-pill btn-sage px-7 py-4">
              Book a service
            </Link>
            <a href="#services" className="btn-pill btn-rose-outline px-7 py-3.5">
              See our services
            </a>
          </div>
          <p className="mt-6 text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
            ★ {roverCredentialsLine}
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] max-h-[480px] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src={designPhotos.homeHero.src}
              alt={designPhotos.homeHero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
          <div
            className="absolute -bottom-5 -left-5 flex h-[118px] w-[118px] -rotate-[7deg] flex-col items-center justify-center rounded-full bg-wag-sage text-center leading-none text-cream shadow-[0_10px_26px_rgba(0,0,0,0.16)]"
            aria-hidden
          >
            <span className="font-script text-[34px] text-blush">waco</span>
            <span className="mt-1 text-[11px] font-medium tracking-[0.24em]">
              STRONG
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
