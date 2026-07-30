import type { BlogPost } from "@/lib/types";
import { getGuideContent } from "@/data/guideContent";

/** All blog categories, in display order. */
export const blogCategories = [
  "Dog-Friendly Waco",
  "Training for Real Life",
  "Yard + Home",
  "Local Pet Parents",
  "Events",
  "Waco Business Spotlights",
  "Platinum Scoops Tips",
] as const;

/**
 * Blog/guide cards. Only posts with `indexable: true` and full guide body
 * copy in `guideContent` are published for SEO (sitemap + index).
 * Stub posts stay reachable but are noindex and hidden from the blog index.
 */
export const blogPosts: BlogPost[] = [
  {
    id: "b-001",
    slug: "best-dog-friendly-patios-in-waco",
    title: "Best Dog-Friendly Patios in Waco",
    category: "Dog-Friendly Waco",
    excerpt:
      "Our running list of Waco patios that genuinely welcome dogs — with shade, water, and the manners cues you'll want before you go.",
    readTime: "6 min read",
    date: "2026-05-28",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    featured: true,
    indexable: true,
  },
  {
    id: "b-002",
    slug: "how-to-know-if-your-dog-is-ready-for-a-patio",
    title: "How to Know If Your Dog Is Ready for a Patio",
    category: "Training for Real Life",
    excerpt:
      "A quick self-check: can your dog settle, recover from distractions, and relax on a leash? Here's how to tell — and what to do if not yet.",
    readTime: "5 min read",
    date: "2026-05-24",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    featured: true,
    indexable: true,
  },
  {
    id: "b-003",
    slug: "best-waco-parks-for-dogs",
    title: "Best Waco Parks for Dogs",
    category: "Dog-Friendly Waco",
    excerpt:
      "From Cameron Park's shaded trails to fenced bark parks in Bellmead, here are our favorite green spaces for every kind of dog.",
    readTime: "7 min read",
    date: "2026-05-20",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-004",
    slug: "the-waco-puppy-socialization-checklist",
    title: "The Waco Puppy Socialization Checklist",
    category: "Training for Real Life",
    excerpt:
      "A week-by-week checklist of safe, positive experiences to give your puppy during the critical socialization window.",
    readTime: "8 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-005",
    slug: "what-to-bring-when-you-take-your-dog-out-in-waco",
    title: "What to Bring When You Take Your Dog Out in Waco",
    category: "Dog-Friendly Waco",
    excerpt:
      "Water, waste bags, a settle mat, and a few other essentials that make every outing smoother in the Texas heat.",
    readTime: "4 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-006",
    slug: "how-to-help-your-dog-stay-calm-around-crowds",
    title: "How to Help Your Dog Stay Calm Around Crowds",
    category: "Training for Real Life",
    excerpt:
      "Markets and festivals are a lot for any dog. Here's how to build distance, use distractions, and keep things under threshold.",
    readTime: "6 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-007",
    slug: "dog-friendly-weekend-in-waco",
    title: "A Dog-Friendly Weekend in Waco",
    category: "Events",
    excerpt:
      "A sample two-day itinerary: morning trail, patio lunch, an afternoon at a pet store, and a calm evening stroll.",
    readTime: "5 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-008",
    slug: "patio-manners-what-your-dog-needs-before-brunch",
    title: "Patio Manners: What Your Dog Needs Before Brunch",
    category: "Training for Real Life",
    excerpt:
      "The three skills that make patio outings easy — settle, leave-it, and a calm down-stay — and how to practice each one.",
    readTime: "6 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-009",
    slug: "waco-dog-etiquette-guide",
    title: "Waco Dog Etiquette Guide",
    category: "Local Pet Parents",
    excerpt:
      "Leash courtesy, cleaning up, and being a good neighbor — the unwritten rules that keep Waco welcoming for all dogs.",
    readTime: "5 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-010",
    slug: "what-local-businesses-should-know-before-becoming-dog-friendly",
    title: "What Local Businesses Should Know Before Becoming Dog-Friendly",
    category: "Waco Business Spotlights",
    excerpt:
      "Thinking about welcoming dogs? Here's how Waco businesses can do it well — water, signage, and simple ground rules.",
    readTime: "6 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Keep Waco Wagging",
    indexable: true,
  },
  {
    id: "b-011",
    slug: "why-cleaning-up-dog-waste-matters-for-your-yard",
    title: "Why Cleaning Up Dog Waste Matters for Your Yard",
    category: "Yard + Home",
    excerpt:
      "Beyond the smell: how regular cleanup protects your lawn, your family's health, and your weekends. A Platinum Scoops tip.",
    readTime: "4 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Platinum Scoops",
    indexable: true,
  },
  {
    id: "b-012",
    slug: "how-to-keep-your-yard-guest-ready-when-you-have-dogs",
    title: "How to Keep Your Yard Guest-Ready When You Have Dogs",
    category: "Yard + Home",
    excerpt:
      "Simple routines (and a little help from Platinum Scoops) to keep your yard fresh and ready for company year-round.",
    readTime: "5 min read",
    date: "2026-07-30",
    updated: "2026-07-30",
    author: "Platinum Scoops",
    indexable: true,
  },
];

/**
 * Public post records. Card covers come from `blogCovers` — unique
 * editorial tiles per guide, not random library photos.
 */
export const blogPostsWithImages: BlogPost[] = blogPosts.map((post) => ({ ...post }));

/** True when a post is intentionally published with full guide body copy. */
export function isPublishedGuide(post: BlogPost): boolean {
  return post.indexable === true && Boolean(getGuideContent(post.slug));
}

export function getPublishedPosts(): BlogPost[] {
  return blogPostsWithImages
    .filter(isPublishedGuide)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return getPublishedPosts().slice(0, limit);
}

export function getIndexablePosts(): BlogPost[] {
  return getPublishedPosts();
}
