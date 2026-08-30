"use client";

import { useState } from "react";
import Link from "next/link";
import type { MatchResult, RankedMatches } from "@/data/dog-match/types";
import { popularityLabel } from "@/lib/dog-match/score";
import { ComparisonTable } from "./ComparisonTable";
import { MatchCard, ScoreMeters } from "./MatchCard";
import { WacoNext } from "./WacoNext";

export function ResultsView({
  matches,
  pinned,
  onPin,
  onChangeAnswers,
  onStartOver,
  onShare,
  shareStatus,
}: {
  matches: RankedMatches;
  pinned: string[];
  onPin: (slug: string) => void;
  onChangeAnswers: () => void;
  onStartOver: () => void;
  onShare: () => void;
  shareStatus: string | null;
}) {
  const [openSlug, setOpenSlug] = useState(matches.top[0]?.dog.slug ?? null);
  const open = matches.all.find((item) => item.dog.slug === openSlug) ?? matches.top[0];
  const pinnedResults = matches.all.filter((item) => pinned.includes(item.dog.slug));

  return (
    <div>
      <p className="eyebrow">Your results</p>
      <h2 className="heading mt-2">Your Top 3 Dog Matches</h2>
      <p className="dek mt-3 max-w-2xl">
        Lifestyle Fit is how naturally this type’s typical needs line up with the
        life you described. Friction is the management, cost, and compromise
        that may still come with it. They are not opposites.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {matches.top.map((result) => (
          <MatchCard
            key={result.dog.slug}
            result={result}
            pinned={pinned.includes(result.dog.slug)}
            onPin={() => onPin(result.dog.slug)}
            onOpen={() => setOpenSlug(result.dog.slug)}
          />
        ))}
      </div>

      {matches.loveBut.length > 0 && (
        <section className="mt-14">
          <h2 className="heading">You May Love Them, But…</h2>
          <p className="dek mt-3 max-w-2xl">
            Appealing enough to live with — and still carrying meaningful
            complications. These are not the highest-friction dogs on the list;
            they are reasonably compatible first.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {matches.loveBut.map((result) => (
              <MatchCard
                key={result.dog.slug}
                result={result}
                pinned={pinned.includes(result.dog.slug)}
                onPin={() => onPin(result.dog.slug)}
                onOpen={() => setOpenSlug(result.dog.slug)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn-pill btn-sage px-5 py-3" onClick={onChangeAnswers}>
          Change my answers
        </button>
        <button type="button" className="btn-pill btn-rose-outline px-5 py-3" onClick={onStartOver}>
          Start over
        </button>
        <button type="button" className="btn-pill border border-border px-5 py-3" onClick={onShare}>
          Share my match
        </button>
      </div>
      {shareStatus && <p className="mt-3 text-sm text-wag-sage">{shareStatus}</p>}

      {pinnedResults.length > 0 && (
        <section className="mt-14">
          <h2 className="heading">Compare dogs</h2>
          <p className="dek mt-3">Pin up to three. Scroll sideways on a phone.</p>
          <div className="mt-6">
            <ComparisonTable results={pinnedResults} />
          </div>
        </section>
      )}

      {open && <DogDetail result={open} />}

      <WacoNext />

      <p className="mt-12 text-[13px] text-label-muted">
        <Link href="/dog-match/how-we-match" className="underline decoration-border underline-offset-4 hover:text-rose">
          How we match
        </Link>
        {" · "}Popularity is informational only. Breed tendencies are a starting point, not a prediction of an individual dog.
      </p>
    </div>
  );
}

function DogDetail({ result }: { result: MatchResult }) {
  const { dog } = result;
  return (
    <section className="mt-16 border-t border-border pt-12">
      <p className="eyebrow">{popularityLabel(dog)}</p>
      <h2 className="heading mt-2">{dog.name}</h2>
      {dog.matchNote && (
        <p className="dek mt-3 max-w-2xl">{dog.matchNote}</p>
      )}
      <div className="mt-6 max-w-xl">
        <ScoreMeters fit={result.lifestyleFit} friction={result.friction} />
      </div>

      {result.flags.length > 0 && (
        <ul className="mt-8 grid gap-3">
          {result.flags.map((flag) => (
            <li
              key={flag.id}
              className="rounded-[20px] border border-rose/40 bg-gold-100/60 p-5"
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-rose-deep uppercase">
                {flag.severity === "high" ? "Friction" : "Caution"}
              </p>
              <p className="mt-1 font-display text-[1.25rem] text-serif-ink">{flag.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-body-muted">{flag.body}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Block title="Why this could work" items={result.whyItCouldWork} />
        <Block title="Likely friction points" items={result.frictionPoints} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CopyBlock title="Exercise reality" body={result.exerciseReality} />
        <CopyBlock title="Grooming reality" body={result.groomingReality} />
        <CopyBlock title="Training reality" body={result.trainingReality} />
        <CopyBlock title="Living-space considerations" body={result.livingSpace} />
        <CopyBlock title="Existing-pet considerations" body={result.existingPetNotes} />
        <Block title="Behavior tendencies to plan for" items={result.behaviorTendencies} />
      </div>

      <div className="mt-8 card-panel border-rose/30 p-6">
        <h3 className="font-display text-[1.5rem] font-medium text-serif-ink">
          Who should probably skip this dog?
        </h3>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-body-muted">
          {result.skipIf.length ? result.skipIf.map((item) => <li key={item}>· {item}</li>) : (
            <li>No automatic skip from your answers — still meet the individual dog.</li>
          )}
        </ul>
      </div>

      <section className="mt-14">
        <h2 className="heading">Great. Now imagine Tuesday.</h2>
        <p className="dek mt-3 max-w-2xl">{result.tuesday.caveat}</p>
        <ol className="mt-8 space-y-4">
          {result.tuesday.blocks.map((block) => (
            <li key={`${block.time}-${block.title}`} className="grid gap-1 border-l-2 border-wag-sage pl-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:border-l-0 sm:pl-0">
              <p className="text-[12px] font-medium tracking-[0.12em] text-wag-sage uppercase">
                {block.time}
              </p>
              <div>
                <p className="font-display text-[1.2rem] text-serif-ink">{block.title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-body-muted">{block.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {result.tuesday.recurring.map((item) => (
            <li key={item.cadence} className="card-panel p-4">
              <p className="text-[11px] font-medium tracking-[0.14em] text-rose-deep uppercase">
                {item.cadence}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-body-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="heading">First 90 days</h2>
        <p className="dek mt-3 max-w-2xl">
          Reward-based, age-honest, and uninterested in dominance theory. This is a
          starter plan, not a prescription.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {result.first90.map((section) => (
            <article key={section.id} className="card-panel p-6">
              <h3 className="font-display text-[1.35rem] font-medium text-serif-ink">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-body-muted">
                {section.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card-panel p-6">
      <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">{title}</h3>
      <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-body-muted">
        {items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </article>
  );
}

function CopyBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="card-panel p-6">
      <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">{title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-body-muted">{body}</p>
    </article>
  );
}
