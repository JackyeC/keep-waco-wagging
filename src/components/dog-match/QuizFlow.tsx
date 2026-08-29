"use client";

import { Button } from "@/components/ui/Button";
import {
  QUIZ_STEPS,
  ageChoices,
  aloneHourChoices,
  brushingChoices,
  budgetChoices,
  childrenChoices,
  desiredLifeChoices,
  experienceChoices,
  hardMaxChoices,
  helpChoices,
  homeSpaceChoices,
  homeTypeChoices,
  isQuizComplete,
  noiseChoices,
  otherDogSizeChoices,
  patienceChoices,
  petChoices,
  sharedWallChoices,
  sheddingChoices,
  sizeChoices,
  stepCopy,
  yardChoices,
  activityChoices,
  workChoices,
  type QuizStepId,
} from "@/data/dog-match/quiz";
import type { QuizAnswers } from "@/data/dog-match/types";
import { cn } from "@/lib/utils";

function ChoiceGrid<T extends string | number | boolean | null>({
  legend,
  value,
  choices,
  onChange,
}: {
  legend: string;
  value: T | undefined;
  choices: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[15px] font-medium text-serif-ink">{legend}</legend>
      <div className="mt-3 grid gap-2">
        {choices.map((choice) => {
          const selected = value === choice.value;
          return (
            <button
              key={String(choice.value)}
              type="button"
              onClick={() => onChange(choice.value)}
              className={cn(
                "card-panel w-full p-4 text-left transition-colors",
                selected
                  ? "border-wag-sage bg-sage-50"
                  : "hover:border-wag-sage",
              )}
              aria-pressed={selected}
            >
              <span className="block text-[15px] font-medium text-serif-ink">
                {choice.label}
              </span>
              {choice.hint && (
                <span className="mt-1 block text-[13px] font-light text-body-muted">
                  {choice.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function QuizFlow({
  stepIndex,
  answers,
  onAnswers,
  onBack,
  onNext,
}: {
  stepIndex: number;
  answers: Partial<QuizAnswers>;
  onAnswers: (patch: Partial<QuizAnswers>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const step = QUIZ_STEPS[stepIndex] ?? "homeType";
  const copy = stepCopy[step];
  const canContinue = canAdvance(step, answers);
  const isLast = step === "desiredLife";

  return (
    <div>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="heading mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)]">{copy.title}</h2>
      {copy.dek && <p className="dek mt-3 max-w-2xl">{copy.dek}</p>}

      <div className="mt-8 space-y-8">
        {step === "homeType" && (
          <ChoiceGrid
            legend="Home type"
            value={answers.homeType}
            choices={homeTypeChoices}
            onChange={(homeType) => onAnswers({ homeType })}
          />
        )}
        {step === "homeSetup" && (
          <>
            <ChoiceGrid
              legend="Approximate space"
              value={answers.homeSpace}
              choices={homeSpaceChoices}
              onChange={(homeSpace) => onAnswers({ homeSpace })}
            />
            <ChoiceGrid
              legend="Shared walls?"
              value={answers.sharedWalls}
              choices={sharedWallChoices}
              onChange={(sharedWalls) => onAnswers({ sharedWalls })}
            />
            <ChoiceGrid
              legend="Yard"
              value={answers.yard}
              choices={yardChoices}
              onChange={(yard) => onAnswers({ yard })}
            />
          </>
        )}
        {step === "noise" && (
          <ChoiceGrid
            legend="Noise"
            value={answers.noiseTolerance}
            choices={noiseChoices}
            onChange={(noiseTolerance) => onAnswers({ noiseTolerance })}
          />
        )}
        {step === "work" && (
          <ChoiceGrid
            legend="Work schedule"
            value={answers.workSchedule}
            choices={workChoices}
            onChange={(workSchedule) => onAnswers({ workSchedule })}
          />
        )}
        {step === "alone" && (
          <ChoiceGrid
            legend="Routine alone time"
            value={answers.aloneHours}
            choices={aloneHourChoices}
            onChange={(aloneHours) => onAnswers({ aloneHours })}
          />
        )}
        {step === "help" && (
          <ChoiceGrid
            legend="Backup during the day"
            value={answers.help}
            choices={helpChoices}
            onChange={(help) => onAnswers({ help })}
          />
        )}
        {step === "activity" && (
          <ChoiceGrid
            legend="Ordinary Tuesday"
            value={answers.activity}
            choices={activityChoices}
            onChange={(activity) => onAnswers({ activity })}
          />
        )}
        {step === "grooming" && (
          <>
            <ChoiceGrid
              legend="Brushing"
              value={answers.brushingTolerance}
              choices={brushingChoices}
              onChange={(brushingTolerance) => onAnswers({ brushingTolerance })}
            />
            <ChoiceGrid
              legend="Shedding"
              value={answers.sheddingTolerance}
              choices={sheddingChoices}
              onChange={(sheddingTolerance) => onAnswers({ sheddingTolerance })}
            />
            <ChoiceGrid
              legend="Grooming budget"
              value={answers.groomingBudget}
              choices={budgetChoices}
              onChange={(groomingBudget) => onAnswers({ groomingBudget })}
            />
          </>
        )}
        {step === "training" && (
          <>
            <ChoiceGrid
              legend="Dog experience"
              value={answers.experience}
              choices={experienceChoices}
              onChange={(experience) => onAnswers({ experience })}
            />
            <ChoiceGrid
              legend="How much patience do you have for a dog who has opinions?"
              value={answers.trainingPatience}
              choices={patienceChoices}
              onChange={(trainingPatience) => onAnswers({ trainingPatience })}
            />
          </>
        )}
        {step === "pets" && (
          <>
            <ChoiceGrid
              legend="Existing pets"
              value={answers.existingPets}
              choices={petChoices}
              onChange={(existingPets) => onAnswers({ existingPets })}
            />
            {(answers.existingPets === "dogs" || answers.existingPets === "multiple") && (
              <ChoiceGrid
                legend="Size of the dog(s) already at home"
                value={answers.otherDogSize}
                choices={otherDogSizeChoices}
                onChange={(otherDogSize) => onAnswers({ otherDogSize })}
              />
            )}
          </>
        )}
        {step === "children" && (
          <ChoiceGrid
            legend="Children"
            value={answers.children}
            choices={childrenChoices}
            onChange={(children) => onAnswers({ children })}
          />
        )}
        {step === "size" && (
          <>
            <ChoiceGrid
              legend="Size preference"
              value={answers.sizePreference}
              choices={sizeChoices}
              onChange={(sizePreference) => onAnswers({ sizePreference })}
            />
            <ChoiceGrid
              legend="Hard maximum, if you need one"
              value={answers.hardMaxLbs}
              choices={hardMaxChoices}
              onChange={(hardMaxLbs) => onAnswers({ hardMaxLbs })}
            />
          </>
        )}
        {step === "age" && (
          <ChoiceGrid
            legend="Age"
            value={answers.agePreference}
            choices={ageChoices}
            onChange={(agePreference) => onAnswers({ agePreference })}
          />
        )}
        {step === "desiredLife" && (
          <ChoiceGrid
            legend="Desired life"
            value={answers.desiredLife}
            choices={desiredLifeChoices}
            onChange={(desiredLife) => onAnswers({ desiredLife })}
          />
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {stepIndex > 0 && (
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
        )}
        <Button
          variant="sage"
          onClick={onNext}
          disabled={!canContinue || (isLast && !isQuizComplete(answers))}
        >
          {isLast ? "See my matches" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

function canAdvance(step: QuizStepId, answers: Partial<QuizAnswers>): boolean {
  switch (step) {
    case "homeType":
      return answers.homeType !== undefined;
    case "homeSetup":
      return (
        answers.homeSpace !== undefined &&
        answers.sharedWalls !== undefined &&
        answers.yard !== undefined
      );
    case "noise":
      return answers.noiseTolerance !== undefined;
    case "work":
      return answers.workSchedule !== undefined;
    case "alone":
      return answers.aloneHours !== undefined;
    case "help":
      return answers.help !== undefined;
    case "activity":
      return answers.activity !== undefined;
    case "grooming":
      return (
        answers.brushingTolerance !== undefined &&
        answers.sheddingTolerance !== undefined &&
        answers.groomingBudget !== undefined
      );
    case "training":
      return answers.experience !== undefined && answers.trainingPatience !== undefined;
    case "pets":
      if (answers.existingPets === undefined) return false;
      if (answers.existingPets === "dogs" || answers.existingPets === "multiple") {
        return answers.otherDogSize !== undefined;
      }
      return true;
    case "children":
      return answers.children !== undefined;
    case "size":
      return answers.sizePreference !== undefined && answers.hardMaxLbs !== undefined;
    case "age":
      return answers.agePreference !== undefined;
    case "desiredLife":
      return answers.desiredLife !== undefined;
    default:
      return false;
  }
}
