import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CTA = { label: string; href: string };
type Tone = "sage" | "sky" | "gradient";

const toneClass: Record<Tone, string> = {
  sage: "bg-sage-700 text-white",
  sky: "bg-sky-600 text-white",
  gradient: "bg-gradient-to-r from-sage-700 to-sage-600 text-white",
};

/**
 * Reusable call-to-action band. Used for training, directory, and
 * conversion-focused sections across the site.
 */
export function CTASection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  tone = "gradient",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary: CTA;
  secondary?: CTA;
  tone?: Tone;
  id?: string;
}) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <Container>
        <div
          className={cn(
            "relative overflow-hidden rounded-card px-6 py-12 text-center sm:px-12 sm:py-16",
            toneClass[tone],
          )}
        >
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-100">
              {eyebrow}
            </p>
          )}
          <h2 className="mx-auto max-w-2xl text-2xl text-white sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={primary.href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                variant="ghost"
                size="lg"
                className="w-full text-white hover:bg-white/10 sm:w-auto"
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
