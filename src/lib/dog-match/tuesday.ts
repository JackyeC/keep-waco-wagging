import type { DogProfile, QuizAnswers, TuesdayPlan } from "@/data/dog-match/types";
import { isMix } from "@/data/dog-match";
import { traitNumber } from "./traits";

function middayPlan(answers: QuizAnswers): { time: string; title: string; detail: string } {
  if (answers.help === "daycare") {
    return {
      time: "Daytime",
      title: "Daycare day",
      detail:
        "If this is a daycare dog, the midday job is rest around play — not a second full-time job when they get home. Daycare is not a fit for every dog; it is one possible tool.",
    };
  }
  if (answers.help === "walker") {
    return {
      time: "12:30 PM",
      title: "Walker or a real break",
      detail: "A potty break and a short walk while you are out. This is the difference between a long empty stretch and a manageable one.",
    };
  }
  if (answers.help === "family") {
    return {
      time: "Midday",
      title: "A person in the house",
      detail: "Someone you trust stops by or is home. That is the plan — not a hope that the dog sleeps for eight hours on goodwill.",
    };
  }
  if (answers.workSchedule === "mostly-home") {
    return {
      time: "12:30 PM",
      title: "Potty + reset",
      detail: "A short break in the workday. You are home, but the dog still needs a pause that is not just existing in the same room as your laptop.",
    };
  }
  return {
    time: "12:30 PM",
    title: "Empty-house stretch",
    detail:
      "No walker, daycare, or extra hands most days. Keep this honest: the dog is alone. Choose a type that can handle that routine, and still build a calm departure pattern.",
  };
}

export function buildTuesday(dog: DogProfile, answers: QuizAnswers): TuesdayPlan {
  const energy = traitNumber(dog.energyLevel);
  const groom = traitNumber(dog.groomingLevel);
  const minutes =
    dog.exerciseMinutesMin === "unknown" || dog.exerciseMinutesMax === "unknown"
      ? null
      : { min: dog.exerciseMinutesMin, max: dog.exerciseMinutesMax };
  const puppy = answers.agePreference === "puppy";
  const highDrive = energy != null && energy >= 4;

  const morningWalk =
    answers.activity === "potty"
      ? "Short potty outing. If this dog’s type typically needs more, Tuesday will feel unfinished by 8 AM."
      : answers.activity === "sports" || answers.activity === "long-walks"
        ? "A real outing — walk, run, or training game — before the workday starts."
        : "A neighborhood walk with sniffing time, not just a sprint to the grass and back.";

  const morningLength =
    answers.activity === "potty" ? "10–15 minutes" :
    answers.activity === "neighborhood" ? "30–45 minutes" :
    answers.activity === "hour" ? "about an hour, split if needed" :
    "a longer outing";

  const midday = middayPlan(answers);
  const evening =
    highDrive
      ? "A second dose of body + brain: walk, scatter feeding, short training. Television is not enrichment."
      : "A walk or play session, then a chance to settle. They do not have to be a project all evening.";

  const blocks = [
    {
      time: "7:00 AM",
      title: puppy ? "Potty + short outing" : `${morningLength} out`,
      detail: puppy
        ? "Puppies need more frequent bathroom trips than adult dogs. Keep it short, rewarded, and boringly consistent."
        : morningWalk,
    },
    {
      time: "7:45 AM",
      title: "Breakfast + something to do with their face",
      detail:
        "A meal in a bowl is fine. A stuffed toy, scatter, or simple food puzzle buys you a quieter start without claiming it ‘tires them out’ for eight hours.",
    },
    {
      time: answers.workSchedule === "mostly-home" ? "8:30 AM" : "8:30 AM",
      title:
        answers.workSchedule === "away" || answers.workSchedule === "hybrid"
          ? "Settle while you leave"
          : "Settle while work starts",
      detail:
        "Practice boring. Reward calm. A crate or pen is a rest skill to teach kindly — not a punishment and not a guarantee.",
    },
    midday,
    {
      time: "5:30 PM",
      title: highDrive ? "Exercise + a short training session" : "Exercise, then exhale",
      detail: evening,
    },
    {
      time: "8:00 PM",
      title: "Settle with the household",
      detail: puppy
        ? "Last potty trip will be later than you want. That is the puppy tax."
        : "Quiet companionship is a skill. If the motor is still running, they needed a better afternoon, not a lecture.",
    },
  ];

  const recurring = [];
  if (dog.professionalGroomingLikely === true) {
    recurring.push({
      cadence: "Every 4–8 weeks",
      detail: "Professional grooming is commonly part of this coat. Exact timing depends on coat, climate, and the groomer — not a calendar we invented.",
    });
  } else if (groom != null && groom >= 4) {
    recurring.push({
      cadence: "Several times a week",
      detail: "Coat maintenance at home. Mats do not wait for a free Saturday.",
    });
  } else if (dog.sheddingLevel !== "unknown" && dog.sheddingLevel >= 4) {
    recurring.push({
      cadence: "A few times a week, plus seasonally",
      detail: "Brushing during coat blows. The vacuum is part of the household, not an admission of failure.",
    });
  } else if (isMix(dog)) {
    recurring.push({
      cadence: "Unknown until you see the adult coat",
      detail: "Could be a brush at home. Could be a groomer. Do not assume ‘doodle’ or ‘mix’ means easy.",
    });
  } else {
    recurring.push({
      cadence: "Weekly-ish",
      detail: "Nails, ears as needed, a brush when they are actually dusty. Exact care is individual.",
    });
  }

  if (minutes) {
    recurring.push({
      cadence: "Most days",
      detail: `Plan on something in the ${minutes.min}–${minutes.max} minute range of real activity, not counting staring at you from the rug.`,
    });
  }

  if (answers.aloneHours >= 6) {
    recurring.push({
      cadence: "Workdays",
      detail: `You said the dog may be alone about ${answers.aloneHours} hours. Build that into the type you choose instead of hoping they nap on principle.`,
    });
  }

  return {
    blocks,
    recurring,
    caveat:
      "This is a picture of an ordinary Tuesday, not a veterinary schedule or a promise. Individual dogs eat, toilet, and settle on their own clocks.",
  };
}
