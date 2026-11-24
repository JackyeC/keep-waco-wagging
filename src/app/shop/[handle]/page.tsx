import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft } from "lucide-react";
import { ShopBagButton } from "@/components/merch/ShopCartDrawer";
import { ShopExperience } from "@/components/merch/ShopExperience";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { shopifyStoreConfig } from "@/data/merchStore";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyProduct } from "@/lib/shopifyCatalog";

export const revalidate = 0;
export const maxDuration = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const result = await fetchShopifyProduct(decodeURIComponent(handle));
  if (!result) {
    return { title: "Product not found" };
  }

  const { product } = result;
  return servicePageMetadata(
    `/shop/${product.slug}`,
    `${product.name} | Keep Waco Wagging`,
    product.description,
    product.image,
  );
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  await connection();
  const { handle } = await params;
  const result = await fetchShopifyProduct(decodeURIComponent(handle));
  if (!result) notFound();

  const { product, cartOptions } = result;

  return (
    <ShopExperience cartOptionsByHandle={{ [product.slug]: cartOptions }}>
      <div className="border-b border-border/70 bg-cream/90 backdrop-blur-sm">
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

      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:items-start">
        <MerchProductCard
          product={product}
          trackDetailView
          detailViewSource="product"
        />
        <div className="max-w-xl pt-1">
          <p className="text-[15px] font-light leading-relaxed text-body-muted-light">
            {product.description}
          </p>
          <p className="mt-6 text-[13px] font-light leading-relaxed text-label-muted">
            {shopifyStoreConfig.holidayOrderNote}
          </p>
          <p className="mt-3 text-[13px] font-light leading-relaxed text-label-muted">
            {shopifyStoreConfig.externalCheckoutNote}
          </p>
        </div>
      </div>
    </ShopExperience>
  );
}
