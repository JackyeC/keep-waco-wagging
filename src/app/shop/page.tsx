import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { getProductRecommendations } from "@/data/products";
import { monetization } from "@/lib/site";
import type { ProductRecommendation } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dog Products We Recommend | Keep Waco Wagging",
  description:
    "Practical dog product recommendations for Waco pet parents, including crates, slow feeders, puzzle toys, cleaning supplies, and everyday dog care basics.",
};

export default function ShopPage() {
  const products = getProductRecommendations();

  // Group by category, preserving first-seen order.
  const categories: string[] = [];
  const byCategory = new Map<string, ProductRecommendation[]>();
  for (const product of products) {
    if (!byCategory.has(product.category)) {
      byCategory.set(product.category, []);
      categories.push(product.category);
    }
    byCategory.get(product.category)!.push(product);
  }

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Things we actually use"
        description="Practical dog-care gear we reach for every day in Central Texas — vetted, used, and recommended. No filler, no fads."
        tone="sand"
      />

      {/* Disclosure */}
      <section className="bg-cream pt-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <hr className="rule" />
          <div className="mt-6 space-y-3">
            <AffiliateDisclosure />
            <p className="text-sm leading-relaxed text-bark-soft">
              {monetization.productDisclosure}
            </p>
          </div>
        </div>
      </section>

      {/* Category sections */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {categories.map((category, index) => {
            const items = byCategory.get(category)!;
            return (
              <div
                key={category}
                className={index === 0 ? "" : "mt-24 md:mt-32"}
              >
                <div className="max-w-2xl">
                  <p className="eyebrow">{`No. ${String(index + 1).padStart(2, "0")}`}</p>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl">
                    {category}
                  </h2>
                </div>
                <hr className="rule mt-8" />
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                  {items.map((product) => (
                    <ProductRecommendationCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-24 md:mt-32">
            <AdSlot placement="shop" />
          </div>
        </div>
      </section>
    </>
  );
}
