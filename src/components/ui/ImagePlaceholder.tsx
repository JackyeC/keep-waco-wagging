import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const brandMark = siteConfig.brand.logo.mark;

/**
 * Renders a real photo when `src` is set; otherwise an editorial KWW mark
 * placeholder (cream/sage, rule line, optional caption).
 */
export function ImagePlaceholder({
  src,
  alt,
  showCaption = false,
  caption = "Photo coming soon",
  variant = "cream",
  className,
}: {
  src?: string;
  alt?: string;
  /** @deprecated Ignored — card copy carries the title. Use showCaption instead. */
  label?: string;
  showCaption?: boolean;
  caption?: string;
  variant?: "cream" | "sage";
  className?: string;
}) {
  if (src) {
    return (
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
      role="img"
      aria-label={
        alt
          ? showCaption
            ? `${alt}. ${caption}`
            : alt
          : showCaption
            ? caption
            : brandMark.alt
      }
      className={cn(
        "flex h-full w-full flex-col items-center justify-center border border-clay/70",
        variant === "sage" ? "bg-sage-50" : "bg-cream",
        className,
      )}
    >
      <div className="flex max-w-[85%] flex-col items-center px-4 py-6 sm:px-6 sm:py-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brandMark.src}
          alt=""
          aria-hidden="true"
          className="h-auto w-[min(58%,10rem)] max-h-[min(42%,7rem)] object-contain opacity-[0.88]"
        />
        <div className="mt-4 h-px w-10 bg-clay/80" aria-hidden="true" />
        {showCaption && (
          <p className="caption mt-3 text-center text-bark-faint">{caption}</p>
        )}
      </div>
    </div>
  );
}
