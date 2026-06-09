import type { Testimonial } from "@/lib/types";

/**
 * Client testimonials — replace with real reviews (with permission).
 * TODO: swap placeholder quotes for verified client/Rover reviews.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t-001",
    quote:
      "Our puppy went from pulling on every walk to settling calmly on the patio at our favorite Waco spot. The lifestyle training approach actually fit our real life.",
    author: "Sarah M.",
    context: "Training",
    neighborhood: "Woodway",
    featured: true,
  },
  {
    id: "t-002",
    quote:
      "Platinum Scoops has been a game-changer for our backyard. We actually use the yard again — and our dog is happier for it.",
    author: "Mike & Jen T.",
    context: "Platinum Scoops",
    neighborhood: "Hewitt",
    featured: true,
  },
  {
    id: "t-003",
    quote:
      "Jacky took amazing care of our dogs while we were out of town. Daily updates, photos, and our pups were relaxed when we got home.",
    author: "Rachel K.",
    context: "Rover",
    neighborhood: "Robinson",
    featured: true,
  },
  {
    id: "t-004",
    quote:
      "Finally one place to find dog-friendly patios and parks in Waco. This is exactly what new dog parents need.",
    author: "Chris L.",
    context: "General",
    neighborhood: "Downtown Waco",
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

export function getTestimonialsByContext(
  context: Testimonial["context"],
): Testimonial[] {
  return testimonials.filter((t) => t.context === context);
}
