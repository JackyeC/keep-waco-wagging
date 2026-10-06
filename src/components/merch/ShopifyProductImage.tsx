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
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ImagePlaceholder alt={alt} />;
  }

  return (
    <Image
      src={shopifySizedSrc(src, 800)}
      alt={alt}
      fill
      unoptimized
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
