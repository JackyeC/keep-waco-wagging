import {
  howloweenCostumeCallout,
  isHowloweenCalloutLive,
} from "@/data/contentWeek";
import { Button } from "@/components/ui/Button";

export function HowloweenCallout() {
  if (!isHowloweenCalloutLive()) return null;

  return (
    <aside className="rounded-[20px] border border-wag-sage/30 bg-sage-50 p-6 sm:p-8">
      <p className="text-xs font-medium tracking-[0.18em] text-wag-sage uppercase">
        {howloweenCostumeCallout.eyebrow}
      </p>
      <h2 className="mt-2 font-display text-[1.6rem] font-medium text-serif-ink">
        {howloweenCostumeCallout.title}
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body-muted">
        {howloweenCostumeCallout.copy}
      </p>
      <div className="mt-5">
        <Button href={howloweenCostumeCallout.href} variant="sage" size="sm">
          {howloweenCostumeCallout.ctaLabel}
        </Button>
      </div>
    </aside>
  );
}
