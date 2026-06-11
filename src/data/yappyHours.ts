import { cityConfig } from "@/lib/site";

// Yappy Hours: social meetups for Waco dogs and their people.
// Two tracks:
//   - "public":  open to everyone at dog-friendly venues. Top-of-funnel: grows
//                the email list and brings in new pet-care / scooping customers.
//   - "members": current Platinum Scoops / Rover clients only, hosted at the
//                home. Loyalty, referrals, and a reason for prospects to book.
//
// TODO: Replace the sample events below with confirmed dates, venues, and times.

export type YappyHourType = "public" | "members";

export type YappyHourEvent = {
  id: string;
  title: string;
  type: YappyHourType;
  date: string;
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
} as const;

export const yappyHourEvents: YappyHourEvent[] = [
  {
    id: "patio-yappy-hour-june",
    title: "Patio Yappy Hour",
    type: "public",
    date: "Saturday, June 20, 2026",
    time: "5:00–7:00 PM",
    location: "A dog-friendly Waco patio (venue announced with RSVP)",
    description:
      "Kick off summer on a shaded patio. Leashed, friendly dogs welcome. Great for meeting other local dog parents and getting your pup comfortable in public.",
    cost: "Free",
    rsvpOpen: true,
  },
  {
    id: "backyard-members-june",
    title: "Backyard Yappy Hour (Current Clients)",
    type: "members",
    date: "Friday, June 27, 2026",
    time: "6:00–7:30 PM",
    location: "Our Waco home (address shared after RSVP)",
    description:
      "A relaxed, small-group social for current Platinum Scoops and Rover families. Let the dogs play in a familiar, safely fenced space while you unwind.",
    cost: "Free for members",
    rsvpOpen: true,
  },
  {
    id: "sunset-sniff-social-july",
    title: "Sunset Sniff & Social",
    type: "public",
    date: "Saturday, July 18, 2026",
    time: "7:30–9:00 PM",
    location: "A shaded Waco park (venue announced with RSVP)",
    description:
      "An evening walk-and-meet as the heat breaks. Bring water, bring your dog, and make some new neighborhood friends.",
    cost: "Free",
    rsvpOpen: true,
  },
  {
    id: "pupsicle-members-august",
    title: "Pup-sicle Social (Clients Only)",
    type: "members",
    date: "Saturday, August 8, 2026",
    time: "6:00–7:30 PM",
    location: "Our Waco home (address shared after RSVP)",
    description:
      "Beat the August heat with frozen treats and shade in the backyard — a members-only thank-you before the season winds down.",
    cost: "Free for members",
    rsvpOpen: true,
  },
];
