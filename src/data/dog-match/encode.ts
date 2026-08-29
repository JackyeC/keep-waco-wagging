import { LAST_REVIEWED } from "./sources";
import type {
  AkcGroup,
  BreedProfile,
  MixedDogProfile,
  TraitLevel,
} from "./types";

/** Compact 1–5 trait. 0 means unknown and must not score as a positive. */
export type TraitCode = 0 | 1 | 2 | 3 | 4 | 5;

export type CompactDog = {
  slug: string;
  name: string;
  rank: number | null;
  group: AkcGroup;
  newFor2026?: boolean;
  type?: "akc-recognized" | "akc-new-2026" | "common-mix";
  size: [TraitCode | number, number | TraitCode];
  energy: TraitCode;
  ex: [number | 0, number | 0];
  mental: TraitCode;
  bark: TraitCode;
  shed: TraitCode;
  groom: TraitCode;
  /** 0 unknown, 1 unlikely, 2 likely */
  pro: 0 | 1 | 2;
  train: TraitCode;
  patience: TraitCode;
  independence: TraitCode;
  prey: TraitCode;
  dogs: TraitCode;
  cats: TraitCode;
  small: TraitCode;
  apt: TraitCode;
  wall: TraitCode;
  novice: TraitCode;
  alone: TraitCode;
  kids: TraitCode;
  aliases?: string[];
  notes: string;
  likelyInfluences?: string[];
  uncertaintyNote?: string;
};

export function asTrait(value: TraitCode): TraitLevel {
  return value === 0 ? "unknown" : value;
}

export function asSize(value: number): number | "unknown" {
  return value === 0 ? "unknown" : value;
}

export function asMinutes(value: number): number | "unknown" {
  return value === 0 ? "unknown" : value;
}

export function asPro(value: 0 | 1 | 2): boolean | "unknown" {
  if (value === 0) return "unknown";
  return value === 2;
}

export function expandAkc(row: CompactDog): BreedProfile {
  const type = row.newFor2026 ? "akc-new-2026" : "akc-recognized";
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    type,
    akcGroup: row.group,
    popularityRank: row.newFor2026 ? null : row.rank,
    popularityYear: row.newFor2026 ? null : 2025,
    newFor2026: Boolean(row.newFor2026),
    sizeMin: asSize(row.size[0]),
    sizeMax: asSize(row.size[1]),
    energyLevel: asTrait(row.energy),
    exerciseMinutesMin: asMinutes(row.ex[0]),
    exerciseMinutesMax: asMinutes(row.ex[1]),
    mentalStimulationNeed: asTrait(row.mental),
    barkingLevel: asTrait(row.bark),
    sheddingLevel: asTrait(row.shed),
    groomingLevel: asTrait(row.groom),
    professionalGroomingLikely: asPro(row.pro),
    trainability: asTrait(row.train),
    trainingPatienceNeeded: asTrait(row.patience),
    independenceLevel: asTrait(row.independence),
    preyDrive: asTrait(row.prey),
    dogSociability: asTrait(row.dogs),
    catCompatibilityTendency: asTrait(row.cats),
    smallAnimalCaution: asTrait(row.small),
    apartmentCompatibility: asTrait(row.apt),
    sharedWallRisk: asTrait(row.wall),
    noviceOwnerSuitability: asTrait(row.novice),
    aloneTimeTolerance: asTrait(row.alone),
    childCompatibilityGeneral: asTrait(row.kids),
    notes: row.notes,
    aliases: row.aliases ?? [],
    sourceIds: row.newFor2026
      ? ["akc-new-2026", "akc-breed-pages"]
      : ["akc-popular-2025", "akc-breed-pages"],
    lastReviewed: LAST_REVIEWED,
  };
}

export function expandMix(row: CompactDog): MixedDogProfile {
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    type: "common-mix",
    akcGroup: "unknown",
    popularityRank: null,
    popularityYear: null,
    newFor2026: false,
    sizeMin: asSize(row.size[0]),
    sizeMax: asSize(row.size[1]),
    energyLevel: asTrait(row.energy),
    exerciseMinutesMin: asMinutes(row.ex[0]),
    exerciseMinutesMax: asMinutes(row.ex[1]),
    mentalStimulationNeed: asTrait(row.mental),
    barkingLevel: asTrait(row.bark),
    sheddingLevel: asTrait(row.shed),
    groomingLevel: asTrait(row.groom),
    professionalGroomingLikely: asPro(row.pro),
    trainability: asTrait(row.train),
    trainingPatienceNeeded: asTrait(row.patience),
    independenceLevel: asTrait(row.independence),
    preyDrive: asTrait(row.prey),
    dogSociability: asTrait(row.dogs),
    catCompatibilityTendency: asTrait(row.cats),
    smallAnimalCaution: asTrait(row.small),
    apartmentCompatibility: asTrait(row.apt),
    sharedWallRisk: asTrait(row.wall),
    noviceOwnerSuitability: asTrait(row.novice),
    aloneTimeTolerance: asTrait(row.alone),
    childCompatibilityGeneral: asTrait(row.kids),
    notes: row.notes,
    aliases: row.aliases ?? [],
    sourceIds: ["akc-breed-pages"],
    lastReviewed: LAST_REVIEWED,
    likelyInfluences: row.likelyInfluences ?? [],
    uncertaintyNote:
      row.uncertaintyNote ??
      "This is a common mix or type, not an AKC-recognized breed. Size, coat, energy, and behavior can vary widely. Treat every field as a range, not a promise.",
  };
}
