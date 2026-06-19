import Link from "next/link";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { communityPartners } from "@/data/communityPartners";
import { brandLanguage, ctas } from "@/lib/site";

/**
 * Sponsor showcase band — Keep Waco Wagging first, partners secondary.
 */
export function SponsorStrip() {
  return (
    <section className="border-y border-clay/70 bg-paper-alt py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-bark-faint">
              {brandLanguage.primaryName}
            </p>
            <p className="mt-1 max-w-md text-sm text-bark-soft">
              {brandLanguage.communityLine}. {brandLanguage.communityPartnersWelcome}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {communityPartners.map((partner) => {
              const card = (
                <span className="leading-tight">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-gold-600">
                    {partner.sponsorTier}
                  </span>
                  <span className="block font-display text-base font-semibold text-bark">
                    {partner.sponsorName}
                  </span>
                </span>
              );

              if (partner.sponsorUrl) {
                return (
                  <a
                    key={partner.id}
                    href={partner.sponsorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-card bg-white px-5 py-3 ring-1 ring-inset ring-clay transition-colors hover:ring-gold-300"
                  >
                    {card}
                  </a>
                );
              }

              return (
                <Link
                  key={partner.id}
                  href="/platinum-scoops"
                  className="group flex items-center gap-3 rounded-card bg-white px-5 py-3 ring-1 ring-inset ring-clay transition-colors hover:ring-gold-300"
                >
                  {card}
                </Link>
              );
            })}

            <Link
              href={ctas.becomeSponsor.href}
              className="group flex items-center gap-3 rounded-card border border-dashed border-clay bg-cream px-5 py-3 transition-colors hover:border-sage-300 hover:bg-sage-50"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                <Plus className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-bark-faint">
                  Open slot
                </span>
                <span className="block text-sm font-semibold text-sage-700">
                  Your business here
                </span>
              </span>
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-bark-faint lg:text-right">
          {brandLanguage.sponsorCampInquiry}{" "}
          <Link href={ctas.becomeSponsor.href} className="font-semibold text-sage-700 hover:underline">
            Contact us
          </Link>
        </p>
      </Container>
    </section>
  );
}
