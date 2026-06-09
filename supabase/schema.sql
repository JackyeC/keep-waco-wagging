-- Supabase schema for Keep Waco Wagging lead capture.
-- Run in the Supabase SQL editor or via `supabase db push`.

create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',
  created_at timestamptz default now()
);

create table if not exists business_listings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  social text,
  category text,
  address text,
  dogs_allowed text,
  dog_areas text,
  dog_rules text,
  water_bowls text,
  shade text,
  best_time text,
  sponsor text,
  notes text,
  source text default 'website',
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists pet_submissions (
  id uuid primary key default gen_random_uuid(),
  pet_name text not null,
  breed text,
  age_or_stage text,
  neighborhood text,
  bio text,
  owner_name text not null,
  email text not null,
  photo_filename text,
  source text default 'website',
  status text default 'pending',
  created_at timestamptz default now()
);

alter table newsletter_signups enable row level security;
alter table business_listings enable row level security;
alter table pet_submissions enable row level security;

-- Service role bypasses RLS; no public policies needed for server-only inserts.
