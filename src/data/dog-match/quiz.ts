import type {
  ActivityLevel,
  AgePreference,
  BrushingTolerance,
  ChildrenAges,
  DesiredLife,
  DogExperience,
  ExistingPets,
  GroomingBudget,
  HelpAccess,
  HomeSpace,
  HomeType,
  NoiseTolerance,
  OtherDogSize,
  QuizAnswers,
  SheddingTolerance,
  SizePreference,
  TrainingPatience,
  WorkSchedule,
  YardType,
} from "./types";

export type QuizChoice<T extends string | number | boolean | null> = {
  value: T;
  label: string;
  hint?: string;
};

export type QuizStepId =
  | "homeType"
  | "homeSetup"
  | "noise"
  | "work"
  | "alone"
  | "help"
  | "activity"
  | "grooming"
  | "training"
  | "pets"
  | "children"
  | "size"
  | "age"
  | "desiredLife";

export const QUIZ_STEPS: QuizStepId[] = [
  "homeType",
  "homeSetup",
  "noise",
  "work",
  "alone",
  "help",
  "activity",
  "grooming",
  "training",
  "pets",
  "children",
  "size",
  "age",
  "desiredLife",
];

export const homeTypeChoices: QuizChoice<HomeType>[] = [
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo / townhome" },
  { value: "house", label: "House" },
  { value: "other", label: "Other / it depends" },
];

export const homeSpaceChoices: QuizChoice<HomeSpace>[] = [
  {
    value: "compact",
    label: "Pretty compact",
    hint: "A small footprint is fine. We will not assume that means a small dog.",
  },
  { value: "moderate", label: "Average for the home type" },
  { value: "spacious", label: "Plenty of indoor room to move" },
];

export const sharedWallChoices: QuizChoice<boolean>[] = [
  { value: true, label: "Yes — neighbors share a wall, floor, or ceiling" },
  { value: false, label: "No meaningful shared walls" },
];

export const yardChoices: QuizChoice<YardType>[] = [
  { value: "fenced", label: "Fenced yard" },
  { value: "unfenced", label: "Yard, but not reliably fenced" },
  { value: "none", label: "No yard — walks and outings are the plan" },
];

export const noiseChoices: QuizChoice<NoiseTolerance>[] = [
  {
    value: "quiet",
    label: "Please be quiet.",
    hint: "Alert barking or a neighborhood narrator would wear you down.",
  },
  { value: "some", label: "Some barking is fine." },
  { value: "talker", label: "I can handle a talker." },
  {
    value: "narrator",
    label: "My dog can narrate the neighborhood.",
    hint: "You still need a plan. This is about tolerance, not a wish for chaos.",
  },
];

export const workChoices: QuizChoice<WorkSchedule>[] = [
  { value: "mostly-home", label: "Mostly home" },
  { value: "hybrid", label: "Hybrid — some days out, some home" },
  { value: "away", label: "Away most workdays" },
  { value: "variable", label: "Variable / it changes week to week" },
];

export const aloneHourChoices: QuizChoice<QuizAnswers["aloneHours"]>[] = [
  { value: 0, label: "Rarely alone for long" },
  { value: 2, label: "About 2 hours" },
  { value: 4, label: "About 4 hours" },
  { value: 6, label: "About 6 hours" },
  { value: 8, label: "About 8 hours" },
  { value: 10, label: "10 hours or more, routinely" },
];

export const helpChoices: QuizChoice<HelpAccess>[] = [
  { value: "daycare", label: "Daycare I can actually use" },
  { value: "walker", label: "A dog walker I can budget for" },
  { value: "family", label: "Family or a friend who can help" },
  { value: "none", label: "None of those, most days" },
];

export const activityChoices: QuizChoice<ActivityLevel>[] = [
  {
    value: "potty",
    label: "Short potty walks and hanging out",
    hint: "On an ordinary Tuesday — not a vacation week.",
  },
  { value: "neighborhood", label: "A 30–45 minute neighborhood walk" },
  { value: "hour", label: "About an hour of activity" },
  { value: "long-walks", label: "Long walks or hikes regularly" },
  {
    value: "sports",
    label: "Running, hiking, dog sports, or serious training",
  },
];

export const brushingChoices: QuizChoice<BrushingTolerance>[] = [
  { value: "minimal", label: "Please keep brushing light" },
  { value: "weekly", label: "A weekly brush-out is fine" },
  { value: "several-weekly", label: "A few times a week" },
  { value: "daily", label: "Daily coat care if the dog needs it" },
];

export const sheddingChoices: QuizChoice<SheddingTolerance>[] = [
  { value: "low", label: "I want as little shed as I can get" },
  { value: "some", label: "Some hair in the house is part of the deal" },
  { value: "a-lot", label: "I can live with a serious shedder" },
];

export const budgetChoices: QuizChoice<GroomingBudget>[] = [
  { value: "none", label: "Basically none" },
  { value: "under-50", label: "Under $50 / month" },
  { value: "50-100", label: "$50–100 / month" },
  { value: "100-plus", label: "$100+ / month" },
  { value: "whatever", label: "Whatever the dog needs" },
];

export const experienceChoices: QuizChoice<DogExperience>[] = [
  { value: "first-time", label: "First-time dog owner" },
  { value: "some", label: "Some dog experience" },
  { value: "experienced", label: "Experienced" },
  { value: "enjoys-training", label: "I genuinely enjoy training" },
];

