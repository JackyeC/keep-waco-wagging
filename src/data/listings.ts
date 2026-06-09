import type { Listing } from "@/lib/types";

/**
 * Mock directory listings for the MVP.
 *
 * ⚠️ PLACEHOLDER DATA — names, addresses, phones, and websites below are
 * illustrative examples for layout/demo purposes only. Replace each entry with
 * verified Waco-area business data (and confirm dog policies directly with the
 * business) before launch. When wiring up Supabase/CMS, this array becomes a
 * `listings` table query with the same shape as the `Listing` type.
 */
export const listings: Listing[] = [
  {
    id: "l-001",
    name: "Brazos Bark & Brew",
    slug: "brazos-bark-and-brew",
    category: "Dog-Friendly Patios",
    area: "Downtown Waco",
    address: "100 Austin Ave, Waco, TX 76701",
    website: "https://example.com/brazos-bark-and-brew",
    phone: "(254) 555-0101",
    description:
      "A laid-back downtown taproom with a big shaded patio overlooking the Brazos. Counter-service food, plenty of water, and a welcoming crowd.",
    dogFriendlyNotes:
      "Leashed dogs welcome on the full patio. Staff keep a water station by the door and hand out the occasional treat.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Weekday late afternoons or before the weekend dinner rush.",
    goodForPuppies: true,
    goodForReactiveDogs: false,
    trainingTip:
      "Pick a corner table against a wall so your dog can settle with their back protected and watch the room calmly.",
    featured: true,
    imageUrl: undefined,
    tags: ["patio", "shade", "water bowls", "food", "downtown"],
  },
  {
    id: "l-002",
    name: "Cameron Park Bark Trails",
    slug: "cameron-park-bark-trails",
    category: "Parks",
    area: "Cameron Park",
    address: "2601 N University Parks Dr, Waco, TX 76708",
    website: "https://example.com/cameron-park",
    description:
      "Hundreds of acres of bluffs, woods, and river access. The shaded loop trails are a Waco favorite for longer dog walks.",
    dogFriendlyNotes:
      "Dogs must stay leashed. Several trailheads have shade; bring your own water on warm days as fountains are limited.",
    shadeAvailable: true,
    waterAvailable: false,
    bestTimeToVisit: "Early morning to beat Texas heat and crowds.",
    goodForPuppies: false,
    goodForReactiveDogs: true,
    trainingTip:
      "Use the wide gravel trails to practice loose-leash walking — there's room to add distance from passing hikers and bikes.",
    featured: true,
    imageUrl: undefined,
    tags: ["trail", "shade", "nature", "leashed", "river"],
  },
  {
    id: "l-003",
    name: "Magnolia Lawn Strolls",
    slug: "magnolia-lawn-strolls",
    category: "Dog-Friendly Shopping",
    area: "Downtown Waco",
    address: "601 Webster Ave, Waco, TX 76706",
    website: "https://example.com/magnolia-lawn",
    description:
      "The open lawn and outdoor shopping paths are a fun, busy spot for confident dogs who love people-watching.",
    dogFriendlyNotes:
      "Leashed dogs welcome in outdoor areas; indoor shops vary, so ask first. Expect crowds on weekends.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Weekday mornings for a calmer, less crowded visit.",
    goodForPuppies: false,
    goodForReactiveDogs: false,
    trainingTip:
      "This is an advanced-level outing. If crowds feel like a lot, work on calm settling at a quiet patio first.",
    featured: false,
    imageUrl: undefined,
    tags: ["shopping", "busy", "people-watching", "downtown"],
  },
  {
    id: "l-004",
    name: "Woodway Pup Provisions",
    slug: "woodway-pup-provisions",
    category: "Pet Stores",
    area: "Woodway",
    address: "9000 Woodway Dr, Woodway, TX 76712",
    website: "https://example.com/woodway-pup-provisions",
    phone: "(254) 555-0144",
    description:
      "Locally owned pet store stocking quality food, enrichment toys, and Texas-made treats. Friendly staff who know their regulars.",
    dogFriendlyNotes:
      "Well-behaved leashed dogs welcome inside. Treats at the register and a water bowl by the door.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Anytime — quietest on weekday mornings.",
    goodForPuppies: true,
    goodForReactiveDogs: false,
    trainingTip:
      "Aisles make a great low-pressure place to practice 'let's go' turns and reward calm checking-in.",
    featured: false,
    imageUrl: undefined,
    tags: ["pet store", "treats", "indoor", "local"],
  },
  {
    id: "l-005",
    name: "Hewitt Paws Grooming",
    slug: "hewitt-paws-grooming",
    category: "Groomers",
    area: "Hewitt",
    address: "200 Hewitt Dr, Hewitt, TX 76643",
    website: "https://example.com/hewitt-paws",
    phone: "(254) 555-0177",
    description:
      "Small-batch grooming salon focused on low-stress handling and gentle pacing for nervous dogs.",
    dogFriendlyNotes:
      "By appointment. They offer a quiet meet-and-greet for anxious dogs before the first full groom.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Book mid-week mornings for the calmest environment.",
    goodForPuppies: true,
    goodForReactiveDogs: true,
    trainingTip:
      "Do a few happy 'drop-in' visits for treats before grooming day so the salon predicts good things.",
    featured: false,
    imageUrl: undefined,
    tags: ["groomer", "appointment", "low-stress", "puppy-friendly"],
  },
  {
    id: "l-006",
    name: "China Spring Country Trail",
    slug: "china-spring-country-trail",
    category: "Trails",
    area: "China Spring",
    address: "Off Old China Spring Rd, China Spring, TX 76633",
    description:
      "A quieter, open country trail with big skies and fewer crowds — great for dogs still building confidence around distractions.",
    dogFriendlyNotes:
      "Leashed dogs welcome. Limited shade and no water sources, so plan around the heat.",
    shadeAvailable: false,
    waterAvailable: false,
    bestTimeToVisit: "Cool mornings; avoid mid-day in summer.",
    goodForPuppies: true,
    goodForReactiveDogs: true,
    trainingTip:
      "Open sightlines let you reward your dog for noticing a distraction and choosing to look back at you.",
    featured: false,
    imageUrl: undefined,
    tags: ["trail", "quiet", "open", "country"],
  },
  {
    id: "l-007",
    name: "Riverside Coffee Co.",
    slug: "riverside-coffee-co",
    category: "Coffee Shops",
    area: "Downtown Waco",
    address: "415 Franklin Ave, Waco, TX 76701",
    website: "https://example.com/riverside-coffee",
    phone: "(254) 555-0188",
    description:
      "Cozy independent coffee shop with a small front patio and a steady stream of regulars and their dogs.",
    dogFriendlyNotes:
      "Dogs welcome on the patio. Pup-cups available on request. Limited space, so it can feel close on busy mornings.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Mid-morning lull, after the commuter rush.",
    goodForPuppies: true,
    goodForReactiveDogs: false,
    trainingTip:
      "Practice a solid 'settle on a mat' at home first — a small patio rewards a dog that can tuck under the table.",
    featured: false,
    imageUrl: undefined,
    tags: ["coffee", "patio", "pup-cup", "downtown"],
  },
  {
    id: "l-008",
    name: "Central Texas Veterinary Care",
    slug: "central-texas-veterinary-care",
    category: "Vets",
    area: "Waco",
    address: "1500 Valley Mills Dr, Waco, TX 76710",
    website: "https://example.com/ctx-vet",
    phone: "(254) 555-0199",
    description:
      "Full-service veterinary clinic with fear-free–minded staff and separate cat/dog waiting areas.",
    dogFriendlyNotes:
      "Leashed dogs only in the lobby. Ask about car-side check-in for dogs who find the waiting room stressful.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "First appointment of the day for a quiet lobby.",
    goodForPuppies: true,
    goodForReactiveDogs: true,
    trainingTip:
      "Schedule a 'happy visit' — just walk in, get a treat, and leave — to keep the vet from always meaning shots.",
    featured: false,
    imageUrl: undefined,
    tags: ["vet", "fear-free", "appointment", "health"],
  },
  {
    id: "l-009",
    name: "Robinson Run & Board",
    slug: "robinson-run-and-board",
    category: "Boarding + Daycare",
    area: "Robinson",
    address: "300 W Tate Ave, Robinson, TX 76706",
    website: "https://example.com/robinson-run-board",
    phone: "(254) 555-0123",
    description:
      "Daycare and overnight boarding with structured play groups and quiet rest time built into the day.",
    dogFriendlyNotes:
      "Temperament evaluation required before first stay. Indoor + outdoor play yards with shade sails.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Tour mid-morning to see play groups in action.",
    goodForPuppies: true,
    goodForReactiveDogs: false,
    trainingTip:
      "A short, structured daycare day can take the edge off, but it's not a substitute for calm-skills training.",
    featured: false,
    imageUrl: undefined,
    tags: ["daycare", "boarding", "play groups", "overnight"],
  },
  {
    id: "l-010",
    name: "Bellmead Bark Park",
    slug: "bellmead-bark-park",
    category: "Parks",
    area: "Bellmead",
    address: "3015 Bellmead Dr, Bellmead, TX 76705",
    description:
      "Fenced off-leash area with separate small-dog and large-dog sides, plus shaded benches for the humans.",
    dogFriendlyNotes:
      "Off-leash within the fenced area only. Double-gated entry. Bring your own water on hot days.",
    shadeAvailable: true,
    waterAvailable: false,
    bestTimeToVisit: "Early evening when it cools down and play is mellower.",
    goodForPuppies: false,
    goodForReactiveDogs: false,
    trainingTip:
      "Off-leash parks reward dogs who already have a reliable recall — practice 'come' on a long line first.",
    featured: false,
    imageUrl: undefined,
    tags: ["off-leash", "fenced", "park", "play"],
  },
  {
    id: "l-011",
    name: "The Wagging Acre Apartments",
    slug: "the-wagging-acre-apartments",
    category: "Apartments",
    area: "Woodway",
    address: "5400 Sanger Ave, Waco, TX 76710",
    website: "https://example.com/wagging-acre",
    phone: "(254) 555-0166",
    description:
      "Pet-forward apartment community with a fenced bark park, pet washing station, and dog-waste stations throughout.",
    dogFriendlyNotes:
      "Breed and weight policies apply — confirm with leasing. On-site bark park is for residents only.",
    shadeAvailable: true,
    waterAvailable: true,
    bestTimeToVisit: "Schedule a tour on a weekday afternoon.",
    goodForPuppies: true,
    goodForReactiveDogs: true,
    trainingTip:
      "Apartment living goes smoother with solid potty-cue and elevator/hallway manners — great early training goals.",
    featured: false,
    imageUrl: undefined,
    tags: ["apartments", "pet-friendly", "bark park", "wash station"],
  },
  {
    id: "l-012",
    name: "Platinum Scoops Yard Care",
    slug: "platinum-scoops-yard-care",
    category: "Yard Care",
    area: "Greater Waco",
    address: "Serving Waco, Woodway, Hewitt, Robinson & nearby areas",
    website: "https://platinumscoops.com",
    description:
      "Pet waste removal and yard care that keeps your dog's space clean, fresh, and guest-ready. The presenting sponsor of Keep Waco Wagging.",
    dogFriendlyNotes:
      "Recurring scooping, odor support, and pre-party yard prep so your yard stays a place everyone wants to be.",
    shadeAvailable: false,
    waterAvailable: false,
    bestTimeToVisit: "Book a recurring plan online anytime.",
    goodForPuppies: true,
    goodForReactiveDogs: true,
    trainingTip:
      "A consistently clean yard makes potty routines clearer for dogs and easier for you to reinforce.",
    featured: true,
    imageUrl: undefined,
    tags: ["yard care", "pet waste removal", "Platinum Scoops", "sponsor"],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

/** Nearby places in the same area (excluding the current listing). */
export function getNearbyListings(listing: Listing, limit = 3): Listing[] {
  return listings
    .filter((l) => l.id !== listing.id && l.area === listing.area)
    .slice(0, limit);
}
