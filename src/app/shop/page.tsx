import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ShopProductCard } from "@/components/ShopProductCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { Section } from "@/components/ui/Section";
import { getProductRecommendations } from "@/data/products";
import { monetization, siteConfig } from "@/lib/site";
import type { ProductRecommendation } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dog Gear We Actually Use | Keep Waco Wagging",
  description:
    "Practical dog product recommendations for Waco pet parents, including crates, slow feeders, puzzle toys, cleaning supplies, and everyday dog care basics.",
};

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function groupByCategory(products: ProductRecommendation[]) {
  const categories: string[] = [];
  const byCategory = new Map<string, ProductRecommendation[]>();

  for (const product of products) {
    if (!byCategory.has(product.category)) {
      byCategory.set(product.category, []);
      categories.push(product.category);
    }
    byCategory.get(product.category)!.push(product);
  }

  return { categories, byCategory };
}

export default function ShopPage() {
  const products = getProductRecommendations();
  const { categories, byCategory } = groupByCategory(products);

  return (
    <>
      <PageHeader
        eyebrow="The Edit"
        title="Dog gear we actually use"
        description="An editor's picks page for Central Texas dog parents — vetted in real Waco yards and linked to Amazon. Part of the Keep Waco Wagging guide."
        tone="cream"
        showPublisher
      />

      <Section tone="paper" className="!py-10">
        <div className="max-w-3xl border-l-2 border-gold-400 pl-5">
          <p className="lede">
            We only list products we reach for in our own work — boarding, scooping,
            and daily dog life in Waco heat.
          </p>
          <div className="mt-5 border-t border-clay pt-4">
            <AffiliateDisclosure />
            <p className="caption mt-2">{monetization.productDisclosure}</p>
          </div>
        </div>
      </Section>

      {/* Category index — editorial table of contents */}
      <Section tone="sand" className="!py-10">
        <p className="eyebrow">Contents</p>
        <h2 className="headline-tertiary mt-2">Shop by category</h2>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Shop categories">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${slugifyCategory(category)}`}
              className="editorial-link text-xs"
            >
              {category}
            </a>
          ))}
        </nav>
      </Section>

      {/* Sticky category bar */}
      <div className="sticky top-16 z-20 border-b border-clay bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${slugifyCategory(category)}`}
              className="shrink-0 border border-transparent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-bark-soft transition hover:border-clay hover:text-bark"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      <Section tone="paper">
        {categories.map((category, index) => {
          const items = byCategory.get(category)!;
          return (
            <div
              key={category}
              id={slugifyCategory(category)}
              className={index === 0 ? "" : "mt-16 scroll-mt-32 md:mt-20"}
            >
              <header className="flex items-baseline justify-between gap-4 border-b border-clay pb-3">
                <div>
                  <p className="eyebrow eyebrow-brass">{siteConfig.name}</p>
                  <h2 className="headline-tertiary mt-1">{category}</h2>
                </div>
                <span className="caption">
                  {items.length} {items.length === 1 ? "pick" : "picks"}
                </span>
              </header>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 border-t border-clay pt-12 md:mt-20">
          <AdSlot placement="shop" />
        </div>
      </Section>
    </>
  );
}
