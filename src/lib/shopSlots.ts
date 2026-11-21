import fs from "node:fs";
import path from "node:path";
import type { MerchProduct } from "@/data/merchStore";
import {
  breedArtSlot,
  lineArtSlot,
  productArtSlot,
} from "@/data/shopGraphics";

/** True when a file is already in /public. Missing slots fall back to Shopify photos. */
export function publicFileExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\//, "");
  if (!relative || relative.includes("..")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", relative));
}

export function preferSlot(slotPath: string, fallback: string): string {
  return publicFileExists(slotPath) ? slotPath : fallback;
}

export function withProductArt(product: MerchProduct): MerchProduct {
  if (!product.image?.src) return product;
  const src = preferSlot(productArtSlot(product.slug), product.image.src);
  if (src === product.image.src) return product;
  return { ...product, image: { ...product.image, src } };
}

export function lineArtSrc(lineId: string, fallback: string): string {
  return preferSlot(lineArtSlot(lineId), fallback);
}

export function breedArtSrc(breedId: string, fallback: string): string {
  return preferSlot(breedArtSlot(breedId), fallback);
}
