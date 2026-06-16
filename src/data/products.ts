import { buildAmazonAffiliateUrl } from "@/lib/site";
import { shopProductImages } from "@/data/shopProductImages";
import type { ProductRecommendation } from "@/lib/types";

/**
 * Curated dog gear with Amazon affiliate links.
 *
 * Picks are bestseller-vetted (4.5+ stars, thousands of reviews) and written
 * for Waco pet parents — summer-heavy, treat-your-dog-like-family voice.
 * Affiliate tag is configured in src/lib/site.ts (cityConfig.monetization.amazonAssociatesTag).
 */
const productRecommendations: Omit<
  ProductRecommendation,
  "amazonUrl" | "affiliateReady"
>[] = [
  // ────────────────────────────────────────────────────────────
  // SUMMER ESSENTIALS — front of the page from May to September
  // ────────────────────────────────────────────────────────────
  {
    id: "paw-wax",
    title: "Musher's Secret Paw Wax",
    category: "Summer essentials",
    description:
      "Beeswax-based paw balm that protects pads from hot pavement, ice, and salt.",
    whyWeLikeIt:
      "If you do one thing on this page, do this. Pavement in Waco hits 145° in July — Musher's goes on like Chapstick and forms a barrier between paw pads and the parking lot at HEB. Originally made for sled dogs. Lick-safe, non-toxic, 35,000+ reviews.",
    bestFor: ["Hot pavement", "Daily summer walks", "Cracked pads", "Pool chemicals"],
    asin: "B0002IJQDC",
  },
  {
    id: "cooling-mat",
    title: "Bedsure Thin Cooling Dog Crate Mat",
    category: "Summer essentials",
    description:
      "Pressure-activated cooling fabric mat that's machine washable and non-slip.",
    whyWeLikeIt:
      "Goes in the crate, under their favorite couch spot, or by the back door. No water to refill, no gel to puncture. Uses Q-max cooling fabric — same tech as human cooling sheets. The single best buy for dogs who crate during the day in Texas summer.",
    bestFor: ["Crate cooling", "Senior dogs", "Indoor heat", "Travel kennels"],
    asin: "B0DN6XYM74",
  },
  {
    id: "cooling-vest",
    title: "Ruffwear Swamp Cooler Vest",
    category: "Summer essentials",
    description:
      "Soak, wring, walk. Evaporative cooling vest for outdoor heat.",
    whyWeLikeIt:
      "Three-layer fabric: reflects heat, holds water for evaporative cooling, keeps your dog dry against the skin. The Cameron Park hike unlock — and the BSR Cable Park unlock. If your dog still needs to move in 100° heat, this is the gear that makes it possible.",
    bestFor: ["Hikes", "Outdoor events", "Yappy hours", "Heavy-coated breeds"],
    asin: "B09MSKT5GN",
  },
  {
    id: "travel-water-bottle",
    title: "Highwave AutoDogMug Travel Water Bottle",
    category: "Summer essentials",
    description:
      "One-handed, leak-resistant 20oz water bottle with built-in bowl.",
    whyWeLikeIt:
      "Squeeze the bottle, water fills the silicone bowl. Release, the water drains back in. No spills in the car, no empty cup holders, no wrestling with a separate bowl. You cannot walk a Waco dog from June through September without one of these.",
    bestFor: ["Walks", "Hikes", "Car trips", "Patio outings"],
    asin: "B018YECUPQ",
  },
  {
    id: "calming-chews",
    title: "Zesty Paws Calming Bites",
    category: "Summer essentials",
    description:
      "Soft chews with hemp, L-theanine, and chamomile for storm and firework anxiety.",
    whyWeLikeIt:
      "Give 30–90 minutes before a known stressor. The bestseller in the calming-supplement category for a reason — Waco gets thunderstorms most summer nights, plus July 4th, plus Baylor games, plus the neighbor's truck backfiring. Stock up by late June.",
    bestFor: ["Thunderstorms", "Fireworks", "Vet visits", "Travel anxiety"],
    asin: "B077MDJ58Y",
  },

  // ────────────────────────────────────────────────────────────
  // CRATES — the most important purchase a new dog owner makes
  // ────────────────────────────────────────────────────────────
  {
    id: "midwest-icrate",
    title: "MidWest iCrate Double Door",
    category: "Crates",
    description:
      "Folding wire crate with double doors, divider panel, and leak-proof pan. The bestseller, full stop.",
    whyWeLikeIt:
      "Folds flat in 30 seconds for vet runs and Cameron Park trips. Divider grows with a puppy. Double door is a quiet gift when it's tucked into a corner. Tens of thousands of reviews — the one we recommend to every new Waco adopter.",
    bestFor: ["New adopters", "Puppies", "Boarding routines", "Crate training"],
    asin: "B000QFT1RC",
  },
  {
    id: "washable-crate-mats",
    title: "Washable crate mats and dog beds",
    category: "Crates",
    description:
      "Easy-clean bedding for home, crates, and boarding stays.",
    whyWeLikeIt:
      "Safer than sending sentimental blankets to boarding. Machine washable, holds up to chewers, dries fast. Pair with the cooling mat above for summer crate setups.",
    bestFor: ["Boarding", "Crates", "Senior dogs", "Easy cleanup"],
    asin: "B0B58ZB22X",
  },

  // ────────────────────────────────────────────────────────────
  // WALKS — harnesses, leashes, the daily-walk basics
  // ────────────────────────────────────────────────────────────
  {
    id: "front-clip-harness",
    title: "Ruffwear Front Range Harness",
    category: "Walks",
    description:
      "Dual-clip harness with front and back D-rings, padded chest and belly panels.",
    whyWeLikeIt:
      "The padding is the move in Texas heat — nylon-only harnesses get hot against the chest and your dog will hesitate to put it on. Ruffwear breathes. Front clip helps with pullers, back clip for relaxed walks. Reflective trim for early-morning and after-sunset walks (which is when Waco dogs walk in summer).",
    bestFor: ["Daily walks", "Pullers", "Hot weather", "Loose-leash training"],
    asin: "B0CLB4ZBWF",
  },
  {
    id: "long-leash",
    title: "Long leash / training line",
    category: "Walks",
    description:
      "20–30 ft training line for safe recall practice and supervised outdoor freedom.",
    whyWeLikeIt:
      "Bigger than a regular leash, smaller than the freedom of a fenced yard. Perfect for sniff walks at McLane Stadium fields or recall work at Brazos Park East — your dog feels free, you stay in control.",
    bestFor: ["Recall practice", "Puppies", "Open fields", "Confidence building"],
    asin: "B072MNCJ8K",
  },
  {
    id: "poop-bags",
    title: "Earth Rated Poop Bags",
    category: "Walks",
    description:
      "Lavender-scented, leak-proof poop bags made with 65% post-consumer recycled plastic.",
    whyWeLikeIt:
      "The category leader, full stop. Don't tear when it matters. The lavender scent actually works. Get the multi-roll boxes — you'll go through them faster than you think, and bulk is half the price per bag.",
    bestFor: ["Daily walks", "Yard cleanup", "Travel", "Daycare bags"],
    asin: "B00BSYR7K8",
  },

  // ────────────────────────────────────────────────────────────
  // SAFETY — GPS, ID, microchip backup
  // ────────────────────────────────────────────────────────────
  {
    id: "gps-tracker",
    title: "Tractive GPS Dog Tracker",
    category: "Safety",
    description:
      "Real-time GPS dog tracker with live tracking, virtual fence, and activity monitoring.",
    whyWeLikeIt:
      "If your dog has a habit of testing fences like they're auditioning for the Olympics, this is the difference between panic and 'oh, there you are.' Live tracking on your phone, virtual fence alerts, works anywhere with cell signal. Requires a small monthly subscription — worth every cent the first time you need it.",
    bestFor: ["Runners", "Escape artists", "Off-leash dogs", "Peace of mind"],
    asin: "B0D6Z4L6BW",
  },

  // ────────────────────────────────────────────────────────────
  // ENRICHMENT — the cheapest training investment
  // ────────────────────────────────────────────────────────────
  {
    id: "kong-classic",
    title: "Kong Classic",
    category: "Enrichment",
    description:
      "The gold-standard stuffable rubber chew toy for treats, kibble, and frozen prep.",
    whyWeLikeIt:
      "Stuff with peanut butter (xylitol-free!) or dinner kibble, freeze it overnight, and you've bought yourself 45 minutes of quiet. Indestructible rubber survives actual chewers, not just Instagram chewers. Frozen Kong on a hot Waco afternoon = cooling + enrichment + lunch in one move.",
    bestFor: ["Bored dogs", "Crate time", "Hot afternoons", "Anxious chewers"],
    asin: "B0002AR0I8",
  },
  {
    id: "lick-mats",
    title: "Lick mats",
    category: "Enrichment",
    description:
      "Silicone mats with suction cups — turn 5 minutes of wet food into a 20-minute calming session.",
    whyWeLikeIt:
      "Stick to the wall of the shower for bath time, the side of the crate for grooming, or the kitchen floor for everyday calm. The single best calming tool for thunderstorms (we get those) and fireworks (those too). Smear with peanut butter, plain yogurt, or wet food.",
    bestFor: ["Grooming", "Crate comfort", "Storm anxiety", "Slow feeding"],
    asin: "B09FPTDBRZ",
  },
  {
    id: "slow-feeders",
    title: "Outward Hound Fun Feeder Slow Bowl",
    category: "Enrichment",
    description: "Maze-pattern bowl that slows fast eaters and adds mealtime enrichment.",
    whyWeLikeIt:
      "Helpful for dogs who eat too fast (bloat risk for deep-chested breeds) or need a little mental work before training. A daily win for busy dog parents.",
    bestFor: ["Fast eaters", "Mealtime enrichment", "Deep-chested breeds"],
    asin: "B00FPKNRCS",
  },
  {
    id: "puzzle-feeders",
    title: "Puzzle feeders",
    category: "Enrichment",
    description: "Hide-and-find food puzzles for indoor brain work.",
    whyWeLikeIt:
      "Great for thunderstorm afternoons, vet-recovery days, and confidence building. Mental work tires dogs out faster than a walk in Texas heat.",
    bestFor: ["Rainy days", "Recovery", "Confidence building", "Calmer routines"],
    asin: "B0711Y9XTF",
  },

  // ────────────────────────────────────────────────────────────
  // CLEANING — the unglamorous category
  // ────────────────────────────────────────────────────────────
  {
    id: "enzyme-cleaner",
    title: "Nature's Miracle Enzyme Cleaner",
    category: "Cleaning",
    description:
      "Enzymatic cleaner for pet accidents, odor neutralizing, and re-marking prevention.",
    whyWeLikeIt:
      "Doesn't just mask the smell — breaks down the proteins so your dog stops re-marking the spot. Essential for new puppies, senior dogs with leaks, and multi-dog homes. Keep a bottle in the laundry room and one in the car.",
    bestFor: ["Puppies", "Senior dogs", "Multi-dog homes", "Carpet accidents"],
    asin: "B071W6CQ7S",
  },
  {
    id: "dog-wipes",
    title: "Nature's Miracle Deodorizing Bath Wipes",
    category: "Cleaning",
    description: "Quick cleanup wipes for paws, butts, and post-walk grime.",
    whyWeLikeIt:
      "For paws after walks (Waco mud + summer creek visits), for butts in between baths, for the back of the car. Keep a pack by the back door and one in the dog bag.",
    bestFor: ["Muddy paws", "Daycare bags", "Travel", "Between baths"],
    asin: "B0CCB4XW1M",
  },

  // ────────────────────────────────────────────────────────────
  // HOME — beds, gates, the stuff that stays put
  // ────────────────────────────────────────────────────────────
  {
    id: "elevated-bed",
    title: "Coolaroo Elevated Dog Bed",
    category: "Home",
    description: "Steel-framed raised cot with breathable mesh — indoor or outdoor.",
    whyWeLikeIt:
      "Airflow underneath = cooler dog. Indestructible outdoors (we're talking years on the back porch). The bestseller in elevated beds for a reason. Pairs with the cooling mat for a serious summer setup.",
    bestFor: ["Backyards", "Hot dogs", "Senior dogs", "Outdoor patios"],
    asin: "B001HX4294",
  },
];

function withAffiliateLinks(
  products: Omit<ProductRecommendation, "amazonUrl" | "affiliateReady">[],
): ProductRecommendation[] {
  return products.map((product) => {
    const amazonUrl = buildAmazonAffiliateUrl(product.asin);
    return {
      ...product,
      amazonUrl,
      imageUrl: product.imageUrl ?? shopProductImages[product.id],
      affiliateReady: Boolean(amazonUrl),
    };
  });
}

const hydratedProducts = withAffiliateLinks(productRecommendations);

export function getProductRecommendations() {
  return hydratedProducts;
}

export function getFeaturedProductRecommendations(limit = 4) {
  return hydratedProducts.slice(0, limit);
}
