import Link from "next/link";
import { cityConfig } from "@/lib/site";

export function CampClaytonMeet() {
  return (
    <section className="mx-auto max-w-[1200px] px-6">
      <div className="rounded-[24px] border border-border bg-soft-cream p-8 sm:p-10">
        <p className="eyebrow tracking-[0.22em]">Want a little more fun with daycare?</p>
        <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.5rem)]">
          Meet Camp Clayton
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body-muted">
          Camp Clayton is our themed doggie daycare experience.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body-muted">
          Every week has a different theme with enrichment, sniffing games,
          seasonal activities, photo moments, or other small adventures
          layered into our normal daycare routine.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body-muted">
          Same thoughtful care. Something new to sniff, explore, or experience
          each week.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/camp-waco" className="btn-pill btn-sage px-7 py-3.5">
            Explore Camp Clayton
          </Link>
          <a
            href={cityConfig.rover.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-rose-outline px-7 py-3.5"
          >
            Book Daycare on Rover
          </a>
        </div>
      </div>
    </section>
  );
}
