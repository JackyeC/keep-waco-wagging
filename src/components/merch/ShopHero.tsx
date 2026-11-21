import Link from "next/link";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";
import type { ShopFavorite } from "@/lib/shopFavorites";

export function ShopHero({ favorites }: { favorites: ShopFavorite[] }) {
  return (
    <section className="bg-[#efe7db]" aria-labelledby="shop-hero-title">
      <div className="mx-auto max-w-[1100px] px-5 py-8 text-center sm:px-6 sm:py-10">
        <p className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
          Keep Waco Wagging by Platinum Scoops
        </p>
        <h1
          id="shop-hero-title"
          className="mx-auto mt-2 max-w-3xl font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[0.98] font-medium text-serif-ink"
        >
          Your dog&apos;s Waco merch
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed font-light text-body-muted">
          Bandanas, breed art, and gifts for the dogs you love.
        </p>
        <a
          href="#shop-favorites"
          className="btn-pill btn-sage mt-5 inline-flex min-h-11 px-7 py-3"
        >
          Shop favorites
        </a>
        {favorites.length > 0 && (
          <ul className="mx-auto mt-8 grid max-w-[680px] grid-cols-2 gap-3 sm:gap-4">
            {favorites.map((favorite) => (
              <li key={favorite.product.slug}>
                <Link
                  href={`/shop/product/${favorite.product.slug}`}
                  className="relative block aspect-square overflow-hidden rounded-[20px] bg-white"
                >
                  <ShopifyProductImage
                    src={favorite.src}
                    alt={favorite.alt}
                    priority
                    sizes="(max-width: 640px) 46vw, 320px"
                    className="object-contain object-center p-3"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
