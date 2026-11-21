"use client";

import { useState } from "react";
import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";

export function ProductGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative h-44 overflow-hidden rounded-[20px] bg-garment-tray sm:h-auto sm:aspect-square">
        <ShopifyProductImage
          src={current.src}
          alt={current.alt}
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-contain p-4 sm:p-10"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={image.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Photo ${index + 1} of ${images.length}`}
                  aria-pressed={selected}
                  className={`relative h-16 w-16 overflow-hidden rounded-[12px] bg-garment-tray sm:h-20 sm:w-20 ${
                    selected ? "ring-2 ring-wag-sage" : "ring-1 ring-border"
                  }`}
                >
                  <ShopifyProductImage
                    src={image.src}
                    alt=""
                    width={240}
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
