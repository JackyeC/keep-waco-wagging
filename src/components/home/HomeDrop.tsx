import Link from "next/link";
import { ShopExperience } from "@/components/merch/ShopExperience";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { pickFeaturedProducts } from "@/data/merchCuration";
import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import { ctas } from "@/lib/site";

/** Curated merchandising labels — brand/curation terms, not sales stats. */
const dropBadges = [
  "Club Favorite",
  "New Drop",
  "Waco Exclusive",
  "Local Favorite",
] as const;

const DROP_COUNT = 4;

export async function HomeDrop() {
  const { products: catalog, cartOptionsByHandle } = await fetchShopifyCatalog();
  const drop = pickFeaturedProducts(catalog, DROP_COUNT);

  return (
    <section id="the-drop" className="mx-auto mt-20 max-w-[1200px] scroll-mt-24 px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow tracking-[0.24em]">New this season</p>
          <h2 className="heading mt-2 text-[clamp(2rem,4vw,2.75rem)]">
            The Drop
          </h2>
          <p className="dek mt-2 max-w-lg text-[15px]">
            A tight edit of what Waco dog people are wearing and gifting right
            now — designed here, made to order.
          </p>
        </div>
        <Link
          href={ctas.visitShop.href}
          className="border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
        >
          Shop all →
        </Link>
      </div>

      {drop.length > 0 ? (
        <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {drop.map((product, i) => (
              <MerchProductCard
                key={product.id}
                product={product}
                detailViewSource="home_drop"
                badge={dropBadges[i % dropBadges.length]}
              />
            ))}
          </div>
        </ShopExperience>
      ) : (
        <div className="card-panel mt-8 px-8 py-12 text-center">
          <p className="font-display text-2xl text-serif-ink">
            The Drop is loading
          </p>
          <p className="body-light mx-auto mt-3 max-w-md text-sm">
            Our latest favorites are on the way. Browse the full shop in the
            meantime.
          </p>
          <Link
            href={ctas.visitShop.href}
            className="btn-pill btn-sage mt-6 inline-flex px-7 py-3"
          >
            Shop the collection
          </Link>
        </div>
      )}
    </section>
  );
}
