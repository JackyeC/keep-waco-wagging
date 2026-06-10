/**
 * Central city + site configuration for Keep Waco Wagging.
 *
 * Clone-to-another-city rule: update this file plus the data files in
 * `src/data/`. Do not hide city-specific facts inside components.
 */

export const cityConfig = {
  city: "Waco",
  state: "Texas",
  stateAbbr: "TX",
  county: "McLennan County",
  slug: "waco",
  name: "Keep Waco Wagging",
  tagline: "Dog-friendly Waco, practical pet care, and cleaner dog days.",
  url: "https://keepwacowagging.com",
  description:
    "Keep Waco Wagging is a local guide for Waco dog parents, featuring dog-friendly places, Platinum Scoops yard cleanup, Rover pet care, product recommendations, and local resources.",
  keywords: [
    "dog-friendly Waco",
    "Waco dog parents",
    "Platinum Scoops",
    "dog waste removal Waco",
    "Waco dog boarding",
    "Waco dog daycare",
    "dog-friendly patios Waco",
    "Waco pet care",
  ],
  serviceAreas: [
    "Waco",
    "Hewitt",
    "Woodway",
    "Robinson",
    "China Spring",
    "Bellmead",
    "McLennan County",
  ],
  // TODO: Confirm expanded service area before publishing: Lorena, McGregor,
  // Lacy Lakeview, Bruceville-Eddy, West, Riesel, Crawford, Hallsburg, Elm Mott,
  // Axtell, Ross.
  sponsor: {
    name: "Platinum Scoops",
    line: "Presented by Platinum Scoops",
    website: "https://platinumscoops.com",
    bookingUrl:
      "https://clienthub.getjobber.com/booking/29462df8-88c9-4075-aa13-000fc4c8b80c",
    phoneDisplay: "(254) SCOOPER",
    phoneNumeric: "(254) 726-6737",
    phoneHref: "tel:+12547266737",
    email: "info@platinumscoops.com",
    pricingNote:
      "Recurring scooping starts at $25/week, with the first cleanup included. No long-term commitment. Cancel anytime.",
  },
  rover: {
    profileUrl:
      "https://www.rover.com/members/jacqueline-todd-c-full-time-pet-care-professionals/",
    rating: "5.0",
    reviewCount: 73,
    headline: "Full-Time Pet Care Professionals",
    subhead: "Our Empty Nest, Your Dog's Retreat",
  },
  founders: {
    names: "Jackye and Todd Clayton",
    jackye: "Jackye Clayton",
    todd: "Todd Clayton",
  },
  monetization: {
    affiliateDisclosure:
      "As an Amazon Associate I earn from qualifying purchases.",
    productDisclosure:
      "Product recommendations are based on practical dog care experience. Always choose what fits your dog's size, health, and behavior needs.",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

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

export const mainNav: NavLink[] = [
  { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
  { label: "Platinum Scoops", href: "/platinum-scoops" },
  { label: "Pet Care", href: "/pet-care" },
  { label: "Shop", href: "/shop" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const ctas = {
  bookScoops: {
    label: "Book a Scoop",
    href: cityConfig.sponsor.bookingUrl,
  },
  exploreDirectory: {
    label: "Explore Dog-Friendly Waco",
    href: "/dog-friendly-waco",
  },
  bookPetCare: {
    label: "Book Pet Care",
    href: cityConfig.rover.profileUrl,
  },
  joinList: {
    label: "Join the Waco Dog Parent List",
    href: "#email-list",
  },
  joinWeekend: {
    label: "Join the Waco Dog Parent List",
    href: "#email-list",
  },
  becomeSponsor: {
    label: "Become a Local Sponsor",
    href: "/sponsors#sponsor-inquiry",
  },
  submitPlace: {
    label: "Submit a Dog-Friendly Place",
    href: "/submit-a-place",
  },
  learnScoops: {
    label: "Learn About Platinum Scoops",
    href: "/platinum-scoops",
  },
  shopGear: {
    label: "Shop Dog Gear",
    href: "/shop",
  },
  // Backward-compatible aliases used by older components/pages.
  bookTraining: {
    label: "Ask About Lifestyle Support",
    href: `mailto:${cityConfig.sponsor.email}?subject=Lifestyle%20dog%20support`,
  },
  trainingHelp: {
    label: "Get Lifestyle Support",
    href: "/pet-care",
  },
  getListed: {
    label: "Submit a Dog-Friendly Place",
    href: "/submit-a-place",
  },
  bookRover: {
    label: "Book Pet Care",
    href: cityConfig.rover.profileUrl,
  },
} as const;

export const sponsorLinks = {
  website: cityConfig.sponsor.website,
  booking: cityConfig.sponsor.bookingUrl,
  phone: cityConfig.sponsor.phoneDisplay,
  phoneNumeric: cityConfig.sponsor.phoneNumeric,
  phoneHref: cityConfig.sponsor.phoneHref,
  email: cityConfig.sponsor.email,
  pricingNote: cityConfig.sponsor.pricingNote,
  services: [
    { label: "Weekly Dog Waste Removal", href: "/platinum-scoops#yard-services" },
    { label: "One-Time Yard Cleanups", href: "/platinum-scoops#yard-services" },
    { label: "Boarding & Daycare", href: "/pet-care" },
    { label: "Dog Walking", href: "/pet-care" },
  ],
} as const;

export const socialLinks = cityConfig.social;
export const monetization = cityConfig.monetization;

export function getAmazonAssociatesTag(): string | undefined {
  return process.env.AMAZON_ASSOCIATES_TAG;
}

export function buildAmazonAffiliateUrl(asin?: string): string | undefined {
  const tag = getAmazonAssociatesTag();
  if (!asin || !tag) return undefined;
  return `https://www.amazon.com/dp/${asin}?tag=${tag}`;
}

export const podcast = {
  enabled: false,
  name: "The Keep Waco Wagging Podcast",
  tagline: "Dog-friendly Waco, in your ears.",
  description:
    "Local stories, practical pet care, and dog-friendly Waco finds.",
  barText: "The Keep Waco Wagging Podcast is coming soon.",
  subscribeUrl: "#",
  platforms: [
    { label: "Spotify", href: "#" },
    { label: "Apple Podcasts", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;
