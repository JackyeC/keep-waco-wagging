import { moveOnePurchase } from "@/data/weekend";

export function MoveOnePurchase({
  variant = "full",
}: {
  variant?: "full" | "callout";
}) {
  if (variant === "callout") {
    return (
      <aside className="rounded-[22px] border border-wag-sage/30 bg-sage-50 p-6 sm:p-8">
        <p className="text-xs font-medium tracking-[0.18em] text-wag-sage uppercase">
          Move one purchase local
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-bark-soft">
          Already buying coffee? Get it from a Waco coffee shop.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-bark-soft">
          Need groceries? Buy something from a local farmer or maker.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-bark-soft">
          Need dog food or treats? Try a local pet or feed business.
        </p>
        <p className="mt-4 text-[15px] text-bark">
          You don&rsquo;t have to spend more money.
        </p>
        <p className="mt-1 font-display text-[1.45rem] text-serif-ink italic">
          Just move one purchase.
        </p>
      </aside>
    );
  }

  return (
    <section className="rounded-[22px] border border-border bg-soft-cream p-6 sm:p-8">
      <h2 className="heading text-[clamp(1.7rem,3vw,2.2rem)]">
        {moveOnePurchase.heading}
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body-muted">
        {moveOnePurchase.intro}
      </p>
      <ul className="mt-5 space-y-2 text-[14.5px] text-bark-soft">
        {moveOnePurchase.examples.map((example) => (
          <li key={example.from}>
            <span className="font-medium text-bark">{example.from}</span>
            {" → "}
            {example.to}
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-bark">
        {moveOnePurchase.closing}
      </p>
      <a
        href={moveOnePurchase.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:text-wag-sage"
      >
        {moveOnePurchase.ctaLabel} {moveOnePurchase.instagramHandle} →
      </a>
    </section>
  );
}
