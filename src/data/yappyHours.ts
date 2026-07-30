import { cityConfig } from "@/lib/site";

// Yappy Hours: social meetups for Waco dogs and their people.
// Two tracks:
//   - "public":  open to everyone at dog-friendly venues. Top-of-funnel: grows
//                the email list and brings in new pet-care / scooping customers.
//   - "members": current Platinum Scoops / Rover clients only, hosted at the
//                home. Loyalty, referrals, and a reason for prospects to book.
//
// Only list confirmed upcoming dates. Past sample dates stay for reference
// with rsvpOpen: false and are filtered out of public "upcoming" views.

export type YappyHourType = "public" | "members";

export type YappyHourEvent = {
  id: string;
  title: string;
  type: YappyHourType;
  /** Display date, e.g. "Saturday, August 8, 2026" */
  date: string;
  /** ISO date (YYYY-MM-DD) used to filter past events */
  dateISO: string;
  time: string;
  location: string;
  description: string;
  cost: string;
  // Whether the RSVP form should offer this event.
  rsvpOpen: boolean;
};

export const yappyHours = {
  title: "Yappy Hours",
  intro:
    `Casual meetups for ${cityConfig.city}-area dogs and the people who love them. Sniff, socialize, and swap dog-parent notes — with shade, water, and good company.`,
  publicBlurb:
    "Open to everyone. We gather at dog-friendly Waco patios, breweries, and parks. Free to join — just RSVP so we know how many treats to bring.",
  membersBlurb:
    "A thank-you for current Platinum Scoops and Rover families: smaller, relaxed get-togethers hosted right at our home. It's the same calm space your dog already loves, with friends.",
  hostNote:
    "Locations and exact times are confirmed with each event. RSVP and we'll email you the details (members get the home address after RSVP).",
  sponsorPitch:
    "Local business? Sponsoring or hosting a Yappy Hour puts your brand in front of engaged Waco dog parents. Bring samples, a booth, or a special offer.",
  emptyUpcoming:
    "New Yappy Hour dates are coming soon. Join the interest list and we'll email you when the next meetup is confirmed.",
} as const;

export const yappyHourEvents: YappyHourEvent[] = [
  {
    id: "patio-yappy-hour-june",
    title: "Patio Yappy Hour",
    type: "public",
    date: "Saturday, June 20, 2026",
    dateISO: "2026-06-20",
    time: "5:00–7:00 PM",
    location: "A dog-friendly Waco patio (venue announced with RSVP)",
    description:
      "Kick off summer on a shaded patio. Leashed, friendly dogs welcome. Great for meeting other local dog parents and getting your pup comfortable in public.",
    cost: "Free",
    rsvpOpen: false,
  },
  {
    id: "backyard-members-june",
    title: "Backyard Yappy Hour (Current Clients)",
    type: "members",
    date: "Friday, June 27, 2026",
    dateISO: "2026-06-27",
    time: "6:00–7:30 PM",
    location: "Our Waco home (address shared after RSVP)",
    description:
      "A relaxed, small-group social for current Platinum Scoops and Rover families. Let the dogs play in a familiar, safely fenced space while you unwind.",
    cost: "Free for members",
    rsvpOpen: false,
  },
  {
    id: "sunset-sniff-social-july",
    title: "Sunset Sniff & Social",
    type: "public",
    date: "Saturday, July 18, 2026",
    dateISO: "2026-07-18",
    time: "7:30–9:00 PM",
    location: "A shaded Waco park (venue announced with RSVP)",
    description:
      "An evening walk-and-meet as the heat breaks. Bring water, bring your dog, and make some new neighborhood friends.",
    cost: "Free",
    rsvpOpen: false,
  },
  {
    id: "pupsicle-members-august",
    title: "Pup-sicle Social (Clients Only)",
    type: "members",
    date: "Saturday, August 8, 2026",
    dateISO: "2026-08-08",
    time: "6:00–7:30 PM",
    location: "Our Waco home (address shared after RSVP)",
    description:
      "Beat the August heat with frozen treats and shade in the backyard — a members-only thank-you before the season winds down.",
    cost: "Free for members",
    rsvpOpen: true,
  },
];

function startOfTodayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Upcoming events (today or later), sorted soonest first. */
export function getUpcomingYappyHourEvents(
  now = new Date(),
): YappyHourEvent[] {
  const today = startOfTodayISO(now);
  return yappyHourEvents
    .filter((event) => event.dateISO >= today)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

/** Events that still accept RSVPs (also must be upcoming). */
export function getOpenYappyHourEvents(now = new Date()): YappyHourEvent[] {
  return getUpcomingYappyHourEvents(now).filter((event) => event.rsvpOpen);
}
