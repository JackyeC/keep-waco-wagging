import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "paper" | "sand" | "sage" | "sky";

const toneClass: Record<Tone, string> = {
  paper: "bg-cream",
  sand: "bg-sand",
  sage: "bg-sage-50",
  sky: "bg-sky-50",
};

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
}) {
  return (
    <section id={id} className={cn(toneClass[tone], "py-14 sm:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "compact";
}) {
  return (
    <div
      className={cn(
        size === "default" ? "max-w-2xl" : "max-w-xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <p className="eyebrow eyebrow-brass mb-3">{eyebrow}</p>}
      <h2
        className={cn(
          size === "default" ? "headline-secondary" : "headline-tertiary",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 leading-relaxed text-bark-soft",
            size === "default" ? "dek max-w-2xl" : "text-sm sm:text-base",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
