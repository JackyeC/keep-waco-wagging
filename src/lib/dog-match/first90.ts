import type { DogProfile, First90Section, QuizAnswers } from "@/data/dog-match/types";
import { isMix } from "@/data/dog-match";
import { traitNumber } from "./traits";

export function buildFirst90(dog: DogProfile, answers: QuizAnswers): First90Section[] {
  const puppy = answers.agePreference === "puppy";
  const energy = traitNumber(dog.energyLevel);
  const otherPets = answers.existingPets !== "none";
  const kids = answers.children !== "none";
  const mix = isMix(dog);

  const days17 = [
    "Set up a boring, safe landing zone: water, a place to rest, a place to toilet, and a way to keep the dog from free-ranging the whole house on day one.",
    "Book a veterinarian relationship. Do not wait for an emergency to find out who is open at 9 PM in Waco heat.",
    "Start a feeding routine you can actually keep. Sudden food-bowl chaos is not ‘bonding.’",
    "Give the dog decompression time. New homes are loud even when you are being gentle. Let them sleep.",
    "Reward-based potty routine: frequent trips, celebrate outside, skip scolding for accidents.",
    "Begin positive crate or pen time in tiny doses while you are home and pleasant — never as ‘you were bad.’",
    puppy
      ? "Age-appropriate socialization means quality, not a crowded patio. Skip flooding. One calm new thing is better than ten overwhelming ones."
      : "Adult dogs still need a quiet week. Do not throw a meet-and-greet on night two.",
  ];

  if (otherPets) {
    days17.push(
      "Introductions to existing pets: slow, separate resources, no forced face-to-face. Management is kinder than a messy first meeting.",
    );
  }

  const weeks24 = [
    "Keep the household routine boringly predictable: meals, walks, rest. Dogs learn the house calendar faster than they learn your speeches.",
    "Short daily reward-based training: name, sit, leash starts, coming when it is easy. Stop before they are fried.",
    "Alone-time conditioning in small steps. Leave for a minute, come back like it was nothing. This is not a separation-anxiety diagnosis — it is good manners for a workweek.",
    "Grooming handling: touch paws, ears, collar, towel. Feed for cooperation. Do not wait until they are matted and furious.",
    "Leash skills in quiet places first. Waco sidewalks can wait until the dog can think.",
  ];

  if (puppy) {
    weeks24.push(
      "Continue careful socialization: surfaces, sounds, kind people, other vaccinated dogs if your vet says the timing is right. Quality over crowds.",
    );
  }
  if (kids) {
    weeks24.push(
      "Kids and dogs: adult-supervised, dog has a way out, no hugging as a sport. Teach the humans as much as the dog.",
    );
  }

  const month2 = [
    "Stretch walks and enrichment as the dog shows you they can recover. Tired and wrecked are not the same.",
    "If manners are stalling — leash, jumping, toilet, or fear — hire a reward-based trainer. Early help is cheaper than a crisis.",
    "Practice the real Tuesday: the actual leave-for-work routine, the actual midday plan, the actual evening settle.",
    "Keep chewing and food puzzles in the plan so the mouth has a legal job.",
  ];

  if (energy != null && energy >= 4) {
    month2.push(
      "High-drive types often look ‘trained’ at week three and then come unglued in adolescence. Keep the job. Do not cash out early.",
    );
  }
  if (mix) {
    month2.push(
      "Mixes show you who they are over months, not a weekend. Size, coat, and energy can still surprise you. Adjust the plan; do not argue with the dog you actually have.",
    );
  }

  const month3 = [
    "Look at the whole picture: can you keep this up on a normal week, not a holiday week?",
    "Milestone check: house manners, a settle, a leash you can live with, a grooming handling baseline, a vet they have actually met.",
    "If the dog is over threshold a lot — barking, panic, guarding, shutdown — get a credentialed, reward-based professional. Do not use alpha rolls, flooding, or pain.",
    "Decide what Waco life will actually include: patios later, parks when ready, rest days without guilt.",
  ];

  if (answers.help === "daycare") {
    month3.push(
      "If you hope to use daycare later, ask about evaluation and fit. No daycare owes every dog a yes.",
    );
  }

  return [
    { id: "days-1-7", title: "Days 1–7", items: days17 },
    { id: "weeks-2-4", title: "Weeks 2–4", items: weeks24 },
    { id: "month-2", title: "Month 2", items: month2 },
    { id: "month-3", title: "Month 3", items: month3 },
  ];
}
