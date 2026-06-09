import type { TrainingService } from "@/lib/types";

/**
 * Lifestyle dog training services.
 * TODO: confirm pricing, session length, and booking flow before launch.
 */
export const trainingServices: TrainingService[] = [
  {
    id: "t-001",
    name: "Patio Manners Session",
    slug: "patio-manners-session",
    summary: "Help your dog settle calmly while you eat, sip, and socialize.",
    description:
      "We build the 'tuck under the table and relax' skill so brunch and happy hour stay low-stress for everyone.",
    bestFor: "Dogs who get up, whine, or fidget at restaurants and cafés.",
    icon: "patio",
  },
  {
    id: "t-002",
    name: "Loose-Leash Walk + Train",
    slug: "loose-leash-walk-train",
    summary: "Walks that feel like a partnership, not a tug-of-war.",
    description:
      "On-the-move coaching for leash pressure, check-ins, and staying connected around people, dogs, and squirrels.",
    bestFor: "Dogs who pull, lunge, or zig-zag toward every distraction.",
    icon: "walk",
  },
  {
    id: "t-003",
    name: "Puppy Field Trip Plan",
    slug: "puppy-field-trip-plan",
    summary: "Safe, structured real-world practice during the key window.",
    description:
      "A guided socialization plan that builds confidence with new places, surfaces, sounds, and friendly people.",
    bestFor: "Puppies who need positive exposure without getting overwhelmed.",
    icon: "puppy",
  },
  {
    id: "t-004",
    name: "Public Manners Coaching",
    slug: "public-manners-coaching",
    summary: "Confidence for markets, patios, parks, and busy places.",
    description:
      "We coach you in real Waco settings so your dog learns to stay calm and focused when the world gets busy.",
    bestFor: "Dogs ready to level up from quiet spots to busier outings.",
    icon: "public",
  },
  {
    id: "t-005",
    name: "Calm Home Skills",
    slug: "calm-home-skills",
    summary: "Better manners with guests, doorbells, and daily chaos.",
    description:
      "Settle on a mat, polite greetings, and calm-around-the-doorbell routines for a more peaceful household.",
    bestFor: "Dogs who go over-threshold at the door or with visitors.",
    icon: "home",
  },
  {
    id: "t-006",
    name: "Custom Lifestyle Training Plan",
    slug: "custom-lifestyle-training-plan",
    summary: "A tailored roadmap built around your dog and your goals.",
    description:
      "We start with an assessment, then map out a plan that fits your dog's needs and your real Waco routine.",
    bestFor: "Anyone who wants a personalized, step-by-step path.",
    icon: "plan",
  },
];

/** FAQ for the Lifestyle Dog Training page. */
export const trainingFaqs: { q: string; a: string }[] = [
  {
    q: "What is lifestyle dog training?",
    a: "Lifestyle dog training focuses on the real-world skills you actually use every day — calm walks, polite greetings, settling on patios, and confidence in public — instead of only formal commands in a quiet room.",
  },
  {
    q: "Is this obedience training?",
    a: "There's overlap, but the goal is different. We use foundational obedience as a tool to reach practical, everyday outcomes: a dog who can join you for coffee, handle a busy sidewalk, and relax when guests arrive.",
  },
  {
    q: "Can you help with leash pulling?",
    a: "Yes — that's one of the most common goals. Our Loose-Leash Walk + Train focuses on reducing leash pressure and building check-ins so walks feel like a partnership.",
  },
  {
    q: "Can you help my dog behave on patios?",
    a: "Absolutely. The Patio Manners Session builds a reliable 'settle and relax' so your dog can tuck under the table while you eat. We often start in quiet spots before working up to busier patios.",
  },
  {
    q: "Do you work with puppies?",
    a: "Yes. The Puppy Field Trip Plan delivers safe, structured socialization during the critical early window so your puppy grows into a confident adult dog.",
  },
  {
    q: "Do you work with anxious dogs?",
    a: "We do, with a patient, low-pressure approach. We'll meet your dog where they are and build confidence gradually. For serious fear or aggression, we'll refer to a qualified behavior professional when appropriate.",
  },
  {
    q: "How do I know if my dog is ready for public places?",
    a: "Start with a Lifestyle Training Assessment. We'll look at how your dog handles distractions, recovery, and settling, then recommend the right next step — whether that's quiet practice or a busy patio.",
  },
];
