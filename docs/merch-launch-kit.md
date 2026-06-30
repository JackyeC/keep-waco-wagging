# Keep Waco Wagging — Merch Launch Kit

Grounded in the live Shopify catalog (`keepwacowagging.myshopify.com`, 84 products) and the two product collages. Covers: (1) shop QA + fixes, (2) product copy, (3) /shop page curation, (4) launch + social content.

Brand voice: warm, local, purpose-driven. Anchor line: **"Cute shirts. Local impact. More tails wagging."** Every purchase supports Waco dogs through volunteer work with Pet Circle Regional Animal Center.

---

## 1) Shop QA — what's live and what to fix

**Status: live and well-stocked.** 84 products, page renders from `products.json`, checkout hands off to Shopify (Printify made-to-order). Categories present: hoodies ($58), crewnecks ($48), breed tees ($25), totes ($25), mugs ($18), stickers ($4–5), pet bandanas, tumbler.

### Revenue-blocking issues (fix these first)

1. **Inconsistent, un-rounded prices.** Several SKUs carry raw Printify markups instead of clean charm prices:
   - `$18.82`, `$20.57`, `$28.99`, `$40.83`, `$37.85`, `$39.60`, `$23.75`
   - These read as "auto-generated," which erodes trust. Set deliberate, consistent prices per category. Suggested:
     - Breed/graphic tees → **$27.99** (floor your margin, round up from the $18–25 spread)
     - Hoodies → **$57.99** · Crewnecks → **$47.99**
     - Totes → **$24.99** · Mugs → **$17.99** · Tumbler → **$39.99** · Stickers → **$4.99** · Bandanas → **$21.99**

2. **Catalog sprawl + duplicates.** 84 SKUs is overwhelming and there are near-duplicate tees:
   - Multiple overlapping "paw print" tees: `keep-waco-wagging-dog-t-shirt-cute-paw-print-graphic-tee`, `...-cute-paw-print-rescue-tee`, `dog-lover-t-shirt-keep-waco-wagging-cute-paw-print-graphic`
   - Two Schnauzer editions (`...schnauzer-edition-1`), two Dog Mom tees (`waco-dog-mom-tee...` and `waco-dog-mom-t-shirt`)
   - **Action:** pick one canonical SKU per design, archive the rest (or set to draft). Fewer, cleaner choices convert better.

3. **Title formatting is inconsistent.** Mix of em-dashes, smart quotes, ALL-CAPS fragments, and SEO-stuffed titles (`Waco Dog Mom Coffee Mug — 'Dog Mom Social Club' Accent Ceramic Mug (11/15oz)`). Standardize to the format in §2.

### Designs in the collages NOT yet live in Shopify (upload opportunities)
These appear in your mockups but have no matching live product — copy is written for them in §2 so they're ready to upload:
- **dog mama** (script) · **Raised on Coffee & Dog Kisses** · **Dogs Make Waco Better** · **Treat People, Love Dogs** · **Shirts for [Pet Name]** (personalized)

### Minor
- Social links in the site footer point to `#` (carryover from the site QA) — wire IG/FB/TikTok before driving launch traffic there.
- Confirm `shop.keepwacowagging.com` (preferred domain in `merchStore.ts`) is connected, so links don't bounce through `*.myshopify.com`.

---

## 2) Product copy

### Title format (use everywhere)
`[Design Name] — [Garment], Waco Texas | Keep Waco Wagging`
Keep under ~60 chars for the SEO title; the on-store product title can drop the brand suffix.

### Description template (3-part, scannable)
1. **Hook** (1 line, the feeling)
2. **Details** (fit, fabric, print, made-to-order)
3. **Purpose line** (the give-back) + CTA

Reusable purpose line:
> Every Keep Waco Wagging order helps local dogs through our volunteer work with Pet Circle Regional Animal Center. Cute shirts, local impact.

---

### Hero designs (mapped to live SKUs)

