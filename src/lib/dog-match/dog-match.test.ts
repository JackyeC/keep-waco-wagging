import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { allDogProfiles, akcTop100, commonMixes, newFor2026Breeds, getDogBySlug } from "@/data/dog-match";
import { PIT_BULL_NOTICE } from "@/data/dog-match/aliases";
import {
  POODLE_MATCH_NOTE_TEXT,
  POODLE_VARIETY_SLUGS,
} from "@/data/dog-match/poodle-varieties";
import { QUIZ_STEPS, REQUIRED_QUIZ_FIELDS, isQuizComplete } from "@/data/dog-match/quiz";
import { traitOrigin, usableTraitLevel } from "@/data/dog-match/trait-origins";
import type { BreedProfile, QuizAnswers } from "@/data/dog-match/types";
import { LAST_REVIEWED } from "@/data/dog-match/sources";
import { pickLoveBut, popularityLabel, rankMatches, scoreDog } from "./score";
import { searchDogs } from "./search";

function answers(overrides: Partial<QuizAnswers> = {}): QuizAnswers {
  return {
    homeType: "house",
    homeSpace: "moderate",
    sharedWalls: false,
    yard: "fenced",
    noiseTolerance: "some",
    workSchedule: "hybrid",
    aloneHours: 4,
    help: "walker",
    activity: "hour",
    brushingTolerance: "weekly",
    sheddingTolerance: "some",
    groomingBudget: "50-100",
    experience: "some",
    trainingPatience: "moderate",
    existingPets: "none",
    children: "none",
    sizePreference: "no-preference",
    hardMaxLbs: null,
    agePreference: "either",
    desiredLife: "walking",
    ...overrides,
  };
}

function cloneAkc(slug: string, patch: Partial<BreedProfile>): BreedProfile {
  const base = getDogBySlug(slug);
  assert.ok(base && base.type !== "common-mix");
  return { ...base, ...patch };
}

describe("Dog Match dataset", () => {
  it("includes the AKC 2025 Top 100 roster with Poodle split into size varieties", () => {
    assert.equal(akcTop100.length, 102);
    assert.equal(new Set(akcTop100.map((dog) => dog.popularityRank)).size, 100);
    assert.equal(newFor2026Breeds.length, 3);
    assert.equal(commonMixes.length, 15);
    assert.equal(getDogBySlug("poodle"), undefined);
    const poodles = akcTop100.filter((dog) => dog.popularityRank === 6);
    assert.equal(poodles.length, 3);
    assert.deepEqual(
      poodles.map((dog) => dog.slug).sort(),
      ["miniature-poodle", "standard-poodle", "toy-poodle"],
    );
    assert.ok(poodles.every((dog) => dog.akcListedName === "Poodle"));
    assert.ok(akcTop100.every((dog) => dog.name !== "Poodle"));
    for (const name of [
      "French Bulldog",
      "Labrador Retriever",
      "Golden Retriever",
      "German Shepherd Dog",
      "Dachshund",
      "Toy Poodle",
      "Miniature Poodle",
      "Standard Poodle",
      "Beagle",
      "Rottweiler",
      "German Shorthaired Pointer",
      "Bulldog",
      "Cane Corso",
      "Cavalier King Charles Spaniel",
      "Yorkshire Terrier",
      "Australian Shepherd",
      "Doberman Pinscher",
      "Pembroke Welsh Corgi",
      "Miniature Schnauzer",
      "Boxer",
      "Pomeranian",
      "Bernese Mountain Dog",
      "Shih Tzu",
      "Great Dane",
      "Boston Terrier",
      "Chihuahua",
      "Havanese",
      "Border Collie",
      "Siberian Husky",
      "Belgian Malinois",
      "Cocker Spaniel",
      "Maltese",
      "Pug",
      "Mastiff",
      "Great Pyrenees",
      "Australian Cattle Dog",
      "Bichon Frise",
      "Staffordshire Bull Terrier",
      "American Staffordshire Terrier",
      "Chow Chow",
      "Akita",
      "Rat Terrier",
      "Bull Terrier",
      "Basenji",
      "Italian Greyhound",
      "Whippet",
      "Newfoundland",
      "Saint Bernard",
    ]) {
      assert.ok(akcTop100.some((dog) => dog.name === name), name);
    }
    assert.ok(allDogProfiles.every((dog) => dog.lastReviewed === LAST_REVIEWED));
  });
});

