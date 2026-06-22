import { PresentingSponsor } from "@/components/PresentingSponsor";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

/**
 * Presenting sponsor callout — Platinum Scoops as supporter, not the main brand.
 */
export function PlatinumScoopsCTA() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-card bg-sand p-6 ring-1 ring-inset ring-clay sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="font-display text-lg text-bark">{brandLanguage.primaryName}</p>
              <div className="mt-2">
                <PresentingSponsor showServices />
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl">
                Cleaner yards, calmer routines, happier dogs.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-bark-soft">
                {brandLanguage.communityLine}. {brandLanguage.sponsorServices}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Button href={ctas.learnScoops.href} variant="secondary" size="lg">
                About {cityConfig.sponsor.name}
              </Button>
              <Button href={ctas.bookScoops.href} variant="sponsor" size="lg">
                {ctas.bookScoops.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
