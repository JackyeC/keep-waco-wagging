import type { Metadata } from "next";
import Link from "next/link";
import { BreedLineCard } from "@/components/merch/BreedLineCard";
import { BreedTile } from "@/components/merch/BreedTile";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { ShopHero } from "@/components/merch/ShopHero";
import { ShopPromo } from "@/components/merch/ShopPromo";
import { ShopPurchaseNotes } from "@/components/merch/ShopPurchaseNotes";
import { ShopShell } from "@/components/merch/ShopShell";
import { ShopTrust } from "@/components/merch/ShopTrust";
import { ShopJsonLd } from "@/components/seo/ShopJsonLd";
import { shopGraphics } from "@/data/shopGraphics";
import { pickFeaturedProducts } from "@/data/merchCuration";
import type { MerchProduct } from "@/data/merchStore";
import { getShopifyStorefrontUrl } from "@/data/merchStore";
import { breedFromCatalog } from "@/lib/merchLines";
import { servicePageMetadata } from "@/lib/metadata";
import { getShopCatalogView } from "@/lib/shopCatalogView";
import { breedArtSrc, withProductArt } from "@/lib/shopSlots";

export const revalidate = 600;

const pageTitle = "Waco Dog Merch | Tees, Hoodies, and Totes | Keep Waco Wagging";
const pageDescription =
  "Shop Waco dog merch from Keep Waco Wagging in China Spring, TX. Breed skyline tees, hoodies, crewnecks, and totes, made to order by Jackye and Todd.";

export const metadata: Metadata = servicePageMetadata(
  "/shop",
  pageTitle,
  pageDescription,
  {
    src: shopGraphics.og.src,
    alt: shopGraphics.og.alt,
    width: shopGraphics.og.width,
    height: shopGraphics.og.height,
  },
);

const PURCHASE_NOTE = "Made to order. Shipping at checkout.";

/** Totes show the dog larger than a folded hoodie, so the breed grid is easier to scan. */
function breedTileSample(products: MerchProduct[]): MerchProduct | undefined {
  return (
    products.find((product) => /tote/i.test(`${product.name} ${product.productType ?? ""}`)) ??
    products.find((product) => /tee|t-shirt/i.test(`${product.name} ${product.productType ?? ""}`)) ??
    products[0]
  );
}

function moreGroups(products: MerchProduct[]) {
  const groups: { id: string; title: string; products: MerchProduct[] }[] = [
    { id: "tees", title: "Tees with a point of view", products: [] },
    { id: "bags", title: "Bags", products: [] },
    { id: "mugs", title: "Mugs", products: [] },
    { id: "dogs", title: "For the dog", products: [] },
    { id: "more", title: "Stickers and gifts", products: [] },
  ];

  for (const product of products) {
    const hay = `${product.name} ${product.productType ?? ""}`.toLowerCase();
    if (/tee|t-shirt|shirt/.test(hay) && !/hoodie|crewneck|sweatshirt/.test(hay)) {
      groups[0]!.products.push(product);
    } else if (/weekender|tote|bag/.test(hay)) {
      groups[1]!.products.push(product);
    } else if (/mug|tumbler/.test(hay)) {
      groups[2]!.products.push(product);
    } else if (/bandana|collar/.test(hay)) {
      groups[3]!.products.push(product);
    } else {
      groups[4]!.products.push(product);
    }
  }

  return groups.filter((group) => group.products.length > 0);
}

