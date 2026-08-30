import { sitePhotos } from "@/data/sitePhotos";
import { getFeaturedTestimonials } from "@/data/testimonials";
import {
  rover,
  roverPrices,
  roverPublicStartingRates,
} from "@/data/rover";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

export type LandingPhoto = { src: string; alt: string };
export type LandingBlock = { title: string; detail: string };
export type LandingFaq = { question: string; answer: string };
export type LandingPriceLine = { label: string; price: string };

export type PetCareLandingConfig = {
  slug: "dog-boarding-waco-tx" | "dog-daycare-waco-tx";
  path: string;
  serviceKind: "boarding" | "daycare";
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: string;
    h1Accent: string;
    description: string;
    startingRateLabel: string;
    startingRate: string;
    primaryCta: { label: string; href: string; external?: boolean };
    secondaryCta: { label: string; href: string; external?: boolean };
    image: LandingPhoto;
  };
  caregivers: {
    title: string;
    body: string[];
    image: LandingPhoto;
  };
  rhythm: {
    eyebrow: string;
    title: string;
    intro: string;
    blocks: LandingBlock[];
  };
  introductions: {
    title: string;
    body: string[];
  };
  fit: {
    title: string;
    goodTitle: string;
    good: readonly string[];
    cautionTitle: string;
    caution: readonly string[];
  };
  specialCare: {
    title: string;
    items: LandingBlock[];
  };
  bring: {
    title: string;
    intro: string;
    items: string[];
    note: string;
  };
  logistics: {
    title: string;
    items: LandingBlock[];
  };
  pricing: {
    title: string;
    intro: string;
    lines: LandingPriceLine[];
    note: string;
  };
  faqs: LandingFaq[];
  photos: LandingPhoto[];
  relatedLinks: { label: string; href: string; detail: string }[];
  closing: {
    eyebrow: string;
    title: string;
    scriptWord: string;
    subtitle: string;
  };
};

const roverBook = {
  label: "Request care on Rover",
  href: ctas.bookPetCare.href,
  external: true as const,
};

const trustMeta = `★ ${roverCredentialsLine} · ${cityConfig.trustSignals.repeatClients} repeat clients`;

const caregiverBody = [
  rover.bio,
  "This is home-based care in a real Waco home — not a warehouse kennel or high-volume daycare floor.",
];

/** Public Rover testimonials already in the repo (boarding-leaning + daycare). */
export function landingTestimonials(kind: "boarding" | "daycare") {
  const all = getFeaturedTestimonials();
  if (kind === "daycare") {
    const daycare = all.filter((t) => t.service === "Daycare");
    const rest = all.filter((t) => t.service !== "Daycare");
    return [...daycare, ...rest].slice(0, 3);
  }
  return all.filter((t) => t.service === "Boarding" || !t.service).slice(0, 3);
}

