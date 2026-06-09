import type { BusinessSpotlight } from "@/lib/types";

/**
 * Local business spotlight features.
 *
 * ⚠️ PLACEHOLDER DATA — these are illustrative examples. Replace with real
 * Waco-area businesses (with their permission) and verified details before
 * launch. Maps onto a future `spotlights` table.
 */
export const spotlights: BusinessSpotlight[] = [
  {
    id: "s-001",
    slug: "brazos-bark-and-brew",
    businessName: "Brazos Bark & Brew",
    ownerOrTeam: "The Alvarez family",
    category: "Restaurants and patios",
    whatTheyOffer:
      "Local taproom and counter-service kitchen with a sprawling shaded patio by the river.",
    whyKnowThem:
      "One of the most genuinely dog-welcoming patios downtown — they keep water bowls stocked and never make you feel like you have to rush.",
    dogFriendlyDetails:
      "Leashed dogs welcome across the whole patio. Water station by the door and treats at the counter.",
    bestTimeToVisit: "Weekday late afternoons before the dinner crowd.",
    link: "https://example.com/brazos-bark-and-brew",
    specialOffer: "Free pup-cup with any entrée when you mention Keep Waco Wagging.",
    imageUrl: undefined,
    featured: true,
  },
  {
    id: "s-002",
    slug: "hewitt-paws-grooming",
    businessName: "Hewitt Paws Grooming",
    ownerOrTeam: "Owner-groomer Dana R.",
    category: "Pet services",
    whatTheyOffer:
      "Low-stress, small-batch grooming with gentle handling for nervous dogs.",
    whyKnowThem:
      "Dana caps appointments so dogs aren't crated for hours and offers calm meet-and-greets before the first full groom.",
    dogFriendlyDetails:
      "By appointment. Quiet salon environment ideal for anxious or first-time groom dogs.",
    bestTimeToVisit: "Mid-week mornings for the calmest experience.",
    link: "https://example.com/hewitt-paws",
    imageUrl: undefined,
    featured: false,
  },
  {
    id: "s-003",
    slug: "woodway-pup-provisions",
    businessName: "Woodway Pup Provisions",
    ownerOrTeam: "Locally owned by the Tran family",
    category: "Local makers",
    whatTheyOffer:
      "Independent pet store with quality food, enrichment toys, and Texas-made treats.",
    whyKnowThem:
      "They actually know your dog's name and stock small-batch local treats you won't find at the big-box stores.",
    dogFriendlyDetails:
      "Well-behaved leashed dogs welcome inside. Treat samples and a water bowl at the door.",
    bestTimeToVisit: "Weekday mornings are quietest.",
    link: "https://example.com/woodway-pup-provisions",
    imageUrl: undefined,
    featured: false,
  },
  {
    id: "s-004",
    slug: "platinum-scoops",
    businessName: "Platinum Scoops",
    ownerOrTeam: "The Platinum Scoops team",
    category: "Community partners",
    whatTheyOffer:
      "Pet waste removal, yard odor support, and yard prep — plus lifestyle dog support for local families.",
    whyKnowThem:
      "As the presenting sponsor of Keep Waco Wagging, Platinum Scoops invests in local dog parents with practical education and a cleaner, fresher yard.",
    dogFriendlyDetails:
      "Recurring scooping plans, pre-party yard prep, and odor refresh across greater Waco.",
    bestTimeToVisit: "Book a recurring plan online anytime.",
    link: "https://platinumscoops.com",
    specialOffer: "Ask about new-customer pricing for recurring plans.",
    imageUrl: undefined,
    featured: true,
  },
];

export function getFeaturedSpotlight(): BusinessSpotlight {
  return spotlights.find((s) => s.featured) ?? spotlights[0];
}
