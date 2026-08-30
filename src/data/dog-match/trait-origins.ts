import type { DogProfile, TraitField, TraitLevel, TraitOrigin } from "./types";

/**
 * Field-level provenance. This is not a claim that every 1–5 is an official
 * AKC rating. Direct = a structured rating the source actually publishes.
 * Derived = conservative editorial reading of breed descriptions/history.
 * Unknown = not strong enough to score as a positive.
 */
export const TRAIT_FIELD_ORIGIN: Record<TraitField, "direct" | "derived"> = {
  energyLevel: "direct",
  mentalStimulationNeed: "direct",
  barkingLevel: "direct",
  sheddingLevel: "direct",
  groomingLevel: "direct",
  professionalGroomingLikely: "derived",
  trainability: "direct",
  trainingPatienceNeeded: "derived",
  independenceLevel: "derived",
  preyDrive: "derived",
  dogSociability: "direct",
  catCompatibilityTendency: "derived",
  smallAnimalCaution: "derived",
  apartmentCompatibility: "derived",
  sharedWallRisk: "derived",
  noviceOwnerSuitability: "derived",
  aloneTimeTolerance: "derived",
  childCompatibilityGeneral: "direct",
};

export function isUnknownValue(value: TraitLevel | boolean | "unknown"): boolean {
  return value === "unknown";
}

export function traitOrigin(dog: DogProfile, field: TraitField): TraitOrigin {
  if (dog.type === "common-mix") return "unknown";
  const value = dog[field];
  if (value === "unknown") return "unknown";
  return TRAIT_FIELD_ORIGIN[field];
}

export function usableTraitLevel(
  dog: DogProfile,
  field: Exclude<TraitField, "professionalGroomingLikely">,
): number | null {
  if (traitOrigin(dog, field) === "unknown") return null;
  const value = dog[field];
  if (value === "unknown") return null;
  return value;
}
