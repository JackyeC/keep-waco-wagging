import Link from "next/link";
import { cityConfig } from "@/lib/site";

export function CampClaytonExplainer() {
  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow tracking-[0.22em]">Still daycare</p>
          <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.4rem)]">
            What is Camp Clayton?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-body-muted">
            Camp Clayton is our themed doggie daycare experience.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-body-muted">
            Dogs get the same thoughtful, home-based care Keep Waco Wagging is
            known for — supervised play, enrichment, rest, decompression, and
            individual attention — with a different theme layered in each week.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-body-muted">
            Some weeks include sniffing games. Some have seasonal enrichment.
            Some have silly photo setups. Some are built around exploring new
            textures, smells, or puzzles.
          </p>
          <p className="mt-4 font-display text-[1.35rem] text-serif-ink italic">
            The theme changes. The care doesn&rsquo;t.
          </p>
        </div>

        <div className="rounded-[20px] border border-border bg-soft-cream p-6 sm:p-8">
          <h3 className="font-display text-[1.5rem] font-medium text-serif-ink">
            Daycare vs. Camp Clayton
          </h3>
          <div className="mt-5 space-y-5 text-[14.5px] leading-relaxed text-bark-soft">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] text-wag-sage uppercase">
                Doggie daycare
              </p>
              <p className="mt-1.5">
                The underlying care service: supervised play, enrichment, rest,
                decompression, individual attention, and small-group care in
                our Waco home.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.14em] text-wag-sage uppercase">
                Camp Clayton
              </p>
              <p className="mt-1.5">
                The themed experience layered onto daycare. You are still
                booking doggie daycare — not overnight camp, a large commercial
                daycare, a children&rsquo;s camp, or a separate facility.
              </p>
            </div>
          </div>
          <p className="mt-5 text-[14px] text-bark">
            Camp Clayton is our themed take on doggie daycare.
          </p>
          <a
            href={cityConfig.rover.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-sage mt-6 inline-flex px-6 py-3"
          >
            Book a Day on Rover
          </a>
          <p className="mt-3 text-[13px] text-label-muted">
            Prefer the full daycare overview first?{" "}
            <Link href="/dog-daycare-waco-tx" className="text-wag-sage hover:text-rose">
              See doggie daycare
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
