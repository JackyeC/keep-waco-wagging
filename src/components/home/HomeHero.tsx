import Image from "next/image";
import Link from "next/link";
import { designPhotos } from "@/data/designPhotos";
import { merchAnchorLine } from "@/data/merchCuration";
import { brandLanguage } from "@/lib/site";

export function HomeHero() {
  const hero = designPhotos.homeHero;

  return (
    <section className="relative min-h-[min(92vh,820px)] w-full overflow-hidden bg-bark">
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover motion-hero-image"
        style={{
          objectPosition:
            "objectPosition" in hero ? hero.objectPosition : "center center",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-bark/90 via-bark/45 to-bark/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-bark/55 via-bark/15 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(92vh,820px)] max-w-[1200px] flex-col justify-end px-6 pb-14 pt-28 sm:pb-16 lg:pb-20">
        <div className="motion-hero-copy max-w-xl text-cream">
          <p className="font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95] font-medium tracking-[-0.02em] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
            Keep Waco{" "}
            <span className="font-script text-[clamp(2.85rem,7.5vw,5rem)] text-blush">
              wagging
            </span>
          </p>
          <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed text-cream/90">
            {merchAnchorLine}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/shop"
              className="btn-pill bg-cream px-8 py-3.5 text-bark hover:bg-soft-cream"
            >
              Shop the collection
            </Link>
            <Link
              href="/#services"
              className="text-xs font-medium tracking-[0.16em] text-cream/85 uppercase underline decoration-cream/40 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream"
            >
              Pet care services
            </Link>
          </div>
          <p className="mt-6 text-[11px] font-medium tracking-[0.18em] text-cream/65 uppercase">
            {brandLanguage.brandByLine}
          </p>
        </div>
      </div>
    </section>
  );
}
