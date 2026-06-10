import type { DogDirectoryListing } from "@/lib/types";

export const directoryCategories = [
  "Dog-friendly patios",
  "Coffee shops",
  "Breweries and bars",
  "Parks and trails",
  "Dog parks",
  "Groomers",
  "Vets",
  "Emergency vets",
  "Boarding and daycare",
  "Trainers",
  "Pet boutiques",
  "Apartment communities",
  "Events",
  "Local rescues",
  "Pet photographers",
  "Dog-friendly hotels",
] as const;

export const directoryListings: DogDirectoryListing[] = [
  {
    id: "street-dog-cafe",
    slug: "street-dog-cafe",
    name: "Street Dog Cafe",
    category: "Coffee shops",
    address: "406 Elm Ave., Waco, TX 76704",
    phone: "(254) 910-6150",
    website: "https://streetdogcafe.com",
    neighborhood: "East Waco / Elm Avenue",
    dogPolicy: "Dog-friendly patio. Verify current policy before visiting.",
    patioDetails: "Outdoor patio.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "Morning or early afternoon.",
    description:
      "Street Dog Cafe is a mission-driven Waco coffee spot on Elm Avenue with a dog-friendly patio and a heart for local rescue work.",
    notes: "Potential featured listing and sponsor fit.",
    sourceUrls: [
      "https://texashighways.com/food-drink/street-dog-cafe-in-waco-is-on-a-heartfelt-mission/",
      "https://www.streetdogcafe.com/our-story",
    ],
    lastVerified: "2026-06-09",
    sponsorTier: "featured",
    isSponsored: false,
    badges: ["Patio-friendly", "Verify before visiting", "Locally loved"],
  },
  {
    id: "milo-waco",
    slug: "milo-waco",
    name: "Milo",
    category: "Dog-friendly patios",
    address: "1020 Franklin Ave., Waco, TX 76701",
    phone: "TODO verify",
    website: "https://www.milowaco.com",
    neighborhood: "Downtown Waco",
    dogPolicy:
      "Dogs allowed on outdoor patio. Dogs must be leashed and well-behaved. Owner-supplied water bowl is allowed. Verify before visiting.",
    patioDetails: "Outdoor patio.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "Lunch, brunch, or happy hour patio weather.",
    description:
      "Milo is a Southern-inspired Waco restaurant with a posted dog policy for its outdoor patio.",
    notes: "Good fit for dog-friendly patio guide.",
    sourceUrls: ["https://www.milowaco.com/dog-policy/"],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Patio-friendly", "Leash required", "Verify before visiting"],
  },
  {
    id: "southern-roots-brewing-co",
    slug: "southern-roots-brewing-co",
    name: "Southern Roots Brewing Co.",
    category: "Breweries and bars",
    address: "219 N. 8th St., Waco, TX 76701",
    phone: "(254) 732-2309",
    website: "https://southernrootsbrewingco.com",
    neighborhood: "Downtown Waco",
    dogPolicy: "Dog-friendly patio. Verify before each visit.",
    patioDetails: "Outdoor patio.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "Afternoon or early evening.",
    description:
      "Southern Roots Brewing Co. is a downtown Waco brewery with a patio that may be a good fit for dog-friendly outings.",
    notes: "Potential event partner or sponsor.",
    sourceUrls: [
      "https://www.bringfido.com/restaurant/77606",
      "https://southernrootsbrewingco.com",
    ],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Patio-friendly", "Verify before visiting"],
  },
  {
    id: "hecho-en-waco",
    slug: "hecho-en-waco",
    name: "Hecho en Waco",
    category: "Dog-friendly patios",
    address: "300 S. 6th St., Ste B, Waco, TX 76701",
    phone: "TODO verify",
    website: "https://hechoenwaco.com",
    neighborhood: "Downtown Waco",
    dogPolicy:
      "Dogs allowed on patio according to public Q&A. Verify directly before visiting.",
    patioDetails: "Outdoor patio.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "Happy hour or patio weather.",
    description:
      "Hecho en Waco is a downtown restaurant that may allow dogs on the patio. Dog policy should be verified before publishing as fully confirmed.",
    notes: "Mark as “verify before visiting.”",
    sourceUrls: ["https://hechoenwaco.com", "https://www.yelp.com/biz/hecho-en-waco-waco"],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Patio-friendly", "Verify before visiting"],
  },
  {
    id: "terry-blacks-bbq-waco",
    slug: "terry-blacks-bbq-waco",
    name: "Terry Black's BBQ",
    category: "Dog-friendly patios",
    address: "228 S. 8th St., Waco, TX 76701",
    phone: "TODO verify",
    website: "https://terryblacksbbq.com/waco",
    neighborhood: "Downtown Waco",
    dogPolicy: "Outdoor patio only. Verify dog policy directly.",
    patioDetails: "Outdoor patio.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "TODO",
    description:
      "Terry Black's BBQ is a high-traffic Waco restaurant near downtown attractions. Dog policy should be verified directly before publishing as confirmed.",
    notes: "Potential tourist-friendly listing.",
    sourceUrls: ["https://terryblacksbbq.com/waco"],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Outdoor only", "Verify before visiting", "Tourist-friendly"],
  },
  {
    id: "north-waco-park",
    slug: "north-waco-park",
    name: "North Waco Park",
    category: "Parks and trails",
    address: "2128 Edna Ave., Waco, TX 76708",
    phone: "(254) 750-5980",
    website:
      "https://www.waco-texas.com/Departments/Parks-Recreation/Parks-Playgrounds-Splash-Pads-Trails/North-Waco-Park",
    neighborhood: "North Waco",
    dogPolicy: "Leashed dogs only unless otherwise posted.",
    patioDetails: "Outdoor park with paved walking trail and shade areas.",
    waterBowls: "unknown",
    shade: "yes",
    bestTimeToVisit: "Morning or evening during hot weather.",
    description:
      "North Waco Park offers outdoor space and walking areas for leashed dogs and their people.",
    notes: "Good non-commercial directory listing.",
    sourceUrls: [
      "https://www.waco-texas.com/Departments/Parks-Recreation/Parks-Playgrounds-Splash-Pads-Trails/North-Waco-Park",
    ],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Leash required", "Shade available"],
  },
  {
    id: "waco-mammoth-national-monument",
    slug: "waco-mammoth-national-monument",
    name: "Waco Mammoth National Monument",
    category: "Parks and trails",
    address: "6220 Steinbeck Bend Dr., Waco, TX 76708",
    phone: "(254) 750-7946",
    website: "https://www.nps.gov/waco",
    neighborhood: "North Waco",
    dogPolicy:
      "Pets are welcome in all outdoor areas. Pets are not allowed in the dig shelter or buildings. Leash required.",
    patioDetails: "Outdoor paved trail and grassy areas.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "Morning or cooler weather.",
    description:
      "Waco Mammoth National Monument is a dog-friendly outdoor stop where leashed pets are welcome in outdoor areas, though not inside buildings or the dig shelter.",
    notes: "Strong visitor-focused listing.",
    sourceUrls: ["https://www.nps.gov/waco/planyourvisit/pets.htm"],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Leash required", "Outdoor only", "Tourist-friendly"],
  },
  {
    id: "magnolia-market-at-the-silos",
    slug: "magnolia-market-at-the-silos",
    name: "Magnolia Market at the Silos",
    category: "Pet boutiques",
    address: "601 Webster Ave., Waco, TX 76706",
    phone: "(254) 235-0603",
    website: "https://magnolia.com/pages/visit",
    neighborhood: "Downtown Waco",
    dogPolicy:
      "Dogs are welcome on property when leashed. Dogs are not allowed on artificial turf areas, inside Silos Baking Co., Magnolia Press Coffee, Magnolia Table, or during ticketed events.",
    patioDetails: "Outdoor grounds.",
    waterBowls: "unknown",
    shade: "unknown",
    bestTimeToVisit: "Morning or weekday.",
    description:
      "Magnolia Market at the Silos is one of Waco's most visited attractions and allows leashed dogs in some outdoor areas, with clear restrictions.",
    notes: "High-traffic tourism listing.",
    sourceUrls: [
      "https://help.magnolia.com/hc/en-us/articles/31170271426452-Dog-Policy-at-the-Silos",
    ],
    lastVerified: "2026-06-09",
    sponsorTier: "none",
    badges: ["Leash required", "Outdoor only", "Tourist-friendly"],
  },
];

export function getDirectoryListingBySlug(slug: string) {
  return directoryListings.find((listing) => listing.slug === slug);
}

export function getFeaturedDirectoryListings(limit = 4) {
  return directoryListings.slice(0, limit);
}

export function getDirectoryNeighborhoods() {
  return Array.from(
    new Set(directoryListings.map((listing) => listing.neighborhood).filter(Boolean)),
  ) as string[];
}
