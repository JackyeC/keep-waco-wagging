import { brandLanguage, cityConfig } from "@/lib/site";

/**
 * Stable schema.org @id for Platinum Scoops as an Organization.
 * Used as the Service `provider` on pet-care pages.
 *
 * Intentionally NOT LocalBusiness — Google LocalBusiness rich results require
 * a physical PostalAddress. Do not invent or expose a private street address
 * here for SEO. GBP service-area settings are separate from website schema.
 */
export const PLATINUM_SCOOPS_ORG_ID = `${cityConfig.url}/#platinum-scoops-organization`;

/** Reusable Platinum Scoops Organization entity (no LocalBusiness address fields). */
export function platinumScoopsOrganization() {
  return {
    "@type": "Organization" as const,
    "@id": PLATINUM_SCOOPS_ORG_ID,
    name: cityConfig.sponsor.name,
    url: cityConfig.sponsor.website,
    telephone: cityConfig.sponsor.phoneNumeric,
    email: cityConfig.sponsor.email,
    description: brandLanguage.sponsorServices,
    areaServed: cityConfig.serviceAreas.map((name) => ({
      "@type": "City" as const,
      name,
    })),
  };
}

/** Compact provider reference for embedding on Service nodes. */
export function platinumScoopsProviderRef() {
  return {
    "@type": "Organization" as const,
    "@id": PLATINUM_SCOOPS_ORG_ID,
    name: cityConfig.sponsor.name,
    url: cityConfig.sponsor.website,
  };
}
