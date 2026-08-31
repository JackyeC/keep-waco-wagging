import { cityConfig } from "@/lib/site";
import { getRoverDaycareStandardRate } from "@/data/rover";

// Camp Waco themed daycare calendar for Keep Waco Wagging / Platinum Scoops pet care.
// Booking always happens through Rover. Keep this file as the single source of truth
// for the public calendar, homepage preview, and daycare-page preview.

export type DaycareMonth =
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type DaycareTheme = {
  week: number;
  month: DaycareMonth;
  dateRange: string;
  /** Inclusive start date (YYYY-MM-DD). */
  startsOn: string;
  /** Inclusive end date (YYYY-MM-DD). */
  endsOn: string;
  name: string;
  blurb: string;
  activities: string[];
  note?: string;
};

const daycareRate = getRoverDaycareStandardRate();

export const campWaco = {
  seasonLabel: "Camp Waco 2026",
  yearLabel: "2026",
  title: "Camp Waco Doggy Daycare",
  intro:
    "Weekly themed daycare with supervised play, enrichment, and real rest in our Waco home. Each week brings a new reason to come play — from splash days and tailgates to holiday photo weeks — while the care routine stays calm, small-group, and familiar.",
  dailyRate: daycareRate,
  bookingUrl: cityConfig.rover.profileUrl,
  hours: "Weekdays, drop-off and pick-up times confirmed on Rover.",
  heatNote:
    "Waco gets hot. We schedule active play for cooler parts of the day, keep fresh water available, use shaded and air-conditioned rest areas, and watch every dog for signs of overheating.",
  bookingNote:
    "Choose the days that fit your schedule — there is no full-week requirement. Spots can fill up, so request your dates on Rover to confirm availability.",
} as const;

/** Backwards-compatible export while older components/routes are migrated. */
export const summerDaycare = campWaco;

