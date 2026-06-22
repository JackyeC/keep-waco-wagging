import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { brandLanguage, cityConfig } from "@/lib/site";

type PresentingSponsorProps = {
  className?: string;
  /** Lighter text for dark hero overlays */
  light?: boolean;
  /** Link sponsor name/logo to sponsor page */
  href?: string;
  /** Show the one-line service explanation below the brand line */
  showServices?: boolean;
  /** Typography scale */
  size?: "sm" | "md";
};

/** Brand attribution — Keep Waco Wagging by Platinum Scoops. */
export function PresentingSponsor({
  className,
  light = false,
  href = "/platinum-scoops",
  showServices = false,
  size = "md",
}: PresentingSponsorProps) {
  const labelClass = cn(
    "publisher-note",
    size === "sm" && "text-xs",
    light && "text-cream/60",
    className,
  );

  const nameClass = cn(
    "border-b border-transparent transition-colors hover:border-current",
    light ? "text-cream/85 hover:text-cream" : "text-bark-soft hover:text-bark",
  );

  return (
    <div className={labelClass}>
      <p className={light ? "text-cream/85" : undefined}>
        {brandLanguage.primaryName} by{" "}
        {href ? (
          <Link href={href} className={nameClass}>
            {cityConfig.sponsor.name}
          </Link>
        ) : (
          <span className={nameClass}>{cityConfig.sponsor.name}</span>
        )}
      </p>
      {cityConfig.sponsor.logo && (
        <div className="mt-2">
          {href ? (
            <Link href={href} className="inline-block">
              <Image
                src={cityConfig.sponsor.logo}
                alt={cityConfig.sponsor.name}
                width={160}
                height={48}
                className="h-8 w-auto object-contain opacity-90"
              />
            </Link>
          ) : (
            <Image
              src={cityConfig.sponsor.logo}
              alt={cityConfig.sponsor.name}
              width={160}
              height={48}
              className="h-8 w-auto object-contain opacity-90"
            />
          )}
        </div>
      )}
      {showServices && (
        <p
          className={cn(
            "mt-2 max-w-md text-sm leading-relaxed",
            light ? "text-cream/70" : "text-bark-faint",
          )}
        >
          {brandLanguage.sponsorServices}
        </p>
      )}
    </div>
  );
}
