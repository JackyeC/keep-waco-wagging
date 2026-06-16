import Link from "next/link";
import { cn } from "@/lib/utils";
import { cityConfig } from "@/lib/site";

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
    <Link
      href={href}
      className={cn(
        "publisher-note inline-block transition-colors hover:text-bark",
        className,
      )}
    >
      Presented by{" "}
      <span className="border-b border-clay text-bark-soft hover:border-bark">
        {cityConfig.sponsor.name}
      </span>
    </Link>
  );
}
