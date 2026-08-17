/**
 * Keep Waco Wagging Approved — data model + Phase 1 sample data.
 *
 * IMPORTANT: The listings in this file are CLEARLY LABELED SAMPLE PLACEHOLDERS
 * for layout/development only (isSample: true). They are fictional and are NOT
 * real evaluations of real businesses. Do not present them as real Keep Waco
 * Wagging Approved ratings. Real, researched listings replace these in a later
 * phase.
 *
 * Public-facing name is always "Keep Waco Wagging Approved" — never shorten it
 * in customer-facing copy.
 */

/** Public status for every listing. */
export type ApprovedStatus = "approved" | "cautions" | "not_recommended";

export type WelcomeScore = "Excellent" | "Good" | "Limited" | "Poor";
export type SafetyScore = "Excellent" | "Good" | "Use Caution" | "Poor";
export type ShadeLevel = "Full" | "Partial" | "Minimal" | "None";
export type GroundSurface = "Grass" | "Concrete" | "Asphalt" | "Mixed";
export type NoiseLevel = "Low" | "Moderate" | "High";
export type CrowdLevel = "Light" | "Moderate" | "Heavy";
export type DogTrafficLevel = "Low" | "Moderate" | "Heavy";
export type Availability = "yes" | "no" | "unknown";

export type ApprovedCategory =
  | "Restaurant"
  | "Brewery"
  | "Coffee"
  | "Park"
  | "Trail"
  | "Store"
  | "Hotel"
  | "Attraction"
  | "Event"
  | "Other";

/** Controlled vocabulary for dog personality/fit tags. */
export const dogTraits = [
  "Social Dogs",
  "Confident Dogs",
  "Shy Dogs",
  "Reactive Dogs",
  "Senior Dogs",
  "Puppies",
  "Small Dogs",
  "Large Dogs",
  "Low-Energy Dogs",
  "High-Energy Dogs",
] as const;
export type DogTrait = (typeof dogTraits)[number];

/** Optional event-specific detail (used more fully in Phase 4). */
export type ApprovedEventDetails = {
  date?: string;
  startTime?: string;
  endTime?: string;
  expectedCrowd?: string;
  loudMusic?: boolean;
  fireworks?: boolean;
  parade?: boolean;
  food?: boolean;
  otherAnimals?: boolean;
  weatherNotes?: string;
};

export type ApprovedListing = {
  id: string;
  slug: string;
  name: string;
  category: ApprovedCategory;
  address?: string;
  city: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  mapUrl?: string;

  status: ApprovedStatus;
  shortSummary: string;
  fullReview: string;

  // Core rating dimensions
  welcomeScore: WelcomeScore;
  safetyScore: SafetyScore;
  shade: ShadeLevel;
  water: Availability;
  pottyAccess: Availability;
  wasteStation: Availability;
  groundSurface: GroundSurface;
  noise: NoiseLevel;
  crowds: CrowdLevel;
  dogTraffic: DogTrafficLevel;
  indoorDogs: boolean;
  outdoorDogs: boolean;
  fenced: boolean;

  // Guidance
  bestFor: DogTrait[];
  notIdealFor: DogTrait[];
  whatWeLove: string[];
  cautions: string[];
  extraWag: string[];
  bestTime?: string;
  avoid?: string;
  crowdWarning?: string;
  heatWarning?: string;

  // Verification / trust
  sources: string[];
  researchedDate?: string;
  verifiedDate?: string;
  personallyVisited: boolean;

  // Presentation
  featuredImage?: { src: string; alt: string };

  // Event-only
  event?: ApprovedEventDetails;

  /** True for Phase 1 placeholder listings. Never ship real ratings as samples. */
  isSample?: boolean;
};

/** Display config for the three public statuses. */
export const statusConfig: Record<
  ApprovedStatus,
  { label: string; short: string; icon: "check" | "caution" | "no" }
> = {
  approved: {
    label: "Keep Waco Wagging Approved",
    short: "Approved",
    icon: "check",
  },
  cautions: {
    label: "Dogs Allowed, With Cautions",
    short: "With Cautions",
    icon: "caution",
  },
  not_recommended: {
    label: "Not Recommended for Dogs",
    short: "Not Recommended",
    icon: "no",
  },
};

export const approvedCategories: ApprovedCategory[] = [
  "Restaurant",
  "Brewery",
  "Coffee",
  "Park",
  "Trail",
  "Store",
  "Hotel",
  "Attraction",
  "Event",
  "Other",
];

/**
 * PHASE 1 SAMPLE LISTINGS — fictional placeholders only (isSample: true).
 * Names, addresses, and ratings are invented for layout preview and do NOT
 * describe any real business.
 */
