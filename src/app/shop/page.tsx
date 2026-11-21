import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BreedChoice,
  BreedChoiceGrid,
  BreedChoiceItem,
} from "@/components/merch/BreedChoice";
import { BreedLineCard } from "@/components/merch/BreedLineCard";
import { ShopFavoriteCard } from "@/components/merch/ShopFavoriteCard";
import { ShopHero } from "@/components/merch/ShopHero";
import { ShopPromo } from "@/components/merch/ShopPromo";
import { ShopPurchaseNotes } from "@/components/merch/ShopPurchaseNotes";
import { ShopShell } from "@/components/merch/ShopShell";
import { ShopTrust } from "@/components/merch/ShopTrust";
import { ShopJsonLd } from "@/components/seo/ShopJsonLd";
import type { MerchProduct } from "@/data/merchStore";
import { getShopifyStorefrontUrl } from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { getShopCatalogView } from "@/lib/shopCatalogView";
import { resolveShopFavorites, resolveShopHero } from "@/lib/shopFavorites";
import { findGiftCardProduct } from "@/lib/shopPublicCatalog";

export const revalidate = 600;

const pageTitle = "Waco Dog Merch | Tees, Hoodies, and Totes | Keep Waco Wagging";
const pageDescription =
  "Shop Waco dog merch from Keep Waco Wagging in China Spring, TX. Breed skyline tees, hoodies, crewnecks, and totes, made to order by Jackye and Todd.";

export async function generateMetadata(): Promise<Metadata> {
  const { allProducts } = await getShopCatalogView();
  const favorite = resolveShopHero(allProducts) ?? resolveShopFavorites(allProducts)[0];
  return servicePageMetadata(
    "/shop",
    pageTitle,
    pageDescription,
    favorite
      ? {
          src: favorite.src,
          alt: favorite.alt,
          width: 1200,
          height: 1200,
        }
      : undefined,
  );
}

const WAG_CLUB_PERKS = [
  "Weekend ideas",
  "Wag Watch notes",
  "Local recommendations",
] as const;