export const patienceChoices: QuizChoice<TrainingPatience>[] = [
  {
    value: "low",
    label: "I want a dog who is pretty easy to live with",
    hint: "You can still learn. You just do not want a steep daily project.",
  },
  { value: "moderate", label: "I will put in the work, with a clear plan" },
  { value: "patient", label: "I have patience for a dog with opinions" },
  {
    value: "enjoys-opinions",
    label: "I like a thinking dog — bring the opinions",
  },
];

export const petChoices: QuizChoice<ExistingPets>[] = [
  { value: "none", label: "No other pets" },
  { value: "dogs", label: "Dog(s) already at home" },
  { value: "cats", label: "Cat(s)" },
  { value: "small-animals", label: "Small animals (rabbits, birds, rodents, etc.)" },
  { value: "multiple", label: "More than one type" },
];

export const otherDogSizeChoices: QuizChoice<OtherDogSize>[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large / giant" },
  { value: "mixed", label: "A mix of sizes" },
  { value: "unsure", label: "Not sure / rather not guess" },
];

export const childrenChoices: QuizChoice<ChildrenAges>[] = [
  { value: "none", label: "No children in the home" },
  { value: "under-5", label: "Under 5" },
  { value: "5-12", label: "Ages 5–12" },
  { value: "teens", label: "Teens" },
];

export const sizeChoices: QuizChoice<SizePreference>[] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "giant", label: "Giant" },
  { value: "no-preference", label: "No preference" },
];

export const hardMaxChoices: QuizChoice<number | null>[] = [
  { value: null, label: "No hard maximum" },
  { value: 20, label: "About 20 lbs" },
  { value: 40, label: "About 40 lbs" },
  { value: 60, label: "About 60 lbs" },
  { value: 80, label: "About 80 lbs" },
  { value: 100, label: "About 100 lbs" },
];

export const ageChoices: QuizChoice<AgePreference>[] = [
  { value: "puppy", label: "Puppy" },
  { value: "adult", label: "Adult" },
  { value: "either", label: "Either" },
];

export const desiredLifeChoices: QuizChoice<DesiredLife>[] = [
  { value: "couch", label: "Couch companion" },
  { value: "walking", label: "Neighborhood walking buddy" },
  { value: "active-family", label: "Active family dog" },
  { value: "adventure", label: "Adventure / hiking dog" },
  { value: "sports", label: "Training or sports partner" },
  { value: "small-companion", label: "Small companion" },
  { value: "unsure", label: "I’m not sure" },
];

export const stepCopy: Record<
  QuizStepId,
  { eyebrow: string; title: string; dek?: string }
> = {
  homeType: {
    eyebrow: "Home",
    title: "What kind of place does a dog walk into with you?",
    dek: "Small home does not automatically mean small dog. We will ask about walls, yard, and noise next.",
  },
  homeSetup: {
    eyebrow: "Home",
    title: "What’s the space actually like?",
  },
  noise: {
    eyebrow: "Noise",
    title: "How much dog commentary can you live with?",
  },
  work: {
    eyebrow: "Schedule",
    title: "What’s a normal work week look like?",
  },
  alone: {
    eyebrow: "Schedule",
    title: "How many hours might the dog routinely be alone?",
    dek: "Be honest about the ordinary week, not the week you work from home in December.",
  },
  help: {
    eyebrow: "Schedule",
    title: "Do you realistically have backup during the workday?",
  },
  activity: {
    eyebrow: "Activity",
    title: "On an ordinary Tuesday, what are you really willing to do?",
    dek: "Aspirational hiking energy does not count. Tuesday counts.",
  },
  grooming: {
    eyebrow: "Grooming",
    title: "Coat care: what can you actually keep up with?",
  },
  training: {
    eyebrow: "Training",
    title: "What’s your dog experience — and your patience for opinions?",
  },
  pets: {
    eyebrow: "Household",
    title: "Who else already lives there?",
    dek: "Breed tendencies are not a guarantee of getting along. Introductions and the individual dog still matter.",
  },
  children: {
    eyebrow: "Household",
    title: "Are there children in the home?",
  },
  size: {
    eyebrow: "Preferences",
    title: "Any size preference — or a hard maximum?",
  },
  age: {
    eyebrow: "Age",
    title: "Puppy, adult, or either?",
    dek: "Age changes the first 90 days more than it changes the breed list.",
  },
  desiredLife: {
    eyebrow: "Desired life",
    title: "Which sounds most like what you want?",
  },
};

export function emptyAnswers(): Partial<QuizAnswers> {
  return {};
}

export function isQuizComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return (
    answers.homeType !== undefined &&
    answers.homeSpace !== undefined &&
    answers.sharedWalls !== undefined &&
    answers.yard !== undefined &&
    answers.noiseTolerance !== undefined &&
    answers.workSchedule !== undefined &&
    answers.aloneHours !== undefined &&
    answers.help !== undefined &&
    answers.activity !== undefined &&
    answers.brushingTolerance !== undefined &&
    answers.sheddingTolerance !== undefined &&
    answers.groomingBudget !== undefined &&
    answers.experience !== undefined &&
    answers.trainingPatience !== undefined &&
    answers.existingPets !== undefined &&
    answers.children !== undefined &&
    answers.sizePreference !== undefined &&
    answers.hardMaxLbs !== undefined &&
    answers.agePreference !== undefined &&
    answers.desiredLife !== undefined
  );
}
