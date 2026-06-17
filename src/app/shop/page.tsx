import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProductRecommendations } from "@/data/products";
import { sitePhotos } from "@/data/sitePhotos";
import { monetization } from "@/lib/site";
import type { ProductRecommendation } from "@/lib/types";

export const metadata: Metadata = {
  title: "Things We Actually Use — Dog Gear We Recommend | Keep Waco Wagging",
  description:
    "Practical dog-care gear vetted by 30 years of Central Texas dog people — slow feeders, cooling mats, paw balm, GPS trackers, and enrichment toys.",
};

/**
 * Local in-use photography overrides for select products. Where present, the
 * real Waco product-detail photo wins over the Amazon CDN image.
 */
const localPhotoByProduct: Record<string, { src: string; alt: string }> = {
  "slow-feeders": sitePhotos.productDetail1,
  "cooling-mat": sitePhotos.productDetail2,
  "paw-wax": sitePhotos.productDetail3,
  "gps-tracker": sitePhotos.productDetail4,
  "puzzle-feeders": sitePhotos.productToy1,
  "kong-classic": sitePhotos.productToy2,
  "lick-mats": sitePhotos.productToy3,
};

/** Editorial product sections — map real category data into three dividers. */
const sectionPlan: { no: string; title: string; categories: string[] }[] = [
  { no: "No. 01", title: "Summer essentials", categories: ["Summer essentials"] },
  {
    no: "No. 02",
    title: "Calm & enrichment",
    categories: ["Enrichment", "Crates", "Home", "Walks", "Safety"],
  },
  { no: "No. 03", title: "Cleanup & yard", categories: ["Cleaning"] },
];

function ProductCard({
  product,
  index,
}: {
  product: ProductRecommendation;
  index: number;
}) {
  const local = localPhotoByProduct[product.id];
  const imageSrc = local?.src ?? product.imageUrl;
  const imageAlt = local?.alt ?? product.title;
  const no = `No. ${String(index + 1).padStart(2, "0")}`;

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <hr className="hairline mt-5" />
      <p className="smallcaps mt-4 text-gold-500">{no}</p>
      <h3 className="mt-2 font-display text-xl leading-snug text-bark">
        {product.title}
      </h3>
      <p className="caption mt-2 flex-1">{product.description}</p>
      {product.amazonUrl ? (
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="smallcaps mt-4 inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600"
        >
          Shop on Amazon →
        </a>
      ) : (
        <p className="caption mt-4 text-bark-faint">Link coming soon</p>
      )}
    </article>
  );
}

export default function ShopPage() {
  const products = getProductRecommendations();
  const byCategory = new Map<string, ProductRecommendation[]>();
  for (const product of products) {
    if (!byCategory.has(product.category)) byCategory.set(product.category, []);
    byCategory.get(product.category)!.push(product);
  }

  return (
    <>
      {/* ── EDITORIAL HEADER ── tight, not a giant empty band */}
      <section className="bg-cream pt-16 md:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Shop — Affiliate</p>
          <h1 className="display mt-5 max-w-3xl">Things we actually use.</h1>
          <p className="dek mt-6 max-w-2xl">
            Practical dog-care gear we reach for every day in Central Texas —
            vetted, used, and recommended. No filler, no fads, no products we
            would not put in front of our own pack.
          </p>
          <p className="caption mt-4 max-w-2xl">
            *Amazon Associate — we earn from qualifying purchases.{" "}
            <Link href="#disclosure" className="underline underline-offset-2">
              Read full disclosure
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {sectionPlan.map((section, sIdx) => {
            const items = section.categories.flatMap(
              (cat) => byCategory.get(cat) ?? [],
            );
            if (items.length === 0) return null;
            return (
              <div key={section.title} className={sIdx === 0 ? "" : "mt-24 md:mt-32"}>
                <p className="eyebrow">{`${section.no} — ${section.title}`}</p>
                <h2 className="heading mt-3">{section.title}</h2>
                <hr className="hairline mt-6" />
                <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* ── SECTION DIVIDER — Platinum Scoops soft link ── */}
          <div className="mt-24 md:mt-32">
            <hr className="hairline" />
            <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="eyebrow">No. 04 — Cleanup & yard</p>
                <h2 className="heading mt-3">The yard, handled for you.</h2>
                <p className="dek mt-5">
                  Some cleanup you do not want to buy a gadget for — you want it
                  off your list entirely. That is what Platinum Scoops is for:
                  recurring yard cleanup so your yard stays usable all summer.
                </p>
                <a
                  href="https://platinumscoops.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="smallcaps mt-6 inline-flex items-center gap-1.5 text-gold-500 hover:text-gold-600"
                >
                  See Platinum Scoops service →
                </a>
              </div>
              <div className="md:col-span-6">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand">
                  <Image
                    src={sitePhotos.platinumScoopsSprayer.src}
                    alt={sitePhotos.platinumScoopsSprayer.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── END DISCLOSURE ── quiet section */}
      <section id="disclosure" className="bg-sand py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <hr className="hairline" />
          <p className="eyebrow mt-6">Disclosure</p>
          <p className="caption mt-4">{monetization.affiliateDisclosure}</p>
          <p className="caption mt-3">{monetization.productDisclosure}</p>
          <p className="caption mt-3">
            <Link href="/affiliate-disclosure" className="underline underline-offset-2">
              Read the full affiliate disclosure
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
