import Image from "next/image";
import Link from "next/link";
import { ServiceFaqSection } from "@/components/service/ServiceFaqSection";
import { ServicePageJsonLd } from "@/components/seo/StructuredData";
import {
  landingTestimonials,
  type PetCareLandingConfig,
} from "@/data/petCareLandings";
import { brandLanguage, cityConfig } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

function TrustStrip() {
  return (
    <p className="mt-4 text-xs font-medium tracking-[0.14em] text-label-muted uppercase">
      ★ {roverCredentialsLine} · {cityConfig.trustSignals.repeatClients} repeat
      clients
    </p>
  );
}

export function PetCareServiceLanding({
  config,
}: {
  config: PetCareLandingConfig;
}) {
  const quotes = landingTestimonials(config.serviceKind);

  return (
    <>
      <ServicePageJsonLd
        config={{
          slug: config.slug,
          seo: config.seo,
          hero: {
            eyebrow: config.hero.eyebrow,
            title: `${config.hero.h1} ${config.hero.h1Accent}`,
            scriptWord: config.hero.h1Accent,
            description: config.hero.description,
            image: config.hero.image,
            primary: config.hero.primaryCta,
            secondary: config.hero.secondaryCta,
          },
          included: { eyebrow: "", title: "", items: [] },
          faq: config.faqs,
          cta: {
            eyebrow: config.closing.eyebrow,
            title: config.closing.title,
            scriptWord: config.closing.scriptWord,
            subtitle: config.closing.subtitle,
            primary: config.hero.primaryCta,
            secondary: { label: "All pet care", href: "/pet-care" },
          },
        }}
        faqs={config.faqs}
        offer={{
          name:
            config.serviceKind === "boarding"
              ? "Home-based dog boarding"
              : "Home-based dog daycare",
          price:
            config.serviceKind === "boarding" ? "47" : "37",
          priceCurrency: "USD",
          description: config.seo.description,
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
              {config.hero.eyebrow}
            </span>
            <h1 className="display mt-3.5 text-balance">
              {config.hero.h1}{" "}
              <span className="font-script text-[clamp(2.5rem,5vw,4rem)] text-rose">
                {config.hero.h1Accent}
              </span>
            </h1>
            <p className="mt-4 text-[13px] font-medium tracking-[0.04em] text-wag-sage">
              {brandLanguage.petCareProvided}
            </p>
            <TrustStrip />
            <p className="dek mt-4 max-w-md">{config.hero.description}</p>
            <p className="mt-4 font-display text-[22px] font-semibold text-serif-ink">
              {config.hero.startingRateLabel}{" "}
              <span className="text-wag-sage">{config.hero.startingRate}</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={config.hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-sage px-7 py-4"
              >
                {config.hero.primaryCta.label}
              </a>
              <a
                href={config.hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-rose-outline px-7 py-3.5"
              >
                {config.hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] max-h-[440px] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src={config.hero.image.src}
              alt={config.hero.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Caregivers */}
      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative order-2 aspect-[5/4] overflow-hidden rounded-[24px] border border-border lg:order-1">
            <Image
              src={config.caregivers.image.src}
              alt={config.caregivers.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow tracking-[0.2em]">The caregivers</p>
            <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.5rem)]">
              {config.caregivers.title}
            </h2>
            {config.caregivers.body.map((para) => (
              <p key={para.slice(0, 32)} className="dek mt-4 max-w-lg text-[15px]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Rhythm */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <p className="eyebrow tracking-[0.2em]">{config.rhythm.eyebrow}</p>
          <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.5rem)]">
            {config.rhythm.title}
          </h2>
          <p className="dek mt-4 text-[15px]">{config.rhythm.intro}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {config.rhythm.blocks.map((block) => (
            <article
              key={block.title}
              className="rounded-[18px] border border-border bg-soft-cream p-6"
            >
              <h3 className="font-display text-[21px] font-semibold text-serif-ink">
                {block.title}
              </h3>
              <p className="body-light mt-2 text-[14px]">{block.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Photo strip */}
      <section className="mx-auto mt-14 max-w-[1200px] px-6" aria-label="Care photos">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {config.photos.slice(0, 4).map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-border"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Introductions */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <div className="rounded-[24px] border border-border bg-soft-cream p-8 md:p-10">
          <h2 className="heading text-[clamp(1.75rem,3vw,2.35rem)]">
            {config.introductions.title}
          </h2>
          {config.introductions.body.map((para) => (
            <p key={para.slice(0, 28)} className="dek mt-4 max-w-3xl text-[15px]">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Fit */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <h2 className="heading text-[clamp(1.85rem,3.5vw,2.5rem)]">
          {config.fit.title}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] border border-border bg-soft-cream p-6 md:p-7">
            <h3 className="font-display text-[22px] font-semibold text-wag-sage">
              {config.fit.goodTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {config.fit.good.map((item) => (
                <li key={item} className="body-light text-[14px]">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-border bg-soft-cream p-6 md:p-7">
            <h3 className="font-display text-[22px] font-semibold text-rose-deep">
              {config.fit.cautionTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {config.fit.caution.map((item) => (
                <li key={item} className="body-light text-[14px]">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Special care */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <h2 className="heading text-[clamp(1.85rem,3.5vw,2.5rem)]">
          {config.specialCare.title}
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {config.specialCare.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[18px] border border-border bg-soft-cream p-6"
            >
              <h3 className="font-display text-[20px] font-semibold text-serif-ink">
                {item.title}
              </h3>
              <p className="body-light mt-2 text-[14px]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Bring + logistics */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="heading text-[clamp(1.75rem,3vw,2.25rem)]">
              {config.bring.title}
            </h2>
            <p className="dek mt-3 text-[15px]">{config.bring.intro}</p>
            <ul className="mt-5 space-y-2.5">
              {config.bring.items.map((item) => (
                <li key={item} className="body-light text-[14px]">
                  · {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] font-light text-label-muted">
              {config.bring.note}
            </p>
          </div>
          <div>
            <h2 className="heading text-[clamp(1.75rem,3vw,2.25rem)]">
              {config.logistics.title}
            </h2>
            <div className="mt-5 space-y-4">
              {config.logistics.items.map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-[18px] font-semibold text-serif-ink">
                    {item.title}
                  </h3>
                  <p className="body-light mt-1.5 text-[14px]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <h2 className="heading text-[clamp(1.85rem,3.5vw,2.5rem)]">
          {config.pricing.title}
        </h2>
        <p className="dek mt-3 max-w-2xl text-[15px]">{config.pricing.intro}</p>
        <div className="mt-7 overflow-hidden rounded-[20px] border border-border bg-soft-cream">
          <ul className="divide-y divide-border">
            {config.pricing.lines.map((line) => (
              <li
                key={line.label}
                className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3.5 sm:px-6"
              >
                <span className="text-[14px] text-serif-ink">{line.label}</span>
                <span className="font-display text-[17px] font-semibold text-wag-sage">
                  {line.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-[13px] font-light text-label-muted">
          {config.pricing.note}
        </p>
        <a
          href={config.hero.primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-sage mt-6 inline-flex px-7 py-3.5"
        >
          {config.hero.primaryCta.label}
        </a>
      </section>

      {/* Reviews */}
      <section className="mx-auto mt-16 max-w-[1200px] px-6">
        <div className="text-center">
          <p className="eyebrow tracking-[0.2em]">Rover reviews</p>
          <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.5rem)]">
            What Waco dog families say
          </h2>
          <TrustStrip />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {quotes.map((review) => (
            <article
              key={review.id}
              className="rounded-[20px] border border-border bg-soft-cream p-6"
            >
              <div className="text-[14px] tracking-wide text-rose" aria-hidden>
                ★★★★★
              </div>
              <p className="mt-3 font-display text-[18px] leading-snug text-serif-ink italic">
                &ldquo;{review.quote.length > 180
                  ? `${review.quote.slice(0, 177).trim()}…`
                  : review.quote}
                &rdquo;
              </p>
              <p className="mt-4 text-xs font-medium tracking-[0.12em] text-label-muted uppercase">
                {review.author}
                {review.service ? ` · ${review.service}` : ""} · Rover
              </p>
            </article>
          ))}
        </div>
      </section>

      <ServiceFaqSection items={config.faqs} />

      {/* Related */}
      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <h2 className="heading text-[28px]">Related care</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {config.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[18px] border border-border bg-soft-cream p-5 transition-colors hover:border-rose"
            >
              <p className="font-display text-[19px] font-semibold text-serif-ink">
                {link.label}
              </p>
              <p className="body-light mt-1.5 text-[13px]">{link.detail}</p>
              <span className="mt-3 inline-block text-[11px] font-medium tracking-[0.12em] text-rose-deep uppercase">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto mt-14 max-w-[1200px] px-6 pb-6">
        <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-12 md:py-14">
          <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
            {config.closing.eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-[36px] leading-tight font-medium md:text-[40px]">
            {config.closing.title.split(config.closing.scriptWord)[0]}
            <span className="font-script text-[42px] text-blush">
              {config.closing.scriptWord}
            </span>
            {config.closing.title.split(config.closing.scriptWord)[1] ?? ""}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] font-light opacity-92">
            {config.closing.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={config.hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
            >
              {config.hero.primaryCta.label}
            </a>
            <Link
              href="/pet-care"
              className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream hover:bg-cream/15"
            >
              All pet care
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
