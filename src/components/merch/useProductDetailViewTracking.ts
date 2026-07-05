"use client";

import { useEffect, useRef } from "react";
import { trackProductDetailView } from "@/lib/shopAnalytics";

/** Fire product_detail_view once per session when card is substantially visible. */
export function useProductDetailViewTracking(
  handle: string,
  title: string,
  price: string | undefined,
  enabled: boolean,
  source: string,
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    let seen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (seen) return;
        const entry = entries[0];
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.5) {
          seen = true;
          trackProductDetailView({
            handle,
            title,
            price,
            source,
          });
          observer.disconnect();
        }
      },
      { threshold: [0.5] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, handle, title, price, source]);

  return ref;
}
