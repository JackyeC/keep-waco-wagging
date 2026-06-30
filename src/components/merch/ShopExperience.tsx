"use client";

import type { ReactNode } from "react";
import { ShopCartProvider } from "@/components/merch/ShopCartContext";
import {
  ShopCartDrawer,
  ShopCartToast,
} from "@/components/merch/ShopCartDrawer";
import type { ProductCartOptions } from "@/lib/shopifyProductDetails";

export function ShopExperience({
  cartOptionsByHandle,
  children,
}: {
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  children: ReactNode;
}) {
  return (
    <ShopCartProvider cartOptionsByHandle={cartOptionsByHandle}>
      {children}
      <ShopCartDrawer />
      <ShopCartToast />
    </ShopCartProvider>
  );
}