export default async function ShopPage() {
  const { allProducts, cartOptionsByHandle, error, merch } =
    await getShopCatalogView();
  const storefrontUrl = getShopifyStorefrontUrl();
  const featured = pickFeaturedProducts(merch.singles, 4);
  const leadSource = featured[0] ?? merch.singles[0];
  const lead = leadSource ? withProductArt(leadSource) : undefined;
  const highlights = featured
    .filter((product) => product.slug !== lead?.slug)
    .slice(0, 3)
    .map(withProductArt);
  const used = new Set([lead?.slug, ...highlights.map((product) => product.slug)]);
  const rest = merch.singles
    .filter((product) => !used.has(product.slug))
    .map(withProductArt);
  const groups = moreGroups(rest);

  return (
    <ShopShell cartOptionsByHandle={cartOptionsByHandle}>
      <ShopJsonLd
        products={allProducts}
        cartOptionsByHandle={cartOptionsByHandle}
      />
      <ShopHero />

      {error && (
        <section className="mx-auto max-w-[1200px] px-5 pt-8 sm:px-6">
          <p className="text-sm font-light text-body-muted-light">
            {error}{" "}
            {storefrontUrl && (
              <a
                href={storefrontUrl}
                className="text-rose-deep underline underline-offset-2 hover:text-wag-sage"
              >
                Browse on Shopify
              </a>
            )}
          </p>
        </section>
      )}

      {allProducts.length === 0 ? (
        <section className="mx-auto max-w-[720px] px-5 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl text-serif-ink">
            Merch is taking a minute
          </h2>
          <p className="mt-3 text-sm font-light text-body-muted">
            We could not load the shop. Try again shortly.
          </p>
        </section>
      ) : (
        <div className="mx-auto max-w-[1200px] px-5 pt-8 pb-20 sm:px-6">
          <nav aria-label="Shop sections" className="flex flex-nowrap gap-x-5 overflow-x-auto text-xs font-medium tracking-[0.14em] text-label-muted uppercase">
            <a href="#the-edit" className="hover:text-serif-ink">The edit</a>
            <a href="#breed-lines" className="hover:text-serif-ink">Breed lines</a>
            <a href="#shop-by-breed" className="hover:text-serif-ink">Shop by breed</a>
            {rest.length > 0 && (
              <a href="#more" className="hover:text-serif-ink">More designs</a>
            )}
          </nav>

          <section id="the-edit" className="scroll-mt-28 mt-8">
            <h2 className="heading text-[clamp(1.7rem,3vw,2.4rem)]">The edit</h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed font-light text-body-muted">
              Start with a favorite. Breed lines are just below.
            </p>
            {lead && (
              <div className="mt-5 max-w-3xl">
                <MerchProductCard
                  product={lead}
                  layout="lead"
                  frame="square"
                  showBenefit
                  ctaStyle="button"
                  priority
                  purchaseNote={PURCHASE_NOTE}
                  detailViewSource="shop_lead"
                />
                {breedFromCatalog(lead) && (
                  <p className="mt-3 text-sm font-light text-label-muted">
                    <Link
                      href={`/shop/breed/${breedFromCatalog(lead)!.id}`}
                      className="underline underline-offset-2 hover:text-rose-deep"
                    >
                      More {breedFromCatalog(lead)!.label} pieces
                    </Link>
                  </p>
                )}
              </div>
            )}
            <div className="mt-4 max-w-xl">
              <ShopPurchaseNotes />
            </div>
            <div className="mt-6 max-w-3xl">
              <ShopPromo />
            </div>
            {highlights.length > 0 && (
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((product) => (
                  <MerchProductCard
                    key={product.id}
                    product={product}
                    frame="square"
                    showBenefit
                    ctaStyle="button"
                    purchaseNote={PURCHASE_NOTE}
                  />
                ))}
              </div>
            )}
          </section>

          {merch.lines.length > 0 && (
            <section id="breed-lines" className="scroll-mt-28 mt-16">
              <h2 className="heading text-[clamp(1.8rem,3vw,2.4rem)]">
                One design, your breed
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed font-light text-body-muted">
                The skyline pieces share a design. Pick the line, then pick the dog.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {merch.lines.map((line) => (
                  <BreedLineCard key={line.id} line={line} />
                ))}
              </div>
            </section>
          )}

          {merch.breeds.length > 0 && (
            <section id="shop-by-breed" className="scroll-mt-28 mt-16">
              <h2 className="heading text-[clamp(1.8rem,3vw,2.4rem)]">
                Shop by breed
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed font-light text-body-muted">
                Pick your dog. You&apos;ll see only the pieces we actually print for that breed.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {merch.breeds.map((breed) => {
                  const sample = breedTileSample(breed.products);
                  const src = sample?.image?.src
                    ? breedArtSrc(breed.id, sample.image.src)
                    : undefined;
                  const count = breed.products.length;
                  return (
                    <li key={breed.id}>
                      <BreedTile
                        href={`/shop/breed/${breed.id}`}
                        src={src}
                        alt={`${breed.label}, Keep Waco Wagging`}
                        label={breed.label}
                        detail={`${count} ${count === 1 ? "piece" : "pieces"}`}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {groups.length > 0 && (
            <section id="more" className="scroll-mt-28 mt-16">
              <h2 className="heading text-[clamp(1.8rem,3vw,2.4rem)]">
                More from the shop
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed font-light text-body-muted">
                The designs that are not a breed set. Each one stands on its own.
              </p>
              {groups.map((group) => (
                <div key={group.id} className="mt-10">
                  <h3 className="font-display text-[1.55rem] font-medium text-serif-ink">
                    {group.title}
                  </h3>
                  <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {group.products.map((product) => (
                      <MerchProductCard
                        key={product.id}
                        product={product}
                        frame="square"
                        showBenefit
                        ctaStyle="button"
                        purchaseNote={PURCHASE_NOTE}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          <ShopTrust />
        </div>
      )}
    </ShopShell>
  );
}
