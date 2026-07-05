"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductCartOptions } from "@/lib/shopifyProductDetails";
import {
  buildShopifyCartUrl,
  findVariant,
  formatShopPrice,
  productStorefrontUrl,
} from "@/lib/shopifyProductDetails";
import { trackShopEvent } from "@/lib/shopAnalytics";

export type CartLine = {
  key: string;
  productId: string;
  handle: string;
  name: string;
  option1: string | null;
  option2: string | null;
  variantLabel: string;
  price: number;
  qty: number;
  variantId: number;
};

type ShopCartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  subtotalLabel: string;
  cartOpen: boolean;
  toast: string;
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (input: {
    productId: string;
    handle: string;
    name: string;
    option1: string | null;
    option2: string | null;
  }) => { ok: true } | { ok: false; reason: string };
  increment: (key: string) => void;
  decrement: (key: string) => void;
  removeLine: (key: string) => void;
  checkout: () => void;
};

const STORAGE_KEY = "kww-shop-cart-v2";

const ShopCartContext = createContext<ShopCartContextValue | null>(null);

function lineKey(
  handle: string,
  option1: string | null,
  option2: string | null,
) {
  return `${handle}|${option1 ?? ""}|${option2 ?? ""}`;
}

function variantLabel(option1: string | null, option2: string | null): string {
  const parts = [option1, option2].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Standard";
}

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ShopCartProvider({
  children,
  cartOptionsByHandle,
}: {
  children: ReactNode;
  cartOptionsByHandle: Record<string, ProductCartOptions>;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const stored = readStoredLines();
    if (stored.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration
      setLines(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen]);

  const addProduct = useCallback(
    (input: {
      productId: string;
      handle: string;
      name: string;
      option1: string | null;
      option2: string | null;
    }): { ok: true } | { ok: false; reason: string } => {
      const cart = cartOptionsByHandle[input.handle];
      if (!cart?.supportsLocalCart) {
        return { ok: false, reason: "This item opens on Shopify to choose options." };
      }

      const variant = findVariant(cart, input.option1, input.option2);
      if (!variant) {
        return { ok: false, reason: "That combination is sold out. Try another size or color." };
      }

      const key = lineKey(input.handle, input.option1, input.option2);
      const label = variantLabel(input.option1, input.option2);

      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: l.qty + 1, variantId: variant.id } : l,
          );
        }
        return [
          ...prev,
          {
            key,
            productId: input.productId,
            handle: input.handle,
            name: input.name,
            option1: input.option1,
            option2: input.option2,
            variantLabel: label,
            price: variant.price,
            qty: 1,
            variantId: variant.id,
          },
        ];
      });
      setToast(`${input.name} (${label}) added to your bag`);
      setCartOpen(true);
      trackShopEvent("add_to_bag", {
        handle: input.handle,
        title: input.name,
        price: formatShopPrice(variant.price),
        source: "shop_bag",
      });
      return { ok: true };
    },
    [cartOptionsByHandle],
  );

  const increment = useCallback((key: string) => {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)),
    );
  }, []);

  const decrement = useCallback((key: string) => {
    setLines((prev) => {
      const line = prev.find((l) => l.key === key);
      if (!line) return prev;
      if (line.qty <= 1) return prev.filter((l) => l.key !== key);
      return prev.map((l) =>
        l.key === key ? { ...l, qty: l.qty - 1 } : l,
      );
    });
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const checkout = useCallback(() => {
    const payload = lines.map((l) => ({ variantId: l.variantId, qty: l.qty }));
    if (payload.length === 0) return;
    const cartSubtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    trackShopEvent("checkout_handoff", {
      handle: "shop-cart",
      title: "Checkout handoff",
      price: formatShopPrice(cartSubtotal),
      line_count: lines.length,
      source: "shop_bag",
    });
    window.open(buildShopifyCartUrl(payload), "_blank", "noopener");
  }, [lines]);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.qty, 0),
    [lines],
  );

  const value = useMemo<ShopCartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      subtotalLabel: formatShopPrice(subtotal),
      cartOpen,
      toast,
      cartOptionsByHandle,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addProduct,
      increment,
      decrement,
      removeLine,
      checkout,
    }),
    [
      lines,
      count,
      subtotal,
      cartOpen,
      toast,
      cartOptionsByHandle,
      addProduct,
      increment,
      decrement,
      removeLine,
      checkout,
    ],
  );

  return (
    <ShopCartContext.Provider value={value}>{children}</ShopCartContext.Provider>
  );
}

export function useShopCart() {
  const ctx = useContext(ShopCartContext);
  if (!ctx) {
    throw new Error("useShopCart must be used within ShopCartProvider");
  }
  return ctx;
}

export function useOptionalShopCart() {
  return useContext(ShopCartContext);
}

export { productStorefrontUrl };
