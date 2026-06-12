# Upload photos here

**Every image you add gets used on the site** — not just one per folder.

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

## Everything else counts too

- **Loose files** in this folder (e.g. `IMG_1234.jpeg`) → photo gallery + blog cards
- **Named folders** (e.g. `Freddie/`) → pet card + all photos in the gallery
- **Multiple photos in one folder** → every image appears in the gallery

Videos (`.mov`, `.mp4`) are skipped — images only.

## Sync

```bash
npm run dev      # optimizes all photos, then starts the site
npm run optimize:photos   # sync manually
```

You'll see a summary like: `65 source images → 17 site slots + 1 pet folder + 65 library images`

Originals stay on your computer (gitignored). Optimized files in `public/` are what deploy to keepwacowagging.com — commit those after syncing.
