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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-bark-soft sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
