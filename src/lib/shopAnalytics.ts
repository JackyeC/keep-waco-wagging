"use client";

import { track } from "@vercel/analytics";

/** Allowed shop analytics events — Batch 2B. No PII. */
export type ShopAnalyticsEvent =
  | "shop_collection_click"
  | "product_card_click"
  | "product_detail_view"
  | "add_to_bag"
  | "checkout_handoff"
  | "view_on_shopify";

export type ShopAnalyticsPayload = {
  handle: string;
  title: string;
  price?: string;
  source?: string;
  line_count?: number;
};

const firedViewKeys = new Set<string>();

function sessionKey(event: ShopAnalyticsEvent, handle: string, source?: string): string {
  return `${event}:${handle}:${source ?? ""}`;
}

/** Fire once per session for viewport/detail views — avoids rerender duplicates. */
export function trackProductDetailView(payload: ShopAnalyticsPayload): void {
  const key = sessionKey("product_detail_view", payload.handle, payload.source);
  if (firedViewKeys.has(key)) return;
  firedViewKeys.add(key);
  track("product_detail_view", sanitize(payload));
}

export function trackShopEvent(
  event: Exclude<ShopAnalyticsEvent, "product_detail_view">,
  payload: ShopAnalyticsPayload,
): void {
  track(event, sanitize(payload));
}

function sanitize(payload: ShopAnalyticsPayload): Record<string, string | number> {
  const out: Record<string, string | number> = {
    handle: payload.handle.slice(0, 120),
    title: payload.title.slice(0, 120),
  };
  if (payload.price) out.price = payload.price.slice(0, 16);
  if (payload.source) out.source = payload.source.slice(0, 40);
  if (payload.line_count !== undefined) out.line_count = payload.line_count;
  return out;
}

/** Test-only reset for QA harness. */
export function resetShopAnalyticsDedupeForTests(): void {
  firedViewKeys.clear();
}
