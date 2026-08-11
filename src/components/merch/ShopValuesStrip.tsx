import { brandEssence, brandValues } from "@/data/brandVibe";

export function ShopValuesStrip() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-8">
      <div className="rounded-[22px] border border-border bg-soft-cream px-6 py-8 sm:px-10">
        <p className="text-center text-xs font-medium tracking-[0.22em] text-label-muted uppercase">
          {brandEssence.tagline}
        </p>
        <p className="mt-2 text-center font-display text-lg text-serif-ink sm:text-xl">
          {brandEssence.pillars}
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {brandValues.map((value) => (
            <li
              key={value.id}
              className="rounded-[16px] border border-border bg-cream px-4 py-4 text-center"
            >
              <p className="font-display text-[15px] font-semibold text-wag-sage">
                {value.label}
              </p>
              <p className="mt-1.5 text-[12px] font-light leading-snug text-body-muted-light">
                {value.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center font-script text-[22px] text-rose">
          {brandEssence.togetherLine}
        </p>
      </div>
    </section>
  );
}
