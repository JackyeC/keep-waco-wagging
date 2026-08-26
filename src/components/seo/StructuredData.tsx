import { JsonLd } from "@/components/seo/JsonLd";
import type { ServicePageConfig } from "@/data/servicePages";
import {
  platinumScoopsOrganization,
  platinumScoopsProviderRef,
} from "@/lib/platinumScoopsSchema";
import { cityConfig } from "@/lib/site";

export type ServiceFaqItem = { question: string; answer: string };

function servicePath(slug: string): string {
  if (slug === "weddings-events" || slug === "pet-care/weddings-events") {
    return "/pet-care/weddings-events";
  }
  if (slug.startsWith("/")) return slug;
  return `/${slug}`;
}

function serviceName(config: ServicePageConfig): string {
  if (config.slug === "platinum-scoops") return "Platinum Scoops pet waste removal";
  if (config.slug === "pet-care") return "Home-based dog daycare and boarding";
  if (config.slug === "dog-boarding-waco-tx") return "Home-based dog boarding in Waco, TX";
  if (config.slug === "dog-daycare-waco-tx") return "Home-based dog daycare in Waco, TX";
  if (config.slug === "training") return "Lifestyle dog training";
  if (config.slug === "weddings-events" || config.slug === "pet-care/weddings-events") {
    return "Dog of Honor wedding pet care";
  }
  if (config.slug === "summer-daycare") return cityConfig.name + " summer dog camp";
  return config.hero.eyebrow;
}

export function ServicePageJsonLd({
  config,
  faqs,
  offer,
}: {
  config: ServicePageConfig;
  faqs?: ServiceFaqItem[];
  offer?: {
    name: string;
    price: string;
    priceCurrency?: string;
    description?: string;
  };
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
        name: "Pet Care",
        item: `${cityConfig.url}/pet-care`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.seo.title.split("|")[0]?.trim() ?? config.hero.eyebrow,
        item: url,
      },
    ],
  };

  const isHub =
    config.slug === "pet-care" ||
    config.slug === "platinum-scoops" ||
    config.slug === "training" ||
    config.slug === "summer-daycare" ||
    config.slug === "weddings-events" ||
    config.slug === "pet-care/weddings-events";

  const breadcrumbFinal = isHub
    ? {
        ...breadcrumb,
        itemListElement: [
          breadcrumb.itemListElement[0],
          {
            "@type": "ListItem",
            position: 2,
            name: config.seo.title.split("|")[0]?.trim() ?? config.hero.eyebrow,
            item: url,
          },
        ],
      }
    : breadcrumb;

  const provider = platinumScoopsOrganization();

  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName(config),
    description: config.seo.description,
    url,
    provider: platinumScoopsProviderRef(),
    areaServed: cityConfig.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
  };

  if (offer?.price) {
    service.offers = {
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency ?? "USD",
      description: offer.description ?? config.seo.description,
      url,
      availability: "https://schema.org/InStock",
    };
  }

  const blocks: Record<string, unknown>[] = [
    breadcrumbFinal,
    { "@context": "https://schema.org", ...provider },
    service,
  ];

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

/**
 * FAQPage JSON-LD. Answer-first Q&A is the format both Google rich results
 * and generative answer engines (AI Overviews, ChatGPT, Perplexity) extract
 * and cite, so keep each answer factual and self-contained.
 */
export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}

type DirectoryIndexItem = { name: string; slug: string };

/**
 * CollectionPage + ItemList JSON-LD for the dog-friendly Waco directory index.
 * Signals to search engines and AI answer engines that this page is the
 * curated, authoritative list of dog-friendly / pet-friendly places in Waco,
 * with each entry linking to its detail page.
 */
export function DirectoryIndexJsonLd({
  listings,
  description,
}: {
  listings: DirectoryIndexItem[];
  description: string;
}) {
  const url = `${cityConfig.url}/dog-friendly-waco`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: cityConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dog-Friendly Waco",
        item: url,
      },
    ],
  };

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dog-Friendly Waco Directory",
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: cityConfig.name,
      url: cityConfig.url,
    },
    about: {
      "@type": "Thing",
      name: "Dog-friendly and pet-friendly places in Waco, Texas",
    },
    publisher: {
      "@type": "Organization",
      name: cityConfig.name,
      url: cityConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Dog-friendly places in Waco",
      numberOfItems: listings.length,
      itemListElement: listings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: listing.name,
        url: `${cityConfig.url}/dog-friendly-waco/${listing.slug}`,
      })),
    },
  };

  return <JsonLd data={[breadcrumb, collection]} />;
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
