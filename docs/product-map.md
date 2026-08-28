# Keep Waco Wagging — product map

This is a renovation of the existing site, not a rebuild. Written after inspecting
the current App Router, data files, routes, and brand properties.

Last reviewed against the live codebase on this branch.

---

## KEEP

Working pieces that already support the strategy. Leave them largely intact.

- **Routes and SEO landings:** `/`, `/dog-friendly-waco`, `/dog-friendly-waco/[slug]`,
  `/dog-boarding-waco-tx`, `/dog-daycare-waco-tx`, `/pet-care`, `/training`,
  `/summer-daycare`, `/pet-care/weddings-events`, `/platinum-scoops`, `/book`,
  `/blog`, `/blog/[slug]`, `/approved`, `/wag-watch`, `/weekend`, `/shop`,
  `/wagclub`, `/about`, `/gear-guide`. Existing URLs stay. Redirects in
  `next.config.ts` stay.
- **Dog-Friendly Waco directory** (`src/data/directory.ts`) — real listings with
  sources, last-verified dates, and “verify before visiting” honesty. Explore vs.
  resource split is the right GO / CARE cut.
- **Keep Waco Wagging Approved** (`src/data/approvedListings.ts`) — evaluation
  model, pending vs. evaluated, sample listings clearly labeled, businesses cannot
  buy approval. Do not assign real verdicts until evidence exists.
- **Wag Watch** — sourced, dated, draft-safe. Heat-safety and Bridge Street
  concert briefs are real published items.
- **Wag Club email capture** (`/api/leads`, homepage + `/wagclub`) — keep the
  list; do not force a paid membership.
- **Shop / Shopify cart**, merch curation, gear guide, affiliate disclosure.
- **Platinum Scoops booking, Rover referral, Jobber booking URL** — keep, but
  do not let them own the homepage.
- **Lead forms, sitemap, robots, JSON-LD, Vercel Analytics.**
- **Design system** (sage / rose / cream, Cormorant + Jost). Evolve copy and
  hierarchy first, not tokens.
- **Photography of real dogs and people** already in `/public/pictures`.

---

## REFINE

Useful, but copy, hierarchy, or positioning is off.

- **Homepage** currently leads with merch (“Shop the collection”,
  “Cute shirts…”). It should lead with the brand promise and user jobs.
- **Primary nav** currently starts with Shop. Reorder around dog-parent jobs
  without inventing GO / CARE / KNOW labels in the chrome.
- **Brand language in `site.ts`** still describes KWW as “the community and
  pet-care home of Platinum Scoops.” Keep the relationship; stop making it the
  product definition.
- **Wag Club copy** is drop/perk-first. Shift to useful local updates first.
- **Weekend page** is evergreen ideas, not yet a recognizable “Waco Dog Weekend.”
- **Directory detail “What to know before you go”** already exists; it hides
  `unknown` fields. Show the missing state so honesty is visible.
- **About** is founder/service-first. Lead with the mission, then Jackye and Todd.
- **Dog Care hub** is Platinum Scoops only. Keep the services; add a door to
  other local resources in the directory.
- **Announcement bar** is merch-only.

---

## CONNECT

Built pieces that currently feel like separate products.

| Piece | Lives at | Should feel like |
| --- | --- | --- |
| Directory | `/dog-friendly-waco` | GO — where can we go together? |
| Dog Care + booking | `/dog-care`, `/book` | CARE — who can I trust? |
| Approved | `/approved` | Trust layer on GO (and later CARE) |
| Wag Watch | `/wag-watch` | KNOW — what changed? |
| Guides / blog | `/blog` | KNOW — what should I know? |
| Weekend | `/weekend` | BELONG + GO — what can we do now? |
| Wag Club | `/#wag-club`, `/wagclub` | BELONG — stay in the loop |
| Shop / The Drop | `/shop`, `/shop#featured` | SHOP — worth buying, not the homepage |
| Platinum Scoops | `/platinum-scoops` | One trusted CARE option, not the brand |

The homepage, footer, and New Dog in Waco hub are the main connection surfaces.

---

## ADD (now)

Genuinely missing, and cheap to add without inventing data.

- **Homepage pathways** using the unused `ChoosePath` + `WagWatchPreview`.
- **Recognizable Before You Go** pattern on directory listings (same fields;
  clearer framing; unknown stays unknown).
- **Waco Dog Weekend** framing on the existing `/weekend` URL.
- **New Dog in Waco** evergreen hub at `/new-dog-in-waco` — links existing
  directory, guides, Wag Watch, and care pages. No invented businesses.
- **Editorial franchise map** so recurring series have a name without forcing
  identical post templates.
- **Would We Take Our Dog?** vernacular mapped onto existing Approved verdicts
  (only on evaluated listings, including labeled samples).

## ADD (not this pass)

Missing, but wait for more verified content.

- Real Keep Waco Wagging Approved evaluations of live businesses.
- Dated weekly Waco Dog Weekend editions (still evergreen until we can curate).
- Editorial “The Drop” as a discovery feed (shop drop stays on `/shop`).
- Neighborhood / shade / water / temperament filters on the live directory
  (most of those fields are still `unknown`).
- Paid Wag Club, enhanced profiles, ads beyond existing sponsor slots.

---

## LATER

Interesting, deliberately not built.

