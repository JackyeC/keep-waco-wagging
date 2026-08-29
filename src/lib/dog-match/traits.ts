import type { TraitLevel } from "@/data/dog-match/types";

export function traitNumber(value: TraitLevel): number | null {
  return value === "unknown" ? null : value;
}
