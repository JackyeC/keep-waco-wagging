import { Container } from "@/components/ui/Container";
import { SponsorBadge } from "@/components/SponsorBadge";
import { SitePhoto } from "@/components/SitePhoto";
import { cn } from "@/lib/utils";

type Tone = "sage" | "sky" | "sand" | "gold";

const toneBg: Record<Tone, string> = {
  sage: "from-sage-100 via-sage-50 to-cream",
  sky: "from-sky-100 via-sky-50 to-cream",
  sand: "from-sand via-sand to-cream",
  gold: "from-gold-100 via-cream to-cream",
};

/** Reusable header band for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  tone = "sage",
  showSponsor = false,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: Tone;
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
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-600">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {showSponsor && (
            <div className="mt-4">
              <SponsorBadge />
            </div>
          )}
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
