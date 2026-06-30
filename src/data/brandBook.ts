/** Brand book content — mirrors docs/design-handoff/Keep Waco Wagging Brand Book.dc.html */

export const brandColors = [
  {
    token: "--color-wag-sage",
    name: "Wag Sage",
    hex: "#6E7E63",
    role: "Primary · buttons, bands, heading accents",
    large: true,
  },
  {
    token: "--color-cream",
    name: "Kitchen Cream",
    hex: "#F4EDE4",
    role: "Background",
    large: true,
    border: true,
  },
  {
    token: "--color-rose",
    name: "Good-Towel Rose",
    hex: "#C68C86",
    role: "Accent · script logo, hearts",
    large: true,
  },
  {
    token: "--color-bark",
    name: "Bark Brown",
    hex: "#4C463E",
    role: "Body text",
  },
  {
    token: "--color-brazos-blue",
    name: "Brazos Blue",
    hex: "#A9C2CF",
    role: "Tertiary accent",
  },
  {
    token: "--color-trail-taupe",
    name: "Trail Taupe",
    hex: "#B3A48E",
    role: "Tertiary accent · product tiles",
  },
  {
    token: "--color-blush",
    name: "Blush",
    hex: "#E5C9C4",
    role: "Light rose on dark backgrounds",
  },
] as const;

export const colorBalance = [
  { label: "Cream", pct: 55, color: "#F4EDE4" },
  { label: "Sage", pct: 25, color: "#6E7E63" },
  { label: "Bark", pct: 8, color: "#4C463E" },
  { label: "Rose", pct: 7, color: "#C68C86" },
  { label: "Blue / Taupe", pct: 5, color: "#A9C2CF" },
] as const;

export const brandTypography = [
  {
    name: "Cormorant Garamond",
    css: "font-display",
    sample: "Aa",
    usage:
      "Headlines and prices. Elegant, editorial. Caps with wide tracking for the logo line.",
  },
  {
    name: "Parisienne",
    css: "font-script text-rose",
    sample: "Aa",
    usage:
      'The signature accent. One or two words only — "wagging," "wag," "service." Never body text.',
  },
  {
    name: "Jost",
    css: "font-sans font-light",
    sample: "Aa",
    usage:
      "Body, labels, buttons, and navigation. Airy. Uppercase with tracking for small labels.",
  },
] as const;

export const brandVoiceLines = [
  "Celebrate · Connect · Support · Wag",
  "Community · Connection · Compassion",
  "Wear the Wag",
  "Full-time care for Waco's dog families",
] as const;

export const brandPhotoSlots = [
  {
    src: "/pictures/hero-group-walk.webp",
    alt: "Five dogs on a group walk in a Waco neighborhood",
    label: "Group walk",
  },
  {
    src: "/pictures/frenchie-sink-bath.webp",
    alt: "French bulldog bathed in a kitchen sink",
    label: "Sink bath",
  },
  {
    src: "/pictures/border-collie-joy.webp",
    alt: "Happy border collie outdoors in Waco",
    label: "Dog mid-joy",
  },
  {
    src: "/pictures/community-walk.webp",
    alt: "Dogs and people walking near the Waco suspension bridge",
    label: "Bridge / Waco",
  },
] as const;
