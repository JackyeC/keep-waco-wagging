import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getAdForPlacement } from "@/data/ads";
import { cn } from "@/lib/utils";
import type { Ad, AdPlacement } from "@/lib/types";

function labelTone(label: Ad["label"]) {
  return label === "Presenting Sponsor"
    ? "bg-gold-100 text-gold-600"
    : "bg-sand text-bark-soft";
}

/**
 * Renders the active ad/sponsor unit for a placement. If no ad is sold for
 * that placement, it shows a "house ad" inviting businesses to advertise —
 * so a slot is never empty and every empty slot drives Get Listed sign-ups.
 *
 * Units are clearly labeled (Presenting Sponsor / Sponsored / Ad) for trust.
 */
export function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const ad = getAdForPlacement(placement);

  if (!ad) {
    // House ad — invite local businesses to fill the slot.
    return (
      <aside
        className={cn(
          "rounded-card border border-dashed border-clay bg-cream p-5 text-center",
          className,
        )}
      >
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
          <Megaphone className="h-5 w-5" />
        </span>
        <p className="mt-3 text-sm font-semibold text-bark">
          Advertise to Waco dog parents
        </p>
        <p className="mt-1 text-xs leading-relaxed text-bark-soft">
          This spot is open for a local pet-friendly business.
        </p>
        <Link
          href="/get-listed"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-800"
        >
          Get your ad here <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-2 text-[10px] uppercase tracking-wide text-bark-faint">
          Ad slot
        </p>
      </aside>
    );
  }

  const external = ad.href.startsWith("http");

  return (
    <aside
      className={cn(
        "overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70",
        className,
      )}
    >
      {ad.imageUrl !== undefined && (
        <div className="aspect-[16/9]">
          <ImagePlaceholder src={ad.imageUrl} alt={ad.sponsor} label={ad.sponsor} />
        </div>
      )}
      <div className="p-5">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            labelTone(ad.label),
          )}
        >
          {ad.label}
        </span>
        <p className="mt-2 text-sm font-semibold text-bark">{ad.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-bark-soft">{ad.body}</p>
        <Link
          href={ad.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sage-700 hover:text-sage-800"
        >
          {ad.sponsor === "Platinum Scoops" ? "Learn more" : `Visit ${ad.sponsor}`}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
