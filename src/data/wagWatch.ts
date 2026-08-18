/**
 * Wag Watch — structured, timely content for Waco dog parents.
 *
 * "What Waco dog parents need to know right now." This is NOT a generic blog;
 * it surfaces useful, timely info that may change what a dog parent does.
 *
 * TRUST RULES:
 * - Do not invent news. Every published item must be backed by real sources.
 * - Items marked `draft: true` are UNPUBLISHED and must never appear on public
 *   pages (filtered out by getPublishedWagWatch / getPublishedWagWatchBySlug).
 * - Show dates; keep sources; make old info easy to identify (expiresAt).
 *
 * The sample items below are intentionally left as drafts (unpublished)
 * placeholders so the system is fully built without publishing invented news.
 */

export type WagWatchCategory =
  | "Waco"
  | "McLennan County"
  | "Texas"
  | "Federal"
  | "Health & Safety"
  | "Recall"
  | "Travel"
  | "Animal Welfare"
  | "Money Saver"
  | "New & Noteworthy";

export type WagWatchUrgency =
  | "FYI"
  | "Good to Know"
  | "Act Soon"
  | "Important Alert";

export type WagWatchItem = {
  id: string;
  slug: string;
  headline: string;
  shortSummary: string;
  /** Structured article sections — only rendered when present. */
  whatHappened?: string;
  whyCare?: string;
  whatToDo?: string;
  wacoAngle?: string;
  category: WagWatchCategory;
  geographicScope?: string;
  publishedDate: string;
  updatedDate?: string;
  sourceUrls?: string[];
  sourceNames?: string[];
  actionLabel?: string;
  actionUrl?: string;
  urgency: WagWatchUrgency;
  featured?: boolean;
  /** ISO date after which the item is considered stale and hidden from public. */
  expiresAt?: string;
  relatedDirectorySlug?: string;
  relatedEventSlug?: string;
  image?: { src: string; alt: string };
  /** When true, the item is UNPUBLISHED and never shown on public pages. */
  draft: boolean;
};

export const wagWatchCategories: WagWatchCategory[] = [
  "Waco",
  "McLennan County",
  "Texas",
  "Federal",
  "Health & Safety",
  "Recall",
  "Travel",
  "Animal Welfare",
  "Money Saver",
  "New & Noteworthy",
];

export const urgencyConfig: Record<
  WagWatchUrgency,
  { label: string; tone: "sage" | "sky" | "gold" | "alert" }
> = {
  FYI: { label: "FYI", tone: "sky" },
  "Good to Know": { label: "Good to Know", tone: "sage" },
  "Act Soon": { label: "Act Soon", tone: "gold" },
  "Important Alert": { label: "Important Alert", tone: "alert" },
};

/**
 * Published Wag Watch items. Every published item is backed by real, cited
 * sources — no invented news. Set draft: true to unpublish.
 */
