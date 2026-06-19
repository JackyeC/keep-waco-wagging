/**
 * Central city + site configuration for Keep Waco Wagging.
 *
 * Clone-to-another-city rule: update this file plus the data files in
 * `src/data/`. Do not hide city-specific facts inside components.
 */

/** Reusable brand copy — primary community brand with Platinum Scoops as presenter. */
export const brandLanguage = {
  primaryName: "Keep Waco Wagging",
  presentedBy: "Presented by Platinum Scoops",
  poweredBy: "Keep Waco Wagging is powered by Platinum Scoops.",
  servicesLine:
    "Doggy daycare, boarding, pet care, and poop scoop services in Waco",
  communityLine: "Waco dog parent resources, events, and camp experiences",
  sponsorServices:
    "Platinum Scoops provides pet waste removal, doggy daycare, boarding, and pet care services in Waco.",
  dogCampName: "Keep Waco Wagging Dog Camp",
  sponsorCampInquiry: "Interested in sponsoring a future camp week? Contact us.",
  communityPartnersWelcome: "Community partners welcome",
  instagram: {
    handle: "@platinum_scoops",
    url: "https://www.instagram.com/platinum_scoops/",
    cta: "Follow @platinum_scoops",
    followLine:
      "Follow @platinum_scoops for dog daycare moments, local pet care updates, and Waco pup fun.",
    socialLine:
      "Follow the pups, community updates, and behind-the-scenes fun on Instagram at @platinum_scoops.",
    actionLine:
      "Want to see the dogs in action? Follow Platinum Scoops on Instagram: @platinum_scoops.",
  },
} as const;

export const cityConfig = {
  city: "Waco",
  state: "Texas",
  stateAbbr: "TX",
  county: "McLennan County",
  slug: "waco",
  name: brandLanguage.primaryName,
  tagline: brandLanguage.communityLine,
  url: "https://keepwacowagging.com",
  description:
    "Keep Waco Wagging is the public-facing community brand for Waco dog parents — local resources, events, and camp experiences, presented by Platinum Scoops.",
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
    line: brandLanguage.presentedBy,
    description: brandLanguage.sponsorServices,
    /** Set when `/public/brand/platinum-scoops-logo.webp` is added. */
    logo: undefined as string | undefined,
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
    amazonAssociatesTag: "platinumpet05-20",
    affiliateDisclosure:
      "As an Amazon Associate I earn from qualifying purchases.",
    productDisclosure:
      "Product recommendations are based on practical dog care experience. Always choose what fits your dog's size, health, and behavior needs.",
  },
  brand: {
    logo: {
      /** Full lockup — merch, print, hero sections, stickers, social graphics */
      full: {
        src: "/brand/keep-waco-wagging-logo.webp",
        alt: "Keep Waco Wagging, presented by Platinum Scoops",
        width: 1024,
        height: 1024,
      },
      /** Cropped dogs + Waco skyline — site header and compact placements */
      mark: {
        src: "/brand/keep-waco-wagging-mark.webp",
        alt: "Keep Waco Wagging",
        width: 1024,
        height: 635,
      },
    },
  },
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
  brand: cityConfig.brand,
  brandLanguage,
} as const;

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

// Primary nav — service business first, then community shop and story.
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Poop Scooping", href: "https://platinumscoops.com", external: true },
  { label: "Daycare & Boarding", href: "/pet-care" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

// Community & secondary pages — footer and mobile "More" group.
export const secondaryNav: NavLink[] = [
  { label: "Book", href: "/book" },
  { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
  { label: "Yappy Hours", href: "/yappy-hours" },
  { label: "Summer Camp", href: "/summer-daycare" },
  { label: "Event Dog Care", href: "/pet-care/weddings-events" },
  { label: "Contact", href: "/contact" },
  {
    label: "Rover Profile",
    href: cityConfig.rover.profileUrl,
    external: true,
  },
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
  summerDaycare: {
    label: "See the Summer Calendar",
    href: "/summer-daycare",
  },
  eventCare: {
    label: "Ask About Event Dog Care",
    href: "/pet-care/weddings-events",
  },
  trainingWaitlist: {
    label: "Join the Training Waitlist",
    href: `mailto:${cityConfig.sponsor.email}?subject=Waco%20dog%20training%20interest`,
  },
  joinList: {
    label: "Get Keep Waco Wagging updates",
    href: "#updates-signup",
  },
  joinWeekend: {
    label: "Get Keep Waco Wagging updates",
    href: "#updates-signup",
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
    { label: "Summer Daycare Camp", href: "/summer-daycare" },
    { label: "Platinum Pup Event Care", href: "/pet-care/weddings-events" },
    { label: "Dog Walking", href: "/pet-care" },
  ],
} as const;

export type SocialLink = {
  id: string;
  label: string;
  /** Omit or leave undefined until the URL is confirmed live. */
  href?: string;
  external?: boolean;
};

/** Verified Platinum Scoops channel URLs — add entries here as accounts go live. */
const platinumScoopsSocialChannels: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61574612007831",
    external: true,
  },
  {
    id: "instagram",
    label: brandLanguage.instagram.handle,
    href: brandLanguage.instagram.url,
    external: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@platinumscoops",
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@platinumscoops",
    external: true,
  },
  {
    id: "rover",
    label: "Rover",
    href: cityConfig.rover.profileUrl,
    external: true,
  },
  {
    id: "google",
    label: "Google Business Profile",
    href: "https://maps.google.com/maps?cid=14215484891628278653",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${cityConfig.sponsor.email}`,
  },
  {
    id: "phone",
    label: "Phone",
    href: cityConfig.sponsor.phoneHref,
  },
];

/** Returns only social links with a confirmed, non-placeholder URL. */
export function getLiveSocialLinks(links: readonly SocialLink[] = platinumScoopsSocialChannels): SocialLink[] {
  return links.filter(
    (link): link is SocialLink & { href: string } =>
      Boolean(link.href && link.href !== "#"),
  );
}

/** Social + contact links — Platinum Scoops accounts, KWW audience. */
export const socialLinksConfig = {
  sectionTitle: brandLanguage.poweredBy,
  sectionBlurb: brandLanguage.instagram.followLine,
  instagramCta: brandLanguage.instagram.cta,
  links: getLiveSocialLinks(),
} as const;

/** @deprecated Use socialLinksConfig.links */
export const socialLinks = socialLinksConfig.links;
export const monetization = cityConfig.monetization;

export function getAmazonAssociatesTag(): string | undefined {
  return (
    process.env.AMAZON_ASSOCIATES_TAG ||
    cityConfig.monetization.amazonAssociatesTag
  );
}

export function buildAmazonAffiliateUrl(asin?: string): string | undefined {
  const tag = getAmazonAssociatesTag();
  if (!asin || !tag) return undefined;
  return `https://www.amazon.com/dp/${asin}?tag=${tag}`;
}

/** Public Amazon CDN image for an ASIN (no affiliate tag required). */
export function buildAmazonProductImageUrl(
  asin?: string,
  size = 500,
): string | undefined {
  if (!asin) return undefined;
  return `https://m.media-amazon.com/images/P/${asin}.01._SL${size}_.jpg`;
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
