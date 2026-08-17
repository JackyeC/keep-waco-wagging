import { BadgeCheck, TriangleAlert, Ban } from "lucide-react";
import { statusConfig, type ApprovedStatus } from "@/data/approvedListings";
import { cn } from "@/lib/utils";

const icons = {
  check: BadgeCheck,
  caution: TriangleAlert,
  no: Ban,
} as const;

const styles: Record<ApprovedStatus, string> = {
  approved: "bg-wag-sage text-cream ring-1 ring-sage-700/20",
  cautions: "bg-gold-100 text-gold-600 ring-1 ring-gold-400/40",
  not_recommended: "bg-clay text-bark-soft ring-1 ring-bark/10",
};

/**
 * The Keep Waco Wagging Approved status badge. Always uses the full public
 * label (never a shortened name). `size="lg"` is for listing headers; `sm`
 * for cards.
 */
export function ApprovedStatusBadge({
  status,
  size = "sm",
  className,
}: {
  status: ApprovedStatus;
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
