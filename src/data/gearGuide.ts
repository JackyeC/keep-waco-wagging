import { buildAmazonAffiliateUrl, buildAmazonProductImageUrl, ctas } from "@/lib/site";
import { shopProductImages } from "@/data/shopProductImages";
import type { GearGuideDepartment, GearGuideProduct } from "@/lib/types";

export const GEAR_GUIDE_AFFILIATE_DISCLOSURE =
  "Some links are Amazon affiliate links, which means we may earn a small commission if you buy. It does not change your price. We only list products we actually use, have bought, are considering, or would reasonably recommend to Waco dog parents.";

export const gearGuideCoverLines = [
  "The gear behind real dog-care days",
  "What belongs in the cleanup cabinet",
  "Waco summer safety picks",
  "Treats that work harder than they look",
  "Boring products that save the day",
  "Things we use carefully",
] as const;

type ProductSeed = Omit<
  GearGuideProduct,
  "amazonUrl" | "link" | "affiliateReady" | "affiliateDisclosureRequired" | "imageUrl" | "category"
> & {
  asin?: string;
  category?: string;
  link?: string;
  /** Backward-compatible alias — prefer `link` in new seed entries. */
  amazonUrl?: string;
  imageUrl?: string;
  affiliateDisclosureRequired?: boolean;
};

function hydrateProduct(seed: ProductSeed): GearGuideProduct {
  const amazonUrl = seed.link ?? seed.amazonUrl ?? buildAmazonAffiliateUrl(seed.asin);
  const imageUrl =
    seed.imageUrl ??
    (seed.imageKey ? shopProductImages[seed.imageKey] : undefined) ??
    buildAmazonProductImageUrl(seed.asin);

  return {
    ...seed,
    category: seed.category ?? seed.department,
    link: amazonUrl,
    amazonUrl,
    imageUrl,
    affiliateReady: Boolean(amazonUrl),
    affiliateDisclosureRequired: seed.affiliateDisclosureRequired ?? Boolean(amazonUrl),
  };
}

function dept(
  meta: Omit<GearGuideDepartment, "products">,
  products: ProductSeed[],
): GearGuideDepartment {
  const hydrated = products.map(hydrateProduct);
  const featuredProductId =
    meta.featuredProductId ??
    hydrated.find((p) => p.featured)?.id;

  return {
    ...meta,
    featuredProductId,
    products: hydrated,
  };
}

