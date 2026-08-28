import Image from "next/image";
import Link from "next/link";
import { pickFeaturedProducts } from "@/data/merchCuration";
import { merchAnchorLine } from "@/data/merchCuration";
import { getFeaturedMerchProducts } from "@/data/merchStore";
import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";

const FEATURED_COUNT = 4;

export async function HomeMerchStrip() {
  const { products: catalog } = await fetchShopifyCatalog();
  const featured =
    catalog.length > 0
      ? pickFeaturedProducts(catalog, FEATURED_COUNT)
      : getFeaturedMerchProducts(FEATURED_COUNT);

  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-6 sm:pt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow tracking-[0.22em]">Worth wearing</p>
          <h2 className="heading mt-2 text-[clamp(1.75rem,3vw,2.5rem)]">
            From the shop
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-medium tracking-[0.16em] text-wag-sage uppercase underline decoration-border underline-offset-4 hover:text-rose hover:decoration-rose"
        >
          View all
        </Link>
      </div>
      <p className="dek mt-3 max-w-md text-[15px]">{merchAnchorLine}</p>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {featured.map((product) => (
          <li key={product.id}>
            <Link href="/shop" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-garment-tray">
                {product.image ? (
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    sizes="(max-width: 768px) 45vw, 260px"
                    className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <h3 className="mt-3.5 font-display text-[18px] leading-snug text-serif-ink">
                {product.name}
              </h3>
              {product.price ? (
                <p className="mt-1 text-[13px] font-light text-body-muted">
                  {product.price}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