export const boardingLanding: PetCareLandingConfig = {
  slug: "dog-boarding-waco-tx",
  path: "/dog-boarding-waco-tx",
  serviceKind: "boarding",
  seo: {
    title: "Dog Boarding Waco TX | Home-Based Boarding | Platinum Scoops",
    description:
      "Home-based dog boarding in Waco, TX with Jackye and Todd — walks, enrichment, rest, and daily photo updates. Pet care provided by Platinum Scoops. 5.0 on Rover. Request boarding on Rover.",
  },
  hero: {
    eyebrow: "Overnight · home-based boarding",
    h1: "Home-based dog boarding in",
    h1Accent: "Waco, TX",
    description:
      "Overnight care in a calm Waco home — not a kennel run. Your dog stays with full-time caregivers for walks, enrichment, real rest, and daily photo updates.",
    startingRateLabel: "Public Rover rate",
    startingRate: roverPublicStartingRates.boarding,
    primaryCta: {
      label: "Request Boarding on Rover",
      href: roverBook.href,
      external: true,
    },
    secondaryCta: {
      label: "See Rover Reviews",
      href: cityConfig.rover.profileUrl,
      external: true,
    },
    image: sitePhotos.boardingHome,
  },
  caregivers: {
    title: "Who cares for your dog",
    body: caregiverBody,
    image: {
      src: "/pictures/library/founders-jackye-and-todd.webp",
      alt: "Jackye and Todd Clayton, founders of Keep Waco Wagging and Platinum Scoops",
    },
  },
  rhythm: {
    eyebrow: "A boarding visit",
    title: "What a boarding day and night look like",
    intro:
      "Exact timing flexes with your dog’s needs and the household rhythm. The pattern below reflects how care is described for this home-based boarding — without pretending every hour is identical.",
    blocks: [
      {
        title: "Morning",
        detail:
          "Potty breaks, fresh water, and a calm start to the day with walks or yard time paced to your dog’s energy.",
      },
      {
        title: "Meals",
        detail:
          "Feeding follows the diet and schedule you provide. Detailed food and medication instructions are welcome.",
      },
      {
        title: "Walks, play & enrichment",
        detail:
          "Neighborhood walks, supervised play, sniffing, and enrichment — not nonstop group chaos.",
      },
      {
        title: "Rest periods",
        detail:
          "Structured rest is part of the day. Crates are used as appropriate for meals, rest, and decompression — dogs are not expected to play nonstop, and they are not crated for the entire stay.",
      },
      {
        title: "Evening",
        detail:
          "Another wind-down stretch with potty breaks, settling time, and the same attentive presence.",
      },
      {
        title: "Overnight",
        detail:
          "Overnight arrangements are based on the individual dog, their normal routine, and what allows them to settle safely and comfortably in our home.",
      },
    ],
  },
  introductions: {
    title: "How we introduce new dogs",
    body: [
      "We take introductions slowly because how a stay starts matters. New dogs are given time to settle in and meet the group intentionally — not dropped into a free-for-all on arrival.",
      "Compatibility and individual temperament matter in a home-based setting. We pay attention to how a dog settles into the environment and interacts with the group, rather than treating every dog the same way.",
      "Owners are welcome to meet Jacqueline and Todd. We do not use dog-to-dog meet-and-greets as the primary evaluation method. For a new guest, we may recommend a daycare / trial day before a longer boarding stay so we can see how they do in the home first.",
    ],
  },
  fit: {
    title: "Is boarding here a good fit?",
    goodTitle: "Often a good fit",
    good: rover.goodFit,
    cautionTitle: "May not be a fit",
    caution: rover.mayNotBeFit,
  },
  specialCare: {
    title: "Puppies, seniors, and medication",
    items: [
      {
        title: "Puppies",
        detail: `Puppy boarding is offered on Rover (${roverPrices.boarding.puppy}). Share age, potty stage, and energy needs when you request care.`,
      },
      {
        title: "Seniors",
        detail:
          "Seniors who do well in a calm home environment and benefit from routine are listed among dogs this home commonly cares for.",
      },
      {
        title: "Medication & special routines",
        detail:
          "Medication support and detailed care instructions are part of how this home works with guest dogs — including special diets and routines you spell out in writing.",
      },
    ],
  },
  bring: {
    title: "What to bring",
    intro:
      "Please pack what your dog needs for a familiar routine. Leave unnecessary toys, valuables, sentimental items, or other “precious” belongings at home so nothing important gets lost or chewed.",
    items: [
      "Their normal food (enough for the full stay)",
      "Feeding instructions",
      "Medications and medication instructions, when applicable",
      "Collar or harness and leash",
      "Their crate",
      "Routine / care notes",
      "Emergency contact information",
    ],
    note: "Crates are part of packing because we use them as appropriate for meals, rest, and decompression — not because dogs spend the entire stay crated.",
  },
  logistics: {
    title: "Drop-off, pickup, and extras",
    items: [
      {
        title: "Scheduling",
        detail:
          "Request dates and arrival windows on Rover. Availability and final details are confirmed there.",
      },
      {
        title: "Sitter pickup & drop-off",
        detail: `Optional sitter pickup and drop-off is listed on Rover at ${roverPrices.boarding.pickupDropoffRoundTrip}.`,
      },
      {
        title: "Updates",
        detail:
          "Expect photos and videos during the stay so you can see how your dog is settling.",
      },
    ],
  },
  pricing: {
    title: "Boarding rates on Rover",
    intro:
      "These are public Rover rates from our current listing data. Final price and terms are confirmed on Rover when you request care.",
    lines: [
      {
        label: "Boarding (starting)",
        price: roverPublicStartingRates.boarding,
      },
      { label: "Holiday rate", price: roverPrices.boarding.holiday },
      { label: "Additional dog", price: roverPrices.boarding.additionalDog },
      { label: "Puppy rate", price: roverPrices.boarding.puppy },
      {
        label: "Stays of 7 nights or more",
        price: roverPrices.boarding.extendedStay7Plus,
      },
      {
        label: "Sitter pickup and drop-off",
        price: roverPrices.boarding.pickupDropoffRoundTrip,
      },
    ],
    note: rover.pricingNote,
  },
  faqs: [
    {
      question: "Where does my dog stay overnight?",
      answer:
        "In Jacqueline and Todd’s Waco home — home-based boarding, not a kennel or warehouse facility. Overnight arrangements are based on the individual dog, their normal routine, and what helps them settle safely and comfortably.",
    },
    {
      question: "Will my dog be crated the whole time?",
      answer:
        "No. Please bring their crate; we use crates as appropriate for meals, rest, and decompression. Dogs are not expected to spend the entire stay crated.",
    },
    {
      question: "How are dogs introduced?",
      answer:
        "Slowly and intentionally. New dogs are not simply placed into a group on arrival. Owners are welcome to meet Jacqueline and Todd. We do not use dog-to-dog meet-and-greets as the primary evaluation method, and for some new guests we may recommend a daycare / trial day before a longer boarding stay.",
    },
    {
      question: "Is this a big group daycare-style boarding?",
      answer:
        "No. Care is home-based, intentionally managed, and fit-based, with structured introductions and room for rest and decompression. We do not publish a guest maximum on this site.",
    },
    {
      question: "Can you give medication?",
      answer:
        "Yes — medication support and detailed instructions are part of the care model described for this home.",
    },
    {
      question: "What should I bring?",
      answer:
        "Normal food, feeding instructions, medications and instructions when applicable, collar/harness and leash, their crate, routine/care notes, and emergency contacts. Please leave unnecessary toys, valuables, and sentimental items at home.",
    },
    {
      question: "How do drop-off and pickup work?",
      answer:
        "Coordinate timing on Rover. Optional sitter pickup and drop-off is listed as an add-on on the Rover rate card.",
    },
    {
      question: "Do you send photos?",
      answer:
        "Yes. Daily photos and videos are a standard part of how families stay connected during boarding.",
    },
    {
      question: "How do I book?",
      answer:
        "Request boarding on Rover through the Platinum Scoops / Jackye & Todd profile linked from this page. That is where availability and booking terms are confirmed.",
    },
    {
      question: "What if my dog is anxious, a senior, or a puppy?",
      answer:
        "Seniors, puppies, and dogs who need routine are listed among common good fits when they can be safe in a home with other dogs. Share temperament and history honestly when you request care so fit can be assessed.",
    },
  ],
  photos: [
    sitePhotos.boardingHome,
    sitePhotos.boardingDogs,
    {
      src: "/pictures/boarding-backyard.webp",
      alt: "Dogs in a Waco backyard boarding environment",
    },
    sitePhotos.frenchieSinkBath,
    sitePhotos.hero,
  ],
  relatedLinks: [
    {
      label: "Dog daycare",
      href: "/dog-daycare-waco-tx",
      detail: "Small-group daytime care in the same home-based setting.",
    },
    {
      label: "Explore dog care",
      href: "/dog-care",
      detail: "Boarding, daycare, training, camp, and scooping in one hub.",
    },
    {
      label: "Lifestyle training",
      href: "/training",
      detail: "Patio manners, loose-leash walks, and calm-home skills.",
    },
  ],
  closing: {
    eyebrow: "Ready to request overnight care?",
    title: "Request boarding on Rover",
    scriptWord: "Rover",
    subtitle: `${brandLanguage.petCareProvided} ${trustMeta}`,
  },
};

