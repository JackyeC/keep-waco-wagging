import { getFeaturedTestimonials } from "@/data/testimonials";

export function HomeSoftProof() {
  const reviews = getFeaturedTestimonials(2);
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-[960px] px-6 py-16 sm:py-20">
      <p className="eyebrow text-center tracking-[0.22em]">From our clients</p>
      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
        {reviews.map((review) => {
          const shortQuote =
            review.quote.length > 140
              ? `${review.quote.slice(0, 137).trim()}…`
              : review.quote;

          return (
            <blockquote key={review.id}>
              <p className="font-display text-[21px] leading-snug text-serif-ink italic">
                &ldquo;{shortQuote}&rdquo;
              </p>
              <cite className="mt-4 block text-xs font-medium tracking-[0.14em] text-label-muted not-italic uppercase">
                {review.author}
              </cite>
            </blockquote>
          );
        })}
      </div>
    </section>
  );
}
