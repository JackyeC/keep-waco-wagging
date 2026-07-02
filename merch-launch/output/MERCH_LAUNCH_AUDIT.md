# Keep Waco Wagging — Merch Launch Audit

**Date:** 2026-07-01  
**Scope:** Read-only audit before Printify → Shopify/Etsy launch  
**Status:** Audit complete — **no store changes made**

---

## Files reviewed

| File | Status | Notes |
|------|--------|-------|
| `source/Keep_Waco_Wagging_Printify_Brand_Reset.xlsx` | Read | All 5 sheets: Brand Reset, Current Catalog Audit, Add Next, Breed Matrix, Brand Rules |
| `source/Keep_Waco_Wagging_Brand_Book.pdf` | Present | 622 KB — visual reference; not parsed as production art |
| `source/KWW_Production_Packet.pdf` | Present | 13 MB — production spec reference; embedded images are **not** production files |
| `source/kww_etsy_listings.md` | Read fully | City tee Etsy copy; personalization promises stripped in manifest |
| `source/KWW_Etsy_Competitive_Research.pdf` | Present | Competitive reference only |
| `merch-audit/output/OWNER_REVIEW.md` | Referenced | Prior 50-product Shopify export audit |
| `src/data/merchDesignAssets.ts` | Read | All breed print files marked `missing` in repo |
| `src/data/printifyPetCatalog.ts` | Read | Pet accessories catalog IDs only — not CC 1717 launch |
| `src/lib/shopifyCatalog.ts` | Read | Public `products.json` fetch only — no Admin API |
| `.env.example` (repo root) | Read | Supabase/Resend/OpenAI — **no** Printify/Shopify Admin/Etsy vars |
| `~/Downloads/` artwork scan | Scanned | Candidate files found; none pass production spec (see below) |

---

## Current integration status

| Integration | In repo? | Credentials in `.env.local`? | Notes |
|-------------|----------|------------------------------|-------|
| **Printify API** | No live integration | No `PRINTIFY_*` | Docs/catalog references only (`printifyPetCatalog.ts`, bandana README) |
| **Shopify Admin API** | No | No `SHOPIFY_ACCESS_TOKEN` | Public storefront fetch works (`keepwacowagging.myshopify.com/products.json`) |
| **Shopify theme** | Not modified | — | Mission constraint honored |
| **Etsy API** | None | No `ETSY_*` | Etsy copy exists as markdown only |
| **Matrixify / bulk CSV publish** | None | — | Prior audit used export zip, not live publish |

**Live Shopify catalog (public API):** 84 products  
**Prior merch-audit export:** 50 products (34 live products missing from export — documented in `merch-audit/output/OWNER_REVIEW.md`)

**Printify shop / sales channels:** Cannot confirm without `PRINTIFY_API_TOKEN` + `PRINTIFY_SHOP_ID` in `merch-launch/.env`. Run `python scripts/inspect_printify_connection.py` after adding credentials.

---

## Existing product-publishing scripts

| Location | Purpose |
|----------|---------|
| `merch-audit/run_audit.py` | Read-only Shopify **export** audit (50-product zip) |
| `merch-launch/scripts/*` | **New** review-first launch pipeline (dry-run default) |
| `src/data/merchCuration.ts` | Website shop curation — not a publish pipeline |
| `source-designs/merch/README.md` | Manual Printify bandana instructions |

No existing safe Printify draft or Shopify Admin publish automation was found in the repo before this audit.

---

## Existing final artwork inventory

### In repository

| Path | Dimensions | Transparent | Production-ready? |
|------|------------|-------------|-------------------|
| `source-designs/merch/dog-moms/waco-golden-retriever-crewneck-300dpi.png` | 3300×2357 RGBA | Yes | **No** — wrong product (crewneck layout), wrong aspect for CC 1717 front print |
| `source-designs/merch/breeds/` | Empty (`.gitkeep`) | — | Missing |
| `source-designs/merch/shared/` | Empty (`.gitkeep`) | — | Missing |
| `public/brand/keep-waco-wagging-logo.png` | 1024×1024 RGB | No | Logo only — not tee art |

### Outside repo (Downloads — candidates only, not approved)

