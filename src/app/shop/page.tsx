import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ShopProductCard } from "@/components/ShopProductCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getProductRecommendations } from "@/data/products";
import { monetization, siteConfig } from "@/lib/site";
import type { ProductRecommendation } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dog Products We Recommend | Keep Waco Wagging",
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
        eyebrow={siteConfig.name}
        title="Dog gear we actually use"
        description="Practical picks for Central Texas dog parents — vetted in real Waco yards and linked to Amazon. Part of the Keep Waco Wagging guide, presented by Platinum Scoops."
        tone="cream"
      />

      <Section tone="paper" className="!py-8">
        <div className="rounded-card bg-white px-4 py-3 ring-1 ring-inset ring-clay/60 sm:px-5">
          <AffiliateDisclosure />
          <p className="mt-1 text-xs leading-relaxed text-bark-soft">
            {monetization.productDisclosure}
          </p>
        </div>
      </Section>

      {/* Category quick links */}
      <Section tone="sand" className="!py-10">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by category"
          description="Jump to the section you need."
        />
        <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
          {categories.map((category) => {
            const cover = byCategory.get(category)![0];
            return (
              <a
                key={category}
                href={`#${slugifyCategory(category)}`}
                className="group w-28 shrink-0 text-center sm:w-32"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-white p-3 ring-1 ring-inset ring-clay/60 transition group-hover:shadow-md group-hover:ring-sage-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover.imageUrl}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-2 text-xs font-medium leading-tight text-bark group-hover:text-sage-700">
                  {category}
                </p>
              </a>
            );
          })}
        </div>
      </Section>

      {/* Sticky category pills */}
      <div className="sticky top-16 z-20 border-b border-clay/50 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${slugifyCategory(category)}`}
              className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-bark ring-1 ring-inset ring-clay/70 transition hover:bg-sage-50 hover:ring-sage-200"
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
              <div className="flex items-end justify-between gap-4 border-b border-clay/60 pb-4">
                <h2 className="font-display text-2xl sm:text-3xl">{category}</h2>
                <span className="text-sm text-bark-faint">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((product) => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 md:mt-20">
          <AdSlot placement="shop" />
        </div>
      </Section>
    </>
  );
}
