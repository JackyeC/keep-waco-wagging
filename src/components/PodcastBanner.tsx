import { Podcast, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { podcast } from "@/lib/site";

/** Larger homepage banner promoting the podcast, with subscribe + platforms. */
export function PodcastBanner() {
  if (!podcast.enabled) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-card bg-gradient-to-br from-sage-800 via-sage-700 to-sky-700 text-white">
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold-200">
                <Podcast className="h-3.5 w-3.5" aria-hidden="true" />
                The Podcast
              </span>

              <h2 className="mt-4 text-2xl text-white sm:text-3xl md:text-4xl">
                {podcast.name}
              </h2>
              <p className="mt-1 text-base font-medium text-gold-200">
                {podcast.tagline}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-sage-50/90 sm:text-base">
                {podcast.description}
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={podcast.subscribeUrl} variant="sponsor" size="lg">
                  <Podcast className="h-5 w-5" aria-hidden="true" />
                  Subscribe to the show
                </Button>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-sage-100/80">Listen on</span>
                  {podcast.platforms.map((p) => {
                    const external = p.href.startsWith("http");
                    return (
                      <a
                        key={p.label}
                        href={p.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
                      >
                        {p.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cover-art placeholder. TODO: drop in real podcast artwork. */}
            <div className="hidden lg:block">
              <div className="flex h-44 w-44 items-center justify-center rounded-card bg-white/10 ring-1 ring-inset ring-white/20">
                <Podcast className="h-16 w-16 text-gold-200" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
