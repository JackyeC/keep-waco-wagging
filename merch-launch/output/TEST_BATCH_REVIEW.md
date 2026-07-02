# Test Batch Review

**Batch:** 3 Comfort Colors 1717 tees (Wave 1 test)  
**Date:** 2026-07-01  
**Printify drafts created:** **No** — blocked by artwork + credentials

---

## Products in this batch

| # | Product | Manifest ID | Shopify handle | Status |
|---|---------|-------------|----------------|--------|
| 1 | Keep Waco Wagging — Waco Skyline Tee | `city-waco-skyline` | `keep-waco-wagging-waco-skyline-tee` | **BLOCKED_ARTWORK** |
| 2 | Keep Waco Wagging — French Bulldog Tee | `breed-french-bulldog` | `keep-waco-wagging-french-bulldog-tee` | **BLOCKED_ARTWORK** |
| 3 | Keep Waco Wagging — Golden Retriever Tee | `breed-golden-retriever` | `keep-waco-wagging-golden-retriever-tee` | **BLOCKED_ARTWORK** |

---

## Blank & blueprint

| Field | Value |
|-------|-------|
| Blank | Comfort Colors 1717 Unisex Garment-Dyed T-Shirt |
| Printify blueprint ID | **706** |
| Print provider | **TBD** — run `inspect_printify_connection.py` after adding `PRINTIFY_API_TOKEN` |
| Substitute blank | **Not authorized** — document provider options and wait for approval |

---

## Curated Printify colors

### Waco Skyline Tee

| Printify color | KWW palette mapping | Enabled in manifest |
|----------------|---------------------|---------------------|
| Ivory | Kitchen Cream | Yes |
| Bay | Wag Sage | Yes |
| Blue Jean | Brazos Blue | Yes |
| Blossom | Good-Towel Rose | Yes |
| Pepper | Bark Brown | Yes — **blocked until white-line art approved** |

### French Bulldog & Golden Retriever tees

| Printify color | KWW mapping | Pepper |
|----------------|-------------|--------|
| Ivory | Kitchen Cream | No |
| Bay | Wag Sage | No |
| Blue Jean | Brazos Blue | No |
| Blossom | Good-Towel Rose | No |

---

## Pricing (estimated — confirm via Printify API)

| Variant | Est. base cost | Retail | Gross profit | Gross margin | Meets 55%? |
|---------|----------------|--------|--------------|--------------|------------|
| S–XL | $11.50–$12.25 | $34.00 | $21.75–$22.50 | ~64% | **Yes** |
| 2XL | ~$14.50 | $34.00 | $19.50 | ~57% | **Yes** |
| 3XL | ~$16.75 | $34.00 | $17.25 | **50.7%** | **No** |

See `output/margin-report.csv`. Consider **$38–$40** for 3XL or explicit 50% strategic pricing.

---

## Copy preview

### Shopify titles (readable — not keyword-stuffed)

- Keep Waco Wagging — Waco Skyline Tee
- Keep Waco Wagging — French Bulldog Tee
- Keep Waco Wagging — Golden Retriever Tee

Full copy: `output/shopify_copy_export.json`  
Etsy copy (13 tags validated): `output/etsy_copy_export.json`

**Personalization:** Removed from export copy. Manifest: `personalization_ready=NO`, `personalization_status=BLOCKED_WORKFLOW`.

---

## Mockup checklist (all pending)

| Asset | Waco | Frenchie | Golden |
|-------|------|----------|--------|
| Main flat-lay | Pending | Pending | Pending |
| Print close-up | Pending | Pending | Pending |
| On-model | Pending | Pending | Pending |
| Color options | Pending | Pending | Pending |
| Size chart | Pending | Pending | Pending |
| Care instructions | Pending | Pending | Pending |
| Brand story card | Pending | Pending | Pending |
| Personalization example | N/A (blocked) | N/A | N/A |

---

## Shopify conflicts to review

| New handle | Related live product |
|------------|---------------------|
| `keep-waco-wagging-waco-skyline-tee` | `waco-skyline-t-shirt-waco-dog-dad-graphic-tee`, `keep-waco-wagging-t-shirt-waco-landmark-dog-tee` |
| `keep-waco-wagging-french-bulldog-tee` | `keep-waco-wagging-frenchie-edition-1`, `keep-waco-wagging-frenchie-hoodie` |
| `keep-waco-wagging-golden-retriever-tee` | `keep-waco-wagging-golden-retriever-edition-1`, `keep-waco-wagging-golden-retriever-hoodie` |

Publish pipeline will **never overwrite** these — owner chooses hide/redirect/parallel strategy.

---

## Printify / Shopify / Etsy IDs

| Product | printify_product_id | shopify_product_id | etsy_listing_id |
|---------|--------------------|--------------------|-----------------|
| Waco Skyline Tee | — | — | — |
| French Bulldog Tee | — | — | — |
| Golden Retriever Tee | — | — | — |

*Empty — drafts not created.*

---

## Blockers before draft creation

1. **Production artwork** — owner must designate final PNG masters (see `MISSING_ARTWORK.md`).
2. **Printify credentials** — `PRINTIFY_API_TOKEN`, `PRINTIFY_SHOP_ID` in `merch-launch/.env`.
3. **Print provider** — confirm CC 1717 provider, base costs, and color names match manifest.
4. **Mockup + QA approval** — set manifest flags to `APPROVED`.
5. **3XL pricing decision** — margin below target at $34.

---

## Commands to rerun after approval

```bash
cd merch-launch
cp .env.example .env   # add tokens locally — never commit
python scripts/validate_artwork.py --product-id city-waco-skyline --product-id breed-french-bulldog --product-id breed-golden-retriever
python scripts/inspect_printify_connection.py
python scripts/calculate_margins.py
# Only when art + QA approved:
# DRY_RUN=false python scripts/create_printify_drafts.py --create-drafts
```

---

## Owner decision required

**Where are the approved ~4500×5400 transparent PNG print masters for the Waco skyline, French Bulldog, and Golden Retriever CC 1717 designs?**

Until those paths are confirmed and pass `validate_artwork.py`, the pipeline will prepare metadata only and will not create Printify products.

**Waiting for approval before preparing the remaining 11 products.**
