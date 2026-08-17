import { BadgeCheck, TriangleAlert, Ban, Search } from "lucide-react";
import { statusConfig, pendingConfig, type PublicStatus } from "@/data/approvedListings";
import { cn } from "@/lib/utils";

const icons = {
  check: BadgeCheck,
  caution: TriangleAlert,
  no: Ban,
} as const;

const styles: Record<PublicStatus, string> = {
  approved: "bg-wag-sage text-cream ring-1 ring-sage-700/20",
  cautions: "bg-gold-100 text-gold-600 ring-1 ring-gold-400/40",
  not_recommended: "bg-clay text-bark-soft ring-1 ring-bark/10",
};

/**
 * The Keep Waco Wagging Approved verdict badge. Always uses the full public
 * label (never a shortened name). `size="lg"` is for listing headers; `sm`
 * for cards. Only render this once a listing is evaluated.
 */
export function ApprovedStatusBadge({
  status,
  size = "sm",
  className,
}: {
  status: PublicStatus;
  size?: "sm" | "lg";
  className?: string;
}) {
  const config = statusConfig[status];
  const Icon = icons[config.icon];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium tracking-[0.04em] uppercase",
        size === "lg"
          ? "px-4 py-2 text-[13px]"
          : "px-3 py-1 text-[11px] tracking-[0.08em]",
        styles[status],
        className,
      )}
    >
      <Icon
        className={cn("shrink-0", size === "lg" ? "h-4.5 w-4.5" : "h-3.5 w-3.5")}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}

/**
 * Subtle indicator for a not-yet-evaluated lead. Deliberately NOT an approval
 * seal — it signals discovery, not a Keep Waco Wagging recommendation.
 */
export function PendingBadge({
  size = "sm",
  className,
}: {
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-cream text-body-muted ring-1 ring-border font-medium tracking-[0.08em] uppercase",
        size === "lg" ? "px-4 py-2 text-[13px]" : "px-3 py-1 text-[11px]",
        className,
      )}
    >
      <Search
        className={cn("shrink-0", size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5")}
        aria-hidden="true"
      />
      {pendingConfig.label}
    </span>
  );
}
