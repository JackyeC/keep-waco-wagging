# Keep Waco Wagging — Implementation Status

Last updated: 2026-06-30 (owner-review pass)

## Route matrix

| Design file | Route | Status | Primary CTA | Data source |
| ----------- | ----- | ------ | ----------- | ----------- |
| Keep Waco Wagging Home.dc.html | `/` | ✅ Done | `/book` | `src/app/page.tsx`, `src/components/home/*` |
| Poop Scooping.dc.html | `/platinum-scoops` | ✅ Done | Jobber Book a Scoop | `src/data/servicePages.ts` |
| Daycare and Boarding.dc.html | `/pet-care` | ✅ Done | `/book` | `src/data/servicePages.ts` |
| Training.dc.html | `/training` | ✅ Done | `/book` | `src/data/servicePages.ts` |
| Weddings and Events.dc.html | `/pet-care/weddings-events` | ✅ Done | `/book` | `src/data/servicePages.ts` |
| Summer Dog Camp.dc.html | `/summer-daycare` | ✅ Done | `/book` + `#calendar` | `ServicePageView` + `SummerCampCalendar` |
| About.dc.html | `/about` | ✅ Done | `/book` | `src/components/about/AboutPageContent.tsx` |
| KWWP Storefront.dc.html | `/shop` | ✅ Done | Shopify checkout via local bag | `src/lib/shopifyCatalog.ts`, cart in `ShopCartContext` |
| Keep Waco Wagging Brand Book.dc.html | `/brand` | ✅ Done | — (internal) | `src/components/brand/BrandBookContent.tsx`, `noindex` |

### Preserved legacy routes (footer-linked)

| Route | Status |
| ----- | ------ |
| `/blog`, `/dog-friendly-waco`, `/waco-wag-club`, `/book`, `/contact`, `/gear-guide` | ✅ Live with shared shell |

---

## Primary CTA map (verified)

| Route | Hero primary | Hero secondary | Bottom CTA primary | Destination |
| ----- | ------------ | -------------- | ------------------ | ----------- |
| `/platinum-scoops` | Book a scoop | Call (254) SCOOPER | Book a scoop | **Jobber** `https://clienthub.getjobber.com/booking/29462df8-88c9-4075-aa13-000fc4c8b80c` |
| `/pet-care` | Book a stay | See Rover reviews (external) | Book a stay | **`/book`** |
| `/training` | Start training | Patio guide blog | Start training | **`/book`** |
| `/pet-care/weddings-events` | Reserve a date | mailto inquiry | Reserve a date | **`/book`** |
| `/summer-daycare` | Enroll now | `#calendar` | Enroll now | **`/book`** |

Rover (`cityConfig.rover.profileUrl`) remains **secondary only** — credibility link on pet-care hero, not the primary booking path.

Config source: `src/data/servicePages.ts` + `src/lib/site.ts` (`ctas.bookService`, `ctas.bookScoops`).

---

## Shop / Shopify

### Cart scope

The HTML prototype demos **3 hoodies** with a local bag. Production `/shop` extends the same cart pattern to **every curated catalog product** that exposes Shopify variants (color/size or single-variant items). Products without resolvable variants show **View on Shopify** only with helper copy.

### Cart behaviors verified (manual + code)

| Behavior | Status |
| -------- | ------ |
| Live product data from Shopify | ✅ |
| Variant IDs resolved per handle | ✅ `parseProductCartOptions` |
| Color / size pickers | ✅ Hoodies + apparel |
| Sold-out variant disable | ✅ |
| Quantity +/- | ✅ |
| Remove line | ✅ |
| `localStorage` persistence (`kww-shop-cart-v2`) | ✅ |
| Mixed-product cart | ✅ |
| Checkout URL `/cart/{variantId}:{qty},…` | ✅ |
| Mobile drawer (404px) | ✅ |
| Empty bag state | ✅ |
| API failure message on `/shop` | ✅ |
| Loading / empty catalog fallback | ✅ |

### Shopify payload / cache fix

**Problem:** `products.json?limit=250` is ~2.3MB — Next.js Data Cache rejects items over 2MB.

**Solution:** `fetch(..., { cache: 'no-store' })` in `fetchShopifyCatalog()` so the response is not written to the Data Cache. `/shop` renders dynamically (`ƒ`) with `export const revalidate = 600` for page-level freshness. Build no longer emits the cache warning.

**Future optimization (optional):** fetch only curated handles via `/products/{handle}.json` in parallel to reduce bandwidth.

---

## Shared shell

| Component | Status |
| --------- | ------ |
| Design tokens, fonts | ✅ |
| Config-driven `announcementBar` | ✅ |
| PodcastBar (hidden when disabled) | ✅ |
| Header + services dropdown + Escape | ✅ |
| Skip to content | ✅ |
| Footer + WagBand | ✅ |
| Newsletter → `/api/leads` | ✅ |

---

## Visual QA

Screenshots: **`docs/visual-qa/`** — 27 PNGs (9 routes × 390px, 768px, 1440px).

Regenerate:

```bash
npm run build && npm run start -- -p 3000
VISUAL_QA_URL=http://localhost:3000 node scripts/visual-qa.mjs
VISUAL_QA_URL=http://localhost:3000 node scripts/visual-qa-tablet-desktop.mjs
```

### Drift corrected this pass

- Full `/brand` book from handoff (color copy, type, voice, skyline, Platinum Scoops)
- Shop hero badge `object-position` to protect faces
- Unified **Add to bag** on all variant-backed catalog cards
- Pet-care bottom CTA copy no longer implies Rover as primary booking
- Brand wordmark variants (`onDark`, `showTagline`, non-link mode)

---

## Content QA (public routes)

| Check | Result |
| ----- | ------ |
| Jacky in our copy | ✅ None |
| Jackie in our copy | ✅ None (Rover reviewer quotes preserve original spelling with attribution) |
| Lorem / placeholder customer copy | ✅ None on primary routes |
| `href="#"` | ✅ None in `src/` |
| Dakota present-day | ✅ None |
| Ice cream + Platinum Scoops | ✅ None |
| TODO visible to customers | ✅ None on primary routes |

---

## Integrations preserved

Supabase `/api/leads` · Shopify checkout · Jobber scoop booking · Rover secondary links · Vercel Analytics · legacy routes · env var names

---

## QA commands (last run: 2026-06-30)

```bash
npm run lint      # pass (0 errors, 0 warnings)
npm run typecheck # pass
npm run test      # 15/15 pass
npm run build     # pass, no Shopify cache warning
```

---

## Owner review still needed

1. Visual approval of screenshots in `docs/visual-qa/`
2. Seasonal `announcementBar.message` in `src/lib/site.ts`
3. Shopify admin price rounding + duplicate SKU archive
4. `shop.keepwacowagging.com` domain connection
5. Optional `/public/brand/platinum-scoops-logo.webp` asset
6. Final deploy approval (not performed)

---

## Known limitations

- Legacy content pages (`/blog`, `/directory`, etc.) inherit shell but not full redesign
- `/shop` is dynamic due to `cache: 'no-store'` Shopify fetch
- Products with complex Shopify option sets may still need **View on Shopify** if variant matching fails
