"use client";

import type { MatchResult } from "@/data/dog-match/types";
import { traitNumber } from "@/lib/dog-match/traits";
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
    value: (r) => level(traitNumber(r.dog.barkingLevel)),
  },
  {
    key: "grooming",
    label: "Grooming",
    value: (r) => level(traitNumber(r.dog.groomingLevel)),
  },
  {
    key: "shedding",
    label: "Shedding",
    value: (r) => level(traitNumber(r.dog.sheddingLevel)),
  },
  {
    key: "training",
    label: "Training patience needed",
    value: (r) => level(traitNumber(r.dog.trainingPatienceNeeded)),
  },
  {
    key: "mental",
    label: "Mental stimulation",
    value: (r) => level(traitNumber(r.dog.mentalStimulationNeed)),
  },
  {
    key: "walls",
    label: "Apartment / shared-wall reality",
    value: (r) => {
      const apt = traitNumber(r.dog.apartmentCompatibility);
      const wall = traitNumber(r.dog.sharedWallRisk);
      if (apt == null && wall == null) return "Unknown / varies";
      return `Apt ${level(apt)} · wall risk ${level(wall)}`;
    },
  },
  {
    key: "pets",
    label: "Other pet considerations",
    value: (r) =>
      `Cats ${level(traitNumber(r.dog.catCompatibilityTendency))} · small-animal caution ${level(traitNumber(r.dog.smallAnimalCaution))}`,
  },
  {
    key: "novice",
    label: "First-time-owner difficulty",
    value: (r) => {
      const novice = traitNumber(r.dog.noviceOwnerSuitability);
      if (novice == null) return "Unknown / varies";
      return novice <= 2 ? "Steeper" : novice >= 4 ? "More approachable" : "Moderate";
    },
  },
];

function level(value: number | null): string {
  if (value == null) return "Unknown";
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
    </div>
  );
}