**Waco Dog Mom Tee** — *live: `waco-dog-mom-tee-...`*
- **Product title:** Waco Dog Mom Tee
- **SEO title:** Waco Dog Mom Tee | Keep Waco Wagging
- **Meta description:** Soft, true-to-size Waco Dog Mom tee for Texas dog moms. Made to order. Every purchase helps local Waco dogs.
- **Description:** For the woman whose camera roll is 90% dog. The Waco Dog Mom tee pairs a clean script with Waco, Texas roots — soft, true-to-size, and made to order in your color. Built for coffee runs, vet visits, and patio afternoons with your best friend. *(+ purpose line)*
- **Tags:** dog mom, waco, womens tee, gift for dog mom, texas

**Waco Dog Dad Tee** — *live: `waco-skyline-t-shirt-waco-dog-dad-graphic-tee`*
- **Product title:** Waco Dog Dad Tee — Skyline
- **SEO title:** Waco Dog Dad Tee — Waco Skyline | Keep Waco Wagging
- **Meta description:** Waco Dog Dad skyline tee for Texas dog dads. Soft, true-to-size, made to order. Supports local Waco dogs.
- **Description:** The leash is his, the couch is the dog's. Our Waco Dog Dad tee tops a hand-drawn Waco skyline with the title he earned. Relaxed fit, soft fabric, made to order. *(+ purpose line)*
- **Tags:** dog dad, waco skyline, mens tee, gift for dog dad, texas

**Anti-Social Dog Club Tee** — *live: `anti-social-dog-club-t-shirt-...`*
- **Product title:** Anti-Social Dog Club — Waco, Texas
- **SEO title:** Anti-Social Dog Club Tee, Waco TX | Keep Waco Wagging
- **Meta description:** "Rather be with my dog" energy. Anti-Social Dog Club Waco tee, made to order. Every order helps local dogs.
- **Description:** Membership requirements: one dog, zero plans. The Anti-Social Dog Club tee says what you're thinking before anyone invites you out. Waco, Texas stamped underneath. Soft, relaxed, made to order. *(+ purpose line)*
- **Tags:** anti social dog club, funny dog shirt, introvert, waco, dog lover

**Keep Waco Wagging — Rescue Mutt Edition** — *live tee `keep-waco-wagging-rescue-mutt-edition` + hoodie/crewneck/tote*
- **Product title:** Keep Waco Wagging — Rescue Mutt Edition
- **SEO title:** Rescue Mutt Tee, Waco Skyline | Keep Waco Wagging
- **Meta description:** For every dog who found their person. Rescue Mutt Waco skyline tee, made to order. Supports Waco rescues.
- **Description:** No papers, all heart. The Rescue Mutt Edition celebrates the best kind of dog under our signature Waco skyline. Available as a tee, crewneck, hoodie, or tote. Made to order. *(+ purpose line)*
- **Tags:** rescue dog, adopt dont shop, mutt, waco skyline, rescue

**Keep Waco Wagging — Landmark Dog Tee (Skyline / Bridge / Courthouse)** — *live: `keep-waco-wagging-t-shirt-waco-landmark-dog-tee`*
- **Product title:** Keep Waco Wagging — Waco Landmark Tee
- **SEO title:** Waco Landmark Dog Tee — Skyline & Bridge | KWW
- **Meta description:** Hand-drawn Waco landmarks — suspension bridge, skyline, courthouse — on a soft dog-lover tee. Made to order.
- **Description:** Three Waco icons, one soft tee: the suspension bridge, the downtown skyline, and the courthouse, drawn by hand for the people who love this town and its dogs. Made to order in your color. *(+ purpose line)*
- **Tags:** waco texas, suspension bridge, skyline, courthouse, local

**Breed Hoodies / Crewnecks / Tees / Totes (13+ breeds)** — *live, full breed run*
- **Title pattern:** Keep Waco Wagging — [Breed] [Garment]
- **SEO title pattern:** [Breed] Waco Skyline [Garment] | Keep Waco Wagging
- **Description (swap the breed):** Your [breed], your city. This [garment] pairs a [breed] with the hand-drawn Waco skyline on premium, made-to-order fabric. Pick your color and size at checkout. *(+ purpose line)*
- **Available breeds:** Golden Retriever, Labrador, Frenchie, Doodle, Maltipoo, Rescue Mutt, Pittie, Schnauzer, Husky, Yorkie, Corgi, Dachshund, Chihuahua, German Shepherd, Australian Shepherd, Catahoula
- **Tags pattern:** [breed], [breed] mom, [breed] dad, waco, dog hoodie

