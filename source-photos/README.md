# Site photo uploads

**Drop your original photos here** (drag into this folder in Cursor, Finder, or VS Code).

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.heic`

## Expected filenames

Use these names so `npm run optimize:photos` picks them up automatically:

| Drop this file here | Becomes (optimized) |
|---------------------|---------------------|
| `stella diesel walkies.webp` | Hero, OG image, blog cards |
| `Diesel.webp` | Scooping yard, blog, Scoop pet photo |
| `IMG_5285.JPG` | Backyard, community, blog |
| `shi and diesel.webp` | Home dogs, Shiloh pet photo |
| `Diesel1.webp` | Living room, Diesel pet photo |
| `stella puzzlw.webp` | Training, Stella pet photo |
| `jackye and todd.jpg` | About page founders photo |

## After uploading

```bash
npm run optimize:photos
```

That writes optimized WebP files to `public/pictures/` and `public/pets/` for the live site.

Originals in this folder stay local (gitignored). Only the optimized files in `public/` are deployed.
