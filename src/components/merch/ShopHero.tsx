import Link from "next/link";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";
import type { ShopFavorite } from "@/lib/shopFavorites";

export function ShopHero({ heroes }: { heroes: ShopFavorite[] }) {
  return (
    <section className="bg-cream" aria-labelledby="shop-hero-title">
      <div className="mx-auto max-w-[1100px] px-5 py-14 text-center sm:px-6 sm:py-20">
        <p className="text-[11px] font-medium tracking-[0.22em] text-label-muted uppercase">
          Keep Waco Wagging by Platinum Scoops
        </p>
        <h1
          id="shop-hero-title"
          className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-[0.96] font-medium text-serif-ink"
        >
          Your dog&apos;s Waco merch
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed font-light text-body-muted">
          Waco Dog Mom and Waco Dog Dad.
        </p>
        <a
          href="#shop-favorites"
          className="btn-pill btn-sage mt-7 inline-flex min-h-11 px-7 py-3"
        >
          Shop favorites
        </a>
        {heroes.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-[820px] grid-cols-2 gap-3 sm:gap-6">
            {heroes.map((hero) => (
              <Link
                key={hero.src}
                href={`/shop/product/${hero.product.slug}`}
                className="relative block aspect-square overflow-hidden rounded-[24px] bg-white"
              >
                <ShopifyProductImage
                  src={hero.src}
                  alt={hero.alt}
                  priority
                  sizes="(max-width: 640px) 46vw, 380px"
                  className="object-contain object-center p-3 sm:p-5"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
