/**
 * Waco Dog Weekend — evergreen local ideas.
 * Recurring Saturday stops stay; dated one-off events do not.
 * Always verify hours and dog policies before you go.
 */

export const weekendEdition = {
  dates: null,
  eyebrow: "Waco Dog Weekend",
  title: "What can we do with the dog this weekend?",
  label: "Evergreen weekend ideas",
  intro:
    "A few good reasons to get out of the house — plus one small challenge for Waco:",
  challenge: "Move one purchase you were already going to make to a local business.",
  supporting: "You don't have to change your whole budget. Just move one purchase.",
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
    when: "Saturdays · 9 AM–1 PM",
    place: "Bridge Street Plaza",
    address: "200 E Bridge St, Waco, TX",
    copy: "One of the easiest ways to move a purchase local. Grab produce, bread, breakfast, meat, baked goods, honey, or something else you would have purchased anyway — and buy it directly from a local producer.",
    dogNote:
      "Dogs are welcome. Keep dogs leashed, give other dogs space, and clean up after them.",
    href: "https://wacodowntownfarmersmarket.org/",
    directoryHref: "/dog-friendly-waco/waco-downtown-farmers-market",
  },
  {
    id: "street-dog-cafe",
    title: "Street Dog Cafe",
    when: "Anytime you already wanted coffee",
    place: "East Waco / Elm Avenue",
    address: "406 Elm Ave, Waco, TX",
    copy: "If coffee or breakfast was already part of the plan, make that your local purchase. Street Dog Cafe gives Waco dog people an easy place to grab breakfast or coffee while supporting a local business.",
    dogNote: "Pups are welcome in the outdoor area. Verify the current patio policy before you go.",
    href: "https://www.streetdogcafe.com/",
    directoryHref: "/dog-friendly-waco/street-dog-cafe",
  },
  {
    id: "brotherwell",
    title: "Brotherwell Brewing",
    when: "Afternoon patio",
    place: "Bridge Street",
    address: "400 E Bridge St, Waco, TX",
    copy: "If the day turns into an afternoon around Bridge Street, Brotherwell is another locally rooted stop. Leashed dogs are welcome in the outdoor area.",
    dogNote: "Leashed dogs are welcome in the outdoor area. Confirm hours before you go.",
    href: "https://www.brotherwell.com/taproom",
  },
] as const;

export const weekendParkPick = {
  title: "North Waco Park",
  when: "Early or late in the heat",
  place: "North Waco",
  address: "North Waco Park, Waco, TX",
  copy: "Outdoor space and walking areas for leashed dogs and their people. Go early or late during hot weather, and skip it if the pavement fails the 7-second test.",
  dogNote:
    "Leashed dogs. Bring water. A park is not automatically a good outing for every dog — reactive or heat-sensitive dogs may be happier at home.",
  href: "/dog-friendly-waco/north-waco-park",
  directoryHref: "/dog-friendly-waco/north-waco-park",
} as const;

export const weekendSafetyNote = {
  heading: "Your dog doesn't have to attend every dog-friendly outing.",
  copy: "Crowds, noise, heat, unfamiliar dogs, and busy environments can be a lot. Sometimes the best dog-parent choice is letting your dog stay somewhere comfortable while you go — including a Camp Clayton daycare day if that fits.",
};

export const weekendCampClayton = {
  eyebrow: "When they should stay home",
  heading: "Camp Clayton daycare",
  dates: null,
  descriptor: "Themed doggie daycare by Keep Waco Wagging",
  copy: "If the weekend plan is too much dog — heat, crowds, or a long day out — Camp Clayton is the calm, supervised alternative. Play, enrichment, rest, and the same people your dog already knows.",
  activities: [
    "Supervised play",
    "Enrichment and sniffing games",
    "Shaded rest between activities",
    "Daily photos when they stay",
  ],
  note: "We adjust the day to the dogs in front of us. Not every dog needs every activity.",
  dropIn: "Come one day or make Camp Clayton part of your dog's weekly routine.",
} as const;
