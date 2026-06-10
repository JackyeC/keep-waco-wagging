import type { SponsorProspect } from "@/lib/types";

export const sponsorTypes = [
  "Directory listing",
  "Featured listing",
  "Homepage ad slot",
  "Newsletter mention",
  "Sponsored local guide",
  "Business spotlight",
  "Event sponsor",
  "Product giveaway",
] as const;

/**
 * Internal prospect list. Do not publish contact details until verified.
 */
export const sponsorProspects: SponsorProspect[] = [
  {
    id: "street-dog-cafe",
    name: "Street Dog Cafe",
    category: "Coffee / rescue-minded cafe",
    publishContactInfo: false,
    notes: "Potential featured listing and community sponsor.",
  },
  {
    id: "southern-roots",
    name: "Southern Roots Brewing Co.",
    category: "Brewery / patio",
    publishContactInfo: false,
    notes: "Potential event partner or patio guide sponsor.",
  },
  {
    id: "milo",
    name: "Milo",
    category: "Restaurant / patio",
    publishContactInfo: false,
    notes: "Potential dog-friendly patio sponsor.",
  },
  {
    id: "local-vet",
    name: "Local vet clinic",
    category: "Veterinary care",
    publishContactInfo: false,
    notes: "Placeholder prospect until a clinic is verified.",
  },
  {
    id: "local-groomer",
    name: "Local groomer",
    category: "Grooming",
    publishContactInfo: false,
    notes: "Placeholder prospect until a groomer is verified.",
  },
  {
    id: "local-apartment",
    name: "Local apartment community",
    category: "Dog-friendly housing",
    publishContactInfo: false,
    notes: "Good fit for renters with dogs.",
  },
  {
    id: "local-boutique",
    name: "Local pet boutique",
    category: "Retail",
    publishContactInfo: false,
    notes: "Potential product giveaway partner.",
  },
  {
    id: "rescue-partner",
    name: "Local rescue or nonprofit partner",
    category: "Rescue / nonprofit",
    publishContactInfo: false,
    notes: "Community partner, not necessarily paid sponsor.",
  },
  {
    id: "pet-photographer",
    name: "Pet photographer",
    category: "Photography",
    publishContactInfo: false,
    notes: "Potential Pet of the Week or giveaway partner.",
  },
  {
    id: "dog-friendly-hotel",
    name: "Dog-friendly hotel",
    category: "Travel",
    publishContactInfo: false,
    notes: "Potential visitor guide sponsor.",
  },
];