| Design | Best candidate files | Max size found | Issues |
|--------|---------------------|----------------|--------|
| Waco skyline | `waco skyline.png`, `waco skyline4.webp` | 3000×2182 | No transparency; far below 4500×5400; ALICO not verified programmatically |
| Austin skyline | `austin_skyline_lineart.png` | 1536×1024 RGBA | Undersized |
| Houston skyline | `houston_skyline_lineart.png` | 1536×1024 RGBA | Undersized |
| Dallas skyline | — | — | **No file found** |
| San Antonio skyline | — | — | **No file found** |
| French Bulldog | `KWW Frenchie.png`, `kwwfrenchie.png` | 1254×1254 RGB | White background; duplicate files |
| Golden Retriever | `kwwgolden.png`, `golden_05_transparent_whiteink*.png`, etc. | 1080×1080 RGBA (white-ink variants) | Undersized; mixed mockup composites; many duplicate variants |
| Other breeds (launch set) | Partial (`kwwgerman.png`, `corgie.png`, `KWW Chihuahua.png`) | 1254×1254 RGB | Same issues — not tee production files |

**PDF embedded images:** Production Packet and Brand Book images were **not** treated as production files.

Full machine-readable scan: `output/artwork_validation.json`

---

## Missing artwork

All **14** launch designs are **`BLOCKED_ARTWORK`** — see `MISSING_ARTWORK.md`.

---

## Duplicate artwork

| Group | Files | Action |
|-------|-------|--------|
| French Bulldog | `KWW Frenchie.png` ≈ `kwwfrenchie.png` (both 1254×1254 RGB) | Pick one source after export to production spec |
| Golden Retriever | 25+ files (`kwwgolden.png`, `golden waco.png`, `golden_0*_*.png`) | Consolidate to one light + one dark/white-ink master |
| Waco skyline | 5+ small previews (`waco skyline.png/jpeg/webp`) | Not production — need single master |

---

## Invalid dimensions

**Target:** ~4500×5400 px transparent PNG (±5% tolerance accepted by validator)

**Result:** **0 files** across all scanned paths meet the spec.

---

## Missing light or dark versions

| Product | Light art | Dark / white-ink (Pepper) |
|---------|-----------|---------------------------|
| Waco Skyline Tee | Missing validated | Pepper curated — **no validated white-line art** |
| French Bulldog Tee | Missing validated | Pepper not curated (OK) |
| Golden Retriever Tee | 1 undersized candidate | 16 undersized dark/white-ink candidates — none production-ready |
| All other launch designs | Missing | N/A or not curated |

---

## Existing Shopify products that could conflict

New proposed handles (test batch):

- `keep-waco-wagging-waco-skyline-tee`
- `keep-waco-wagging-french-bulldog-tee`
- `keep-waco-wagging-golden-retriever-tee`

**Related live products (different handles, same customer search space):**

| Live handle | Title |
|-------------|-------|
| `waco-skyline-t-shirt-waco-dog-dad-graphic-tee` | Waco Skyline T-Shirt — 'Waco Dog Dad' Graphic Tee |
| `keep-waco-wagging-t-shirt-waco-landmark-dog-tee` | Keep Waco Wagging T-Shirt — Waco Landmark Dog Tee |
| `keep-waco-wagging-frenchie-edition-1` | Keep Waco Wagging Frenchie Edition |
| `keep-waco-wagging-golden-retriever-edition-1` | Keep Waco Wagging Golden Retriever Edition |
| `keep-waco-wagging-frenchie-hoodie` | Keep Waco Wagging — Frenchie Hoodie |
| `keep-waco-wagging-golden-retriever-hoodie` | Keep Waco Wagging — Golden Retriever Hoodie |

Scripts will **not overwrite** existing products. Owner must decide whether to hide/redirect legacy editions or run parallel SKUs.

---

## Existing Etsy listings that could conflict

No Etsy API access. `kww_etsy_listings.md` describes city tees with dog-name personalization — **blocked** until workflow approved (`personalization_ready=NO`, `personalization_status=BLOCKED_WORKFLOW` in manifest).

---

## Required credentials (names only)

Add to `merch-launch/.env` (copy from `.env.example`):

