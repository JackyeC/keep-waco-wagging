"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

/** Conversion events for the /wagclub landing page (Vercel Analytics). */
export type WagClubEvent =
  | "wagclub_book_daycare_click"
  | "wagclub_shop_click"
  | "wagclub_join_click"
  | "wagclub_weekend_click"
  | "wagclub_secondary_service_click";

type WagClubLinkProps = {
  href: string;
  event: WagClubEvent;
  /** Optional low-cardinality label, e.g. the secondary service name. No PII. */
  eventLabel?: string;
  className?: string;
  children: React.ReactNode;
  /** Explicit accessible name when children are not descriptive on their own. */
  ariaLabel?: string;
};

function isExternal(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

/**
 * Link/button that records one conversion event before navigating. Renders a
 * plain anchor for external URLs and same-page hash targets, and a Next.js
 * Link for internal routes so client navigation stays fast.
 */
export function WagClubLink({
  href,
  event,
  eventLabel,
  className,
  children,
  ariaLabel,
}: WagClubLinkProps) {
  function fire() {
    track(event, eventLabel ? { label: eventLabel.slice(0, 40) } : {});
  }

  if (isExternal(href) || href.startsWith("#")) {
    const external = isExternal(href);
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        onClick={fire}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={fire}>
      {children}
    </Link>
  );
}
