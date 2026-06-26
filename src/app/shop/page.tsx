import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Heart, PawPrint } from "lucide-react";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { PlannedPetAccessoriesPanel } from "@/components/merch/PlannedPetAccessoriesPanel";
import { PublisherNote } from "@/components/PublisherNote";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  getFeaturedMerchProducts,
  getShopifyCollectionUrl,
  getShopifyStorefrontUrl,
  shopifyStoreConfig,
} from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyCatalog, groupMerchByCategory } from "@/lib/shopifyCatalog";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

const pageTitle = "Keep Waco Wagging Merch | Waco Dog Apparel";
const pageDescription =
  "Shop Keep Waco Wagging hoodies, pet bandanas, bowls, totes, mugs, and stickers for Waco dog people. Made to order through our Shopify store.";

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

export default async function ShopPage() {
  const catalog = await fetchShopifyCatalog();
  const fallbackFeatured = getFeaturedMerchProducts(5);
  const products = catalog.length > 0 ? catalog : fallbackFeatured;
  const categoryGroups =
    catalog.length > 0
      ? groupMerchByCategory(catalog)
      : [{ category: "other" as const, label: "Featured", description: "", products }];
  const storeLive = products.length > 0;
  const storefrontUrl = getShopifyStorefrontUrl();
  const collectionUrl = getShopifyCollectionUrl();

  return (
    <>
      <section className="border-b border-clay bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <PublisherNote />
          <p className="eyebrow mt-6">Shop</p>
          <h1 className="display mt-3 max-w-3xl text-bark">Keep Waco Wagging Merch</h1>
          <p className="dek mt-5 max-w-2xl text-base">
            Shop hoodies, pet accessories, totes, mugs, and stickers made for Waco dog people.
            Browse here on Keep Waco Wagging — checkout opens on our Shopify store for
            sizes, payment, and shipping.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bark-soft">
            {brandLanguage.brandByLine}.{" "}
            <Link href={ctas.gearGuide.href} className="font-medium text-sage-700 hover:underline">
              Browse the Gear Guide
            </Link>{" "}
            for Amazon affiliate dog gear we use and recommend.
          </p>
        </div>
      </section>

      <section className="border-b border-clay bg-sage-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="editorial-panel mx-auto max-w-3xl p-8 sm:p-10">
            <div className="flex items-center gap-3 text-sage-600">
              <PawPrint className="h-5 w-5 shrink-0" aria-hidden="true" />
              <Heart className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <span className="eyebrow !mb-0 text-sage-600">Purpose-driven merch</span>
            </div>
            <h2 className="headline-secondary mt-5 text-bark">
              Wear Your Love. Help Waco Dogs.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-bark-soft sm:text-base">
              <p>
                Keep Waco Wagging is more than cute dog apparel. We volunteer with Pet
                Circle Regional Animal Center and are committed to helping local dogs get
                the care, enrichment, and second chances they deserve.
              </p>
              <p>
                Every purchase helps us continue supporting dogs in need right here in
                the Waco community. Wear your love for dogs with purpose-driven apparel
                that gives back.
              </p>
            </div>
            <p className="mt-6 border-t border-clay pt-5 font-display text-lg text-bark sm:text-xl">
              Cute shirts. Local impact. More tails wagging.
            </p>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Keep Waco Wagging shop"
          title={storeLive ? "Shop the collection" : "Merch coming soon"}
          description={
            storeLive
              ? `${products.length} products — pet accessories, apparel, totes, mugs, and stickers. Tap a product to choose options and checkout on Shopify.`
              : "Our Shopify catalog is loading. If this message persists, visit our store directly."
          }
        />

        {storeLive ? (
          <>
            {categoryGroups.map((group) => (
              <div key={group.category} className="mt-10 first:mt-10">
                <div className="max-w-3xl">
                  <h3 className="font-display text-2xl text-bark">{group.label}</h3>
                  {group.description && (
                    <p className="mt-2 text-sm leading-relaxed text-bark-soft">
                      {group.description}
                    </p>
                  )}
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((product) => (
                    <MerchProductCard key={product.id} product={product} />
                  ))}
                </div>
                {group.category === "pet_accessories" && <PlannedPetAccessoriesPanel />}
              </div>
            ))}
            {collectionUrl && (
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={collectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-bark px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-bark-soft"
                >
                  Open full catalog on Shopify
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                {storefrontUrl && (
                  <a
                    href={storefrontUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-sage-700 hover:underline"
                  >
                    Shopify store home
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-sm border border-clay bg-cream px-6 py-12 text-center sm:px-12">
            <p className="font-display text-2xl text-bark">Merch coming soon</p>
            {storefrontUrl && (
              <a
                href={storefrontUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-sm border border-clay bg-white px-5 py-2.5 text-sm font-semibold tracking-wide text-bark transition-colors hover:bg-sand/60"
              >
                Visit Shopify store
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        <aside className="mt-10 max-w-3xl border-l-2 border-gold-400 pl-5">
          <p className="text-sm leading-relaxed text-bark-soft">
            {shopifyStoreConfig.fulfillmentNote}
          </p>
          {storeLive && (
            <p className="mt-3 text-xs leading-relaxed text-bark-faint">
              {shopifyStoreConfig.externalCheckoutNote}
            </p>
          )}
        </aside>
      </Section>

      <section className="border-y border-clay bg-sand/60 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-bark-soft sm:text-base">
            Every purchase helps Keep Waco Wagging support dogs in need through our
            volunteer work with Pet Circle Regional Animal Center.
          </p>
        </div>
      </section>

      <Section tone="sand">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Pet care first</p>
          <h2 className="headline-tertiary mt-3">Need boarding, scooping, or training?</h2>
          <p className="dek mt-4 text-base">
            Merch supports the brand — services are how we take care of Waco dogs
            every day.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button href={ctas.bookService.href} variant="sponsor" size="lg">
              {ctas.bookService.label}
            </Button>
            <Button href={ctas.gearGuide.href} variant="secondary" size="lg">
              {ctas.gearGuide.label}
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-bark-soft hover:text-bark"
            >
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
