import type {
  DogProfile,
  FrictionFlag,
  MatchResult,
  QuizAnswers,
  RankedMatches,
  ScoringFactor,
} from "@/data/dog-match/types";
import { isMix } from "@/data/dog-match";
import { buildFirst90 } from "./first90";
import { traitNumber } from "./traits";
import { buildTuesday } from "./tuesday";
import {
  ACTIVITY_SCORE,
  BRUSHING_SCORE,
  FIT_WEIGHTS,
  FRICTION_WEIGHTS,
  HARD_FRICTION,
  NOISE_SCORE,
  PATIENCE_SCORE,
  SHED_TOLERANCE_SCORE,
  SIZE_BANDS,
} from "./weights";

export { traitNumber } from "./traits";

function clamp(value: number, min = 0, max = 100): number {
  return Math.round(Math.min(max, Math.max(min, value)));
}

function closeness(user: number, dog: number, spread = 4): number {
  return Math.max(0, 1 - Math.abs(user - dog) / spread);
}

function typicalSize(dog: DogProfile): number | null {
  if (dog.sizeMin === "unknown" || dog.sizeMax === "unknown") return null;
  return (dog.sizeMin + dog.sizeMax) / 2;
}

function sizeFitsBand(
  dog: DogProfile,
  pref: QuizAnswers["sizePreference"],
): number | null {
  if (pref === "no-preference") return null;
  if (dog.sizeMin === "unknown" || dog.sizeMax === "unknown") return null;
  const band = SIZE_BANDS[pref];
  const overlap =
    Math.min(dog.sizeMax, band.max) - Math.max(dog.sizeMin, band.min);
  if (overlap >= 0) return 1;
  const mid = (dog.sizeMin + dog.sizeMax) / 2;
  const bandMid = (band.min + band.max) / 2;
  return closeness(bandMid, mid, 70);
}

function overHardMax(dog: DogProfile, hardMax: number | null): boolean {
  if (hardMax == null || dog.sizeMin === "unknown") return false;
  return dog.sizeMin > hardMax;
}

function hasCats(answers: QuizAnswers): boolean {
  return answers.existingPets === "cats" || answers.existingPets === "multiple";
}

function hasSmallAnimals(answers: QuizAnswers): boolean {
  return (
    answers.existingPets === "small-animals" ||
    answers.existingPets === "multiple"
  );
}

function hasDogs(answers: QuizAnswers): boolean {
  return answers.existingPets === "dogs" || answers.existingPets === "multiple";
}

function aloneSupport(answers: QuizAnswers): number {
  if (answers.help === "daycare") return 3;
  if (answers.help === "walker" || answers.help === "family") return 2;
  if (answers.workSchedule === "mostly-home") return 2;
  if (answers.workSchedule === "hybrid") return 1;
  return 0;
}

function factor(
  id: string,
  label: string,
  weight: number,
  scored: boolean,
  contribution: number,
  detail: string,
): ScoringFactor {
  return { id, label, weight, scored, contribution, detail };
}

