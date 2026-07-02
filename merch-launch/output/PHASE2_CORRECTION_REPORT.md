# Phase 2 Correction Report

**Prompt:** `PHASE2_CORRECTION_PROMPT.md`  
**Date:** 2026-07-01  
**Mode:** Read-only correction pass — **no Printify, no products, no publishing, no new production masters**

---

## Immediate actions completed

| Action | Status |
|--------|--------|
| `artwork_status = REVISE` (3 test products × Shopify + Etsy) | Done |
| `qa_status = BLOCKED_ARTWORK` | Done |
| `mockup_status = REVISE` | Done |
| Notes explaining missing detail / composition mismatch | Done in `data/products-master.csv` |
| Copy rejected files → `reference/rejected-phase2/` (NOT_FOR_PRODUCTION) | Done — originals not deleted |

---

## Extraction methods compared (Production Packet PDF)

| Method | Result | Notes |
|--------|--------|-------|
| **PyMuPDF** + SMask composite | 21 design xobjects | Best transparent line-art recovery |
| **pdfimages -all** | 40 files | RGB + separate L-channel masks (e.g. img-026/027 pairs) |
| **mutool extract -a** | 44 images + fonts | Alpha-embedded PNGs in `pdf-object-audit/mutool_extract/` |
| **mutool draw -F svg** | Pages 3–6 SVG | page6 = 10.4MB; embeds same rasters, no extra ALICO layers |
| **pdftocairo -svg** | Pages 3–6 SVG | Consistent with mutool — no additional components |
| **qpdf --qdf** | Decompressed PDF | `pdf-object-audit/qpdf/KWW_Production_Packet.qdf.pdf` for object inspection |
| **Inkscape** | Not available | Skipped |

Full JSON: `output/pdf-object-audit/extraction_methods.json`  
Object inventory: `output/pdf-object-audit/object_inventory.json`  
Hash search: `output/hash_search_results.json` (47 keyword/hash candidates, no duplicate complete print files found)

---

## Waco skyline — PDF object structure

Each city variant = **one Image XObject + one SMask**. For Waco:

| Variant | Image xref | SMask xref | Size |
|---------|------------|------------|------|
| Light (black line) | 26 | 28 | 1536×1024 |
| Dark (white line) | 29 | 30 | 1536×1024 |

**Separate PDF objects for ALICO windows, ALICO sign, or courthouse facade lines: NO.**  
Detail exists in the **raster pixels** of the alpha-composited source (visible at native resolution).  
Phase 2 **potrace** collapsed that detail into solid blocks — that is a reconstruction failure, not missing source data.

Light and dark were **not** incorrectly merged during recovery.

---

## French Bulldog — img-038 / img-039

| File | What it is |
|------|------------|
| **img-038.png** | 1254×1254 RGB flat-lay **mockup photo** (tee + props + visible print) |
| **img-039.png** | 1024×1536 RGB on-model **mockup photo** |
| **xref62** | 1024×1024 transparent **breed illustration only** (Asset A) |

The complete apparel composition (dog + hand-lettered “Keep Waco Wagging”) appears **on the mockup** but was **not recovered** as an isolated transparent print file. No separate hand-lettered script PNG/SVG found in repo, Downloads hash search, or PDF extraction.

Phase 2 rejected PNG = **dog illustration only** at 4500×5400 (NOT_FOR_PRODUCTION). It is **not** the mockup composition and does **not** include the hand-lettered script from img-038.

**Composition C:** MOCKUP_ONLY → **REQUIRES_ORIGINAL_DESIGN**

---

## Golden Retriever — finished composition search

| Source | Complete composition? |
|--------|----------------------|
| Production Packet page 6 | **No** — Frenchie mockups only |
| xref66 | Illustration only (Asset A) |
| `keep_waco_wagging_golden_mockups.zip` | Old layout (dog + skyline + serif “KEEP WACO WAGGIN” + paw logo) — **not** CC1717 launch spec |
| Phase 2 rejected PNG | Dog illustration only — NOT_FOR_PRODUCTION |

**Composition C for launch:** **REQUIRES_ORIGINAL_DESIGN**

---

## 14-design matrix summary

See `complete-artwork-matrix.csv` and `COMPLETE_ARTWORK_GAP_ANALYSIS.md`.

| Status | Count |
|--------|-------|
| PARTIAL_SOURCE_RECOVERED | 5 cities |
| ILLUSTRATION_ONLY | 7 breeds |
| MOCKUP_ONLY | 1 (French Bulldog) |
| REQUIRES_ORIGINAL_DESIGN | 1 (Golden Retriever) |
| COMPLETE_SOURCE_RECOVERED | **0** |

---

## Rejected archive (`reference/rejected-phase2/`)

- `french-bulldog-tee_light_NOT_FOR_PRODUCTION.png`
- `golden-retriever-tee_light_NOT_FOR_PRODUCTION.png`
- `waco-skyline-tee_light_REQUIRES_RECONSTRUCTION.txt`
- `waco-skyline-tee_dark_REQUIRES_RECONSTRUCTION.txt`
- `PRODUCTION_MASTER_VALIDATION_NOT_FOR_PRODUCTION.json`
- `TEST_BATCH_ARTWORK_REVIEW_NOT_FOR_PRODUCTION.md`
- `README.txt`

---

## Stop point

No Waco reconstruction performed (per prompt: examine all PDF components first — done; no complete source recovered).  
No new production masters created.  
No Printify connection.

**Owner decisions required before any composition work:** typography (hand script vs Brand Book lockup), layout scale, skyline pairing, personalization in art.
