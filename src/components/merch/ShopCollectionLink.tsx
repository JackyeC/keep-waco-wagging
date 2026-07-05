"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackShopEvent } from "@/lib/shopAnalytics";

export function ShopCollectionLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackShopEvent("shop_collection_click", {
          handle: "waco-dog-life-collection",
          title: "Shop the Collection",
          source: "shop_page",
        })
      }
    >
      Shop the Collection
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
