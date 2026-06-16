import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Homepage path card — helps dog parents choose a next step quickly. */
export function ServicePathCard({
  step,
  title,
  description,
  href,
  ctaLabel,
  external = false,
  className,
}: {
  step: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  external?: boolean;
  className?: string;
}) {
  const linkClass =
    "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-clay/70 sm:p-8",
        className,
      )}
    >
      <p className="eyebrow">{step}</p>
      <h3 className="mt-3 font-display text-2xl">{title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-bark-soft">{description}</p>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </article>
  );
}
