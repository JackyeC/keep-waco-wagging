import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  HoodieImpactPanel,
  HoodieShopHero,
  featuredHoodieHandles,
} from "@/components/merch/HoodieShopSection";
import { MerchPurposePanel } from "@/components/merch/MerchPurposePanel";
import { ShopBagButton } from "@/components/merch/ShopCartDrawer";
import { ShopByBreedPicker } from "@/components/merch/ShopByBreedPicker";
import { ShopExperience } from "@/components/merch/ShopExperience";
import { ShopProductGrid } from "@/components/merch/ShopProductGrid";
import { Button } from "@/components/ui/Button";
import {
  getAccessoryProducts,
  groupByDesign,
  merchAnchorLine,
  pickCuratedCollectionProducts,
  pickFeaturedProducts,
} from "@/data/merchCuration";
import {
  batch1CuratedCollectionMeta,
} from "@/data/batch1CuratedCollection";
import {
  getShopifyStorefrontUrl,
  shopifyStoreConfig,
} from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import { cityConfig, ctas } from "@/lib/site";

export const revalidate = 600;

const pageTitle = "Keep Waco Wagging Merch | Waco Dog Apparel";
const pageDescription =
  "Celebrating dog parents + Waco. Shop skyline tees, dog mom & dad shirts, breed hoodies, totes, and mugs — cute shirts, local impact.";

export const metadata: Metadata = {
  ...servicePageMetadata("/shop", pageTitle, pageDescription),
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${cityConfig.url}/shop`,
    siteName: cityConfig.name,
    type: "website",
    images: [
      {
        url: cityConfig.brand.logo.full.src,
        alt: cityConfig.brand.logo.full.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [cityConfig.brand.logo.full.src],
  },
};

function ShopBagBar() {
  return (
    <div className="border-b border-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-end px-6 py-2">
        <ShopBagButton />
      </div>
    </div>
  );
}

export default async function ShopPage() {
  const { products: catalog, cartOptionsByHandle, error } =
    await fetchShopifyCatalog();
  const storeLive = catalog.length > 0;
  const featured = pickFeaturedProducts(catalog, batch1CuratedCollectionMeta.maxProducts);
  const curatedCollection = pickCuratedCollectionProducts(catalog);
  const hoodies = catalog.filter((p) => featuredHoodieHandles.includes(p.slug));
  const designGroups = groupByDesign(catalog);
  const accessories = getAccessoryProducts(catalog);
  const storefrontUrl = getShopifyStorefrontUrl();

  return (
    <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
      <ShopBagBar />
      <HoodieShopHero />
      <HoodieImpactPanel />

      <section className="mx-auto max-w-[1200px] px-6 pb-6 pt-2">
        <MerchPurposePanel />
      </section>

      {error && (
        <section className="mx-auto max-w-[1200px] px-6 pb-6">
          <div className="rounded-[18px] border border-rose/40 bg-soft-cream px-6 py-4 text-sm text-body-muted-light">
            {error} You can still browse on{" "}
            {storefrontUrl && (
              <a href={storefrontUrl} className="text-rose-deep hover:text-wag-sage">
                Shopify
              </a>
            )}
            .
          </div>
        </section>
      )}

      {storeLive ? (
        <div className="mx-auto max-w-[1200px] px-6 pb-16">
          <section id="featured" className="scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow tracking-[0.22em]">Featured</p>
                <h2 className="heading mt-1.5 text-[36px]">Launch favorites</h2>
                <p className="dek mt-2 max-w-xl text-[15px]">{merchAnchorLine}</p>
              </div>
              <p className="text-xs font-light text-label-muted">
                {catalog.length} curated products · {shopifyStoreConfig.priceDisplayNote}
              </p>
            </div>
            <div className="mt-6">
              <ShopProductGrid products={featured} columns={3} />
            </div>
          </section>

          <section id="hoodies" className="mt-16 scroll-mt-24">
            <div className="text-center">
              <p className="eyebrow tracking-[0.22em]">Hoodies</p>
              <h2 className="heading mt-1.5 text-[38px]">Waco skyline fleece</h2>
              <p className="dek mx-auto mt-3 max-w-xl">
                Breed editions with the Waco skyline — pick color and size, add to
                bag, checkout on Shopify. Mixed bags welcome.
              </p>
            </div>
            {hoodies.length > 0 ? (
              <div className="mt-8">
                <ShopProductGrid products={hoodies} columns={3} />
              </div>
            ) : (
              <p className="body-light mt-8 text-center text-sm">
                Hoodie listings are loading — refresh shortly or visit Shopify directly.
              </p>
            )}
          </section>

          <ShopByBreedPicker catalog={catalog} />

          {designGroups.map((group) => (
            <section key={group.id} className="mt-16">
              <div className="max-w-2xl">
                <p className="eyebrow tracking-[0.22em]">Shop by design</p>
                <h2 className="heading mt-1.5 text-[32px]">{group.label}</h2>
                <p className="dek mt-2 text-[15px]">{group.description}</p>
              </div>
              <div className="mt-6">
                <ShopProductGrid products={group.products} columns={3} />
              </div>
            </section>
          ))}

          {accessories.length > 0 && (
            <section className="mt-16">
              <div className="max-w-2xl">
                <p className="eyebrow tracking-[0.22em]">Accessories</p>
                <h2 className="heading mt-1.5 text-[32px]">
                  Totes, mugs & more
                </h2>
                <p className="dek mt-2 text-[15px]">
                  Market runs, coffee breaks, bandanas, and sticker packs.
                </p>
              </div>
              <div className="mt-6">
                <ShopProductGrid products={accessories.slice(0, 12)} columns={3} />
              </div>
            </section>
          )}

          {curatedCollection.length > 0 && (
            <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={batch1CuratedCollectionMeta.localRoute}
                className="btn-pill btn-sage inline-flex items-center gap-2 px-7 py-3"
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {storefrontUrl && (
                <a
                  href={storefrontUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-light text-label-muted hover:text-wag-sage"
                >
                  Full Shopify catalog (operational)
                </a>
              )}
            </div>
          )}

          <aside className="mt-10 max-w-2xl rounded-[18px] border border-border bg-soft-cream p-5">
            <p className="text-sm font-light leading-relaxed text-body-muted-light">
              {shopifyStoreConfig.fulfillmentNote}
            </p>
            <p className="mt-2 text-xs font-light text-label-muted">
              {shopifyStoreConfig.externalCheckoutNote}
            </p>
          </aside>
        </div>
      ) : (
        <section className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="card-panel px-8 py-12 text-center">
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
                className="btn-pill btn-sage mt-6 inline-flex items-center gap-2 px-6 py-3"
              >
                Visit Shopify store
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-border bg-soft-cream py-12">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="eyebrow">Pet care first</p>
          <h2 className="heading mt-2 text-[28px]">
            Need boarding, scooping, or training?
          </h2>
          <p className="dek mx-auto mt-3 max-w-lg">
            Merch supports the mission — services are how we care for Waco dogs
            every day.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={ctas.bookService.href} variant="sage" size="lg">
              {ctas.bookService.label}
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-body-muted hover:text-rose"
            >
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </ShopExperience>
  );
}
