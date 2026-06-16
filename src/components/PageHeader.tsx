import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PublisherNote } from "@/components/PublisherNote";
import { SitePhoto } from "@/components/SitePhoto";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tone = "sage" | "sky" | "sand" | "gold" | "cream";

const toneBg: Record<Tone, string> = {
  sage: "bg-sage-50",
  sky: "bg-sky-50",
  sand: "bg-sand",
  gold: "bg-cream",
  cream: "bg-cream",
};

/** Magazine-style interior page header — overline, headline, dek. */
export function PageHeader({
  eyebrow,
  title,
  description,
  tone = "cream",
  showSiteName = false,
  showPublisher = false,
  showSponsor,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: Tone;
  showSiteName?: boolean;
  showPublisher?: boolean;
  /** Alias for showPublisher */
  showSponsor?: boolean;
  image?: { src: string; alt: string; caption?: string };
  children?: React.ReactNode;
}) {
  const showPub = showPublisher || showSponsor;
  return (
    <section className={cn("border-b border-clay", toneBg[tone])}>
      <Container
        className={cn(
          "py-16 sm:py-20 md:py-24",
          image && "grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14",
        )}
      >
        <div className={cn(image ? "max-w-xl" : "max-w-3xl")}>
          {showSiteName && (
            <p className="font-display text-lg tracking-tight text-bark sm:text-xl">
              <Link href="/" className="transition-colors hover:text-gold-600">
                {siteConfig.name}
              </Link>
            </p>
          )}
          {showPub && (
            <div className={cn(showSiteName ? "mt-3" : undefined)}>
              <PublisherNote />
            </div>
          )}
          {eyebrow && (
            <p className={cn("eyebrow eyebrow-brass", showPub || showSiteName ? "mt-4" : undefined)}>
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          {description && <p className="dek mt-5 max-w-2xl">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-[5/4]">
              <SitePhoto
                src={image.src}
                alt={image.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            {image.caption && (
              <figcaption className="caption mt-2 border-l-2 border-clay pl-3">
                {image.caption}
              </figcaption>
            )}
          </figure>
        )}
      </Container>
    </section>
  );
}
