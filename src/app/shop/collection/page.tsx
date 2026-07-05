import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  batch1CuratedCollectionMeta,
  batch1CuratedHandles,
} from "@/data/batch1CuratedCollection";
import { merchAnchorLine } from "@/data/merchCuration";
import { ShopBagButton } from "@/components/merch/ShopCartDrawer";
import { ShopExperience } from "@/components/merch/ShopExperience";
import { ShopProductGrid } from "@/components/merch/ShopProductGrid";
import {
  getShopifyStorefrontUrl,
  shopifyStoreConfig,
} from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyCatalog } from "@/lib/shopifyCatalog";
import type { MerchProduct } from "@/data/merchStore";

export const revalidate = 600;

const pageTitle = "Waco Dog Life Collection | Keep Waco Wagging";
const pageDescription =
  "Three launch favorites for Waco dog parents — dog mom tee and drinkware from Keep Waco Wagging.";

export const metadata: Metadata = servicePageMetadata(
  "/shop/collection",
  pageTitle,
  pageDescription,
);

function ShopBagBar() {
  return (
    <div className="border-b border-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.1em] text-body-muted uppercase hover:text-wag-sage"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to shop
        </Link>
        <ShopBagButton />
      </div>
    </div>
  );
}

function pickCuratedProducts(
  catalog: MerchProduct[],
): MerchProduct[] {
  const byHandle = new Map(catalog.map((p) => [p.slug, p]));
  const picked: MerchProduct[] = [];

  for (const handle of batch1CuratedHandles) {
    const product = byHandle.get(handle);
    if (product) picked.push(product);
  }

  return picked;
}

export default async function CuratedCollectionPage() {
  const { products: catalog, cartOptionsByHandle, error } =
    await fetchShopifyCatalog();
  const curated = pickCuratedProducts(catalog);
  const storefrontUrl = getShopifyStorefrontUrl();

  return (
    <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
      <ShopBagBar />

      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-6">
        <p className="eyebrow tracking-[0.22em]">Curated collection</p>
        <h1 className="display mt-2 text-balance">
          {batch1CuratedCollectionMeta.title}
        </h1>
        <p className="dek mt-4 max-w-2xl">{batch1CuratedCollectionMeta.description}</p>
        <p className="mt-2 text-sm font-light text-body-muted-light">
          {merchAnchorLine} · {curated.length} launch{" "}
          {curated.length === 1 ? "favorite" : "favorites"}
        </p>
      </section>

      {error && (
        <section className="mx-auto max-w-[1200px] px-6 pb-6">
          <div className="rounded-[18px] border border-rose/40 bg-soft-cream px-6 py-4 text-sm text-body-muted-light">
            {error}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1200px] px-6 pb-16">
        {curated.length > 0 ? (
          <ShopProductGrid products={curated} columns={3} />
        ) : (
          <div className="card-panel px-8 py-12 text-center">
            <p className="font-display text-2xl text-serif-ink">
              Collection loading…
            </p>
            <p className="body-light mx-auto mt-3 max-w-md text-sm">
              We could not load curated products. Try again shortly.
            </p>
          </div>
        )}

        <aside className="mt-10 max-w-2xl rounded-[18px] border border-border bg-soft-cream p-5">
          <p className="text-sm font-light leading-relaxed text-body-muted-light">
            {shopifyStoreConfig.fulfillmentNote}
          </p>
          <p className="mt-2 text-xs font-light text-label-muted">
            {shopifyStoreConfig.externalCheckoutNote}
          </p>
          <p className="mt-2 text-xs font-light text-label-muted">
            {shopifyStoreConfig.priceDisplayNote}
          </p>
        </aside>

        {storefrontUrl && (
          <p className="mt-8 text-center text-[11px] font-light text-label-muted">
            Operational access:{" "}
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-wag-sage"
            >
              full Shopify catalog
            </a>{" "}
            (not promoted — 84 products)
          </p>
        )}
      </div>
    </ShopExperience>
  );
}
