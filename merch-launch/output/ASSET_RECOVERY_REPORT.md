# Asset Recovery Report — Phase 2

**Date:** 2026-07-01
**Scope:** Deep extraction of embedded assets from all supplied containers, for the three test designs.
**Tools installed for this phase:** PyMuPDF (PDF image + soft-mask extraction), potrace (vector tracing), librsvg/rsvg-convert (high-res SVG render), Pillow, numpy.

---

## Every source inspected

| Source container | Type | Method | Assets recovered |
|------------------|------|--------|------------------|
| `KWW_Production_Packet.pdf` | PDF | PyMuPDF `get_images` + `Pixmap`+`SMask` composite; page render 150 DPI | **21 raster images** — the approved 5 city skylines (light+dark) and 9 breeds (transparent line art) |
| `Keep_Waco_Wagging_Brand_Book.pdf` | PDF | PyMuPDF images + `get_drawings` | 0 embedded raster; **97 vector paths on page 1** (logo/identity is vector text + shapes, no extractable design PNGs) |
| `KWW_Etsy_Competitive_Research.pdf` | PDF | PyMuPDF | 0 design assets (text/competitive research only) |
| `Keep_Waco_Wagging_Printify_Brand_Reset.xlsx` | XLSX (zip) | unzip → `xl/media` | 0 media (data-only workbook) |
| `Shopify for Keep Waco Wagging.zip` | ZIP | recursive unzip | 0 images |
| `Shopify for Keep Waco Wagging (1).zip` | ZIP | recursive unzip | 0 images |
| `keep_waco_wagging_golden_mockups.zip` | ZIP | recursive unzip | 2 mockup PNGs (768×1024 — on-garment mockups, not print art) |
| `products_export.zip` | ZIP | recursive unzip | 0 images (CSV export) |
| `theme_export__…kww-store-rebuild….zip` | ZIP | recursive unzip | 88 theme assets (icons, section images — not design print files) |

**Extraction methods used:** PyMuPDF pixmap + soft-mask (SMask) alpha recovery, PDF page rendering, recursive ZIP/XLSX extraction, Pillow dimension/alpha analysis, potrace vector tracing, rsvg-convert rendering.

**Critical correction vs Phase 1:** The Phase 1 scan flattened PDF images against black and reported them as opaque/near-black. Re-extracting **with the soft mask** revealed they are in fact **clean transparent line-art PNGs** — these are the approved designs.

---

## Assets recovered by source

- **Production Packet:** 5 cities × (light + dark) = 10 skyline images + 9 breed line-art images.
- **Golden mockups zip:** 2 lifestyle mockups (reference only).
- **Theme export:** 88 UI/theme assets (reference only).
- **Brand Book:** logo/identity is vector — preserved as reference (page render), not a print PNG.

Full inventory: `output/ASSET_RECOVERY_MANIFEST.csv`
Rendered packet pages: `output/recovered-assets/_packet_pages/`
Alpha-composited designs: `output/recovered-assets/_packet_alpha/`

---

## Best candidate for each test product

| Design | Best source | Native size | Type | Real ALICO? | Verdict |
|--------|-------------|-------------|------|-------------|---------|
| **Waco Skyline** | `waco_skyline_light_x26.png` (+ `waco_skyline_dark_x29.png`) | 1536×1024, transparent | High-quality raster line art (preview res) | **Yes — labeled ALICO tower, silos, suspension bridge, courthouse** | **REQUIRES_RECONSTRUCTION** |
| **French Bulldog** | `french_bulldog_light_x62.png` | 1024×1024, transparent | Clean raster line art | N/A (dog only) | **PASS** (vector-traced master) |
| **Golden Retriever** | `golden_retriever_light_x66.png` | 1024×1024, transparent | Clean raster line art | N/A (dog only) | **PASS** (vector-traced master) |

None of the sources are native vector or ≥3000 px raster. All are preview-resolution transparent line art. The breeds trace cleanly to vectors; the Waco ALICO does not.

---

## ALICO Building check

The recovered Waco skyline **does contain the real ALICO Building** — a tall rectangular
tower with a rooftop flag and an "ALICO" nameplate band, alongside the Magnolia silos, the
Suspension Bridge, and the McLennan County Courthouse dome. This is the correct approved design.

**However**, at 1536 px the ALICO window grid and nameplate are only a few pixels apart, so
vector tracing merges them into a solid tower (generic-tower failure). The landmark cannot be
preserved at 300 DPI from this preview — hence reconstruction is required rather than a fake upscale.

---

## Conflicting versions found

- **French Bulldog:** packet line art vs. `~/Downloads/KWW Frenchie.png` / `kwwfrenchie.png` (1254×1254 RGB, white background). The **packet transparent version is superior** and was used.
- **Golden Retriever:** 25+ Downloads variants (mockups, white-ink composites, `kwwgolden.png`). The **packet transparent line art** is the cleanest single source and was used.
- **Waco skyline:** small Downloads previews (447–3000 px, mostly opaque) — all inferior to the packet transparent version.

---

## What can be reused without redrawing

- **French Bulldog** and **Golden Retriever** line art — recovered clean, vector-traced, and rendered to true 4500×5400 / 300 DPI masters. No redraw needed.
- The **same method applies to the other 7 recovered breeds** (Dachshund, Labrador, German Shepherd, Corgi, Chihuahua, Australian Shepherd, Siberian Husky) when those products are built.
- All 5 city skyline **concepts/compositions** (as approved references).

## What must be reconstructed

- **Waco skyline** (and, by the same constraint, the other 4 city skylines when built) — the
  dense architectural detail (especially ALICO windows + nameplate) needs clean vector line art
  at production scale. See `artwork/waco-skyline-tee/notes.md` for the full reconstruction brief.