describe("Dog Match scoring", () => {
  it("never lets popularity affect match ranking", () => {
    const lowRank = cloneAkc("french-bulldog", {
      slug: "aaa-test-low-rank",
      id: "aaa-test-low-rank",
      popularityRank: 1,
      name: "Twin A",
    });
    const highRank = cloneAkc("french-bulldog", {
      slug: "zzz-test-high-rank",
      id: "zzz-test-high-rank",
      popularityRank: 100,
      name: "Twin B",
    });
    const quiz = answers();
    const a = scoreDog(lowRank, quiz);
    const b = scoreDog(highRank, quiz);
    assert.equal(a.lifestyleFit, b.lifestyleFit);
    assert.equal(a.friction, b.friction);

    const ranked = rankMatches([highRank, lowRank], quiz);
    assert.equal(ranked.all[0]?.dog.slug, "aaa-test-low-rank");
    assert.equal(
      JSON.stringify(a.fitFactors.map((f) => f.id)),
      JSON.stringify(b.fitFactors.map((f) => f.id)),
    );
    assert.equal(a.fitFactors.some((f) => f.id.includes("popular")), false);
  });

  it("penalizes a high-energy dog for a very-low-activity user", () => {
    const mal = getDogBySlug("belgian-malinois");
    const cavalier = getDogBySlug("cavalier-king-charles-spaniel");
    assert.ok(mal && cavalier);
    const quiz = answers({ activity: "potty", desiredLife: "couch" });
    const high = scoreDog(mal, quiz);
    const low = scoreDog(cavalier, quiz);
    assert.ok(high.lifestyleFit < low.lifestyleFit);
    assert.ok(high.friction > low.friction);
    assert.ok(high.flags.some((flag) => flag.id === "low-activity-drive"));
  });

  it("creates friction for high vocality when the user wants quiet", () => {
    const beagle = getDogBySlug("beagle");
    const whippet = getDogBySlug("whippet");
    assert.ok(beagle && whippet);
    const quiz = answers({ noiseTolerance: "quiet" });
    const noisy = scoreDog(beagle, quiz);
    const quiet = scoreDog(whippet, quiz);
    assert.ok(noisy.friction > quiet.friction);
    assert.ok(noisy.flags.some((flag) => flag.id === "quiet-vocal"));
  });

  it("increases relevant noise friction when the home has shared walls", () => {
    const pyr = getDogBySlug("great-pyrenees");
    assert.ok(pyr);
    const detached = scoreDog(pyr, answers({ sharedWalls: false, homeType: "house" }));
    const walls = scoreDog(pyr, answers({ sharedWalls: true, homeType: "condo" }));
    assert.ok(walls.friction > detached.friction);
    assert.ok(walls.flags.some((flag) => flag.id === "shared-walls"));
  });

  it("adds grooming friction for a grooming-intensive dog on a low budget", () => {
    const poodle = getDogBySlug("standard-poodle");
    const beagle = getDogBySlug("beagle");
    assert.ok(poodle && beagle);
    const quiz = answers({
      groomingBudget: "none",
      brushingTolerance: "minimal",
    });
    const coated = scoreDog(poodle, quiz);
    const wash = scoreDog(beagle, quiz);
    assert.ok(coated.friction > wash.friction);
    assert.ok(coated.flags.some((flag) => flag.id === "grooming-budget"));
  });

  it("shows a chase caution when a high-prey type meets small animals", () => {
    const basenji = getDogBySlug("basenji");
    assert.ok(basenji);
    const result = scoreDog(basenji, answers({ existingPets: "small-animals" }));
    const flag = result.flags.find((flag) => flag.id === "prey-small-animals");
    assert.ok(flag);
    assert.match(flag.body, /stronger chase tendency/i);
    assert.equal(flag.body.includes("cannot live with"), false);
  });

  it("does not treat missing data as a positive", () => {
    const mix = getDogBySlug("goldendoodle");
    const lab = getDogBySlug("labrador-retriever");
    assert.ok(mix && lab);
    const quiz = answers({
      activity: "sports",
      desiredLife: "sports",
      sheddingTolerance: "low",
      groomingBudget: "whatever",
    });
    const mixScore = scoreDog(mix, quiz);
    const labScore = scoreDog(lab, quiz);
    const mixEnergy = mixScore.fitFactors.find((f) => f.id === "activityEnergy");
    assert.equal(mixEnergy?.scored, false);
    assert.equal(mixEnergy?.contribution, 0);
    const labEnergy = labScore.fitFactors.find((f) => f.id === "activityEnergy");
    assert.equal(labEnergy?.scored, true);
    assert.ok((labEnergy?.contribution ?? 0) > 0);
    assert.ok(mixScore.frictionFactors.some((f) => f.id === "mixUncertainty"));
  });
});

