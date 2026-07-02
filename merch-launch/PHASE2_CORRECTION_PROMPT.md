# PHASE 2 CORRECTION — MISSING AND INCOMPLETE ARTWORK

Do not connect Printify.
Do not create drafts.
Do not publish anything.
Do not treat the current Phase 2 PNG or SVG files as approved production masters.

## Confirmed problems

1. The current Waco skyline production master lost important artwork:
   - The ALICO Building facade and windows are missing.
   - The ALICO Building appears as a large solid block.
   - The McLennan County Courthouse lost architectural line detail and appears partially filled.
   - The result does not accurately match the production-packet reference.

2. The current French Bulldog production file is not the complete design shown in the production packet mockup.
   - The source mockup shows the French Bulldog with the full hand-lettered phrase “Keep Waco Wagging.”
   - The current file combines the dog with a different reconstructed Brand Book lockup.
   - Do not substitute the Brand Book logo for the apparel composition without explicit approval.

3. The current Golden Retriever file is also an assembled dog-plus-logo layout rather than a recovered approved finished apparel composition.

4. Only three test products were produced.
   - The complete art inventory should account for five city designs and nine breed designs.
   - Do not imply that the entire collection artwork has been recovered.

## Immediate action

Mark the current three test products:

- artwork_status = REVISE
- qa_status = BLOCKED_ARTWORK
- mockup_status = REVISE

Add notes explaining the missing detail and composition mismatch.

Do not delete the current files. Move or copy them into:

`merch-launch/reference/rejected-phase2/`

Label them clearly as:

`NOT_FOR_PRODUCTION`

## Deep recovery — second pass

Return to the original source containers and inspect them at object level, not only as rendered page images.

### KWW_Production_Packet.pdf

1. Inspect each PDF page’s content streams.
2. List all XObjects, image masks, soft masks, clipping paths, fonts, vector paths, and transparency groups.
3. Determine whether the city artwork is made from:
   - multiple layered raster images,
   - vector paths,
   - masks,
   - or separate foreground/background objects.
4. Extract every component needed to reconstruct the complete Waco skyline.
5. Do not merge light and dark assets incorrectly.
6. Check whether the detailed ALICO windows and courthouse line work are stored in separate PDF objects or masks.

Use multiple methods where available:

- `pdfimages -all`
- `mutool extract`
- `mutool draw -F svg`
- `pdftocairo -svg`
- `qpdf --qdf`
- direct PDF object inspection
- Inkscape PDF import, if available

Compare outputs from each method.

### French Bulldog mockup

1. Inspect whether the shirt artwork itself can be isolated from:
   - `img-038.png`
   - `img-039.png`
   - embedded source objects
   - any alpha masks or higher-resolution originals
2. Search the repository, Downloads, ZIP files, source assets, Canva exports, theme uploads, and image directories for:
   - French Bulldog
   - Frenchie
   - Keep Waco Wagging
   - hand-lettered script
   - Blue Jean
   - mockup source
3. Search by image hash and visual similarity, not only filename.

### Golden Retriever

1. Search all sources for an existing finished Golden Retriever apparel composition.
2. Do not assume the breed illustration alone is the finished design.
3. If no finished composition exists, report that it must be intentionally designed and approved rather than calling it recovered artwork.

## Create a missing-art matrix

Create:

- `merch-launch/output/COMPLETE_ARTWORK_GAP_ANALYSIS.md`
- `merch-launch/output/complete-artwork-matrix.csv`

Include all 14 designs.

### Cities

- Waco
- Austin
- Dallas
- San Antonio
- Houston

### Breeds

- French Bulldog
- Dachshund
- Golden Retriever
- Labrador Retriever
- German Shepherd
- Corgi
- Chihuahua
- Australian Shepherd
- Siberian Husky

For every design record:

- Illustration recovered
- Complete apparel composition recovered
- Light version recovered
- Dark version recovered
- Wordmark recovered
- Editable vector recovered
- High-resolution transparent PNG recovered
- Source location
- Current status
- Missing components
- Recommended next action

Use these status values only:

- COMPLETE_SOURCE_RECOVERED
- PARTIAL_SOURCE_RECOVERED
- ILLUSTRATION_ONLY
- MOCKUP_ONLY
- MISSING
- REQUIRES_ORIGINAL_DESIGN
- REQUIRES_MANUAL_RECONSTRUCTION

## Waco reconstruction requirements

Do not reconstruct the Waco skyline until every possible PDF component has been examined.

A valid Waco skyline must show:

- Two Magnolia silos with line detail
- Suspension Bridge structure and cables
- Real recognizable ALICO Building
- ALICO name/sign
- Window/facade rhythm
- Roof/flag detail
- McLennan County Courthouse dome and facade detail
- Waco, TX lettering where intended
- Clean single-line visual style

The ALICO and courthouse cannot be solid featureless blocks.

## Apparel composition decision

Separate these concepts:

A. Breed illustration asset  
B. Brand logo asset  
C. Finished apparel design composition

Do not automatically combine A and B and call it C.

For each test product, report whether C actually exists.

If it does not exist, mark:

`REQUIRES_ORIGINAL_DESIGN`

Do not create a new final composition until owner direction is provided about:

- Whether breed name appears
- Whether “Keep Waco Wagging” uses the full handwritten script
- Whether the official serif/script logo lockup is used
- Relative scale of dog and wording
- Whether city or breed wording is included
- Whether personalization is part of the art

## Deliverables for this correction pass

Create:

- `merch-launch/output/PHASE2_CORRECTION_REPORT.md`
- `merch-launch/output/COMPLETE_ARTWORK_GAP_ANALYSIS.md`
- `merch-launch/output/complete-artwork-matrix.csv`
- `merch-launch/output/waco-object-extraction-contact-sheet.png`
- `merch-launch/output/frenchie-source-comparison.png`
- `merch-launch/output/golden-source-comparison.png`

Do not create new production masters in this correction pass unless a genuinely complete source is recovered.

## Stop and report

Your response must state:

1. Exactly which art components were missing from the current Waco file
2. Whether those components were found as separate PDF objects
3. Whether a complete French Bulldog apparel design exists
4. Whether a complete Golden Retriever apparel design exists
5. Which of the 14 collection designs have only illustrations versus complete compositions
6. Which products require original design work rather than asset recovery
7. The locations of the three comparison contact sheets

Do not proceed to Printify.
