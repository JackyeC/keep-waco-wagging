import Link from "next/link";
import Image from "next/image";
import {
  urgencyConfig,
  type WagWatchItem,
  type WagWatchUrgency,
} from "@/data/wagWatch";
import { cn } from "@/lib/utils";

const urgencyStyles: Record<WagWatchUrgency, string> = {
  FYI: "bg-sky-100 text-sky-700",
  "Good to Know": "bg-sage-100 text-sage-700",
  "Act Soon": "bg-gold-100 text-gold-600",
  "Important Alert": "bg-rose text-cream",
};

export function UrgencyBadge({ urgency }: { urgency: WagWatchUrgency }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-[0.06em] uppercase",
        urgencyStyles[urgency],
      )}
    >
      {urgencyConfig[urgency].label}
    </span>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function WagWatchCard({ item }: { item: WagWatchItem }) {
  const href = `/wag-watch/${item.slug}`;
  return (
    <article className="card-panel flex flex-col overflow-hidden">
      {item.image && (
        <Link href={href} className="relative block aspect-[16/9] overflow-hidden bg-sage-50">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            {item.category}
          </span>
          <UrgencyBadge urgency={item.urgency} />
        </div>
        <h3 className="mt-2 font-display text-[1.4rem] leading-snug font-medium text-serif-ink">
          <Link href={href} className="hover:text-wag-sage">
            {item.headline}
          </Link>
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-body-muted">
          {item.shortSummary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <time className="text-[12px] text-label-muted" dateTime={item.publishedDate}>
            {formatDate(item.publishedDate)}
          </time>
          <Link
            href={href}
            className="text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:text-wag-sage"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
