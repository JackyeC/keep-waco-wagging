"use client";

import { useSyncExternalStore } from "react";
import { blackFridayPhase, type PromoPhase } from "@/lib/site";

const noopSubscribe = () => () => {};

/**
 * Promo phase from the visitor's clock. Server render is always "off",
 * so static HTML never claims a sale; the client switches after hydration.
 */
export function useBlackFridayPhase(): PromoPhase {
  return useSyncExternalStore(
    noopSubscribe,
    () => blackFridayPhase(),
    () => "off",
  );
}