describe("Dog Match labels and search", () => {
  it("labels new 2026 breeds as not yet ranked", () => {
    for (const dog of newFor2026Breeds) {
      assert.equal(dog.popularityRank, null);
      assert.equal(dog.newFor2026, true);
      assert.equal(popularityLabel(dog), "New for 2026 · not yet ranked");
    }
  });

  it("never displays an AKC rank for mixed dog types", () => {
    for (const dog of commonMixes) {
      assert.equal(dog.popularityRank, null);
      assert.equal(dog.type, "common-mix");
      assert.equal(popularityLabel(dog), "Common mix · not an AKC-recognized breed");
      assert.equal(popularityLabel(dog)?.includes("#"), false);
    }
  });

  it("resolves common aliases and the pit-bull umbrella", () => {
    const frenchie = searchDogs("frenchie");
    assert.equal(frenchie?.dogs[0]?.slug, "french-bulldog");

    const yorkie = searchDogs("yorkie");
    assert.equal(yorkie?.dogs[0]?.slug, "yorkshire-terrier");

    const wiener = searchDogs("wiener dog");
    assert.equal(wiener?.dogs[0]?.slug, "dachshund");

    const corgi = searchDogs("corgi");
    assert.ok(corgi?.dogs.some((dog) => dog.slug === "pembroke-welsh-corgi"));
    assert.ok(corgi?.dogs.some((dog) => dog.slug === "cardigan-welsh-corgi"));

    const heeler = searchDogs("blue heeler");
    assert.equal(heeler?.dogs[0]?.slug, "australian-cattle-dog");

    const mal = searchDogs("mal");
    assert.equal(mal?.dogs[0]?.slug, "belgian-malinois");

    const dobie = searchDogs("dobie");
    assert.equal(dobie?.dogs[0]?.slug, "doberman-pinscher");

    const doodle = searchDogs("doodle");
    assert.ok((doodle?.dogs.length ?? 0) >= 5);
    assert.ok(doodle?.dogs.every((dog) => dog.type === "common-mix"));

    const pittie = searchDogs("pittie");
    assert.equal(pittie?.kind, "pit-bull-umbrella");
    assert.equal(pittie?.notice, PIT_BULL_NOTICE);
    assert.ok(pittie?.dogs.some((dog) => dog.slug === "american-staffordshire-terrier"));
    assert.ok(pittie?.dogs.some((dog) => dog.slug === "staffordshire-bull-terrier"));
    assert.ok(pittie?.dogs.some((dog) => dog.slug === "pit-bull-type-mix"));

    const pitbull = searchDogs("pitbull");
    assert.equal(pitbull?.kind, "pit-bull-umbrella");

    const typo = searchDogs("rottweiller");
    assert.equal(typo?.dogs[0]?.slug, "rottweiler");
  });
});

