export type DogFriendlyEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  category: string;
  dogPolicy: string;
  cost: string;
  requirements?: string;
  whyShare: string;
  sourceUrl: string;
  sourceLabel: string;
  warning?: string;
  featured?: boolean;
  lastVerified: string;
};

export const dogFriendlyEvents: DogFriendlyEvent[] = [
  {
    id: "pops-buckets-bandannas-2026",
    title: "Buckets & Bandannas at Pop's Lemonade",
    start: "2026-11-10T15:00:00-06:00",
    end: "2026-11-10T18:00:00-06:00",
    dateLabel: "Tuesday, November 10",
    timeLabel: "3–6 PM",
    venue: "Pop's Lemonade Company",
    address: "3428 Franklin Ave., Waco, TX",
    category: "Dog-friendly social",
    dogPolicy:
      "Dogs are explicitly invited. Bring your pup for the photo booth and Pop's Pup Club.",
    cost:
      "No separate event admission is listed. Purchase a bucket of lemonade to receive the free Pop's Pup bandanna.",
    whyShare:
      "A genuinely dog-centered local-business outing with a photo moment and a simple reason to get out with your pup.",
    sourceUrl: "https://www.wacorestaurantweek.com/events",
    sourceLabel: "Waco Restaurant Week",
    featured: true,
    lastVerified: "2026-11-09",
  },
  {
    id: "waco-veterans-day-parade-tgpr-2026",
    title: "Waco Veterans Day Parade with Texas Great Pyrenees Rescue",
    start: "2026-11-11T11:00:00-06:00",
    dateLabel: "Wednesday, November 11",
    timeLabel: "Parade starts 11 AM · TGPR meetup time TBA",
    venue: "Downtown Waco",
    address: "Austin Avenue, Waco, TX",
    category: "Dog-friendly community parade / rescue",
    dogPolicy:
      "Texas Great Pyrenees Rescue explicitly invites people to bring their dogs and walk alongside the rescue in the parade.",
    cost: "Spectating is free. TGPR has not published a participation fee.",
    requirements:
      "TGPR's specific meetup time and assembly point are still TBA. Confirm with the rescue before planning to march.",
    whyShare:
      "Local dog parents can participate with their dogs while supporting rescue volunteers and honoring veterans.",
    sourceUrl: "https://tgpr.org/events/",
    sourceLabel: "Texas Great Pyrenees Rescue",
    warning:
      "The general parade start is confirmed for 11 AM, but TGPR's dog-walking group has not posted its own meetup time.",
    featured: true,
    lastVerified: "2026-11-09",
  },
  {
    id: "pet-circle-farmers-market-nov-14-2026",
    title: "Pet Circle at the Waco Downtown Farmers Market",
    start: "2026-11-14T09:00:00-06:00",
    end: "2026-11-14T13:00:00-06:00",
    dateLabel: "Saturday, November 14",
    timeLabel: "9 AM–1 PM",
    venue: "Waco Downtown Farmers Market",
    address: "Bridge Street Plaza · 200 E. Bridge St., Waco, TX",
    category: "Dog-friendly market / rescue outreach",
    dogPolicy:
      "Leashed dogs are welcome at the market. Clean up after your dog and give other dogs space.",
    cost: "No event admission or registration fee is listed.",
    requirements:
      "Pet Circle is scheduled for community outreach. Do not assume adoptable animals will be onsite unless Pet Circle confirms it.",
    whyShare:
      "An easy Saturday outing where dog parents can shop local with their pups and learn about Pet Circle's adoption, fostering, and animal-welfare programs.",
    sourceUrl: "https://www.petcirclewaco.org/Events",
    sourceLabel: "Pet Circle",
    featured: true,
    lastVerified: "2026-11-11",
  },
  {
    id: "dash-for-daisies-november-2026",
    title: "Dash for Daisies Dachshund Derby",
    start: "2026-11-15T12:00:00-06:00",
    dateLabel: "Sunday, November 15",
    timeLabel: "Event starts at noon · race registration 3:30–4:30 PM",
    venue: "The Will",
    address: "5984 N. State Hwy 6, Waco, TX",
    category: "Dog-specific event / dachshund derby",
    dogPolicy:
      "Dog-centered event. Bring your dachshund to race or come cheer on the weenie dogs.",
    cost: "Current November listing does not publish a race-entry fee.",
    requirements:
      "The venue notes that derby dates are subject to change, so check the current calendar before you go.",
    whyShare:
      "One of Waco's most dog-specific recurring events and a fun community outing for dachshund lovers.",
    sourceUrl: "https://www.thewillofwaco.com/themainstage",
    sourceLabel: "The Will",
    warning:
      "An older November 8 event page is still online. The Will's current featured calendar shows November 15.",
    featured: true,
    lastVerified: "2026-11-11",
  },
  {
    id: "richland-mall-pet-photos-santa-2026",
    title: "Pet Photos with Santa",
    start: "2026-11-16T10:00:00-06:00",
    end: "2026-12-14T20:00:00-06:00",
    dateLabel: "Mondays, November 16–December 14",
    timeLabel: "Appointment times vary",
    venue: "Richland Mall",
    address: "6001 W. Waco Dr., Waco, TX",
    category: "Holiday pet photos",
    dogPolicy:
      "Pets are explicitly invited for dedicated Santa photo sessions.",
    cost: "Photo-package pricing is shown during booking.",
    requirements:
      "Advance reservations are recommended so you can choose a preferred date and time.",
    whyShare:
      "A pet-specific holiday tradition with multiple dates, giving Waco families time to plan instead of scrambling at the last minute.",
    sourceUrl:
      "https://richlandmall.com/store/santas_workshop/event/pet-photos-with-santa",
    sourceLabel: "Richland Mall",
    featured: true,
    lastVerified: "2026-11-09",
  },
  {
    id: "dash-for-daisies-december-2026",
    title: "Dash for Daisies Dachshund Derby",
    start: "2026-12-13T12:00:00-06:00",
    dateLabel: "Sunday, December 13",
    timeLabel: "Starts at noon",
    venue: "The Will",
    address: "5984 N. State Hwy 6, Waco, TX",
    category: "Dog-specific event / dachshund derby",
    dogPolicy:
      "Dog-centered event. Bring your dachshund to race or come cheer on the weenie dogs.",
    cost: "Current December listing does not publish a race-entry fee.",
    requirements:
      "Check The Will's current event page before you go in case the race schedule changes.",
    whyShare:
      "A December return of one of Waco's most dog-specific recurring events and a fun outing for dachshund families and spectators.",
    sourceUrl: "https://www.thewillofwaco.com/themainstage",
    sourceLabel: "The Will",
    featured: true,
    lastVerified: "2026-11-11",
  },
  {
    id: "waco-wonderland-2026",
    title: "Waco Wonderland",
    start: "2026-12-04T17:00:00-06:00",
    end: "2026-12-06T18:00:00-06:00",
    dateLabel: "Friday–Sunday, December 4–6",
    timeLabel: "Fri 5–10 PM · Sat 10 AM–9 PM · Sun noon–6 PM",
    venue: "Heritage Square",
    address: "300 Austin Ave., Waco, TX",
    category: "Dog-friendly holiday festival",
    dogPolicy:
      "Well-behaved, leashed dogs are explicitly welcome at Waco Wonderland.",
    cost:
      "Admission is free. Attraction wristbands are optional and sold separately.",
    requirements:
      "Bring a leash and plan around crowds, weather, noise, and your individual dog's comfort level.",
    whyShare:
      "A major Waco holiday tradition where dogs are officially welcome, with a clear safety note dog parents should know before choosing a day.",
    sourceUrl: "https://www.wacowonderland.com/contact",
    sourceLabel: "Waco Wonderland",
    warning:
      "Organizers do not recommend bringing dogs Friday evening because of the fireworks show. Saturday or Sunday are the better dog options.",
    featured: true,
    lastVerified: "2026-11-09",
  },
];

export function getUpcomingEvents(now: Date = new Date()): DogFriendlyEvent[] {
  const nowMs = now.getTime();

  return dogFriendlyEvents
    .filter((event) => {
      const endMs = Date.parse(event.end ?? event.start);
      return endMs >= nowMs;
    })
    .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}
