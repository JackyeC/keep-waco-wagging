import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { DailySniffItem, ScoreReason } from "./types";

// Deterministic scoring. No LLM, no invented facts: we score the real fetched
// title/summary against dog + local relevance and flag sensitive stories that
// always require a human to verify before publishing.

const DOG_TERMS = [
  "dog", "dogs", "puppy", "puppies", "pup", "canine", "pet", "pets",
  "leash", "off-leash", "dog park", "dog-friendly", "adopt", "adoption",
  "shelter", "rescue", "foster", "groomer", "grooming", "vet", "veterinary",
  "kennel", "boarding", "daycare", "paw", "bark", "fetch", "trail", "patio",
];

const LOCAL_TERMS = [
  "waco", "mclennan", "woodway", "hewitt", "robinson", "china spring",
  "bellmead", "central texas", "lacy lakeview", "lorena",
];

// Stories that must never auto-draft to a confident tone. Flag for verification.
const SENSITIVE_TERMS = [
  "lost", "missing", "found dead", "attack", "attacked", "bite", "bitten",
  "mauled", "dies", "died", "death", "killed", "cruelty", "abuse", "neglect",
  "hoarding", "euthan", "parvo", "rabies", "distemper", "heat warning",
  "hot car", "dangerous dog", "seized", "investigation", "emergency", "injured",
  "shooting", "stolen",
];

const MIN_SCORE_TO_KEEP = 12;

function countMatches(haystack: string, terms: string[]): string[] {
  const found: string[] = [];
  for (const term of terms) {
    if (haystack.includes(term)) found.push(term);
  }
  return found;
}

function recencyBonus(publishedAt: string | null): number {
  if (!publishedAt) return 0;
  const ts = Date.parse(publishedAt);
  if (Number.isNaN(ts)) return 0;
  const ageDays = (Date.now() - ts) / (24 * 60 * 60 * 1000);
  if (ageDays <= 2) return 12;
  if (ageDays <= 7) return 6;
  if (ageDays <= 14) return 2;
  return 0;
}

function trustBonus(trustTier: string | undefined): number {
  if (trustTier === "official") return 10;
  if (trustTier === "standard") return 4;
  return 0;
}

export interface ScoreResult {
  score: number;
  reasons: ScoreReason[];
  topics: string[];
  sensitive: boolean;
}

export function scoreItem(
  item: Pick<DailySniffItem, "title" | "summary" | "content" | "published_at">,
  trustTier?: string,
): ScoreResult {
  const haystack = `${item.title ?? ""} ${item.summary ?? ""} ${
    item.content ?? ""
  }`.toLowerCase();

  const reasons: ScoreReason[] = [];
  const dogMatches = countMatches(haystack, DOG_TERMS);
  const localMatches = countMatches(haystack, LOCAL_TERMS);
  const sensitiveMatches = countMatches(haystack, SENSITIVE_TERMS);

  let score = 0;

  const dogPoints = Math.min(dogMatches.length, 5) * 9;
  if (dogPoints > 0) {
    score += dogPoints;
    reasons.push({ label: `Dog/pet relevance (${dogMatches.slice(0, 4).join(", ")})`, delta: dogPoints });
  }

  const localPoints = Math.min(localMatches.length, 3) * 8;
  if (localPoints > 0) {
    score += localPoints;
    reasons.push({ label: `Local to Waco area (${localMatches.slice(0, 3).join(", ")})`, delta: localPoints });
  }

  const recency = recencyBonus(item.published_at ?? null);
  if (recency > 0) {
    score += recency;
    reasons.push({ label: "Recent", delta: recency });
  }

  const trust = trustBonus(trustTier);
  if (trust > 0) {
    score += trust;
    reasons.push({ label: `Trusted source (${trustTier})`, delta: trust });
  }

  const sensitive = sensitiveMatches.length > 0;
  if (sensitive) {
    reasons.push({
      label: `Sensitive topic \u2013 needs human verification (${sensitiveMatches.slice(0, 3).join(", ")})`,
      delta: 0,
    });
  }

  const topics = Array.from(new Set([...dogMatches, ...localMatches]));

  return { score, reasons, topics, sensitive };
}

export interface ScoreSummary {
  scored: number;
  kept: number;
  skipped: number;
  sensitiveFlagged: number;
  errors: string[];
}

export async function scoreItems(): Promise<ScoreSummary> {
  const supabase = getSupabaseAdmin();
  const summary: ScoreSummary = {
    scored: 0,
    kept: 0,
    skipped: 0,
    sensitiveFlagged: 0,
    errors: [],
  };

  if (!supabase) {
    summary.errors.push("Supabase not configured (missing service role key).");
    return summary;
  }

  const { data: items, error } = await supabase
    .from("daily_sniff_items")
    .select("*, dog_sources(trust_tier)")
    .eq("status", "fetched")
    .limit(200);

  if (error) {
    summary.errors.push(`Failed to load items: ${error.message}`);
    return summary;
  }

  for (const raw of items ?? []) {
    const item = raw as DailySniffItem & { dog_sources?: { trust_tier?: string } };
    const result = scoreItem(item, item.dog_sources?.trust_tier);
    const keep = result.score >= MIN_SCORE_TO_KEEP;

    const { error: updateError } = await supabase
      .from("daily_sniff_items")
      .update({
        score: result.score,
        score_reasons: result.reasons,
        topics: result.topics,
        sensitive: result.sensitive,
        scored_at: new Date().toISOString(),
        status: keep ? "scored" : "skipped",
      })
      .eq("id", item.id);

    if (updateError) {
      summary.errors.push(`Update failed for ${item.id}: ${updateError.message}`);
      continue;
    }

    summary.scored += 1;
    if (keep) summary.kept += 1;
    else summary.skipped += 1;
    if (result.sensitive) summary.sensitiveFlagged += 1;
  }

  return summary;
}
