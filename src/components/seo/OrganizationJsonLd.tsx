import { JsonLd } from "@/components/seo/JsonLd";
import {
  getLiveSocialLinks,
  cityConfig,
  siteConfig,
} from "@/lib/site";

/**
 * Verified organization fields only — no licensing, insurance, founding date,
 * expanded service areas, or aggregate ratings.
 */
export function OrganizationJsonLd() {
  const sameAs = getLiveSocialLinks()
    .filter(
      (link): link is typeof link & { href: string } =>
        Boolean(link.href?.startsWith("http")),
    )
    .map((link) => link.href);

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: cityConfig.sponsor.name,
    alternateName: cityConfig.name,
    description: siteConfig.description,
    url: cityConfig.url,
    logo: `${cityConfig.url}${cityConfig.brand.logo.full.src}`,
    image: `${cityConfig.url}${cityConfig.brand.logo.full.src}`,
    telephone: cityConfig.sponsor.phoneNumeric,
    email: cityConfig.publicEmail,
    sameAs,
    areaServed: cityConfig.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: cityConfig.city,
      addressRegion: cityConfig.stateAbbr,
      addressCountry: "US",
    },
  };

  return <JsonLd data={data} />;
}
