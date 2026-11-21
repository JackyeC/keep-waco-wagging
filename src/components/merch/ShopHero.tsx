import Link from "next/link";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";
import type { ShopFavorite } from "@/lib/shopFavorites";

export function ShopHero({ hero }: { hero: ShopFavorite | null }) {
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
          The Wag Club, and the paw print tees.
        </p>
        <a
          href="#shop-favorites"
          className="btn-pill btn-sage mt-7 inline-flex min-h-11 px-7 py-3"
        >
          Shop favorites
        </a>
        {hero && (
          <Link
            href={`/shop/product/${hero.product.slug}`}
            className="relative mx-auto mt-12 block aspect-square w-full max-w-[460px] overflow-hidden rounded-[24px] bg-white"
          >
            <ShopifyProductImage
              src={hero.src}
              alt={hero.alt}
              priority
              sizes="(max-width: 640px) 90vw, 440px"
              className="object-contain object-center p-4"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
