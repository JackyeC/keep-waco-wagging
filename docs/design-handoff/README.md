# Handoff: Keep Waco Wagging — Full Website + Shop + Brand

## Overview
A complete brand + website redesign for **Keep Waco Wagging** — the community and pet-care
home of **Platinum Scoops**, a family-run dog-care business in Waco, TX (owners Jackye &
Todd Clayton). Services: poop scooping & yard care, home daycare & boarding, lifestyle
training, wedding pet care ("Dog of Honor"), and a summer dog camp. Merch (3 hoodies) is
sold on a separate Shopify store.

This bundle contains a **9-page website**, all in one cohesive visual brand (sage / rose /
cream, classic serif + script logo). It is meant to **replace the current keepwacowagging.com**.

## About the Design Files
The files in this bundle are **design references built in HTML** — high-fidelity prototypes
that show the intended look, copy, and behavior. **They are not production code to ship as-is.**

The current live site is a **Next.js app** (it already serves photos from `/pictures/*.webp`
and `/brand/*.webp`, and deep-links merch to Shopify). **The task is to recreate these designs
as pages/components in that Next.js codebase**, using its existing conventions, then deploy
(Vercel). Reuse the site's existing photography files — do **not** rebuild the image-slot
mechanism (that is only a preview convenience in the prototype; see "Assets" below).

Each prototype file is a self-contained HTML document. Open any of them in a browser to see
the exact intended result, then read its inline styles for pixel-level values.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions. Recreate
pixel-faithfully. The only things intentionally "demo" are: the cart uses local state and
its Checkout button opens the Shopify store in a new tab; newsletter forms `preventDefault`
(wire them to the real provider).

---

## Pages → suggested Next.js routes

| Prototype file | Route | Purpose |
|---|---|---|
| `Keep Waco Wagging Home.dc.html` | `/` | Homepage — hero, services, reviews, merch, guides |
| `Poop Scooping.dc.html` | `/platinum-scoops` | Poop scooping & yard care |
| `Daycare and Boarding.dc.html` | `/pet-care` | Home daycare & boarding |
| `Training.dc.html` | `/training` | Lifestyle training |
| `Weddings and Events.dc.html` | `/pet-care/weddings-events` | Dog of Honor wedding pet care |
| `Summer Dog Camp.dc.html` | `/summer-daycare` | Summer dog camp |
| `About.dc.html` | `/about` | Jackye & Todd's story + values |
| `KWWP Storefront.dc.html` | `/shop` | Hoodie shop (deep-links to Shopify checkout) |
| `Keep Waco Wagging Brand Book.dc.html` | `/brand` *(internal/optional)* | Brand guidelines — logo, color, type, merch line |

In the prototypes, internal links use the `.dc.html` filenames (URL-encoded). In the build,
swap them for the routes above. The shared header nav on every page is: **Home · Services
(scrolls to `/#services`) · Shop · About**, plus a green **"Book a service"** button.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| Wag Sage | `#6E7E63` | Primary — buttons, bands, headings accents |
| Sage Hover | `#5C6A51` | Button/hover darken |
| Soft Sage | `#8C9B7E` | Secondary collection cards |
| Kitchen Cream | `#F4EDE4` | Page background |
| Soft Cream | `#FBF6EF` | Cards, panels |
| Good-Towel Rose | `#C68C86` | Accent — script logo, hearts, highlights |
| Rose Deep | `#B97D77` | Rose text / hover |
| Clay Rose | `#CDA6A0` | Merch band, wedding band |
| Blush | `#E5C9C4` | Light rose on dark, selection |
| Blush Warm | `#E5B6B0` | Heart glyphs on sage |
| Brazos Blue | `#A9C2CF` | Tertiary accent |
| Trail Taupe | `#B3A48E` | Tertiary accent / product tile |
| Bark Brown / Ink | `#4C463E` | Body text, dark garments, toast |
| Serif Ink | `#54513F` | Headings text color |
| Body Muted | `#7A7165` / `#8A8073` | Paragraphs |
| Label Muted | `#A99E8D` / `#A99483` | Eyebrow labels |
| Border Line | `#E6DBCB` | Card/section hairlines |
| Input Border | `#E0D4C3` | Form fields |
| Garment Tray | `#EFE7DB` | Brand-book apparel mockup background |

