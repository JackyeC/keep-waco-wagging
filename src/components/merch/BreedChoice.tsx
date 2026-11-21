import type { ReactNode } from "react";
import Link from "next/link";

export function BreedChoice({
  href,
  label,
  detail,
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-full min-h-[4.5rem] flex-col items-center justify-center rounded-[16px] border border-border bg-soft-cream px-3 py-3 text-center transition-colors hover:border-wag-sage"
    >
      <span className="font-display text-[1.05rem] leading-tight font-medium text-serif-ink">
        {label}
      </span>
      <span className="mt-1 text-[12px] font-light text-label-muted">{detail}</span>
    </Link>
  );
}

/** Equal tiles. A short last row stays centered instead of hanging on the left. */
export function BreedChoiceGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ul className="mt-8 flex flex-wrap justify-center gap-3">{children}</ul>
  );
}

export function BreedChoiceItem({ children }: { children: ReactNode }) {
  return (
    <li className="w-[calc(50%-0.375rem)] sm:w-[calc(25%-0.75rem)]">{children}</li>
  );
}
