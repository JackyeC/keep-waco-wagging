import Link from "next/link";
import { PawPrint, Plus, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Sponsor showcase band. Features Platinum Scoops as the presenting sponsor
 * and shows open slots that invite other local businesses to sponsor.
 *
 * TODO: as you add paid sponsors, render their logo/name tiles here (or drive
 * this from the `ads` data with label "Sponsored").
 */
export function SponsorStrip() {
  return (
    <section className="border-y border-clay/70 bg-paper-alt py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-bark-faint">
              Proudly supported by local sponsors
            </p>
            <p className="mt-1 max-w-md text-sm text-bark-soft">
              Keep Waco Wagging is free for dog parents thanks to businesses that
              support the local dog community.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Presenting sponsor — Platinum Scoops */}
            <Link
              href="/platinum-scoops"
              className="group flex items-center gap-3 rounded-card bg-white px-5 py-3 ring-1 ring-inset ring-gold-200 transition-colors hover:ring-gold-400"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-gold-600">
                  Presenting Sponsor
                </span>
                <span className="block font-display text-base font-semibold text-bark">
                  Platinum Scoops
                </span>
              </span>
            </Link>

            {/* Open sponsor slots */}
            {[0, 1].map((i) => (
              <Link
                key={i}
                href="/get-listed"
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
            ))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-bark-faint lg:justify-end">
          <PawPrint className="h-3.5 w-3.5" />
          Sponsorships &amp; ad placements available —{" "}
          <Link href="/get-listed" className="font-semibold text-sage-700 hover:underline">
            see options
          </Link>
        </p>
      </Container>
    </section>
  );
}
