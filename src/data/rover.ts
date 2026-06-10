import { cityConfig } from "@/lib/site";

export const rover = {
  profileUrl: cityConfig.rover.profileUrl,
  rating: "5.0",
  reviewCount: 73,
  positioning: "Full-Time Pet Care Professionals",
  tagline: "Our Empty Nest, Your Dog's Retreat",
  pricingNote:
    "Rover pricing and availability may change. Please check the Rover profile for current rates and open dates.",
  bio:
    "Jackye and Todd are full-time Waco pet care professionals and empty nesters. Pet care is their primary profession, not a side gig, which means dogs in their care get daily walks, supervised play, enrichment, structured rest, and individualized attention. Their home includes three resident dogs and a foster, so they are experienced with group dynamics, high-energy dogs, puppies, seniors, and dogs needing medication support.",
  services: [
    { name: "Boarding", price: "$40/night" },
    { name: "Drop-in visits", price: "$13/visit" },
    { name: "Doggy daycare", price: "$30/day" },
    { name: "Dog walking", price: "$15/walk" },
  ],
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
    "Dogs who need a kennel-free environment 100% of the time",
  ],
} as const;
