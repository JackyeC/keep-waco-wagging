import Image from "next/image";
import { shopGraphics } from "@/data/shopGraphics";
import { publicFileExists } from "@/lib/shopSlots";

export function ShopHero() {
  const mobileArt = publicFileExists(shopGraphics.heroMobile.src);

  return (
    <section className="relative overflow-hidden bg-[#efe7db]" aria-labelledby="shop-hero-title">
      <div className="relative h-[188px] sm:h-[300px] lg:h-[440px]">
        <Image
          src={shopGraphics.hero.src}
          alt={shopGraphics.hero.alt}
          fill
          priority
          sizes="100vw"
          className={
            mobileArt
              ? "hidden object-cover object-center sm:block"
              : "object-cover object-center"
          }
        />
        {mobileArt ? (
          <Image
            src={shopGraphics.heroMobile.src}
            alt={shopGraphics.heroMobile.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:hidden"
          />
        ) : null}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-[24px] border border-border/80 bg-cream/92 px-5 py-4 text-center sm:px-8 sm:py-6">
            <p className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
              Keep Waco Wagging by Platinum Scoops
            </p>
            <h1
              id="shop-hero-title"
              className="mt-2 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[0.98] font-medium text-serif-ink"
            >
              Your dog&apos;s Waco merch
            </h1>
            <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed font-light text-body-muted sm:text-[15px]">
              Breed pride up front, with the Waco skyline behind it.
            </p>
            <a
              href="#the-edit"
              className="btn-pill btn-sage mt-4 inline-flex min-h-11 px-7 py-3"
            >
              Shop the edit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
