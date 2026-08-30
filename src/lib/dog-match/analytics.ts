"use client";

import { track } from "@vercel/analytics";

export type DogMatchEvent =
  | "dog_match_started"
  | "dog_match_completed"
  | "dog_match_shared"
  | "dog_match_comparison_started"
  | "dog_match_dog_care_clicked";

export function trackDogMatch(
  event: DogMatchEvent,
  payload: Record<string, string | number> = {},
): void {
  const clean: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "number") {
      clean[key] = value;
    } else {
      clean[key] = value.slice(0, 80);
    }
  }
  track(event, clean);
}
