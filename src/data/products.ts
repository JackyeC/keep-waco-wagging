import type { ProductRecommendation } from "@/lib/types";

export const productRecommendations: ProductRecommendation[] = [
  {
    id: "crates",
    title: "Crates",
    category: "Crates",
    description: "A practical rest space for dogs who are crate-trained.",
    whyWeLikeIt:
      "Useful for safe rest, feeding, decompression, boarding routines, and helping dogs settle.",
    bestFor: ["Boarding routines", "Structured rest", "Puppies", "Decompression"],
    affiliateReady: false,
  },
  {
    id: "slow-feeders",
    title: "Slow feeders",
    category: "Slow feeders",
    description: "Bowls designed to slow down fast eaters.",
    whyWeLikeIt:
      "Helpful for dogs who eat too quickly or need a little extra mealtime enrichment.",
    bestFor: ["Fast eaters", "Mealtime enrichment", "Multi-dog homes"],
    affiliateReady: false,
  },
  {
    id: "puzzle-feeders",
    title: "Puzzle feeders",
    category: "Puzzle feeders",
    description: "Simple food puzzles for brain work indoors.",
    whyWeLikeIt:
      "Great for mental stimulation, confidence building, and calmer indoor routines.",
    bestFor: ["Rainy days", "Confidence building", "Calmer routines"],
    affiliateReady: false,
  },
  {
    id: "enzyme-cleaner",
    title: "Enzyme cleaner",
    category: "Cleaning",
    description: "A home basic for pet messes and odor support.",
    whyWeLikeIt:
      "Useful for pet messes, accidents, odor control, and multi-dog homes.",
    bestFor: ["Puppies", "Senior dogs", "Multi-dog homes", "Accidents"],
    affiliateReady: false,
  },
  {
    id: "poop-bags",
    title: "Poop bags",
    category: "Walks",
    description: "The least glamorous dog-parent essential.",
    whyWeLikeIt:
      "An everyday basic for dog walks, travel, daycare, and yard cleanup.",
    bestFor: ["Walks", "Travel", "Daycare bags", "Yard cleanup"],
    affiliateReady: false,
  },
  {
    id: "long-leash",
    title: "Long leash / training line",
    category: "Training",
    description: "A longer line for supervised outdoor practice.",
    whyWeLikeIt:
      "Helpful for safe recall practice and controlled outdoor freedom.",
    bestFor: ["Recall practice", "Puppies", "Open fields", "Confidence"],
    affiliateReady: false,
  },
  {
    id: "front-clip-harness",
    title: "Front-clip harness",
    category: "Walks",
    description: "A walking tool for dogs who need support with pulling.",
    whyWeLikeIt:
      "Useful for dogs who pull and need better walking support.",
    bestFor: ["Pullers", "Neighborhood walks", "Training support"],
    affiliateReady: false,
  },
  {
    id: "lick-mats",
    title: "Lick mats",
    category: "Enrichment",
    description: "Low-key enrichment for settling and care routines.",
    whyWeLikeIt:
      "Good for calming, grooming support, crate comfort, and decompression.",
    bestFor: ["Grooming support", "Crate comfort", "Decompression"],
    affiliateReady: false,
  },
  {
    id: "dog-wipes-paw-cleaner",
    title: "Dog-safe wipes or paw cleaner",
    category: "Cleaning",
    description: "Helpful cleanup after Waco yard time.",
    whyWeLikeIt:
      "Helpful after yard time, rain, mud, or daycare.",
    bestFor: ["Muddy paws", "Daycare bags", "Rainy days"],
    affiliateReady: false,
  },
  {
    id: "washable-beds-crate-mats",
    title: "Washable dog beds / crate mats",
    category: "Home",
    description: "Easy-clean bedding for home, crates, and care stays.",
    whyWeLikeIt:
      "Easier to clean and safer than sending sentimental blankets or precious items to boarding/daycare.",
    bestFor: ["Boarding", "Crates", "Senior dogs", "Easy cleanup"],
    affiliateReady: false,
  },
];

export function getProductRecommendations() {
  return productRecommendations;
}

export function getFeaturedProductRecommendations(limit = 4) {
  return productRecommendations.slice(0, limit);
}
