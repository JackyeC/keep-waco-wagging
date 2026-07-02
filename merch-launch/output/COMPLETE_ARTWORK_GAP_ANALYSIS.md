# Complete Artwork Gap Analysis — All 14 Launch Designs

**Date:** 2026-07-01  
**Scope:** Five city skylines + nine breed tees (Comfort Colors 1717 launch collection)  
**Important:** Phase 2 produced only three test outputs. This matrix covers the **full 14-design inventory**.

---

## Asset taxonomy (do not conflate)

| Concept | Definition |
|---------|------------|
| **A — Illustration** | Dog silhouette or city skyline line art alone |
| **B — Brand logo** | Official Brand Book lockup (Cormorant/Parisienne/Jost) |
| **C — Finished apparel composition** | Approved print-ready layout for a specific tee (A + typography/wordmark + layout rules) |

Phase 2 incorrectly treated **A** as **C** for breed tees. City tees need **C** = skyline + city script (e.g. “Waco, TX”), not logo lockup.

---

## Summary by status

| Status | Count | Designs |
|--------|-------|---------|
| PARTIAL_SOURCE_RECOVERED | 5 | All city skylines |
| ILLUSTRATION_ONLY | 7 | Dachshund, Labrador, German Shepherd, Corgi, Chihuahua, Australian Shepherd, Siberian Husky |
| MOCKUP_ONLY | 1 | French Bulldog |
| REQUIRES_ORIGINAL_DESIGN | 1 | Golden Retriever |
| MISSING | 0 | — |

**No design has `COMPLETE_SOURCE_RECOVERED`.**

---

## City designs (5)

### Waco Skyline Tee
- **Illustration:** PARTIAL — transparent line art recovered (xref26 light, xref29 dark) at **1536×1024**
- **Complete composition C:** NOT recovered as isolated file (skyline + “Waco, TX” script exists in source raster)
- **ALICO detail in source:** YES — windows, “ALICO” sign, flag, courthouse dome lines visible at native resolution
- **Separate PDF objects for ALICO windows:** **NO** — one raster + one soft mask per variant
- **Phase 2 failure:** Vector trace filled ALICO/courthouse into solid blocks; preview upscale disallowed
- **Status:** PARTIAL_SOURCE_RECOVERED → **REQUIRES_MANUAL_RECONSTRUCTION**

### Austin, Dallas, San Antonio, Houston
- Same structure as Waco: light + dark raster+smask pairs from Production Packet pages 3–4
- City script included in raster (“Austin, TX”, etc.)
- No editable vector, no 300 DPI transparent PNG
- **Status:** PARTIAL_SOURCE_RECOVERED → **REQUIRES_MANUAL_RECONSTRUCTION** each

---

## Breed designs (9)

### French Bulldog
- **Illustration A:** YES — xref62, 1024×1024 transparent
- **Complete composition C:** EXISTS ONLY in **mockup photographs** (pdfimages **img-038**, **img-039**) — dog + **hand-lettered “Keep Waco Wagging”** script on Blue Jean garment
- **Isolated script asset:** NOT found as separate PNG/SVG
- **Brand Book lockup:** Different typography — must not substitute
- **Status:** MOCKUP_ONLY → **REQUIRES_ORIGINAL_DESIGN** (owner layout direction)

### Golden Retriever
- **Illustration A:** YES — xref66, 1024×1024 transparent
- **Complete composition C in Production Packet:** **NO** — page 6 mockups show Frenchie only, not Golden
- **Alternate compositions found:** `keep_waco_wagging_golden_*_mockup.png` (Downloads zip) — old layout with serif “KEEP WACO WAGGIN”, skyline behind dog, paw logo — **not the CC1717 launch spec**
- **Status:** REQUIRES_ORIGINAL_DESIGN

### Other breeds (7)
- Illustration recovered from packet page 5 grid only
- No mockup compositions, no wordmark, no finished tee art
- **Status:** ILLUSTRATION_ONLY → **REQUIRES_ORIGINAL_DESIGN** after owner confirms layout system

---

## Extraction methods compared (Production Packet)

| Method | Result |
|--------|--------|
| PyMuPDF + SMask composite | Best raster recovery — true transparency, full line detail |
| pdfimages -all | RGB + separate L-mask channels; must recomposite |
| mutool extract -a | Same embedded images with alpha (44 files) |
| pdftocairo -svg | Page SVGs embed same rasters; no additional ALICO layers |
| potrace | **Fails** on dense skyline architecture — fills ALICO grid |

---

## What Phase 2 got wrong

1. **Waco:** Attempted potrace despite dense ALICO grid → solid tower (brand-rule violation)
2. **French Bulldog / Golden:** Delivered illustration-only 4500×5400 files and implied production readiness — not complete apparel compositions
3. **Collection scope:** Implied recovery covered launch collection; only 3 of 14 addressed, none complete

---

## Owner decisions required before any new masters

- Typography: hand-lettered script (per Frenchie mockup) vs Brand Book lockup vs breed name
- Layout: dog scale, skyline pairing, wording
- Whether personalization art is in scope
- Whether old golden mockup layout is deprecated or a reference

Full machine-readable matrix: `complete-artwork-matrix.csv`
