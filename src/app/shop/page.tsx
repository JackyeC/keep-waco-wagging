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
  pickFeaturedProducts,
} from "@/data/merchCuration";
import {
  getShopifyCollectionUrl,
  getShopifyStorefrontUrl,
  shopifyStoreConfig,
} from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

export const revalidate = 600;

const pageTitle = "Keep Waco Wagging Merch | Waco Dog Apparel";
const pageDescription =
  "Shop Dog Mom & Dog Dad tees, breed editions, Waco skyline hoodies, totes, and mugs. Cute shirts. Local impact. Every order helps Waco dogs through Pet Circle.";

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
  const featured = pickFeaturedProducts(catalog);
  const hoodies = catalog.filter((p) => featuredHoodieHandles.includes(p.slug));
  const designGroups = groupByDesign(catalog);
  const accessories = getAccessoryProducts(catalog);
  const storefrontUrl = getShopifyStorefrontUrl();
  const collectionUrl = getShopifyCollectionUrl();

  return (
    <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
      <ShopBagBar />
      <HoodieShopHero />
      <HoodieImpactPanel />

      <section id="hoodies" className="mx-auto max-w-[1200px] px-6 pb-10">
        <div className="text-center">
          <p className="eyebrow tracking-[0.22em]">Shop hoodies</p>
          <h2 className="heading mt-1.5 text-[38px]">
            Waco skyline editions
          </h2>
          <p className="dek mx-auto mt-3 max-w-xl">
            Pick color and size, add to bag, and checkout on Shopify with your
            selections. Mixed bags welcome.
          </p>
        </div>
        {storeLive && hoodies.length > 0 ? (
          <div className="mt-8">
            <ShopProductGrid products={hoodies} columns={3} />
          </div>
        ) : (
          <p className="body-light mt-8 text-center text-sm">
            Hoodie listings are loading — refresh shortly or visit Shopify directly.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-6 pt-4">
        <p className="eyebrow tracking-[0.22em]">More merch</p>
        <h2 className="heading mt-2 max-w-3xl text-[36px]">
          Tees, totes, mugs &{" "}
          <span className="font-script text-rose">more</span>
        </h2>
        <p className="dek mt-4 max-w-2xl text-[17px]">{merchAnchorLine}</p>
        <p className="body-light mt-3 max-w-2xl">
          {brandLanguage.brandByLine}. Add to bag when options are shown — otherwise
          open the product on Shopify.{" "}
          <Link href={ctas.gearGuide.href} className="text-rose-deep hover:text-wag-sage">
            Gear Guide
          </Link>{" "}
          for affiliate dog gear we recommend separately.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-10">
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
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow tracking-[0.22em]">Featured</p>
                <h2 className="heading mt-1.5 text-[36px]">Launch favorites</h2>
              </div>
              <p className="text-xs font-light text-label-muted">
                {catalog.length} curated products · {shopifyStoreConfig.priceDisplayNote}
              </p>
            </div>
            <div className="mt-6">
              <ShopProductGrid products={featured} columns={3} />
            </div>
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

          {collectionUrl && (
            <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={collectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-sage inline-flex items-center gap-2 px-7 py-3"
              >
                Open full catalog on Shopify
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              {storefrontUrl && (
                <a
                  href={storefrontUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:text-wag-sage"
                >
                  Shopify store home
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
