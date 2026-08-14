# Printify → Shopify Listing Copy

Internal developer/operator note. Do not render on the public site.

Publish-ready copy for the pet-accessory line tracked in
`src/data/printifyPetCatalog.ts`. Workflow for each item:

1. **Printify** → create the product from the linked blueprint, drop in the KWW
   artwork (skyline + breed/wordmark), set the print area.
2. **Printify** → *Publish* to the connected Shopify store.
3. **Shopify** → paste the Title, Description, and Tags below, set the price,
   then **set status to Active** (remove any "DRAFT — pending review" text — the
   `/shop` page strips it, but clean copy is better).
4. The live `/shop` grid auto-syncs from Shopify within ~10 min
   (`src/lib/shopifyCatalog.ts`, 600s revalidate). When an item goes live,
   flip its `status` to `"live"` (and add the real `shopifyHandle`) in
   `printifyPetCatalog.ts` so it drops out of the "coming soon" panel.

Brand voice: warm, local, purpose-driven. Tag line to weave in —
*"Every purchase helps Keep Waco Wagging support dogs in need through our
volunteer work with Pet Circle Regional Animal Center."*

Category mapping is automatic from `product_type` + title keywords
(`getMerchCategory` in `shopifyCatalog.ts`). The recommended **Product type**
is listed per item so it buckets correctly on `/shop`.

---

## Priority 1 — Drafts (already in Shopify, just clean + publish)

### Ceramic Mug
- **Status:** draft → publish (handle `keep-waco-wagging-ceramic-mug`)
- **Shopify Product type:** `Mug`
- **Suggested price:** $18.00 (11oz) / $22.00 (15oz)
- **Title:** Keep Waco Wagging Ceramic Mug — Waco Skyline
- **Description:**
  > Start every morning with a little Waco love. This ceramic mug wraps a
  > panoramic Waco skyline, a golden retriever, and the Platinum Scoops badge
  > all the way around — coffee, kibble-time, or cocoa on the porch. Dishwasher
  > and microwave safe, printed on demand. Every purchase helps Keep Waco
  > Wagging support local dogs in need.
- **Tags:** `Product Type: Mug`, `Waco`, `Drinkware`, `Keep Waco Wagging`

### KWW / Waco / Platinum Scoops Stickers
- **Status:** draft → publish (handle `keep-waco-wagging-sticker-golden-skyline`)
- **Shopify Product type:** `Paper products`
- **Suggested price:** $4.00 each / $10.00 3-pack
- **Title:** Keep Waco Wagging Sticker — Golden + Skyline
- **Description:**
  > Slap a little Waco wag on your water bottle, laptop, or truck window.
  > Durable, weatherproof vinyl in three designs — golden + Waco skyline, Waco
  > Texas wordmark, and the Platinum Scoops scoop logo. Every sticker helps us
  > keep more tails wagging around town.
- **Tags:** `Product Type: Sticker`, `Waco`, `Stickers`, `Platinum Scoops`

---

## Priority 2 — Planned (create in Printify, then publish)

> Breed editions follow the hoodie naming: **Keep Waco Wagging — {Breed} {Item}**.
> Breeds available: Golden Retriever, Frenchie, Rescue Mutt, Labrador, Corgi,
> Doodle, Pittie, Schnauzer, Siberian Husky, Yorkie, Chihuahua, Dachshund,
> German Shepherd, Australian Shepherd, Catahoula, Maltipoo.

### Pet Bandana (Evergreen) — Printify #562
- **Product type:** `Pets` · **Price:** $14.00 · **Title:** Keep Waco Wagging — {Breed} Pet Bandana
- **Description:** Dress your pup for Yappy Hours and downtown walks. A
  clip-over bandana with the Waco skyline and your dog's breed edition — soft,
  lightweight, and made to order. Available in 16 KWW breed editions.
- **Tags:** `Product Type: Bandana`, `KWW Breeds`, `Dog Accessories`, `Waco`

### Clip-on Pet Bandana — Printify #1672
- **Product type:** `Pets` · **Price:** $12.00 · **Title:** Keep Waco Wagging Clip-On Bandana
- **Description:** A no-tie, slide-on-the-collar bandana with a minimalist Waco
  skyline stripe and paw. Quick to put on, easy to love — perfect for camp
  drop-off and weekend strolls.
- **Tags:** `Product Type: Bandana`, `Dog Accessories`, `Waco`

### Pet Food Mat (12×18) — Printify #855
- **Product type:** `Pets` · **Price:** $24.00 · **Title:** Keep Waco Wagging Pet Food Mat — Waco Skyline
- **Description:** Catch the splashes and crumbs in style. A 12×18 feeding mat
  with a panoramic Waco skyline and the Platinum Scoops badge in the corner.
  Pairs with our stainless bowls from the Gear Guide.
- **Tags:** `Product Type: Feeding Mat`, `Platinum Scoops`, `Waco`

### Pet Feeding Mats — Printify #623
- **Product type:** `Pets` · **Price:** $20.00 · **Title:** Keep Waco Wagging Feeding Mat
- **Description:** A compact feeding mat with a repeating paw-and-skyline
  pattern — keeps the kibble corner tidy with a little Waco character.
