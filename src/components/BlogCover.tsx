import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Footprints,
  Fence,
  Heart,
  MapPin,
  Package,
  Shovel,
  SunMedium,
  Users,
  Utensils,
} from "lucide-react";
import type { BlogCover, BlogCoverMotif, BlogCoverTone } from "@/data/blogCovers";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  BlogCoverTone,
  { panel: string; kicker: string; line: string; icon: string; shape: string }
> = {
  sage: {
    panel: "bg-wag-sage text-cream",
    kicker: "text-blush",
    line: "text-cream",
    icon: "text-blush",
    shape: "bg-cream/15",
  },
  rose: {
    panel: "bg-rose text-cream",
    kicker: "text-cream/80",
    line: "text-cream",
    icon: "text-cream",
    shape: "bg-cream/18",
  },
  cream: {
    panel: "bg-soft-cream text-serif-ink ring-1 ring-inset ring-clay/80",
    kicker: "text-label-muted",
    line: "text-serif-ink",
    icon: "text-wag-sage",
    shape: "bg-sage-100/90",
  },
  blue: {
    panel: "bg-brazos-blue text-bark",
    kicker: "text-bark/70",
    line: "text-bark",
    icon: "text-bark",
    shape: "bg-cream/35",
  },
  taupe: {
    panel: "bg-trail-taupe text-bark",
    kicker: "text-bark/70",
    line: "text-bark",
    icon: "text-bark",
    shape: "bg-cream/30",
  },
  bark: {
    panel: "bg-bark text-cream",
    kicker: "text-blush",
    line: "text-cream",
    icon: "text-soft-sage",
    shape: "bg-cream/12",
  },
  blush: {
    panel: "bg-blush text-bark",
    kicker: "text-bark/65",
    line: "text-bark",
    icon: "text-rose-deep",
    shape: "bg-cream/45",
  },
};

const motifs: Record<
  BlogCoverMotif,
  { Icon: typeof MapPin; layout: "corner" | "split" | "badge" }
> = {
  patio: { Icon: SunMedium, layout: "split" },
  check: { Icon: CheckCircle2, layout: "badge" },
  trail: { Icon: Footprints, layout: "corner" },
  puppy: { Icon: Heart, layout: "badge" },
  pack: { Icon: Package, layout: "corner" },
  brunch: { Icon: Utensils, layout: "split" },
  crowd: { Icon: Users, layout: "corner" },
  weekend: { Icon: CalendarDays, layout: "split" },
  storefront: { Icon: Building2, layout: "badge" },
  scoop: { Icon: Shovel, layout: "corner" },
  gate: { Icon: Fence, layout: "split" },
  leash: { Icon: MapPin, layout: "badge" },
};

export function BlogCover({ cover, title }: { cover: BlogCover; title: string }) {
  const tone = toneStyles[cover.tone];
  const { Icon, layout } = motifs[cover.motif];

  return (
    <div
      className={cn(
        "relative flex h-full w-full overflow-hidden px-5 py-5 sm:px-6 sm:py-6",
        tone.panel,
      )}
      role="img"
      aria-label={`${title} — ${cover.line}`}
    >
      {layout === "corner" && (
        <>
          <div
            className={cn("absolute -top-10 -right-8 h-36 w-36 rounded-full", tone.shape)}
            aria-hidden
          />
          <div
            className={cn("absolute -bottom-14 -left-10 h-40 w-40 rounded-full", tone.shape)}
            aria-hidden
          />
        </>
      )}
      {layout === "split" && (
        <>
          <div
            className={cn("absolute inset-y-0 right-0 w-[42%]", tone.shape)}
            aria-hidden
          />
          <div
            className={cn(
              "absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full",
              tone.shape,
            )}
            aria-hidden
          >
            <Icon className={cn("h-6 w-6", tone.icon)} strokeWidth={1.6} />
          </div>
        </>
      )}
      {layout === "badge" && (
        <div
          className={cn(
            "absolute top-4 right-4 flex h-14 w-14 items-center justify-center rounded-[18px]",
            tone.shape,
          )}
          aria-hidden
        >
          <Icon className={cn("h-7 w-7", tone.icon)} strokeWidth={1.6} />
        </div>
      )}

      <div className="relative z-[1] flex max-w-[78%] flex-col justify-end">
        <span
          className={cn(
            "text-[10px] font-medium tracking-[0.22em] uppercase",
            tone.kicker,
          )}
        >
          {cover.kicker}
        </span>
        <p
          className={cn(
            "mt-2 font-display text-[1.55rem] leading-tight font-semibold tracking-tight sm:text-[1.7rem]",
            tone.line,
          )}
        >
          {cover.line}
        </p>
        {layout === "corner" && (
          <Icon
            className={cn("mt-4 h-5 w-5 opacity-90", tone.icon)}
            strokeWidth={1.6}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
