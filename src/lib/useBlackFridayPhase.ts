"use client";

import { useSyncExternalStore } from "react";
import {
  blackFridayPhase,
  blackFridayPromo,
  type PromoPhase,
} from "@/lib/site";

const BOUNDARIES = [
  Date.parse(blackFridayPromo.teaserStartsAt),
  Date.parse(blackFridayPromo.startsAt),
  Date.parse(blackFridayPromo.endsAt) + 1,
];

// setTimeout caps at ~24.8 days; re-arm in chunks for far-off boundaries.
const MAX_DELAY_MS = 2 ** 31 - 1;

/**
 * Notifies React when the clock crosses a promo boundary, and when the tab
 * becomes visible again (timers can be throttled in background tabs).
 */
function subscribe(onChange: () => void): () => void {
  let timer: number | undefined;

  const arm = () => {
    const now = Date.now();
    const next = BOUNDARIES.find((b) => b > now);
    if (next === undefined) return;
    timer = window.setTimeout(
      () => {
        onChange();
        arm();
      },
      Math.min(next - now, MAX_DELAY_MS),
    );
  };

  const onVisible = () => {
    if (document.visibilityState === "visible") onChange();
  };

  arm();
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

/**
 * Promo phase from the visitor's clock. Server render is always "off",
 * so static HTML never claims a sale; the client switches after hydration
 * and again at each boundary while the page stays open.
 */
export function useBlackFridayPhase(): PromoPhase {
  return useSyncExternalStore(subscribe, () => blackFridayPhase(), () => "off");
}
