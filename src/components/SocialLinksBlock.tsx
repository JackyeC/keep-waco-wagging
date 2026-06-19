import { getLiveSocialLinks, socialLinksConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type SocialLinksBlockProps = {
  className?: string;
  /** Smaller text for footer / confirmation areas */
  size?: "sm" | "md";
  /** Hide the section title */
  hideTitle?: boolean;
};

/** Reusable social + contact links — Instagram leads to Platinum Scoops, not a KWW account. */
export function SocialLinksBlock({
  className,
  size = "md",
  hideTitle = false,
}: SocialLinksBlockProps) {
  const links = getLiveSocialLinks();
  const instagram = links.find((link) => link.id === "instagram");
  const otherLinks = links.filter((link) => link.id !== "instagram");
  if (links.length === 0) return null;

  const titleClass =
    size === "sm"
      ? "text-xs font-medium text-bark-soft"
      : "text-sm font-medium text-bark";

  const blurbClass =
    size === "sm"
      ? "text-xs leading-relaxed text-bark-faint"
      : "text-sm leading-relaxed text-bark-soft";

  const linkClass =
    size === "sm"
      ? "text-xs text-bark-faint hover:text-sage-700"
      : "text-sm text-bark-soft hover:text-sage-700";

  const ctaClass =
    size === "sm"
      ? "inline-flex text-xs font-semibold text-sage-700 hover:text-sage-800"
      : "inline-flex text-sm font-semibold text-sage-700 hover:text-sage-800";

  return (
    <div className={className}>
      {!hideTitle && (
        <div className="space-y-2">
          <p className={titleClass}>{socialLinksConfig.sectionTitle}</p>
          {socialLinksConfig.sectionBlurb && (
            <p className={blurbClass}>{socialLinksConfig.sectionBlurb}</p>
          )}
        </div>
      )}
      {instagram && (
        <p className={cn(!hideTitle && "mt-3")}>
          <a
            href={instagram.href}
            className={ctaClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialLinksConfig.instagramCta}
          </a>
        </p>
      )}
      {otherLinks.length > 0 && (
        <ul
          className={cn(
            "flex flex-wrap gap-x-4 gap-y-2",
            (instagram || !hideTitle) && "mt-3",
          )}
        >
          {otherLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={linkClass}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
