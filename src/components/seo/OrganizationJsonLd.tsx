import { JsonLd } from "@/components/seo/JsonLd";
import {
  getLiveSocialLinks,
  cityConfig,
  siteConfig,
} from "@/lib/site";

const ORGANIZATION_ID = `${cityConfig.url}/#organization`;
const WEBSITE_ID = `${cityConfig.url}/#website`;

/**
 * Site-wide Keep Waco Wagging Organization + WebSite. Platinum Scoops remains
 * the service provider on pet-care landings via Service JSON-LD — do not stamp
 * ProfessionalService onto every blog, shop, and legal page.
 */
export function OrganizationJsonLd() {
  const sameAs = getLiveSocialLinks()
    .filter(
      (link): link is typeof link & { href: string } =>
        Boolean(link.href?.startsWith("http")),
    )
    .map((link) => link.href);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: cityConfig.name,
    url: cityConfig.url,
    description: siteConfig.description,
    logo: `${cityConfig.url}${cityConfig.brand.logo.full.src}`,
    image: `${cityConfig.url}${cityConfig.brand.logo.full.src}`,
    telephone: cityConfig.sponsor.phoneNumeric,
    email: cityConfig.publicEmail,
    sameAs,
    areaServed: cityConfig.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: cityConfig.sponsor.name,
      url: cityConfig.sponsor.website,
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: cityConfig.name,
    url: cityConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
  };

  return <JsonLd data={[organization, website]} />;
}
