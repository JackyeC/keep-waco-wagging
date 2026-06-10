/**
 * Shared data types for Keep Waco Wagging.
 * These shapes are designed to map cleanly onto a future Supabase/CMS schema.
 */

/** Directory categories surfaced in filters and listing cards. */
export type DirectoryCategory =
  | "Dog-Friendly Patios"
  | "Coffee Shops"
  | "Parks"
  | "Trails"
  | "Pet Stores"
  | "Groomers"
  | "Vets"
  | "Boarding + Daycare"
  | "Dog-Friendly Shopping"
  | "Apartments"
  | "Events"
  | "Pet Services"
  | "Yard Care"
  | "Training";

/** A single dog-friendly place / business in the directory. */
export interface Listing {
  id: string;
  name: string;
  slug: string;
  category: DirectoryCategory;
  area: string; // e.g. "Downtown Waco", "Woodway"
  address: string;
  website?: string;
  phone?: string;
  description: string;
  dogFriendlyNotes: string;
  shadeAvailable: boolean;
  waterAvailable: boolean;
  bestTimeToVisit: string;
  goodForPuppies: boolean;
  goodForReactiveDogs: boolean;
  trainingTip?: string;
  featured: boolean;
  imageUrl?: string;
  tags: string[];
}

/** Lifestyle dog training service offering. */
export interface TrainingService {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  bestFor: string;
  icon: string; // lucide icon key
}

/** Platinum Scoops service offering. */
export interface ScoopsService {
  id: string;
  name: string;
  summary: string;
  icon: string; // lucide icon key
  href?: string;
}

/** Local business spotlight feature. */
export interface BusinessSpotlight {
  id: string;
  slug: string;
  businessName: string;
  ownerOrTeam: string;
  category:
    | "Dog-friendly places"
    | "Pet services"
    | "Local makers"
    | "Restaurants and patios"
    | "Community partners";
  whatTheyOffer: string;
  whyKnowThem: string;
  dogFriendlyDetails: string;
  bestTimeToVisit: string;
  link?: string;
  specialOffer?: string;
  imageUrl?: string;
  featured: boolean;
}

/** Blog post / guide categories. */
export type BlogCategory =
  | "Dog-Friendly Waco"
  | "Training for Real Life"
  | "Yard + Home"
  | "Local Pet Parents"
  | "Events"
  | "Waco Business Spotlights"
  | "Platinum Scoops Tips";

/** Blog post / guide (placeholder content for the MVP). */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  readTime: string;
  date: string; // ISO date
  author: string;
  imageUrl?: string;
  featured?: boolean;
}

/** A block within the "Where to Wag This Weekend" guide. */
export interface WeekendBlock {
  id: string;
  kind:
    | "intro"
    | "events"
    | "patio"
    | "park"
    | "training"
    | "weather"
    | "yard"
    | "shoutout";
  title: string;
  icon: string; // lucide icon key
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** For the "events" block — a small list of items. */
  items?: { name: string; detail: string }[];
}

/** Homepage / global quick-category card. */
export interface CategoryItem {
  label: string;
  description: string;
  href: string;
  icon: string; // lucide icon key
}

/** Where an ad / sponsor slot can render. */
export type AdPlacement =
  | "home"
  | "directory-sidebar"
  | "blog"
  | "blog-sidebar"
  | "weekend"
  | "wag-wall"
  | "pets"
  | "shop"
  | "sponsors";

/**
 * A paid placement / sponsor unit. Empty placements fall back to a "house ad"
 * inviting local businesses to advertise (see AdSlot).
 */
export interface Ad {
  id: string;
  sponsor: string;
  title: string;
  body: string;
  href: string;
  imageUrl?: string;
  /** Small disclosure label shown on the unit. */
  label: "Presenting Sponsor" | "Sponsored" | "Ad";
  placements: AdPlacement[];
  active: boolean;
  /** Higher priority wins when multiple ads target the same placement. */
  priority?: number;
}

export type DogDirectoryListing = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  website?: string;
  neighborhood?: string;
  dogPolicy?: string;
  patioDetails?: string;
  waterBowls?: "yes" | "no" | "unknown";
  shade?: "yes" | "no" | "unknown";
  bestTimeToVisit?: string;
  notes?: string;
  isSponsored?: boolean;
  sponsorTier?: "none" | "basic" | "featured" | "spotlight";
  lastVerified?: string;
  sourceUrls?: string[];
  contactPerson?: string;
  claimListingCta?: string;
  badges?: string[];
};

/** Curated Amazon affiliate product for the Shop page. */
export interface ShopProduct {
  id: string;
  name: string;
  summary: string;
  /** Amazon Standard Identification Number */
  asin: string;
  category: "Walk" | "Home" | "Travel" | "Training" | "Health" | "Fun";
  /** Optional override if not using ASIN-based URL builder */
  href?: string;
  imageUrl?: string;
  /** Why we recommend it — keeps affiliate content trustworthy */
  whyWeLoveIt: string;
  featured?: boolean;
}

export type ProductRecommendation = {
  id: string;
  title: string;
  category: string;
  description: string;
  whyWeLikeIt: string;
  bestFor: string[];
  amazonUrl?: string;
  imageUrl?: string;
  affiliateReady: boolean;
};

/** Client testimonial for training, Rover, or Scoops services. */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: "Training" | "Rover" | "Platinum Scoops" | "General";
  neighborhood?: string;
  featured?: boolean;
  service?: string;
  date?: string;
  permissionStatus?:
    | "public_rover_review"
    | "permission_requested"
    | "approved"
    | "do_not_publish";
}

/** A community pet featured on the showcase ("Wagging Wall"). */
export interface Pet {
  id: string;
  name: string;
  breed: string;
  ageOrStage?: string; // e.g. "2 yrs", "Puppy", "Senior"
  neighborhood: string; // Waco-area neighborhood / city
  ownerName: string;
  bio: string;
  funFact?: string;
  photoUrl?: string;
  /** The current "Pet of the Week". */
  petOfTheWeek?: boolean;
  tags?: string[];
  /** Legacy Wag Wall aliases kept while old routes are redirected/retired. */
  area?: string;
  owner?: string;
  imageUrl?: string;
  featured?: boolean;
}

export type SponsorProspect = {
  id: string;
  name: string;
  category: string;
  publishContactInfo: boolean;
  notes: string;
};
