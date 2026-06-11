/**
 * Seed / refresh the Daily Sniff source allowlist (dog_sources).
 * Idempotent: upserts on `url`, so re-running updates existing rows without
 * creating duplicates.
 *
 * Run with:
 *   npm run seed:sources
 * (loads .env.local for NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
 */
import { createClient } from "@supabase/supabase-js";
import { seedDogSources } from "../src/lib/daily-sniff/sources";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Add them to .env.local first.",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("dog_sources")
    .upsert(seedDogSources, { onConflict: "url" })
    .select("name");

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${data?.length ?? 0} sources:`);
  for (const row of data ?? []) console.log(`  - ${row.name}`);
}

main();
