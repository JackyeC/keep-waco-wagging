import { brandLanguage } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

const items = [
  brandLanguage.brandByLine,
  roverCredentialsLine,
  "Waco, Texas",
  "Full-time pet care",
];

export function MarqueeStrip() {
  return (
    <div className="mt-11 overflow-hidden bg-wag-sage py-3.5 text-cream">
      <div className="marquee-track gap-9 text-xs font-medium tracking-[0.22em] uppercase">
        {[0, 1].map((dup) => (
          <span key={dup} className="flex shrink-0 items-center gap-9" aria-hidden={dup === 1}>
            {items.flatMap((item, i) => [
              <span key={`${dup}-${item}`}>{item}</span>,
              i < items.length - 1 ? (
                <span key={`${dup}-dot-${i}`} className="text-blush-warm">
                  ·
                </span>
              ) : null,
            ])}
            <span className="text-blush-warm">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
