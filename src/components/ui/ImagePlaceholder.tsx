import { PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Local photography placeholder. When `src` is provided it renders the image;
 * otherwise it shows a warm branded gradient. Swap in <Image> + real Waco
 * photography here once available.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  className,
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
}) {
  if (src) {
    return (
      // Using a plain <img> keeps the MVP free of image-domain config; swap to
      // next/image with real Waco photography later.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-sage-100 via-sand to-sky-100 text-sage-500",
        className,
      )}
      aria-hidden="true"
    >
      <PawPrint className="h-8 w-8" strokeWidth={1.5} />
      {label && (
        <span className="mt-1 px-3 text-center text-xs font-medium text-sage-600/80">
          {label}
        </span>
      )}
    </div>
  );
}
