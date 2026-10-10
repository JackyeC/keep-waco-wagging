import { getUpcomingYappyHourEvents } from "@/data/yappyHours";

export type DogAttendance = "dog-friendly" | "dog-optional" | "people-only";

/** Shape a confirmed listing uses. Empty fields stay null — they are not guessed. */
export type KwwEventListing = {
  id: string;
  name: string;
  dateLabel: string | null;
  time: string | null;
  venue: string | null;
  dogAttendance: DogAttendance | null;
  ticketPrice: string | null;
  memberPrice: string | null;
  registrationUrl: string | null;
  capacity: string | null;
  rsvpDeadline: string | null;
  sponsor: string | null;
  policy: string | null;
  category: string;
};

/**
 * Confirmed ticketed or hosted gatherings.
 * Yappy Hours, Weekend, and Camp Clayton keep their own pages.
 * Nothing is listed here until a date, venue, and registration path are real.
 */
export const confirmedEvents: readonly KwwEventListing[] = [];

export const eventListingFields = [
  "Event name",
  "Date and time",
  "Venue",
  "Dog-friendly, dog-optional, or people-only",
  "Ticket price",
  "Member price",
  "Registration link",
  "Capacity and RSVP deadline",
  "Sponsor",
  "Cancellation or weather policy",
] as const;

export const linkedExperiences = [
  {
    id: "yappy-hours",
    title: "Yappy Hours",
    href: "/yappy-hours",
    kind: "Existing meetup page",
    copy: "Casual meetups for Waco dogs and their people. Public gatherings and smaller get-togethers for current Platinum Scoops and Rover families stay on that page, with their own RSVP.",
  },
  {
    id: "weekend",
    title: "Waco Dog Weekend",
    href: "/weekend",
    kind: "Weekend guide",
    copy: "Ideas for the weekend — patios, parks, and when to leave the dog home. This is a guide, not a ticketed event.",
  },
  {
    id: "camp-clayton",
    title: "Camp Clayton",
    href: "/camp-waco",
    kind: "Themed daycare",
    copy: "Themed daycare days. Booking stays on Rover. Camp Clayton is care, not a Wag Club ticket.",
  },
] as const;

/**
 * Dinner Club is a DNNR-hosted experience. This site does not match tables.
 * registrationUrl stays null until the public DNNR page is confirmed.
 */
export const dinnerClub = {
  name: "Keep Waco Wagging Dinner Club",
  host: "DNNR",
  registrationUrl: null as string | null,
  copy: "Small group dinners for people who want to meet other Waco dog people. DNNR plans and runs the dinner. Keep Waco Wagging does not match tables or take reservations on this site.",
  pending:
    "A public registration link will be added when the DNNR club page is confirmed. No date, venue, or price is listed until then.",
} as const;

export const planned2027Year = 2027;

const planned2027MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Presentation slots only. Themes, venues, sponsors, and dates are unconfirmed. */
export const planned2027Experiences = planned2027MonthNames.map((month) => ({
  id: `2027-${month.toLowerCase()}`,
  label: `${month} ${planned2027Year}`,
  theme: null as string | null,
  status: "Planned" as const,
}));

export function upcomingYappyHourCount(now = new Date()): number {
  return getUpcomingYappyHourEvents(now).length;
}
