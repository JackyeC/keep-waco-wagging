"use client";

import { useSyncExternalStore } from "react";
import {
  isPawsgivingNoteVisible,
  pawsgivingNoteHidesAtUtc,
  pawsgivingWeek,
} from "@/data/pawsgivingWeek";

const MAX_DELAY_MS = 2 ** 31 - 1;

function subscribe(onChange: () => void): () => void {
  let timer: number | undefined;

  const arm = () => {
    const delay = pawsgivingNoteHidesAtUtc() - Date.now();
    if (delay <= 0) return;
    timer = window.setTimeout(() => {
      onChange();
      arm();
    }, Math.min(delay, MAX_DELAY_MS));
  };

  const onVisible = () => {
    if (document.visibilityState === "visible") onChange();
  };

  arm();
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

function usePawsgivingNoteVisible(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isPawsgivingNoteVisible(),
    () => false,
  );
}

function BookLink() {
  return (
    <a
      href={pawsgivingWeek.bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pill btn-sage inline-flex shrink-0 px-6 py-3"
    >
      {pawsgivingWeek.ctaLabel}
    </a>
  );
}

/**
 * Temporary Pawsgiving Week note. Hidden after November 27, 2026
 * (America/Chicago). Set `pawsgivingWeek.enabled` to false to remove it.
 */
export function PawsgivingWeekNote({
  variant,
}: {
  variant: "banner" | "section";
}) {
  const visible = usePawsgivingNoteVisible();
  if (!visible) return null;

  if (variant === "banner") {
    return (
      <aside className="border-b border-border bg-sage-50">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-medium tracking-[0.16em] text-wag-sage uppercase">
              {pawsgivingWeek.eyebrow}
            </p>
            <p className="mt-1 font-display text-[1.35rem] leading-snug font-medium text-serif-ink">
              {pawsgivingWeek.title}
            </p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-body-muted">
              {pawsgivingWeek.summary} {pawsgivingWeek.bookingLine}
            </p>
          </div>
          <BookLink />
        </div>
      </aside>
    );
  }

  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="rounded-[24px] border border-wag-sage/30 bg-sage-50 px-6 py-7 sm:px-8">
        <p className="eyebrow tracking-[0.22em]">{pawsgivingWeek.eyebrow}</p>
        <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.4rem)]">
          {pawsgivingWeek.title}
        </h2>
        <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-bark-soft">
          {pawsgivingWeek.summary}
        </p>
        <p className="mt-3 max-w-3xl font-display text-[1.35rem] leading-snug font-medium text-serif-ink">
          {pawsgivingWeek.thanksgivingLine}
        </p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-body-muted">
          {pawsgivingWeek.bookingLine}
        </p>
        <div className="mt-5">
          <BookLink />
        </div>
      </div>
    </section>
  );
}
