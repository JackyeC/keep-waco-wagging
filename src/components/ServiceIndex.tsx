import Link from "next/link";
import { cn } from "@/lib/utils";

export type ServiceIndexItem = {
  department: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  external?: boolean;
};

/** Compact service index — magazine table-of-contents, not equal app tiles. */
export function ServiceIndex({
  items,
  className,
}: {
  items: ServiceIndexItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Service index" className={cn("divide-y divide-clay border-y border-clay", className)}>
      {items.map((item) => (
        <ServiceIndexRow key={item.department} {...item} />
      ))}
    </nav>
  );
}

function ServiceIndexRow({
  department,
  title,
  description,
  href,
  ctaLabel,
  external,
}: ServiceIndexItem) {
  const linkClass = "editorial-link shrink-0";

  return (
    <article className="grid gap-4 py-6 sm:grid-cols-[7rem_1fr_auto] sm:items-start sm:gap-8 sm:py-7">
      <p className="eyebrow eyebrow-brass">{department}</p>
      <div className="min-w-0">
        <h3 className="headline-tertiary">{title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-bark-soft">
          {description}
        </p>
      </div>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {ctaLabel}
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}