**Keep Waco Wagging Ceramic Mug** — *live: `keep-waco-wagging-ceramic-mug`*
- **Product title:** Keep Waco Wagging Ceramic Mug
- **SEO title:** Waco Dog Mug — Skyline & Golden | Keep Waco Wagging
- **Meta description:** Wrap-around Waco skyline + golden retriever mug. 11oz & 15oz. Coffee and dog kisses included.
- **Description:** Morning fuel for dog people. A wrap-around Waco skyline and golden retriever on a sturdy ceramic mug — 11oz or 15oz. Dishwasher- and microwave-safe. *(+ purpose line)*
- **Tags:** dog mug, waco, coffee, gift, drinkware

**Waco Texas Tote (breed editions)** — *live: breed totes*
- **Product title:** Keep Waco Wagging — [Breed] Tote Bag
- **SEO title:** Waco Texas Tote Bag — [Breed] | Keep Waco Wagging
- **Meta description:** Sturdy cotton Waco tote with [breed] + skyline. Walks, markets, camp runs. Made to order.
- **Description:** One bag for treats, balls, and farmers-market hauls. Heavy cotton canvas with the Waco skyline and your [breed]. *(+ purpose line)*
- **Tags:** tote bag, waco, market bag, dog mom, [breed]

**Pet Bandana (Cairo/Shiloh style)** — *live: pet bandanas*
- **Product title:** Waco Pet Bandana
- **SEO title:** Waco Dog Bandana — Skyline | Keep Waco Wagging
- **Meta description:** Soft over-the-collar Waco bandana for photogenic pups. Two sizes. Every order helps local dogs.
- **Description:** Instant outfit upgrade for the goodest dog. A soft, over-the-collar Waco bandana that photographs as well as it wears. Two sizes for small and large pups. *(+ purpose line)*
- **Tags:** dog bandana, pet accessories, waco, photoshoot, gift

---

### New designs from the collages (copy ready to upload)

**dog mama (script)**
- **Product title:** Dog Mama Tee — Waco, Texas
- **Description:** Soft script, big love. The Dog Mama tee keeps it simple for the women who'd skip the party to stay home with the dog. Waco, Texas underneath. Made to order. *(+ purpose line)*
- **Tags:** dog mama, dog mom, script tee, waco, gift

**Raised on Coffee & Dog Kisses**
- **Product title:** Raised on Coffee & Dog Kisses Tee
- **Description:** Two food groups: caffeine and a cold dog nose. A cozy everyday tee for the perpetually-tired, perpetually-in-love dog person. Waco, Texas. Made to order. *(+ purpose line)*
- **Tags:** coffee, dog kisses, funny dog tee, waco, gift

**Dogs Make Waco Better**
- **Product title:** Dogs Make Waco Better Tee
- **Description:** A small truth, worn loud. This one's for the people who think every patio, park, and porch is improved by a dog. Made to order in your color. *(+ purpose line)*
- **Tags:** waco, community, dog lover, local pride, tee

**Treat People, Love Dogs**
- **Product title:** Treat People, Love Dogs Tee
- **Description:** A whole philosophy on one soft tee. Be kind, love dogs, repeat. Waco, Texas. Made to order. *(+ purpose line)*
- **Tags:** kindness, dog lover, waco, gift, tee

**Shirts for [Pet Name] (personalized)**
- **Product title:** Personalized "Shirts for [Name]" Dog Tee
- **Description:** Put your dog's name on it. A personalized tee for the pup who runs the house — add their name at checkout. Made to order. *(+ purpose line)*
- **Tags:** personalized, custom dog name, gift, waco, tee

---

## 3) /shop page curation (from 84 SKUs → a page that sells)

Your `src/app/shop/page.tsx` already groups by category from Shopify. The fix is **curation + ordering**, not new code. Recommended structure top-to-bottom:

