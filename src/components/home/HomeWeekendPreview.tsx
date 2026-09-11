import Link from "next/link";
import { MapPin } from "lucide-react";
import { MoveOnePurchase } from "@/components/weekend/MoveOnePurchase";
import {
  weekendEdition,
  weekendSaturdayStops,
  weekendSundayFeature,
} from "@/data/weekend";

const homePicks = [
  weekendSaturdayStops[0],
  weekendSaturdayStops[1],
  {
    id: "the-will",
    title: weekendSundayFeature.title,
    when: weekendSundayFeature.when,
    address: weekendSundayFeature.address,
    copy: "Dog-focused activities, the Dash for the Daisies Dachshund Derby, and a chance to shop local vendors at HomeGrown Sunday.",
  },
] as const;

export function HomeWeekendPreview() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow tracking-[0.24em]">{weekendEdition.eyebrow}</p>
          <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)]">
            {weekendEdition.title}
          </h2>
          <p className="dek mt-2 max-w-lg text-[15px]">
            {weekendEdition.challenge} You don&apos;t have to spend extra — just
            move one purchase you were already going to make.
          </p>
        </div>
        <Link
          href="/weekend"
          className="border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
        >
          Full weekend guide →
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {homePicks.map((pick) => (
          <article
            key={pick.id}
            className="flex h-full flex-col rounded-[20px] border border-border bg-soft-cream p-6"
          >
            <p className="text-[11px] font-medium tracking-[0.14em] text-wag-sage uppercase">
              {pick.when}
            </p>
            <h3 className="mt-2 font-display text-[1.35rem] font-medium text-serif-ink">
              {pick.title}
            </h3>
            <p className="mt-2 flex items-start gap-2 text-[13px] text-label-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {pick.address}
            </p>
            <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-body-muted">
              {pick.copy}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <MoveOnePurchase variant="callout" />
      </div>
    </section>
  );
}
