"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { allDogProfiles } from "@/data/dog-match";
import type { DogProfile, SearchHit } from "@/data/dog-match/types";
import { popularityLabel } from "@/lib/dog-match/score";
import { searchDogs } from "@/lib/dog-match/search";
import { cn } from "@/lib/utils";

export function BreedSearch({
  onSelect,
}: {
  onSelect?: (dog: DogProfile) => void;
}) {
  const [query, setQuery] = useState("");
  const hit: SearchHit | null = useMemo(() => searchDogs(query), [query]);

  return (
    <div>
      <label className="eyebrow" htmlFor="dog-match-search">
        Look up a breed or mix
      </label>
      <div className="relative mt-2">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-label-muted"
          aria-hidden
        />
        <input
          id="dog-match-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Frenchie, yorkie, pittie, doodle…"
          className="w-full rounded-full border border-input-border bg-soft-cream py-3 pr-4 pl-10 text-sm font-light text-bark outline-none focus:border-wag-sage"
        />
      </div>
      {hit?.notice && (
        <p className="mt-3 text-[14px] leading-relaxed text-body-muted">{hit.notice}</p>
      )}
      {query.trim() && !hit && (
        <p className="mt-3 text-sm text-body-muted">
          No match for that name yet. Try a nickname, or take the quiz.
        </p>
      )}
      {hit && (
        <ul className="mt-4 grid gap-3">
          {hit.dogs.map((dog) => (
            <li key={dog.slug}>
              <button
                type="button"
                onClick={() => onSelect?.(dog)}
                className={cn(
                  "card-panel w-full p-4 text-left transition-colors hover:border-wag-sage",
                  onSelect && "cursor-pointer",
                )}
              >
                <p className="font-display text-[1.25rem] font-medium text-serif-ink">
                  {dog.name}
                </p>
                <p className="mt-1 text-[12px] tracking-[0.08em] text-label-muted uppercase">
                  {popularityLabel(dog)}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-body-muted">
                  {dog.notes}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {!query.trim() && (
        <p className="mt-3 text-[13px] text-label-muted">
          {allDogProfiles.length} profiles — AKC Top 100, new 2026 breeds, and common mixes.
        </p>
      )}
    </div>
  );
}
