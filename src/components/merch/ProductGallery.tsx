import { ShopifyProductImage } from "@/components/merch/ShopifyProductImage";

export function ProductGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [first, ...rest] = images;
  if (!first) return null;

  return (
    <div>
      <div className="relative h-52 overflow-hidden rounded-[20px] bg-garment-tray sm:h-auto sm:aspect-square">
        <ShopifyProductImage
          src={first.src}
          alt={first.alt}
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-contain p-4 sm:p-10"
        />
      </div>
      {rest.length > 0 && (
        <ul className="mt-3 hidden grid-cols-4 gap-2 sm:grid">
          {rest.map((image) => (
            <li
              key={image.src}
              className="relative aspect-square overflow-hidden rounded-[12px] bg-garment-tray"
            >
              <ShopifyProductImage
                src={image.src}
                alt={image.alt}
                width={480}
                sizes="22vw"
                className="object-contain p-2"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
