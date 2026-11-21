"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { shopifySizedSrc } from "@/lib/shopifyImage";

export function ShopifyProductImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  width = 1200,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  width?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ImagePlaceholder alt={alt} />;
  }

  return (
    <Image
      src={src.startsWith("/") ? src : shopifySizedSrc(src, width)}
      alt={alt}
      fill
      unoptimized={!src.startsWith("/")}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
