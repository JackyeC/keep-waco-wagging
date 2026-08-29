import {
  DOODLE_SLUGS,
  PIT_BULL_NOTICE,
  PIT_BULL_SLUGS,
  SEARCH_ALIASES,
  getDogBySlug,
  normalizeSearch,
} from "@/data/dog-match";
import { allDogProfiles } from "@/data/dog-match";
import type { DogProfile, SearchHit } from "@/data/dog-match/types";

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i += 1) matrix[i]![0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0]![j] = j;
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1,
        matrix[i]![j - 1]! + 1,
        matrix[i - 1]![j - 1]! + cost,
      );
    }
  }
  return matrix[a.length]![b.length]!;
}

function dogsFromSlugs(slugs: readonly string[]): DogProfile[] {
  return slugs
    .map((slug) => getDogBySlug(slug))
    .filter((dog): dog is DogProfile => Boolean(dog));
}

function fuzzyMatches(query: string): DogProfile[] {
  const q = normalizeSearch(query);
  if (q.length < 3) return [];
  const hits: { dog: DogProfile; score: number }[] = [];
  for (const dog of allDogProfiles) {
    const names = [dog.name, dog.slug.replace(/-/g, " "), ...dog.aliases].map(normalizeSearch);
    let best = 99;
    for (const name of names) {
      if (name.includes(q) || q.includes(name)) {
        best = 0;
        break;
      }
      for (const token of name.split(" ")) {
        if (token.length >= 4 && q.length >= 4) {
          best = Math.min(best, levenshtein(q, token));
        }
      }
      best = Math.min(best, levenshtein(q, name));
    }
    const allowed = q.length <= 5 ? 1 : 2;
    if (best <= allowed) hits.push({ dog, score: best });
  }
  hits.sort((a, b) => a.score - b.score || a.dog.slug.localeCompare(b.dog.slug));
  return hits.slice(0, 8).map((hit) => hit.dog);
}

export function searchDogs(rawQuery: string): SearchHit | null {
  const query = normalizeSearch(rawQuery);
  if (!query) return null;

  const alias = SEARCH_ALIASES[query];
  if (alias?.kind === "pit-bull-umbrella") {
    return {
      kind: "pit-bull-umbrella",
      query: rawQuery,
      dogs: dogsFromSlugs(PIT_BULL_SLUGS),
      notice: PIT_BULL_NOTICE,
    };
  }
  if (alias?.kind === "doodle-family") {
    return {
      kind: "alias-group",
      query: rawQuery,
      dogs: dogsFromSlugs(DOODLE_SLUGS),
      notice:
        "Doodle mixes are not standardized. Coat, size, and energy can vary widely — even in the same litter.",
    };
  }
  if (alias?.kind === "slugs") {
    const dogs = dogsFromSlugs(alias.slugs);
    return {
      kind: dogs[0]?.type === "common-mix" ? "mix" : dogs.length > 1 ? "alias-group" : "breed",
      query: rawQuery,
      dogs,
    };
  }

  const exact = allDogProfiles.filter((dog) => {
    const hay = [dog.name, dog.slug.replace(/-/g, " "), ...dog.aliases].map(normalizeSearch);
    return hay.some((name) => name === query);
  });
  if (exact.length) {
    return {
      kind: exact[0]?.type === "common-mix" ? "mix" : "breed",
      query: rawQuery,
      dogs: exact,
    };
  }

  const contains = allDogProfiles.filter((dog) => {
    const hay = [dog.name, dog.slug.replace(/-/g, " "), ...dog.aliases].map(normalizeSearch);
    return hay.some((name) => name.includes(query) || query.includes(name));
  });
  if (contains.length) {
    return {
      kind: contains[0]?.type === "common-mix" ? "mix" : "breed",
      query: rawQuery,
      dogs: contains.slice(0, 8),
    };
  }

  const fuzzy = fuzzyMatches(query);
  if (!fuzzy.length) return null;
  return {
    kind: fuzzy[0]?.type === "common-mix" ? "mix" : "breed",
    query: rawQuery,
    dogs: fuzzy,
  };
}
