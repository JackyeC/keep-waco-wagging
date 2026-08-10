import Image from "next/image";
import Link from "next/link";
import { cityConfig } from "@/lib/site";

const trustChips = [
  `${cityConfig.rover.rating} on Rover`,
  `${cityConfig.rover.reviewCount} Rover reviews`,
  "Rover Star Sitter",
  "Family-run in Waco",
];

export function TrustSection() {
  return (
    <section id="services" className="mt-20 scroll-mt-24 bg-soft-cream py-16">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow tracking-[0.24em]">Powered by Platinum Scoops</p>
          <h2 className="heading mt-3 text-[clamp(1.9rem,3.6vw,2.75rem)]">
            Backed by real Waco dog people.
          </h2>
          <p className="dek mt-5">
            Keep Waco Wagging is powered by the family behind Platinum Scoops —
            trusted by local dog families for boarding, daycare, training, camp,
            and pet care.
          </p>

          <blockquote className="mt-6 border-l-2 border-rose pl-5">
            <p className="font-display text-[20px] leading-snug text-wag-sage italic">
              &ldquo;They are not boarding. They are visiting — bathed in the
              kitchen sink, dried with the good towels.&rdquo;
            </p>
            <cite className="mt-2.5 block text-xs font-medium tracking-[0.16em] text-label-muted not-italic uppercase">
              {cityConfig.founders.jackye}, founder
            </cite>
          </blockquote>

          <ul className="mt-6 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border bg-cream px-3.5 py-1.5 text-[11px] font-medium tracking-[0.1em] text-body-muted uppercase"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/pet-care" className="btn-pill btn-sage px-8 py-4">
              Need Pet Care?
            </Link>
            <Link
              href="/book"
              className="btn-pill btn-rose-outline px-7 py-[0.9rem]"
            >
              All booking options
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src="/pictures/founders-jackye-todd.webp"
              alt="Jackye and Todd Clayton, the family behind Keep Waco Wagging and Platinum Scoops"
              fill
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
