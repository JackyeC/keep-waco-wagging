import Image from "next/image";
import Link from "next/link";

type ServicePageHeroProps = {
  eyebrow: string;
  title: string;
  scriptWord: string;
  metaLine?: string;
  description: string;
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string; external?: boolean };
  image: { src: string; alt: string; objectPosition?: string };
};

export function ServicePageHero({
  eyebrow,
  title,
  scriptWord,
  metaLine,
  description,
  primary,
  secondary,
  image,
}: ServicePageHeroProps) {
  const titleParts = title.split(scriptWord);

  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-4">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
            {eyebrow}
          </span>
          <h1 className="display mt-3.5 text-balance">
            {titleParts[0]}
            <span className="font-script text-[clamp(2.75rem,5vw,4.25rem)] text-rose">
              {scriptWord}
            </span>
            {titleParts[1] ?? ""}
          </h1>
          {metaLine && (
            <p className="mt-4 text-xs font-medium tracking-[0.18em] text-label-muted uppercase">
              {metaLine}
            </p>
          )}
          <p className="dek mt-3.5 max-w-md">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={primary.href}
              target={primary.external ? "_blank" : undefined}
              rel={primary.external ? "noopener noreferrer" : undefined}
              className="btn-pill btn-sage px-7 py-4"
            >
              {primary.label}
            </a>
            <a
              href={secondary.href}
              target={secondary.external ? "_blank" : undefined}
              rel={secondary.external ? "noopener noreferrer" : undefined}
              className="btn-pill btn-rose-outline px-7 py-3.5"
            >
              {secondary.label}
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] max-h-[440px] w-full overflow-hidden rounded-[28px] border border-border">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
            style={
              image.objectPosition
                ? { objectPosition: image.objectPosition }
                : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}

export type IncludedItem = {
  title: string;
  detail: string;
};

export function ServiceIncludedGrid({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: IncludedItem[];
}) {
  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="text-center">
        <p className="eyebrow tracking-[0.22em]">{eyebrow}</p>
        <h2 className="heading mt-1.5 text-[38px]">{title}</h2>
      </div>
      <div
        className={`mt-7 grid gap-4 sm:grid-cols-2 ${
          items.length > 4 ? "lg:grid-cols-3" : "xl:grid-cols-4"
        }`}
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[18px] border border-border bg-soft-cream p-6 sm:p-7"
          >
            <span className="text-lg text-rose" aria-hidden="true">
              ♥
            </span>
            <h3 className="mt-2 font-display text-[21px] font-semibold text-serif-ink">
              {item.title}
            </h3>
            <p className="body-light mt-1.5">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export type ServiceStep = {
  number: string;
  title: string;
  detail: string;
};

export function ServiceStepsPanel({ steps }: { steps: ServiceStep[] }) {
  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="grid gap-6 rounded-[24px] border border-border bg-soft-cream p-8 md:grid-cols-3 md:gap-8 md:p-10">
        {steps.map((step) => (
          <div key={step.number}>
            <p className="font-display text-[30px] text-rose italic">
              {step.number}
            </p>
            <h3 className="mt-2 font-display text-[22px] font-semibold text-serif-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-body-muted-light">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export type ServiceCtaConfig = {
  eyebrow: string;
  title: string;
  scriptWord: string;
  subtitle: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
  variant?: "sage" | "clay";
};

export function ServiceSageCta({
  eyebrow,
  title,
  scriptWord,
  subtitle,
  primary,
  secondary,
}: ServiceCtaConfig) {
  const titleParts = title.split(scriptWord);

  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6 pb-4">
      <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-12 md:py-14">
        <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-xl font-display text-[40px] leading-tight font-medium">
          {titleParts[0]}
          <span className="font-script text-[46px] text-blush">{scriptWord}</span>
          {titleParts[1] ?? ""}
        </h2>
        <p className="mt-3 text-[15px] font-light opacity-92">{subtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={primary.href}
            target={primary.external ? "_blank" : undefined}
            rel={primary.external ? "noopener noreferrer" : undefined}
            className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
          >
            {primary.label}
          </a>
          {secondary && (
            <Link
              href={secondary.href}
              className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream hover:bg-cream/15"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
