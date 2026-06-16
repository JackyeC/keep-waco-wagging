import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SponsorBadge } from "@/components/SponsorBadge";
import { SitePhoto } from "@/components/SitePhoto";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tone = "sage" | "sky" | "sand" | "gold" | "cream";

const toneBg: Record<Tone, string> = {
  sage: "from-sage-100 via-sage-50 to-cream",
  sky: "from-sky-100 via-sky-50 to-cream",
  sand: "from-sand via-sand to-cream",
  gold: "from-gold-100 via-cream to-cream",
  cream: "from-cream via-cream to-sand",
};

/** Reusable header band for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  tone = "sage",
  showSiteName = false,
  showSponsor = false,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: Tone;
  /** Show the site name above the eyebrow (e.g. summer camp calendar pages). */
  showSiteName?: boolean;
  showSponsor?: boolean;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("bg-gradient-to-b", toneBg[tone])}>
      <Container
        className={cn(
          "py-14 sm:py-20",
          image && "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]",
        )}
      >
        <div className={cn(image ? "max-w-xl" : "max-w-3xl")}>
          {showSiteName && (
            <p className="font-display text-xl font-semibold tracking-tight text-bark sm:text-2xl">
              <Link
                href="/"
                className="transition-colors hover:text-sage-700"
              >
                {siteConfig.name}
              </Link>
            </p>
          )}
          {showSponsor && (
            <div className={cn(showSiteName ? "mt-2" : undefined)}>
              <SponsorBadge />
            </div>
          )}
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-bark-soft sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-md ring-1 ring-inset ring-clay/60 lg:aspect-[5/4]">
            <SitePhoto
              src={image.src}
              alt={image.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
