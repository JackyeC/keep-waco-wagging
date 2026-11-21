import Image from "next/image";
import { shopGraphics } from "@/data/shopGraphics";

export function ShopHero() {
  return (
    <section className="bg-[#efe7db]" aria-labelledby="shop-hero-title">
      <div className="mx-auto grid max-w-[1100px] items-center gap-6 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-12">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
            Keep Waco Wagging by Platinum Scoops
          </p>
          <h1
            id="shop-hero-title"
            className="mt-2 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[0.98] font-medium text-serif-ink"
          >
            Your dog&apos;s Waco merch
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed font-light text-body-muted lg:mx-0">
            Breed pride up front, with the Waco skyline behind it.
          </p>
          <a
            href="#breed-lines"
            className="btn-pill btn-sage mt-5 inline-flex min-h-11 px-7 py-3"
          >
            Shop the lines
          </a>
        </div>
        <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-[24px] bg-white lg:max-w-none">
          <Image
            src={shopGraphics.hero.src}
            alt={shopGraphics.hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-cover object-right"
          />
        </div>
      </div>
    </section>
  );
}
