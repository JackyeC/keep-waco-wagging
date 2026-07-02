# Missing Artwork Report

**Generated:** 2026-07-01  
**Spec:** Transparent PNG, ~4500×5400 px, separate light-garment and dark-garment (white-ink) masters where Pepper is curated.

All 14 Comfort Colors 1717 launch designs are **`BLOCKED_ARTWORK`**.

---

## Test batch (priority)

### 1. Keep Waco Wagging — Waco Skyline Tee (`city-waco-skyline`)

| Field | Value |
|-------|-------|
| Status | **BLOCKED_ARTWORK** |
| Curated colors | Ivory, Bay, Blue Jean, Blossom, **Pepper** (conditional) |
| Light art | **Missing** — no file at production spec |
| Dark / white-ink | **Missing** — Pepper cannot ship without approved white-line art |
| Candidates (not approved) | `~/Downloads/waco skyline.png` (447×447), `waco skyline.jpg` (566×240), `waco skyline4.webp` (3000×2182, opaque) |
| ALICO QA | Not performed — candidates too small for landmark review |

### 2. Keep Waco Wagging — French Bulldog Tee (`breed-french-bulldog`)

| Field | Value |
|-------|-------|
| Status | **BLOCKED_ARTWORK** |
| Curated colors | Ivory, Bay, Blue Jean, Blossom (no Pepper) |
| Light art | **Missing** |
| Dark / white-ink | Not required for this SKU |
| Candidates (not approved) | `KWW Frenchie.png`, `kwwfrenchie.png` — duplicate 1254×1254 RGB with white background |

### 3. Keep Waco Wagging — Golden Retriever Tee (`breed-golden-retriever`)

| Field | Value |
|-------|-------|
| Status | **BLOCKED_ARTWORK** |
| Curated colors | Ivory, Bay, Blue Jean, Blossom (no Pepper) |
| Light art | **Missing** — `golden_03_light_shirt.png` is 1080×1080 RGB mockup composite, not print master |
| Dark / white-ink | 16 candidate files at 1080×1080 — transparent white-ink variants exist but **undersized** |
| Repo file | `source-designs/merch/dog-moms/waco-golden-retriever-crewneck-300dpi.png` (3300×2357) — **wrong product format** |
| Duplicates | `kwwgolden.png`, `golden waco.png`, `KWW Golden.png`, many `golden_0*` variants |

---

## City designs (wave 1 — not test batch)

| Product ID | Design | Files found | Block reason |
|------------|--------|-------------|--------------|
| `city-austin-pup-culture` | Austin Pup Culture | 1 | `austin_skyline_lineart.png` 1536×1024 — undersized |
| `city-dallas-dog-scene` | Dallas Dog Scene | 0 | **No artwork file found** |
| `city-san-antonio-sniffari` | San Antonio Sniffari | 0 | **No artwork file found** |
| `city-houston-howling` | Houston Howling | 1 | `houston_skyline_lineart.png` 1536×1024 — undersized |

---

## Breed designs (wave 1 — not test batch)

| Product ID | Breed | Files found | Block reason |
|------------|-------|-------------|--------------|
| `breed-dachshund` | Dachshund | 0 | No production file (live Shopify hoodie mockups only) |
| `breed-labrador-retriever` | Labrador | 0 | No production file |
| `breed-german-shepherd` | German Shepherd | 0 | `kwwgerman.png` / `KWW German Shepard.png` are 1254×1254 RGB previews only |
| `breed-corgi` | Corgi | 2 | `corgie.png`, `KWW Corgie.png` — 1254×1254 RGB |
| `breed-chihuahua` | Chihuahua | 3 | 1254×1254 RGB previews |
| `breed-australian-shepherd` | Australian Shepherd | 1 | Photo JPG only — not line art |
| `breed-siberian-husky` | Siberian Husky | 0 | No production file |

---

## Duplicate artwork summary

- **French Bulldog:** 2 identical-dimension RGB exports — consolidate to one master.
- **Golden Retriever:** 25+ files — needs owner-designated light + dark masters only.
- **Waco skyline:** Multiple tiny previews — none are production tier.

---

## Required owner action

1. Export **final** print files at ~4500×5400 transparent PNG for each design.
2. Place files in `merch-launch/artwork/{product_id}/light.png` and `dark.png` (if Pepper/white-ink needed).
3. Re-run: `python scripts/validate_artwork.py --product-id city-waco-skyline --product-id breed-french-bulldog --product-id breed-golden-retriever`
4. Human QA: ALICO Building, typography (Cormorant/Parisienne/Jost), contrast on Bay and Pepper.

Machine-readable detail: `output/artwork_validation.json`
