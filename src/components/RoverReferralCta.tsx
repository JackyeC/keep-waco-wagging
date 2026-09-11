import { PawPrint, Star } from "lucide-react";
import { cityConfig } from "@/lib/site";

/**
 * Rover booking CTA. Expired referral discounts must not appear here.
 */
export function RoverReferralCta({
  variant = "panel",
}: {
  variant?: "panel" | "compact";
}) {
  const { profileUrl, rating, reviewCount } = cityConfig.rover;

  if (variant === "compact") {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-pill btn-sage px-7 py-3"
      >
        Book Daycare on Rover
      </a>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6">
      <div className="overflow-hidden rounded-[24px] bg-wag-sage px-6 py-10 text-cream sm:px-10 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-blush uppercase">
              <PawPrint className="h-4 w-4" aria-hidden="true" /> Book on Rover
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] font-medium text-cream">
              Reserve daycare with Jackye and Todd
            </h2>
            <p className="mt-3 max-w-xl text-[15.5px] font-light text-cream/90">
              Camp Clayton and everyday daycare are booked on Rover. That is
              where availability is confirmed — no extra clicks through a
              booking maze.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-[13px] text-cream/85">
              <Star className="h-4 w-4 fill-blush text-blush" aria-hidden="true" />
              {rating} on Rover · {reviewCount} reviews
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
            >
              Book Daycare on Rover
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