export const daycareLanding: PetCareLandingConfig = {
  slug: "dog-daycare-waco-tx",
  path: "/dog-daycare-waco-tx",
  serviceKind: "daycare",
  seo: {
    title: "Dog Daycare Waco TX | Small-Group Home Daycare | Platinum Scoops",
    description:
      "Small-group, home-based dog daycare in Waco, TX with play, enrichment, and real rest — not a warehouse floor. Pet care provided by Platinum Scoops. Request daycare on Rover.",
  },
  hero: {
    eyebrow: "Daytime · small-group home daycare",
    h1: "Small-group dog daycare in",
    h1Accent: "Waco, TX",
    description:
      "Home-based daytime care with supervised play, enrichment, and decompression — without the warehouse feel. Built for Waco dogs who do better in a real home than a high-volume floor.",
    startingRateLabel: "Public Rover rate",
    startingRate: roverPublicStartingRates.daycare,
    primaryCta: {
      label: "Request Daycare on Rover",
      href: roverBook.href,
      external: true,
    },
    secondaryCta: {
      label: "See Rover Reviews",
      href: cityConfig.rover.profileUrl,
      external: true,
    },
    image: sitePhotos.boardingDogs,
  },
  caregivers: {
    title: "Who is with your dog during the day",
    body: caregiverBody,
    image: sitePhotos.toddGoldendoodle,
  },
  rhythm: {
    eyebrow: "A daycare day",
    title: "What a daycare day looks like",
    intro:
      "Daycare here is not nonstop group play. Rest and decompression are part of good care. Timing is coordinated on Rover rather than published as a rigid public clock.",
    blocks: [
      {
        title: "Arrival & decompression",
        detail:
          "Dogs arrive into a home environment. The goal is a calm start — not an immediate free-for-all.",
      },
      {
        title: "Introductions",
        detail:
          "New dogs are introduced slowly and intentionally — not simply placed into a group on arrival. Compatibility and temperament matter.",
      },
      {
        title: "Play, walks & yard time",
        detail:
          "Supervised play and walks paced to the dog — with eyes on group dynamics the whole time.",
      },
      {
        title: "Rest & enrichment",
        detail:
          "Structured rest and enrichment so dogs are not expected to “perform” all day. Crates may be used as appropriate for meals, rest, and decompression.",
      },
      {
        title: "Meals (if applicable)",
        detail:
          "If your dog needs daytime feeding or medication, share clear instructions when you request care.",
      },
      {
        title: "Pickup",
        detail:
          "Pickup timing is confirmed on Rover. Optional daily sitter pickup or drop-off is listed as an add-on.",
      },
    ],
  },
  introductions: {
    title: "How we introduce new dogs",
    body: [
      "We take introductions slowly because how a day starts matters. New dogs are given time to settle in and meet the group intentionally — not dropped into a free-for-all on arrival.",
      "Compatibility and individual temperament matter in a home-based, intentionally managed setting with room for rest and decompression.",
      "Owners are welcome to meet Jacqueline and Todd. We do not use dog-to-dog meet-and-greets as the primary evaluation method. A daycare / trial day is often the best first step — and for boarding guests who are new to us, we may recommend a daycare day before a longer stay.",
    ],
  },
  fit: {
    title: "Who daycare is for",
    goodTitle: "Often a good fit",
    good: rover.goodFit,
    cautionTitle: "May not be a fit",
    caution: rover.mayNotBeFit,
  },
  specialCare: {
    title: "Puppies, shy dogs, and special needs",
    items: [
      {
        title: "Puppies",
        detail: `Puppy daycare is listed on Rover (${roverPrices.daycare.puppy}). Share age, vaccination status notes you provide on Rover, and energy level when requesting.`,
      },
      {
        title: "Shy or selective dogs",
        detail:
          "Dogs who need routine or a calmer home setting can be a good fit. Dogs who cannot safely be around other dogs are generally not.",
      },
      {
        title: "Medication during the day",
        detail:
          "Medication support is part of the care model when you provide clear instructions.",
      },
    ],
  },
  bring: {
    title: "What to bring",
    intro:
      "For a daycare day, bring what your dog needs for comfort and any daytime care instructions. Confirm packing details on Rover for your dog.",
    items: [
      "Leash / harness for handoff",
      "Food if your dog eats during daycare hours",
      "Medication with dosing notes (if needed)",
      "Any written routine or trigger notes",
    ],
    note: "Drop-off and pickup times are confirmed on Rover — this site does not publish a rigid public schedule.",
  },
  logistics: {
    title: "Hours, drop-off, and pickup",
    items: [
      {
        title: "Scheduling",
        detail:
          "Daycare timing is appointment-based through Rover. Weekday patterns are common; confirm your window when you request care.",
      },
      {
        title: "Optional transport",
        detail: `Daily sitter pickup or drop-off is listed on Rover at ${roverPrices.daycare.pickupDropoffPerDay}.`,
      },
      {
        title: "Updates",
        detail:
          "Photos and videos help you see how the day is going — the same update habit families mention in Rover reviews.",
      },
      {
        title: "Year-round daycare vs summer camp",
        detail:
          "This page is year-round home daycare. Keep Waco Wagging Dog Camp (`/summer-daycare`) is seasonal themed programming — related, but not the same product.",
      },
    ],
  },
  pricing: {
    title: "Daycare rates on Rover",
    intro:
      "These are public Rover rates from our current listing data. Final price and terms are confirmed on Rover when you request care.",
    lines: [
      {
        label: "Daycare (starting)",
        price: roverPublicStartingRates.daycare,
      },
      { label: "Holiday rate", price: roverPrices.daycare.holiday },
      { label: "Additional dog", price: roverPrices.daycare.additionalDog },
      { label: "Puppy rate", price: roverPrices.daycare.puppy },
      {
        label: "Bathing or grooming add-on",
        price: roverPrices.daycare.bathingGrooming,
      },
      {
        label: "Daily sitter pickup or drop-off",
        price: roverPrices.daycare.pickupDropoffPerDay,
      },
    ],
    note: rover.pricingNote,
  },
  faqs: [
    {
      question: "How are dogs introduced?",
      answer:
        "Slowly and intentionally. Dogs are not simply placed into a group on arrival. Owners are welcome to meet Jacqueline and Todd. We do not use dog-to-dog meet-and-greets as the primary evaluation method, and a daycare / trial day is often the best first step.",
    },
    {
      question: "Does my dog need to play all day?",
      answer:
        "No. Supervised play is part of daycare, and so are rest, enrichment, and decompression. Nonstop play is not the goal.",
    },
    {
      question: "Do dogs get rest breaks?",
      answer:
        "Yes. Structured rest is part of good daycare. Crates may be used as appropriate for meals, rest, and decompression — not as an all-day warehouse setup.",
    },
    {
      question: "Do you accept puppies?",
      answer: `Puppy daycare is listed on Rover at ${roverPrices.daycare.puppy}. Confirm age and care notes when you request a day.`,
    },
    {
      question: "What if my dog is shy?",
      answer:
        "Dogs who need routine or a calmer home setting can be a good fit. Be honest about social limits so we can introduce them thoughtfully.",
    },
    {
      question: "What should I bring?",
      answer:
        "Leash/harness for handoff, food if they eat during the day, medication with instructions if needed, and any routine notes. Confirm details on Rover.",
    },
    {
      question: "How do I book?",
      answer:
        "Request daycare on Rover through the profile linked from this page. That is where availability is confirmed.",
    },
    {
      question: "What are drop-off and pickup times?",
      answer:
        "Arrival and pickup arrangements are confirmed as part of booking on Rover. This site does not publish a rigid public schedule.",
    },
    {
      question: "Do you send updates?",
      answer:
        "Yes — photos and videos are part of how families stay in the loop during care.",
    },
    {
      question: "How is daycare different from boarding?",
      answer:
        "Daycare is daytime care. Boarding is overnight. Both are home-based with the same caregivers. For new boarding guests, we may recommend a daycare / trial day first. Summer Dog Camp is a separate seasonal, themed program.",
    },
    {
      question: "Is this the same as Summer Dog Camp?",
      answer:
        "No. Year-round daycare is ongoing daytime care. Summer Dog Camp is seasonal themed weeks — see /summer-daycare if you want that experience.",
    },
  ],
  photos: [
    sitePhotos.boardingDogs,
    sitePhotos.community,
    sitePhotos.training,
    sitePhotos.hero,
    sitePhotos.jackyeKitchenPoodle,
  ],
  relatedLinks: [
    {
      label: "Dog boarding",
      href: "/dog-boarding-waco-tx",
      detail: "Overnight home-based boarding with the same caregivers.",
    },
    {
      label: "Lifestyle training",
      href: "/training",
      detail: "Skills that make daycare and outings easier.",
    },
    {
      label: "Explore dog care",
      href: "/dog-care",
      detail: "Boarding, daycare, training, camp, and scooping in one hub.",
    },
  ],
  closing: {
    eyebrow: "Need a daytime care plan?",
    title: "Request daycare on Rover",
    scriptWord: "Rover",
    subtitle: `${brandLanguage.petCareProvided} ${trustMeta}`,
  },
};

export function getPetCareLanding(
  slug: PetCareLandingConfig["slug"],
): PetCareLandingConfig {
  return slug === "dog-boarding-waco-tx" ? boardingLanding : daycareLanding;
}

export const petCareHubTrustLine = trustMeta;
export const petCareProviderLine = brandLanguage.petCareProvided;
