import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { PublisherNote } from "@/components/PublisherNote";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  getFeaturedMerchProducts,
  getShopifyStorefrontUrl,
  hasMerchStorefrontUrl,
  isMerchStoreLive,
  shopifyStoreConfig,
} from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

const pageTitle = "Keep Waco Wagging Merch | Waco Dog Apparel";
const pageDescription =
  "Keep Waco Wagging shirts and merch for Waco dog people. Made to order through our Shopify store — wear and share your love for Waco dogs.";

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

export default function ShopPage() {
  const featured = getFeaturedMerchProducts(5);
  const storeLive = isMerchStoreLive();
  const storefrontUrl = getShopifyStorefrontUrl();

  return (
    <>
      <section className="border-b border-clay bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <PublisherNote />
          <p className="eyebrow mt-6">Merch</p>
          <h1 className="display mt-3 max-w-3xl text-bark">Keep Waco Wagging Merch</h1>
          <p className="dek mt-5 max-w-2xl text-base">
            Wear and share your love for Waco dogs. Our shirts are made to order
            for dog parents, camp families, and anyone who keeps this town wagging.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bark-soft">
            {brandLanguage.brandByLine}. Pet care and booking stay on this site;
            shirt checkout happens on our Shopify store when products are live.{" "}
            <Link href={ctas.gearGuide.href} className="font-medium text-sage-700 hover:underline">
              Browse the Gear Guide
            </Link>{" "}
            for Amazon affiliate dog gear we use and recommend.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Featured shirts"
          title={storeLive ? "Shop the collection" : "Merch coming soon"}
          description={
            storeLive
              ? "Each shirt opens our Shopify store for sizes, checkout, and shipping."
              : "We are preparing an initial collection of Keep Waco Wagging shirts. Nothing on this page can be purchased until Shopify product images and links are connected."
          }
        />

        {storeLive ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <MerchProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-sm border border-clay bg-cream px-6 py-12 text-center sm:px-12">
            <Image
              src={cityConfig.brand.logo.full.src}
              alt={cityConfig.brand.logo.full.alt}
              width={240}
              height={240}
              className="h-auto w-40 sm:w-48"
            />
            <p className="mt-8 font-display text-2xl text-bark">Merch coming soon</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-bark-soft">
              Our Shopify store is being set up. Shirt designs include Keep Waco Wagging,
              Waco Dog Mom, Waco Dog Dad, My Dog Goes to Camp, and Scoop Happens. We will
              publish each product here only after images, prices, and Shopify URLs are
              confirmed.
            </p>
            {hasMerchStorefrontUrl() && storefrontUrl && (
              <a
                href={storefrontUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm border border-clay bg-white px-5 py-2.5 text-sm font-semibold tracking-wide text-bark transition-colors hover:bg-sand/60"
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
