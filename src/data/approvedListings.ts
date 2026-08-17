/**
 * Keep Waco Wagging Approved — evaluation data model + Phase 1 data.
 *
 * PROTECTING THE STANDARD
 * - Nothing is "Keep Waco Wagging Approved" until Keep Waco Wagging has enough
 *   evidence to evaluate it. New places default to `evaluationStatus: "pending"`
 *   ("Not Yet Evaluated") and must NOT display an approval verdict.
 * - Community recommendations are stored as `communityReport` sources — never
 *   treated as verified facts.
 * - Attribute evidence can be "verified" | "reported" | "unknown". Unknown is
 *   acceptable; inventing an answer is not.
 * - Public-facing name is always "Keep Waco Wagging Approved" — never shortened.
 *
 * The fictional entries flagged `isSample: true` are CLEARLY LABELED layout
 * placeholders (they demonstrate how an EVALUATED listing will look). The real
 * community-sourced candidates are included as `pending` leads only — no ratings
 * have been assigned to them yet.
 */

/** Has Keep Waco Wagging evaluated this place yet? */
export type EvaluationStatus = "pending" | "evaluated";

/** Public verdict — only meaningful once `evaluationStatus === "evaluated"`. */
export type PublicStatus = "approved" | "cautions" | "not_recommended";

/** How well-supported a specific attribute is. Unknown is always acceptable. */
export type EvidenceStatus = "verified" | "reported" | "unknown";

/** Two top-level content groups. */
export type ListingGroup = "explore" | "resources";

export type Availability = "yes" | "no" | "unknown";
export type WelcomeScore = "Excellent" | "Good" | "Limited" | "Poor";
export type SafetyScore = "Excellent" | "Good" | "Use Caution" | "Poor";
export type ShadeLevel = "Full" | "Partial" | "Minimal" | "None";
export type GroundSurface = "Grass" | "Concrete" | "Asphalt" | "Mixed";
export type NoiseLevel = "Low" | "Moderate" | "High";
export type CrowdLevel = "Light" | "Moderate" | "Heavy";
export type DogTrafficLevel = "Low" | "Moderate" | "Heavy";

/** Categories for "Explore Waco With Your Dog". */
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
  | "Market"
  | "Patio / Nightlife"
  | "Other";

/** Service categories for "Waco Dog Resources" (not places you recreate WITH your dog). */
export type ResourceType =
  | "Groomer"
  | "Mobile Grooming"
  | "Veterinarian"
  | "Emergency Vet"
  | "Training"
  | "Boarding"
  | "Daycare"
  | "Pet Store"
  | "Rescue";

/** Source provenance. Community reports are leads, not verified facts. */
export type SourceType =
  | "officialWebsite"
  | "officialDogPolicy"
  | "officialSocialMedia"
  | "cityGovernment"
  | "eventOrganizer"
  | "reputableLocalMedia"
  | "communityReport"
  | "thirdPartyDirectory"
  | "kwwVisit";

export const sourceTypeLabels: Record<SourceType, string> = {
  officialWebsite: "Official website",
  officialDogPolicy: "Official dog policy",
  officialSocialMedia: "Official social media",
  cityGovernment: "City government",
  eventOrganizer: "Event organizer",
  reputableLocalMedia: "Local media",
  communityReport: "Community report",
  thirdPartyDirectory: "Third-party directory",
  kwwVisit: "Keep Waco Wagging visit",
};

