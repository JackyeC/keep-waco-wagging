"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Shopify mockups are remote. If the image optimizer cannot fetch one,
 * fall back to the original URL so the product photo still paints.
 */
export function MerchImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const [useOriginal, setUseOriginal] = useState(false);

  if (useOriginal) {
    return (
      // The optimizer already failed for this URL; load the file directly.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain p-5"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-6"
      onError={() => setUseOriginal(true)}
    />
  );
}
