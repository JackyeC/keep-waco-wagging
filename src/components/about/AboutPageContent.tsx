import Link from "next/link";
import Image from "next/image";
import { designPhotos } from "@/data/designPhotos";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

export function AboutPageContent() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pt-11 pb-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
              Our story
            </span>
            <h1 className="display mt-3.5 text-balance">
              Meet Jackye &{" "}
              <span className="font-script text-[clamp(2.75rem,5vw,4.125rem)] text-rose">
                Todd
              </span>
            </h1>
            <p className="dek mt-5 max-w-md">
              {brandLanguage.brandRelationship} The family-run team behind
              boarding, daycare, scooping, training, and event care. The
              Claytons built this around dogs, full-time, because it is the
              work they love.
            </p>
            <p className="dek mt-4 max-w-md">
              No warehouse kennels. No after-hours side gigs. Just real care, in
              a real Waco home, for real dog families.
            </p>
          </div>
          <div className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src={designPhotos.aboutHero.src}
              alt={designPhotos.aboutHero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-14 md:py-14">
          <span className="text-[34px] text-blush" aria-hidden>
            ♥
          </span>
          <blockquote className="mx-auto mt-2.5 max-w-3xl font-display text-[32px] leading-snug font-medium italic">
            &ldquo;They are not boarding. They are visiting — bathed in the
            kitchen sink, dried with the good towels.&rdquo;
          </blockquote>
          <p className="mt-4 text-xs font-medium tracking-[0.18em] text-blush uppercase">
            {cityConfig.founders.jackye}, founder
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="text-center">
          <p className="eyebrow tracking-[0.22em]">What we believe</p>
          <h2 className="heading mt-1.5 text-[38px]">
            Community · Connection · Compassion
          </h2>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Community",
              detail:
                "Dog parents from every corner of Waco — all walks, all abilities, all welcome.",
            },
            {
              title: "Connection",
              detail:
                "Real relationships with the dogs and families we care for, week after week.",
            },
            {
              title: "Compassion",
              detail:
                "Patient, gentle, attentive care — the kind we'd want for our own.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[20px] border border-border bg-soft-cream p-7 text-center"
            >
              <p className="font-display text-[25px] text-wag-sage italic">
                {item.title}
              </p>
              <p className="body-light mt-2">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="grid items-center gap-8 rounded-[24px] border border-border bg-soft-cream p-8 md:grid-cols-2 md:gap-10 md:p-10">
          <div>
            <p className="eyebrow tracking-[0.2em]">Where we serve</p>
            <h3 className="mt-2 font-display text-[30px] font-semibold text-serif-ink">
              Greater Waco & McLennan County
            </h3>
            <p className="body-light mt-2.5">
              {cityConfig.serviceAreas.slice(0, 4).join(" · ")} · and
              surrounding {cityConfig.county} communities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-display text-[34px] font-bold text-wag-sage">
                5.0★
              </p>
              <p className="text-xs text-body-muted-light">on Rover</p>
            </div>
            <div>
              <p className="font-display text-[34px] font-bold text-wag-sage">
                {cityConfig.rover.reviewCount}
              </p>
              <p className="text-xs text-body-muted-light">Rover reviews</p>
            </div>
            <div>
              <p className="font-display text-[34px] font-bold text-wag-sage">
                Star
              </p>
              <p className="text-xs text-body-muted-light">Rover Sitter</p>
            </div>
            <div>
              <p className="font-display text-[34px] font-bold text-wag-sage">
                Full-time
              </p>
              <p className="text-xs text-body-muted-light">family-run</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-label-muted">
          {roverCredentialsLine}
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6 pb-4">
        <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-12 md:py-14">
          <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
            Come say hi
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-[40px] leading-tight font-medium">
            Let&apos;s keep Waco{" "}
            <span className="font-script text-[46px] text-blush">wagging</span>,
            together
          </h2>
          <p className="mt-3 text-[15px] font-light opacity-92">
            Call {cityConfig.sponsor.phoneDisplay} · {cityConfig.publicEmail} ·{" "}
            {brandLanguage.instagram.handle}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={ctas.bookService.href}
              className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
            >
              Book a service
            </Link>
            <Link
              href="/shop"
              className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream hover:bg-cream/15"
            >
              Shop merch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
