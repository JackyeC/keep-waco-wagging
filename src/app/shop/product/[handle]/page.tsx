import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { ProductGallery } from "@/components/merch/ProductGallery";
import {
  apparelSizes,
  ShopPurchaseNotes,
} from "@/components/merch/ShopPurchaseNotes";
import { ShopShell } from "@/components/merch/ShopShell";
import { ProductJsonLd } from "@/components/seo/ShopJsonLd";
import { breedFromCatalog } from "@/lib/merchLines";
import { publicMerchBenefit, publicMerchDescription } from "@/lib/merchCopy";
import { servicePageMetadata } from "@/lib/metadata";
import { getShopCatalogView } from "@/lib/shopCatalogView";
import { productArtSlot } from "@/data/shopGraphics";
import { preferSlot } from "@/lib/shopSlots";

export const revalidate = 600;

type Params = { handle: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const { allProducts } = await getShopCatalogView();
  const product = allProducts.find((item) => item.slug === handle);
  if (!product) {
    return { title: "Product not found" };
  }
  const benefit = publicMerchBenefit(product.description, product.name);
  const description =
    benefit ||
    publicMerchDescription(product.description) ||
    `${product.name} from Keep Waco Wagging in China Spring, TX.`;
  return servicePageMetadata(
    `/shop/product/${product.slug}`,
    `${product.name} | Keep Waco Wagging`,
    description,
    product.image
      ? { src: product.image.src, alt: product.image.alt || product.name }
      : undefined,
  );
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const { allProducts, cartOptionsByHandle, merch } = await getShopCatalogView();
  const product = allProducts.find((item) => item.slug === handle);
  if (!product) notFound();

  const cart = cartOptionsByHandle[product.slug];
  const slot = product.image?.src
    ? preferSlot(productArtSlot(product.slug), product.image.src)
    : "";
  const gallery = [
    ...(slot
      ? [{ src: slot, alt: product.image?.alt || product.name }]
      : []),
    ...(product.gallery ?? []).filter((image) => image.src !== slot),
  ];
  const breed = breedFromCatalog(product);
  const related = breed
    ? merch.breeds
        .find((shelf) => shelf.id === breed.id)
        ?.products.filter((item) => item.slug !== product.slug)
        .slice(0, 3) ?? []
    : [];
  const sizes = apparelSizes([
    ...(cart?.option1Values ?? []),
    ...(cart?.option2Values ?? []),
  ]);

  return (
    <ShopShell
      cartOptionsByHandle={cart ? { [product.slug]: cart } : {}}
      backHref="/shop"
    >
      <ProductJsonLd product={product} cart={cart} />
      <article className="mx-auto grid max-w-[1100px] gap-8 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:py-12">
        <ProductGallery images={gallery} />
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Keep Waco Wagging
          </p>
          <div className="mt-3">
            <MerchProductCard
              product={product}
              showImage={false}
              linkTitle={false}
              titleLevel="h1"
              showBenefit
              ctaStyle="button"
              detailViewSource="product"
            />
          </div>
          <div className="mt-5">
            <ShopPurchaseNotes sizes={sizes} detailed />
          </div>
          {breed && (
            <p className="mt-5 text-sm font-light text-body-muted">
              <Link
                href={`/shop/breed/${breed.id}`}
                className="underline decoration-border underline-offset-2 hover:text-rose-deep"
              >
                More {breed.label} pieces
              </Link>
            </p>
          )}
        </div>
      </article>
      {related.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-6">
          <h2 className="font-display text-2xl font-medium text-serif-ink">
            More in {breed?.label}
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/shop/product/${item.slug}`}
                  className="text-[15px] text-serif-ink underline decoration-border underline-offset-2 hover:text-rose-deep"
                >
                  {item.name}
                  {item.price ? ` · ${item.price}` : ""}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ShopShell>
  );
}
