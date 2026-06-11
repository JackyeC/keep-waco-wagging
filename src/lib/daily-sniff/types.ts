// Shared types for the KWW Daily Sniff content desk.

export type SourceType = "rss" | "site" | "api";
export type TrustTier = "official" | "standard" | "community";
export type SourceCategory =
  | "events"
  | "adoption"
  | "business"
  | "news"
  | "venue_policy";

export interface DogSource {
  id: string;
  created_at: string;
  name: string;
  url: string;
  feed_url: string | null;
  source_type: SourceType;
  category: SourceCategory | null;
  region: string | null;
  publisher: string | null;
  trust_tier: TrustTier;
  active: boolean;
  notes: string | null;
}

/** A source as defined in the seed allowlist (no DB-generated fields). */
export type SeedSource = Omit<DogSource, "id" | "created_at">;

export type ItemStatus = "fetched" | "scored" | "drafted" | "skipped";

export interface DailySniffItem {
  id: string;
  created_at: string;
  source_id: string | null;
  title: string;
  url: string;
  author: string | null;
  summary: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
  fetched_at: string | null;
  content_hash: string | null;
  score: number | null;
  score_reasons: ScoreReason[] | null;
  topics: string[] | null;
  sensitive: boolean;
  scored_at: string | null;
  status: ItemStatus;
}

export interface ScoreReason {
  label: string;
  delta: number;
}

export type BriefStatus =
  | "draft"
  | "needs_verification"
  | "approved"
  | "rejected"
  | "archived";

export interface BriefSource {
  title: string;
  url: string;
  publisher?: string | null;
}

export interface DailySniffBrief {
  id: string;
  created_at: string;
  updated_at: string;
  item_id: string | null;
  headline: string;
  dek: string | null;
  category: string | null;
  status: BriefStatus;
  needs_verification: boolean;
  verification_notes: string | null;
  sources: BriefSource[] | null;
  reviewer: string | null;
  reviewed_at: string | null;
}

export type BlockType =
  | "heading"
  | "paragraph"
  | "list"
  | "callout"
  | "quote"
  | "source_note";

export interface ContentBlock {
  id: string;
  brief_id: string;
  position: number;
  block_type: BlockType;
  content: string | null;
  created_at: string;
  updated_at: string;
}

/** A content block before it has been persisted. */
export type DraftBlock = Pick<ContentBlock, "position" | "block_type" | "content">;
