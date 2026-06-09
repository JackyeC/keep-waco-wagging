# Keep Waco Wagging

**Your dog-friendly guide to Waco.** _Presented by Platinum Scoops._

A local content, directory, and lifestyle site for dog parents in Waco, Texas —
dog-friendly patios, parks and trails, events, local pet businesses, real-life
training tips, yard care education, and curated gear. Built to grow into a local
media brand, business directory, newsletter, and customer feeder for
[Platinum Scoops](https://platinumscoops.com) pet waste removal and lifestyle
dog training — with a replicable model for other cities.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons
- [Supabase](https://supabase.com/) — lead capture (newsletter, Get Listed, pet submissions)
- [Resend](https://resend.com/) — email notifications for new leads
- [@vercel/analytics](https://vercel.com/docs/analytics) — conversion tracking

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — forms work in dev without backend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side inserts (keep secret) |
| `RESEND_API_KEY` | Send lead notification emails |
| `RESEND_FROM_EMAIL` | Verified sender in Resend |
| `NOTIFY_EMAIL` | Where new leads are emailed |

Run `supabase/schema.sql` in your Supabase SQL editor to create the lead tables.

## Project structure

```
src/
  app/
    page.tsx               # Home (directory, training, shop, Rover CTAs)
    shop/                  # Amazon affiliate gear page
    directory/             # Dog-Friendly Waco Directory + [slug] pages
    weekend/               # Where to Wag This Weekend
    training/              # Lifestyle Dog Training
    pets/                  # Wagging Wall + pet submissions
    platinum-scoops/       # Sponsor + services page
    spotlights/            # Local Business Spotlights
    get-listed/            # Get Listed form
    blog/                  # Blog (category-filtered)
    about/                 # Founder story + mission
    affiliate-disclosure/  # FTC / Amazon disclosure
    api/                   # newsletter, get-listed, pets route handlers
  components/
  data/                    # Typed content (listings, shop, ads, testimonials…)
  lib/
    site.ts                # cityConfig — swap this to clone to a new city
    leads.ts               # Supabase + Resend lead pipeline
supabase/schema.sql        # Lead capture tables
```

## Revenue surfaces

| Surface | Where | Config |
|---------|-------|--------|
| Platinum Scoops bookings | Home, `/platinum-scoops`, CTAs | `cityConfig.sponsor` in `site.ts` |
| Lifestyle training | `/training`, home | `ctas.bookTraining` |
| Rover sitting/walking | Home, `/about`, ads | `cityConfig.monetization.roverProfileUrl` |
| Amazon affiliate shop | `/shop` | `cityConfig.monetization.amazonAssociatesTag` + `data/shop.ts` |
| Sponsor ad slots | Directory, blog, shop sidebars | `data/ads.ts` |
| Business listings | `/get-listed` | Paid tiers in form + house ads |

## City config (clone to a new "W" city)

All city-specific values live in **`cityConfig`** inside [`src/lib/site.ts`](src/lib/site.ts):

1. **Geography** — `city`, `state`, `serviceAreas`, `county`
2. **Brand** — `name`, `tagline`, `url`, `description`, `keywords`
3. **Sponsor company** — `sponsor.name`, booking URL, phone, pricing
4. **Founder** — name, bio, Rover profile
5. **Monetization** — Amazon tag, affiliate disclosure, Rover URL

### Clone checklist

1. Fork/copy the repo.
2. Update `cityConfig` in `src/lib/site.ts` (e.g. "Keep Waxahachie Wagging").
3. Replace `src/data/listings.ts`, `weekend.ts`, `spotlights.ts`, `blog.ts` with local content.
4. Update `src/data/shop.ts` if you want different gear picks.
5. Set a new domain in `cityConfig.url` and deploy to Vercel.
6. Create a new Supabase project (or separate schema) and run `supabase/schema.sql`.
7. Update env vars in Vercel for the new site.

The codebase stays identical — only config + data files change per city.

## Brand & design

- **Style:** Texas eco-chic — warm neutrals, soft greens, soft blues, cream backgrounds.
- **Tokens:** `src/app/globals.css` (`sage`, `sky`, `gold`, `cream`, `sand`, `clay`, `bark`).
- **Gold** is reserved for Platinum Scoops sponsor accents.

## Content still to personalize

Search for `TODO` in the repo:

- Real Waco directory listings + verified dog policies
- Your real Rover profile URL and Amazon Associates tag
- Real Platinum Scoops phone/booking/pricing (currently placeholder phone)
- Real social handles
- Pet of the Week photo (`/public/pets/scoop.jpg`)
- Verified client testimonials in `src/data/testimonials.ts`
