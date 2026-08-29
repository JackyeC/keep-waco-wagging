/**
 * Transparent Dog Match weights.
 * Popularity is intentionally absent.
 * Fit and friction are scored on separate scales.
 */

export const FIT_WEIGHTS = {
  activityEnergy: 22,
  homeLiving: 10,
  noise: 8,
  aloneTime: 10,
  grooming: 8,
  shedding: 6,
  training: 8,
  size: 8,
  desiredLife: 10,
  children: 5,
  pets: 5,
} as const;

export const FRICTION_WEIGHTS = {
  activityMismatch: 16,
  noiseMismatch: 12,
  sharedWalls: 10,
  trainingLoad: 10,
  groomingCost: 12,
  shedding: 6,
  preyPets: 10,
  aloneTime: 12,
  firstTimeOwner: 6,
  mixUncertainty: 8,
} as const;

/** Extra friction added by hard combination rules (clamped later). */
export const HARD_FRICTION = {
  quietPlusVocal: 22,
  sharedWallsPlusAlert: 16,
  lowActivityHighDrive: 24,
  lowPatienceHighTraining: 16,
  noBudgetProGroom: 20,
  preyPlusSmallAnimals: 14,
  longAloneLowTolerance: 18,
  sizeOverHardMax: 28,
} as const;

export const ACTIVITY_SCORE = {
  potty: 1,
  neighborhood: 2,
  hour: 3,
  "long-walks": 4,
  sports: 5,
} as const;

export const NOISE_SCORE = {
  quiet: 1,
  some: 3,
  talker: 4,
  narrator: 5,
} as const;

export const BRUSHING_SCORE = {
  minimal: 1,
  weekly: 2,
  "several-weekly": 3,
  daily: 5,
} as const;

export const SHED_TOLERANCE_SCORE = {
  low: 1,
  some: 3,
  "a-lot": 5,
} as const;

export const PATIENCE_SCORE = {
  low: 1,
  moderate: 3,
  patient: 4,
  "enjoys-opinions": 5,
} as const;

export const SIZE_BANDS = {
  small: { min: 0, max: 25 },
  medium: { min: 20, max: 60 },
  large: { min: 50, max: 90 },
  giant: { min: 80, max: 250 },
} as const;
