import { cityConfig } from "@/lib/site";
import { getRoverDaycareStandardRate } from "@/data/rover";

// Summer daycare camp themes for Keep Waco Wagging / Platinum Scoops pet care.
// Booking always happens through Rover. Update dates each year as needed.

export type DaycareMonth = "June" | "July" | "August";

export type DaycareTheme = {
  week: number;
  month: DaycareMonth;
  dateRange: string;
  /** Inclusive end date (YYYY-MM-DD) for filtering past weeks */
  endsOn: string;
  name: string;
  blurb: string;
  activities: string[];
  // Optional callout for heat, themes, or booking reminders.
  note?: string;
};

const daycareRate = getRoverDaycareStandardRate();

export const summerDaycare = {
  seasonLabel: "Summer 2026",
  title: "Summer Daycare Camp",
  intro:
    "A themed week of supervised play, enrichment, and rest at our home-based Waco dog daycare. Each week brings a new theme, plenty of shade and water, and the same calm, full-time care your dog already knows. Drop in for a day or join the whole week.",
  dailyRate: daycareRate,
  bookingUrl: cityConfig.rover.profileUrl,
  hours: "Weekdays, drop-off and pick-up times confirmed on Rover.",
  heatNote:
    "Waco summers get hot. We schedule active play for cooler parts of the day, keep fresh water everywhere, use shaded and air-conditioned rest areas, and watch every dog for signs of overheating.",
  bookingNote:
    "We do not close for major holidays. Spots can still fill up, so request your dates on Rover to confirm availability.",
} as const;

