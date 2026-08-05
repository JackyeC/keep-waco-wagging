import Image from "next/image";
import { designPhotos } from "@/data/designPhotos";
import { merchAnchorLine } from "@/data/merchCuration";
import { featuredHoodies } from "@/data/hoodieShop";

export function HoodieShopHero() {
  const hero = designPhotos.shopHero;

  return (
    <section className="relative min-h-[min(72vh,640px)] w-full overflow-hidden bg-bark">
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover motion-hero-image"
        style={{ objectPosition: hero.objectPosition }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-bark/80 via-bark/30 to-bark/15"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(72vh,640px)] max-w-[1200px] flex-col justify-end px-6 pb-12 pt-24 sm:pb-14">
        <div className="motion-hero-copy max-w-lg text-cream">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] font-medium tracking-[-0.02em]">
            Wear the{" "}
            <span className="font-script text-[clamp(2.6rem,6.5vw,4.5rem)] text-blush">
              Wag
            </span>
          </h1>
          <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed text-cream/85">
            {merchAnchorLine}
          </p>
          <a
            href="#featured"
            className="btn-pill mt-8 inline-flex bg-cream px-8 py-3.5 text-bark hover:bg-soft-cream"
          >
            Shop the collection
          </a>
        </div>
      </div>
    </section>
  );
}

export const featuredHoodieHandles = featuredHoodies.map((h) => h.handle);
