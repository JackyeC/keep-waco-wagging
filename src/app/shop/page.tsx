import type { Metadata } from "next";
import {
  HoodieShopHero,
  featuredHoodieHandles,
} from "@/components/merch/HoodieShopSection";
import { ShopBagButton } from "@/components/merch/ShopCartDrawer";
import { ShopExperience } from "@/components/merch/ShopExperience";
import { ShopProductGrid } from "@/components/merch/ShopProductGrid";
import {
  getAccessoryProducts,
  merchAnchorLine,
  pickFeaturedProducts,
} from "@/data/merchCuration";
import {
  batch1CuratedCollectionMeta,
} from "@/data/batch1CuratedCollection";
import {
  getShopifyStorefrontUrl,
  shopifyStoreConfig,
} from "@/data/merchStore";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import { cityConfig } from "@/lib/site";

export const revalidate = 600;

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

type ShopCategory = "featured" | "hoodies" | "tees" | "accessories";

function CategoryNav({
  counts,
}: {
  counts: Record<ShopCategory, number>;
}) {
  const tabs: { id: ShopCategory; label: string }[] = [
    { id: "featured", label: "Featured" },
    { id: "hoodies", label: "Hoodies" },
    { id: "tees", label: "Tees" },
    { id: "accessories", label: "Accessories" },
  ];

  return (
    <nav
      aria-label="Shop categories"
      className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-4"
    >
      {tabs.map((tab) =>
        counts[tab.id] > 0 ? (
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

export default async function ShopPage() {
  const { products: catalog, cartOptionsByHandle, error } =
    await fetchShopifyCatalog();
  const storeLive = catalog.length > 0;
  const featured = pickFeaturedProducts(catalog, batch1CuratedCollectionMeta.maxProducts);
  const hoodies = catalog.filter((p) => featuredHoodieHandles.includes(p.slug));
  const accessories = getAccessoryProducts(catalog);
  const tees = catalog.filter(
    (p) =>
      /tee|t-shirt|shirt/i.test(`${p.slug} ${p.name}`) &&
      !/hoodie|sweatshirt|mug|tote|hat|bandana/i.test(p.slug) &&
      !hoodies.some((h) => h.id === p.id) &&
      !accessories.some((a) => a.id === p.id),
  );
  const storefrontUrl = getShopifyStorefrontUrl();

  const counts = {
    featured: featured.length,
    hoodies: hoodies.length,
    tees: tees.length,
    accessories: accessories.length,
  };

  return (
    <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
      <ShopBagBar />
      <HoodieShopHero />

      {error && (
        <section className="mx-auto max-w-[1200px] px-6 pt-8">
          <p className="text-sm font-light text-body-muted-light">
            {error}{" "}
            {storefrontUrl && (
              <a href={storefrontUrl} className="text-rose-deep underline underline-offset-2 hover:text-wag-sage">
                Browse on Shopify
              </a>
            )}
          </p>
        </section>
      )}

      {storeLive ? (
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-20">
          <CategoryNav counts={counts} />

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

          {hoodies.length > 0 && (
            <section id="hoodies" className="mt-20 scroll-mt-28">
              <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
                Hoodies
              </h2>
              <div className="mt-8">
                <ShopProductGrid products={hoodies} columns={3} />
              </div>
            </section>
          )}

          {tees.length > 0 && (
            <section id="tees" className="mt-20 scroll-mt-28">
              <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
                Tees
              </h2>
              <div className="mt-8">
                <ShopProductGrid products={tees.slice(0, 12)} columns={4} />
              </div>
            </section>
          )}

          {accessories.length > 0 && (
            <section id="accessories" className="mt-20 scroll-mt-28">
              <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
                Accessories
              </h2>
              <div className="mt-8">
                <ShopProductGrid products={accessories.slice(0, 12)} columns={4} />
              </div>
            </section>
          )}

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
              "We could not reach Shopify. Try again in a moment or visit the store directly."}
          </p>
          {storefrontUrl && (
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-xs font-medium tracking-[0.14em] text-wag-sage uppercase underline underline-offset-4"
            >
              Visit Shopify store
            </a>
          )}
        </section>
      )}
    </ShopExperience>
  );
}