1. **Featured row (5–6 best-sellers)** — keep `liveMerchProducts` in `merchStore.ts` as the curated hero set. Suggested featured, using real live handles/prices:
   - Waco Dog Mom Tee · Waco Dog Dad Skyline Tee · Anti-Social Dog Club Tee · Rescue Mutt Hoodie · Keep Waco Wagging Ceramic Mug · Golden Retriever Tote
2. **Shop by design** (Dog Mom · Dog Dad · Anti-Social · Rescue · Landmark/Skyline · Sayings) — message-first, how people actually shop.
3. **Shop by breed** — a single breed picker that filters tee/hoodie/crewneck/tote, instead of 60 separate cards.
4. **Accessories** — totes, mugs, tumbler, bandanas, stickers.
5. Keep the existing "Wear your love, help Waco dogs" panel and the Pet Circle give-back line — that's your differentiator; pull it higher.

**Low-risk, immediately usable change:** update the curated featured list in `src/data/merchStore.ts` to the six above (real handles already exist in Shopify) and round prices to match §1. I can prep that diff on request — flag whether you want me to also archive the duplicate SKUs in Shopify (needs store access) or just list them for you.

---

## 4) Launch + social content

### Positioning
"Waco's hometown dog brand — cute, local, and giving back." Lead with identity (Dog Mom/Dad, breed pride, rescue love) + local pride (skyline/bridge) + purpose (Pet Circle).

### Launch sequence (1 week)
- **Day 1 — Tease:** collage + "Waco dog people, this one's for you. 👀 Dropping [date]."
- **Day 2 — Hero drop:** Dog Mom / Dog Dad tees, link to /shop.
- **Day 3 — Breed spotlight:** carousel of breed tees; "Find your dog." (UGC-friendly)
- **Day 4 — Purpose:** Pet Circle give-back story; "What your order does."
- **Day 5 — Accessories:** totes + mugs + bandanas flat-lays.
- **Day 6 — Social proof / UGC:** repost the lifestyle shots; "Tag us in yours."
- **Day 7 — Urgency:** "Launch week ends tonight — [offer]."

### Ready-to-post captions

**Instagram / Facebook — launch**
> It's here. 🐾 Keep Waco Wagging merch is live.
> Dog Mom & Dog Dad tees, breed editions, Waco skyline totes, and mugs made for the people who love this town and its dogs.
> Cute shirts. Local impact. More tails wagging — every order helps local dogs through Pet Circle Regional Animal Center.
> 🛍️ Shop the drop → keepwacowagging.com/shop
> #WacoTexas #WacoDogs #DogMom #DogDad #ShopLocalWaco

**Breed spotlight**
> Golden? Doodle? Proud rescue mutt? We made a tee for your dog. 🐶
> 16 breed editions on the Waco skyline — tees, hoodies, crewnecks & totes.
> Find yours → keepwacowagging.com/shop
> #WacoDogs #[Breed]Mom #KeepWacoWagging

**Purpose post**
> Why "purpose-driven merch"? Because every Keep Waco Wagging order helps us show up for local dogs — care, enrichment, and second chances through Pet Circle Regional Animal Center.
> Wear your love. Help Waco dogs. 🐾 keepwacowagging.com/shop

**Anti-Social Dog Club**
> Plans tonight? No. It's me and the dog. 🛋️🐕
> The Anti-Social Dog Club tee gets it. Waco, Texas approved.
> keepwacowagging.com/shop #AntiSocialDogClub #WacoDogs

### Email blurb (newsletter)
> **Subject:** Waco dog people — the merch is here 🐾
> Dog Mom & Dog Dad tees, 16 breed editions, skyline totes, and mugs — all made to order, all giving back to local dogs through Pet Circle. Launch week only: [offer]. **Shop the drop →**

### Hashtag bank
`#WacoTexas #WacoDogs #KeepWacoWagging #DogMom #DogDad #ShopLocalWaco #WacoSmallBusiness #AdoptDontShop #DogsOfWaco #[Breed]Mom`

### Launch offer ideas (pick one)
- Free local pickup or free shipping over $50 (launch week)
- 15% off first order for newsletter subscribers (ties merch → list growth)
- "$X from every launch-week order goes to Pet Circle" (leads with mission; great for press)
