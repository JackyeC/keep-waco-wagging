"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useShopCart } from "@/components/merch/ShopCartContext";
import { useProductDetailViewTracking } from "@/components/merch/useProductDetailViewTracking";
import type { MerchProduct } from "@/data/merchStore";
import { findVariant } from "@/lib/shopifyProductDetails";
import { productStorefrontUrl } from "@/lib/shopifyProductDetails";
import { garmentColorHex, isGarmentColorOption } from "@/lib/merchColors";
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
    <div className="mt-4">
      <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
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
                className="h-8 w-8 rounded-full border-2 transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: garmentColorHex[value] ?? "#ccc",
                  borderColor: active ? "#6E7E63" : "#DACEBC",
                  boxShadow: active
                    ? "0 0 0 2px #FBF6EF, 0 0 0 4px #6E7E63"
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
              className={`min-w-[2.5rem] rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.08em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage disabled:cursor-not-allowed disabled:opacity-40 ${
                active
                  ? "border-wag-sage bg-wag-sage text-cream"
                  : "border-border bg-cream text-body-muted-light hover:border-wag-sage"
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
}: {
  product: MerchProduct;
  trackDetailView?: boolean;
  detailViewSource?: string;
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
  const storefrontUrl = product.shopifyProductUrl ?? productStorefrontUrl(product.slug);
  const supportsCart = product.supportsLocalCart && cart?.supportsLocalCart;

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

  return (
    <article
      ref={viewRef}
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-soft-cream transition-colors hover:border-rose"
    >
      <a
        href={storefrontUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onClick={() => trackShopEvent("view_on_shopify", analyticsPayload())}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-garment-tray p-4 sm:p-5">
          {product.image?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="h-full w-full object-contain"
            />
          ) : (
            <ImagePlaceholder alt={product.name} />
          )}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[21px] font-semibold leading-snug text-serif-ink">
          {product.name}
        </h3>
        <p className="body-light mt-2 flex-1 text-[13px]">{product.description}</p>

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

        {displayPrice && (
          <p className="mt-3 font-display text-lg font-semibold text-wag-sage">
            {displayPrice}
            {selectedVariant && !selectedVariant.available && (
              <span className="ml-2 text-xs font-sans font-normal text-rose-deep">
                Sold out
              </span>
            )}
          </p>
        )}

        {error && (
          <p className="mt-2 text-xs text-rose-deep" role="alert">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {supportsCart ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={selectedVariant !== undefined && !selectedVariant.available}
              className="btn-pill btn-sage w-full py-2.5 text-[11px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to bag
            </button>
          ) : (
            <p className="text-[11px] font-light text-label-muted">
              Choose options on Shopify
            </p>
          )}
          <a
            href={storefrontUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-rose-outline inline-flex w-full items-center justify-center gap-1.5 py-2.5 text-[11px]"
            onClick={() => trackShopEvent("view_on_shopify", analyticsPayload())}
          >
            View on Shopify
            <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
