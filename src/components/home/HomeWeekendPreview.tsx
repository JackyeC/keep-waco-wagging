import Link from "next/link";
import { WeekendGuideBlock } from "@/components/WeekendGuideBlock";
import { weekendBlocks } from "@/data/weekend";

const HOME_WEEKEND_KINDS = new Set(["patio", "park", "weather"]);

export function HomeWeekendPreview() {
  const picks = weekendBlocks.filter((block) => HOME_WEEKEND_KINDS.has(block.kind));

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow tracking-[0.24em]">Waco Dog Weekend</p>
          <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)]">
            What can we do with the dog this weekend?
          </h2>
          <p className="dek mt-2 max-w-lg text-[15px]">
            A patio, a park, and a heat check — curated, not scraped. Always
            verify dog policies before you go.
          </p>
        </div>
        <Link
          href="/weekend"
          className="border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
        >
          Full weekend guide →
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {picks.map((block) => (
          <WeekendGuideBlock key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
