import { PresentingSponsor } from "@/components/PresentingSponsor";
import { cn } from "@/lib/utils";

/** Tasteful publisher attribution — print-style, not a pill badge. */
export function SponsorBadge({
  className,
  href = "/platinum-scoops",
}: {
  className?: string;
  href?: string;
  /** @deprecated size prop ignored — kept for call-site compat */
  size?: "sm" | "md";
}) {
  return (
    <PresentingSponsor className={cn("publisher-note", className)} href={href} size="sm" />
  );
}