export const wagWatchItems: WagWatchItem[] = [
  {
    id: "waco-dog-heat-safety",
    slug: "waco-dog-heat-safety",
    headline: "Central Texas heat: keeping your Waco dog safe on hot days",
    shortSummary:
      "Waco summers stay dangerously hot well into fall. Hot pavement and parked cars are the biggest risks — here's the quick, vet-backed playbook.",
    whatHappened:
      "Central Texas routinely sees high heat from late spring into October. Veterinary and animal-welfare groups warn that warm-weather outings can turn dangerous fast for dogs, even on days that don't feel extreme to people. Two risks stand out: hot pavement, and dogs left in parked cars.",
    whyCare:
      "Dogs cool themselves mainly by panting and overheat far faster than people. Pavement can run 40–60°F hotter than the air — on an 85°F day, asphalt can hit ~135°F and burn paw pads in under a minute. A parked car can reach deadly temperatures within minutes, even with the windows cracked. Heatstroke is a true emergency and is often fatal without fast care.",
    whatToDo:
      "Do the 7-second test: press the back of your hand on the pavement for 7 seconds — if you can't hold it, it's too hot for paws. Walk in the early morning or after dark, stick to grass and shade, and bring water. Never leave your dog in a parked car, even briefly. Learn the signs of heat stress — heavy panting, drooling, weakness, unsteadiness, bright or dark gums, vomiting, or collapse. If you see them, move your dog to shade or AC, wet them with cool (not ice-cold) water, and get to a vet immediately — don't wait.",
    wacoAngle:
      "For after-hours emergencies, Waco Animal Emergency Clinic (3901 Jack Kultgen Fwy.) offers overnight and weekend care — save the number before you need it: (254) 752-6100. When you do head out, choose shaded, grassy spots over hot concrete.",
    category: "Health & Safety",
    geographicScope: "Waco & McLennan County",
    publishedDate: "2026-08-18",
    updatedDate: "2026-08-18",
    urgency: "Important Alert",
    expiresAt: "2026-10-20",
    sourceUrls: [
      "https://www.avma.org/resources-tools/pet-owners/petcare/warm-weather-pet-safety",
      "https://www.aspca.org/pet-care/general-pet-care/hot-weather-safety-tips",
      "https://www.aaha.org/resources/how-to-protect-dog-paws-from-hot-pavement/",
      "https://vetmed.tamu.edu/news/pet-talk/protecting-pets-from-heat-stress/",
    ],
    sourceNames: [
      "American Veterinary Medical Association — Warm weather pet safety",
      "ASPCA — Hot weather safety tips",
      "AAHA — How to protect dog paws from hot pavement",
      "Texas A&M School of Veterinary Medicine — Protecting pets from heat stress",
    ],
    actionLabel: "Find dog-friendly places with shade",
    actionUrl: "/dog-friendly-waco",
    relatedDirectorySlug: "cameron-park",
    image: {
      src: "/pictures/pool-pack.webp",
      alt: "Dogs cooling off in water during a hot Central Texas day",
    },
    draft: false,
  },
  {
    id: "bridge-street-fall-concerts-2026",
    slug: "waco-fall-concerts-bridge-street-plaza",
    headline:
      "Free fall concerts return to Waco's dog-friendly Bridge Street Plaza",
    shortSummary:
      "The free Levitt AMP Waco Music Series is back at Bridge Street Plaza this fall (Sept 10–Oct 8, 2026) — an easy, walkable outing at a leashed-dog-welcome public space.",
    whatHappened:
      "Creative Waco's free Levitt AMP Waco Music Series returns to Bridge Street Plaza for its fall run, Sept. 10 through Oct. 8, 2026. Bridge Street Plaza is Waco's public 'Front Porch' in East Waco — an open, walkable gathering space where leashed dogs are welcome (the Waco Downtown Farmers Market that meets there even keeps a doggie clean-up station on site).",
    whyCare:
      "It's a free, local, outdoor thing to do — and the plaza is one of the more dog-welcoming public spaces downtown. Cooler fall evenings also make it more comfortable for dogs than a summer afternoon.",
    whatToDo:
      "Bring a lawn chair and water. Keep your dog leashed, and pick up after them. Note: the concert series doesn't publish a specific pet policy, so use your judgment — a crowded evening concert isn't the right fit for every dog. Reactive, shy, or noise-sensitive dogs may be happier at home, especially near the stage.",
    wacoAngle:
      "Bridge Street Plaza sits at 200 E. Bridge St., linking downtown to the historic Elm Avenue corridor — an easy add-on to a dog-friendly East Waco afternoon.",
    category: "New & Noteworthy",
    geographicScope: "Waco (East Waco / Bridge Street Plaza)",
    publishedDate: "2026-08-18",
    urgency: "Good to Know",
    expiresAt: "2026-10-09",
    sourceUrls: [
      "https://levitt.org/amp-waco-tx/",
      "https://creativewaco.org/events/levitt",
      "https://www.waco-texas.com/Departments/Parks-Recreation/Parks-Playgrounds-Splash-Pads-Trails/Bridge-Street",
    ],
    sourceNames: [
      "Levitt Foundation — Levitt AMP Waco (series dates)",
      "Creative Waco — Levitt AMP Waco Music Series 2026",
      "City of Waco — Bridge Street Plaza",
    ],
    actionLabel: "See dog-friendly places in Waco",
    actionUrl: "/dog-friendly-waco",
    relatedDirectorySlug: "bridge-street-plaza",
    image: {
      src: "/pictures/community-walk.webp",
      alt: "People walking dogs on leash at an outdoor Waco gathering space",
    },
    draft: false,
  },
];

function isExpired(item: WagWatchItem, now = new Date()): boolean {
  return Boolean(item.expiresAt && new Date(item.expiresAt) < now);
}

/** Public list — published, non-expired, newest first. Drafts never leak. */
export function getPublishedWagWatch(): WagWatchItem[] {
  return wagWatchItems
    .filter((item) => !item.draft && !isExpired(item))
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
    );
}

/** Public lookup — returns undefined for drafts/expired so they 404. */
export function getPublishedWagWatchBySlug(
  slug: string,
): WagWatchItem | undefined {
  return getPublishedWagWatch().find((item) => item.slug === slug);
}
