import { PresentingSponsor } from "@/components/PresentingSponsor";
import { cn } from "@/lib/utils";

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
    <PresentingSponsor
      className={cn("publisher-note", className)}
      href={href}
      light={light}
      size="sm"
    />
  );
}
