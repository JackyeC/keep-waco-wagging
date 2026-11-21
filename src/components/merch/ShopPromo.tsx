"use client";

import { blackFridayPromo } from "@/lib/site";
import { useBlackFridayPhase } from "@/lib/useBlackFridayPhase";

/** Shows only inside the real Black Friday window. Server HTML stays quiet. */
export function ShopPromo() {
  const phase = useBlackFridayPhase();
  if (phase === "off") return null;

  const live = phase === "live";

  return (
    <aside
      aria-label="Black Friday"
      className={
        live
          ? "rounded-[20px] border border-sage-ink bg-sage-ink px-5 py-4 text-cream"
          : "rounded-[20px] border border-border bg-soft-cream px-5 py-4 text-serif-ink"
      }
    >
      <p
        className={
          live
            ? "text-[11px] font-medium tracking-[0.16em] text-cream/80 uppercase"
            : "text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase"
        }
      >
        {live ? "On now" : "Starts Friday"}
      </p>
      <p className="mt-1 font-display text-[1.45rem] leading-tight font-medium">
        {live ? blackFridayPromo.liveMessage : blackFridayPromo.teaserMessage}
      </p>
      <p className={`mt-2 text-sm font-light ${live ? "text-cream/85" : "text-body-muted"}`}>
        The code works at Shopify checkout. The sale runs Friday 11/27, 12:00 AM
        CT, through Monday 11/30, 11:59 PM CT.
      </p>
    </aside>
  );
}
