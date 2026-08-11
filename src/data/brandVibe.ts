/** Owner-approved brand vibe — aligns shop copy with source-designs/brand-vibe/ boards. */

/** Kittl shirt kit palette — source-designs/merch/shared/kww-shirt-collection-kit.json */
export const kittlShirtColors = {
  sage: "#6D7F6A",
  rose: "#C07A6A",
  sand: "#D8C7B1",
  slate: "#5F7485",
  charcoal: "#4A4A4A",
  cream: "#F2EDE5",
} as const;

export const kittlFonts = {
  heading: "Oswald",
  subheading: "Montserrat",
  accent: "Playfair Display",
  script: "Bromello",
} as const;

export const brandEssence = {
  tagline: "Celebrating dog parents + Waco",
  pillars: "Community · Connection · Compassion",
  footerLine: "A soft place to celebrate dogs, people & Waco.",
  togetherLine: "Together, we keep Waco wagging.",
} as const;

export const brandValues = [
  {
    id: "welcoming",
    label: "Welcoming",
    detail: "For all dog parents",
  },
  {
    id: "multicultural",
    label: "Multicultural",
    detail: "Our community, our strength",
  },
  {
    id: "multi-ability",
    label: "Multi-ability",
    detail: "Inclusive, accessible, every body",
  },
  {
    id: "dog-focused",
    label: "Dog-focused",
    detail: "Because they deserve it all",
  },
  {
    id: "waco-proud",
    label: "Waco proud",
    detail: "Local love, big heart",
  },
] as const;

export const shopHeroCopy = {
  eyebrow: "Keep Waco Wagging · by Platinum Scoops",
  headline: "Wear the",
  headlineAccent: "Wag",
  description:
    "Waco skyline tees, breed editions, and dog-life shirts — designed for people who actually live with, walk, and love dogs here. Printed to order on Comfort Colors and premium fleece.",
  primaryCta: "Shop the collection",
  secondaryCta: "Book a service",
} as const;

export const garmentNote =
  "Comfort Colors 1717 tees · Gildan fleece hoodies · Made to order via Printify";
