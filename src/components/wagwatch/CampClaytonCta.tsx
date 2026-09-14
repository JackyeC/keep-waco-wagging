import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Standing conversion block for Wag Watch.
 *
 * Wag Watch is top-of-funnel: it earns attention from Waco dog parents with
 * timely, sourced info. This block is what turns that attention into a booking,
 * so it renders on every Wag Watch article and at the foot of the index — no
 * per-item wiring required. Pass `note` to tie it to the update above it.
 */
const DEFAULT_NOTE =
  "Camp Clayton is themed doggie daycare by Keep Waco Wagging — small-group supervised play, weekly enrichment, and real rest. A new theme every week, right here in Waco.";

export function CampClaytonCta({
  note,
  className = "mt-10",
}: {
  note?: string;
  className?: string;
}) {
  return (
    <aside
      className={`rounded-[20px] border border-border bg-sage-50 p-6 sm:p-8 ${className}`}
    >
      <p className="eyebrow tracking-[0.22em]">While you&rsquo;re here</p>
      <h2 className="heading mt-2 text-[clamp(1.5rem,3vw,1.9rem)]">
        Need a plan for your dog&rsquo;s day?
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-body-muted">
        {note ?? DEFAULT_NOTE}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button href="/camp-waco" variant="sage" size="lg">
          See Camp Clayton
        </Button>
        <Link
          href="/book"
          className="text-[14px] font-medium text-rose-deep underline underline-offset-4 hover:text-wag-sage"
        >
          Book a day &rarr;
        </Link>
      </div>
    </aside>
  );
}
