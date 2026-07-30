import type { WeekendBlock } from "@/lib/types";

/**
 * "Where to Wag This Weekend" — evergreen dog-friendly ideas for Waco.
 * Keep patio/park picks grounded in verified directory listings.
 * Avoid dated one-off events unless they are confirmed and current.
 */
export const weekendEdition = {
  label: "Evergreen weekend ideas",
  intro:
    "Easy ways to get out with your pup — a patio pick, a park, a training skill, a heat reminder, and a yard tip. Always verify dog policies before you go.",
};

export const weekendBlocks: WeekendBlock[] = [
  {
    id: "w-patio",
    kind: "patio",
    title: "Patio pick",
    icon: "patio",
    body: "Street Dog Cafe on Elm Avenue — a mission-driven coffee spot with a dog-friendly patio. Verify current policy before visiting.",
    ctaLabel: "See it in the directory",
    ctaHref: "/dog-friendly-waco/street-dog-cafe",
  },
  {
    id: "w-park",
    kind: "park",
    title: "Park or trail pick",
    icon: "park",
    body: "North Waco Park offers outdoor space and walking areas for leashed dogs and their people. Go early or late during hot weather.",
    ctaLabel: "View trail details",
    ctaHref: "/dog-friendly-waco/north-waco-park",
  },
  {
    id: "w-training",
    kind: "training",
    title: "Training skill of the week",
    icon: "training",
    body: "Practice 'settle on a mat.' Five short reps at home this week sets your dog up to relax under the table on your next patio visit.",
    ctaLabel: "Explore pet care support",
    ctaHref: "/pet-care",
  },
  {
    id: "w-weather",
    kind: "weather",
    title: "Weather & seasonal reminder",
    icon: "weather",
    body: "It's heating up — pavement can burn paws by mid-morning. Do the 7-second hand test, walk early or late, and bring extra water.",
  },
  {
    id: "w-yard",
    kind: "yard",
    title: "Platinum Scoops yard reminder",
    icon: "yard",
    body: "Warm weekends mean more backyard time. A quick scoop before guests arrive keeps your yard fresh and odor-free — or let Platinum Scoops handle the Pre-Party Yard Prep for you.",
    ctaLabel: "Learn about Platinum Scoops",
    ctaHref: "/platinum-scoops",
  },
  {
    id: "w-directory",
    kind: "shoutout",
    title: "More dog-friendly spots",
    icon: "store",
    body: "Browse verified Waco patios, parks, and pet-friendly stops in the Dog-Friendly Waco directory — and suggest a place we should add.",
    ctaLabel: "Explore the directory",
    ctaHref: "/dog-friendly-waco",
  },
];