export const approvedListings: ApprovedListing[] = [
  {
    id: "sample-cedar-bark-brewing",
    slug: "sample-cedar-bark-brewing",
    name: "Cedar & Bark Brewing (Sample)",
    category: "Brewery",
    address: "100 Example Ave., Waco, TX 76701",
    city: "Waco",
    website: undefined,
    status: "approved",
    shortSummary:
      "Spacious shaded beer garden with water bowls and enough room to keep dogs from being nose-to-nose.",
    fullReview:
      "This is a sample listing used to preview the layout. In a real Keep Waco Wagging Approved report, this is where we'd describe the whole experience in plain language: how genuinely dogs are welcomed, whether there's room to settle without crowding, shade and water, and when we'd choose to visit during a Central Texas summer.",
    welcomeScore: "Excellent",
    safetyScore: "Good",
    shade: "Partial",
    water: "yes",
    pottyAccess: "yes",
    wasteStation: "yes",
    groundSurface: "Mixed",
    noise: "Moderate",
    crowds: "Moderate",
    dogTraffic: "Moderate",
    indoorDogs: false,
    outdoorDogs: true,
    fenced: true,
    bestFor: ["Social Dogs", "Confident Dogs", "Large Dogs"],
    notIdealFor: ["Reactive Dogs", "Shy Dogs"],
    whatWeLove: [
      "Wide-set picnic tables give dogs personal space",
      "Water bowls kept full near the entrance",
      "Staff greet dogs by name",
    ],
    cautions: [
      "Live-music nights get loud and busy",
      "Part of the yard is gravel that heats up midday",
    ],
    extraWag: ["Pup cups", "Fenced yard", "Occasional rescue adoption events"],
    bestTime: "Weekday afternoons and early evenings.",
    avoid: "Peak summer afternoons on the gravel side.",
    crowdWarning: "Friday and Saturday evenings can be busy.",
    heatWarning:
      "Gravel and patio areas get hot midday — choose shaded grass seating or come morning/evening in summer.",
    sources: ["Sample listing for layout preview — not a real evaluation."],
    researchedDate: "2026-08-17",
    verifiedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/hero-group-walk.webp",
      alt: "Placeholder image for a sample brewery listing",
    },
    isSample: true,
  },
  {
    id: "sample-riverbend-community-park",
    slug: "sample-riverbend-community-park",
    name: "Riverbend Community Park (Sample)",
    category: "Park",
    address: "200 Example Park Rd., Waco, TX 76708",
    city: "Waco",
    status: "approved",
    shortSummary:
      "Grassy, tree-lined loop with plenty of room for leashed walks and sniffs.",
    fullReview:
      "Sample listing for layout preview. A real report here would cover the walking surface, shade along the loop, distance from vehicle traffic, and how comfortable the space is for dogs who need room from others.",
    welcomeScore: "Good",
    safetyScore: "Good",
    shade: "Partial",
    water: "no",
    pottyAccess: "yes",
    wasteStation: "yes",
    groundSurface: "Grass",
    noise: "Low",
    crowds: "Light",
    dogTraffic: "Low",
    indoorDogs: false,
    outdoorDogs: true,
    fenced: false,
    bestFor: ["Senior Dogs", "Shy Dogs", "Low-Energy Dogs", "Puppies"],
    notIdealFor: ["High-Energy Dogs"],
    whatWeLove: [
      "Quiet, grassy loop with easy distance from other dogs",
      "Waste stations at both trailheads",
    ],
    cautions: [
      "No drinking water on site — bring your own",
      "One edge of the loop runs near a road",
    ],
    extraWag: ["Shaded benches", "Wide grassy relief areas"],
    bestTime: "Mornings and evenings year-round.",
    heatWarning: "Bring water — there is none on site, and midday sun is strong.",
    sources: ["Sample listing for layout preview — not a real evaluation."],
    researchedDate: "2026-08-17",
    verifiedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/community-walk.webp",
      alt: "Placeholder image for a sample park listing",
    },
    isSample: true,
  },
  {
    id: "sample-grounds-and-hounds-coffee",
    slug: "sample-grounds-and-hounds-coffee",
    name: "Grounds & Hounds Coffee (Sample)",
    category: "Coffee",
    address: "300 Example St., Waco, TX 76706",
    city: "Waco",
    status: "cautions",
    shortSummary:
      "Cute patio coffee stop, but it's small and fills up fast on weekends.",
    fullReview:
      "Sample listing for layout preview. This example shows the \u201cDogs Allowed, With Cautions\u201d status: dogs are welcome on a small patio, but limited space and weekend crowds mean it's better suited to calm, confident dogs at off-peak times.",
    welcomeScore: "Good",
    safetyScore: "Use Caution",
    shade: "Minimal",
    water: "unknown",
    pottyAccess: "no",
    wasteStation: "no",
    groundSurface: "Concrete",
    noise: "Moderate",
    crowds: "Heavy",
    dogTraffic: "Moderate",
    indoorDogs: false,
    outdoorDogs: true,
    fenced: false,
    bestFor: ["Confident Dogs", "Small Dogs", "Low-Energy Dogs"],
    notIdealFor: ["Reactive Dogs", "Large Dogs", "Puppies"],
    whatWeLove: ["Friendly to leashed dogs on the patio", "Quick, easy stop"],
    cautions: [
      "Small concrete patio with tables close together",
      "Weekend mornings get crowded",
      "Little shade and no dedicated potty area",
    ],
    extraWag: ["Occasional pup treats at the counter"],
    bestTime: "Weekday mornings before the rush.",
    avoid: "Weekend mid-mornings.",
    crowdWarning: "Saturday and Sunday mornings can be shoulder-to-shoulder.",
    heatWarning:
      "The concrete patio has little shade — it can get hot for paws on summer afternoons.",
    sources: ["Sample listing for layout preview — not a real evaluation."],
    researchedDate: "2026-08-17",
    verifiedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/boarding-backyard.webp",
      alt: "Placeholder image for a sample coffee shop listing",
    },
    isSample: true,
  },
  {
    id: "sample-market-street-boutiques",
    slug: "sample-market-street-boutiques",
    name: "Market Street Boutiques (Sample)",
    category: "Store",
    address: "400 Example Blvd., Waco, TX 76701",
    city: "Waco",
    status: "approved",
    shortSummary:
      "Air-conditioned indoor shopping where leashed, well-mannered dogs are genuinely welcome.",
    fullReview:
      "Sample listing for layout preview. A real report would note indoor climate control (a big deal in summer), aisle width for maneuvering with a leash, and whether staff are truly comfortable with dogs inside.",
    welcomeScore: "Excellent",
    safetyScore: "Good",
    shade: "Full",
    water: "yes",
    pottyAccess: "no",
    wasteStation: "no",
    groundSurface: "Concrete",
    noise: "Low",
    crowds: "Light",
    dogTraffic: "Low",
    indoorDogs: true,
    outdoorDogs: true,
    fenced: false,
    bestFor: ["Small Dogs", "Senior Dogs", "Shy Dogs", "Low-Energy Dogs"],
    notIdealFor: ["High-Energy Dogs"],
    whatWeLove: [
      "Indoor air conditioning — a summer lifesaver",
      "Wide aisles are easy to navigate on-leash",
      "Water bowl near the entrance",
    ],
    cautions: [
      "Polished floors can be slippery for some dogs",
      "No indoor potty area — walk before you shop",
    ],
    extraWag: ["Dog treats at checkout", "Dog-themed gifts"],
    bestTime: "Any time — indoor comfort year-round.",
    sources: ["Sample listing for layout preview — not a real evaluation."],
    researchedDate: "2026-08-17",
    verifiedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/summer-camp-hero.webp",
      alt: "Placeholder image for a sample store listing",
    },
    isSample: true,
  },
  {
    id: "sample-downtown-fireworks-festival",
    slug: "sample-downtown-fireworks-festival",
    name: "Downtown Fireworks Festival (Sample)",
    category: "Event",
    address: "Example Plaza, Waco, TX 76701",
    city: "Waco",
    status: "not_recommended",
    shortSummary:
      "Loud, crowded, and hot — a fun event for people, but not a good outing for dogs.",
    fullReview:
      "Sample listing for layout preview showing the \u201cNot Recommended for Dogs\u201d status. Even though the event is billed as pet friendly, fireworks, dense crowds, and hot pavement make it stressful and unsafe for most dogs. We would leave the pups home for this one.",
    welcomeScore: "Limited",
    safetyScore: "Poor",
    shade: "None",
    water: "no",
    pottyAccess: "no",
    wasteStation: "no",
    groundSurface: "Asphalt",
    noise: "High",
    crowds: "Heavy",
    dogTraffic: "Heavy",
    indoorDogs: false,
    outdoorDogs: true,
    fenced: false,
    bestFor: [],
    notIdealFor: [
      "Reactive Dogs",
      "Shy Dogs",
      "Senior Dogs",
      "Puppies",
      "Small Dogs",
    ],
    whatWeLove: ["Great community event — for the humans"],
    cautions: [
      "Fireworks and loud music",
      "Dense crowds with little room to move",
      "Hot asphalt with no shade",
      "No water or potty areas set up for dogs",
    ],
    extraWag: [],
    bestTime: "Leave dogs at home; enjoy this one solo.",
    avoid: "Bringing any dog, especially noise-sensitive dogs.",
    heatWarning:
      "Evening asphalt stays hot and there is no shade or water — unsafe for paws and prone to overheating.",
    event: {
      date: "Sample date",
      startTime: "6:00 PM",
      endTime: "11:00 PM",
      expectedCrowd: "Large",
      loudMusic: true,
      fireworks: true,
      parade: false,
      food: true,
      otherAnimals: true,
      weatherNotes: "Hot summer evening; asphalt retains heat after sunset.",
    },
    sources: ["Sample listing for layout preview — not a real evaluation."],
    researchedDate: "2026-08-17",
    verifiedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/pool-pack.webp",
      alt: "Placeholder image for a sample event listing",
    },
    isSample: true,
  },
];

export function getApprovedListingBySlug(slug: string): ApprovedListing | undefined {
  return approvedListings.find((listing) => listing.slug === slug);
}

/** True while the directory is showing sample placeholders (Phase 1). */
export const approvedIsPreview = approvedListings.every((l) => l.isSample);
