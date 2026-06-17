import { cn } from "@/lib/utils";
import type { GearGuideBadge } from "@/lib/types";

const badgeStyles: Record<GearGuideBadge, string> = {
  "Used by Platinum Scoops": "bg-sage-100 text-sage-800 ring-sage-200",
  "On Our Shopping List": "bg-sky-100 text-sky-900 ring-sky-200",
  "Similar to What We Use": "bg-sand text-bark-soft ring-clay",
  "Worth Considering": "bg-cream text-bark-soft ring-clay",
  "Use Carefully": "bg-gold-100 text-gold-700 ring-gold-200",
};

export function GearGuideBadgePill({
  badge,
  className,
}: {
  badge: GearGuideBadge;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset",
        badgeStyles[badge],
        className,
      )}
    >
      {badge}
    </span>
  );
}
