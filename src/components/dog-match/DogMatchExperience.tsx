"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { allDogProfiles } from "@/data/dog-match";
import { QUIZ_STEPS, isQuizComplete } from "@/data/dog-match/quiz";
import type { QuizAnswers } from "@/data/dog-match/types";
import { trackDogMatch } from "@/lib/dog-match/analytics";
import { rankMatches } from "@/lib/dog-match/score";
import { decodeAnswers, dogMatchSharePath } from "@/lib/dog-match/share";
import { BreedSearch } from "./BreedSearch";
import { QuizFlow } from "./QuizFlow";
import { ResultsView } from "./ResultsView";

type View = "landing" | "quiz" | "results";

export function DogMatchExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlAnswers = decodeAnswers(searchParams.get("m"));

  const [draft, setAnswers] = useState<Partial<QuizAnswers>>(urlAnswers ?? {});
  const [view, setView] = useState<View>(urlAnswers ? "results" : "landing");
  const [stepIndex, setStepIndex] = useState(0);
  const [pinned, setPinned] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const answers = urlAnswers && view === "results" ? urlAnswers : draft;

  const matches = useMemo(() => {
    if (!isQuizComplete(answers)) return null;
    return rankMatches(allDogProfiles, answers);
  }, [answers]);

  function startQuiz() {
    trackDogMatch("dog_match_started");
    setView("quiz");
    setStepIndex(0);
  }

  function completeQuiz() {
    if (!isQuizComplete(draft)) return;
    trackDogMatch("dog_match_completed", { steps: QUIZ_STEPS.length });
    setView("results");
    router.replace(dogMatchSharePath(draft), { scroll: false });
  }

  function pin(slug: string) {
    setPinned((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 3) return [...current.slice(1), slug];
      if (current.length === 0) trackDogMatch("dog_match_comparison_started");
      return [...current, slug];
    });
  }

  async function share() {
    if (!isQuizComplete(answers)) return;
    const url = `${window.location.origin}${dogMatchSharePath(answers)}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("Link copied. Anyone with it can see these matches — no account needed.");
      trackDogMatch("dog_match_shared");
    } catch {
      setShareStatus(url);
    }
  }

  function startOver() {
    setAnswers({});
    setPinned([]);
    setStepIndex(0);
    setView("landing");
    setShareStatus(null);
    router.replace("/dog-match", { scroll: false });
  }

  const progress = ((stepIndex + 1) / QUIZ_STEPS.length) * 100;

  return (
    <>
      {view === "quiz" && (
        <div className="border-b border-border bg-soft-cream/70">
          <Container className="py-3">
            <p className="text-[11px] font-medium tracking-[0.14em] text-label-muted uppercase">
              Step {stepIndex + 1} of {QUIZ_STEPS.length}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-clay">
              <div className="h-full bg-wag-sage" style={{ width: `${progress}%` }} />
            </div>
          </Container>
        </div>
      )}

      {view === "landing" && (
        <section className="border-b border-clay bg-sage-50">
          <Container className="py-16 sm:py-20 md:py-24">
            <p className="eyebrow">Dog Match by Keep Waco Wagging</p>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
              You may love the dog. Can you live with the dog?
            </h1>
            <p className="dek mt-5 max-w-2xl">
              Find dogs that fit the life you actually live — your schedule, home,
              noise tolerance, exercise habits, grooming budget, training patience,
              and the pets already in it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="sage" size="lg" onClick={startQuiz}>
                Find My Dog Match
              </Button>
              <Button href="/dog-match/how-we-match" variant="secondary" size="lg">
                How we match
              </Button>
            </div>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body-muted">
              We’ll show you what could fit, what could drive you nuts, and what
              everyday life with that dog may actually look like.
            </p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-label-muted">
              Breed tendencies are a starting point, not a prediction of an
              individual dog. Every dog is different.
            </p>
          </Container>
        </section>
      )}

      <Container className="py-12 sm:py-16">
        {view === "landing" && (
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">Not a personality quiz</p>
              <h2 className="heading mt-2">A person can love a dog and still be poorly matched to living with that dog.</h2>
              <p className="dek mt-4">
                Dog Match looks at Lifestyle Fit and Friction as two separate
                scores. A dog can be 90% fit and still come with 45% friction —
                grooming, barking, exercise, training, prey drive, cost, or
                management.
              </p>
              <Button className="mt-6" variant="sage" onClick={startQuiz}>
                Find My Dog Match
              </Button>
            </div>
            <BreedSearch />
          </div>
        )}

        {view === "quiz" && (
          <QuizFlow
            stepIndex={stepIndex}
            answers={draft}
            onAnswers={(patch) => setAnswers((prev) => ({ ...prev, ...patch }))}
            onBack={() => setStepIndex((n) => Math.max(0, n - 1))}
            onNext={() => {
              if (stepIndex >= QUIZ_STEPS.length - 1) completeQuiz();
              else setStepIndex((n) => n + 1);
            }}
          />
        )}

        {view === "results" && matches && isQuizComplete(answers) && (
          <ResultsView
            matches={matches}
            pinned={pinned}
            onPin={pin}
            onChangeAnswers={() => {
              setAnswers(answers);
              setView("quiz");
              setStepIndex(0);
            }}
            onStartOver={startOver}
            onShare={share}
            shareStatus={shareStatus}
          />
        )}
      </Container>
    </>
  );
}
