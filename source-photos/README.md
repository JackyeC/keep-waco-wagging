# Photo library and review inbox

## Give Cursor photos to review

Put any number of unreviewed dog photos in:

```text
source-photos/blog-candidates/
```

That folder is a private local review inbox:

- Originals are ignored by Git and are not deployed.
- The optimizer skips the folder, so nothing goes live automatically.
- Cursor can inspect the batch, reject weak or duplicate photos, match the best
  images to guides, and then optimize only the approved picks.
- Keep original filenames; folders and subfolders are fine.

For Google Photos, create an album, select the photos, choose **Download**, and
unzip or drag them into `blog-candidates/`. A local folder is more reliable than
a shared Google Photos link because it preserves the original files and does not
require account access.

## Approved source photos

Images outside `blog-candidates/` are part of the approved source library and
may be processed for the site.

## Best picks (`curated.json`)

The sync script uses **`curated.json`** to choose the best photo for each page (★ in the terminal output). Slot folders are only a fallback.

## Labeled folders (optional fallback)

Drop a photo in each folder if you want to override without editing `curated.json`:

| Folder | Primary use on the site |
|--------|-------------------------|
| `hero/` | Homepage hero, social previews |
| `scooping/` | Platinum Scoops |
| `boarding-backyard/` | Summer daycare, Yappy Hours |
| `boarding-home/` | Boarding cards |
| `boarding-indoor/` | Pet care page |
| `training/` | Training sections |
| `founders/` | About page — Jackye & Todd |
| `pets-scoop/`, `pets-stella/`, etc. | Pack photos on About |
| `shop/` | Optional overrides for `/shop` product cards (name files `{product-id}.jpg`) |

## Shop product photos

The `/shop` page uses **your Waco dog photos**, not Amazon packshots. Defaults are mapped in `curated.json` under `"shop"`. To override one product, drop a photo in `shop/` named like `cooling-mat.jpg` (see product ids in `src/data/products.ts`).

## Everything else counts too

- **Loose files** in this folder (e.g. `IMG_1234.jpeg`) → photo gallery
- **Named folders** (e.g. `Freddie/`) → pet card + all photos in the gallery
- **Multiple photos in one folder** → every image appears in the gallery
- **`blog-candidates/`** → review only; never processed automatically

Videos (`.mov`, `.mp4`) are skipped — images only.

## Sync

```bash
npm run dev      # optimizes all photos, then starts the site
npm run optimize:photos   # sync manually
```

You'll see a summary like: `65 source images → 17 site slots + 1 pet folder + 65 library images`

Originals stay on your computer (gitignored). Optimized files in `public/` are what deploy to keepwacowagging.com — commit those after syncing.
