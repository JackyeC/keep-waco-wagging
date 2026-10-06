/**
 * Dated Waco Dog Weekend edition.
 * Keep picks grounded in confirmed events and existing directory listings.
 * Do not invent hours, policies, or prices.
 */

export const weekendEdition = {
  eyebrow: "Waco Dog Weekend",
  title: "What are we doing with the dog this weekend?",
  label: "A standing Saturday guide",
  intro:
    "A few repeating reasons to get out of the house — plus one small challenge for Waco:",
  challenge: "Move one purchase to a local business.",
  supporting:
    "You don't have to change your whole budget. Just move one purchase you were already going to make.",
};

export const moveOnePurchase = {
  heading: "Move one purchase.",
  intro:
    "Local does not have to mean spending more money. Take one thing you were already going to buy and buy it from someone here.",
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
    copy: "This may be one of the easiest Saturday ways to move a purchase local. Grab produce, bread, breakfast, meat, baked goods, honey, or something else you would have purchased anyway — and buy it directly from a local producer.",
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

export const weekendSafetyNote = {
  heading: "Your dog doesn't have to attend every dog-friendly event.",
  copy: "Crowds, noise, heat, unfamiliar dogs, and busy environments can be a lot. Sometimes the best dog-parent choice is letting your dog stay somewhere comfortable while you go — including a Camp Clayton daycare day if that fits.",
};

