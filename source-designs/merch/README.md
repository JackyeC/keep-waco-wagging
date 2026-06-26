# Merch print designs

Print-ready artwork for Printify lives here once exported. The website repo does **not** auto-generate bandana or hoodie print files — those are built in **Printify Product Creator** (or Canva/Figma) and published to Shopify.

## What exists today

| Asset | Where it lives now | Print-ready in repo? |
|-------|-------------------|----------------------|
| KWW logo (full) | `public/brand/keep-waco-wagging-logo.webp` | Logo only — not breed editions |
| KWW mark (dogs + skyline) | `public/brand/keep-waco-wagging-mark.webp` | Same — good reference for bandana layout |
| Hoodie breed designs (16) | **Printify** — attached to each hoodie product | **No** — export needed |
| Hoodie mockup photos | Shopify CDN (see `src/data/merchDesignAssets.ts`) | Photos only, not isolated art |
| Bandana collar (live) | **Printify** — generic paw design, not KWW branded | **No** |
| Bandana breed editions (16) | **Not created yet** | Drop files in `bandana-collar/` below |

## Export hoodie art from Printify

1. Log in at [printify.com](https://printify.com/app).
2. **My products** → open e.g. `Keep Waco Wagging — Golden Retriever Hoodie`.
3. **Edit** → Product Creator.
4. For each layer (skyline, breed, text): **Download** or export from the layers panel.
5. Save into this folder:

```
source-designs/merch/
  shared/
    waco-skyline-band.png      # skyline strip reused on bandanas, mats, mugs
    keep-waco-wagging-wordmark.png
  breeds/
    golden-retriever.png       # breed silhouette per edition
    frenchie.png
    … (16 total — match src/data/kwwBreeds.ts)
  bandana-collar/
    golden-retriever-printify-563.png   # full bandana print file for Product #563
    …
```

PNG, transparent background, 300 DPI where Printify allows.

## Build bandana in Printify

1. [Pet Bandana Collar #563](https://printify.com/app/products/563/generic-brand/pet-bandana-collar)
2. Upload layout from `bandana-collar/{breed}-printify-563.png` **or** compose in Creator:
   - Lower third: `shared/waco-skyline-band.png`
   - Center: `breeds/{breed}.png`
   - Top: `shared/keep-waco-wagging-wordmark.png`
3. Publish to Shopify using titles/handles in `src/data/bandanaCollarCatalog.ts`.

## After adding files

Check paths in `src/data/merchDesignAssets.ts` — update `breedSilhouetteStatus` / `bandanaPrintStatus` to `in_repo` when files exist locally.

Optimized brand files for the **website** stay in `public/brand/`. This folder is for **print production**.
