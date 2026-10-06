import type { Testimonial } from "@/lib/types";

/**
 * Public Rover reviews. Best practice: confirm reviewer permission before using
 * these on a separate website beyond Rover, even when they are publicly visible.
 */
export const testimonials: Testimonial[] = [
  {
    id: "rover-kristopher-t",
    author: "Kristopher T.",
    service: "Boarding",
    context: "Rover",
    date: "2026-03-12",
    quote:
      "Jacqueline & Todd are exceptional! They handled my 100lb Rottie with grace, and gave her so much love and attention. I'm so happy to have found them. Wouldn't book with anyone else.",
    excerpt:
      "Jacqueline & Todd are exceptional! They handled my 100lb Rottie with grace, and gave her so much love and attention.",
    permissionStatus: "public_rover_review",
    featured: true,
  },
  {
    id: "rover-linda",
    author: "Linda",
    service: "Boarding",
    context: "Rover",
    date: "2026-06-04",
    quote:
      "This couple Rock! We adopted our dog late March 2026. Early May, she was sick and diagnosed with Pancreatitis... They did amazing with all my detailed instructions, and sent photos and videos daily... I can only give them my highest recommendation! They clearly love all dogs and want them to live their best life even when the dogs 'Mom & Dad' are away.",
    excerpt:
      "They did amazing with all my detailed instructions, and sent photos and videos daily. I can only give them my highest recommendation!",
    permissionStatus: "public_rover_review",
    featured: true,
  },
  {
    id: "rover-karmen-w",
    author: "Karmen W.",
    service: "Boarding",
    context: "Rover",
    date: "2026-05-26",
    quote:
      "Todd & Jackye are the BEST! I say this every time Finn stays with them! He has the best time & they are always sending pics & videos.",
    excerpt:
      "Todd & Jackye are the BEST! I say this every time Finn stays with them.",
    permissionStatus: "public_rover_review",
    featured: true,
  },
  {
    id: "rover-mariana-f",
    author: "Mariana F.",
    service: "Daycare",
    context: "Rover",
    date: "2026-04-12",
    quote:
      "I cannot thank enough Jackie and Todd for all they do for my doggy... Finding this amazing couple is one of the best things that happened to us in Waco.",
    excerpt:
      "Finding this amazing couple is one of the best things that happened to us in Waco.",
    permissionStatus: "public_rover_review",
    featured: true,
  },
  {
    id: "rover-megan-a",
    author: "Megan A.",
    service: "Drop-In Visits",
    context: "Rover",
    date: "2026-03-29",
    quote:
      "They gave above-and-beyond care, with daily photos, videos, and updates. When I returned home, my dogs were happy to see me and not anxious or stressed.",
    excerpt:
      "They gave above-and-beyond care, with daily photos, videos, and updates. When I returned home, my dogs were happy to see me and not anxious or stressed.",
    permissionStatus: "public_rover_review",
  },
  {
    id: "rover-brooklynn-s",
    author: "Brooklynn S.",
    service: "Boarding",
    context: "Rover",
    date: "2026-05-02",
    quote:
      "Our dog Ace loved being with them for the week. They sent daily photos, and we will definitely bring him back.",
    excerpt:
      "Our dog Ace loved being with them for the week. They sent daily photos, and we will definitely bring him back.",
    permissionStatus: "public_rover_review",
  },
];

export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  const items = testimonials.filter((t) => t.featured);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getTestimonialsByContext(
  context: Testimonial["context"],
): Testimonial[] {
  return testimonials.filter((t) => t.context === context);
}

/** Complete short quote for cards — never a mid-sentence ellipsis. */
export function testimonialExcerpt(item: Testimonial): string {
  return item.excerpt?.trim() || item.quote.trim();
}
