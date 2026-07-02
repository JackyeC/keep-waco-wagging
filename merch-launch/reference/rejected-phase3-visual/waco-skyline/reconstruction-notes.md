# Waco Skyline Vector Master — Phase 3A

**Date:** 2026-07-01

## Method
- Source: Production Packet alpha-composited raster (`xref 26` light / `xref 29` dark), 1536×1024
- **Manual vector reconstruction** via medial-axis skeleton → SVG circle paths (preserves ALICO window grid)
- **Not potrace** — no solid tower fills; each centerline point becomes an editable `<circle>` path
- Bottom ~14% excluded (legacy packet script — Brand Book lockup used on tees)

## Colors
- Light garment lines: Bark Brown `#4C463E` (+ Good-Towel Rose `#C68C86` flag accent)
- Dark garment lines: Kitchen Cream `#F4EDE4` (+ Rose flag accent)

## Vector stats
- Light master: 9626 circle paths
- Dark master: 9626 circle paths

## Files
- `waco-skyline-master.svg` / `.pdf` — editable vector master
- `waco-skyline-light.png` / `waco-skyline-dark.png` — 4500×5400 RGBA print exports
- `source-reference.png` — approved reference preserved
