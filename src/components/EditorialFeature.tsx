import Link from "next/link";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string; variant?: "primary" | "secondary" | "sponsor" | "ghost"; external?: boolean };

/** Image-led feature block — lead story or supporting department spread. */
export function EditorialFeature({
  department,
  title,
  dek,
  image,
  caption,
  ctas = [],
  reverse = false,
  size = "lead",
  className,
}: {
  department: string;
  title: string;
  dek: string;
  image: { src: string; alt: string };
  caption?: string;
  ctas?: Cta[];
  reverse?: boolean;
  size?: "lead" | "supporting";
  className?: string;
}) {
  const isLead = size === "lead";

  return (
    <div
      className={cn(
        "grid items-start gap-8 lg:gap-12",
        isLead ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-2",
        reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
        className,
      )}
    >
      <div className={cn(!reverse && "lg:pr-4")}>
        <p className="eyebrow eyebrow-brass">{department}</p>
        <h2 className={cn("mt-3", isLead ? "headline-lead" : "headline-secondary")}>
          {title}
        </h2>
        <p className={cn("mt-4 max-w-xl", isLead ? "dek" : "text-sm leading-relaxed text-bark-soft sm:text-base")}>
          {dek}
        </p>
        {ctas.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {ctas.map((cta) => (
              <Button
                key={cta.label}
                href={cta.href}
                variant={cta.variant ?? "primary"}
                size={isLead ? "lg" : "md"}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <figure className="min-w-0">
        <div
          className={cn(
            "relative overflow-hidden bg-sand",
            isLead ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/3]",
          )}
        >
          <SitePhoto
            src={image.src}
            alt={image.alt}
            sizes={isLead ? "(max-width: 1024px) 100vw, 42vw" : "(max-width: 1024px) 100vw, 50vw"}
          />
        </div>
        {caption && (
          <figcaption className="caption mt-2 border-l-2 border-clay pl-3">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

/** Smaller text-only department teaser for secondary homepage modules. */
export function EditorialTeaser({
  department,
  title,
  dek,
  href,
  ctaLabel,
  external,
  image,
  className,
}: {
  department: string;
  title: string;
  dek: string;
  href: string;
  ctaLabel: string;
  external?: boolean;
  image?: { src: string; alt: string };
  className?: string;
}) {
  const linkClass = "editorial-link mt-4 inline-block";

  return (
    <article className={cn("border-t border-clay pt-6", className)}>
      <p className="eyebrow">{department}</p>
      <h3 className="headline-tertiary mt-2">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-bark-soft">{dek}</p>
      {image && (
        <figure className="mt-4">
          <div className="relative aspect-[16/10] overflow-hidden bg-sand">
            <SitePhoto
              src={image.src}
              alt={image.alt}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <figcaption className="caption mt-2">{image.alt}</figcaption>
        </figure>
      )}
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {ctaLabel}
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}