export function scoreDog(dog: DogProfile, answers: QuizAnswers): MatchResult {
  const fitFactors: ScoringFactor[] = [];
  const frictionFactors: ScoringFactor[] = [];
  const flags: FrictionFlag[] = [];
  const why: string[] = [];
  const frictionPoints: string[] = [];
  const skipIf: string[] = [];
  const behavior: string[] = [];

  const energy = traitNumber(dog.energyLevel);
  const bark = traitNumber(dog.barkingLevel);
  const shed = traitNumber(dog.sheddingLevel);
  const groom = traitNumber(dog.groomingLevel);
  const train = traitNumber(dog.trainability);
  const patienceNeed = traitNumber(dog.trainingPatienceNeeded);
  const prey = traitNumber(dog.preyDrive);
  const apt = traitNumber(dog.apartmentCompatibility);
  const wall = traitNumber(dog.sharedWallRisk);
  const novice = traitNumber(dog.noviceOwnerSuitability);
  const alone = traitNumber(dog.aloneTimeTolerance);
  const kids = traitNumber(dog.childCompatibilityGeneral);
  const cats = traitNumber(dog.catCompatibilityTendency);
  const smallCaution = traitNumber(dog.smallAnimalCaution);
  const dogs = traitNumber(dog.dogSociability);
  const mental = traitNumber(dog.mentalStimulationNeed);
  const activity = ACTIVITY_SCORE[answers.activity];
  const noiseTol = NOISE_SCORE[answers.noiseTolerance];
  const mix = isMix(dog);

  // --- Lifestyle Fit ---
  if (energy == null) {
    fitFactors.push(
      factor(
        "activityEnergy",
        "Activity & energy",
        FIT_WEIGHTS.activityEnergy,
        false,
        0,
        "Energy need is unknown, so it is not counted as a positive match.",
      ),
    );
  } else {
    const score = closeness(activity, energy);
    fitFactors.push(
      factor(
        "activityEnergy",
        "Activity & energy",
        FIT_WEIGHTS.activityEnergy,
        true,
        score,
        `Your ordinary Tuesday is a ${activity}/5 activity home; this dog’s typical energy is ${energy}/5.`,
      ),
    );
    if (score >= 0.7) {
      why.push("Your real activity level is in the same neighborhood as this dog’s typical motor.");
    }
  }

  if (apt == null) {
    fitFactors.push(
      factor("homeLiving", "Home & living space", FIT_WEIGHTS.homeLiving, false, 0, "Apartment/home compatibility is unknown, so it is not counted as a plus."),
    );
  } else {
    const compactHome =
      answers.homeType === "apartment" ||
      answers.homeType === "condo" ||
      answers.homeSpace === "compact";
    let score = 0.7;
    if (compactHome) score = apt / 5;
    else if (answers.homeType === "house" && answers.yard === "fenced") score = Math.min(1, 0.55 + (6 - apt) * 0.08);
    else score = 0.5 + (apt / 5) * 0.4;
    fitFactors.push(
      factor("homeLiving", "Home & living space", FIT_WEIGHTS.homeLiving, true, score, compactHome
        ? `Smaller or shared-wall homes tend to work better when apartment compatibility is higher (this dog: ${apt}/5). Size is scored separately — compact home ≠ small dog.`
        : `A house does not automatically make a high-drive dog easy. Compatibility here is ${apt}/5.`),
    );
    if (compactHome && apt >= 4) why.push("Typical apartment/condo compatibility is on the friendlier side for this type.");
  }

  if (bark == null) {
    fitFactors.push(factor("noise", "Noise", FIT_WEIGHTS.noise, false, 0, "Vocality is unknown, so it is not counted as a quiet-household win."));
  } else {
    const score = bark <= noiseTol ? 1 : closeness(noiseTol, bark, 4);
    fitFactors.push(
      factor("noise", "Noise", FIT_WEIGHTS.noise, true, score, `Your noise tolerance is ${noiseTol}/5; typical barking tendency is ${bark}/5.`),
    );
    if (bark <= noiseTol) why.push("Typical vocality is within what you said you can live with.");
  }

  if (alone == null) {
    fitFactors.push(factor("aloneTime", "Time home alone", FIT_WEIGHTS.aloneTime, false, 0, "Alone-time tendency is unknown, so it is not counted as a positive."));
  } else {
    const hours = answers.aloneHours;
    const supported = aloneSupport(answers);
    const effectiveHours = Math.max(0, hours - supported);
    const match =
      effectiveHours <= 2
        ? alone >= 3
          ? 1
          : alone / 5
        : closeness(6 - Math.min(5, effectiveHours / 2), alone);
    fitFactors.push(
      factor("aloneTime", "Time home alone", FIT_WEIGHTS.aloneTime, true, match, `Routine alone time is about ${hours} hours. Backup: ${answers.help}. Typical alone-time tolerance is ${alone}/5 — not a diagnosis, just a tendency.`),
    );
  }

  if (groom == null && dog.professionalGroomingLikely === "unknown") {
    fitFactors.push(factor("grooming", "Grooming", FIT_WEIGHTS.grooming, false, 0, "Grooming need is unknown, so it is not counted as low-maintenance."));
  } else {
    const userGroom = BRUSHING_SCORE[answers.brushingTolerance];
    const dogGroom = groom ?? (dog.professionalGroomingLikely === true ? 4 : 2);
    const budgetOk =
      answers.groomingBudget === "whatever" ||
      answers.groomingBudget === "100-plus" ||
      (answers.groomingBudget === "50-100" && dog.professionalGroomingLikely !== true) ||
      (answers.groomingBudget !== "none" && dog.professionalGroomingLikely !== true);
    const score = Math.min(
      closeness(userGroom, Math.min(5, dogGroom), 4),
      budgetOk ? 1 : 0.25,
    );
    fitFactors.push(
      factor("grooming", "Grooming", FIT_WEIGHTS.grooming, true, score, "Scored only from known coat-care tendency and the budget you named."),
    );
    if (groom != null && groom <= 2 && dog.professionalGroomingLikely !== true) {
      why.push("Typical coat care is on the lighter side compared with high-maintenance breeds.");
    }
  }

  if (shed == null) {
    fitFactors.push(factor("shedding", "Shedding", FIT_WEIGHTS.shedding, false, 0, "Shedding is unknown, so it is not counted as a low-shed win."));
  } else {
    const tol = SHED_TOLERANCE_SCORE[answers.sheddingTolerance];
    const score = shed <= tol ? 1 : closeness(tol, shed, 4);
    fitFactors.push(factor("shedding", "Shedding", FIT_WEIGHTS.shedding, true, score, `Shedding tendency ${shed}/5 vs your tolerance ${tol}/5.`));
    if (shed <= 2 && answers.sheddingTolerance === "low") why.push("Typical shedding is on the lighter side of this set.");
  }

  if (patienceNeed == null && novice == null) {
    fitFactors.push(factor("training", "Training", FIT_WEIGHTS.training, false, 0, "Training difficulty is unknown, so it is not counted as beginner-friendly."));
  } else {
    const userP = PATIENCE_SCORE[answers.trainingPatience];
    const need = patienceNeed ?? (novice != null ? 6 - novice : 3);
    const expBoost =
      answers.experience === "enjoys-training" ? 1.5 :
      answers.experience === "experienced" ? 1 :
      answers.experience === "some" ? 0 : -1;
    const score = closeness(userP + expBoost, need, 4);
    fitFactors.push(
      factor("training", "Training", FIT_WEIGHTS.training, true, score, "Scored from known trainability / patience-needed ratings, not from popularity."),
    );
    if (train != null && train >= 4 && answers.experience !== "first-time") {
      why.push("This type is often more responsive to reward-based training than a highly independent breed.");
    }
  }

  const sizeScore = sizeFitsBand(dog, answers.sizePreference);
  if (answers.sizePreference === "no-preference" && answers.hardMaxLbs == null) {
    fitFactors.push(factor("size", "Size", FIT_WEIGHTS.size, false, 0, "No size preference, so size is not used as a bonus."));
  } else if (overHardMax(dog, answers.hardMaxLbs)) {
    fitFactors.push(factor("size", "Size", FIT_WEIGHTS.size, true, 0, "Typical adult weight starts above your hard maximum."));
  } else if (sizeScore == null) {
    fitFactors.push(factor("size", "Size", FIT_WEIGHTS.size, false, 0, "Size is unknown or you have no preference, so it is not a plus."));
  } else {
    fitFactors.push(factor("size", "Size", FIT_WEIGHTS.size, true, sizeScore, "Compared with your size band using typical adult weight range, not popularity."));
    if (sizeScore >= 0.8) why.push("Typical adult size is in the range you said you want.");
  }

  const life = answers.desiredLife;
  if (life === "unsure") {
    fitFactors.push(factor("desiredLife", "Desired life", FIT_WEIGHTS.desiredLife, false, 0, "You were not sure, so this does not boost any dog."));
  } else if (energy == null && typicalSize(dog) == null) {
    fitFactors.push(factor("desiredLife", "Desired life", FIT_WEIGHTS.desiredLife, false, 0, "Not enough known traits to score desired lifestyle as a plus."));
  } else {
    let score = 0.5;
    if (life === "couch") score = energy == null ? 0.4 : closeness(1.5, energy, 4);
    if (life === "walking") score = energy == null ? 0.5 : closeness(3, energy, 3);
    if (life === "active-family") score = energy == null ? 0.5 : closeness(4, energy, 3);
    if (life === "adventure") score = energy == null ? 0.4 : closeness(5, energy, 3);
    if (life === "sports") {
      const e = energy ?? 3;
      const m = mental ?? 3;
      const t = train ?? 3;
      score = (closeness(5, e, 3) + closeness(5, m, 4) + closeness(5, t, 4)) / 3;
    }
    if (life === "small-companion") {
      const size = typicalSize(dog);
      score = size == null ? 0.4 : size <= 25 ? 0.95 : size <= 40 ? 0.5 : 0.15;
    }
    fitFactors.push(factor("desiredLife", "Desired life", FIT_WEIGHTS.desiredLife, true, score, "Matched to the life you picked, using known energy/size/training traits only."));
    if (score >= 0.75) why.push("The life you said you want lines up with this dog’s typical job.");
  }

  if (answers.children === "none" || kids == null) {
    fitFactors.push(factor("children", "Children", FIT_WEIGHTS.children, false, 0, answers.children === "none"
      ? "No children in the home, so this is not used as a bonus."
      : "Child-related tendency is unknown, so it is not counted as a plus."));
  } else {
    const need = answers.children === "under-5" ? 4 : answers.children === "5-12" ? 3 : 2;
    const score = kids >= need ? 1 : kids / 5;
    fitFactors.push(factor("children", "Children", FIT_WEIGHTS.children, true, score, "A general tendency, not a guarantee that an individual dog will be good with children."));
    if (kids >= 4) why.push("This type is often described as more family-oriented — still meet the individual dog.");
  }

  if (answers.existingPets === "none") {
    fitFactors.push(factor("pets", "Other pets", FIT_WEIGHTS.pets, false, 0, "No other pets, so this is not a bonus."));
  } else {
    const pieces: number[] = [];
    if (hasDogs(answers) && dogs != null) pieces.push(dogs / 5);
    if (hasCats(answers) && cats != null) pieces.push(cats / 5);
    if (hasSmallAnimals(answers) && smallCaution != null) pieces.push((6 - smallCaution) / 5);
    if (pieces.length === 0) {
      fitFactors.push(factor("pets", "Other pets", FIT_WEIGHTS.pets, false, 0, "Other-pet tendencies are unknown, so they are not counted as a plus."));
    } else {
      const score = pieces.reduce((a, b) => a + b, 0) / pieces.length;
      fitFactors.push(factor("pets", "Other pets", FIT_WEIGHTS.pets, true, score, "Tendency only. Introductions, history, and management still decide the household."));
    }
  }

  const scoredFit = fitFactors.filter((f) => f.scored);
  const fitWeightSum = scoredFit.reduce((sum, f) => sum + f.weight, 0);
  const fitRaw =
    fitWeightSum === 0
      ? 40
      : (scoredFit.reduce((sum, f) => sum + f.weight * f.contribution, 0) / fitWeightSum) * 100;
  let lifestyleFit = clamp(fitRaw);

  // --- Friction (separate scale) ---
  let frictionRaw = 12; // baseline: living with any dog takes work

  if (energy != null && activity + 1 < energy) {
    const gap = energy - activity;
    const amount = (gap / 4) * FRICTION_WEIGHTS.activityMismatch;
    frictionRaw += amount;
    frictionFactors.push(factor("activityMismatch", "Activity mismatch", FRICTION_WEIGHTS.activityMismatch, true, amount, "A higher-drive dog in a lower-activity home is extra management, even if you like the breed."));
    frictionPoints.push("Typical energy is higher than the Tuesday you described. That usually shows up as restlessness, not ‘cuteness.’");
  }

  if (bark != null && bark > noiseTol) {
    const amount = ((bark - noiseTol) / 4) * FRICTION_WEIGHTS.noiseMismatch;
    frictionRaw += amount;
    frictionFactors.push(factor("noiseMismatch", "Noise mismatch", FRICTION_WEIGHTS.noiseMismatch, true, amount, "Typical vocality is above your stated tolerance."));
    frictionPoints.push("This type is often more vocal than the household you described.");
  }

  if (answers.sharedWalls && wall != null) {
    const amount = (wall / 5) * FRICTION_WEIGHTS.sharedWalls;
    frictionRaw += amount;
    frictionFactors.push(factor("sharedWalls", "Shared walls", FRICTION_WEIGHTS.sharedWalls, true, amount, "Shared walls raise the cost of alert barking even when the dog is otherwise a good fit."));
    if (wall >= 4) frictionPoints.push("Shared walls plus a stronger alert-barking tendency is a neighbor-level problem, not a personality quirk.");
  }

  if (patienceNeed != null && PATIENCE_SCORE[answers.trainingPatience] + 1 < patienceNeed) {
    const amount = ((patienceNeed - PATIENCE_SCORE[answers.trainingPatience]) / 4) * FRICTION_WEIGHTS.trainingLoad;
    frictionRaw += amount;
    frictionFactors.push(factor("trainingLoad", "Training load", FRICTION_WEIGHTS.trainingLoad, true, amount, "This type often needs more training patience than you said you have."));
    frictionPoints.push("You may like the dog and still feel outworked by the daily training.");
  }

  if (dog.professionalGroomingLikely === true && (answers.groomingBudget === "none" || answers.groomingBudget === "under-50")) {
    frictionRaw += FRICTION_WEIGHTS.groomingCost;
    frictionFactors.push(factor("groomingCost", "Grooming cost", FRICTION_WEIGHTS.groomingCost, true, FRICTION_WEIGHTS.groomingCost, "Professional grooming is likely and your budget is tight."));
    frictionPoints.push("Coat care is likely to cost more time or money than you budgeted.");
  } else if (groom != null && groom >= 4 && answers.brushingTolerance === "minimal") {
    frictionRaw += FRICTION_WEIGHTS.groomingCost * 0.7;
    frictionFactors.push(factor("groomingCost", "Grooming cost", FRICTION_WEIGHTS.groomingCost, true, FRICTION_WEIGHTS.groomingCost * 0.7, "Coat work is typically high and you asked for light brushing."));
    frictionPoints.push("Skipping coat care will not make this a wash-and-wear dog.");
  }

  if (shed != null && shed > SHED_TOLERANCE_SCORE[answers.sheddingTolerance]) {
    const amount = ((shed - SHED_TOLERANCE_SCORE[answers.sheddingTolerance]) / 4) * FRICTION_WEIGHTS.shedding;
    frictionRaw += amount;
    frictionFactors.push(factor("shedding", "Shedding", FRICTION_WEIGHTS.shedding, true, amount, "Typical shedding is above your comfort."));
    frictionPoints.push("Hair in the house is a likely weekly reality.");
  }

  if ((hasCats(answers) || hasSmallAnimals(answers)) && prey != null && prey >= 4) {
    frictionRaw += FRICTION_WEIGHTS.preyPets;
    frictionFactors.push(factor("preyPets", "Chase tendency & other pets", FRICTION_WEIGHTS.preyPets, true, FRICTION_WEIGHTS.preyPets, "Stronger chase tendency with cats or small animals in the home."));
  }

  if (alone != null && answers.aloneHours >= 8 && alone <= 2 && answers.help === "none") {
    frictionRaw += FRICTION_WEIGHTS.aloneTime;
    frictionFactors.push(factor("aloneTime", "Long hours alone", FRICTION_WEIGHTS.aloneTime, true, FRICTION_WEIGHTS.aloneTime, "Long routine alone time with a type that typically prefers more company. This is not a separation-anxiety diagnosis."));
    frictionPoints.push("Long empty weekdays may be a lot of dog for this type unless you add a real midday plan.");
  } else if (alone != null && answers.aloneHours >= 6 && alone <= 2) {
    frictionRaw += FRICTION_WEIGHTS.aloneTime * 0.55;
    frictionFactors.push(factor("aloneTime", "Time alone", FRICTION_WEIGHTS.aloneTime, true, FRICTION_WEIGHTS.aloneTime * 0.55, "Hours alone are on the high side for a type that typically wants more company."));
  }

  if (answers.experience === "first-time" && novice != null && novice <= 2) {
    frictionRaw += FRICTION_WEIGHTS.firstTimeOwner;
    frictionFactors.push(factor("firstTimeOwner", "First-time owner difficulty", FRICTION_WEIGHTS.firstTimeOwner, true, FRICTION_WEIGHTS.firstTimeOwner, "Often a steeper first dog."));
    frictionPoints.push("This is often a steep first dog.");
  }

  if (mix) {
    frictionRaw += FRICTION_WEIGHTS.mixUncertainty;
    frictionFactors.push(factor("mixUncertainty", "Mix uncertainty", FRICTION_WEIGHTS.mixUncertainty, true, FRICTION_WEIGHTS.mixUncertainty, "Mixes vary more. Unknown traits are not treated as easy."));
    frictionPoints.push(dog.uncertaintyNote);
    if (answers.groomingBudget === "none" || answers.groomingBudget === "under-50") {
      frictionPoints.push("Coat lottery is real in mixes — budget for the higher-maintenance coat, not the brochure.");
    }
  }

  // Hard combination rules
  if (answers.noiseTolerance === "quiet" && bark != null && bark >= 4) {
    frictionRaw += HARD_FRICTION.quietPlusVocal;
    flags.push({
      id: "quiet-vocal",
      severity: "high",
      title: "Noise friction is high",
      body: "You asked for quiet, and this type is often more vocal. That can work in a detached house with a plan. It is a hard Tuesday in an apartment.",
    });
  }

  if (answers.sharedWalls && ((bark != null && bark >= 4) || (wall != null && wall >= 4))) {
    frictionRaw += HARD_FRICTION.sharedWallsPlusAlert;
    flags.push({
      id: "shared-walls",
      severity: "high",
      title: "Shared walls raise the stakes",
      body: "Alert barking travels through floors and walls. This is a neighbor relationship, not just a dog preference.",
    });
  }

  if (answers.activity === "potty" && energy != null && energy >= 4) {
    frictionRaw += HARD_FRICTION.lowActivityHighDrive;
    flags.push({
      id: "low-activity-drive",
      severity: "high",
      title: "The motor is bigger than the Tuesday",
      body: "Short potty walks plus a high-drive dog is a common way people end up frustrated with a dog they still love.",
    });
    skipIf.push("You only want short potty walks and hanging out. This type typically needs a real job.");
  }

  if (answers.trainingPatience === "low" && patienceNeed != null && patienceNeed >= 4) {
    frictionRaw += HARD_FRICTION.lowPatienceHighTraining;
    flags.push({
      id: "training-patience",
      severity: "high",
      title: "Opinions included",
      body: "This type often needs more training patience than you said you have. Love will not replace the daily reps.",
    });
  }

  if (answers.groomingBudget === "none" && dog.professionalGroomingLikely === true) {
    frictionRaw += HARD_FRICTION.noBudgetProGroom;
    flags.push({
      id: "grooming-budget",
      severity: "high",
      title: "Coat care has a bill",
      body: "Professional grooming is likely for this coat. A near-zero grooming budget is a mismatch, not a DIY personality.",
    });
    skipIf.push("You cannot budget for professional grooming and this coat typically needs it.");
  }

  if (hasSmallAnimals(answers) && prey != null && prey >= 4) {
    frictionRaw += HARD_FRICTION.preyPlusSmallAnimals;
    flags.push({
      id: "prey-small-animals",
      severity: "caution",
      title: "Chase tendency around small animals",
      body: "This breed may have a stronger chase tendency, so the individual dog, history, introductions and management matter.",
    });
  } else if (hasCats(answers) && prey != null && prey >= 4) {
    flags.push({
      id: "prey-cats",
      severity: "caution",
      title: "Cats and chase tendency",
      body: "This breed may have a stronger chase tendency, so the individual dog, history, introductions and management matter.",
    });
    frictionPoints.push("Cat-living is a management plan, not a breed promise.");
  }

  if (answers.aloneHours >= 8 && answers.help === "none" && alone != null && alone <= 2) {
    frictionRaw += HARD_FRICTION.longAloneLowTolerance;
    flags.push({
      id: "alone-hours",
      severity: "high",
      title: "Long hours alone",
      body: "This type is typically a poor match for long, empty workdays without a walker, daycare, or a person coming home. That is a lifestyle mismatch — not a claim that this dog has separation anxiety.",
    });
  }

  if (overHardMax(dog, answers.hardMaxLbs)) {
    frictionRaw += HARD_FRICTION.sizeOverHardMax;
    lifestyleFit = Math.min(lifestyleFit, 35);
    flags.push({
      id: "size-max",
      severity: "high",
      title: "Over your hard size maximum",
      body: "Typical adult weight starts above the limit you set.",
    });
    skipIf.push("You set a hard size maximum this dog typically exceeds.");
  }

  const friction = clamp(frictionRaw);

  if (answers.yard === "unfenced" && prey != null && prey >= 4) {
    frictionPoints.push("An unfenced yard plus a stronger chase tendency is a leash-and-recall project, not a ‘they’ll come back’ hope.");
  }
  if (answers.agePreference === "puppy" && energy != null && energy >= 4) {
    frictionPoints.push("A puppy of this type is a lot of dog for three months, even if the adult is a good match.");
  }

  if (why.length === 0) {
    why.push("There may still be individual dogs of this type who fit a carefully managed home — the type-level match is not a natural easy yes.");
  }

  if (energy != null && energy >= 4) skipIf.push("You want a low-mileage, mostly indoor week. This type typically does not thrive that way.");
  if (answers.experience === "first-time" && novice != null && novice <= 2) {
    skipIf.push("You are a first-time owner looking for an easier first dog.");
  }
  if (answers.sharedWalls && bark != null && bark >= 4) {
    skipIf.push("You share walls and need a quiet dog.");
  }
  if (hasSmallAnimals(answers) && prey != null && prey >= 4) {
    skipIf.push("You have small animals and want a low-chase household without extra management.");
  }

  behavior.push(dog.notes);
  if (mental != null && mental >= 4) behavior.push("Typical mental-stimulation need is high. A walk is not always a job.");
  if (bark != null && bark >= 4) behavior.push("Alert or hound vocalizing is a common tendency — plan for it instead of hoping it is a myth.");
  if (prey != null && prey >= 4) behavior.push("Chase interest toward critters, cats, or wildlife is a tendency to plan for.");
  if (mix) behavior.push("Because this is a mix, any tendency here is a maybe. Screen the individual dog.");

  const livingSpace = livingSpaceCopy(dog, answers, apt, wall);
  const existingPetNotes = existingPetCopy(dog, answers, prey, cats, smallCaution, dogs);
  const exerciseReality = exerciseCopy(dog, answers);
  const groomingReality = groomingCopy(dog);
  const trainingReality = trainingCopy(dog, answers);

  return {
    dog,
    lifestyleFit,
    friction,
    fitFactors,
    frictionFactors,
    flags,
    whyItCouldWork: unique(why).slice(0, 4),
    frictionPoints: unique(frictionPoints).slice(0, 6),
    exerciseReality,
    groomingReality,
    trainingReality,
    behaviorTendencies: unique(behavior).slice(0, 5),
    livingSpace,
    existingPetNotes,
    skipIf: unique(skipIf).slice(0, 5),
    tuesday: buildTuesday(dog, answers),
    first90: buildFirst90(dog, answers),
  };
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function livingSpaceCopy(
  dog: DogProfile,
  answers: QuizAnswers,
  apt: number | null,
  wall: number | null,
): string {
  if (isMix(dog)) {
    return "Living-space fit depends on the individual mix — size and vocality are not standardized. Meet the dog in the kind of space you actually have.";
  }
  const bits = [];
  if (answers.homeType === "apartment" || answers.homeType === "condo") {
    bits.push("This is a smaller or shared-wall home. Compatibility is about the dog’s typical motor and voice, not whether the breed is ‘allowed.’");
  }
  if (answers.sharedWalls && wall != null && wall >= 4) {
    bits.push("Shared-wall risk is on the higher side for this type.");
  } else if (apt != null && apt >= 4) {
    bits.push("Typical apartment compatibility is on the friendlier side — still walk them; a floor plan is not enrichment.");
  }
  if (answers.yard === "none") bits.push("No yard means the walk is the bathroom and the job.");
  if (answers.yard === "unfenced") bits.push("An unfenced yard is not a free-range plan.");
  if (bits.length === 0) return "Home setup is workable if the activity and noise pieces also line up.";
  return bits.join(" ");
}

function existingPetCopy(
  dog: DogProfile,
  answers: QuizAnswers,
  prey: number | null,
  cats: number | null,
  smallCaution: number | null,
  dogs: number | null,
): string {
  if (answers.existingPets === "none") {
    return "No other pets in the picture. You still have to socialize and manage the dog you bring home.";
  }
  if (isMix(dog)) {
    return "Other-pet compatibility is unknown at the type level. Introductions, history, and the individual dog matter more than the mix name.";
  }
  if (hasSmallAnimals(answers)) {
    if (prey != null && prey >= 4) {
      return "This breed may have a stronger chase tendency, so the individual dog, history, introductions and management matter.";
    }
    return "Small animals in the home mean management either way. Do not treat a breed page as a guarantee.";
  }
  if (hasCats(answers) && prey != null && prey >= 4) {
    return "This breed may have a stronger chase tendency, so the individual dog, history, introductions and management matter.";
  }
  if (hasCats(answers) && cats != null && cats >= 4) {
    return "Some dogs of this type live with cats, and some do not. Introductions still decide it.";
  }
  if (hasDogs(answers) && dogs != null && dogs <= 2) {
    return "Dog-to-dog style can be choosier. Match the individual, and do not skip a slow introduction.";
  }
  return "Other pets mean slow introductions and honest supervision. Breed tendency is a starting point, not a prediction.";
}

function exerciseCopy(dog: DogProfile, answers: QuizAnswers): string {
  if (dog.exerciseMinutesMin === "unknown" || dog.exerciseMinutesMax === "unknown") {
    return "Exercise need is too variable to quote a number. Plan for the higher-energy parent if this is a mix, then adjust to the dog in front of you.";
  }
  const min = dog.exerciseMinutesMin;
  const max = dog.exerciseMinutesMax;
  const puppy = answers.agePreference === "puppy" ? " A puppy needs shorter, more frequent outings — not a one-hour march." : "";
  return `Typical daily activity for this type is often in the ${min}–${max} minute range, mixing walks, play, and brain work — not a stopwatch guarantee.${puppy}`;
}

function groomingCopy(dog: DogProfile): string {
  if (isMix(dog) || dog.groomingLevel === "unknown") {
    return "Coat is a lottery in many mixes. Do not count on ‘doesn’t shed’ unless you have seen the adult coat and a groomer’s honest quote.";
  }
  if (dog.professionalGroomingLikely === true) {
    return "Professional grooming is commonly part of keeping this coat livable. Skipping it usually means mats, not savings.";
  }
  if (dog.sheddingLevel !== "unknown" && dog.sheddingLevel >= 4) {
    return "Brushing will not stop the shed — it just moves hair to the bin instead of the couch. Expect seasonal coat blows.";
  }
  if (dog.groomingLevel <= 2) {
    return "Coat care is typically light: a brush, a bath when they are actually dirty, nail trims. Still not zero.";
  }
  return "Plan on routine brushing and nail care. Exact schedules depend on the individual coat and climate.";
}

function trainingCopy(dog: DogProfile, answers: QuizAnswers): string {
  if (isMix(dog) || dog.trainability === "unknown") {
    return "Training response varies. Use reward-based training, keep sessions short, and get help early if you feel stuck. No dominance theater.";
  }
  const patience = dog.trainingPatienceNeeded === "unknown" ? null : dog.trainingPatienceNeeded;
  if (dog.trainability >= 4 && (patience == null || patience <= 3)) {
    return "Often a more willing student for reward-based work. They still need consistency, especially through adolescence.";
  }
  if (patience != null && patience >= 4) {
    return "This type often has opinions. You will need patience, management, and a trainer who uses rewards — not intimidation.";
  }
  if (answers.experience === "first-time") {
    return "A first dog is a lot. Budget for a trainer who uses rewards, and for the unglamorous weeks of house manners.";
  }
  return "Reward-based training, a predictable routine, and realistic goals will do more than any breed stereotype.";
}

/**
 * Rank matches by lifestyle fit, then lower friction, then slug.
 * Popularity rank is never a tiebreaker.
 */
export function rankMatches(
  dogs: DogProfile[],
  answers: QuizAnswers,
): RankedMatches {
  const all = dogs
    .map((dog) => scoreDog(dog, answers))
    .sort((a, b) => {
      if (b.lifestyleFit !== a.lifestyleFit) return b.lifestyleFit - a.lifestyleFit;
      if (a.friction !== b.friction) return a.friction - b.friction;
      return a.dog.slug.localeCompare(b.dog.slug);
    });

  const top = all.slice(0, 3);
  const topSlugs = new Set(top.map((item) => item.dog.slug));
  const loveBut = all
    .filter((item) => !topSlugs.has(item.dog.slug) && item.friction >= 40)
    .sort((a, b) => {
      const aAppeal = a.lifestyleFit * 0.35 + a.friction;
      const bAppeal = b.lifestyleFit * 0.35 + b.friction;
      if (bAppeal !== aAppeal) return bAppeal - aAppeal;
      return a.dog.slug.localeCompare(b.dog.slug);
    })
    .slice(0, 2);

  return { top, loveBut, all };
}

export function popularityLabel(dog: DogProfile): string | null {
  if (dog.type === "common-mix") return "Common mix · not an AKC-recognized breed";
  if (dog.newFor2026 || dog.popularityRank == null) return "New for 2026 · not yet ranked";
  return `AKC 2025 popularity: #${dog.popularityRank}`;
}

/** Exposed for tests — scoring must never read this. */
export function popularityUnusedInScoring(dog: DogProfile): number | null {
  return dog.popularityRank;
}