**Usage balance:** ~55% Cream, ~25% Sage, ~8% Bark, ~7% Rose, ~5% Blue/Taupe.

### Typography (Google Fonts)
- **Cormorant Garamond** — display serif. Weights 400/500/600/700 + italic 400/500.
  Headlines (`H1` 500, 60–78px; `H2` 600, 38–44px), product names & prices (600),
  testimonial/italic quotes. The logo's "KEEP WACO" line is 600, `letter-spacing:.12–.14em`, uppercase.
- **Parisienne** — script accent (400). **One or two words only** ("wagging", "wag",
  "romp", "service"). Never body text. Always in rose `#C68C86` (or blush on dark).
- **Jost** — UI/body. Weights 300/400/500/600. Body 300 at 15–17px, `line-height:1.6`.
  Labels/nav/buttons 500, uppercase, `letter-spacing:.12–.22em`, 11–13px.

### Logo lockup
Two stacked lines: `KEEP WACO` (Cormorant 600, tracked caps, sage) with `wagging`
(Parisienne, rose) tucked beneath and indented right. See header on any page.

### Radius / spacing / shadow
- Radius: pills `999px`; cards `18–22px`; large panels `24–26px`; swatches `14–18px`.
- Container max-width `1160–1200px`; section vertical rhythm `54–72px`; horizontal pad `24–30px`.
- Shadows: minimal. Cart drawer `-18px 0 50px rgba(0,0,0,.2)`; toast `0 10px 30px rgba(0,0,0,.24)`.
- Sticky header: `background:rgba(244,237,228,.9); backdrop-filter:blur(10px); border-bottom:1px solid #E6DBCB`.

---

## Interactions & Behavior

**Global**
- Sticky translucent header on every page. Nav links + buttons have hover color → rose `#C68C86`
  (or background darken on filled buttons).
- Bottom full-bleed sage band: "Celebrate · Connect · Support · Wag ♥".

**Homepage**
- Hero with rotated circular "waco STRONG" badge over the image.
- **Marquee**: sage strip, `@keyframes` translateX 0 → -50% over 30s linear infinite, content
  duplicated twice for a seamless loop.
- Service cards link to the service routes; merch band → `/shop`; guide cards → real blog URLs.

**Shop (`/shop`)**
- 3 hoodie products. Each card has **color swatches** (Black `#2B2B2B`, Navy `#2B3A55`,
  White `#F2EEE6`) and **size pills** (S, M, L, XL, 2XL). Selected color = ring
  `0 0 0 2px #FBF6EF, 0 0 0 4px #6E7E63`; selected size = sage fill.
- **Add to bag** → slide-in cart drawer (right, 404px). Cart line key = product+color+size;
  qty steppers, remove, live subtotal (`$xx.00`).
- **Checkout** button → `window.open('https://keepwacowagging.myshopify.com/')`.
  In production, build a real cart or keep deep-linking each product to its Shopify page.
- Each product also has a **"View on Shopify ↗"** link (real URLs below).
- Toast confirmation on add (auto-dismiss ~2.4s).
- Price `$58.00`. Tweakable flags in prototype: `showAnnouncement`, `showImpact`, `autoOpenCart`.

**Brand Book (`/brand`)**
- Color swatches are buttons: click → copy hex to clipboard + toast. Optional in production.

**Forms**
- Newsletter inputs currently `preventDefault`. Wire to the real email/Jobber list.

---

## External links & data (wire these exactly)

**Shopify products** (price $58, Black/Navy/White, S–2XL):
- Golden Retriever Hoodie — `https://keepwacowagging.myshopify.com/products/keep-waco-wagging-golden-retriever-hoodie`
- Frenchie Hoodie — `https://keepwacowagging.myshopify.com/products/keep-waco-wagging-frenchie-hoodie`
- Rescue Mutt Hoodie — `https://keepwacowagging.myshopify.com/products/keep-waco-wagging-rescue-mutt-hoodie`
- Store root (checkout) — `https://keepwacowagging.myshopify.com/`

**Booking / contact**
- Book a service — `https://keepwacowagging.com/book`
- Book a Scoop (Jobber) — `https://clienthub.getjobber.com/booking/29462df8-88c9-4075-aa13-000fc4c8b80c`
- Rover profile — `https://www.rover.com/members/jacqueline-todd-c-full-time-pet-care-professionals/`
- Phone — `tel:+12547266737`  (displayed as "(254) SCOOPER")
- Email — `info@keepwacowagging.com`

