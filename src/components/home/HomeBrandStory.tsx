import { brandLanguage, cityConfig } from "@/lib/site";

export function HomeBrandStory() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-16 text-center sm:py-20">
      <p className="eyebrow tracking-[0.22em]">Waco, Texas</p>
      <h2 className="heading mt-3 text-[clamp(1.85rem,3.5vw,2.65rem)]">
        {brandLanguage.heroLine}
      </h2>
      <p className="dek mx-auto mt-4 max-w-lg text-[15px]">
        {brandLanguage.communityLine} We live here, we have dogs, and we would
        rather tell you the patio has no shade than pretend every outing is a
        good idea.
      </p>
      <blockquote className="mt-8">
        <p className="font-display text-[22px] leading-snug text-wag-sage italic sm:text-[24px]">
          &ldquo;They are not boarding. They are visiting — bathed in the
          kitchen sink, dried with the good towels.&rdquo;
        </p>
        <cite className="mt-4 block text-xs font-medium tracking-[0.16em] text-label-muted not-italic uppercase">
          {cityConfig.founders.jackye}, founder
        </cite>
      </blockquote>
    </section>
  );
}
