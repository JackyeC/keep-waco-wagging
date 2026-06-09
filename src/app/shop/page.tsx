import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductCard } from "@/components/ProductCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { RoverCTA } from "@/components/RoverCTA";
import { getShopProducts } from "@/data/shop";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dog Gear We Love — Shop",
  description:
    "Curated dog gear for Waco pet parents — leashes, travel essentials, training tools, and backyard favorites. Amazon affiliate picks from the Keep Waco Wagging team.",
};

export default function ShopPage() {
  const products = getShopProducts();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Dog gear we actually use"
        description="Hand-picked essentials for walks, patios, travel, and life with dogs in Waco. Purchases through our links support Keep Waco Wagging at no extra cost to you."
        tone="sage"
      />

      <Section tone="paper">
        <AffiliateDisclosure className="mx-auto max-w-3xl text-center" />
      </Section>

      <Section tone="sand">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <SectionHeading
              eyebrow="Curated picks"
              title="Trusted gear for Waco dog life"
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <AdSlot placement="shop" />
            <RoverCTA />
          </aside>
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-bark-soft">
            Have a product you think {siteConfig.name} dog parents would love?
            Reach out — we&apos;re always updating this list with gear we trust in
            real Waco weather.
          </p>
          <AffiliateDisclosure className="mt-4" />
        </div>
      </Section>
    </>
  );
}
