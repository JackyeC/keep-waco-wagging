import { merchPurposeLine } from "@/data/merchCuration";
import { cityConfig } from "@/lib/site";

export function ShopTrust() {
  return (
    <section className="mx-auto mt-16 max-w-3xl rounded-[24px] border border-border bg-soft-cream px-6 py-8 text-center sm:mt-20 sm:px-10" aria-labelledby="shop-trust-title">
      <h2 id="shop-trust-title" className="heading text-[clamp(1.8rem,3vw,2.4rem)]">
        From China Spring
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed font-light text-body-muted">
        {cityConfig.legalEntity} is Jackye and Todd Clayton&apos;s shop in{" "}
        {cityConfig.homeCity}, {cityConfig.stateAbbr} {cityConfig.homeZip}. Call{" "}
        <a
          href={cityConfig.sponsor.phoneHref}
          className="underline decoration-border underline-offset-2 hover:text-rose-deep"
        >
          (254) 726-6737
        </a>
        .
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed font-light text-body-muted">
        {merchPurposeLine}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed font-light text-body-muted">
        Order help, sizing, shipping, and returns use{" "}
        <a
          href="mailto:hello@keepwacowagging.com"
          className="underline decoration-border underline-offset-2 hover:text-rose-deep"
        >
          hello@keepwacowagging.com
        </a>
        . That is the address on those pages. The rest of this site uses{" "}
        <a
          href={`mailto:${cityConfig.publicEmail}`}
          className="underline decoration-border underline-offset-2 hover:text-rose-deep"
        >
          {cityConfig.publicEmail}
        </a>
        .
      </p>
    </section>
  );
}
