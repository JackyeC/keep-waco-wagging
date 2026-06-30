import { designPhotos } from "@/data/designPhotos";
import { cityConfig, ctas } from "@/lib/site";
import type { IncludedItem, ServiceStep } from "@/components/service/ServicePageSections";

export type ServiceCtaConfig = {
  eyebrow: string;
  title: string;
  scriptWord: string;
  subtitle: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  variant?: "sage" | "clay";
};

export type ServicePageConfig = {
  slug: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    scriptWord: string;
    metaLine?: string;
    description: string;
    image: { src: string; alt: string };
    primary: { label: string; href: string; external?: boolean };
    secondary: { label: string; href: string; external?: boolean };
  };
  included: {
    eyebrow: string;
    title: string;
    items: IncludedItem[];
  };
  steps?: ServiceStep[];
  quote?: { text: string; attribution: string };
  cta: ServiceCtaConfig;
};

const book = ctas.bookService.href;
const jobber = ctas.bookScoops.href;
const rover = ctas.bookPetCare.href;
const phone = cityConfig.sponsor.phoneHref;
const email = `mailto:${cityConfig.publicEmail}`;
const patioGuide = "/blog/how-to-know-if-your-dog-is-ready-for-a-patio";

export const servicePages: Record<string, ServicePageConfig> = {
  "platinum-scoops": {
    slug: "platinum-scoops",
    seo: {
      title: "Poop Scooping Waco | Platinum Scoops",
      description: `Weekly dog waste removal in Waco from $25/week with the first cleanup included. ${cityConfig.sponsor.name} pet waste removal, not a side gig.`,
    },
    hero: {
      eyebrow: "Platinum Scoops · Poop scooping & yard care",
      title: "Scooped, fresh, and ready to romp",
      scriptWord: "romp",
      metaLine: "From $25 / week · first cleanup included",
      description:
        "Weekly scooping, one-time cleanups, and odor support so your yard stays usable through the Texas heat, and your dog stays happy in it.",
      image: designPhotos.svcScoop,
      primary: { label: "Book a scoop", href: jobber, external: true },
      secondary: {
        label: `Call ${cityConfig.sponsor.phoneDisplay}`,
        href: phone,
      },
    },
    included: {
      eyebrow: "What's included",
      title: "Every visit, done right",
      items: [
        {
          title: "Weekly scooping",
          detail: "A reliable route so your yard never gets ahead of you.",
        },
        {
          title: "One-time cleanups",
          detail: "Spring resets, move-outs, and \"company's coming\" rescues.",
        },
        {
          title: "Odor support",
          detail: "Deodorizing treatment to keep things fresh through summer.",
        },
        {
          title: "Tidy haul-away",
          detail: "We bag it and take it — gates closed, yard clean, every time.",
        },
      ],
    },
    steps: [
      {
        number: "01",
        title: "Tell us about your yard",
        detail:
          "Size, how many dogs, and how often you'd like us. Two minutes online.",
      },
      {
        number: "02",
        title: "We scoop on schedule",
        detail:
          "Same friendly faces, same day each week. First cleanup is on us.",
      },
      {
        number: "03",
        title: "You get the all-clear",
        detail:
          "A quick note when we're done, gate latched, ready for zoomies.",
      },
    ],
    cta: {
      eyebrow: "Ready for a cleaner yard?",
      title: "Start weekly scooping from $25",
      scriptWord: "$25",
      subtitle: `First cleanup included · Call ${cityConfig.sponsor.phoneDisplay} · ${cityConfig.publicEmail}`,
      primary: { label: "Book a scoop", href: jobber, external: true },
      secondary: { label: "All services", href: "/#services" },
    },
  },

  "pet-care": {
    slug: "pet-care",
    seo: {
      title: "Dog Daycare & Boarding Waco | Home-Based Pet Care",
      description:
        "Home-based dog daycare and boarding in Waco with full-time attention, enrichment, and daily updates. 5.0 on Rover.",
    },
    hero: {
      eyebrow: "Home-based daycare & boarding",
      title: "A calm Waco home, not a kennel",
      scriptWord: "kennel",
      metaLine: "★ 5.0 on Rover · 73 reviews · Star Sitter",
      description:
        "Your dog stays in our home with full-time attention — walks, enrichment, real rest, and daily photo updates. Bathed in the kitchen sink, dried with the good towels.",
      image: designPhotos.svcBoard,
      primary: { label: "Book a stay", href: book },
      secondary: { label: "See Rover reviews", href: rover, external: true },
    },
    included: {
      eyebrow: "What your dog gets",
      title: "Full-time, attentive care",
      items: [
        {
          title: "Daily walks",
          detail: "Neighborhood strolls and play, paced to your dog's energy.",
        },
        {
          title: "Enrichment & rest",
          detail: "Sniffing, splashing, and real downtime — not a crate all day.",
        },
        {
          title: "Daily updates",
          detail: "Photos and videos so you can relax while you're away.",
        },
        {
          title: "Meds & specials",
          detail: "Detailed instructions welcome — diet, meds, routines, all of it.",
        },
      ],
    },
    quote: {
      text: "She was sick with pancreatitis — they followed all my detailed instructions and sent photos and videos daily. I can only give them my highest recommendation.",
      attribution: "Linda · Rover",
    },
    cta: {
      eyebrow: "Going out of town?",
      title: "Book your dog's home away from home",
      scriptWord: "home",
      subtitle: `Call ${cityConfig.sponsor.phoneDisplay} · ${cityConfig.publicEmail} · Book through our booking hub.`,
      primary: { label: "Book a stay", href: book },
      secondary: { label: "All services", href: "/#services" },
    },
  },

  training: {
    slug: "training",
    seo: {
      title: "Lifestyle Dog Training Waco | Real-Life Skills",
      description:
        "Practical dog training in Waco — patio manners, loose-leash walks, puppy socialization, and calm-home skills coached in real settings.",
    },
    hero: {
      eyebrow: "Lifestyle training",
      title: "A dog you can take anywhere",
      scriptWord: "anywhere",
      metaLine: "Patio manners · Loose-leash · Calm-home skills",
      description:
        "Practical coaching for real life, not a sterile classroom. We build skills where you'll actually use them: patios, sidewalks, and your living room.",
      image: designPhotos.svcTrain,
      primary: { label: "Start training", href: book },
      secondary: { label: "Is my dog ready?", href: patioGuide },
    },
    included: {
      eyebrow: "What we work on",
      title: "Skills for the real world",
      items: [
        {
          title: "Patio manners",
          detail: "Settle under the table while you enjoy a Waco patio in peace.",
        },
        {
          title: "Loose-leash walks",
          detail: "No more dragging — calm, connected walks around the block.",
        },
        {
          title: "Puppy field trips",
          detail: "Confident socialization in new places, at a happy pace.",
        },
        {
          title: "Calm-home skills",
          detail: "Door manners, settling, and recovering from distractions.",
        },
      ],
    },
    cta: {
      eyebrow: "Ready when you are",
      title: "Let's build a calmer, happier pup",
      scriptWord: "pup",
      subtitle: `Call ${cityConfig.sponsor.phoneDisplay} · ${cityConfig.publicEmail} · or start online.`,
      primary: { label: "Start training", href: book },
      secondary: { label: "All services", href: "/#services" },
    },
  },

  "weddings-events": {
    slug: "pet-care/weddings-events",
    seo: {
      title: "Dog of Honor Wedding Pet Care Waco",
      description:
        "Dedicated wedding pet attendant for Waco weddings — ceremony support, photos, potty breaks, and a safe handoff.",
    },
    hero: {
      eyebrow: "Dog of Honor · Weddings & events",
      title: "Your best friend, your Dog of Honor",
      scriptWord: "Dog of Honor",
      description:
        "A dedicated wedding pet attendant so your dog can be part of your day — and you can stay fully in the moment. We handle everything off-camera.",
      image: designPhotos.svcWedding,
      primary: { label: "Reserve a date", href: book },
      secondary: { label: "Ask a question", href: email },
    },
    included: {
      eyebrow: "What we handle",
      title: "Every detail, off your plate",
      items: [
        {
          title: "Ceremony support",
          detail: "Down the aisle and into your photos, calm and on cue.",
        },
        {
          title: "Photo wrangling",
          detail: "We position, treat, and reset so your photographer gets the shot.",
        },
        {
          title: "Potty & water breaks",
          detail: "Fed, watered, walked, and comfortable all day long.",
        },
        {
          title: "Safe handoff",
          detail: "Home or to boarding after the send-off — you don't lift a leash.",
        },
      ],
    },
    cta: {
      variant: "clay",
      eyebrow: "Limited dates each season",
      title: "Let's get your pup on the guest list",
      scriptWord: "guest list",
      subtitle: "Tell us your date and venue — we'll take it from there.",
      primary: { label: "Reserve a date", href: book },
      secondary: { label: "All services", href: "/#services" },
    },
  },

  "summer-daycare": {
    slug: "summer-daycare",
    seo: {
      title: "Keep Waco Wagging Dog Camp | Summer Daycare Waco",
      description:
        "Thirteen themed summer weeks of supervised play, enrichment, and rest. Drop in for a day or join the full week in Waco.",
    },
    hero: {
      eyebrow: "Keep Waco Wagging Dog Camp",
      title: "The best summer of their life",
      scriptWord: "life",
      metaLine: "13 themed weeks · drop in or full week",
      description:
        "Supervised play, enrichment, and real rest — a full summer of themed weeks built around your dog's favorite things. Come for a day or join the whole week.",
      image: designPhotos.svcCamp,
      primary: { label: "Enroll now", href: book },
      secondary: { label: "See the calendar", href: "#calendar" },
    },
    included: {
      eyebrow: "A camp day",
      title: "Play, learn, splash, nap",
      items: [
        {
          title: "Supervised play",
          detail: "Matched playgroups with eyes on them the whole time.",
        },
        {
          title: "Themed enrichment",
          detail: "A new theme each week — games, puzzles, and fresh fun.",
        },
        {
          title: "Splash time",
          detail: "Backyard pools to beat the Texas heat the right way.",
        },
        {
          title: "Real rest",
          detail: "Quiet nap blocks so they go home happy-tired, not wired.",
        },
      ],
    },
    cta: {
      eyebrow: "Weeks fill fast",
      title: "Save your dog's spot at camp",
      scriptWord: "camp",
      subtitle: `Drop-in days or full weeks · Call ${cityConfig.sponsor.phoneDisplay} to plan your summer.`,
      primary: { label: "Enroll now", href: book },
      secondary: { label: "All services", href: "/#services" },
    },
  },
};

export function getServicePage(slug: keyof typeof servicePages): ServicePageConfig {
  return servicePages[slug];
}
