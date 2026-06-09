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
    body: "Brazos Bark & Brew downtown — big shaded patio, water bowls at the door, and a calm late-afternoon crowd. Great for a first patio outing.",
    ctaLabel: "See it in the directory",
    ctaHref: "/directory/brazos-bark-and-brew",
  },
  {
    id: "w-park",
    kind: "park",
    title: "Park or trail pick",
    icon: "park",
    body: "Cameron Park's shaded loop trails. Go early to beat the heat, bring your own water, and use the wide gravel paths for loose-leash practice.",
    ctaLabel: "View trail details",
    ctaHref: "/directory/cameron-park-bark-trails",
  },
  {
    id: "w-training",
    kind: "training",
    title: "Training skill of the week",
    icon: "training",
    body: "Practice 'settle on a mat.' Five short reps at home this week sets your dog up to relax under the table on your next patio visit. If patios feel stressful right now, start with a Lifestyle Training Assessment.",
    ctaLabel: "Book a Lifestyle Training Assessment",
    ctaHref: "/training#assessment",
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
