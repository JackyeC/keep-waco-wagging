import { designPhotos } from "@/data/designPhotos";
import { weddingDogChaperone } from "@/data/eventCare";
import { roverCredentialsLine } from "@/lib/roverCredentials";
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
    image: { src: string; alt: string; objectPosition?: string };
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
  faq?: { question: string; answer: string }[];
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
    faq: [
      {
        question: "What is Platinum Scoops?",
        answer:
          "Platinum Scoops is family-run pet waste removal and yard care in Waco — not a side gig. Keep Waco Wagging is the community home of Platinum Scoops.",
      },
      {
        question: "How much does poop scooping cost in Waco?",
        answer: `Recurring scooping starts at $25 per week, with the first cleanup included. ${cityConfig.sponsor.pricingNote}`,
      },
      {
        question: "Where do you scoop?",
        answer: `We serve ${cityConfig.serviceAreas.slice(0, 6).join(", ")}, and surrounding ${cityConfig.county} communities.`,
      },
      {
        question: "How do I book a scoop?",
        answer:
          "Use the Book a Scoop button on this page to schedule through our Jobber booking page, or call (254) 726-6737.",
      },
    ],
    cta: {
      variant: "clay",
      eyebrow: "Ready for a cleaner yard?",
      title: "Start weekly scooping from $25",
      scriptWord: "$25",
      subtitle: `First cleanup included · Call ${cityConfig.sponsor.phoneDisplay} · ${cityConfig.publicEmail}`,
      primary: { label: "Book a scoop", href: jobber, external: true },
      secondary: { label: "All services", href: "/dog-care" },
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
      metaLine: `★ ${roverCredentialsLine}`,
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
    faq: [
      {
        question: "Is this a kennel or warehouse boarding?",
        answer:
          "No. Your dog stays in our Waco home with full-time attention, daily walks, enrichment, and rest — not an industrial kennel setup.",
      },
      {
        question: "How do I book daycare or boarding?",
        answer:
          "Start at keepwacowagging.com/book to choose the right service. Our primary booking hub walks you through scooping, boarding, training, camp, and wedding care.",
      },
      {
        question: "Do you send updates while I am away?",
        answer:
          "Yes. Expect photos and videos so you can see how your dog is doing — part of how we care for Waco families every week.",
      },
    ],
    cta: {
      eyebrow: "Going out of town?",
      title: "Book your dog's home away from home",
      scriptWord: "home",
      subtitle: `Call ${cityConfig.sponsor.phoneDisplay} · ${cityConfig.publicEmail} · Book through our booking hub.`,
      primary: { label: "Book a stay", href: book },
      secondary: { label: "All services", href: "/dog-care" },
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
    faq: [
      {
        question: "What kind of training do you offer?",
        answer:
          "Practical lifestyle coaching: patio manners, loose-leash walks, puppy field trips, and calm-home skills — built for real Waco outings, not a sterile classroom.",
      },
      {
        question: "How do I get started?",
        answer:
          "Visit keepwacowagging.com/book and choose training. We will talk through your goals and the skills that matter most at home and around town.",
      },
      {
        question: "Is my dog ready for a Waco patio?",
        answer:
          "Not every dog is ready on day one. Read our patio-readiness guide at keepwacowagging.com/blog/how-to-know-if-your-dog-is-ready-for-a-patio before you book a table.",
      },
    ],
    cta: {
      eyebrow: "Ready when you are",
      title: "Let's build a calmer, happier pup",
      scriptWord: "pup",
      subtitle: `Call ${cityConfig.sponsor.phoneDisplay} · ${cityConfig.publicEmail} · or start online.`,
      primary: { label: "Start training", href: book },
      secondary: { label: "All services", href: "/dog-care" },
    },
  },

  "weddings-events": {
    slug: "pet-care/weddings-events",
    seo: {
      title: "Wedding Dog Chaperone Waco | Dog of Honor Pet Care",
      description:
        "Professional wedding dog chaperone in Waco — transportation, ceremony support, photos, stress management, and a safe handoff so your dog can be part of your day.",
    },
    hero: {
      eyebrow: "Dog of Honor · Weddings & events",
      title: "Your best friend, your Dog of Honor",
      scriptWord: "Dog of Honor",
      description:
        "A dedicated wedding dog chaperone for Waco weddings — one person focused entirely on your pup while you get ready, take photos, and greet guests.",
      image: designPhotos.svcWedding,
      primary: { label: "Reserve a date", href: book },
      secondary: { label: "Ask a question", href: "#inquiry" },
    },
    included: {
      eyebrow: "What your chaperone handles",
      title: "Every detail, off your plate",
      items: weddingDogChaperone.responsibilities.map(({ title, detail }) => ({
        title,
        detail,
      })),
    },
    faq: [
      {
        question: "What is a wedding dog chaperone?",
        answer:
          "A wedding dog chaperone — also called a wedding pet attendant — is a dedicated professional whose only job on your wedding day is to care for, manage, and supervise your dog from start to finish, including transportation, basic care, ceremony and photo support, stress management, styling touch-ups, and vendor coordination.",
      },
      {
        question: "What is a Dog of Honor?",
        answer:
          "Your Dog of Honor is the pup included in your wedding ceremony or photos. Our chaperone makes sure they look great, stay calm, and get home safely — so you and your wedding party never have to step away from the celebration.",
      },
      {
        question: "Why hire a chaperone instead of asking a guest?",
        answer:
          weddingDogChaperone.closing,
      },
      {
        question: "How do I reserve wedding pet care?",
        answer:
          "Start at keepwacowagging.com/book, use the inquiry form on this page, or contact us with your date and venue. Seasonal dates fill quickly.",
      },
    ],
    cta: {
      variant: "clay",
      eyebrow: "Limited dates each season",
      title: "Let's get your pup on the guest list",
      scriptWord: "guest list",
      subtitle: "Tell us your date and venue — we'll take it from there.",
      primary: { label: "Reserve a date", href: book },
      secondary: { label: "All services", href: "/dog-care" },
    },
  },

  "summer-daycare": {
    slug: "summer-daycare",
    seo: {
      title: "Keep Waco Wagging Dog Camp | Summer Daycare Waco",
      description:
        "Keep Waco Wagging Dog Camp is seasonal themed summer daycare in Waco. The 2026 season has wrapped. Year-round small-group daycare is available with the same caregivers.",
    },
    hero: {
      eyebrow: "Keep Waco Wagging Dog Camp",
      title: "The best summer of their life",
      scriptWord: "life",
      metaLine: "Summer 2026 season wrapped · year-round daycare open",
      description:
        "Themed camp weeks run in summer. This season has wrapped — year-round home daycare is still here when your dog needs a daytime plan.",
      image: designPhotos.svcCamp,
      primary: { label: "See year-round daycare", href: "/dog-daycare-waco-tx" },
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
    faq: [
      {
        question: "What is Keep Waco Wagging Dog Camp?",
        answer:
          "Keep Waco Wagging Dog Camp is a seasonal, themed summer daycare program at our Waco home — supervised play, enrichment, splash time, and rest. It is not the same as year-round daycare.",
      },
      {
        question: "How do I enroll?",
        answer:
          "The 2026 camp season has wrapped. For a daytime plan now, request year-round daycare. Next summer's themes will be posted on this page when dates are confirmed.",
      },
    ],
    cta: {
      eyebrow: "Season wrapped",
      title: "Need care before next summer?",
      scriptWord: "care",
      subtitle: `Year-round small-group daycare is open · Call ${cityConfig.sponsor.phoneDisplay}.`,
      primary: { label: "See year-round daycare", href: "/dog-daycare-waco-tx" },
      secondary: { label: "All services", href: "/dog-care" },
    },
  },
};

export function getServicePage(slug: keyof typeof servicePages): ServicePageConfig {
  return servicePages[slug];
}
