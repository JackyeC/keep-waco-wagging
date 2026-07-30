"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { formatShopPrice } from "@/lib/shopifyProductDetails";
import { useShopCart } from "@/components/merch/ShopCartContext";
import { useDialogFocus } from "@/lib/focusTrap";

export function ShopCartDrawer() {
  const {
    lines,
    count,
    subtotalLabel,
    cartOpen,
    closeCart,
    increment,
    decrement,
    removeLine,
    checkout,
  } = useShopCart();

  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useDialogFocus({
    open: cartOpen,
    containerRef: panelRef,
    onClose: closeCart,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [cartOpen]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-bark/40 transition-opacity duration-300 motion-reduce:transition-none"
        style={{
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? "auto" : "none",
        }}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-cart-title"
        tabIndex={-1}
        className="fixed top-0 right-0 z-[60] flex h-full w-[404px] max-w-[92vw] flex-col bg-cream shadow-[-18px_0_50px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] motion-reduce:transition-none"
        style={{ transform: cartOpen ? "translateX(0)" : "translateX(106%)" }}
        aria-hidden={!cartOpen}
        {...(!cartOpen ? { inert: true } : {})}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-wag-sage" aria-hidden />
            <h2
              id="shop-cart-title"
              className="font-display text-xl font-semibold text-serif-ink"
            >
              Your bag
            </h2>
            {count > 0 && (
              <span className="rounded-full bg-rose px-2 py-0.5 text-[11px] font-semibold text-cream">
                {count}
              </span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-bark hover:bg-soft-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-xl text-serif-ink">Your bag is empty</p>
              <p className="body-light mt-2 text-sm">
                Pick a color and size, then add an item from the shop.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="rounded-[16px] border border-border bg-soft-cream p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold text-serif-ink">
                        {line.name}
                      </p>
                      <p className="mt-0.5 text-xs text-label-muted">
                        {line.variantLabel}
                      </p>
                      <p className="mt-1 font-display text-base text-wag-sage">
                        {formatShopPrice(line.price * line.qty)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      className="min-h-11 px-2 text-xs font-medium tracking-[0.1em] text-rose-deep uppercase hover:text-wag-sage"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrement(line.key)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream hover:border-wag-sage"
                      aria-label={`Decrease quantity of ${line.name}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-medium">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => increment(line.key)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-cream hover:border-wag-sage"
                      aria-label={`Increase quantity of ${line.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-label-muted">Subtotal</span>
            <span className="font-display text-xl font-semibold text-serif-ink">
              {subtotalLabel}
            </span>
          </div>
          <p className="mt-2 text-xs font-light text-label-muted">
            Shipping and tax calculated at Shopify checkout.
          </p>
          <button
            type="button"
            onClick={checkout}
            disabled={lines.length === 0}
            className="btn-pill btn-sage mt-4 w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout on Shopify
          </button>
        </div>
      </aside>
    </>
  );
}

export function ShopCartToast() {
  const { toast } = useShopCart();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[70] max-w-[min(92vw,420px)] -translate-x-1/2 rounded-full bg-bark px-5 py-3 text-center text-sm font-light text-cream shadow-[0_10px_30px_rgba(0,0,0,0.24)] motion-safe:animate-[kwwToast_0.35s_ease-out]"
    >
      {toast}
    </div>
  );
}

export function ShopBagButton({ className }: { className?: string }) {
  const { count, openCart } = useShopCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative inline-flex min-h-11 items-center gap-2 rounded-full bg-wag-sage px-4 py-2.5 text-[12px] font-medium tracking-[0.12em] text-cream uppercase hover:bg-sage-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage ${className ?? ""}`}
      aria-label={`Open shopping bag${count > 0 ? `, ${count} items` : ""}`}
      aria-haspopup="dialog"
    >
      <ShoppingBag className="h-4 w-4" aria-hidden />
      Bag
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-cream bg-rose px-1 text-[11px] font-semibold text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
