import {
  ServiceIncludedGrid,
  ServicePageHero,
  ServiceSageCta,
  ServiceStepsPanel,
  type ServiceCtaConfig,
} from "@/components/service/ServicePageSections";
import type { ServicePageConfig } from "@/data/servicePages";

function ServiceQuotePanel({
  text,
  attribution,
}: {
  text: string;
  attribution: string;
}) {
  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="rounded-[24px] border border-border bg-soft-cream p-8 md:p-10">
        <div className="text-center text-[15px] tracking-wide text-rose" aria-hidden>
          ★★★★★
        </div>
        <blockquote className="mx-auto mt-3.5 max-w-3xl text-center font-display text-[27px] leading-snug text-serif-ink italic">
          &ldquo;{text}&rdquo;
        </blockquote>
        <p className="mt-4 text-center text-xs font-medium tracking-[0.14em] text-label-muted uppercase">
          {attribution}
        </p>
      </div>
    </section>
  );
}

function ServiceClayCta({ cta }: { cta: ServiceCtaConfig }) {
  const titleParts = cta.title.split(cta.scriptWord);

  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6 pb-4">
      <div className="rounded-[26px] bg-clay-rose px-8 py-12 text-center text-soft-cream md:px-12 md:py-14">
        <p className="text-xs font-medium tracking-[0.2em] text-[#7a4f49] uppercase">
          {cta.eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-xl font-display text-[40px] leading-tight font-medium">
          {titleParts[0]}
          <span className="font-script text-[46px] text-soft-cream">
            {cta.scriptWord}
          </span>
          {titleParts[1] ?? ""}
        </h2>
        <p className="mt-3 text-[15px] font-light opacity-95">{cta.subtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={cta.primary.href}
            className="btn-pill bg-soft-cream px-8 py-4 text-rose-deep hover:bg-wag-sage hover:text-cream"
          >
            {cta.primary.label}
          </a>
          {cta.secondary && (
            <a
              href={cta.secondary.href}
              className="btn-pill border-[1.4px] border-soft-cream/60 bg-transparent px-7 py-3.5 text-soft-cream hover:bg-soft-cream/15"
            >
              {cta.secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function ServicePageView({
  config,
  children,
}: {
  config: ServicePageConfig;
  children?: React.ReactNode;
}) {
  const { hero, included, steps, quote, cta } = config;

  return (
    <>
      <ServicePageHero {...hero} />
      <ServiceIncludedGrid {...included} />
      {steps && steps.length > 0 && <ServiceStepsPanel steps={steps} />}
      {quote && (
        <ServiceQuotePanel text={quote.text} attribution={quote.attribution} />
      )}
      {children}
      {cta.variant === "clay" ? (
        <ServiceClayCta cta={cta} />
      ) : (
        <ServiceSageCta {...cta} />
      )}
    </>
  );
}
