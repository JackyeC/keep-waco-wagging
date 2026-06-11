import { cityConfig } from "@/lib/site";

export const platinumScoops = {
  name: "Platinum Scoops",
  website: "https://platinumscoops.com",
  bookingUrl: cityConfig.sponsor.bookingUrl,
  phoneDisplay: cityConfig.sponsor.phoneDisplay,
  phoneNumeric: cityConfig.sponsor.phoneNumeric,
  phoneHref: cityConfig.sponsor.phoneHref,
  email: cityConfig.sponsor.email,
  description:
    "Platinum Scoops is a Waco-based, family-run pet care and pet waste removal business founded by Jackye and Todd Clayton. We help local dog families keep their yards cleaner, fresher, and easier to enjoy through reliable scooping, odor support, and practical pet care services.",
  pricing:
    "Recurring scooping starts at $25/week, with the first cleanup included. No long-term commitment. Cancel anytime.",
  petCarePricing:
    "Boarding and daycare availability may vary. Visit our booking page for current availability and service details.",
  trustSignals: [
    "5.0 star rating",
    "35+ reviews",
    "Licensed & insured",
    "Platinum Fresh enzyme treatment included",
    "Same technician every visit",
    "Family-run Waco business",
  ],
  yardServices: [
    "Weekly dog waste removal",
    "Every-other-week scooping",
    "One-time yard cleanups",
    "Deep clean yard resets",
    "Yard odor support",
    "Platinum Fresh enzyme treatment",
    "Commercial pet waste cleanup",
    "Residential pet waste cleanup",
  ],
  petCareServices: [
    "Boarding",
    "Doggy daycare",
    "Drop-in visits",
    "Dog walking",
    "Lifestyle dog support",
    "Household manners support",
    "Structured rest and enrichment",
  ],
  serviceAreas: cityConfig.serviceAreas,
} as const;
