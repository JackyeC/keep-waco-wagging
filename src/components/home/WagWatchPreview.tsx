import Link from "next/link";
import { Bell } from "lucide-react";
import { WagWatchCard } from "@/components/wagwatch/WagWatchCard";
import { getPublishedWagWatch } from "@/data/wagWatch";

/** Homepage preview of the newest Wag Watch items. Empty-safe (drafts hidden). */
export function WagWatchPreview() {
  const items = getPublishedWagWatch().slice(0, 3);

  return (
    <section className="bg-soft-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow tracking-[0.24em]">Wag Watch</p>
            <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)]">
              What Waco dog parents need to know
            </h2>
            <p className="dek mt-2 max-w-lg text-[15px]">
              Timely, sourced updates for Waco and McLennan County dog parents.
            </p>
          </div>
          <Link
            href="/wag-watch"
            className="border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
          >
            All of Wag Watch →
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <WagWatchCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-start gap-4 rounded-[20px] border border-border bg-cream p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
                <Bell className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="max-w-xl text-[15px] leading-relaxed text-body-muted">
                The first Wag Watch briefs are on the way — local alerts,
                program news, recalls, and new dog-friendly spots. Join the Wag
                Club and we&rsquo;ll send the important ones to your inbox.
              </p>
            </div>
            <Link href="/#wag-club" className="btn-pill btn-sage shrink-0 px-7 py-3">
              Join the Wag Club
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
