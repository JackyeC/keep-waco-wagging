import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Tasteful "Presented by Platinum Scoops" badge.
 * Used near the logo, in heroes, and in select sections.
 */
export function SponsorBadge({
  className,
  href = "/platinum-scoops",
  size = "md",
}: {
  className?: string;
  href?: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full bg-gold-100 font-medium text-gold-600 ring-1 ring-inset ring-gold-200 transition-colors hover:bg-gold-200",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1 text-xs",
        className,
      )}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500"
        aria-hidden="true"
      />
      Presented by{" "}
      <span className="font-semibold underline-offset-2 group-hover:underline">
        Platinum Scoops
      </span>
    </Link>
  );
}
