import type { Metadata } from "next";
import { ShopShell } from "@/components/merch/ShopShell";
import { servicePageMetadata } from "@/lib/metadata";
import { fetchShopifyPage, sanitizeShopifyHtml } from "@/lib/shopifyPages";

export function shopInfoMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return servicePageMetadata(path, title, description);
}

export async function ShopInfoPage({
  shopifyHandle,
  title,
  intro,
}: {
  shopifyHandle: string;
  title: string;
  intro: string;
}) {
  const page = await fetchShopifyPage(shopifyHandle);

  return (
    <ShopShell cartOptionsByHandle={{}} backHref="/shop">
      <article className="mx-auto max-w-[760px] px-5 py-10 sm:px-6">
        <h1 className="font-display text-[clamp(2.1rem,5vw,3.2rem)] leading-[1.05] font-medium text-serif-ink">
          {page?.title ?? title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed font-light text-body-muted">
          {intro}
        </p>
        {page ? (
          <div
            className="shop-policy mt-8"
            dangerouslySetInnerHTML={{
              __html: sanitizeShopifyHtml(page.bodyHtml),
            }}
          />
        ) : (
          <p className="mt-8 text-[15px] leading-relaxed font-light text-body-muted">
            We couldn&apos;t load this page from the store just now. For an order,
            email hello@keepwacowagging.com. For anything else on the site, email
            info@keepwacowagging.com.
          </p>
        )}
      </article>
    </ShopShell>
  );
}
