import type { SeedSource } from "./types";

// Approved-source allowlist for the Daily Sniff fetcher.
// ONLY sources in this list (and active in the dog_sources table) are ever
// fetched. We never scrape restricted platforms (Facebook, Instagram,
// Nextdoor, etc.) or anything behind a login. Sources without a known public
// feed are stored as `site` (not auto-fetched) so they can be tracked/added by
// hand without producing errors. Refine feed_url values in the admin as you
// confirm them.
export const seedDogSources: SeedSource[] = [
  // --- Official venue / city policy (highest trust) ---
  {
    name: "City of Waco \u2013 News",
    url: "https://www.waco-texas.com/News",
    feed_url: null,
    source_type: "site",
    category: "venue_policy",
    region: "waco",
    publisher: "City of Waco",
    trust_tier: "official",
    active: true,
    notes: "Official city news \u2013 park rules, leash ordinances, closures. Verify if an RSS feed exists.",
  },
  {
    name: "Waco Parks & Recreation",
    url: "https://www.waco-texas.com/Departments/Parks-Recreation",
    feed_url: null,
    source_type: "site",
    category: "venue_policy",
    region: "waco",
    publisher: "City of Waco",
    trust_tier: "official",
    active: true,
    notes: "Dog parks, trails, off-leash areas, seasonal closures.",
  },
  // --- Adoption / shelters / rescues ---
  {
    name: "Humane Society of Central Texas",
    url: "https://www.humanesocietycentraltexas.org/",
    feed_url: null,
    source_type: "site",
    category: "adoption",
    region: "waco",
    publisher: "Humane Society of Central Texas",
    trust_tier: "official",
    active: true,
    notes: "Adoptable dogs, adoption events, volunteer/foster news.",
  },
  {
    name: "Fuzzy Friends Rescue",
    url: "https://www.fuzzyfriendsrescue.com/",
    feed_url: null,
    source_type: "site",
    category: "adoption",
    region: "waco",
    publisher: "Fuzzy Friends Rescue",
    trust_tier: "standard",
    active: true,
    notes: "Local Waco rescue \u2013 adoption events and fundraisers.",
  },
  // --- Local news (verify feed URLs; degrade gracefully if missing) ---
  {
    name: "KWTX \u2013 Waco News",
    url: "https://www.kwtx.com/",
    feed_url: "https://www.kwtx.com/arc/outboundfeeds/rss/?outputType=xml",
    source_type: "rss",
    category: "news",
    region: "waco",
    publisher: "KWTX",
    trust_tier: "standard",
    active: true,
    notes: "General local news feed \u2013 scored for dog/pet relevance before drafting.",
  },
  {
    name: "KXXV \u2013 Central Texas News",
    url: "https://www.kxxv.com/",
    feed_url: "https://www.kxxv.com/index.rss",
    source_type: "rss",
    category: "news",
    region: "waco",
    publisher: "KXXV",
    trust_tier: "standard",
    active: true,
    notes: "General local news feed \u2013 scored for dog/pet relevance before drafting.",
  },
  // --- Events / things to do ---
  {
    name: "Visit Waco \u2013 Events",
    url: "https://www.wacoheartoftexas.com/events/",
    feed_url: null,
    source_type: "site",
    category: "events",
    region: "waco",
    publisher: "Visit Waco",
    trust_tier: "official",
    active: true,
    notes: "Tourism events calendar \u2013 filter for dog-friendly / outdoor events.",
  },
];
