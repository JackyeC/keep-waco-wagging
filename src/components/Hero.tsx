import { PawPrint, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SponsorBadge } from "@/components/SponsorBadge";
import { siteConfig, ctas } from "@/lib/site";

/** Homepage hero. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sage-50 via-cream to-cream">
      {/* soft decorative paw motif */}
      <PawPrint
        className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-sage-100"
        aria-hidden="true"
        strokeWidth={1}
      />
      <PawPrint
        className="pointer-events-none absolute bottom-6 left-[-2rem] hidden h-32 w-32 rotate-12 text-sky-100 sm:block"
        aria-hidden="true"
        strokeWidth={1}
      />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Waco &amp; McLennan County
            </span>
            <SponsorBadge />
          </div>

          <h1 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Your Dog-Friendly
            <br />
            Guide to Waco
          </h1>

          <p className="mt-3 text-sm font-medium text-gold-600">
            {siteConfig.sponsorLine}
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bark-soft">
            Find dog-friendly patios, parks, events, local businesses, and
            real-life training tips for calmer adventures with your pup.
          </p>

          <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
            <Button href={ctas.exploreDirectory.href} size="lg">
              <PawPrint className="h-5 w-5" aria-hidden="true" />
              {ctas.exploreDirectory.label}
            </Button>
            <Button href={ctas.trainingHelp.href} variant="secondary" size="lg">
              {ctas.trainingHelp.label}
            </Button>
            <Button href={ctas.learnScoops.href} variant="ghost" size="lg">
              {ctas.learnScoops.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
