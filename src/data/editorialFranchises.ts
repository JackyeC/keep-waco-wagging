/**
 * Recurring editorial franchises for "Your dog's best Waco."
 * These are labels and start-here maps — not a requirement that every post
 * use the same template.
 */

export const editorialFranchises = [
  {
    id: "would-we-take-our-dog",
    name: "Would We Take Our Dog?",
    question: "Should we actually bring the dog?",
    summary:
      "Honest evaluations of places and events. Yes, yes but, depends on your dog, or probably not — never 'dog-friendly' as the whole answer.",
    href: "/approved",
    cta: "See how we evaluate",
  },
  {
    id: "before-you-go",
    name: "Before You Go",
    question: "What should I know before we head out?",
    summary:
      "Shade, water, crowds, pavement, leash rules, and best times — including what we have not verified yet.",
    href: "/dog-friendly-waco",
    cta: "Browse places",
  },
  {
    id: "waco-dog-weekend",
    name: "Waco Dog Weekend",
    question: "What can we do with the dog this weekend?",
    summary:
      "A curated patio, park, and heat check — not a scraped calendar of everything that allows dogs.",
    href: "/weekend",
    cta: "This weekend",
  },
  {
    id: "wag-watch",
    name: "Wag Watch",
    question: "What changed that could matter to my dog?",
    summary:
      "Openings, policy changes, heat, and local notes. Calm, sourced, dated.",
    href: "/wag-watch",
    cta: "Read Wag Watch",
  },
  {
    id: "the-drop",
    name: "The Drop",
    question: "What is worth noticing right now?",
    summary:
      "Finds, local culture, and things dog parents might miss. The shop drop lives here until we have more editorial finds.",
    href: "/shop#featured",
    cta: "See the shop drop",
  },
  {
    id: "new-dog-in-waco",
    name: "New Dog in Waco",
    question: "I just got a dog here. Where do I start?",
    summary:
      "The stack we wish someone had handed us — vets, emergency care, parks, heat, and people you can trust.",
    href: "/new-dog-in-waco",
    cta: "Start here",
  },
] as const;

export type EditorialFranchiseId = (typeof editorialFranchises)[number]["id"];

/** Existing published guides mapped onto franchises. No new invented posts. */
export const franchiseGuideSlugs: Record<EditorialFranchiseId, string[]> = {
  "would-we-take-our-dog": [
    "best-dog-friendly-patios-in-waco",
    "best-waco-parks-for-dogs",
  ],
  "before-you-go": [
    "what-to-bring-when-you-take-your-dog-out-in-waco",
    "how-to-know-if-your-dog-is-ready-for-a-patio",
  ],
  "waco-dog-weekend": ["dog-friendly-weekend-in-waco"],
  "wag-watch": [],
  "the-drop": [],
  "new-dog-in-waco": ["the-waco-puppy-socialization-checklist"],
};

export function getEditorialFranchise(id: EditorialFranchiseId) {
  return editorialFranchises.find((franchise) => franchise.id === id);
}
