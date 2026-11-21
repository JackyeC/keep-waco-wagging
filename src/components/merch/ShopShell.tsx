import Link from "next/link";
import type { ReactNode } from "react";
import { ShopBagButton } from "@/components/merch/ShopCartDrawer";
import { ShopExperience } from "@/components/merch/ShopExperience";
import type { ProductCartOptions } from "@/lib/shopifyProductDetails";

export function ShopShell({
  cartOptionsByHandle,
  backHref,
  backLabel = "Back to shop",
  children,
}: {
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <ShopExperience cartOptionsByHandle={cartOptionsByHandle}>
      <div className="border-b border-border/70 bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2 sm:px-6">
          {backHref ? (
            <Link
              href={backHref}
              className="text-xs font-medium tracking-[0.12em] text-body-muted uppercase hover:text-wag-sage"
            >
              {backLabel}
            </Link>
          ) : (
            <span className="text-xs font-medium tracking-[0.14em] text-label-muted uppercase">
              Shop
            </span>
          )}
          <ShopBagButton />
        </div>
      </div>
      {children}
    </ShopExperience>
  );
}
