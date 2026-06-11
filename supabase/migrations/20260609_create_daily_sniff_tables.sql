-- KWW Daily Sniff: draft-first local content desk.
-- All tables are server-only (RLS on, no public policies). The cron routes and
-- admin queue talk to these tables with SUPABASE_SERVICE_ROLE_KEY.

-- Approved sources allowlist. Only sources listed here are ever fetched.
create table if not exists dog_sources (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  url text not null unique,
  feed_url text,
  source_type text not null default 'rss',   -- rss | site | api
  category text,                              -- events | adoption | business | news | venue_policy
  region text default 'waco',
  publisher text,
  trust_tier text not null default 'standard', -- official | standard | community
  active boolean not null default true,
  notes text
);

-- Raw fetched items (one row per article/post discovered from a source).
create table if not exists daily_sniff_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  source_id uuid references dog_sources(id) on delete set null,
  title text not null,
  url text not null,
  author text,
  summary text,
  content text,
  image_url text,
  published_at timestamptz,
  fetched_at timestamptz default now(),
  content_hash text unique,                   -- dedupe key (source + normalized url/title)
  -- scoring fields populated by the score step
  score numeric,
  score_reasons jsonb,
  topics text[],
  sensitive boolean not null default false,   -- flags stories that always need human verification
  scored_at timestamptz,
  status text not null default 'fetched'      -- fetched | scored | drafted | skipped
);

-- Briefs: one draft per promising item, surfaced in the admin review queue.
create table if not exists daily_sniff_briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  item_id uuid references daily_sniff_items(id) on delete set null,
  headline text not null,
  dek text,
  category text,
  status text not null default 'draft',       -- draft | needs_verification | approved | rejected | archived
  needs_verification boolean not null default false,
  verification_notes text,
  sources jsonb,                              -- [{ title, url, publisher }]
  reviewer text,
  reviewed_at timestamptz
);

-- Editable content blocks belonging to a brief.
create table if not exists daily_sniff_content_blocks (
  id uuid primary key default gen_random_uuid(),
  brief_id uuid references daily_sniff_briefs(id) on delete cascade,
  position int not null default 0,
  block_type text not null default 'paragraph', -- heading | paragraph | list | callout | quote | source_note
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_ds_items_status on daily_sniff_items(status);
create index if not exists idx_ds_items_score on daily_sniff_items(score desc);
create index if not exists idx_ds_briefs_status on daily_sniff_briefs(status);
create index if not exists idx_ds_blocks_brief on daily_sniff_content_blocks(brief_id, position);

alter table dog_sources enable row level security;
alter table daily_sniff_items enable row level security;
alter table daily_sniff_briefs enable row level security;
alter table daily_sniff_content_blocks enable row level security;

-- No public policies. Access is server-side via the service-role key only.
