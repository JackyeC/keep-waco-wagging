import { getFeaturedTestimonials } from "@/data/testimonials";

export function HomeReviews() {
  const reviews = getFeaturedTestimonials(3);

  return (
    <section className="mx-auto mt-[72px] max-w-[1200px] px-6">
      <div className="text-center">
        <p className="eyebrow tracking-[0.22em]">From our clients</p>
        <h2 className="heading mt-1.5 text-[40px]">
          Real Waco dog families, real results
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {reviews.map((review) => {
          const shortQuote =
            review.quote.length > 160
              ? `${review.quote.slice(0, 157).trim()}…`
              : review.quote;

          return (
            <article
              key={review.id}
              className="rounded-[20px] border border-border bg-soft-cream p-7"
            >
              <div className="text-[15px] tracking-wide text-rose" aria-hidden>
                ★★★★★
              </div>
              <p className="mt-3.5 font-display text-[19px] leading-snug text-serif-ink italic">
                &ldquo;{shortQuote}&rdquo;
              </p>
              <p className="mt-4 text-xs font-medium tracking-[0.12em] text-label-muted uppercase">
                {review.author} · {review.context}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
