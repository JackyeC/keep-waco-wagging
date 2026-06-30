# Keep Waco Wagging — Complete Build Kickoff

Everything you need to rebuild **keepwacowagging.com** from the design handoff.  
Design files live in **`docs/design-handoff/`** (HTML prototypes + `README.md` spec).

---

## Status (updated as pages ship)

| Route | Prototype | Status |
|-------|-----------|--------|
| `/` | Keep Waco Wagging Home.dc.html | ✅ Done |
| `/platinum-scoops` | Poop Scooping.dc.html | ✅ Done |
| `/pet-care` | Daycare and Boarding.dc.html | 🔲 Next |
| `/training` | Training.dc.html | 🔲 |
| `/pet-care/weddings-events` | Weddings and Events.dc.html | 🔲 |
| `/summer-daycare` | Summer Dog Camp.dc.html | 🔲 (calendar added; full redesign pending) |
| `/about` | About.dc.html | 🔲 |
| `/shop` | KWWP Storefront.dc.html | 🟡 Curation done; cart drawer redesign pending |
| `/brand` | Brand Book.dc.html | 🟡 Placeholder, `noindex` |

**Also done:** global tokens/fonts, Header/Footer/WagBand, Supabase newsletter, merch curation layer, summer camp calendar.

---

## Paste this into Cursor to start (or resume)

```
You are helping me rebuild keepwacowagging.com.

CONTEXT
- Keep Waco Wagging = community + pet-care home of Platinum Scoops (Jackye & Todd Clayton, Waco TX).
- Services: poop scooping, daycare/boarding, training, wedding pet care, summer dog camp. Merch on Shopify.
- Next.js App Router, Tailwind v4, photos in /public/pictures/*.webp, logo /public/brand/keep-waco-wagging-mark.webp.

DESIGN SOURCE
- Read docs/design-handoff/README.md fully.
- Open each .dc.html for pixel-level reference (inline styles = truth).

ROUTES
/                          → Keep Waco Wagging Home.dc.html
/platinum-scoops           → Poop Scooping.dc.html
/pet-care                  → Daycare and Boarding.dc.html
/training                  → Training.dc.html
/pet-care/weddings-events  → Weddings and Events.dc.html
/summer-daycare            → Summer Dog Camp.dc.html
/about                     → About.dc.html
/shop                      → KWWP Storefront.dc.html
/brand                     → Brand Book (internal, noindex)

DECISIONS (locked in)
1. Newsletter → Supabase /api/leads (NOT Jobber).
2. Design folder → docs/design-handoff/
3. Nav → Home · Services · Shop · Guides · About + green "Book a service"
   Guides → /#guides on home, /dog-friendly-waco elsewhere.
4. AnnouncementBar (sage) + PodcastBar below (hidden when podcast.enabled=false).
5. /brand → internal only, robots: noindex.
6. Legacy routes stay live, footer only, inherit new tokens.

EXTERNAL LINKS (wire exactly)
- Jobber Book a Scoop: https://clienthub.getjobber.com/booking/29462df8-88c9-4075-aa13-000fc4c8b80c
- Book a service hub: /book
- Rover: https://www.rover.com/members/jacqueline-todd-c-full-time-pet-care-professionals/
- Phone: tel:+12547266737 · (254) SCOOPER
- Email: info@keepwacowagging.com
- IG: https://www.instagram.com/platinum_scoops/
- FB: https://www.facebook.com/profile.php?id=61574612007831
- TikTok: https://www.tiktok.com/@platinumscoops
- YouTube: https://www.youtube.com/@platinumscoops
- Shopify store: https://keepwacowagging.myshopify.com/

SERVICE PAGE CTA RULES
- Poop scooping → Jobber "Book a scoop" (NOT /book)
- Daycare, training, weddings, camp → /book or Rover per prototype
- Replace <image-slot> with next/image per README image map

SHOP
- Featured curation in src/data/merchCuration.ts
- Charm display prices on site; round real prices in Shopify admin
- Cart drawer + color/size pickers per KWWP Storefront.dc.html (pending)

WORK STYLE
Build shared shell first, then pages one at a time. Show each page before moving on.
Match existing repo patterns. Stay responsive (collapse grids on mobile).
```

---

## Design tokens (quick reference)