```
PRINTIFY_API_TOKEN=
PRINTIFY_SHOP_ID=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_ACCESS_TOKEN=
ETSY_SHOP_ID=
ETSY_API_KEY=
ETSY_SHARED_SECRET=
ETSY_REFRESH_TOKEN=
DRY_RUN=true
ARTWORK_SEARCH_PATHS=
```

Repo root `.env.local` currently has Supabase/Resend/OpenAI only — **no merch API tokens**.

---

## Personalization workflow (blocked)

Production packet and Etsy doc mention dog-name personalization. **Not activated.**

| Question | Status |
|----------|--------|
| How customer submits name | **Undocumented** |
| Transfer into artwork | **Undocumented** |
| Spelling approval | **Undocumented** |
| Manual editing per order | **Undocumented** |
| File path to Printify | **Undocumented** |
| Production hold until art ready | **Undocumented** |
| Turnaround / blank-name behavior | **Undocumented** |
| Character limit / refund policy | **Undocumented** |

Manifest fields: `personalization_ready=NO`, `personalization_status=BLOCKED_WORKFLOW`. Live-facing copy omits personalization promises.

---

## Pricing / margin preview (estimated)

Retail default: **$34.00** (within $32–$36 band)  
Estimated Printify base (S–XL): **$11.50–$12.25** → **~64% margin**  
Estimated **3XL** base: **$16.75** → **50.7% margin** (**below 55% target**)

See `output/margin-report.csv`. Rerun `calculate_margins.py` after Printify provider selection for live costs.

**Recommendation:** Price 3XL at **$38–$40** or accept 50% on extended sizes intentionally.

---

## Recommended implementation plan

1. **Owner:** Confirm canonical production PNG paths for test batch (light + dark if Pepper enabled).
2. **Owner:** Copy approved art into `merch-launch/artwork/{product_id}/` (gitignored if large) or set `ARTWORK_SEARCH_PATHS`.
3. **Owner:** Add Printify credentials → run `inspect_printify_connection.py` → confirm blueprint **706** + print provider.
4. Run `validate_artwork.py` until test batch shows `artwork_status=APPROVED`.
5. Produce mockups (flat-lay, close-up, on-model, color grid, size chart, care, brand card).
6. Owner sets `qa_status`, `mockup_status`, `publish_status` to `APPROVED` in manifest.
7. `create_printify_drafts.py --create-drafts` with `DRY_RUN=false` — **3 products only**.
8. Review `TEST_BATCH_REVIEW.md` → approve before remaining 11 products.
9. Export copy → Shopify/Etsy drafts via API (never overwrite live listings).
10. Publish only with `--publish` and all approval flags.

---

## What can safely be automated

- Source file and spreadsheet validation
- Artwork dimension/transparency scanning
- Manifest validation (Etsy title/tag limits, handles, margins)
- Margin calculation from Printify catalog pricing (once API connected)
- Shopify public duplicate/conflict detection
- Copy export JSON for Shopify and Etsy
- Idempotent Printify draft creation (when art + credentials approved)
- Structured logging with secret redaction

---

## What still requires owner approval

- Which PNG files are **final production art**
- ALICO Building visual QA (human review)
- Printify print provider selection for CC 1717
- Pepper color enablement (requires white-line art + contrast QA)
- 3XL pricing vs margin target
- Legacy Shopify edition strategy (hide vs replace vs parallel)
- Personalization workflow (entire pipeline)
- Mockup photography/style sign-off
- Any `--publish` to Shopify or Etsy

---

## Artifacts produced

| File | Description |
|------|-------------|
| `data/products-master.csv` | 28 rows (14 designs × Shopify + Etsy) |
| `output/MISSING_ARTWORK.md` | Per-design artwork gaps |
| `output/TEST_BATCH_REVIEW.md` | Test batch readiness |
| `output/margin-report.csv` | Margin analysis |
| `output/artwork_validation.json` | Full artwork scan |
| `output/sales_channels.json` | Shopify public + credential flags |
| `output/shopify_copy_export.json` | Draft Shopify copy |
| `output/etsy_copy_export.json` | Draft Etsy copy |
| `scripts/*` | Validation and publish pipeline |

**Printify drafts:** Not created (blocked: no credentials, no approved artwork).