describe("You May Love Them, But… ranking", () => {
  it("requires reasonable lifestyle fit before surfacing friction", () => {
    const top = [
      { dog: { slug: "top-a" }, lifestyleFit: 88, friction: 20 },
      { dog: { slug: "top-b" }, lifestyleFit: 84, friction: 22 },
      { dog: { slug: "top-c" }, lifestyleFit: 80, friction: 18 },
    ];
    const chaos = { dog: { slug: "chaos" }, lifestyleFit: 25, friction: 95 };
    const complicated = { dog: { slug: "complicated" }, lifestyleFit: 72, friction: 48 };
    const alsoCompatible = { dog: { slug: "also-compatible" }, lifestyleFit: 68, friction: 40 };
    const tooEasy = { dog: { slug: "too-easy" }, lifestyleFit: 70, friction: 12 };

    const picked = pickLoveBut(
      [...top, chaos, complicated, alsoCompatible, tooEasy],
      top,
    );

    assert.equal(picked[0]?.dog.slug, "complicated");
    assert.equal(picked[1]?.dog.slug, "also-compatible");
    assert.equal(picked.some((item) => item.dog.slug === "chaos"), false);
    assert.equal(picked.some((item) => item.dog.slug === "too-easy"), false);
    assert.equal(picked.some((item) => item.dog.slug.startsWith("top-")), false);
  });
});

describe("Poodle varieties", () => {
  it("keeps AKC #6 Poodle popularity metadata on every variety", () => {
    for (const slug of POODLE_VARIETY_SLUGS) {
      const dog = getDogBySlug(slug);
      assert.ok(dog);
      assert.equal(dog.popularityRank, 6);
      assert.equal(dog.akcListedName, "Poodle");
      assert.equal(dog.varietyOf, "poodle");
      assert.equal(dog.matchNote, POODLE_MATCH_NOTE_TEXT);
      assert.equal(popularityLabel(dog), "AKC 2025 popularity: #6 — Poodle");
    }
  });

  it("does not invent temperament splits between varieties", () => {
    const toy = getDogBySlug("toy-poodle");
    const mini = getDogBySlug("miniature-poodle");
    const standard = getDogBySlug("standard-poodle");
    assert.ok(toy && mini && standard && toy.type !== "common-mix" && mini.type !== "common-mix" && standard.type !== "common-mix");
    const shared = [
      "energyLevel",
      "mentalStimulationNeed",
      "barkingLevel",
      "sheddingLevel",
      "groomingLevel",
      "trainability",
      "trainingPatienceNeeded",
      "preyDrive",
      "dogSociability",
      "catCompatibilityTendency",
      "smallAnimalCaution",
      "noviceOwnerSuitability",
      "aloneTimeTolerance",
      "childCompatibilityGeneral",
    ] as const;
    for (const field of shared) {
      assert.equal(toy[field], mini[field], field);
      assert.equal(mini[field], standard[field], field);
    }
    assert.equal(toy.professionalGroomingLikely, standard.professionalGroomingLikely);
    assert.ok(toy.sizeMax !== "unknown" && standard.sizeMin !== "unknown");
    assert.ok(toy.sizeMax < standard.sizeMin);
  });

  it("matches small homes to Toy ahead of Standard, and large homes the other way", () => {
    const toy = getDogBySlug("toy-poodle");
    const standard = getDogBySlug("standard-poodle");
    assert.ok(toy && standard);
    const smallQuiz = answers({
      sizePreference: "small",
      hardMaxLbs: 20,
      homeType: "apartment",
      homeSpace: "compact",
      desiredLife: "small-companion",
    });
    const largeQuiz = answers({
      sizePreference: "large",
      hardMaxLbs: null,
      homeType: "house",
      homeSpace: "spacious",
      yard: "fenced",
      desiredLife: "active-family",
    });
    const smallRanked = rankMatches([toy, standard], smallQuiz);
    const largeRanked = rankMatches([toy, standard], largeQuiz);
    assert.equal(smallRanked.all[0]?.dog.slug, "toy-poodle");
    assert.ok(smallRanked.all[0]!.lifestyleFit > smallRanked.all[1]!.lifestyleFit);
    assert.equal(largeRanked.all[0]?.dog.slug, "standard-poodle");
    assert.ok(largeRanked.all[0]!.lifestyleFit > largeRanked.all[1]!.lifestyleFit);
  });

  it("resolves poodle search to all three varieties, and specific names to one", () => {
    const all = searchDogs("poodle");
    assert.deepEqual(
      all?.dogs.map((dog) => dog.slug),
      ["toy-poodle", "miniature-poodle", "standard-poodle"],
    );
    assert.equal(all?.notice, POODLE_MATCH_NOTE_TEXT);

    const toy = searchDogs("toy poodle");
    assert.equal(toy?.dogs.length, 1);
    assert.equal(toy?.dogs[0]?.slug, "toy-poodle");

    const mini = searchDogs("mini poodle");
    assert.equal(mini?.dogs[0]?.slug, "miniature-poodle");
    const miniature = searchDogs("miniature poodle");
    assert.equal(miniature?.dogs[0]?.slug, "miniature-poodle");

    const standard = searchDogs("standard poodle");
    assert.equal(standard?.dogs[0]?.slug, "standard-poodle");
  });
});

