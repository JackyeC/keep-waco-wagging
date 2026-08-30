"use client";

import type { DogProfile, MatchResult, TraitField } from "@/data/dog-match/types";
import { traitOrigin, usableTraitLevel } from "@/data/dog-match/trait-origins";
import { cn } from "@/lib/utils";

const ROWS: { key: string; label: string; value: (result: MatchResult) => string }[] = [
  { key: "fit", label: "Lifestyle Fit", value: (r) => String(r.lifestyleFit) },
  { key: "friction", label: "Friction", value: (r) => String(r.friction) },
  {
    key: "exercise",
    label: "Exercise",
    value: (r) =>
      r.dog.exerciseMinutesMin === "unknown"
        ? "Unknown / varies"
        : `${r.dog.exerciseMinutesMin}–${r.dog.exerciseMinutesMax} min`,
  },
  {
    key: "noise",
    label: "Noise",
    value: (r) => traitCell(r.dog, "barkingLevel"),
  },
  {
    key: "grooming",
    label: "Grooming",
    value: (r) => traitCell(r.dog, "groomingLevel"),
  },
  {
    key: "shedding",
    label: "Shedding",
    value: (r) => traitCell(r.dog, "sheddingLevel"),
  },
  {
    key: "training",
    label: "Training patience needed",
    value: (r) => traitCell(r.dog, "trainingPatienceNeeded"),
  },
  {
    key: "mental",
    label: "Mental stimulation",
    value: (r) => traitCell(r.dog, "mentalStimulationNeed"),
  },
  {
    key: "walls",
    label: "Apartment / shared-wall reality",
    value: (r) => {
      const apt = traitCell(r.dog, "apartmentCompatibility");
      const wall = traitCell(r.dog, "sharedWallRisk");
      if (apt === "Unknown" && wall === "Unknown") return "Unknown / varies";
      return `Apt ${apt} · wall risk ${wall}`;
    },
  },
  {
    key: "pets",
    label: "Other pet considerations",
    value: (r) =>
      `Cats ${traitCell(r.dog, "catCompatibilityTendency")} · small-animal caution ${traitCell(r.dog, "smallAnimalCaution")}`,
  },
  {
    key: "novice",
    label: "First-time-owner difficulty",
    value: (r) => {
      const origin = traitOrigin(r.dog, "noviceOwnerSuitability");
      const novice = usableTraitLevel(r.dog, "noviceOwnerSuitability");
      if (origin === "unknown" || novice == null) return "Unknown / varies";
      const label = novice <= 2 ? "Steeper" : novice >= 4 ? "More approachable" : "Moderate";
      return origin === "derived" ? `${label} · derived` : label;
    },
  },
];

function traitCell(
  dog: DogProfile,
  field: Exclude<TraitField, "professionalGroomingLikely">,
): string {
  const origin = traitOrigin(dog, field);
  const value = usableTraitLevel(dog, field);
  if (origin === "unknown" || value == null) return "Unknown";
  if (origin === "derived") return `${value}/5 · derived`;
  return `${value}/5`;
}

export function ComparisonTable({ results }: { results: MatchResult[] }) {
  if (results.length < 2) return null;

  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="min-w-[640px] w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            <th className="sticky left-0 bg-cream py-3 pr-4 text-[11px] font-medium tracking-[0.14em] text-label-muted uppercase">
              Compare
            </th>
            {results.map((result) => (
              <th
                key={result.dog.slug}
                className="px-3 py-3 font-display text-[1.15rem] font-medium text-serif-ink"
              >
                {result.dog.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, index) => (
            <tr key={row.key} className={cn(index % 2 === 0 && "bg-soft-cream/80")}>
              <th className="sticky left-0 bg-cream py-3 pr-4 text-[13px] font-medium text-bark-soft">
                {row.label}
              </th>
              {results.map((result) => (
                <td key={result.dog.slug} className="px-3 py-3 text-[13px] font-light text-body-muted">
                  {row.value(result)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-label-muted">
        Direct ratings come from a structured source. Derived values are conservative
        editorial readings, not official AKC scores. Unknown is not scored as a plus.
      </p>
    </div>
  );
}
