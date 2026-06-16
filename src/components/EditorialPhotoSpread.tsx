import { SitePhoto } from "@/components/SitePhoto";
import { cn } from "@/lib/utils";
import type { SitePhotoRef } from "@/data/sitePhotos";

type Layout = "mosaic" | "duo" | "strip";

/** Magazine-style multi-photo layout using real site assets. */
export function EditorialPhotoSpread({
  photos,
  layout = "mosaic",
  eyebrow,
  title,
  className,
}: {
  photos: readonly SitePhotoRef[];
  layout?: Layout;
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  if (photos.length === 0) return null;

  return (
    <figure className={cn(className)}>
      {(eyebrow || title) && (
        <figcaption className="mb-4 max-w-xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <p className="headline-tertiary mt-2">{title}</p>}
        </figcaption>
      )}

      {layout === "mosaic" && photos.length >= 3 && (
        <div className="grid gap-2 sm:grid-cols-12 sm:gap-3">
          <SpreadImage
            photo={photos[0]}
            className="relative aspect-[4/5] overflow-hidden bg-sand sm:col-span-7 sm:aspect-[3/4]"
            sizes="(max-width: 640px) 100vw, 58vw"
            priority
          />
          <div className="grid gap-2 sm:col-span-5 sm:gap-3">
            <SpreadImage
              photo={photos[1]}
              className="relative aspect-[4/3] overflow-hidden bg-sand"
              sizes="(max-width: 640px) 100vw, 42vw"
            />
            <SpreadImage
              photo={photos[2]}
              className="relative aspect-[4/3] overflow-hidden bg-sand"
              sizes="(max-width: 640px) 100vw, 42vw"
            />
          </div>
        </div>
      )}

      {layout === "duo" && photos.length >= 2 && (
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
          {photos.slice(0, 2).map((photo) => (
            <SpreadImage
              key={photo.src}
              photo={photo}
              className="relative aspect-[4/3] overflow-hidden bg-sand"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ))}
        </div>
      )}

      {layout === "strip" && (
        <div
          className={cn(
            "grid gap-2 sm:gap-3",
            photos.length >= 4
              ? "grid-cols-2 sm:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-3",
          )}
        >
          {photos.map((photo) => (
            <SpreadImage
              key={photo.src}
              photo={photo}
              className="relative aspect-[4/3] overflow-hidden bg-sand"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ))}
        </div>
      )}

      <div className="mt-3 space-y-1 border-t border-clay pt-3">
        {photos.map((photo) => (
          <p key={photo.src} className="caption">
            {photo.alt}
          </p>
        ))}
      </div>
    </figure>
  );
}

function SpreadImage({
  photo,
  className,
  sizes,
  priority,
}: {
  photo: SitePhotoRef;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={className}>
      <SitePhoto src={photo.src} alt={photo.alt} sizes={sizes} priority={priority} />
    </div>
  );
}