- **Tags:** `Product Type: Feeding Mat`, `Waco`

### Pet Bowl (Ceramic) — Printify #570
- **Product type:** `Pets` · **Price:** $22.00 · **Title:** Keep Waco Wagging Ceramic Pet Bowl
- **Description:** A ceramic pet bowl wrapped in the Waco skyline or your dog's
  breed edition. Sturdy, dishwasher safe, and made to match the mug on your
  counter. Choose a breed edition or the classic golden + skyline.
- **Tags:** `Product Type: Bowl`, `KWW Breeds`, `Waco`

### Stainless Pet Bowl, 18oz — Printify #1520
- **Product type:** `Pets` · **Price:** $28.00 · **Title:** Keep Waco Wagging Stainless Pet Bowl — 18oz
- **Description:** The premium pick. An 18oz Polar Camel stainless bowl with a
  printed Waco skyline band and wordmark — rust-resistant, tip-resistant, and
  built for daily use. Big-dog friendly.
- **Tags:** `Product Type: Bowl`, `Waco`, `Premium`

### Pet ID Tag — Printify #566
- **Product type:** `Pets` · **Price:** $12.00 · **Title:** Keep Waco Wagging Pet ID Tag
- **Description:** A round pet tag with the Keep Waco Wagging mark on the front
  and room for your number on the back. Choose the Waco skyline or paw design —
  because every Waco pup deserves a way home.
- **Tags:** `Product Type: Pet Tag`, `Waco`, `Dog Accessories`

### Engraved Pet Tag — Printify #10674
- **Product type:** `Pets` · **Price:** $16.00 · **Title:** Keep Waco Wagging Engraved Pet Tag
- **Description:** A laser-engraved pet tag with Waco skyline line art and the
  Keep Waco Wagging wordmark. Five color options — navy and gold are our
  favorites. Durable, deep engraving that won't rub off.
- **Tags:** `Product Type: Pet Tag`, `Waco`, `Dog Accessories`

### Dog Collar — Printify #784
- **Product type:** `Pets` · **Price:** $22.00 · **Title:** Keep Waco Wagging Dog Collar — Waco Skyline
- **Description:** A durable everyday collar with a subtle Waco skyline repeat
  on the strap. Pair it with the matching bandana collar for the full set.
- **Tags:** `Product Type: Collar`, `Dog Accessories`, `Waco`

### Clip-on Pet Collar — Printify #1677
- **Product type:** `Pets` · **Price:** $18.00 · **Title:** Keep Waco Wagging Clip-On Collar
- **Description:** A lightweight clip-on collar with the KWW wordmark and a
  small Waco skyline icon — simple, comfy, and unmistakably local.
- **Tags:** `Product Type: Collar`, `Dog Accessories`, `Waco`

### Retractable Pet Leash — Printify #2791
- **Product type:** `Pets` · **Price:** $26.00 · **Title:** Keep Waco Wagging Retractable Leash
- **Description:** A retractable leash with the Keep Waco Wagging wordmark on the
  handle grip — made for Waco walk culture, camp days, and Yappy Hour strolls.
- **Tags:** `Product Type: Leash`, `Dog Accessories`, `Waco`

### Pet Bed — Printify #419
- **Product type:** `Pets` · **Price:** $48.00 · **Title:** Keep Waco Wagging Pet Bed — Rescue Mutt Edition
- **Description:** A cozy pet bed with a large rescue-mutt-and-skyline print —
  the comfiest spot in the house for the dog who found their person. A boarding-
  and camp-crossover favorite. Other breed editions available on request.
- **Tags:** `Product Type: Pet Bed`, `KWW Breeds`, `Waco`

### Pet Tank Top — Printify #571
- **Product type:** `Pets` · **Price:** $20.00 · **Title:** Keep Waco Wagging — {Breed} Pet Tank
- **Description:** Summer-camp and Yappy-Hour ready. A lightweight pet tank with
  your dog's breed edition on the back and the KWW wordmark on the chest. Made to
  order in 16 breed editions.
- **Tags:** `Product Type: Pet Apparel`, `KWW Breeds`, `Yappy Hours`

### Dog Foam Trucker Hat — Printify #5378
- **Product type:** `Pets` · **Price:** $18.00 · **Title:** Keep Waco Wagging Dog Trucker Hat
- **Description:** Yes, a trucker hat for your dog. Foam front panel with the
  Waco skyline or Platinum Scoops scoop logo — peak Yappy Hour energy and an
  instant photo op.
- **Tags:** `Product Type: Pet Apparel`, `Platinum Scoops`, `Waco`

---

## After publishing — update the catalog

For each item you take live, edit `src/data/printifyPetCatalog.ts`:

```ts
status: "live",                      // was "planned" or "draft"
shopifyHandle: "the-real-shopify-handle",
```

That removes it from the `PlannedPetAccessoriesPanel` "coming soon" list and
keeps the blueprint catalog honest. The product itself appears on `/shop`
automatically from the Shopify sync — no other code change required.
