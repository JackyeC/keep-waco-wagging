"use client";

import Image from "next/image";
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
}: {
  product: MerchProduct;
  trackDetailView?: boolean;
  detailViewSource?: string;
  /** Optional merchandising label (e.g. "Club Favorite", "New Drop"). */
  badge?: string;
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
    <article ref={viewRef} className="group flex h-full flex-col">
      <a
        href={storefrontUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onClick={() => trackShopEvent("view_on_shopify", analyticsPayload())}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-garment-tray">
          {badge && (
            <span className="absolute top-3 left-3 z-10 bg-cream/95 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-label-muted uppercase">
              {badge}
            </span>
          )}
          {product.image?.src ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 3rem), 360px"
              className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-6"
            />
          ) : (
            <ImagePlaceholder alt={product.name} />
          )}
        </div>
      </a>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-[19px] font-medium leading-snug text-serif-ink">
          {product.name}
        </h3>

        {displayPrice && (
          <p className="mt-1 text-[13px] font-light text-body-muted">
            {displayPrice}
            {selectedVariant && !selectedVariant.available && (
              <span className="ml-2 text-xs text-rose-deep">Sold out</span>
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

        <div className="mt-4">
          {supportsCart ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={selectedVariant !== undefined && !selectedVariant.available}
              className="text-xs font-medium tracking-[0.14em] text-wag-sage uppercase underline decoration-border underline-offset-4 transition-colors hover:text-rose hover:decoration-rose disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to bag
            </button>
          ) : (
            <a
              href={storefrontUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-[0.14em] text-wag-sage uppercase underline decoration-border underline-offset-4 hover:text-rose hover:decoration-rose"
              onClick={() => trackShopEvent("view_on_shopify", analyticsPayload())}
            >
              Shop
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
