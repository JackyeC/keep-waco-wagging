/**
 * Dog Match data shapes.
 * Keep breed profiles, quiz answers, and scoring outputs separate from UI.
 */

export type TraitLevel = 1 | 2 | 3 | 4 | 5 | "unknown";

export type AkcGroup =
  | "Sporting"
  | "Hound"
  | "Working"
  | "Terrier"
  | "Toy"
  | "Non-Sporting"
  | "Herding"
  | "Miscellaneous Class"
  | "unknown";

export type DogProfileType = "akc-recognized" | "akc-new-2026" | "common-mix";

export type SourceMetadata = {
  id: string;
  label: string;
  url: string;
  notes?: string;
};

export type BreedProfile = {
  id: string;
  slug: string;
  name: string;
  type: "akc-recognized" | "akc-new-2026";
  akcGroup: AkcGroup;
  popularityRank: number | null;
  popularityYear: 2025 | null;
  newFor2026: boolean;
  sizeMin: number | "unknown";
  sizeMax: number | "unknown";
  energyLevel: TraitLevel;
  exerciseMinutesMin: number | "unknown";
  exerciseMinutesMax: number | "unknown";
  mentalStimulationNeed: TraitLevel;
  barkingLevel: TraitLevel;
  sheddingLevel: TraitLevel;
  groomingLevel: TraitLevel;
  professionalGroomingLikely: boolean | "unknown";
  trainability: TraitLevel;
  trainingPatienceNeeded: TraitLevel;
  independenceLevel: TraitLevel;
  preyDrive: TraitLevel;
  dogSociability: TraitLevel;
  catCompatibilityTendency: TraitLevel;
  smallAnimalCaution: TraitLevel;
  apartmentCompatibility: TraitLevel;
  sharedWallRisk: TraitLevel;
  noviceOwnerSuitability: TraitLevel;
  aloneTimeTolerance: TraitLevel;
  childCompatibilityGeneral: TraitLevel;
  notes: string;
  aliases: string[];
  sourceIds: string[];
  lastReviewed: string;
};

export type MixedDogProfile = {
  id: string;
  slug: string;
  name: string;
  type: "common-mix";
  akcGroup: "unknown";
  popularityRank: null;
  popularityYear: null;
  newFor2026: false;
  sizeMin: number | "unknown";
  sizeMax: number | "unknown";
  energyLevel: TraitLevel;
  exerciseMinutesMin: number | "unknown";
  exerciseMinutesMax: number | "unknown";
  mentalStimulationNeed: TraitLevel;
  barkingLevel: TraitLevel;
  sheddingLevel: TraitLevel;
  groomingLevel: TraitLevel;
  professionalGroomingLikely: boolean | "unknown";
  trainability: TraitLevel;
  trainingPatienceNeeded: TraitLevel;
  independenceLevel: TraitLevel;
  preyDrive: TraitLevel;
  dogSociability: TraitLevel;
  catCompatibilityTendency: TraitLevel;
  smallAnimalCaution: TraitLevel;
  apartmentCompatibility: TraitLevel;
  sharedWallRisk: TraitLevel;
  noviceOwnerSuitability: TraitLevel;
  aloneTimeTolerance: TraitLevel;
  childCompatibilityGeneral: TraitLevel;
  notes: string;
  aliases: string[];
  sourceIds: string[];
  lastReviewed: string;
  likelyInfluences: string[];
  uncertaintyNote: string;
};

export type DogProfile = BreedProfile | MixedDogProfile;

export type HomeType = "apartment" | "condo" | "house" | "other";
export type HomeSpace = "compact" | "moderate" | "spacious";
export type YardType = "fenced" | "unfenced" | "none";
export type NoiseTolerance = "quiet" | "some" | "talker" | "narrator";
export type WorkSchedule = "mostly-home" | "hybrid" | "away" | "variable";
export type HelpAccess = "daycare" | "walker" | "family" | "none";
export type ActivityLevel =
  | "potty"
  | "neighborhood"
  | "hour"
  | "long-walks"
  | "sports";
export type BrushingTolerance = "minimal" | "weekly" | "several-weekly" | "daily";
export type SheddingTolerance = "low" | "some" | "a-lot";
export type GroomingBudget =
  | "none"
  | "under-50"
  | "50-100"
  | "100-plus"
  | "whatever";
export type DogExperience =
  | "first-time"
  | "some"
  | "experienced"
  | "enjoys-training";
export type TrainingPatience = "low" | "moderate" | "patient" | "enjoys-opinions";
export type ExistingPets = "none" | "dogs" | "cats" | "small-animals" | "multiple";
export type OtherDogSize = "small" | "medium" | "large" | "mixed" | "unsure";
export type ChildrenAges = "none" | "under-5" | "5-12" | "teens";
export type SizePreference = "small" | "medium" | "large" | "giant" | "no-preference";
export type AgePreference = "puppy" | "adult" | "either";
export type DesiredLife =
  | "couch"
  | "walking"
  | "active-family"
  | "adventure"
  | "sports"
  | "small-companion"
  | "unsure";

export type QuizAnswers = {
  homeType: HomeType;
  homeSpace: HomeSpace;
  sharedWalls: boolean;
  yard: YardType;
  noiseTolerance: NoiseTolerance;
  workSchedule: WorkSchedule;
  aloneHours: 0 | 2 | 4 | 6 | 8 | 10;
  help: HelpAccess;
  activity: ActivityLevel;
  brushingTolerance: BrushingTolerance;
  sheddingTolerance: SheddingTolerance;
  groomingBudget: GroomingBudget;
  experience: DogExperience;
  trainingPatience: TrainingPatience;
  existingPets: ExistingPets;
  otherDogSize?: OtherDogSize;
  children: ChildrenAges;
  sizePreference: SizePreference;
  hardMaxLbs: number | null;
  agePreference: AgePreference;
  desiredLife: DesiredLife;
};

export type ScoringFactor = {
  id: string;
  label: string;
  /** Relative weight inside Lifestyle Fit or Friction. Never uses popularity. */
  weight: number;
  scored: boolean;
  contribution: number;
  detail: string;
};

export type FrictionFlag = {
  id: string;
  severity: "caution" | "high";
  title: string;
  body: string;
};

export type TuesdayBlock = {
  time: string;
  title: string;
  detail: string;
};

export type TuesdayRecurring = {
  cadence: string;
  detail: string;
};

export type TuesdayPlan = {
  blocks: TuesdayBlock[];
  recurring: TuesdayRecurring[];
  caveat: string;
};

export type First90Section = {
  id: "days-1-7" | "weeks-2-4" | "month-2" | "month-3";
  title: string;
  items: string[];
};

export type MatchResult = {
  dog: DogProfile;
  lifestyleFit: number;
  friction: number;
  fitFactors: ScoringFactor[];
  frictionFactors: ScoringFactor[];
  flags: FrictionFlag[];
  whyItCouldWork: string[];
  frictionPoints: string[];
  exerciseReality: string;
  groomingReality: string;
  trainingReality: string;
  behaviorTendencies: string[];
  livingSpace: string;
  existingPetNotes: string;
  skipIf: string[];
  tuesday: TuesdayPlan;
  first90: First90Section[];
};

export type RankedMatches = {
  top: MatchResult[];
  loveBut: MatchResult[];
  all: MatchResult[];
};

export type SearchHitKind = "breed" | "mix" | "pit-bull-umbrella" | "alias-group";

export type SearchHit = {
  kind: SearchHitKind;
  query: string;
  dogs: DogProfile[];
  notice?: string;
};
