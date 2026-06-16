import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type LogoVariant = "mark" | "full";

export function Logo({
  className,
  variant = "mark",
  badge = variant === "mark",
}: {
  className?: string;
  variant?: LogoVariant;
  /** Dark badge wraps the mark so the black logo matte reads intentional on cream. */
  badge?: boolean;
}) {
  const asset =
    variant === "full" ? siteConfig.brand.logo.full : siteConfig.brand.logo.mark;

  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={variant === "mark"}
      className={cn(
        "w-auto object-contain transition-transform group-hover:scale-[1.02]",
        variant === "mark"
          ? "h-8 max-w-[5.75rem] sm:h-9 sm:max-w-[6.25rem]"
          : "h-28 sm:h-36 md:h-44",
      )}
    />
  );

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label={`${siteConfig.name} home`}
    >
      {badge ? (
        <span className="inline-flex items-center justify-center rounded-lg bg-bark px-1.5 py-1 ring-1 ring-inset ring-white/10 shadow-sm">
          {image}
        </span>
      ) : (
        image
      )}
    </Link>
  );
}
