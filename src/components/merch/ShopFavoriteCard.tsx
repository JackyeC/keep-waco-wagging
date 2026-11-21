import Link from "next/link";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";
import type { ShopFavorite } from "@/lib/shopFavorites";

export function ShopFavoriteCard({ favorite }: { favorite: ShopFavorite }) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-border bg-soft-cream p-3">
      <Link href={`/shop/product/${favorite.product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-[14px] bg-white">
          <ShopifyProductImage
            src={favorite.src}
            alt={favorite.alt}
            sizes="(max-width: 640px) 46vw, 260px"
            className="object-contain object-center p-3"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="line-clamp-2 min-h-[2.7em] font-display text-[1.15rem] leading-snug font-medium text-serif-ink">
          <Link
            href={`/shop/product/${favorite.product.slug}`}
            className="hover:text-rose-deep"
          >
            {favorite.title ?? favorite.product.name}
          </Link>
        </h3>
        <div className="mt-auto pt-4">
          {favorite.product.price && (
            <p className="text-[15px] font-medium text-serif-ink">
              {favorite.product.price}
            </p>
          )}
          <Link
            href={`/shop/product/${favorite.product.slug}`}
            className="btn-pill btn-sage mt-3 inline-flex min-h-11 w-full px-4 py-3 text-[11px]"
          >
            Shop this
          </Link>
        </div>
      </div>
    </article>
  );
}