function SectionIntro({
  title,
  dek,
}: {
  title: string;
  dek: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="heading text-[clamp(1.8rem,3vw,2.4rem)]">{title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed font-light text-body-muted">{dek}</p>
    </div>
  );
}

function OfferCard({
  href,
  eyebrow,
  title,
  body,
  cta,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      className="flex h-full flex-col rounded-[20px] border border-border bg-soft-cream px-5 py-6 text-center transition-colors hover:border-wag-sage"
    >
      <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-[1.45rem] leading-tight font-medium text-serif-ink">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed font-light text-body-muted">
        {body}
      </p>
      <span className="btn-pill btn-sage mt-6 inline-flex min-h-11 w-full items-center justify-center px-4 py-3 text-[11px]">
        {cta}
      </span>
    </a>
  );
}

function giftCardCopy(product: MerchProduct): string {
  return product.price ? `${product.name}. ${product.price}.` : `${product.name}.`;
}

export default async function ShopPage() {
  const { allProducts, cartOptionsByHandle, error, merch } =
    await getShopCatalogView();
  const storefrontUrl = getShopifyStorefrontUrl();
  const giftCard = findGiftCardProduct(allProducts);
  const offerCount = giftCard ? 3 : 2;
  const hero = resolveShopHero(allProducts);
  const favorites = resolveShopFavorites(allProducts);

  return (
    <ShopShell cartOptionsByHandle={cartOptionsByHandle}>
      <ShopJsonLd
        products={allProducts}
        cartOptionsByHandle={cartOptionsByHandle}
        image={hero?.src ?? favorites[0]?.src}
      />
      <ShopHero hero={hero} />

      {error && (
        <section className="mx-auto max-w-[1100px] px-5 pt-8 text-center sm:px-6">
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
        <div className="mx-auto max-w-[1100px] px-5 pt-16 pb-24 sm:px-6 sm:pt-20">
          {favorites.length > 0 && (
            <section id="shop-favorites" className="scroll-mt-28">
              <SectionIntro
                title="Shop favorites"
                dek="The Wag Club weekender, and the paw print tees."
              />
              <div className="mx-auto mt-12 flex max-w-[960px] flex-wrap justify-center gap-x-4 gap-y-6 sm:gap-x-6">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.product.slug}
                    className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                  >
                    <ShopFavoriteCard favorite={favorite} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {merch.lines.length > 0 && (
            <section id="breed-lines" className="scroll-mt-28 mt-20 sm:mt-28">
              <SectionIntro
                title="One design, your breed"
                dek="The skyline pieces share a design. Pick the line, then pick the dog."
              />
              <div className="mt-8 grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4 lg:gap-6">
                {merch.lines.map((line) => (
                  <BreedLineCard key={line.id} line={line} />
                ))}
              </div>
              <div className="mx-auto mt-6 max-w-xl text-center">
                <ShopPurchaseNotes />
              </div>
              <div className="mx-auto mt-6 max-w-2xl">
                <ShopPromo />
              </div>
            </section>
          )}

          {merch.breeds.length > 0 && (
            <section id="shop-by-breed" className="scroll-mt-28 mt-20 sm:mt-28">
              <SectionIntro
                title="Shop by breed"
                dek="Pick your dog. You'll see only the pieces we print for that breed."
              />
              <BreedChoiceGrid>
                {merch.breeds.map((breed) => {
                  const count = breed.products.length;
                  return (
                    <BreedChoiceItem key={breed.id}>
                      <BreedChoice
                        href={`/shop/breed/${breed.id}`}
                        label={breed.label}
                        detail={`${count} ${count === 1 ? "piece" : "pieces"}`}
                      />
                    </BreedChoiceItem>
                  );
                })}
              </BreedChoiceGrid>
            </section>
          )}

          <section id="wag-club" className="scroll-mt-28 mt-20 sm:mt-28">
            <div className="mx-auto max-w-3xl rounded-[24px] border border-border bg-soft-cream px-6 py-8 text-center sm:px-10 sm:py-10">
              <Image
                src="/wagclub/wag-club-emblem.webp"
                alt="The Wag Club emblem"
                width={240}
                height={160}
                className="mx-auto h-auto w-28"
              />
              <h2 className="heading mt-4 text-[clamp(1.8rem,3vw,2.4rem)]">
                The Wag Club
              </h2>
              <p className="mt-2 font-display text-[1.25rem] font-medium text-serif-ink">
                Dogs. Waco. People who get it.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed font-light text-body-muted">
                Weekend ideas, Wag Watch notes, and local recommendations. Wear
                your shirt. Find your people. Free to join.
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {WAG_CLUB_PERKS.map((perk) => (
                  <li
                    key={perk}
                    className="rounded-full border border-border px-3 py-1 text-[12px] font-light text-body-muted"
                  >
                    {perk}
                  </li>
                ))}
              </ul>
              <Link
                href="/wagclub"
                className="btn-pill btn-sage mt-6 inline-flex min-h-11 px-7 py-3"
              >
                See The Wag Club
              </Link>
            </div>
          </section>

          <section id="more-from-kww" className="scroll-mt-28 mt-20 sm:mt-28">
            <SectionIntro
              title="More from Keep Waco Wagging"
              dek={
                giftCard
                  ? "Care, a cleaner yard, and a gift for the shop."
                  : "Care and a cleaner yard."
              }
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              <div className={`h-full ${offerCount === 3 ? "w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]" : "w-full max-w-md sm:w-[calc(50%-0.75rem)]"}`}>
              <OfferCard
                href="/book"
                eyebrow="Boarding and daycare"
                title="Camp Waco"
                body="Home boarding and Camp Clayton daycare for dogs in the Waco area."
                cta="Book care"
              />
              </div>
              <div className={`h-full ${offerCount === 3 ? "w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]" : "w-full max-w-md sm:w-[calc(50%-0.75rem)]"}`}>
              <OfferCard
                href="/platinum-scoops"
                eyebrow="Yard cleanup"
                title="Platinum Scoops"
                body="Initial cleanup from $100. Weekly scooping from $25."
                cta="See Platinum Scoops"
              />
              </div>
              {giftCard && (
                <div className="h-full w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <OfferCard
                  href={`/shop/product/${giftCard.slug}`}
                  eyebrow="Give the shop"
                  title="Gift card"
                  body={giftCardCopy(giftCard)}
                  cta="Shop the gift card"
                />
                </div>
              )}
            </div>
          </section>

          <ShopTrust />
        </div>
      )}
    </ShopShell>
  );
}
