import { isPublishableDirectoryValue } from "@/lib/directoryPublish";
import type { DogDirectoryListing } from "@/lib/types";

const UNKNOWN_LABEL = "Not yet verified";

function displayValue(value?: string): string {
  return isPublishableDirectoryValue(value) ? value : UNKNOWN_LABEL;
}

function yesNoUnknown(value?: "yes" | "no" | "unknown"): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No — plan to bring your own";
  return UNKNOWN_LABEL;
}

/**
 * Recognizable Keep Waco Wagging "Before You Go" pattern.
 * Uses existing directory fields. Unknown stays unknown.
 */
export function BeforeYouGo({ listing }: { listing: DogDirectoryListing }) {
  const rows: { label: string; value: string }[] = [
    { label: "Dog policy", value: displayValue(listing.dogPolicy) },
    { label: "Patio / outdoor details", value: displayValue(listing.patioDetails) },
    { label: "Water", value: yesNoUnknown(listing.waterBowls) },
    { label: "Shade", value: yesNoUnknown(listing.shade) },
    { label: "Best time to visit", value: displayValue(listing.bestTimeToVisit) },
  ];

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.16em] text-wag-sage uppercase">
        Before You Go
      </p>
      <h2 className="mt-2 font-display text-[1.65rem] font-medium text-serif-ink">
        What it&rsquo;s actually like with a dog
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-body-muted">
        Dogs allowed is only the start. When we haven&rsquo;t verified something,
        we say so instead of filling the gap.
      </p>
      <dl className="mt-6 space-y-5 text-sm leading-relaxed text-bark-soft">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-semibold tracking-wide text-bark-faint uppercase">
              {row.label}
            </dt>
            <dd className="mt-1">{row.value}</dd>
          </div>
        ))}
      </dl>
      {isPublishableDirectoryValue(listing.notes) ? (
        <p className="mt-6 text-sm leading-relaxed text-bark-soft">
          <span className="font-medium text-bark">Notes: </span>
          {listing.notes}
        </p>
      ) : null}
      <p className="mt-6 rounded-xl bg-gold-100 p-4 text-sm leading-relaxed text-bark-soft">
        Dog policies, hours, and availability can change. Verify directly before
        visiting. In a Central Texas summer, skip hot pavement in the middle of
        the afternoon even if the listing looks good on paper.
      </p>
    </div>
  );
}