export const gearGuideDepartments: GearGuideDepartment[] = [
  dept(
    {
      id: "daycare-setup",
      number: "01",
      title: "The Daycare Setup",
      slug: "daycare-setup",
      tocBlurb:
        "Cots, mats, feeding zones, and gear that helps dogs rest instead of turning into tiny chaos interns.",
      intro:
        "Good daycare is not just “let the dogs run around.” Dogs need movement, yes, but they also need rest, safe zones, clean surfaces, water, structure, and places where they can reset.",
      serviceCta: {
        headline: "Want your dog to try the setup?",
        copy: "See daycare and boarding availability with Platinum Scoops — home-based care with real routines, not chaos camp.",
        buttonLabel: "Book Daycare or Boarding",
        href: ctas.bookPetCare.href,
      },
    },
    [
      {
        id: "pet-feeding-mat",
        name: "Pet Feeding Mat",
        department: "The Daycare Setup",
        badge: "Similar to What We Use",
        whyItMadeTheList:
          "Feeding mats keep kibble and wet food off the floor, make cleanup faster, and give dogs a defined eating zone.",
        bestFor: ["Mealtime", "Lick mat prep", "Daycare feeding areas", "Easy wipe-down"],
        notIdealFor: ["Dogs who chew silicone mats", "Unsupervised use with aggressive chewers"],
        platinumScoopsNote: "We use lick-style mats for enrichment; this is the same product family for feeding zones.",
        imageKey: "lick-mats",
        imageAlt: "Silicone pet feeding mat for dog mealtime and enrichment",
        asin: "B09FPTDBRZ",
        priority: 1,
      },
      {
        id: "stainless-bowls",
        name: "Stainless Steel Dog Bowls",
        department: "The Daycare Setup",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Stainless bowls are easy to sanitize between dogs, do not hold odors, and survive daily daycare meal routines.",
        bestFor: ["Daycare feeding", "Shared water stations", "Easy sanitizing", "Allergy-sensitive setups"],
        notIdealFor: ["Dogs who flip lightweight bowls", "Unsupervised chewers who dent thin metal"],
        imageAlt: "Stainless steel dog bowls for daycare feeding stations",
        priority: 2,
      },
      {
        id: "washable-blankets",
        name: "Washable Blankets",
        department: "The Daycare Setup",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Machine-washable bedding survives daycare naps better than sentimental throws and dries fast between dogs.",
        bestFor: ["Rest zones", "Crate comfort", "Easy laundry", "Boarding swaps"],
        notIdealFor: ["Heavy fabric chewers", "Dogs who need orthopedic foam"],
        imageKey: "washable-crate-mats",
        imageAlt: "Washable dog bed mat for crate and daycare rest areas",
        asin: "B0B58ZB22X",
        priority: 2,
      },
      {
        id: "slow-feeder-daycare",
        name: "Slow Feeder Bowl",
        department: "The Daycare Setup",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Slow feeders add a little structure to mealtime and can help fast eaters pace themselves during busy daycare days.",
        bestFor: ["Fast eaters", "Meal enrichment", "Structured feeding", "Puppies learning routines"],
        notIdealFor: ["Dogs who flip bowls", "Deep-chested breeds without supervision"],
        imageKey: "slow-feeders",
        imageAlt: "Outward Hound slow feeder bowl for dogs",
        asin: "B00FPKNRCS",
        priority: 3,
      },
      {
        id: "raised-cot",
        name: "Raised Cot / Elevated Rest Spot",
        department: "The Daycare Setup",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Raised cots can be useful in daycare-style spaces because they give dogs a defined place to rest, cool down, and practice calm behavior.",
        bestFor: [
          "Daycare spaces",
          "Supervised rest",
          "Patio time",
          "Place training",
          "Dogs learning to settle",
        ],
        notIdealFor: [
          "Fabric chewers",
          "Unsupervised use",
          "Dogs who need plush orthopedic support",
        ],
        platinumScoopsNote:
          "We are still testing what works best for our setup, so this is a product type we are considering, not something we are claiming as part of our current gear.",
        imageAlt: "Generic elevated dog cot for supervised rest in a daycare space",
        imageKey: "elevated-bed",
        priority: 4,
        featured: true,
      },
      {
        id: "baby-gate-play-yard",
        name: "Baby Gate / Play Yard",
        department: "The Daycare Setup",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Gates and play yards help create safe zones, separate rest from play, and keep transitions calmer in busy spaces.",
        bestFor: ["Zone management", "Puppy areas", "Rest boundaries", "Supervised separation"],
        notIdealFor: ["Escape artists", "Unsupervised use", "Replacing proper supervision"],
        imageAlt: "Baby gate or play yard for dog daycare zone management",
        priority: 5,
      },
      {
        id: "storage-bins",
        name: "Storage Bins for Gear",
        department: "The Daycare Setup",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Leashes, bowls, toys, and cleanup supplies multiply fast. Bins keep the daycare shelf from becoming a archaeological dig.",
        bestFor: ["Toy rotation", "Leash storage", "Treat organization", "Mobile cleanup kits"],
        notIdealFor: ["Dogs with bin-opening superpowers"],
        imageKey: "midwest-icrate",
        imageAlt: "Stackable storage for dog daycare leashes bowls and toys",
        priority: 6,
      },
    ],
  ),
  dept(
    {
      id: "boarding-shelf",
      number: "02",
      title: "The Boarding Shelf",
      slug: "boarding-shelf",
      tocBlurb:
        "Products that support safer transitions, cleaner feeding areas, quiet enrichment, and better overnight routines.",
      intro:
        "Boarding goes better when dogs know what to expect. We like gear that supports routine: safe transitions, clean feeding areas, quiet enrichment, and cozy rest without creating a laundry emergency.",
    },
    [
      {
        id: "kennel-slip-lead",
        name: "Kennel Slip Lead",
        department: "The Boarding Shelf",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Slip leads can be useful for safe transfers, kennel movement, quick potty breaks, and controlled handling.",
        bestFor: [
          "Boarding transitions",
          "Kennel routines",
          "Safe movement in and out of the house",
        ],
        notIdealFor: ["Unsupervised use", "Dogs who need a fitted harness for walks"],
        imageKey: "long-leash",
        imageAlt: "Dog slip lead for kennel transfers and controlled handling",
        asin: "B072MNCJ8K",
        priority: 1,
        featured: true,
      },
      {
        id: "boarding-feeding-mat",
        name: "Pet Feeding Mat",
        department: "The Boarding Shelf",
        badge: "Similar to What We Use",
        whyItMadeTheList:
          "A dedicated mat keeps boarding meal areas cleaner and gives visiting dogs a familiar eating spot.",
        bestFor: ["Boarding meals", "Travel feeding", "Quick cleanup"],
        notIdealFor: ["Unsupervised chewers"],
        imageKey: "lick-mats",
        imageAlt: "Pet feeding mat for boarding and travel meal routines",
        asin: "B09FPTDBRZ",
        priority: 2,
      },
      {
        id: "pet-odor-neutralizer",
        name: "Pet Odor Neutralizer",
        department: "The Boarding Shelf",
        badge: "Similar to What We Use",
        whyItMadeTheList:
          "Enzyme cleaners help with odor and re-marking — practical when dogs are adjusting to a new space.",
        bestFor: ["Accidents", "Crate areas", "Fabric spots", "Odor control"],
        notIdealFor: ["Skipping the actual cleaning step"],
        imageKey: "enzyme-cleaner",
        imageAlt: "Enzyme pet odor neutralizer for accidents and crate areas",
        asin: "B071W6CQ7S",
        priority: 3,
      },
      {
        id: "boarding-lick-mat",
        name: "Lick Mat",
        department: "The Boarding Shelf",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Lick mats turn a few minutes of wet food into quiet enrichment — helpful for transitions and crate calm.",
        bestFor: ["Crate comfort", "Grooming prep", "Storm distraction", "Slow feeding"],
        notIdealFor: ["Dogs who destroy silicone", "Resource guarding around food"],
        imageKey: "lick-mats",
        imageAlt: "Dog lick mat for calming enrichment during boarding",
        asin: "B09FPTDBRZ",
        priority: 4,
      },
      {
        id: "crate-mat-boarding",
        name: "Washable Crate Mat",
        department: "The Boarding Shelf",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Easy-clean crate bedding is safer than sending sentimental blankets to boarding.",
        bestFor: ["Overnight stays", "Crates", "Senior dogs", "Quick laundry"],
        notIdealFor: ["Dogs who need heavy orthopedic support"],
        imageKey: "washable-crate-mats",
        imageAlt: "Washable crate mat for dog boarding stays",
        asin: "B0B58ZB22X",
        priority: 5,
      },
    ],
  ),
  dept(
    {
      id: "cleanup-cabinet",
      number: "03",
      title: "The Cleanup Cabinet",
      slug: "cleanup-cabinet",
      tocBlurb:
        "For accidents, odors, muddy feet, mystery spots, and the products that help us keep dog spaces fresh.",
      intro:
        "Dogs are precious. Dogs are also disgusting. Both things can be true. This is the section for accidents, odors, muddy feet, mystery spots, and the products that help us keep dog spaces fresh without pretending dogs are decorative objects.",
      featuredProductId: "urine-b-gone",
      serviceCta: {
        headline: "Want the yard handled too?",
        copy: "Platinum Scoops helps Waco dog families with poop scooping, deodorizing, yard refreshes, and pre-party cleanup.",
        buttonLabel: "Book Poop Scooping",
        href: ctas.bookScoops.href,
      },
    },
    [
      {
        id: "urine-b-gone",
        name: "Urine B-Gone Pet Stain Remover",
        department: "The Cleanup Cabinet",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "In real dog care, accidents are not a character flaw. New dogs, puppies, seniors, nervous dogs, and excited dogs can all have moments. Stain and odor products need to be fast, practical, and easy to keep nearby.",
        bestFor: ["Potty accidents", "Rugs", "Crate areas", "Dog rooms", "Everyday odor control"],
        notIdealFor: ["Skipping the actual cleaning step. Spray is not a personality."],
        imageKey: "enzyme-cleaner",
        imageAlt: "Pet stain and odor remover for potty accidents in dog areas",
        featured: true,
        priority: 1,
      },
      {
        id: "enzyme-cleaner",
        name: "Enzyme Pet Stain & Odor Cleaner",
        department: "The Cleanup Cabinet",
        badge: "Similar to What We Use",
        whyItMadeTheList:
          "Enzymatic cleaners break down proteins so dogs stop re-marking the same spot — not just masking smell.",
        bestFor: ["Puppies", "Senior dogs", "Multi-dog homes", "Carpet accidents"],
        notIdealFor: ["Surfaces that can't handle moisture"],
        imageKey: "enzyme-cleaner",
        imageAlt: "Enzyme cleaner for pet stains and odor neutralizing",
        asin: "B071W6CQ7S",
        priority: 2,
      },
      {
        id: "dog-wipes-cleanup",
        name: "Deodorizing Dog Wipes",
        department: "The Cleanup Cabinet",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Quick wipes for paws, butts, and post-walk grime — especially after Waco mud and creek visits.",
        bestFor: ["Muddy paws", "Daycare bags", "Car cleanup", "Between baths"],
        notIdealFor: ["Replacing a full bath", "Dogs with skin sensitivities without checking ingredients"],
        imageKey: "dog-wipes",
        imageAlt: "Deodorizing dog wipes for paws and quick cleanup",
        asin: "B0CCB4XW1M",
        priority: 3,
      },
      {
        id: "poop-bags-cleanup",
        name: "Earth Rated Poop Bags",
        department: "The Cleanup Cabinet",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Leak-proof bags you actually trust on walks and yard rounds — buy bulk, you will use them.",
        bestFor: ["Daily walks", "Yard cleanup", "Travel", "Daycare bags"],
        notIdealFor: ["Compost programs that require specific bag types"],
        imageKey: "poop-bags",
        imageAlt: "Earth Rated dog poop bags for walks and yard cleanup",
        asin: "B00BSYR7K8",
        priority: 4,
      },
      {
        id: "arm-hammer-deodorizer",
        name: "Arm & Hammer Deodorizing Dog Spray",
        department: "The Cleanup Cabinet",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Deodorizing sprays can help between deep cleans — useful for fabric, crates, and car seats after muddy or smelly dog days.",
        bestFor: ["Fabric refresh", "Crate areas", "Car cleanup", "Between full washes"],
        notIdealFor: [
          "Replacing enzyme cleaners on fresh accidents",
          "Dogs with scent sensitivities without checking ingredients",
        ],
        imageAlt: "Arm and Hammer deodorizing spray for dog areas and fabric",
        priority: 5,
      },
    ],
  ),
  dept(
    {
      id: "waco-summer-kit",
      number: "04",
      title: "The Waco Summer Kit",
      slug: "waco-summer-kit",
      tocBlurb: "Heat, paws, hydration, shade, and common sense.",
      intro:
        "Waco heat is not cute. Summer dog gear can help, but it does not replace shade, water, short outings, and avoiding peak pavement heat.",
      callout:
        "Paw check: Place the back of your hand on the pavement for 7 seconds. If it is too hot for your hand, it is too hot for paws.",
    },
    [
      {
        id: "travel-water-bottle",
        name: "AutoDogMug Travel Water Bottle",
        department: "The Waco Summer Kit",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "One-handed water on walks — you cannot summer-walk a Waco dog without hydration gear.",
        bestFor: ["Walks", "Hikes", "Car trips", "Patio outings"],
        notIdealFor: ["Dogs who refuse portable bowls without practice"],
        imageKey: "travel-water-bottle",
        imageAlt: "Travel dog water bottle with built-in drinking bowl",
        asin: "B018YECUPQ",
        priority: 1,
      },
      {
        id: "cooling-mat-summer",
        name: "Cooling Crate Mat",
        department: "The Waco Summer Kit",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Pressure-activated cooling fabric for crates and rest spots — no water refill, no gel to puncture.",
        bestFor: ["Crate cooling", "Senior dogs", "Indoor heat", "Travel kennels"],
        notIdealFor: ["Outdoor sun exposure without shade", "Chewers who destroy fabric"],
        imageKey: "cooling-mat",
        imageAlt: "Cooling dog mat for Texas summer crate rest",
        asin: "B0DN6XYM74",
        priority: 2,
      },
      {
        id: "paw-balm-summer",
        name: "Paw Protection Balm",
        department: "The Waco Summer Kit",
        badge: "Similar to What We Use",
        whyItMadeTheList:
          "Paw balm helps protect pads from hot pavement and dry summer ground — apply before walks, check paws after.",
        bestFor: ["Hot pavement", "Daily summer walks", "Cracked pads", "Pool chemicals"],
        notIdealFor: ["Replacing shade and timing walks for cooler hours"],
        imageKey: "paw-wax",
        imageAlt: "Dog paw balm for hot pavement protection in Waco summer",
        asin: "B0002IJQDC",
        priority: 3,
      },
      {
        id: "cooling-vest-summer",
        name: "Evaporative Cooling Vest",
        department: "The Waco Summer Kit",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Soak, wring, walk — evaporative cooling for dogs who still need outdoor time in serious heat.",
        bestFor: ["Hikes", "Outdoor events", "Heavy-coated breeds", "Supervised outings"],
        notIdealFor: ["Unsupervised use", "Replacing water and shade"],
        imageKey: "cooling-vest",
        imageAlt: "Evaporative cooling vest for dogs in Texas heat",
        asin: "B09MSKT5GN",
        priority: 4,
      },
      {
        id: "collapsible-bowl",
        name: "Collapsible Travel Bowl",
        department: "The Waco Summer Kit",
        badge: "Worth Considering",
        whyItMadeTheList:
          "A bowl that packs flat is easy to keep in the car, daycare bag, or patio kit for summer outings.",
        bestFor: ["Car trips", "Patio visits", "Travel", "Backup water dish"],
        notIdealFor: ["Dogs who flip lightweight bowls", "Replacing fresh water checks"],
        imageAlt: "Collapsible dog travel bowl for summer outings",
        priority: 5,
      },
      {
        id: "portable-shade",
        name: "Portable Shade / Canopy",
        department: "The Waco Summer Kit",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Shade is the real summer essential — portable options help at events, yards, and outdoor stops.",
        bestFor: ["Outdoor events", "Backyard rest", "Supervised patio time", "Event setups"],
        notIdealFor: ["Unsupervised outdoor use", "Replacing water and timing"],
        imageAlt: "Portable shade canopy for dogs at outdoor summer events",
        priority: 6,
      },
      {
        id: "cooling-bandana",
        name: "Cooling Bandana",
        department: "The Waco Summer Kit",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Soak-and-wear cooling bandanas can add a little relief on short supervised outings — not a substitute for shade.",
        bestFor: ["Short walks", "Outdoor events", "Supervised patio time"],
        notIdealFor: ["Unsupervised use", "Heavy-coated dogs without monitoring", "Peak heat hours"],
        imageAlt: "Cooling bandana for dogs during supervised summer outings",
        priority: 7,
      },
    ],
  ),
  dept(
    {
      id: "walks-leashes",
      number: "05",
      title: "Walks, Leashes & Handling",
      slug: "walks-leashes",
      tocBlurb:
        "Tools for safer transitions, walks, and “please do not drag me into the neighbor’s yard” moments.",
      intro:
        "The right walking gear is not about looking fancy. It is about control, comfort, safety, and making sure a squirrel does not ruin everyone’s afternoon.",
      pullQuote: "We love a cute leash. We trust a sturdy leash.",
      serviceCta: {
        headline: "Need help with leash manners or dog routines?",
        copy: "Platinum Scoops offers lifestyle dog support and practical training guidance for real Waco households.",
        buttonLabel: "Ask About Training Support",
        href: ctas.bookTraining.href,
      },
    },
    [
      {
        id: "heavy-duty-leash",
        name: "Heavy Duty Dog Leash, 6 ft, 2 Handles",
        department: "Walks, Leashes & Handling",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "A sturdy 6-foot leash with two handles can give better control during walks, transfers, and busy moments.",
        bestFor: [
          "Walks",
          "Car-to-house transitions",
          "Vet-style handling",
          "Dogs who need closer control",
        ],
        notIdealFor: ["Off-leash play", "Long-distance recall training"],
        imageKey: "long-leash",
        imageAlt: "Heavy duty six-foot dog leash with two handles for control",
        asin: "B072MNCJ8K",
        priority: 1,
        featured: true,
      },
      {
        id: "gentle-leader",
        name: "PetSafe Gentle Leader No-Pull Headcollar",
        department: "Walks, Leashes & Handling",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "A headcollar can be one possible tool for safer, more manageable leash walks when appropriate for the dog.",
        bestFor: ["Strong pullers", "Structured walks", "Dogs who need better leash control"],
        notIdealFor: [
          "Dogs who have not been properly introduced to it. Fit and acclimation matter.",
        ],
        imageAlt: "PetSafe Gentle Leader no-pull headcollar for dogs",
        asin: "B00074L4RW",
        priority: 2,
      },
      {
        id: "long-training-lead",
        name: "NTR Long Dog Leash, 15 ft Training Lead",
        department: "Walks, Leashes & Handling",
        badge: "Similar to What We Use",
        whyItMadeTheList:
          "A long line gives supervised freedom for sniff walks and recall practice without pretending the dog is off-leash.",
        bestFor: ["Recall practice", "Open fields", "Confidence building", "Puppy exploration"],
        notIdealFor: ["Busy sidewalks", "Unsupervised use", "Dogs who tangle easily"],
        imageKey: "long-leash",
        imageAlt: "Fifteen-foot long dog training leash for recall work",
        asin: "B072MNCJ8K",
        priority: 3,
      },
      {
        id: "slip-lead-walks",
        name: "Kennel Slip Lead",
        department: "Walks, Leashes & Handling",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Compact and quick for potty breaks, car exits, and controlled transfers when a full harness setup is overkill.",
        bestFor: ["Quick potty breaks", "Kennel-to-yard transitions", "Backup leash"],
        notIdealFor: ["All-day walks without a proper harness", "Unsupervised tie-out"],
        imageKey: "long-leash",
        imageAlt: "Dog slip lead for quick transfers and potty breaks",
        asin: "B072MNCJ8K",
        priority: 4,
      },
    ],
  ),
  dept(
    {
      id: "enrichment-play",
      number: "06",
      title: "Enrichment & Play",
      slug: "enrichment-play",
      tocBlurb:
        "Toys and treats that give dogs something better to do than make poor life choices.",
      intro:
        "A tired dog is nice. A mentally satisfied dog is better. Enrichment gives dogs something useful to do with their brains, noses, mouths, and energy.",
    },
    [
      {
        id: "puzzle-toy",
        name: "PETSTA Dog Puzzle Toys",
        department: "Enrichment & Play",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Puzzle toys give dogs something to think about and can help with boredom, rainy days, and quiet enrichment.",
        bestFor: ["Smart dogs", "Bored dogs", "Meal enrichment", "Decompression time"],
        notIdealFor: ["Dogs who destroy plastic", "Dogs who resource guard food"],
        imageKey: "puzzle-feeders",
        imageAlt: "PETSTA dog puzzle toy for mental enrichment and mealtime",
        asin: "B0711Y9XTF",
        priority: 1,
        featured: true,
      },
      {
        id: "kong-classic-enrichment",
        name: "Kong Classic Stuffable Toy",
        department: "Enrichment & Play",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Stuff, freeze, and hand over — one of the simplest ways to buy quiet time and cool-down enrichment.",
        bestFor: ["Crate time", "Hot afternoons", "Anxious chewers", "Meal enrichment"],
        notIdealFor: ["Dogs who need size-up monitoring", "Xylitol-containing fillers"],
        imageKey: "kong-classic",
        imageAlt: "Kong Classic rubber dog toy for stuffing and freezing treats",
        asin: "B0002AR0I8",
        priority: 2,
      },
      {
        id: "tough-toy-pack",
        name: "LECHONG 5 Pack Tough Dog Toys",
        department: "Enrichment & Play",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Rotating durable toys keeps play interesting and spreads chewing across more than one victim toy.",
        bestFor: ["Power chewers", "Toy rotation", "Supervised play", "Daycare downtime"],
        notIdealFor: ["Unsupervised destruction tests", "Dogs who swallow fabric or squeakers"],
        imageKey: "kong-classic",
        imageAlt: "LECHONG tough dog toy pack for supervised enrichment play",
        priority: 3,
      },
      {
        id: "dog-soccer-ball",
        name: "QDAN Dog Soccer Ball",
        department: "Enrichment & Play",
        badge: "Worth Considering",
        whyItMadeTheList:
          "A soccer-style ball gives high-energy dogs a different kind of chase-and-push play in the yard.",
        bestFor: ["Backyard play", "High-energy dogs", "Supervised outdoor time", "Novel enrichment"],
        notIdealFor: ["Indoor fragile zones", "Dogs who destroy plastic", "Unsupervised use"],
        imageAlt: "QDAN dog soccer ball for backyard enrichment play",
        priority: 4,
      },
      {
        id: "fetch-stick",
        name: "Chuckit! Ultra Fetch Stick",
        department: "Enrichment & Play",
        badge: "Worth Considering",
        whyItMadeTheList:
          "A tough fetch toy for yards and parks — better than whatever stick the dog finds in the mulch.",
        bestFor: ["Fetch", "Backyard play", "High-energy dogs", "Park trips"],
        notIdealFor: ["Indoor fragile decor zones", "Dogs who guard toys"],
        imageAlt: "Chuckit ultra fetch stick for outdoor dog play",
        priority: 5,
      },
      {
        id: "freeze-dried-treats",
        name: "Stewart Freeze-Dried Treats",
        department: "Enrichment & Play",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "High-value treats can help with recall, rewards, training moments, and making new environments feel positive.",
        bestFor: ["Training", "Picky dogs", "Recall", "Confidence-building"],
        notIdealFor: [
          "Dogs with food allergies or special diets. Always follow owner instructions.",
        ],
        imageKey: "puzzle-feeders",
        imageAlt: "Freeze-dried dog training treats for recall and rewards",
        priority: 6,
      },
    ],
  ),
  dept(
    {
      id: "grooming-care",
      number: "07",
      title: "Grooming & Care",
      slug: "grooming-care",
      tocBlurb: "Basic coat, paw, and cleanup helpers we like having nearby.",
      intro:
        "We are not a grooming salon, but basic coat care matters when dogs are staying, playing, shedding, rolling, and living their full little dog lives.",
    },
    [
      {
        id: "grooming-gloves",
        name: "Pet Grooming Gloves",
        department: "Grooming & Care",
        badge: "On Our Shopping List",
        whyItMadeTheList:
          "Grooming gloves are a gentle way to remove loose hair and help dogs get comfortable with handling.",
        bestFor: ["Shedding dogs", "Nervous dogs", "Light brushing", "Bonding"],
        notIdealFor: ["Heavy matting", "Dogs who dislike touch"],
        imageKey: "dog-wipes",
        imageAlt: "Pet grooming gloves for gentle deshedding and handling",
        priority: 1,
        featured: true,
      },
      {
        id: "deshedding-brush",
        name: "EasyGroomer Deshedding Brush",
        department: "Grooming & Care",
        badge: "Worth Considering",
        whyItMadeTheList:
          "A good deshedding tool cuts down on fur tumbleweeds during heavy shed season in Texas.",
        bestFor: ["Double-coated breeds", "Seasonal shedding", "Pre-bath brushing"],
        notIdealFor: ["Sensitive skin without gentle technique", "Matted coats"],
        imageAlt: "Deshedding brush for dog coat maintenance",
        priority: 2,
      },
      {
        id: "deshedding-shampoo",
        name: "FURminator deShedding Shampoo",
        department: "Grooming & Care",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Bath products formulated for shedding coats can help during spring and fall coat blows.",
        bestFor: ["Heavy shedders", "Bath days", "Seasonal coat care"],
        notIdealFor: ["Dogs with skin conditions without vet guidance"],
        imageAlt: "FURminator deshedding shampoo for dogs",
        priority: 3,
      },
      {
        id: "dog-shampoo",
        name: "Dog Shampoo & Conditioner",
        department: "Grooming & Care",
        badge: "Worth Considering",
        whyItMadeTheList:
          "Dog-specific shampoo matters after muddy yard days, pool dips, and the occasional mystery roll.",
        bestFor: ["Routine baths", "Muddy dogs", "Boarding freshen-up"],
        notIdealFor: ["Human shampoo", "Over-bathing sensitive skin"],
        imageKey: "dog-wipes",
        imageAlt: "Dog shampoo and conditioner for coat care after muddy play",
        priority: 4,
      },
      {
        id: "styptic-powder",
        name: "Styptic Powder",
        department: "Grooming & Care",
        badge: "Use Carefully",
        whyItMadeTheList:
          "Styptic powder can help stop minor nail bleeding during trims — a small kit item worth having with context.",
        bestFor: ["Nail trim accidents", "Grooming kits", "Quick minor bleeding"],
        notIdealFor: ["Deep wounds", "Replacing vet care", "Unfamiliar use without guidance"],
        imageAlt: "Styptic powder for minor dog nail bleeding during grooming",
        priority: 5,
      },
    ],
  ),
  dept(
    {
      id: "use-carefully",
      number: "08",
      title: "Things We Use Carefully",
      slug: "use-carefully",
      tocBlurb: "Supplements, muzzles, whistles, and emergency tools that need context.",
      intro:
        "Some products are useful, but they need context. We do not treat supplements, muzzles, whistles, or emergency tools like casual everyday accessories.",
      safetyNote:
        "For supplements: Calming products should be used thoughtfully and with owner or vet approval. We never recommend starting supplements without checking what is appropriate for the individual dog.\n\nFor muzzles: A muzzle is not a punishment. Used correctly, it can be a safety and management tool. Fit, training, and context matter.\n\nFor emergency tools: Air horns and similar tools are for emergency interruption or deterrence, not routine training.",
    },
    [
      {
        id: "calming-chews-careful",
        name: "Mighty Paw Calming Chews",
        department: "Things We Use Carefully",
        badge: "Use Carefully",
        whyItMadeTheList:
          "May help some dogs with predictable stressors when approved by the owner and appropriate for that dog.",
        bestFor: ["Thunderstorms", "Fireworks", "Vet visits", "Travel anxiety"],
        notIdealFor: ["Starting without owner or vet approval", "Unknown ingredient sensitivities"],
        imageKey: "calming-chews",
        imageAlt: "Mighty Paw calming chews for dogs — use with owner or vet approval",
        asin: "B077MDJ58Y",
        priority: 1,
      },
      {
        id: "melatonin-careful",
        name: "Advanced Melatonin for Dogs",
        department: "Things We Use Carefully",
        badge: "Use Carefully",
        whyItMadeTheList:
          "Some households use melatonin under vet direction — never a casual add without checking what is appropriate for that dog.",
        bestFor: ["Vet-guided plans", "Owner-approved support"],
        notIdealFor: ["Self-prescribing", "Unknown drug interactions", "Replacing training and environment management"],
        imageKey: "calming-chews",
        imageAlt: "Advanced melatonin for dogs — use carefully with professional guidance",
        priority: 2,
      },
      {
        id: "calming-supplement-careful",
        name: "Nutramax Solliquin Calming Support",
        department: "Things We Use Carefully",
        badge: "Use Carefully",
        whyItMadeTheList:
          "Some households use vet-directed calming support — never a one-size-fits-all answer.",
        bestFor: ["Owner-approved anxiety support", "Vet-guided plans"],
        notIdealFor: ["Self-prescribing", "Replacing training and environment management"],
        imageKey: "calming-chews",
        imageAlt: "Nutramax Solliquin calming support for dogs — use carefully with professional guidance",
        priority: 3,
      },
      {
        id: "dog-muzzle",
        name: "Dog Muzzle Set",
        department: "Things We Use Carefully",
        badge: "Use Carefully",
        whyItMadeTheList:
          "A properly fitted muzzle can be a safety tool for vet visits, grooming, or management — with training and context.",
        bestFor: ["Vet safety", "Grooming", "Temporary management", "Professional guidance"],
        notIdealFor: ["Punishment", "Unfitted or untrained use", "Extended unsupervised wear"],
        imageAlt: "Dog muzzle set for safety and management with proper training",
        priority: 4,
      },
      {
        id: "dog-whistle",
        name: "Dog Training Whistle",
        department: "Things We Use Carefully",
        badge: "Use Carefully",
        whyItMadeTheList:
          "Whistles can support recall training when used consistently — not magic, just a clear signal.",
        bestFor: ["Recall practice", "Consistent training cues", "Open spaces"],
        notIdealFor: ["Noise-sensitive neighbors", "Emergency interruption"],
        imageAlt: "Dog training whistle for recall practice",
        priority: 5,
      },
      {
        id: "air-horn",
        name: "Dog Horn XL Air Horn",
        department: "Things We Use Carefully",
        badge: "Use Carefully",
        whyItMadeTheList:
          "Emergency interruption tools for serious situations — not for everyday training annoyance.",
        bestFor: ["Emergency deterrence", "Wildlife encounters", "Professional guidance"],
        notIdealFor: ["Routine training", "Indoor use", "Noise-sensitive dogs without plan"],
        imageAlt: "Dog Horn XL air horn for emergency dog safety interruption",
        priority: 6,
      },
    ],
  ),
];

export function getGearGuideDepartments(): GearGuideDepartment[] {
  return gearGuideDepartments;
}

export function getGearGuideToc() {
  return gearGuideDepartments.map((d) => ({
    number: d.number,
    title: d.title,
    slug: d.slug,
    blurb: d.tocBlurb,
  }));
}

export function getFeaturedGearProduct(
  department: GearGuideDepartment,
): GearGuideProduct | undefined {
  if (!department.featuredProductId) return undefined;
  return department.products.find((p) => p.id === department.featuredProductId);
}
