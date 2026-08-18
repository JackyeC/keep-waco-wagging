import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { WagWatchCard } from "@/components/wagwatch/WagWatchCard";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { getPublishedWagWatch } from "@/data/wagWatch";
import { servicePageMetadata } from "@/lib/metadata";

const description =
  "Wag Watch is what Waco dog parents need to know right now — local alerts, program news, recalls, heat warnings, and new dog-friendly spots across Waco and McLennan County.";

export const metadata: Metadata = servicePageMetadata(
  "/wag-watch",
  "Wag Watch | What Waco Dog Parents Need to Know",
  description,
);

export default function WagWatchPage() {
  const items = getPublishedWagWatch();

  return (
    <>
      <PageHeader
        eyebrow="Wag Watch"
        title="What Waco dog parents need to know right now."
        description="Timely, useful updates for Waco and McLennan County dog parents — city and county programs, Texas rules, recalls, heat and safety alerts, and new dog-friendly places. Every item is dated and sourced."
        tone="sage"
      />

      <Section tone="paper">
        {items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <WagWatchCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-[24px] border border-border bg-soft-cream p-10 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
              <Bell className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="heading mt-5 text-[1.6rem]">
              First briefs are on the way
            </h2>
            <p className="dek mt-3">
              We&rsquo;re lining up the first Wag Watch updates — real, sourced,
              and useful. Join the Wag Club and we&rsquo;ll send the important
              ones straight to your inbox.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="[&_p]:text-body-muted">
                <WagClubSignup id="wag-watch-signup" sourcePage="/wag-watch" variant="hero" />
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
