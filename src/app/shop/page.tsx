import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { HoodieShopHero } from "@/components/merch/HoodieShopSection";
import { ShopBagButton } from "@/components/merch/ShopCartDrawer";
import { ShopExperience } from "@/components/merch/ShopExperience";
import { ShopProductGrid } from "@/components/merch/ShopProductGrid";
import {
  merchAnchorLine,
  pickFeaturedProducts,
} from "@/data/merchCuration";
import {
  batch1CuratedCollectionMeta,
} from "@/data/batch1CuratedCollection";
import { shopifyStoreConfig } from "@/data/merchStore";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyCatalog, fetchWagFridayHandles } from "@/lib/shopifyCatalog";
import { groupShopProducts, type ShopSectionId } from "@/lib/shopSections";
import { blackFridayPromo, cityConfig } from "@/lib/site";

/** Render on each request so Shopify price edits are not stuck in ISR HTML. */
export const revalidate = 0;
export const maxDuration = 30;

const pageTitle = "Keep Waco Wagging Merch | Waco Dog Apparel";
const pageDescription =
  "Celebrating dog parents + Waco. Shop skyline tees, dog mom & dad shirts, breed hoodies, totes, and mugs — cute shirts, local impact.";

export const metadata: Metadata = {
  ...servicePageMetadata(
    "/shop",
    pageTitle,
    pageDescription,
    designPhotos.shopHero,
  ),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${cityConfig.url}/shop`,
    siteName: cityConfig.name,
    type: "website",
    images: [
      {
        url: designPhotos.shopHero.src,
        alt: designPhotos.shopHero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [designPhotos.shopHero.src],
  },
};

function ShopBagBar() {
  return (
    <div className="border-b border-border/70 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-end px-6 py-2">
        <ShopBagButton />
      </div>
    </div>
  );
}

type ShopCategory = "featured" | "sale" | ShopSectionId;

function CategoryNav({
  counts,
}: {
  counts: Partial<Record<ShopCategory, number>>;
}) {
  const tabs: { id: ShopCategory; label: string }[] = [
    { id: "sale", label: "Black Friday" },
    { id: "featured", label: "Featured" },
    { id: "hoodies", label: "Hoodies" },
    { id: "crewnecks", label: "Crewnecks" },
    { id: "tees", label: "Tees" },
    { id: "accessories", label: "Accessories" },
    { id: "more", label: "More" },
  ];

  return (
    <nav
      aria-label="Shop categories"
      className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4"
    >
      {tabs.map((tab) =>
        (counts[tab.id] ?? 0) > 0 ? (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className="text-xs font-medium tracking-[0.16em] text-label-muted uppercase transition-colors hover:text-serif-ink"
          >
            {tab.label}
          </a>
        ) : null,
      )}
    </nav>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ promo?: string }>;
}) {
  await connection();
  const { promo } = await searchParams;
  const { products: catalog, cartOptionsByHandle, error } =
    await fetchShopifyCatalog();
  const storeLive = catalog.length > 0;
  const saleRequested = promo === "wagfriday";
  const saleHandles = saleRequested ? await fetchWagFridayHandles() : [];
  const saleProducts = saleRequested
    ? catalog.filter((product) => saleHandles.includes(product.slug))
    : [];
  const showingSale = saleProducts.length > 0;
  const featured = showingSale
    ? []
    : pickFeaturedProducts(catalog, batch1CuratedCollectionMeta.maxProducts);
  const sections = showingSale ? [] : groupShopProducts(catalog);

  const counts: Partial<Record<ShopCategory, number>> = {
    sale: showingSale ? saleProducts.length : 0,
    featured: featured.length,
  };
  for (const section of sections) {
    counts[section.id] = section.products.length;
  }

  return (
    <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
      <ShopBagBar />
      <HoodieShopHero />

      {error && (
        <section className="mx-auto max-w-[1200px] px-6 pt-8">
          <p className="text-sm font-light text-body-muted-light">{error}</p>
        </section>
      )}

      {storeLive ? (
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-20">
          <p className="mb-8 max-w-xl text-[13px] font-light leading-relaxed text-label-muted">
            {shopifyStoreConfig.holidayOrderNote}
          </p>
          {saleRequested && !showingSale && (
            <p className="mb-8 max-w-xl text-sm font-light text-body-muted-light">
              The sale list did not load. Everything currently published is below.
            </p>
          )}
          <CategoryNav counts={counts} />

          {showingSale && (
            <section id="sale" className="mt-12 scroll-mt-28">
              <div className="max-w-xl">
                <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
                  Black Friday Wag Sale
                </h2>
                <p className="dek mt-2 text-[15px]">{blackFridayPromo.bannerMessage}</p>
                <Link
                  href="/shop"
                  className="mt-3 inline-block text-xs font-medium tracking-[0.14em] text-wag-sage uppercase underline underline-offset-4"
                >
                  Browse the full shop
                </Link>
              </div>
              <div className="mt-8">
                <ShopProductGrid products={saleProducts} columns={4} />
              </div>
            </section>
          )}

          {featured.length > 0 && (
            <section id="featured" className="mt-12 scroll-mt-28">
              <div className="max-w-xl">
                <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
                  Featured
                </h2>
                <p className="dek mt-2 text-[15px]">{merchAnchorLine}</p>
              </div>
              <div className="mt-8">
                <ShopProductGrid products={featured} columns={4} />
              </div>
            </section>
          )}

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mt-20 scroll-mt-28"
            >
              <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
                {section.label}
              </h2>
              <div className="mt-8">
                <ShopProductGrid
                  products={section.products}
                  columns={section.id === "hoodies" || section.id === "crewnecks" ? 3 : 4}
                />
              </div>
            </section>
          ))}

          <p className="mt-16 max-w-lg text-[13px] font-light leading-relaxed text-label-muted">
            {shopifyStoreConfig.fulfillmentNote}{" "}
            {shopifyStoreConfig.externalCheckoutNote}
          </p>
        </div>
      ) : (
        <section className="mx-auto max-w-[1200px] px-6 py-20 text-center">
          <p className="font-display text-2xl text-serif-ink">
            {error ? "Merch temporarily unavailable" : "Merch loading…"}
          </p>
          <p className="body-light mx-auto mt-3 max-w-md text-sm">
            {error ??
              "We could not reach Shopify. Refresh in a moment and the shop will load here."}
          </p>
        </section>
      )}
    </ShopExperience>
  );
}