export type Source = {
  type: SourceType;
  url?: string;
  /** What claim this source supports. */
  supports?: string;
  dateChecked?: string;
  publicationDate?: string;
  notes?: string;
};

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
  group: ListingGroup;
  category?: ApprovedCategory;
  resourceType?: ResourceType;
  address?: string;
  city: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  mapUrl?: string;

  /** Defaults to "pending". A verdict is only shown when "evaluated". */
  evaluationStatus: EvaluationStatus;
  /** The public verdict — set only once evaluated. */
  status?: PublicStatus;

  /** Neutral one-liner. For pending leads, describe the lead, not a verdict. */
  shortSummary: string;
  /** Full Wag Report — only written once evaluated. */
  fullReview?: string;

  // Dog policy + access (evidence-tracked; unknown is allowed)
  dogPolicy?: string;
  dogPolicyEvidence?: EvidenceStatus;
  leashRequired?: Availability;
  indoorDogs?: Availability;
  outdoorDogs?: Availability;

  // Comfort / safety (optional until researched)
  welcomeScore?: WelcomeScore;
  safetyScore?: SafetyScore;
  shade?: ShadeLevel;
  shadeEvidence?: EvidenceStatus;
  water?: Availability;
  waterEvidence?: EvidenceStatus;
  pottyAccess?: Availability;
  wasteStation?: Availability;
  groundSurface?: GroundSurface;
  noise?: NoiseLevel;
  crowds?: CrowdLevel;
  dogTraffic?: DogTrafficLevel;
  trafficExposure?: "Low" | "Moderate" | "High" | "unknown";
  fencing?: Availability;

  // Off-leash areas are evaluated separately and may be a caution (not an Extra Wag)
  offLeashArea?: boolean;
  offLeashCaution?: string;

  // Guidance (only once evaluated)
  bestFor?: DogTrait[];
  notIdealFor?: DogTrait[];
  whatWeLove?: string[];
  cautions?: string[];
  extraWag?: string[];
  bestTime?: string;
  avoid?: string;
  crowdWarning?: string;
  heatWarning?: string;

  // Trust / verification
  sources: Source[];
  researchedDate?: string;
  verifiedDate?: string;
  personallyVisited: boolean;

  featuredImage?: { src: string; alt: string };
  event?: ApprovedEventDetails;

  /** True for fictional layout placeholders. */
  isSample?: boolean;
};

/** Display config for the three public verdicts. */
export const statusConfig: Record<
  PublicStatus,
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

/** How a not-yet-evaluated lead is labeled — never an approval seal. */
export const pendingConfig = {
  label: "Dog-Friendly Lead",
  note: "Keep Waco Wagging evaluation in progress",
} as const;

export const exploreCategories: ApprovedCategory[] = [
  "Restaurant",
  "Brewery",
  "Coffee",
  "Park",
  "Trail",
  "Store",
  "Hotel",
  "Attraction",
  "Event",
  "Market",
  "Patio / Nightlife",
  "Other",
];

export const resourceTypes: ResourceType[] = [
  "Groomer",
  "Mobile Grooming",
  "Veterinarian",
  "Emergency Vet",
  "Training",
  "Boarding",
  "Daycare",
  "Pet Store",
  "Rescue",
];

/**
 * SAMPLE listings (fictional, isSample) show how an EVALUATED listing will look.
 * Real community-sourced candidates below are `pending` leads only.
 */