**Social**
- Instagram `@platinum_scoops` — `https://www.instagram.com/platinum_scoops/`
- Facebook — `https://www.facebook.com/profile.php?id=61574612007831`
- TikTok — `https://www.tiktok.com/@platinumscoops`
- YouTube — `https://www.youtube.com/@platinumscoops`

**Blog/guides** (homepage cards)
- `https://keepwacowagging.com/blog/best-dog-friendly-patios-in-waco`
- `https://keepwacowagging.com/blog/how-to-know-if-your-dog-is-ready-for-a-patio`
- `https://keepwacowagging.com/blog/best-waco-parks-for-dogs`

---

## Assets

**Important:** the prototypes use `<image-slot>` (a drag-and-drop placeholder that stores
images in a single JSON sidecar). This is a **prototype-only preview tool — do not port it.**
In the real site, every slot becomes a normal `<img>`/`next/image` pointing at a file in
`/public/pictures/` (or wherever the current site stores them).

**Slot → real photo map** (reuse the current site's existing files):

| Slot id | Page | Real photo (existing on current site) |
|---|---|---|
| `home-hero` | Home hero | `/pictures/hero-group-walk.webp` |
| `svc-scoop` | Home / scooping | `/pictures/platinum-scoops-sprayer.webp` |
| `svc-board` | Home / boarding | `/pictures/pool-property.webp` |
| `svc-train` | Home / training | `/pictures/border-collie-joy.webp` |
| `svc-wedding` | Home / weddings | `/pictures/frenchie-sink-bath.webp` |
| `svc-camp` | Home / camp | `/pictures/pool-pack.webp` |
| `home-merch-1/2` | Home merch band | Shopify hoodie product images |
| `guide-1/2/3` | Home guides | the three blog posts' hero images |
| `scoop-hero` | Poop Scooping | `/pictures/platinum-scoops-sprayer.webp` |
| `board-hero` | Daycare & Boarding | `/pictures/pool-property.webp` |
| `train-hero` | Training | `/pictures/border-collie-joy.webp` |
| `wed-hero` | Weddings | `/pictures/frenchie-sink-bath.webp` |
| `camp-hero` | Summer Camp | `/pictures/pool-pack.webp` |
| `about-hero` | About | a photo of Jackye & Todd |
| `p-gr / p-fr / p-rm` | Shop products | Shopify hoodie product images |
| `kwwp-hero` | Shop hero | a hoodie lifestyle shot or `/pictures/hero-group-walk.webp` |
| `kwwp-services` | Shop services band | `/pictures/hero-group-walk.webp` |
| `bb-photo-1..4` | Brand Book | group walk / sink bath / dog joy / bridge |

**Logo:** existing `/brand/keep-waco-wagging-mark.webp`. The prototype renders the wordmark
in live type (Cormorant + Parisienne); you may use the type version or the mark image.

**Icons:** small inline SVGs (paw, shopping bag, stars via "★", hearts via "♥"). Replace with
the codebase's icon set if preferred.

---

## Files in this bundle
- `Keep Waco Wagging Home.dc.html` — homepage
- `Poop Scooping.dc.html`
- `Daycare and Boarding.dc.html`
- `Training.dc.html`
- `Weddings and Events.dc.html`
- `Summer Dog Camp.dc.html`
- `About.dc.html`
- `KWWP Storefront.dc.html` — shop
- `Keep Waco Wagging Brand Book.dc.html` — brand guidelines
- `support.js`, `image-slot.js` — runtime the prototypes load. **Reference only** — needed to
  open the HTML files locally; do not port them. Open each `.dc.html` in a browser to view.

## How to build (suggested)
1. Open your keepwacowagging.com repo in **Cursor / Claude Code**.
2. Point it at this folder; ask it to recreate each page as a route/component per the table above.
3. Apply the design tokens globally (Tailwind theme or CSS vars), load the three Google Fonts.
4. Replace every `<image-slot>` with `next/image` per the asset map.
5. Wire external links, Shopify product links, the Jobber booking, and the newsletter provider.
6. Deploy to Vercel and point the domain.
