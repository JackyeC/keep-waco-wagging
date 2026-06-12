# Upload photos here

Drop images into the **labeled folder** for where you want them on the site.
**Any filename works** — JPG, PNG, WebP, HEIC all fine.

| Folder | Shows up on |
|--------|-------------|
| `hero/` | Homepage hero, social link previews, blog “Dog-Friendly Waco” cards |
| `scooping/` | Platinum Scoops page, poop-scooping service cards |
| `boarding-backyard/` | Summer daycare, Yappy Hours, backyard/community sections |
| `boarding-home/` | Boarding & daycare cards, “dogs at home” sections |
| `boarding-indoor/` | Pet care page living-room photo |
| `training/` | Training service cards, blog training articles |
| `founders/` | About page — Jackye & Todd photo |
| `pets-scoop/` | Wagging Wall — Scoop (Pet of the Week) |
| `pets-stella/` | About page — Stella |
| `pets-diesel/` | About page — Diesel |
| `pets-shiloh/` | About page — Shiloh |

## What happens automatically

Photos sync when you run the dev server or build:

```bash
npm run dev      # optimizes photos first, then starts the site
npm run build    # same before production build
```

Or sync manually anytime:

```bash
npm run optimize:photos
```

Optimized files land in `public/pictures/` and `public/pets/` — those are what the live site uses.

Originals in this folder stay on your computer only (not committed to git).
