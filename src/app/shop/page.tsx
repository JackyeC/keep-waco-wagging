import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { getProductRecommendations } from "@/data/products";
import { monetization } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dog Products We Recommend | Keep Waco Wagging",
  description:
    "Practical dog product recommendations for Waco pet parents, including crates, slow feeders, puzzle toys, cleaning supplies, and everyday dog care basics.",
};

export default function ShopPage() {
  const products = getProductRecommendations();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Dog products we recommend"
        description="Practical dog-care basics for Waco pet parents. Product links are placeholders until final Amazon URLs are added."
        tone="sage"
      />
      <Section tone="paper">
        <div className="mx-auto max-w-3xl rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
          <AffiliateDisclosure />
          <p className="mt-2 text-sm leading-relaxed text-bark-soft">
            {monetization.productDisclosure}
          </p>
        </div>
      </Section>
      <Section tone="sand">
        <SectionHeading
          eyebrow="Practical picks"
          title="Helpful gear for calmer dog routines"
          description="Crates, enrichment tools, cleaning basics, walking gear, and washable items that fit everyday dog life."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductRecommendationCard key={product.id} product={product} />
          ))}
          <AdSlot placement="shop" />
        </div>
      </Section>
    </>
  );
}
