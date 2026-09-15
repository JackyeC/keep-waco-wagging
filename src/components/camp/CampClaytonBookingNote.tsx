import { campClayton } from "@/data/summerDaycare";
import { cn } from "@/lib/utils";

export function CampClaytonBookingNote({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("rounded-[18px] border border-border bg-soft-cream px-5 py-4", className)}>
      <p className="font-display text-[1.15rem] font-semibold text-serif-ink">
        {campClayton.bookingRateLine}
      </p>
      <p className="body-light mt-1 text-[14.5px]">{campClayton.bookingNote}</p>
    </div>
  );
}