export const approvedListings: ApprovedListing[] = [
  // ---- Sample EVALUATED listings (fictional placeholders) ----
  {
    id: "sample-cedar-bark-brewing",
    slug: "sample-cedar-bark-brewing",
    name: "Cedar & Bark Brewing (Sample)",
    group: "explore",
    category: "Brewery",
    address: "100 Example Ave., Waco, TX 76701",
    city: "Waco",
    evaluationStatus: "evaluated",
    status: "approved",
    shortSummary:
      "Spacious shaded beer garden with water bowls and enough room to keep dogs from being nose-to-nose.",
    fullReview:
      "This is a sample listing used to preview the layout of an evaluated report. In a real Keep Waco Wagging Approved report, this is where we'd describe the whole experience in plain language: how genuinely dogs are welcomed, whether there's room to settle without crowding, shade and water, and when we'd choose to visit during a Central Texas summer.",
    dogPolicy: "Dogs welcome in the outdoor beer garden; leashed.",
    dogPolicyEvidence: "verified",
    leashRequired: "yes",
    indoorDogs: "no",
    outdoorDogs: "yes",
    welcomeScore: "Excellent",
    safetyScore: "Good",
    shade: "Partial",
    shadeEvidence: "verified",
    water: "yes",
    waterEvidence: "verified",
    pottyAccess: "yes",
    wasteStation: "yes",
    groundSurface: "Mixed",
    noise: "Moderate",
    crowds: "Moderate",
    dogTraffic: "Moderate",
    fencing: "yes",
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
    extraWag: ["Pup cups", "Occasional rescue adoption events"],
    bestTime: "Weekday afternoons and early evenings.",
    avoid: "Peak summer afternoons on the gravel side.",
    crowdWarning: "Friday and Saturday evenings can be busy.",
    heatWarning:
      "Gravel and patio areas get hot midday — choose shaded grass seating or come morning/evening in summer.",
    sources: [
      {
        type: "officialWebsite",
        notes: "Sample listing for layout preview — not a real evaluation.",
      },
    ],
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
    group: "explore",
    category: "Park",
    address: "200 Example Park Rd., Waco, TX 76708",
    city: "Waco",
    evaluationStatus: "evaluated",
    status: "approved",
    shortSummary:
      "Grassy, tree-lined loop with plenty of room for leashed walks and sniffs.",
    fullReview:
      "Sample listing for layout preview. A real report here would cover the walking surface, shade along the loop, distance from vehicle traffic, and how comfortable the space is for dogs who need room from others.",
    dogPolicy: "Leashed dogs welcome throughout.",
    dogPolicyEvidence: "verified",
    leashRequired: "yes",
    indoorDogs: "no",
    outdoorDogs: "yes",
    welcomeScore: "Good",
    safetyScore: "Good",
    shade: "Partial",
    shadeEvidence: "verified",
    water: "no",
    waterEvidence: "verified",
    pottyAccess: "yes",
    wasteStation: "yes",
    groundSurface: "Grass",
    noise: "Low",
    crowds: "Light",
    dogTraffic: "Low",
    fencing: "no",
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
    sources: [
      {
        type: "officialWebsite",
        notes: "Sample listing for layout preview — not a real evaluation.",
      },
    ],
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
    group: "explore",
    category: "Coffee",
    address: "300 Example St., Waco, TX 76706",
    city: "Waco",
    evaluationStatus: "evaluated",
    status: "cautions",
    shortSummary:
      "Cute patio coffee stop, but it's small and fills up fast on weekends.",
    fullReview:
      "Sample listing for layout preview. This example shows the \u201cDogs Allowed, With Cautions\u201d verdict: dogs are welcome on a small patio, but limited space and weekend crowds mean it's better suited to calm, confident dogs at off-peak times.",
    dogPolicy: "Leashed dogs welcome on the patio.",
    dogPolicyEvidence: "verified",
    leashRequired: "yes",
    indoorDogs: "no",
    outdoorDogs: "yes",
    welcomeScore: "Good",
    safetyScore: "Use Caution",
    shade: "Minimal",
    shadeEvidence: "verified",
    water: "unknown",
    waterEvidence: "unknown",
    pottyAccess: "no",
    wasteStation: "no",
    groundSurface: "Concrete",
    noise: "Moderate",
    crowds: "Heavy",
    dogTraffic: "Moderate",
    fencing: "no",
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
    sources: [
      {
        type: "officialWebsite",
        notes: "Sample listing for layout preview — not a real evaluation.",
      },
    ],
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
    group: "explore",
    category: "Store",
    address: "400 Example Blvd., Waco, TX 76701",
    city: "Waco",
    evaluationStatus: "evaluated",
    status: "approved",
    shortSummary:
      "Air-conditioned indoor shopping where leashed, well-mannered dogs are genuinely welcome.",
    fullReview:
      "Sample listing for layout preview. A real report would note indoor climate control (a big deal in summer), aisle width for maneuvering with a leash, and whether staff are truly comfortable with dogs inside.",
    dogPolicy: "Leashed dogs welcome inside on a short lead.",
    dogPolicyEvidence: "verified",
    leashRequired: "yes",
    indoorDogs: "yes",
    outdoorDogs: "yes",
    welcomeScore: "Excellent",
    safetyScore: "Good",
    shade: "Full",
    shadeEvidence: "verified",
    water: "yes",
    waterEvidence: "verified",
    pottyAccess: "no",
    wasteStation: "no",
    groundSurface: "Concrete",
    noise: "Low",
    crowds: "Light",
    dogTraffic: "Low",
    fencing: "no",
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
    sources: [
      {
        type: "officialWebsite",
        notes: "Sample listing for layout preview — not a real evaluation.",
      },
    ],
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
    group: "explore",
    category: "Event",
    address: "Example Plaza, Waco, TX 76701",
    city: "Waco",
    evaluationStatus: "evaluated",
    status: "not_recommended",
    shortSummary:
      "Loud, crowded, and hot — a fun event for people, but not a good outing for dogs.",
    fullReview:
      "Sample listing for layout preview showing the \u201cNot Recommended for Dogs\u201d verdict. Even though the event is billed as pet friendly, fireworks, dense crowds, and hot pavement make it stressful and unsafe for most dogs. We would leave the pups home for this one.",
    dogPolicy: "Organizer says pet friendly, but conditions are unsafe for dogs.",
    dogPolicyEvidence: "reported",
    leashRequired: "yes",
    indoorDogs: "no",
    outdoorDogs: "yes",
    welcomeScore: "Limited",
    safetyScore: "Poor",
    shade: "None",
    shadeEvidence: "verified",
    water: "no",
    waterEvidence: "verified",
    pottyAccess: "no",
    wasteStation: "no",
    groundSurface: "Asphalt",
    noise: "High",
    crowds: "Heavy",
    dogTraffic: "Heavy",
    fencing: "no",
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
    sources: [
      {
        type: "eventOrganizer",
        notes: "Sample listing for layout preview — not a real evaluation.",
      },
    ],
    researchedDate: "2026-08-17",
    verifiedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/pool-pack.webp",
      alt: "Placeholder image for a sample event listing",
    },
    isSample: true,
  },

  // ---- Real community-sourced PENDING candidates (leads only — NOT rated) ----
  {
    id: "cameron-park",
    slug: "cameron-park",
    name: "Cameron Park",
    group: "explore",
    category: "Park",
    address: "2601 N. University Parks Dr., Waco, TX 76708",
    city: "Waco",
    website:
      "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park",
    evaluationStatus: "pending",
    shortSummary:
      "Community favorite riverside park with miles of trails — a strong candidate we still need to evaluate in person for shade, water, and traffic exposure.",
    dogPolicy: "City rules state pets must be leashed at all times.",
    dogPolicyEvidence: "reported",
    leashRequired: "yes",
    sources: [
      {
        type: "cityGovernment",
        url: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules",
        supports: "Leashed dogs allowed on the trail system",
        dateChecked: "2026-08-17",
      },
      {
        type: "communityReport",
        supports: "Local Facebook commenters recommend it for dogs",
        dateChecked: "2026-08-17",
        notes: "Community lead — not verified by Keep Waco Wagging.",
      },
    ],
    researchedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/community-walk.webp",
      alt: "Placeholder image for a park candidate pending evaluation",
    },
  },
  {
    id: "billy-bobs-burgers-hewitt",
    slug: "billy-bobs-burgers-hewitt",
    name: "Billy Bob's Burgers (Hewitt)",
    group: "explore",
    category: "Restaurant",
    address: "899 S. Hewitt Dr., Hewitt, TX 76643",
    city: "Hewitt",
    website: "https://www.billybobsburgerstx.com",
    evaluationStatus: "pending",
    shortSummary:
      "A community member reports an enclosed dog-friendly patio and treats on hand — a lead we still need to research before recommending.",
    dogPolicy: "Reported dog-friendly patio; policy not yet verified by us.",
    dogPolicyEvidence: "reported",
    sources: [
      {
        type: "communityReport",
        supports:
          "Facebook commenter says the Hewitt patio is enclosed, pet friendly, and keeps treats stocked",
        dateChecked: "2026-08-17",
        notes:
          "Community lead only — enclosed patio, treats, and current policy still need to be researched.",
      },
      {
        type: "thirdPartyDirectory",
        url: "https://www.bringfido.com/restaurant/83643",
        supports: "Listed as dog-friendly patio",
        dateChecked: "2026-08-17",
      },
      {
        type: "officialWebsite",
        url: "https://www.billybobsburgerstx.com/contact-pages/contact-v1",
        supports: "Confirms Hewitt location and address",
        dateChecked: "2026-08-17",
      },
    ],
    researchedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/boarding-backyard.webp",
      alt: "Placeholder image for a restaurant candidate pending evaluation",
    },
  },
  {
    id: "freight-waco",
    slug: "freight-waco",
    name: "Freight",
    group: "explore",
    category: "Patio / Nightlife",
    address: "1613 James Ave., Waco, TX 76706",
    city: "Waco",
    website: "https://www.freightwaco.com",
    evaluationStatus: "pending",
    shortSummary:
      "Outdoor bar with an optional fenced off-leash area. We'll evaluate the regular leashed experience separately from the off-leash area before recommending.",
    dogPolicy:
      "Official site says leashed dogs are welcome throughout, with a fenced in-venue off-leash area.",
    dogPolicyEvidence: "reported",
    leashRequired: "yes",
    outdoorDogs: "yes",
    offLeashArea: true,
    offLeashCaution:
      "The optional off-leash area is not automatically a plus — it can mean uncontrolled dog interaction, size mismatches, overstimulation, and unknown vaccination status. We'll assess the leashed experience separately.",
    sources: [
      {
        type: "officialDogPolicy",
        url: "https://www.freightwaco.com/dogs",
        supports: "States leashed dogs welcome + fenced in-venue dog area",
        dateChecked: "2026-08-17",
      },
      {
        type: "thirdPartyDirectory",
        url: "https://destinationwaco.org/places/freight-bar/",
        supports: "Confirms address and dog-friendly framing",
        dateChecked: "2026-08-17",
      },
    ],
    researchedDate: "2026-08-17",
    personallyVisited: false,
    featuredImage: {
      src: "/pictures/hero-group-walk.webp",
      alt: "Placeholder image for a bar candidate pending evaluation",
    },
  },
  {
    id: "woof-gang-bakery-grooming-waco",
    slug: "woof-gang-bakery-grooming-waco",
    name: "Woof Gang Bakery & Grooming",
    group: "resources",
    resourceType: "Groomer",
    address: "1201 Hewitt Dr., Ste. 205, Waco, TX 76712",
    city: "Waco",
    website: "https://woofgangbakery.com/pages/locations/waco",
    evaluationStatus: "pending",
    shortSummary:
      "Full-service dog grooming and pet store — a Waco Dog Resource, not a recreation outing.",
    sources: [
      {
        type: "officialWebsite",
        url: "https://woofgangbakery.com/pages/locations/waco",
        supports: "Full-service grooming + pet store, Waco location",
        dateChecked: "2026-08-17",
      },
    ],
    researchedDate: "2026-08-17",
    personallyVisited: false,
  },
];

export function getApprovedListingBySlug(slug: string): ApprovedListing | undefined {
  return approvedListings.find((listing) => listing.slug === slug);
}

export function getApprovedListingsByGroup(group: ListingGroup): ApprovedListing[] {
  return approvedListings.filter((listing) => listing.group === group);
}

/** True while every entry is still a sample or a pending lead (no real approvals). */
export const approvedHasRealVerdicts = approvedListings.some(
  (l) => !l.isSample && l.evaluationStatus === "evaluated",
);