export const daycareThemes: DaycareTheme[] = [
  {
    week: 1,
    month: "June",
    dateRange: "June 1–5",
    startsOn: "2026-06-01",
    endsOn: "2026-06-05",
    name: "Splash Into Summer",
    blurb: "We kick off camp heat-smart with water play and shaded cool-downs.",
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
    startsOn: "2026-06-08",
    endsOn: "2026-06-12",
    name: "Backyard BBQ (Dog Edition)",
    blurb:
      "A sniff-and-snack week built around dog-safe smells and slow, settling enrichment.",
    activities: [
      "Snuffle-mat cookouts",
      "Lick-mat lunches",
      "Patio lounging in the shade",
      "Group cookout photo",
    ],
  },
  {
    week: 3,
    month: "June",
    dateRange: "June 15–19",
    startsOn: "2026-06-15",
    endsOn: "2026-06-19",
    name: "Tail-Waggin' Talent Show",
    blurb:
      "Confidence-building tricks and games, ending with a Friday show-and-tail.",
    activities: [
      "Sit, stay, and spin refreshers",
      "Puzzle toys",
      "Friday show-and-tail",
      "A badge for every pup",
    ],
  },
  {
    week: 4,
    month: "June",
    dateRange: "June 22–26",
    startsOn: "2026-06-22",
    endsOn: "2026-06-26",
    name: "Beach Bums",
    blurb:
      "A tropical, water-forward week for dogs who love to paddle and dig.",
    activities: [
      "Supervised sandbox digging",
      "Pool paddling",
      "Beach-towel naps",
      "Tropical photo setup",
    ],
  },
  {
    week: 5,
    month: "June",
    dateRange: "June 29 – July 3",
    startsOn: "2026-06-29",
    endsOn: "2026-07-03",
    name: "Red, White & Chew",
    blurb:
      "A calm, patriotic week with gentle prep for fireworks season and lots of quiet enrichment.",
    activities: [
      "Calm-conditioning for fireworks",
      "Frozen patriotic pupsicles",
      "Cozy chill-zone time",
      "Quiet enrichment games",
    ],
    note: "Fireworks-season week — extra calm enrichment built in.",
  },
  {
    week: 6,
    month: "July",
    dateRange: "July 6–10",
    startsOn: "2026-07-06",
    endsOn: "2026-07-10",
    name: "Christmas in July",
    blurb:
      "A festive cool-down week full of treats to unwrap and ice to chase.",
    activities: [
      "Treat stockings",
      "Unwrap-the-box puzzles",
      "Snowball-style ice play",
      "Holiday photo moment",
    ],
  },
  {
    week: 7,
    month: "July",
    dateRange: "July 13–17",
    startsOn: "2026-07-13",
    endsOn: "2026-07-17",
    name: "Lone Star Roundup",
    blurb:
      "A Texas-proud week of recall games, bandanas, and backyard ranch fun.",
    activities: [
      "Cattle-drive recall games",
      "Bandana day",
      "Agility rodeo",
      "Shaded ranch rest",
    ],
  },
  {
    week: 8,
    month: "July",
    dateRange: "July 20–24",
    startsOn: "2026-07-20",
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
    startsOn: "2026-07-27",
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
    note: "Peak heat week — active play stays short and shaded.",
  },
  {
    week: 10,
    month: "August",
    dateRange: "August 3–7",
    startsOn: "2026-08-03",
    endsOn: "2026-08-07",
    name: "Hollywoof Movie Star",
    blurb:
      "A glam week of photo moments and gentle, calm handling practice.",
    activities: [
      "Mini photo sessions",
      "Red-carpet struts",
      "Calm grooming touch",
      "Star badges",
    ],
  },
  {
    week: 11,
    month: "August",
    dateRange: "August 10–14",
    startsOn: "2026-08-10",
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
    startsOn: "2026-08-17",
    endsOn: "2026-08-21",
    name: "Back-to-School Manners Camp",
    blurb:
      "A gentle reset on everyday manners before fall routines return.",
    activities: [
      "Leash manners",
      "Settle-on-place",
      "Polite greetings",
      "Name-and-check-in games",
    ],
  },
  {
    week: 13,
    month: "August",
    dateRange: "August 24–28",
    startsOn: "2026-08-24",
    endsOn: "2026-08-28",
    name: "Luau Week",
    blurb:
      "A tropical send-off to summer with splash play, bright photos, and cool-down enrichment.",
    activities: [
      "Flower-collar photos",
      "Tropical lick mats",
      "Backyard limbo play",
      "Group splash finale",
    ],
  },
  {
    week: 14,
    month: "August",
    dateRange: "August 31 – September 4",
    startsOn: "2026-08-31",
    endsOn: "2026-09-04",
    name: "Tailgate Week",
    blurb:
      "Football season starts with team spirit, easy games, and plenty of photo-worthy sidelines.",
    activities: [
      "Team-color bandanas",
      "Touchdown recall games",
      "Football photo booth",
      "Treat-toss halftime",
    ],
  },
  {
    week: 15,
    month: "September",
    dateRange: "September 7–11",
    startsOn: "2026-09-07",
    endsOn: "2026-09-11",
    name: "Working Dogs Week",
    blurb:
      "A celebration of dogs with jobs, built around focus, confidence, scent work, and simple tasks.",
    activities: [
      "Find-it scent jobs",
      "Place-and-settle practice",
      "Carry-and-deliver games",
      "Working-dog portrait day",
    ],
    note: "Fun enrichment inspired by working dogs — not service-dog training or certification.",
  },
  {
    week: 16,
    month: "September",
    dateRange: "September 14–18",
    startsOn: "2026-09-14",
    endsOn: "2026-09-18",
    name: "Apple Orchard Week",
    blurb:
      "An early-fall week of sniffing games, cozy textures, and orchard-inspired enrichment.",
    activities: [
      "Apple-themed snuffle hunt",
      "Harvest basket photo setup",
      "Crunch-and-search puzzle games",
      "Cozy blanket rests",
    ],
  },
  {
    week: 17,
    month: "September",
    dateRange: "September 21–25",
    startsOn: "2026-09-21",
    endsOn: "2026-09-25",
    name: "Fall Sniffari",
    blurb:
      "A nose-first adventure week with autumn textures, trails, and search games.",
    activities: [
      "Fall scent trails",
      "Leaf-pile treat searches",
      "Mini obstacle trek",
      "Sniff-and-settle stations",
    ],
  },
  {
    week: 18,
    month: "September",
    dateRange: "September 28 – October 2",
    startsOn: "2026-09-28",
    endsOn: "2026-10-02",
    name: "Pupkin Spice Week",
    blurb:
      "Cozy fall energy with pumpkin-themed enrichment and a little seasonal silliness.",
    activities: [
      "Pumpkin lick mats",
      "Pupkin patch photos",
      "Orange-and-plaid bandanas",
      "Cozy indoor puzzles",
    ],
  },
  {
    week: 19,
    month: "October",
    dateRange: "October 5–9",
    startsOn: "2026-10-05",
    endsOn: "2026-10-09",
    name: "Wild West Week",
    blurb:
      "Bandanas, ranch games, and confidence-building obstacles take over Camp Waco.",
    activities: [
      "Cowboy bandana photos",
      "Ranch obstacle course",
      "Round-up recall games",
      "Shaded saloon settle time",
    ],
  },
  {
    week: 20,
    month: "October",
    dateRange: "October 12–16",
    startsOn: "2026-10-12",
    endsOn: "2026-10-16",
    name: "Campfire Canines Week",
    blurb:
      "A cozy campout week with blanket settles, sniffing games, and an indoor faux-campfire vibe.",
    activities: [
      "Blanket settle practice",
      "Campground sniff hunt",
      "Faux-campfire photos",
      "Quiet chew-and-rest blocks",
    ],
  },
  {
    week: 21,
    month: "October",
    dateRange: "October 19–23",
    startsOn: "2026-10-19",
    endsOn: "2026-10-23",
    name: "Spooky School Week",
    blurb:
      "Manners school gets a Halloween twist with confidence games and silly, low-pressure props.",
    activities: [
      "Name-and-check-in practice",
      "Spooky obstacle course",
      "Doorway manners",
      "Gentle prop confidence games",
    ],
  },
  {
    week: 22,
    month: "October",
    dateRange: "October 26–30",
    startsOn: "2026-10-26",
    endsOn: "2026-10-30",
    name: "Howl-o-Ween Week",
    blurb:
      "Costumes are optional, fun is not — a full week of Halloween photos and enrichment.",
    activities: [
      "Costume-optional photo booth",
      "Trick-for-treat games",
      "Halloween snuffle hunt",
      "Howl-o-Ween group portrait",
    ],
  },
  {
    week: 23,
    month: "November",
    dateRange: "November 2–6",
    startsOn: "2026-11-02",
    endsOn: "2026-11-06",
    name: "Cozy Camp Week",
    blurb:
      "The pace softens with blanket forts, enrichment, and lots of calm-home practice.",
    activities: [
      "Blanket-fort lounging",
      "Lick-mat afternoons",
      "Soft-toy search games",
      "Extra settle practice",
    ],
  },
  {
    week: 24,
    month: "November",
    dateRange: "November 9–13",
    startsOn: "2026-11-09",
    endsOn: "2026-11-13",
    name: "Kindness Week",
    blurb:
      "A feel-good week focused on gentle handling, calm greetings, and celebrating good canine citizens.",
    activities: [
      "Polite greeting practice",
      "Gentle handling games",
      "Kindness-note photo cards",
      "Calm group enrichment",
    ],
  },
  {
    week: 25,
    month: "November",
    dateRange: "November 16–20",
    startsOn: "2026-11-16",
    endsOn: "2026-11-20",
    name: "Thankful for My Pack Week",
    blurb:
      "We celebrate the pups, people, and routines that make Camp Waco feel like home.",
    activities: [
      "Pack portrait day",
      "Paw-print gratitude cards",
      "Favorite-game rotation",
      "Cozy group rest",
    ],
  },
  {
    week: 26,
    month: "November",
    dateRange: "November 23–27",
    startsOn: "2026-11-23",
    endsOn: "2026-11-27",
    name: "Pawsgiving Week",
    blurb:
      "A harvest-themed week with dog-safe enrichment, sniffing games, and plenty of post-play naps.",
    activities: [
      "Harvest snuffle hunt",
      "Dog-safe feast-style lick mats",
      "Turkey-day photo setup",
      "Long post-play rest blocks",
    ],
  },
  {
    week: 27,
    month: "November",
    dateRange: "November 30 – December 4",
    startsOn: "2026-11-30",
    endsOn: "2026-12-04",
    name: "Winter Wonderland Week",
    blurb:
      "We kick off December with snowy-looking games, winter photos, and cozy indoor enrichment.",
    activities: [
      "Soft snowball fetch",
      "Winter photo booth",
      "Frozen treat puzzles",
      "Cozy warm-up naps",
    ],
  },
  {
    week: 28,
    month: "December",
    dateRange: "December 7–11",
    startsOn: "2026-12-07",
    endsOn: "2026-12-11",
    name: "Christmas Card Week",
    blurb:
      "A full week built for the photo your family group chat actually wants to see.",
    activities: [
      "Mini holiday portraits",
      "Festive bandanas",
      "Paw-print keepsakes",
      "Calm pose-and-treat practice",
    ],
  },
  {
    week: 29,
    month: "December",
    dateRange: "December 14–18",
    startsOn: "2026-12-14",
    endsOn: "2026-12-18",
    name: "Grinchmas Week",
    blurb:
      "A mischievous green week of sniffing games, silly photos, and finding our biggest hearts.",
    activities: [
      "Find-the-heart sniff game",
      "Grinchy green photo setup",
      "Puzzle-box enrichment",
      "Good-dog heart awards",
    ],
  },
  {
    week: 30,
    month: "December",
    dateRange: "December 21–25",
    startsOn: "2026-12-21",
    endsOn: "2026-12-25",
    name: "Santa Paws Week",
    blurb:
      "Holiday week brings festive photos, treat puzzles, and lots of calm indoor play.",
    activities: [
      "Santa Paws portraits",
      "Treat-stocking puzzles",
      "Nice-list certificates",
      "Holiday enrichment rotation",
    ],
  },
  {
    week: 31,
    month: "December",
    dateRange: "December 28 – January 1",
    startsOn: "2026-12-28",
    endsOn: "2027-01-01",
    name: "New Year's Paw-ty Week",
    blurb:
      "We close out the year with confidence games, calm celebration, and a fresh-start photo moment.",
    activities: [
      "Party-hat photo booth",
      "Year-end pup awards",
      "Low-key sound confidence games",
      "Fresh-start enrichment stations",
    ],
    note: "Celebration stays dog-friendly and low-noise — no fireworks or loud noisemakers.",
  },
];

export const daycareMonthOrder: DaycareMonth[] = [
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function dateInWacoISO(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "00";
  const day = parts.find((part) => part.type === "day")?.value ?? "00";
  return `${year}-${month}-${day}`;
}

export function getCurrentDaycareTheme(now = new Date()): DaycareTheme | undefined {
  const today = dateInWacoISO(now);
  return daycareThemes.find(
    (theme) => theme.startsOn <= today && theme.endsOn >= today,
  );
}

export function getNextDaycareTheme(now = new Date()): DaycareTheme | undefined {
  const today = dateInWacoISO(now);
  return daycareThemes.find((theme) => theme.startsOn > today);
}

/** Current + future camp weeks, soonest first. */
export function getUpcomingDaycareThemes(now = new Date()): DaycareTheme[] {
  const today = dateInWacoISO(now);
  return daycareThemes.filter((theme) => theme.endsOn >= today);
}

/** Homepage/daycare preview: current week plus the next few weeks. */
export function getHomeDaycareThemes(limit = 4, now = new Date()): DaycareTheme[] {
  return getUpcomingDaycareThemes(now).slice(0, limit);
}

export const cityName = cityConfig.city;
