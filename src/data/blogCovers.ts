/**
 * Unique editorial covers for blog cards.
 * Designed tiles — not random photos — so every guide reads differently in the grid.
 */

export type BlogCoverTone =
  | "sage"
  | "rose"
  | "cream"
  | "blue"
  | "taupe"
  | "bark"
  | "blush";

export type BlogCoverMotif =
  | "patio"
  | "check"
  | "trail"
  | "puppy"
  | "pack"
  | "brunch"
  | "crowd"
  | "weekend"
  | "storefront"
  | "scoop"
  | "gate"
  | "leash";

export type BlogCover = {
  tone: BlogCoverTone;
  motif: BlogCoverMotif;
  /** Short cover line — not the full title. */
  line: string;
  /** Tiny uppercase label above the line. */
  kicker: string;
};

export const blogCovers: Record<string, BlogCover> = {
  "best-dog-friendly-patios-in-waco": {
    tone: "sage",
    motif: "patio",
    kicker: "Dog-friendly Waco",
    line: "Patio picks",
  },
  "how-to-know-if-your-dog-is-ready-for-a-patio": {
    tone: "cream",
    motif: "check",
    kicker: "Training for real life",
    line: "Patio ready?",
  },
  "best-waco-parks-for-dogs": {
    tone: "blue",
    motif: "trail",
    kicker: "Parks & trails",
    line: "Where to walk",
  },
  "the-waco-puppy-socialization-checklist": {
    tone: "blush",
    motif: "puppy",
    kicker: "Puppy notes",
    line: "Start gentle",
  },
  "what-to-bring-when-you-take-your-dog-out-in-waco": {
    tone: "taupe",
    motif: "pack",
    kicker: "Outing kit",
    line: "Pack the bag",
  },
  "how-to-help-your-dog-stay-calm-around-crowds": {
    tone: "bark",
    motif: "crowd",
    kicker: "Calm practice",
    line: "Stay under threshold",
  },
  "dog-friendly-weekend-in-waco": {
    tone: "rose",
    motif: "weekend",
    kicker: "Two-day plan",
    line: "Waco weekend",
  },
  "patio-manners-what-your-dog-needs-before-brunch": {
    tone: "cream",
    motif: "brunch",
    kicker: "Brunch skills",
    line: "Settle · leave-it · stay",
  },
  "waco-dog-etiquette-guide": {
    tone: "sage",
    motif: "leash",
    kicker: "Neighbor notes",
    line: "Good dog manners",
  },
  "what-local-businesses-should-know-before-becoming-dog-friendly": {
    tone: "blue",
    motif: "storefront",
    kicker: "For local businesses",
    line: "Dogs welcome, done well",
  },
  "why-cleaning-up-dog-waste-matters-for-your-yard": {
    tone: "taupe",
    motif: "scoop",
    kicker: "Platinum Scoops tip",
    line: "Why scooping matters",
  },
  "how-to-keep-your-yard-guest-ready-when-you-have-dogs": {
    tone: "blush",
    motif: "gate",
    kicker: "Yard + home",
    line: "Guest-ready yard",
  },
};

export function getBlogCover(slug: string): BlogCover {
  return (
    blogCovers[slug] ?? {
      tone: "cream",
      motif: "leash",
      kicker: "Keep Waco Wagging",
      line: "Waco dog notes",
    }
  );
}
