import { createHash } from "node:crypto";
import Parser from "rss-parser";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { DogSource } from "./types";

const parser = new Parser({ timeout: 15000 });

// Only consider items published within this window so we don't re-ingest a
// source's entire archive on the first run.
const MAX_AGE_DAYS = 21;
const MAX_ITEMS_PER_SOURCE = 25;

export interface FetchSummary {
  sourcesChecked: number;
  sourcesFailed: number;
  itemsFound: number;
  itemsInserted: number;
  errors: string[];
}

function contentHash(sourceId: string, link: string, title: string): string {
  const normalized = `${sourceId}::${link.trim().toLowerCase()}::${title
    .trim()
    .toLowerCase()}`;
  return createHash("sha256").update(normalized).digest("hex");
}

function isRecent(published: string | undefined): boolean {
  if (!published) return true; // keep undated items; scoring/age handled later
  const ts = Date.parse(published);
  if (Number.isNaN(ts)) return true;
  const ageMs = Date.now() - ts;
  return ageMs <= MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

export async function fetchSources(): Promise<FetchSummary> {
  const supabase = getSupabaseAdmin();
  const summary: FetchSummary = {
    sourcesChecked: 0,
    sourcesFailed: 0,
    itemsFound: 0,
    itemsInserted: 0,
    errors: [],
  };

  if (!supabase) {
    summary.errors.push("Supabase not configured (missing service role key).");
    return summary;
  }

  const { data: sources, error } = await supabase
    .from("dog_sources")
    .select("*")
    .eq("active", true)
    .eq("source_type", "rss")
    .not("feed_url", "is", null);

  if (error) {
    summary.errors.push(`Failed to load sources: ${error.message}`);
    return summary;
  }

  for (const source of (sources ?? []) as DogSource[]) {
    summary.sourcesChecked += 1;
    try {
      const feed = await parser.parseURL(source.feed_url as string);
      const rows = (feed.items ?? [])
        .filter((entry) => isRecent(entry.isoDate ?? entry.pubDate))
        .slice(0, MAX_ITEMS_PER_SOURCE)
        .map((entry) => {
          const link = entry.link ?? entry.guid ?? "";
          const title = (entry.title ?? "Untitled").trim();
          if (!link) return null;
          const published = entry.isoDate ?? entry.pubDate ?? null;
          return {
            source_id: source.id,
            title,
            url: link,
            author: entry.creator ?? entry.author ?? null,
            summary: (entry.contentSnippet ?? entry.summary ?? null)?.slice(0, 2000) ?? null,
            content: (entry.content ?? entry["content:encoded"] ?? null)?.slice(0, 8000) ?? null,
            image_url: entry.enclosure?.url ?? null,
            published_at: published ? new Date(published).toISOString() : null,
            content_hash: contentHash(source.id, link, title),
            status: "fetched" as const,
          };
        })
        .filter((row): row is NonNullable<typeof row> => row !== null);

      summary.itemsFound += rows.length;

      if (rows.length > 0) {
        const { data: inserted, error: insertError } = await supabase
          .from("daily_sniff_items")
          .upsert(rows, { onConflict: "content_hash", ignoreDuplicates: true })
          .select("id");
        if (insertError) {
          summary.errors.push(`Insert failed for ${source.name}: ${insertError.message}`);
        } else {
          summary.itemsInserted += inserted?.length ?? 0;
        }
      }
    } catch (err) {
      summary.sourcesFailed += 1;
      const message = err instanceof Error ? err.message : String(err);
      summary.errors.push(`${source.name}: ${message}`);
    }
  }

  return summary;
}