describe("Grouped quiz", () => {
  it("is eight user-facing steps and still requires every scoring answer", () => {
    assert.equal(QUIZ_STEPS.length, 8);
    assert.deepEqual(QUIZ_STEPS, [
      "home",
      "schedule",
      "tuesday",
      "grooming",
      "training",
      "household",
      "lookingFor",
      "desiredLife",
    ]);
    assert.ok(isQuizComplete(answers()));
    for (const field of REQUIRED_QUIZ_FIELDS) {
      const incomplete: Partial<QuizAnswers> = { ...answers() };
      delete incomplete[field];
      assert.equal(isQuizComplete(incomplete), false, field);
    }
  });
});

describe("DIRECT / DERIVED / UNKNOWN trait handling", () => {
  it("labels Lab energy as direct, prey-related fields as derived, and mix traits as unknown", () => {
    const lab = getDogBySlug("labrador-retriever");
    const mix = getDogBySlug("goldendoodle");
    assert.ok(lab && mix);
    assert.equal(traitOrigin(lab, "energyLevel"), "direct");
    assert.equal(traitOrigin(lab, "barkingLevel"), "direct");
    assert.equal(traitOrigin(lab, "preyDrive"), "derived");
    assert.equal(traitOrigin(lab, "catCompatibilityTendency"), "derived");
    assert.equal(traitOrigin(lab, "smallAnimalCaution"), "derived");
    assert.equal(traitOrigin(lab, "aloneTimeTolerance"), "derived");
    assert.equal(traitOrigin(lab, "apartmentCompatibility"), "derived");
    assert.equal(traitOrigin(lab, "sharedWallRisk"), "derived");
    assert.equal(traitOrigin(lab, "noviceOwnerSuitability"), "derived");
    assert.equal(traitOrigin(lab, "trainingPatienceNeeded"), "derived");
    assert.equal(usableTraitLevel(lab, "energyLevel"), 5);
    assert.equal(traitOrigin(mix, "preyDrive"), "unknown");
    assert.equal(usableTraitLevel(mix, "preyDrive"), null);
    assert.equal(usableTraitLevel(mix, "energyLevel"), null);
  });

  it("does not let unknown values become a positive match factor, even if a number is present", () => {
    const mix = getDogBySlug("goldendoodle");
    assert.ok(mix && mix.type === "common-mix");
    const padded = { ...mix, energyLevel: 5 as const, preyDrive: 5 as const };
    const quiz = answers({
      activity: "sports",
      desiredLife: "sports",
      existingPets: "cats",
    });
    const result = scoreDog(padded, quiz);
    const energy = result.fitFactors.find((factor) => factor.id === "activityEnergy");
    assert.equal(energy?.scored, false);
    assert.equal(energy?.contribution, 0);
    assert.equal(energy?.origin, "unknown");
    const pets = result.fitFactors.find((factor) => factor.id === "pets");
    assert.equal(pets?.scored, false);
    assert.equal(pets?.contribution, 0);
    assert.equal(pets?.origin, "unknown");
    assert.equal(result.frictionFactors.some((factor) => factor.id === "preyPets"), false);
  });

  it("attaches origin onto scored factors for recognized breeds", () => {
    const lab = getDogBySlug("labrador-retriever");
    assert.ok(lab);
    const result = scoreDog(lab, answers({ existingPets: "cats" }));
    assert.equal(result.fitFactors.find((factor) => factor.id === "activityEnergy")?.origin, "direct");
    assert.equal(result.fitFactors.find((factor) => factor.id === "pets")?.origin, "derived");
  });
});

