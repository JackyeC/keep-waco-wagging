/** Copy and field config for Keep Waco Wagging email signups. */

export const signupCopy = {
  headline: "Get Keep Waco Wagging updates",
  subheadline:
    "Camp Clayton openings, Waco pet events, daycare updates, and helpful notes for local dog families.",
  button: "Sign me up",
  privacyNote: "No spam. Just helpful updates for Waco dog families.",
  success:
    "You're on the list! We'll send Camp Clayton updates, local pet news, and special openings when they're available.",
  successSocial:
    "Want to see the dogs in action? Follow Platinum Scoops on Instagram: @platinum_scoops.",
  error: "Something went wrong. Please try again.",
  brandLine: "Keep Waco Wagging, presented by Platinum Scoops.",
} as const;

export const signupInterests = [
  "Camp Clayton",
  "Boarding availability",
  "Poop scoop services",
  "Waco dog-friendly events",
  "Pet care tips",
  "Sponsorship/community partner updates",
] as const;

export type SignupInterest = (typeof signupInterests)[number];

const VALID_INTERESTS = new Set<string>(signupInterests);

/** Legacy/client labels mapped to controlled newsletter interests. */
const INTEREST_ALIASES: Record<string, SignupInterest> = {
  "Local dog events": "Waco dog-friendly events",
  "Doggy daycare camp": "Camp Clayton",
};

export const YAPPY_HOUR_RSVP_PREFIX = "Yappy Hour RSVP:";

const MAX_YAPPY_HOUR_EVENT_LABEL_LENGTH = 100;

/** Free newsletter / Wag Watch list. Existing rows keep this source. */
export const LEAD_SOURCE_FREE = "keep_waco_wagging";

/**
 * Founding membership interest only. Never written onto older free-list rows.
 * This is not a completed purchase.
 */
export const LEAD_SOURCE_FOUNDING = "wag_club_founding_interest";

export const FOUNDING_MEMBERSHIP_INTEREST = "Founding membership interest";

export const SHIRT_SIZE_PREFIX = "Shirt size:";

/** Requested founding-shirt size. "Not sure yet" is stored so we do not invent a size. */
export const shirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "Not sure yet"] as const;

export type ShirtSize = (typeof shirtSizes)[number];

const SHIRT_SIZES = new Set<string>(shirtSizes);

export function shirtSizeInterest(size: string): string | null {
  if (!SHIRT_SIZES.has(size)) return null;
  return `${SHIRT_SIZE_PREFIX} ${size}`;
}

/** Unknown values stay on the free list so a bad client cannot relabel a signup. */
export function resolveLeadSource(raw: unknown): string {
  return raw === LEAD_SOURCE_FOUNDING ? LEAD_SOURCE_FOUNDING : LEAD_SOURCE_FREE;
}

/**
 * Normalize lead interests: whitelist newsletter options, map known aliases,
 * and allow Yappy Hour RSVP lines with a fixed prefix only.
 */
export function sanitizeLeadInterests(raw: string[] | undefined): string[] {
  const result: string[] = [];
  const seen = new Set<string>();

  for (const item of raw ?? []) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim();
    if (!trimmed) continue;

    let normalized: string | null = null;

    if (VALID_INTERESTS.has(trimmed)) {
      normalized = trimmed;
    } else if (trimmed in INTEREST_ALIASES) {
      normalized = INTEREST_ALIASES[trimmed];
    } else if (trimmed === FOUNDING_MEMBERSHIP_INTEREST) {
      normalized = FOUNDING_MEMBERSHIP_INTEREST;
    } else if (trimmed.startsWith(SHIRT_SIZE_PREFIX)) {
      const size = trimmed.slice(SHIRT_SIZE_PREFIX.length).trim();
      normalized = shirtSizeInterest(size);
    } else if (trimmed.startsWith(YAPPY_HOUR_RSVP_PREFIX)) {
      const eventLabel = trimmed.slice(YAPPY_HOUR_RSVP_PREFIX.length).trim();
      if (
        eventLabel.length > 0 &&
        eventLabel.length <= MAX_YAPPY_HOUR_EVENT_LABEL_LENGTH &&
        !/[\r\n\0]/.test(eventLabel)
      ) {
        normalized = `${YAPPY_HOUR_RSVP_PREFIX} ${eventLabel}`;
      }
    }

    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }

  return result;
}

export type SignupPayload = {
  firstName?: string;
  email: string;
  dogName?: string;
  zipCode?: string;
  interests?: SignupInterest[];
  sourcePage?: string;
};

export function formatLeadSignupEmail(payload: {
  first_name?: string | null;
  email: string;
  dog_name?: string | null;
  zip_code?: string | null;
  interests?: string[];
  source?: string | null;
  source_page?: string | null;
  created_at?: string;
}): string {
  const timestamp = payload.created_at ?? new Date().toISOString();
  const source = payload.source || LEAD_SOURCE_FREE;
  const heading =
    source === LEAD_SOURCE_FOUNDING
      ? "New Wag Club founding membership interest (not a paid membership)"
      : "New Keep Waco Wagging signup";
  const lines = [
    heading,
    "",
    `First name: ${payload.first_name || "—"}`,
    `Email: ${payload.email}`,
    `Dog name: ${payload.dog_name || "—"}`,
    `Zip code: ${payload.zip_code || "—"}`,
    `Interests: ${payload.interests?.length ? payload.interests.join(", ") : "—"}`,
    `List: ${source}`,
    `Timestamp: ${timestamp}`,
    `Source page: ${payload.source_page || "—"}`,
  ];
  return lines.join("\n");
}