| Token | Hex | Use |
|-------|-----|-----|
| Wag Sage | `#6E7E63` | Buttons, bands |
| Sage Hover | `#5C6A51` | Hover |
| Kitchen Cream | `#F4EDE4` | Page bg |
| Soft Cream | `#FBF6EF` | Cards |
| Good-Towel Rose | `#C68C86` | Script, hearts |
| Bark / Ink | `#4C463E` | Body text |
| Serif Ink | `#54513F` | Headlines |
| Border | `#E6DBCB` | Hairlines |

**Fonts:** Cormorant Garamond (display) · Parisienne (1–2 script words, rose) · Jost (UI/body)

**Logo lockup:** `KEEP WACO` (tracked caps, sage) + `wagging` (Parisienne, rose, indented)

---

## Service page pattern (shared components)

Each service page uses `src/components/service/ServicePageSections.tsx`:

1. **Hero** — eyebrow, headline with one Parisienne word, meta line, dek, 2 CTAs, hero photo  
2. **Included grid** — 4 ♥ cards  
3. **Steps panel** — 01 / 02 / 03 on soft-cream panel  
4. **Sage CTA** — script accent in headline, primary + secondary buttons  

---

## Make it great — launch checklist

### Design QA (every page)
- [ ] Side-by-side with matching `.dc.html` prototype
- [ ] Cormorant headlines, Parisienne script accents in rose (not fallback serif)
- [ ] Cream `#F4EDE4` background, sage `#6E7E63` bands, rose `#C68C86` accents
- [ ] Mobile: grids → single column, header menu works
- [ ] Sticky translucent header + WagBand on every page

### Content & photos
- [ ] All image-slots mapped to `/public/pictures/` (see README image map)
- [ ] Jackye & Todd photo on About
- [ ] Real hoodie lifestyle shots on Shop if available
- [ ] Empty slots shot and dropped in

### Links & booking
- [ ] Poop scooping CTAs → Jobber (not /book)
- [ ] Other services → /book or Rover per page
- [ ] Phone, email, socials live (no `#` placeholders)
- [ ] Blog guide cards → real slugs
- [ ] Merch → Shopify product URLs

### Shop & merch (see docs/merch-launch-kit.md)
- [ ] Round prices in Shopify admin ($27.99 tees, $57.99 hoodies, etc.)
- [ ] Archive duplicate SKUs listed in `excludedProductHandles`
- [ ] Test checkout end-to-end on Shopify
- [ ] Connect `shop.keepwacowagging.com` when ready
- [ ] Upload 5 collage designs not yet live (Dog Mama, Coffee & Kisses, etc.)

### Newsletter & SEO
- [ ] Newsletter forms post to `/api/leads` (Supabase)
- [ ] Page title + meta description per route
- [ ] OG image `/pictures/og-share.webp`
- [ ] `/brand` stays `noindex`

### Deploy
- [ ] `npm run build` clean
- [ ] Deploy to Vercel
- [ ] Point keepwacowagging.com DNS
- [ ] Smoke-test production on phone

### Merch launch (optional week)
- [ ] Day 1 tease → Day 7 urgency (see merch-launch-kit §4)
- [ ] Pet Circle purpose post
- [ ] Newsletter launch offer tied to list growth

---

## Key repo files

| Purpose | Path |
|---------|------|
| Design spec | `docs/design-handoff/README.md` |
| Merch launch | `docs/merch-launch-kit.md` |
| Tokens | `src/app/globals.css` |
| Site config & links | `src/lib/site.ts` |
| Image map | `src/data/designPhotos.ts` |
| Shop curation | `src/data/merchCuration.ts` |
| Service sections | `src/components/service/ServicePageSections.tsx` |
| Shared shell | `src/components/layout/*` |

---

## Homepage QA (reference)

Open `http://localhost:3000` beside `docs/design-handoff/Keep Waco Wagging Home.dc.html`:

- Hero "waco STRONG" badge rotated −7° over photo bottom-left  
- Marquee ~30s seamless loop  
- Service cards → correct routes; scooping card → `/platinum-scoops`  
- Merch band → `/shop`; guides → blog slugs  
- Newsletter → Supabase  

---

*Cute shirts. Local impact. More tails wagging.* 🐾
