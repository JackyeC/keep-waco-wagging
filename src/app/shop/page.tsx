import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { getProductRecommendations } from "@/data/products";
import { shopExploreLinks } from "@/data/shopExplore";
import { sitePhotos } from "@/data/sitePhotos";
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
        description="Practical dog-care basics for Waco pet parents. Purchases through our Amazon links support Keep Waco Wagging at no extra cost to you."
        tone="sage"
        showSponsor
        image={sitePhotos.training}
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

        <div className="mt-14 rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 sm:p-8">
          <SectionHeading
            eyebrow="More to explore"
            title="Where these products fit in Waco dog life"
            description="Gear we recommend connects to the care, camp themes, and community you’ll find across Keep Waco Wagging."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopExploreLinks.map((link) => (
              <li key={link.href}>
                <ExploreLink {...link} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

function ExploreLink({
  href,
  label,
  description,
  external = false,
}: {
  href: string;
  label: string;
  description: string;
  external?: boolean;
}) {
  const className =
    "group flex items-start gap-3 rounded-2xl bg-sand/60 p-4 ring-1 ring-inset ring-clay/50 transition-colors hover:bg-sage-50 hover:ring-sage-200";

  const content = (
    <>
      <span className="flex-1">
        <span className="font-semibold text-bark group-hover:text-sage-700">{label}</span>
        <span className="mt-1 block text-sm text-bark-soft">{description}</span>
      </span>
      <ArrowRight
        className="mt-0.5 h-4 w-4 shrink-0 text-bark-faint transition-transform group-hover:translate-x-0.5 group-hover:text-sage-600"
        aria-hidden="true"
      />
    </>
  );

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
