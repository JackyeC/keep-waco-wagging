import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { DailySniffItem, DraftBlock } from "./types";

// Drafting is intentionally fact-safe: we only ever restate the source's own
// title/summary, clearly attributed, and attach a verification checklist. We
// never generate confident claims about times, prices, policies, or outcomes.
// A human edits + approves in the admin queue before anything is published.

const MAX_DRAFTS_PER_RUN = 12;

function buildBlocks(
  item: DailySniffItem,
  publisher: string | null,
): DraftBlock[] {
  const blocks: DraftBlock[] = [];
  let pos = 0;

  blocks.push({ position: pos++, block_type: "heading", content: item.title });

  const attribution = publisher ? `According to ${publisher}` : "According to the source";
  const summary = (item.summary ?? item.content ?? "").trim();
  if (summary) {
    blocks.push({
      position: pos++,
      block_type: "paragraph",
      content: `${attribution}: ${summary}`,
    });
  } else {
    blocks.push({
      position: pos++,
      block_type: "paragraph",
      content: `${attribution}, "${item.title}". Open the source to pull the details before writing this up.`,
    });
  }

  if (item.sensitive) {
    blocks.push({
      position: pos++,
      block_type: "callout",
      content:
        "Sensitive story \u2014 do NOT publish without confirming facts against the official source. Verify names, dates, locations, and outcomes. Use a careful, non-sensational tone.",
    });
  }

  blocks.push({
    position: pos++,
    block_type: "callout",
    content:
      "Verify before publishing: 1) Confirm details against the original source. 2) For events/venues, prioritize the official venue or city policy. 3) Check the date \u2014 don't promote stale or closed items. 4) Add KWW's local angle for Waco dog parents.",
  });

  blocks.push({
    position: pos++,
    block_type: "source_note",
    content: `Source: ${publisher ?? "(unknown)"} \u2014 ${item.url}`,
  });

  return blocks;
}

export interface DraftSummary {
  drafted: number;
  needsVerification: number;
  errors: string[];
  briefIds: string[];
}

export async function draftBriefs(): Promise<DraftSummary> {
  const supabase = getSupabaseAdmin();
  const summary: DraftSummary = {
    drafted: 0,
    needsVerification: 0,
    errors: [],
    briefIds: [],
  };

  if (!supabase) {
    summary.errors.push("Supabase not configured (missing service role key).");
    return summary;
  }

  const { data: items, error } = await supabase
    .from("daily_sniff_items")
    .select("*, dog_sources(publisher, category)")
    .eq("status", "scored")
    .order("score", { ascending: false })
    .limit(MAX_DRAFTS_PER_RUN);

  if (error) {
    summary.errors.push(`Failed to load scored items: ${error.message}`);
    return summary;
  }

  for (const raw of items ?? []) {
    const item = raw as DailySniffItem & {
      dog_sources?: { publisher?: string | null; category?: string | null };
    };
    const publisher = item.dog_sources?.publisher ?? null;

    const { data: brief, error: briefError } = await supabase
      .from("daily_sniff_briefs")
      .insert({
        item_id: item.id,
        headline: item.title,
        dek: (item.summary ?? "").slice(0, 280) || null,
        category: item.dog_sources?.category ?? null,
        status: item.sensitive ? "needs_verification" : "draft",
        needs_verification: item.sensitive,
        sources: [{ title: item.title, url: item.url, publisher }],
      })
      .select("id")
      .single();

    if (briefError || !brief) {
      summary.errors.push(`Brief insert failed for ${item.id}: ${briefError?.message}`);
      continue;
    }

    const blocks = buildBlocks(item, publisher).map((b) => ({
      ...b,
      brief_id: brief.id as string,
    }));

    const { error: blocksError } = await supabase
      .from("daily_sniff_content_blocks")
      .insert(blocks);

    if (blocksError) {
      summary.errors.push(`Blocks insert failed for brief ${brief.id}: ${blocksError.message}`);
      continue;
    }

    await supabase
      .from("daily_sniff_items")
      .update({ status: "drafted" })
      .eq("id", item.id);

    summary.drafted += 1;
    summary.briefIds.push(brief.id as string);
    if (item.sensitive) summary.needsVerification += 1;
  }

  return summary;
}
