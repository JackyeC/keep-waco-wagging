/**
 * Platinum Pup Event Care — wedding & special event dog attendant service.
 *
 * Copy rules (intentional): original wording only; no competitor names or
 * package names; no claims of CPR/first aid/certified trainer/AKC unless those
 * credentials are later provided; no behavior guarantees; "starting at" pricing
 * only. Update prices and packages here as the offer evolves.
 */

export const eventCareIncludes = [
  "Pre-event planning call",
  "Arrival and potty break",
  "Leash handling",
  "Ceremony support",
  "Photo session support",
  "Water and comfort breaks",
  "Quiet rest or decompression time",
  "Coordination with planner, photographer, or a designated family contact",
  "Safe handoff before and after the event",
  "Optional practice visit or prep session before the event",
] as const;

export type EventCarePackage = {
  name: string;
  bestFor: string;
  includes: readonly string[];
  startingAt: string;
  featured?: boolean;
};

export const eventCarePackages: readonly EventCarePackage[] = [
  {
    name: "The Sweet Appearance",
    bestFor: "Short ceremonies, quick photos, proposals, or small family events.",
    includes: [
      "1 dog",
      "Up to 90 minutes on site",
      "Pre-event potty break",
      "Calm leash handling",
      "Ceremony or photo support",
      "Water break",
      "Safe handoff to owner or designated person",
    ],
    startingAt: "Starting at $125",
  },
  {
    name: "The Best Pup Package",
    bestFor: "Dogs included in the ceremony and photos.",
    includes: [
      "1 dog",
      "Up to 2.5 hours on site",
      "Pre-event planning call",
      "Potty and water breaks",
      "Ceremony support",
      "Photo support",
      "Guest greeting support if appropriate",
      "Quiet rest time between moments",
      "Coordination with photographer, planner, or family contact",
    ],
    startingAt: "Starting at $250",
    featured: true,
  },
  {
    name: "The Full Celebration Companion",
    bestFor: "Weddings, receptions, larger events, or dogs who need more support.",
    includes: [
      "1 dog",
      "Up to 4 hours on site",
      "Pre-event planning call",
      "Timeline coordination",
      "Arrival walk and potty break",
      "Ceremony support",
      "Photo support",
      "Water, rest, and decompression breaks",
      "Quiet rest setup",
      "Post-event handoff or transport coordination if available",
    ],
    startingAt: "Starting at $425",
  },
];

export const eventCareAddOn = {
  name: "Event Readiness Visit",
  description:
    "Some dogs need practice before a big day. This add-on helps your dog get more comfortable with the basics they may need at the event, such as leash manners, settling, greeting calmly, waiting, and moving through busy environments.",
  includes: [
    "Owner instructions",
    "Practice session",
    "Event handling notes",
    "Recommendation for whether your dog is ready for the event environment",
  ],
  startingAt: "Starting at $75/session",
} as const;

export const eventCareFit = {
  goodFit:
    "This service is best for dogs who can be safely handled on leash, recover from excitement, and tolerate new people, sounds, smells, and environments.",
  notFit:
    "This may not be the right fit for dogs with unmanaged aggression, severe fear, a recent bite history, or dogs who become unsafe in crowded spaces. If we are unsure, we may recommend a practice visit, a shorter appearance, or a different plan that keeps everyone safe.",
} as const;

export const eventCarePolicies = [
  "Meet-and-greet or planning call required",
  "Dog must be safely leash-handleable",
  "Current vaccination information may be requested",
  "Event timeline must be shared in advance",
  "A designated human contact is required",
  "Handler is responsible for the dog, not event coordination",
  "Weather, heat, crowds, and noise may affect participation",
  "We reserve the right to remove the dog from the event environment if the dog appears stressed or unsafe",
  "Final pricing depends on location, duration, number of dogs, and event needs",
] as const;

export const eventCareRoles = [
  "Ceremony",
  "Photos",
  "Proposal",
  "Reception appearance",
  "Guest greeting",
  "Other",
] as const;
