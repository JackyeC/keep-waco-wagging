import type { MatchResult } from "@/data/dog-match/types";
import { popularityLabel } from "@/lib/dog-match/score";
import { cn } from "@/lib/utils";

export function ScoreMeters({
  fit,
  friction,
  compact = false,
}: {
  fit: number;
  friction: number;
  compact?: boolean;
}) {
  return (
    <div className={cn("grid gap-3", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
      <Meter label="Lifestyle Fit" value={fit} tone="sage" />
      <Meter label="Friction" value={friction} tone="rose" />
    </div>
  );
}

function Meter({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "sage" | "rose";
}) {
  const fill = tone === "sage" ? "bg-wag-sage" : "bg-rose";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.14em] text-label-muted uppercase">
          {label}
        </p>
        <p className="font-display text-2xl font-medium text-serif-ink">{value}</p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-clay">
        <div className={cn("h-full rounded-full", fill)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function MatchCard({
  result,
  pinned,
  onPin,
  onOpen,
}: {
  result: MatchResult;
  pinned?: boolean;
  onPin?: () => void;
  onOpen?: () => void;
}) {
  const { dog } = result;
  return (
    <article className="card-panel flex flex-col p-6">
      <p className="text-[11px] font-medium tracking-[0.14em] text-rose-deep uppercase">
        {popularityLabel(dog)}
      </p>
      <h3 className="mt-2 font-display text-[1.7rem] font-medium text-serif-ink">
        {dog.name}
      </h3>
      <div className="mt-4">
        <ScoreMeters fit={result.lifestyleFit} friction={result.friction} compact />
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-body-muted">{dog.notes}</p>
      <ul className="mt-4 space-y-1.5 text-[13px] text-bark-soft">
        {result.whyItCouldWork.slice(0, 2).map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            className="btn-pill btn-sage px-4 py-2 text-[11px]"
          >
            See the full picture
          </button>
        )}
        {onPin && (
          <button
            type="button"
            onClick={onPin}
            className={cn(
              "btn-pill px-4 py-2 text-[11px]",
              pinned ? "bg-sage-100 text-wag-sage" : "btn-rose-outline",
            )}
          >
            {pinned ? "Pinned" : "Pin to compare"}
          </button>
        )}
      </div>
    </article>
  );
}
