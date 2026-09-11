/**
 * Dated Waco Dog Weekend edition.
 * Keep picks grounded in confirmed events and existing directory listings.
 * Do not invent hours, policies, or prices.
 */

export const weekendEdition = {
  dates: "September 12–13, 2026",
  eyebrow: "Waco Dog Weekend · September 12–13",
  title: "What are we doing with the dog this weekend?",
  label: "September 12–13, 2026",
  intro:
    "A few good reasons to get out of the house — plus one small challenge for Waco:",
  challenge: "This weekend, move one purchase to a local business.",
  supporting:
    "You don't have to change your whole budget. Just move one purchase.",
};

export const moveOnePurchase = {
  heading: "Move one purchase.",
  intro:
    "Local does not have to mean spending more money. Take one thing you were already going to buy this weekend and buy it from someone here.",
  examples: [
    { from: "Coffee", to: "a Waco coffee shop" },
    { from: "Produce or groceries", to: "a Waco farmer or maker" },
    { from: "Dog food or treats", to: "a local pet/feed business" },
    { from: "Weekend outing", to: "buy something from a local vendor" },
  ],
  closing:
    "One purchase seems small. But a lot of Waco families making one different choice adds up.",
  ctaLabel: "Show us where you spent local",
  instagramHandle: "@keepwacowagging",
  instagramUrl: "https://www.instagram.com/keepwacowagging/",
} as const;

export const weekendSaturdayStops = [
  {
    id: "farmers-market",
    title: "Waco Downtown Farmers Market",
    when: "Saturday · 9 AM–1 PM",
    place: "Bridge Street Plaza",
    address: "200 E Bridge St, Waco, TX",
    copy: "This may be one of the easiest ways to move a purchase local this weekend. Grab produce, bread, breakfast, meat, baked goods, honey, or something else you would have purchased anyway — and buy it directly from a local producer.",
    dogNote:
      "Dogs are welcome. Keep dogs leashed, give other dogs space, and clean up after them.",
    href: "https://wacodowntownfarmersmarket.org/",
    directoryHref: "/dog-friendly-waco/waco-downtown-farmers-market",
  },
  {
    id: "street-dog-cafe",
    title: "Street Dog Cafe",
    when: "Saturday",
    place: "East Waco / Elm Avenue",
    address: "406 Elm Ave, Waco, TX",
    copy: "If coffee or breakfast was already part of your Saturday plan, make that your local purchase. Street Dog Cafe gives Waco dog people an easy place to grab breakfast or coffee while supporting a local business.",
    dogNote: "Pups are welcome in the outdoor area.",
    href: "https://www.streetdogcafe.com/",
    directoryHref: "/dog-friendly-waco/street-dog-cafe",
  },
  {
    id: "brotherwell",
    title: "Brotherwell Brewing",
    when: "Saturday afternoon",
    place: "Bridge Street",
    address: "400 E Bridge St, Waco, TX",
    copy: "If your Saturday turns into an afternoon around Bridge Street, Brotherwell is another locally rooted stop. Leashed dogs are welcome in the outdoor area.",
    dogNote: "Leashed dogs are welcome in the outdoor area.",
    href: "https://www.brotherwell.com/taproom",
  },
] as const;

export const weekendSundayFeature = {
  title: "Doggie Day at The Will — Dash for the Daisies",
  when: "Sunday · Noon–8 PM",
  place: "The Will",
  address: "5984 N State Hwy 6, Waco, TX",
  copy: "This one is for the Waco dog people. Doggie Day includes dog-focused activities and the Dash for the Daisies Dachshund Derby.",
  homeGrown: {
    href: "https://www.thewillofwaco.com/homegrown-sunday",
    label: "HomeGrown Sunday",
    rest: "’s local artisan market also runs from 1–5 PM, weather permitting, so this is an easy place to move one purchase to a local maker while you’re there.",
  },
  dogNote:
    "Dog-friendly does not mean every dog will enjoy it. Before bringing your dog, think about how they handle crowds, unfamiliar dogs, noise, heat, and longer outings.",
  href: "https://www.thewillofwaco.com/event-details-registration/doggie-day-at-the-will-dash-for-daisies-2026-09-13-12-00",
} as const;

/**
 * City of Waco listing as of this edition: Microchip & Vaccination Event,
 * 13 Sep 2026, Knox Hall. No start time was published on the city listing.
 */
export const weekendCommunityNote = {
  heading: "Microchips + vaccinations Sunday",
  copy: "The City of Waco has a Microchip & Vaccination Event Sunday at Knox Hall, 101 Texas Ranger Trail, Waco, TX 76706. City of Waco residents' pets can receive a free microchip. The listing also notes free rabies vaccine if the animal is already spayed/neutered, free DAPP vaccination, and $10 rabies vaccinations if the pet is not spayed/neutered or is from outside city limits.",
  verify:
    "Check the City of Waco event listing before heading out for the latest details.",
  href: "https://www.waco-texas.com/Events-Activities",
} as const;

export const weekendSafetyNote = {
  heading: "Your dog doesn't have to attend every dog-friendly event.",
  copy: "Crowds, noise, heat, unfamiliar dogs, and busy environments can be a lot. Sometimes the best dog-parent choice is letting your dog stay somewhere comfortable while you go. That counts too.",
};

export const weekendCampClayton = {
  eyebrow: "Next week at Camp Clayton",
  heading: "Apple Orchard Week 🍎🐾",
  dates: "September 14–18",
  descriptor: "Themed doggie daycare by Keep Waco Wagging",
  copy: "We're bringing a little early fall to Camp Clayton next week. Apple Orchard Week mixes our regular supervised daycare routine with orchard-inspired sniffing games, enrichment, search activities, photo moments, and plenty of rest.",
  activities: [
    "Apple-themed sniffing games",
    "Harvest basket photo setup",
    "Crunch-and-search puzzles",
    "Fall sensory activities",
    "Supervised play",
    "Cozy rest between activities",
  ],
  note: "Do not expect every dog to complete every activity. We adjust the day to the dogs participating.",
  dropIn: "Come one day or make Camp Clayton part of your dog's weekly routine. Dogs do not need to attend the full week.",
} as const;
