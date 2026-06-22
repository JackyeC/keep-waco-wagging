import type { Metadata } from "next";
import { cityConfig } from "@/lib/site";

/** Canonical + title for primary service pages (avoids duplicate brand suffix from layout template). */
export function servicePageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const canonical = `${cityConfig.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
  };
}
