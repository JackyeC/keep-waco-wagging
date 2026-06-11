-- Supabase schema for Keep Waco Wagging lead capture.
-- Uses server-side inserts with SUPABASE_SERVICE_ROLE_KEY. Do not create public
-- read policies for these tables.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text,
  email text not null,
  dog_name text,
  neighborhood text,
  interests text[],
  source text default 'keep_waco_wagging',
  consent boolean default true
);

create table if not exists directory_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  submitter_name text,
  submitter_email text,
  place_name text not null,
  category text,
  address text,
  website text,
  phone text,
  neighborhood text,
  dog_policy text,
  patio_details text,
  water_bowls text,
  shade text,
  best_time_to_visit text,
  notes text,
  owner_or_manager boolean default false,
  status text default 'pending'
);

create table if not exists sponsor_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  business_name text not null,
  contact_name text,
  email text not null,
  phone text,
  website text,
  sponsor_type text,
  notes text,
  status text default 'new'
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text not null,
  interest text,
  message text not null,
  status text default 'new'
);

alter table leads enable row level security;
alter table directory_submissions enable row level security;
alter table sponsor_inquiries enable row level security;
alter table contact_messages enable row level security;

-- No public policies are created. The Next.js API routes insert with the
-- service-role key on the server only.
