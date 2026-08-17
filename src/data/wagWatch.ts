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
 * Sample items — DRAFT (unpublished) placeholders only, so the system exists
 * without publishing any invented news. Replace with real, sourced items and
 * set draft: false to publish.
 */
export const wagWatchItems: WagWatchItem[] = [
  {
    id: "sample-summer-heat",
    slug: "sample-summer-heat-advisory",
    headline: "Sample: Summer heat advisory for Waco dogs",
    shortSummary:
      "Placeholder draft demonstrating a Health & Safety heat alert. Not published — replace with a real, sourced advisory.",
    whatHappened:
      "This is an unpublished sample item used to build the Wag Watch system. It carries no real claims.",
    whyCare:
      "When published, this section explains, in plain language, why a Waco dog parent should care.",
    whatToDo:
      "When published, this section tells dog parents exactly what to do, if anything.",
    wacoAngle:
      "When published, this section adds the specific local Waco/McLennan County context.",
    category: "Health & Safety",
    geographicScope: "Waco & McLennan County",
    publishedDate: "2026-08-17",
    urgency: "Important Alert",
    sourceUrls: [],
    sourceNames: [],
    actionLabel: "See dog-friendly places with shade",
    actionUrl: "/dog-friendly-waco",
    draft: true,
  },
  {
    id: "sample-new-business",
    slug: "sample-new-dog-friendly-business",
    headline: "Sample: A new dog-friendly spot opened in Waco",
    shortSummary:
      "Placeholder draft demonstrating a New & Noteworthy item. Not published — replace with a real, sourced write-up.",
    category: "New & Noteworthy",
    geographicScope: "Waco",
    publishedDate: "2026-08-17",
    urgency: "Good to Know",
    actionLabel: "See dog-friendly places",
    actionUrl: "/dog-friendly-waco",
    draft: true,
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
