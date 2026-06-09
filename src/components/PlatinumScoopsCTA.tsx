import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ctas } from "@/lib/site";

/**
 * The "Presented by Platinum Scoops" sponsor section.
 * Tasteful, trust-first — used on the homepage and where relevant.
 */
export function PlatinumScoopsCTA() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-card bg-gradient-to-br from-gold-100 via-cream to-sage-50 p-6 ring-1 ring-inset ring-gold-200 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-gold-600">
                <Sparkles className="h-3.5 w-3.5" />
                Presented by Platinum Scoops
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl">
                A cleaner yard, a calmer routine, a happier dog.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-bark-soft">
                Keep Waco Wagging is presented by Platinum Scoops, a Waco pet
                care brand helping local dog families enjoy cleaner yards, calmer
                routines, and more confident everyday life with their dogs.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Button href={ctas.learnScoops.href} variant="sponsor" size="lg">
                {ctas.learnScoops.label}
              </Button>
              <Button href={ctas.bookScoops.href} variant="secondary" size="lg">
                {ctas.bookScoops.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
