import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { WeekendBlock } from "@/lib/types";

/** Highlight the yard (Platinum Scoops) and training blocks with accent tones. */
function accent(kind: WeekendBlock["kind"]) {
  if (kind === "yard") return "ring-gold-200 bg-gold-100/40";
  if (kind === "training") return "ring-sage-200 bg-sage-50";
  return "ring-clay/70 bg-white";
}

function iconTone(kind: WeekendBlock["kind"]) {
  if (kind === "yard") return "bg-gold-100 text-gold-600";
  if (kind === "training") return "bg-sage-600 text-white";
  return "bg-sky-100 text-sky-700";
}

export function WeekendGuideBlock({ block }: { block: WeekendBlock }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card p-6 ring-1 ring-inset",
        accent(block.kind),
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            iconTone(block.kind),
          )}
        >
          <Icon name={block.icon} className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold">{block.title}</h3>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-soft">
        {block.body}
      </p>

      {block.items && block.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li
              key={item.name}
              className="rounded-xl bg-white/70 px-3 py-2 text-sm ring-1 ring-inset ring-clay/60"
            >
              <span className="font-semibold text-bark">{item.name}</span>
              <span className="block text-xs text-bark-soft">{item.detail}</span>
            </li>
          ))}
        </ul>
      )}

      {block.ctaLabel && block.ctaHref && (
        <Link
          href={block.ctaHref}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-800"
        >
          {block.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </article>
  );
}