- Paid membership, perks marketplace, members-only events.
- Dozens of directory filters (dog traffic, pavement, indoor/outdoor, etc.).
- Thin SEO doorway pages for every keyword in the brief.
- Affiliate-product farm.
- Wag Watch CMS / daily-sniff public publishing automation (admin pipeline
  already exists; do not auto-publish invented briefs).
- Parallel listing databases. Extend `DogDirectoryListing` and
  `ApprovedListing`; do not create a third system.
- Replacing the design system or photography set.
- City-clone expansion.

---

## Information architecture

Do **not** put GO / CARE / KNOW / BELONG / SHOP in the visible nav. Those are
the jobs underneath.

**Primary nav (now)**

1. Dog-Friendly Waco — GO
2. Dog Care — CARE (existing service dropdown)
3. Wag Watch — KNOW (timely)
4. Weekend — BELONG / GO (this week)
5. Shop — SHOP
6. Wag Club — BELONG
7. Book — CARE conversion (existing)

**Footer**

- Explore: directory, Approved, weekend, Wag Watch, New Dog in Waco, guides
- Care: existing service landings + book
- Brand: shop, Wag Club, about, contact

**Evergreen hubs**

- `/dog-friendly-waco` — places
- `/dog-care` — KWW / Platinum Scoops care
- `/new-dog-in-waco` — “everything I wish someone handed me”
- `/approved` — trust standard
- `/blog` — guides, grouped by existing categories plus franchise labels

---

## Search / filters (smallest useful now)

The live directory already filters by **search, category, and neighborhood**.
Keep that.

Do **not** add shade / water / puppy / reactive toggles to the live directory
yet. Those fields exist on the older `Listing` type and on Approved listings,
but on real `directoryListings` they are almost all `unknown`. Filtering on
them would hide nearly everything or imply facts we do not have.

**Next:** fill shade / water / best-time on a handful of frequently visited
places, then expose those two filters.

**Later:** temperament, dog traffic, crowd, KWW status, indoor/outdoor.

---

## Data model

Prefer extending existing shapes.

| Concept | Existing home | Note |
| --- | --- | --- |
| Places | `DogDirectoryListing` | Real Waco data |
| Legacy demo listings | `Listing` in `listings.ts` | Placeholder / fake names — do not promote |
| Approval | `ApprovedListing` | Pending default; samples labeled |
| Events / weekend | `WeekendBlock`, yappy hours, directory Events | Curation, not a scrape |
| Wag Watch | `WagWatchItem` | draft / expiresAt already correct |
| Guides | `BlogPost` + `guideContent` | Add optional `franchise` only |
| Shop | merch + Shopify catalog | Unchanged |
| Leads | Supabase tables in `supabase/schema.sql` | No schema change needed |

Before You Go is a **view** of directory fields (`dogPolicy`, `patioDetails`,
`waterBowls`, `shade`, `bestTimeToVisit`, `notes`), not a new table.

Would We Take Our Dog is a **label** on Approved `status`, not a second rating.

---

## Keep Waco Wagging Approved — first version

**Means:** Keep Waco Wagging had enough evidence to recommend (or caution
against) this outing for dog parents. Someone thought about whether it actually
works with a dog — not just whether dogs are allowed.

**Does not mean:** the business paid us; the listing is in the directory; dogs
are allowed; every dog will enjoy it; we personally visited (visit is recorded
separately as `personallyVisited`).

**Verdicts (evaluated only)**

| Status | Would we take our dog? | Meaning |
| --- | --- | --- |
| Approved | Yes | We would recommend it when conditions are right |
| Cautions | Yes, but… | Allowed, with real limits worth knowing |
| Not recommended | Probably not for our dogs | Allowed is not the same as a good idea |

Pending stays **Not Yet Evaluated**. No seal.

**Criteria (already in the model):** welcome, safety, comfort (including
Central Texas heat), dog basics (water, potty, waste), dog-parent experience,
extra wag. Unknown stays unknown.

**Evidence:** `verified` / `reported` / `unknown`. Community reports are leads,
never facts. Sources stay attached.

**Cautions:** first-class (`cautions`, `heatWarning`, `crowdWarning`,
`notIdealFor`). Nuance over binary scores.

**Updates:** `researchedDate` / `verifiedDate`. Wag Watch can flag policy
changes that should reopen an evaluation.

**Corrections:** businesses can suggest factual updates via `/submit-a-place`.
That does not grant or remove approval.

**Sponsorship:** ads, featured directory placement, and camp sponsors are
separate. Approval cannot be bought. This is already stated on `/approved`.

**Now:** do not evaluate real businesses. Keep sample reports labeled.

---

## First 90 days — “Your dog’s best Waco”

Editorial filter: every piece should help someone give their dog a better life
here. Recurring franchises (templates, not identical layouts):

1. **Would We Take Our Dog?** — place/event evaluations. Lives with Approved.
2. **Before You Go** — practical outing notes. Lives on directory details.
3. **Waco Dog Weekend** — `/weekend` plus a future dated edition.
4. **Wag Watch** — what changed.
5. **The Drop** — personality / finds. Shop drop stays until we have editorial
   finds worth publishing.
6. **New Dog in Waco** — evergreen hub, then supporting guides.

Reuse one strong piece across site, newsletter, and social — adapted, not
copy-pasted.

Do not invent businesses, ratings, hours, or policies to fill the calendar.
