import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  href?: string | false;
  className?: string;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  showTagline?: boolean;
  compact?: boolean;
};

export function BrandWordmark({
  href = "/",
  className,
  size = "md",
  onDark = false,
  showTagline = false,
  compact = false,
}: BrandWordmarkProps) {
  const topSize =
    size === "lg"
      ? "text-[52px]"
      : size === "sm" || compact
        ? "text-lg"
        : "text-[21px]";
  const scriptSize =
    size === "lg"
      ? "text-[64px]"
      : size === "sm" || compact
        ? "text-[22px]"
        : "text-[26px]";
  const scriptIndent =
    size === "lg" ? "ml-8" : size === "sm" || compact ? "ml-6" : "ml-[30px]";
  const topColor = onDark ? "text-cream" : "text-wag-sage";
  const scriptColor = onDark ? "text-blush" : "text-rose";

  const content = (
    <>
      <span
        className={cn(
          "font-display font-semibold tracking-[0.14em] uppercase",
          topSize,
          topColor,
        )}
      >
        KEEP WACO
      </span>
      <span
        className={cn("font-script -mt-1", scriptSize, scriptIndent, scriptColor)}
      >
        wagging
      </span>
      {showTagline && (
        <span className="mt-3 text-[10px] font-medium tracking-[0.28em] text-label-muted uppercase">
          Community · Connection · Compassion
        </span>
      )}
    </>
  );

  const wrapperClass = cn("flex shrink-0 flex-col leading-[0.86]", className);

  if (href === false) {
    return <div className={wrapperClass}>{content}</div>;
  }

  return (
    <Link
      href={href}
      className={wrapperClass}
      aria-label="Keep Waco Wagging — home"
    >
      {content}
    </Link>
  );
}
