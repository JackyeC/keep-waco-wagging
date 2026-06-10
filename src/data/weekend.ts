import type { WeekendBlock } from "@/lib/types";

/**
 * "Where to Wag This Weekend" — an easily-updated weekly guide.
 * TODO: refresh these blocks each week (or wire to a CMS / scheduled entry).
 */
export const weekendEdition = {
  // Update this label every week.
  label: "Weekend of May 30",
  intro:
    "Three easy ways to get out with your pup this weekend — plus a training skill, a yard reminder, and a local shoutout.",
};

export const weekendBlocks: WeekendBlock[] = [
  {
    id: "w-events",
    kind: "events",
    title: "Dog-friendly events",
    icon: "calendar",
    body: "What's happening around Waco where dogs are welcome this weekend.",
    items: [
      {
        name: "Riverwalk Morning Stroll Meetup",
        detail: "Sat 8:30am · Brazos Riverwalk · leashed, all friendly dogs",
      },
      {
        name: "Pup-Up Market on the Lawn",
        detail: "Sun 10am–2pm · local makers & pet vendors",
      },
    ],
  },
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
    id: "w-shoutout",
    kind: "shoutout",
    title: "Local business shoutout",
    icon: "store",
    body: "Woodway Pup Provisions — a locally owned pet store stocking Texas-made treats and enrichment toys. Stop in and say hi this weekend.",
    ctaLabel: "Read the spotlight",
    ctaHref: "/spotlights",
  },
];