export const daycareThemes: DaycareTheme[] = [
  {
    week: 1,
    month: "June",
    dateRange: "June 1–5",
    endsOn: "2026-06-05",
    name: "Splash Into Summer",
    blurb:
      "We kick off the season heat-smart with water play and shaded cool-downs.",
    activities: [
      "Sprinkler zoomies",
      "Shallow splash pools",
      "Frozen broth cubes",
      "Shaded rest breaks",
    ],
  },
  {
    week: 2,
    month: "June",
    dateRange: "June 8–12",
    endsOn: "2026-06-12",
    name: "Backyard BBQ (Dog Edition)",
    blurb:
      "A sniff-and-snack week built around dog-safe smells and slow, settling enrichment.",
    activities: [
      "Snuffle-mat \u201ccookouts\u201d",
      "Lick-mat lunches",
      "Patio lounging in the shade",
      "Group cookout photo",
    ],
  },
  {
    week: 3,
    month: "June",
    dateRange: "June 15–19",
    endsOn: "2026-06-19",
    name: "Tail-Waggin' Talent Show",
    blurb:
      "Confidence-building tricks and games, ending with a Friday show-and-tail.",
    activities: [
      "Sit, stay, and spin refreshers",
      "Puzzle toys",
      "Friday \u201cshow-and-tail\u201d",
      "A badge for every pup",
    ],
  },
  {
    week: 4,
    month: "June",
    dateRange: "June 22–26",
    endsOn: "2026-06-26",
    name: "Beach Bums",
    blurb:
      "A tropical, water-forward week for dogs who love to paddle and dig.",
    activities: [
      "Supervised sandbox digging",
      "Pool paddling",
      "Beach-towel naps",
      "Coconut-scent enrichment",
    ],
  },
  {
    week: 5,
    month: "June",
    dateRange: "June 29 – July 3",
    endsOn: "2026-07-03",
    name: "Red, White & Chew",
    blurb:
      "A calm, patriotic week with gentle prep for fireworks season and lots of quiet enrichment.",
    activities: [
      "Calm-conditioning for fireworks",
      "Frozen patriotic pupsicles",
      "Cozy \u201cchill zone\u201d time",
      "Quiet enrichment games",
    ],
    note: "Fireworks-season week — extra calm enrichment built in. Book on Rover.",
  },
  {
    week: 6,
    month: "July",
    dateRange: "July 6–10",
    endsOn: "2026-07-10",
    name: "Christmas in July",
    blurb:
      "A festive cool-down week full of treats to unwrap and ice to chase.",
    activities: [
      "Treat \u201cstockings\u201d",
      "Unwrap-the-box puzzles",
      "Snowball (ice) play",
      "Gift-bow photo",
    ],
  },
  {
    week: 7,
    month: "July",
    dateRange: "July 13–17",
    endsOn: "2026-07-17",
    name: "Lone Star Roundup",
    blurb:
      "A Texas-proud week of recall games, bandanas, and backyard \u201crodeo\u201d fun.",
    activities: [
      "\u201cCattle drive\u201d recall games",
      "Bandana day",
      "Agility \u201crodeo\u201d",
      "Shaded ranch rest",
    ],
  },
  {
    week: 8,
    month: "July",
    dateRange: "July 20–24",
    endsOn: "2026-07-24",
    name: "Sniff & Seek Safari",
    blurb:
      "Nose-work week that lets dogs use their best sense and tire out their brains.",
    activities: [
      "Hidden-treat safaris",
      "Scent trails",
      "Jungle obstacle path",
      "Enrichment dens",
    ],
  },
  {
    week: 9,
    month: "July",
    dateRange: "July 27–31",
    endsOn: "2026-07-31",
    name: "Pup-sicle Week",
    blurb:
      "Our hottest stretch gets the coolest treats and extra indoor AC play.",
    activities: [
      "Frozen-treat bar",
      "Indoor air-conditioned play",
      "Lick-mat smoothies",
      "Extra water breaks",
    ],
    note: "Peak heat week \u2014 active play stays short and shaded.",
  },
  {
    week: 10,
    month: "August",
    dateRange: "August 3–7",
    endsOn: "2026-08-07",
    name: "Hollywoof Movie Star",
    blurb:
      "A glam week of photo moments and gentle, calm handling practice.",
    activities: [
      "Mini photo sessions",
      "\u201cRed carpet\u201d struts",
      "Calm grooming touch",
      "Star badges",
    ],
  },
  {
    week: 11,
    month: "August",
    dateRange: "August 10–14",
    endsOn: "2026-08-14",
    name: "Wag-a-thon Field Day",
    blurb:
      "Backyard games and beginner agility for our most playful pups.",
    activities: [
      "Tunnel and jump stations",
      "Fetch relays",
      "Friendly tug games",
      "Medal ceremony",
    ],
  },
  {
    week: 12,
    month: "August",
    dateRange: "August 17–21",
    endsOn: "2026-08-21",
    name: "Back-to-School Manners Camp",
    blurb:
      "A gentle reset on everyday manners before fall routines return.",
    activities: [
      "Leash manners",
      "Settle-on-place",
      "Polite greetings",
      "Name-recall games",
    ],
  },
  {
    week: 13,
    month: "August",
    dateRange: "August 24–28",
    endsOn: "2026-08-28",
    name: "End-of-Summer Luau",
    blurb:
      "A tropical send-off to wrap the season with a splash.",
    activities: [
      "Flower-collar photos",
      "Tropical lick mats",
      "Backyard limbo play",
      "Group splash finale",
    ],
  },
];

export const daycareMonthOrder: DaycareMonth[] = ["June", "July", "August"];


function startOfTodayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Current + future camp weeks, soonest first. */
export function getUpcomingDaycareThemes(
  now = new Date(),
): DaycareTheme[] {
  const today = startOfTodayISO(now);
  return daycareThemes.filter((theme) => theme.endsOn >= today);
}

/** Homepage preview: next few weeks only. */
export function getHomeDaycareThemes(
  limit = 4,
  now = new Date(),
): DaycareTheme[] {
  return getUpcomingDaycareThemes(now).slice(0, limit);
}

export const cityName = cityConfig.city;
