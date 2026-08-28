/**
 * Central city + site configuration for Keep Waco Wagging.
 *
 * Clone-to-another-city rule: update this file plus the data files in
 * `src/data/`. Do not hide city-specific facts inside components.
 */

/** Reusable brand copy — local dog-parent resource, with Platinum Scoops named honestly. */
export const brandLanguage = {
  primaryName: "Keep Waco Wagging",
  /** Short brand lockup for headers and attribution lines. */
  brandByLine: "Keep Waco Wagging by Platinum Scoops",
  /** Longer relationship line for hero and footer context. */
  brandRelationship:
    "Created by Jackye and Todd, the dog people behind Platinum Scoops — and built to help Waco dog parents, not just our own clients.",
  /** Provider line for boarding/daycare and other pet-care service pages. */
  petCareProvided: "Pet care provided by Platinum Scoops.",
  /** @deprecated Use brandByLine */
  presentedBy: "Keep Waco Wagging by Platinum Scoops",
  poweredBy:
    "Keep Waco Wagging was created by the family behind Platinum Scoops. The site exists to help dog parents — not to sell one business.",
  heroLine: "Give your dog their best Waco life.",
  servicesLine:
    "Poop scooping, boarding, daycare, training, wedding pet attendant services, and summer camp in Waco",
  communityLine:
    "Your dog is family. Find the places, people, services, events, and experiences that make life with them in Waco even better.",
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
    "Keep Waco Wagging helps people who love their dogs like family give them the best life possible in Waco — local places, trusted care, events, and honest guidance for dog parents.",
  publicEmail: "info@keepwacowagging.com",
  keywords: [
    "dog-friendly Waco",
    "dog friendly restaurants Waco",
    "dog parks Waco",
    "dog events Waco",
    "things to do with your dog in Waco",
    "dog boarding Waco TX",
    "dog daycare Waco TX",
    "Waco dog boarding",
    "Waco dog daycare",
    "dog trainer Waco",
    "dog groomer Waco",
    "vet Waco",
    "pet sitter Waco",
    "dog waste removal Waco",
    "poop scooping Waco",
    "Waco pet care",
    "Platinum Scoops",
    "Waco dog training",
    "wedding dog attendant Waco",
    "Waco dog parents",
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
    line: brandLanguage.brandByLine,
    description: brandLanguage.sponsorServices,
    /** Set when `/public/brand/platinum-scoops-logo.webp` is added. */
    logo: undefined as string | undefined,
    website: "https://platinumscoops.com",
    bookingUrl:
      "https://clienthub.getjobber.com/booking/29462df8-88c9-4075-aa13-000fc4c8b80c",
    phoneDisplay: "(254) SCOOPER",
    phoneNumeric: "(254) 726-6737",
    phoneHref: "tel:+12547266737",
    email: "info@keepwacowagging.com",
    pricingNote:
      "Recurring scooping starts at $25/week, with the first cleanup included. No long-term commitment. Cancel anytime.",
  },
  rover: {
    profileUrl:
      "https://www.rover.com/members/jacqueline-todd-c-full-time-pet-care-professionals/",
    /** Personal referral link — gives new Rover clients $40 off their first booking. */
    referralUrl: "https://www.rover.com/sit/jackyc91388",
    rating: "5.0",
    /** Verified public Rover stats — update here only. */
    reviewCount: 125,
    starSitter: true,
    headline: "Full-Time Pet Care Professionals",
    subhead: "Our Empty Nest, Your Dog's Retreat",
    /** New-client Rover referral offer. Update the deadline/terms as Rover changes them. */
    referralOffer: {
      headline: "New to Rover? Get $40 off your first booking.",
      body:
        "Book Jackye for boarding, daycare, or drop-ins through Rover, and new Rover clients get $40 off their first booking.",
      deadline: "2026-09-06",
      terms:
        "Referral credit is only for new Rover customers who sign up through this link. New customers must complete a $20+ booking by September 6, 2026 to redeem the credit. Rules and restrictions apply — see Rover's Referral Terms & Conditions.",
    },
  },
  /**
   * Trust / social-proof numbers used across pet-care landings.
   * Update here only — do not hardcode elsewhere.
   */
  trustSignals: {
    repeatClients: 51,
    /** Leave unchanged until explicitly re-verified. */
    goodPupCertified: true,
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
        alt: "Keep Waco Wagging by Platinum Scoops",
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

/** Dedicated service landing pages — homepage teasers, footer, and /book hub. */
export const servicesNav: NavLink[] = [
  { label: "Poop Scooping", href: "/platinum-scoops" },
  { label: "Dog Boarding", href: "/dog-boarding-waco-tx" },
  { label: "Dog Daycare", href: "/dog-daycare-waco-tx" },
  { label: "Lifestyle Training", href: "/training" },
  { label: "Dog of Honor Wedding Pet Care", href: "/pet-care/weddings-events" },
  { label: "Summer Dog Camp", href: "/summer-daycare" },
];

// Primary nav — dog-parent jobs first (GO / CARE / KNOW / BELONG / SHOP).
export const mainNav: NavLink[] = [
  { label: "Dog-Friendly Waco", href: "/dog-friendly-waco" },
  { label: "Dog Care", href: "/dog-care" },
  { label: "Wag Watch", href: "/wag-watch" },
  { label: "Weekend", href: "/weekend" },
  { label: "Shop", href: "/shop" },
  { label: "Wag Club", href: "/#wag-club" },
];

// Community, booking, and secondary pages — footer and mobile overflow.
export const secondaryNav: NavLink[] = [
  { label: "Dog Care", href: "/dog-care" },
  { label: "Keep Waco Wagging Approved", href: "/approved" },
  { label: "Wag Watch", href: "/wag-watch" },
  { label: "New Dog in Waco", href: "/new-dog-in-waco" },
  { label: "Book a Service", href: "/book" },
  { label: "Summer Dog Camp", href: "/summer-daycare" },
  { label: "Blog", href: "/blog" },
  { label: "Yappy Hours", href: "/yappy-hours" },
  { label: "Waco Dog Weekend", href: "/weekend" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Gear Guide", href: "/gear-guide" },
  { label: "Work With Us", href: "/work-with-us" },
  {
    label: "Rover Profile",
    href: cityConfig.rover.profileUrl,
    external: true,
  },
];

export const ctas = {
  bookService: {
    label: "Book a service",
    href: "/book",
  },
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
    label: "Ask About Wedding Pet Care",
    href: "/pet-care/weddings-events",
  },
  planDogBigDay: {
    label: "Plan My Dog\u2019s Big Day",
    href: "/pet-care/weddings-events#inquiry",
  },
  trainingWaitlist: {
    label: "Join the Training Waitlist",
    href: `mailto:${cityConfig.publicEmail}?subject=Waco%20dog%20training%20interest`,
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
  visitShop: {
    label: "Visit the Shop",
    href: "/shop",
  },
  joinClub: {
    label: "Join the Wag Club",
    href: "/#wag-club",
  },
  wagWatch: {
    label: "Read Wag Watch",
    href: "/wag-watch",
  },
  weekendGuide: {
    label: "This weekend",
    href: "/weekend",
  },
  approved: {
    label: "What Approved means",
    href: "/approved",
  },
  newDog: {
    label: "New dog in Waco",
    href: "/new-dog-in-waco",
  },
  shopDrop: {
    label: "Shop the Drop",
    href: "/shop#featured",
  },
  gearGuide: {
    label: "Gear Guide",
    href: "/gear-guide",
  },
  /** @deprecated Use visitShop */
  shopGear: {
    label: "Visit the Shop",
    href: "/shop",
  },
  // Backward-compatible aliases used by older components/pages.
  bookTraining: {
    label: "Ask About Lifestyle Support",
    href: `mailto:${cityConfig.publicEmail}?subject=Lifestyle%20dog%20support`,
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
    { label: "Dog Boarding", href: "/dog-boarding-waco-tx" },
    { label: "Dog Daycare", href: "/dog-daycare-waco-tx" },
    { label: "Summer Daycare Camp", href: "/summer-daycare" },
    { label: "Dog of Honor Wedding Pet Care", href: "/pet-care/weddings-events" },
    { label: "Dog Walking", href: "/dog-daycare-waco-tx" },
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
    href: `mailto:${cityConfig.publicEmail}`,
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

/**
 * Sage announcement bar — club-first rotating messages.
 * Edit copy here without touching the component. Keep messages short and
 * grounded (no invented promotions or donation percentages).
 */
export const announcementBar = {
  enabled: true,
  messages: [
    "Give your dog their best Waco life.",
    "Dogs allowed isn't the same as a good outing.",
    "Free local Waco pickup · Ships nationwide",
  ],
  showHeart: false,
} as const;

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
