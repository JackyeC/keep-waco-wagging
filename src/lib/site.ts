/**
 * Central city + site configuration for Keep Waco Wagging.
 *
 * To clone this site for another "W" city, swap `cityConfig` values and replace
 * the data files under `src/data/`. See README.md for the full checklist.
 */

export const cityConfig = {
  /** Core geography */
  city: "Waco",
  state: "Texas",
  stateAbbr: "TX",
  county: "McLennan County",
  slug: "waco",

  /** Brand */
  name: "Keep Waco Wagging",
  tagline: "Your dog-friendly guide to Waco.",
  // TODO: confirm final production domain before launch.
  url: "https://keepwacowagging.com",
  description:
    "Keep Waco Wagging is the dog-friendly lifestyle guide for Waco pet parents — find dog-friendly patios, parks, trails, events, local pet businesses, and real-life training tips. Presented by Platinum Scoops.",
  keywords: [
    "dog-friendly Waco",
    "dog-friendly patios Waco",
    "dog parks Waco",
    "Waco dog training",
    "lifestyle dog training Waco",
    "puppy training Waco",
    "dog trainer Waco Texas",
    "Waco pet services",
    "things to do with dogs in Waco",
    "dog-friendly restaurants Waco",
    "pet waste removal Waco",
    "poop scoop service Waco",
    "dog yard cleanup Waco",
    "Platinum Scoops Waco",
  ],
  serviceAreas: [
    "Waco",
    "Woodway",
    "Hewitt",
    "Robinson",
    "China Spring",
    "Bellmead",
  ],

  /** Presenting sponsor / company */
  sponsor: {
    name: "Platinum Scoops",
    line: "Presented by Platinum Scoops",
    website: "https://platinumscoops.com",
    // TODO: replace with your real booking URL (Square, Jobber, etc.).
    bookingUrl: "https://platinumscoops.com",
    phone: "(254) 555-0100",
    phoneHref: "tel:+12545550100",
    email: "hello@platinumscoops.com",
    pricingNote:
      "Plans start around $19/week for weekly scooping in most Waco-area neighborhoods. Pricing varies by yard size and service frequency — book online for a quote.",
  },

  /** Founder / personal brand */
  founder: {
    name: "Jacky Clayton",
    title: "Founder, Platinum Scoops & Keep Waco Wagging",
    bio: "I'm a Waco dog parent, pet waste removal operator, lifestyle dog trainer, and Rover sitter. I built Keep Waco Wagging because local dog families kept asking the same questions — where to go, who to trust, and how to enjoy more of Waco with less stress.",
    // TODO: replace with your real Rover profile URL.
    roverProfileUrl: "https://www.rover.com/",
    roverHeadline: "Trusted Waco dog sitting & walking on Rover",
  },

  /** Revenue / affiliate settings */
  monetization: {
    // TODO: replace with your Amazon Associates tracking ID once approved.
    amazonAssociatesTag: "keepwacowag-20",
    affiliateDisclosure:
      "Keep Waco Wagging earns commissions from qualifying purchases through Amazon and other partner links at no extra cost to you. Sponsored placements are always labeled. We only recommend products and partners we genuinely use or trust for Waco dog families.",
    roverProfileUrl: "https://www.rover.com/",
  },

  /** Social — swap in real handles when available */
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

/** Backward-compatible alias used across the codebase. */
export const siteConfig = {
  name: cityConfig.name,
  tagline: cityConfig.tagline,
  sponsorLine: cityConfig.sponsor.line,
  sponsor: cityConfig.sponsor.name,
  url: cityConfig.url,
  description: cityConfig.description,
  keywords: cityConfig.keywords,
  serviceAreas: cityConfig.serviceAreas,
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/** Primary navigation shown in the header. */
export const mainNav: NavLink[] = [
  { label: "Directory", href: "/directory" },
  { label: "Where to Wag", href: "/weekend" },
  { label: "Training", href: "/training" },
  { label: "Shop", href: "/shop" },
  { label: "Pets", href: "/pets" },
  { label: "Spotlights", href: "/spotlights" },
  { label: "Blog", href: "/blog" },
  { label: "Platinum Scoops", href: "/platinum-scoops" },
  { label: "About", href: "/about" },
];

/** Reusable primary calls to action used across the site. */
export const ctas = {
  exploreDirectory: { label: "Explore Dog-Friendly Waco", href: "/directory" },
  bookTraining: {
    label: "Book a Lifestyle Training Assessment",
    href: "/training#assessment",
  },
  trainingHelp: { label: "Get Lifestyle Training Help", href: "/training" },
  joinWeekend: {
    label: "Join Where to Wag This Weekend",
    href: "/weekend#newsletter",
  },
  getListed: { label: "Get Listed", href: "/get-listed" },
  learnScoops: {
    label: "Learn About Platinum Scoops",
    href: "/platinum-scoops",
  },
  bookScoops: {
    label: "Book Platinum Scoops",
    href: cityConfig.sponsor.bookingUrl,
  },
  bookRover: {
    label: "Book on Rover",
    href: cityConfig.monetization.roverProfileUrl,
  },
  shopGear: { label: "Shop Dog Gear We Love", href: "/shop" },
} as const;

/** External / sponsor links */
export const sponsorLinks = {
  website: cityConfig.sponsor.website,
  booking: cityConfig.sponsor.bookingUrl,
  phone: cityConfig.sponsor.phone,
  phoneHref: cityConfig.sponsor.phoneHref,
  email: cityConfig.sponsor.email,
  pricingNote: cityConfig.sponsor.pricingNote,
  services: [
    { label: "Weekly Pet Waste Removal", href: "/platinum-scoops#services" },
    { label: "Every-Other-Week Scooping", href: "/platinum-scoops#services" },
    { label: "Pre-Party Yard Prep", href: "/platinum-scoops#services" },
    { label: "OSO Fresh Yard Refresh", href: "/platinum-scoops#services" },
    {
      label: "Lifestyle Dog Training Assessment",
      href: "/training#assessment",
    },
  ],
} as const;

export const socialLinks = cityConfig.social;

export const monetization = cityConfig.monetization;

/** Build an Amazon affiliate product URL from an ASIN. */
export function buildAmazonAffiliateUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${cityConfig.monetization.amazonAssociatesTag}`;
}

/**
 * Podcast promo config.
 * Set `enabled: false` to hide the banner everywhere.
 */
export const podcast = {
  enabled: true,
  name: "The Keep Waco Wagging Podcast",
  tagline: "Dog-friendly Waco, in your ears.",
  description:
    "Local stories, real-life training tips, and the dog-friendly finds that make life with your pup in Waco more fun — a new episode every week.",
  barText: "New — The Keep Waco Wagging Podcast is here.",
  subscribeUrl: "#",
  platforms: [
    { label: "Spotify", href: "#" },
    { label: "Apple Podcasts", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;
