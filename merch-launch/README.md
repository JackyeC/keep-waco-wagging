# Keep Waco Wagging — Merch Launch Kit

Review-first pipeline to prepare **14 Comfort Colors 1717 tees** (5 city + 9 breed) for Printify → Shopify + Etsy.

**Default mode:** dry-run. No live store changes unless explicitly approved.

---

## Quick start

```bash
cd merch-launch
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add API tokens locally — never commit

# Full validation pipeline
python scripts/generate_launch_report.py
```

Read outputs:

- `output/MERCH_LAUNCH_AUDIT.md` — integration + artwork audit
- `output/MISSING_ARTWORK.md` — blocked designs
- `output/TEST_BATCH_REVIEW.md` — 3-product test batch
- `data/products-master.csv` — manifest (28 rows: Shopify + Etsy per design)

---

## Source-of-truth order

1. Brand Rules + Brand Reset (spreadsheet)
2. Brand Book PDF
3. Production Packet PDF
4. `kww_etsy_listings.md`
5. Competitive research PDF
6. Older website prototype (Black/Navy/White hoodie colors are **outdated**)

---

## Scripts

| Script | Purpose |
|--------|---------|
| `build_manifest.py` | Generate `products-master.csv` |
| `validate_source_files.py` | Check source docs + spreadsheet sheets |
| `validate_artwork.py` | Scan PNG dimensions, transparency, light/dark pairs |
| `validate_manifest.py` | Etsy limits, handles, personalization flags |
| `inspect_printify_connection.py` | Printify shops + blueprint 706 (read-only) |
| `inspect_sales_channels.py` | Shopify public catalog + conflict handles |
| `calculate_margins.py` | Write `margin-report.csv` |
| `export_shopify_copy.py` | `shopify_copy_export.json` |
| `export_etsy_copy.py` | `etsy_copy_export.json` |
| `create_printify_drafts.py` | Draft creation — requires `--create-drafts` + `DRY_RUN=false` + approved art |
| `publish_approved_products.py` | Requires `--publish` + all `APPROVED` status fields |
| `generate_launch_report.py` | Run all validation steps |

---

## Safety rules

- **DRY_RUN=true** by default
- Never delete or overwrite existing Shopify/Etsy products
- Detect duplicate handles/titles before create
- Redact secrets in logs
- Exponential backoff; stop after 3 consecutive API failures
- Personalization blocked until workflow documented

---

## Artwork layout (recommended)

```
merch-launch/artwork/
  city-waco-skyline/
    light.png      # ~4500×5400 RGBA
    dark.png       # white-ink for Pepper (optional)
  breed-french-bulldog/
    light.png
  breed-golden-retriever/
    light.png
    dark.png
```

Set `ARTWORK_SEARCH_PATHS` in `.env` for additional folders.

---

## Test batch (first 3 products)

1. Keep Waco Wagging — Waco Skyline Tee
2. Keep Waco Wagging — French Bulldog Tee
3. Keep Waco Wagging — Golden Retriever Tee

Do not proceed to the other 11 until owner approves `TEST_BATCH_REVIEW.md`.

---

## Credentials

See `.env.example`. Only variable **names** belong in git — never real tokens.

---

## Related repo docs

- `merch-audit/` — prior Shopify export audit (50 products)
- `src/data/merchDesignAssets.ts` — design asset manifest (breed prints missing in repo)
- `docs/merch-launch-kit.md` — website curation notes
