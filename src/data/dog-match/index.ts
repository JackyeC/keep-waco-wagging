import { akcTop100 } from "./akc-top-100";
import { commonMixes } from "./mixes";
import { newFor2026Breeds } from "./new-2026";
import type { DogProfile } from "./types";

export const akcRecognizedBreeds = [...akcTop100, ...newFor2026Breeds];

export const allDogProfiles: DogProfile[] = [
  ...akcTop100,
  ...newFor2026Breeds,
  ...commonMixes,
];

export function getDogBySlug(slug: string): DogProfile | undefined {
  return allDogProfiles.find((dog) => dog.slug === slug);
}

export function isMix(dog: DogProfile): dog is import("./types").MixedDogProfile {
  return dog.type === "common-mix";
}

export type { AkcGroup, BreedProfile, DogProfile, MixedDogProfile, QuizAnswers, MatchResult, RankedMatches, SearchHit, SourceMetadata, FrictionFlag, ScoringFactor, TraitOrigin, TraitField } from "./types";
export { akcTop100, commonMixes, newFor2026Breeds };
export {
  PIT_BULL_NOTICE,
  PIT_BULL_SLUGS,
  DOODLE_SLUGS,
  SEARCH_ALIASES,
  normalizeSearch,
} from "./aliases";
export { dogMatchSources, LAST_REVIEWED, akcBreedPageUrl } from "./sources";
export {
  POODLE_VARIETY_SLUGS,
  POODLE_MATCH_NOTE_TEXT,
  poodleVarieties,
} from "./poodle-varieties";
export {
  TRAIT_FIELD_ORIGIN,
  traitOrigin,
  usableTraitLevel,
} from "./trait-origins";
