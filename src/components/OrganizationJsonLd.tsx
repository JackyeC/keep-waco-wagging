import { cityConfig } from "@/lib/site";

/**
 * Verified organization fields only — no licensing, insurance, founding date,
 * expanded service areas, or aggregate ratings.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: cityConfig.sponsor.name,
    alternateName: cityConfig.name,
    description:
      "Keep Waco Wagging is the community and pet-care home of Platinum Scoops — family-run poop scooping, boarding, daycare, training, and event dog care in Waco, Texas.",
    url: cityConfig.url,
    telephone: cityConfig.sponsor.phoneNumeric,
    email: cityConfig.publicEmail,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
