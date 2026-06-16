import Link from "next/link";
import { cn } from "@/lib/utils";
import { cityConfig } from "@/lib/site";

/** Quiet publisher line — "Presented by Platinum Scoops" */
export function PublisherNote({
  className,
  href = "/platinum-scoops",
  light = false,
}: {
  className?: string;
  href?: string;
  /** Lighter text for use on dark hero overlays */
  light?: boolean;
}) {
  return (
    <p className={cn("publisher-note", light && "text-cream/60", className)}>
      Presented by{" "}
      <Link
        href={href}
        className={cn(
          "border-b border-transparent transition-colors hover:border-current",
          light ? "text-cream/85 hover:text-cream" : "text-bark-soft hover:text-bark",
        )}
      >
        {cityConfig.sponsor.name}
      </Link>
    </p>
  );
}
