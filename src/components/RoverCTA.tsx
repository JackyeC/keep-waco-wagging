import { Dog, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cityConfig, ctas } from "@/lib/site";

export function RoverCTA({ variant = "card" }: { variant?: "card" | "inline" }) {
  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-bark">{cityConfig.rover.headline}</p>
          <p className="mt-1 text-sm text-bark-soft">
            Book trusted sitting, daycare, drop-ins, and walking with Jackye and Todd on Rover.
          </p>
        </div>
        <Button
          href={ctas.bookRover.href}
          variant="secondary"
          className="shrink-0"
        >
          {ctas.bookRover.label}
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-card bg-gradient-to-br from-sky-50 to-sage-50 p-6 ring-1 ring-inset ring-sky-200 sm:p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white">
        <Dog className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-xl font-semibold">Need a sitter or walker?</h3>
      <p className="mt-2 text-sm leading-relaxed text-bark-soft">
        Jackye and Todd offer dog sitting, daycare, drop-ins, and walking on Rover across{" "}
        {cityConfig.serviceAreas.slice(0, 3).join(", ")}, and nearby areas. Great
        for travel days, long work shifts, or extra exercise for high-energy pups.
      </p>
      <Button href={ctas.bookRover.href} className="mt-5" variant="secondary">
        {ctas.bookRover.label}
        <ExternalLink className="h-4 w-4" />
      </Button>
    </article>
  );
}
