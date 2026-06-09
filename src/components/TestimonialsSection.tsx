import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { getFeaturedTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/lib/types";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <blockquote className="flex h-full flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70">
      <Quote className="h-6 w-6 text-sage-400" aria-hidden="true" />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="mt-4 border-t border-clay pt-4">
        <p className="text-sm font-semibold text-bark">{item.author}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge tone="sage">{item.context}</Badge>
          {item.neighborhood && (
            <span className="text-xs text-bark-faint">{item.neighborhood}</span>
          )}
        </div>
      </footer>
    </blockquote>
  );
}

export function TestimonialsSection({
  tone = "sand",
  limit = 3,
}: {
  tone?: "paper" | "sand" | "sky";
  limit?: number;
}) {
  const items = getFeaturedTestimonials().slice(0, limit);

  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="From our clients"
        title="Real Waco dog families, real results"
        description="Training, yard care, and Rover clients who've worked with our team."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
