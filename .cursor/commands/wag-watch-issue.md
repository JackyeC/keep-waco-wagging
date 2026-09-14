---
description: Turn this week's Daily Sniff candidates into published Wag Watch items.
---

# /wag-watch-issue

Publish the week's Wag Watch updates to `/wag-watch`. One pass: pick candidates,
verify them, write typed items, ship.

Wag Watch is top-of-funnel for Camp Clayton. Every item must be true, local,
dated, sourced, and must give a Waco dog parent a reason to book.

## 1. Get candidates

In order of preference:

1. **The Monday email** — "KWW Daily Sniff: N new drafts to review". It links to
   the admin queue.
2. **The admin queue** — `/admin/daily-sniff` (token: `DAILY_SNIFF_ADMIN_TOKEN`).
   Work the highest-scored `draft` briefs first. Anything flagged
   `needs_verification` is sensitive — verify or skip, never publish on trust.
3. **Manual** — if the queue is thin, check the seeded sources directly
   (`src/lib/daily-sniff/sources.ts`): City of Waco news, Waco Parks & Rec,
   Humane Society of Central Texas, Fuzzy Friends, KWTX, KXXV, Visit Waco.

Target **2–3 items per week**. Three good ones beat six thin ones.

## 2. Filter — does it earn a slot?

Publish it only if all four are true:

- **Local or it lands locally.** Waco, McLennan County, or a Texas/federal rule
  that changes what a Waco dog parent does. A national story with no Waco angle
  is not a Wag Watch item.
- **It may change behavior.** Dates, rules, closures, recalls, costs, a new
  dog-friendly place. Not "dog news" for its own sake.
- **It is verifiable.** At least one official or first-party source. Two if the
  claim is a rule, a date, a price, or a health risk.
- **It is not distressing filler.** No cruelty stories, no distant tragedy, no
  padding a slow week. A slow week gets one item.

## 3. Verify before writing

- Open every source. Confirm the specific claim, not the headline.
- Confirm dates, addresses, hours, and phone numbers against the primary source.
- Never invent news, quotes, statistics, or a local angle. If the Waco angle
  isn't real, skip the item.
- Sensitive or medical claims: cite a veterinary or official body (AVMA, ASPCA,
  AAHA, Texas A&M Vet Med, FDA recalls, City of Waco, McLennan County).

## 4. Write the item

Append to `wagWatchItems` in `src/data/wagWatch.ts`. Newest items can go
anywhere in the array — `getPublishedWagWatch()` sorts by `publishedDate`.

Required: `id`, `slug`, `headline`, `shortSummary`, `category`, `publishedDate`,
`urgency`, `draft`.

Write the body as the four structured blocks — they render as sections and they
keep the writing honest:

- `whatHappened` — the facts, plainly. No lead-up.
- `whyCare` — why it matters to a dog, specifically.
- `whatToDo` — the action. Concrete, this week, doable.
- `wacoAngle` — the local detail: the park, the street, the clinic, the number.

Then:

- `sourceUrls` + `sourceNames` — parallel arrays, same order, same length.
- `expiresAt` — **always set it.** This is what keeps the page from going stale
  on its own:
  - dated event → day after it ends
  - seasonal (heat, cold, fireworks, holiday) → end of the season
  - rule or program change → 6 months out, then re-check
  - recall → 12 months out
- `geographicScope` — e.g. "Waco & McLennan County".
- `image` — reuse something real from `/public/pictures`. Never a stock dog that
  isn't ours. Omit the field rather than fake it.
- `relatedDirectorySlug` — if a listing in `src/data/directory.ts` fits.
- `campCtaNote` — one sentence tying this update to Camp Clayton. See below.
- `draft: false` to publish. `draft: true` stays invisible on public pages.

### Urgency

| Use | When |
| --- | --- |
| `Important Alert` | Health or safety risk, active now |
| `Act Soon` | There's a deadline — registration, comment period, last day |
| `Good to Know` | Useful, no clock on it |
| `FYI` | Background, nice to have |

Don't inflate. If everything is an alert, nothing is.

## 5. The Camp Clayton CTA

`CampClaytonCta` renders automatically on every article and at the foot of
`/wag-watch` — you don't add it per item. What you write is `campCtaNote`: one
sentence bridging *this* update to a camp day. Make it follow from the item.

- Heat item → "On days the pavement's too hot to walk, camp is indoor-and-shade play with real rest built in."
- Event item → "Not every dog loves a crowd. Camp Clayton is a small, matched playgroup instead."
- Closure item → "Park closed? Camp Clayton runs Monday through Friday, 8–6."

Never promise what camp doesn't do. Existing clients book directly; Rover is the
channel for new clients.

## 6. Ship

```bash
npm run typecheck
npm run lint
npm run dev     # check /wag-watch and each new /wag-watch/<slug>
```

Then confirm on the live URL after deploy.

## Rules

- No invented news, ever. Sources or it doesn't ship.
- Every published item has `expiresAt`. No exceptions.
- `draft: true` is the safe default while you're still verifying.
- Don't touch the Daily Sniff cron routes or `vercel.json` schedules as part of
  writing content.
