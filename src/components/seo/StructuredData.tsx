import { JsonLd } from "@/components/seo/JsonLd";
import type { ServicePageConfig } from "@/data/servicePages";
import { cityConfig } from "@/lib/site";

export type ServiceFaqItem = { question: string; answer: string };

function servicePath(slug: string): string {
  if (slug === "weddings-events") return "/pet-care/weddings-events";
  return `/${slug}`;
}

function serviceName(config: ServicePageConfig): string {
  if (config.slug === "platinum-scoops") return "Platinum Scoops pet waste removal";
  if (config.slug === "pet-care") return "Home-based dog daycare and boarding";
  if (config.slug === "training") return "Lifestyle dog training";
  if (config.slug === "weddings-events") return "Dog of Honor wedding pet care";
  if (config.slug === "summer-daycare") return cityConfig.name + " summer dog camp";
  return config.hero.eyebrow;
}

export function ServicePageJsonLd({
  config,
  faqs,
}: {
  config: ServicePageConfig;
  faqs?: ServiceFaqItem[];
}) {
  const path = servicePath(config.slug);
  const url = `${cityConfig.url}${path}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: cityConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.seo.title.split("|")[0]?.trim() ?? config.hero.eyebrow,
        item: url,
      },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName(config),
    description: config.seo.description,
    url,
    provider: {
      "@type": "ProfessionalService",
      name: cityConfig.sponsor.name,
      url: cityConfig.url,
    },
    areaServed: cityConfig.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
  };

  const blocks: Record<string, unknown>[] = [breadcrumb, service];

  if (faqs && faqs.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return <JsonLd data={blocks} />;
}

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image: string;
}) {
  const url = `${cityConfig.url}${path}`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: {
          "@type": "Organization",
          name: cityConfig.name,
        },
        publisher: {
          "@type": "Organization",
          name: cityConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${cityConfig.url}${cityConfig.brand.logo.full.src}`,
          },
        },
        mainEntityOfPage: url,
        image: image.startsWith("http") ? image : `${cityConfig.url}${image}`,
      }}
    />
  );
}

function placeSchemaType(category: string): string {
  const normalized = category.toLowerCase();
  if (normalized.includes("park") || normalized.includes("trail")) return "Park";
  if (
    normalized.includes("patio") ||
    normalized.includes("coffee") ||
    normalized.includes("brewery") ||
    normalized.includes("bar") ||
    normalized.includes("restaurant")
  ) {
    return "FoodEstablishment";
  }
  if (normalized.includes("boutique") || normalized.includes("shop")) {
    return "Store";
  }
  return "LocalBusiness";
}

/** LocalBusiness / Place JSON-LD for dog-friendly directory listings. */
export function DirectoryListingJsonLd({
  name,
  description,
  path,
  category,
  address,
  phone,
  website,
}: {
  name: string;
  description: string;
  path: string;
  category: string;
  address?: string;
  phone?: string;
  website?: string;
}) {
  const url = `${cityConfig.url}${path}`;
  const place: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": placeSchemaType(category),
    name,
    description,
    url,
    additionalType: "https://schema.org/Place",
  };

  if (address) {
    place.address = {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Waco",
      addressRegion: "TX",
      addressCountry: "US",
    };
  }
  if (phone) place.telephone = phone;
  if (website) place.sameAs = website;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: cityConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dog-Friendly Waco",
        item: `${cityConfig.url}/dog-friendly-waco`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: url,
      },
    ],
  };

  return <JsonLd data={[breadcrumb, place]} />;
}
