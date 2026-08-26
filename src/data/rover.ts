import { cityConfig } from "@/lib/site";

/**
 * Current Rover service listing rates — single source of truth for public price tables.
 * Final pricing, availability, extended-care charges, and booking terms are confirmed on Rover.
 */
export const roverPrices = {
  boarding: {
    /** Verified public Rover starting rate */
    standard: "$47 per night",
    holiday: "$40 per night",
    additionalDog: "+$20 per dog, per night",
    puppy: "$50 per night",
    additionalCat: "+$21 per cat, per night",
    extendedStay7Plus: "$35 per night",
    pickupDropoffRoundTrip: "+$25 per round trip",
  },
  dropIn: {
    standard: "$13 per visit",
    sixtyMinute: "+$8 per visit",
    holiday: "$17 per visit",
    additionalDog: "+$8 per dog, per visit",
    puppy: "$15 per visit",
  },
  daycare: {
    /** Verified public Rover starting rate */
    standard: "$37 per day",
    holiday: "$36 per day",
    additionalDog: "+$24 per dog, per day",
    puppy: "$33 per day",
    bathingGrooming: "+$15 each",
    pickupDropoffPerDay: "$25 per day",
  },
  walking: {
    standard: "$15 per walk",
    sixtyMinute: "+$9 per walk",
    holiday: "$19 per walk",
    additionalDog: "+$9 per dog, per walk",
    puppy: "$17 per walk",
  },
} as const;

/** Public-facing starting-rate lines for landing pages (Rover-labeled). */
export const roverPublicStartingRates = {
  boarding: "From $47/night on Rover",
  daycare: "From $37/day on Rover",
} as const;

export type RoverRateLine = {
  label: string;
  price: string;
};

export type RoverRateCategory = {
  title: string;
  lines: readonly RoverRateLine[];
};

export const roverRateCategories: readonly RoverRateCategory[] = [
  {
    title: "Boarding in the sitter's home",
    lines: [
      { label: "Boarding", price: roverPrices.boarding.standard },
      { label: "Holiday rate", price: roverPrices.boarding.holiday },
      { label: "Additional dog", price: roverPrices.boarding.additionalDog },
      { label: "Puppy rate", price: roverPrices.boarding.puppy },
      { label: "Additional cat", price: roverPrices.boarding.additionalCat },
      { label: "Stays of 7 nights or more", price: roverPrices.boarding.extendedStay7Plus },
      { label: "Sitter pickup and drop-off", price: roverPrices.boarding.pickupDropoffRoundTrip },
    ],
  },
  {
    title: "Drop-in visits",
    lines: [
      { label: "Standard visit", price: roverPrices.dropIn.standard },
      { label: "60-minute visit", price: roverPrices.dropIn.sixtyMinute },
      { label: "Holiday rate", price: roverPrices.dropIn.holiday },
      { label: "Additional dog", price: roverPrices.dropIn.additionalDog },
      { label: "Puppy rate", price: roverPrices.dropIn.puppy },
    ],
  },
  {
    title: "Doggy day care",
    lines: [
      { label: "Standard daycare", price: roverPrices.daycare.standard },
      { label: "Holiday rate", price: roverPrices.daycare.holiday },
      { label: "Additional dog", price: roverPrices.daycare.additionalDog },
      { label: "Puppy rate", price: roverPrices.daycare.puppy },
      { label: "Bathing or grooming add-on", price: roverPrices.daycare.bathingGrooming },
      { label: "Daily sitter pickup or drop-off", price: roverPrices.daycare.pickupDropoffPerDay },
    ],
  },
  {
    title: "Dog walking",
    lines: [
      { label: "Standard walk", price: roverPrices.walking.standard },
      { label: "60-minute walk", price: roverPrices.walking.sixtyMinute },
      { label: "Holiday rate", price: roverPrices.walking.holiday },
      { label: "Additional dog", price: roverPrices.walking.additionalDog },
      { label: "Puppy rate", price: roverPrices.walking.puppy },
    ],
  },
];

export const rover = {
  profileUrl: cityConfig.rover.profileUrl,
  rating: cityConfig.rover.rating,
  reviewCount: cityConfig.rover.reviewCount,
  positioning: "Full-Time Pet Care Professionals",
  tagline: "Our Empty Nest, Your Dog's Retreat",
  pricingNote:
    "Rates below match our current Rover listing. Final price, holiday rates, extended-care charges, availability, and booking terms are confirmed on Rover when you request care.",
  bio:
    "Jackye and Todd are full-time Waco pet care professionals and empty nesters. Pet care is their primary profession, not a side gig, which means dogs in their care get daily walks, supervised play, enrichment, structured rest, and individualized attention. Their home includes three resident dogs and a foster, so they are experienced with group dynamics, high-energy dogs, puppies, seniors, and dogs needing medication support.",
  prices: roverPrices,
  rateCategories: roverRateCategories,
  goodFit: [
    "Dogs who enjoy a home environment",
    "Seniors",
    "Puppies",
    "Social dogs",
    "Dogs who need routine",
    "Dogs who benefit from structure",
    "Families who want regular updates",
    "Dogs who need medication support",
  ],
  mayNotBeFit: [
    "Dogs with severe aggression",
    "Dogs who cannot safely be around other dogs",
    "Dogs who are destructive in a home setting",
    "Dogs with unmanaged bite history",
  ],
} as const;

/** Standard daycare rate for summer camp copy. */
export function getRoverDaycareStandardRate(): string {
  return roverPrices.daycare.standard;
}
