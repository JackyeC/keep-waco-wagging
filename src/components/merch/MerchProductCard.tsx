"use client";

import { useMemo, useState } from "react";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useShopCart } from "@/components/merch/ShopCartContext";
import { useProductDetailViewTracking } from "@/components/merch/useProductDetailViewTracking";
import type { MerchProduct } from "@/data/merchStore";
import { findVariant } from "@/lib/shopifyProductDetails";
import { productStorefrontUrl } from "@/lib/shopifyProductDetails";
import { garmentColorHex, isGarmentColorOption } from "@/lib/merchColors";
import { publicMerchAlt, publicMerchBenefit } from "@/lib/merchCopy";
import { trackShopEvent } from "@/lib/shopAnalytics";

function OptionPills({
  label,
  values,
  selected,
  onSelect,
  soldOut,
}: {
  label: string;
  values: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  soldOut?: (value: string) => boolean;
}) {
  if (values.length === 0) return null;

  const isColor = isGarmentColorOption(values);

  return (
    <div className="mt-3">
      <p className="sr-only">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {values.map((value) => {
          const active = selected === value;
          const unavailable = soldOut?.(value);

          if (isColor) {
            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelect(value)}
                disabled={unavailable}
                aria-label={`${label} ${value}${unavailable ? ", sold out" : ""}`}
                aria-pressed={active}
                className="h-6 w-6 rounded-full border transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: garmentColorHex[value] ?? "#ccc",
                  borderColor: active ? "#6E7E63" : "#DACEBC",
                  boxShadow: active
                    ? "0 0 0 1px #FBF6EF, 0 0 0 2px #6E7E63"
                    : "none",
                }}
              />
            );
          }

          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              disabled={unavailable}
              aria-pressed={active}
              className={`min-w-[2rem] border px-2 py-1 text-[10px] font-medium tracking-[0.08em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage disabled:cursor-not-allowed disabled:opacity-40 ${
                active
                  ? "border-wag-sage bg-wag-sage text-cream"
                  : "border-border bg-transparent text-body-muted-light hover:border-wag-sage"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MerchProductCard({
  product,
  trackDetailView = false,
  detailViewSource = "shop",
  badge,
  href,
  showBenefit = false,
  ctaStyle = "link",
  frame = "portrait",
  showImage = true,
  linkTitle = true,
  titleLevel = "h3",
  priority = false,
  purchaseNote,
  layout = "stack",
}: {
  product: MerchProduct;
  trackDetailView?: boolean;
  detailViewSource?: string;
  /** Optional merchandising label (e.g. "Club Favorite", "New Drop"). */
  badge?: string;
  /** On-site product page by default. Pass a full URL only for a true off-site handoff. */
  href?: string;
  showBenefit?: boolean;
  ctaStyle?: "link" | "button";
  frame?: "portrait" | "square";
  showImage?: boolean;
  linkTitle?: boolean;
  titleLevel?: "h1" | "h3";
  priority?: boolean;
  purchaseNote?: string;
  layout?: "stack" | "lead";
}) {
  const { addProduct, cartOptionsByHandle } = useShopCart();
  const [option1, setOption1] = useState<string | null>(
    product.cartOption1Values?.[0] ?? null,
  );
  const [option2, setOption2] = useState<string | null>(
    product.cartOption2Values?.[0] ?? null,
  );
  const [error, setError] = useState<string | null>(null);

  const cart = cartOptionsByHandle[product.slug];
  const detailHref = href ?? `/shop/product/${product.slug}`;
  const external = detailHref.startsWith("http");
  const storefrontUrl = product.shopifyProductUrl ?? productStorefrontUrl(product.slug);
  const supportsCart = product.supportsLocalCart && cart?.supportsLocalCart;
  const benefit = showBenefit
    ? publicMerchBenefit(product.description, product.name)
    : "";
  const imageAlt = publicMerchAlt(product.name, product.image?.alt, benefit);
  const TitleTag = titleLevel;
  const titleClass =
    titleLevel === "h1"
      ? "font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1.02] font-medium text-serif-ink"
      : "line-clamp-2 min-h-[2.6em] font-display text-[19px] leading-snug font-medium text-serif-ink";
  const frameClass = frame === "square" ? "aspect-square" : "aspect-[4/5]";

  const selectedVariant = useMemo(() => {
    if (!cart) return undefined;
    return findVariant(cart, option1, option2);
  }, [cart, option1, option2]);

  const displayPrice = selectedVariant
    ? `$${selectedVariant.price.toFixed(2)}`
    : product.price;

  const viewRef = useProductDetailViewTracking(
    product.slug,
    product.name,
    displayPrice ?? undefined,
    trackDetailView,
    detailViewSource,
  );

  function analyticsPayload() {
    return {
      handle: product.slug,
      title: product.name,
      price: displayPrice ?? undefined,
      source: detailViewSource,
    };
  }

  function handleAdd() {
    setError(null);
    const result = addProduct({
      productId: product.id,
      handle: product.slug,
      name: product.name,
      option1,
      option2,
    });
    if (!result.ok) setError(result.reason);
  }

  function handleOptionSelect(
    label: string,
    value: string,
    onSelect: (value: string) => void,
  ) {
    trackShopEvent("product_card_click", {
      ...analyticsPayload(),
      source: `${detailViewSource}:${label}`,
    });
    onSelect(value);
  }

  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const title = linkTitle ? (
    <a
      href={detailHref}
      {...linkProps}
      className={`${titleClass} hover:text-rose-deep`}
      onClick={() =>
        trackShopEvent(external ? "view_on_shopify" : "product_card_click", analyticsPayload())
      }
    >
      {product.name}
    </a>
  ) : (
    <TitleTag className={titleClass}>{product.name}</TitleTag>
  );

  const buyClass =
    ctaStyle === "button"
      ? "btn-pill btn-sage mt-4 min-h-11 w-full px-4 py-3 text-[11px] disabled:cursor-not-allowed disabled:opacity-50"
      : "text-xs font-medium tracking-[0.14em] text-wag-sage uppercase underline decoration-border underline-offset-4 transition-colors hover:text-rose hover:decoration-rose disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <article
      ref={viewRef}
      className={
        layout === "lead" && showImage
          ? "group grid grid-cols-[7.75rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[17rem_minmax(0,1fr)] sm:gap-8"
          : "group flex h-full flex-col"
      }
    >
      {showImage && (
        <a
          href={detailHref}
          {...linkProps}
          className="block"
          onClick={() =>
            trackShopEvent(
              external ? "view_on_shopify" : "product_card_click",
              analyticsPayload(),
            )
          }
        >
          <div className={`relative ${frameClass} overflow-hidden bg-garment-tray`}>
            {badge && (
              <span className="absolute top-3 left-3 z-10 bg-cream/95 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-label-muted uppercase">
                {badge}
              </span>
            )}
            {product.image?.src ? (
              <ShopifyProductImage
                src={product.image.src}
                alt={imageAlt}
                priority={priority}
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 280px"
                className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-5"
              />
            ) : (
              <ImagePlaceholder alt={imageAlt} />
            )}
          </div>
        </a>
      )}

      <div className={`flex flex-1 flex-col ${showImage && layout !== "lead" ? "pt-4" : ""}`}>
        {title}

        {benefit && (
          <p className="mt-2 line-clamp-2 min-h-[2.5em] text-[14px] leading-snug font-light text-body-muted">
            {benefit}
          </p>
        )}

        <div className={layout === "stack" ? "mt-auto" : ""}>
        {displayPrice && (
          <p className="mt-2 text-[15px] font-medium text-serif-ink">
            {displayPrice}
            {selectedVariant && !selectedVariant.available && (
              <span className="ml-2 text-xs font-normal text-rose-deep">Sold out</span>
            )}
          </p>
        )}

        {supportsCart && cart && (
          <>
            <OptionPills
              label={product.cartOption1Label ?? "Option"}
              values={product.cartOption1Values ?? []}
              selected={option1}
              onSelect={(value) =>
                handleOptionSelect(product.cartOption1Label ?? "Option", value, setOption1)
              }
              soldOut={(value) =>
                !findVariant(cart, value, option2)?.available
              }
            />
            <OptionPills
              label={product.cartOption2Label ?? "Size"}
              values={product.cartOption2Values ?? []}
              selected={option2}
              onSelect={(value) =>
                handleOptionSelect(product.cartOption2Label ?? "Size", value, setOption2)
              }
              soldOut={(value) =>
                !findVariant(cart, option1, value)?.available
              }
            />
          </>
        )}

        {error && (
          <p className="mt-2 text-xs text-rose-deep" role="alert">
            {error}
          </p>
        )}

        <div className={ctaStyle === "button" ? "" : "mt-4"}>
          {supportsCart ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={selectedVariant !== undefined && !selectedVariant.available}
              className={buyClass}
            >
              Add to bag
            </button>
          ) : (
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buyClass}
              onClick={() => trackShopEvent("view_on_shopify", analyticsPayload())}
            >
              Continue on Shopify
            </a>
          )}
        </div>
        {purchaseNote && (
          <p className="mt-3 text-[12px] leading-relaxed font-light text-label-muted">
            {purchaseNote}
          </p>
        )}
        </div>
      </div>
    </article>
  );
}
