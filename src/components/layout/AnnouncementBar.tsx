"use client";

import { useEffect, useState } from "react";
import { announcementBar, blackFridayPromo } from "@/lib/site";
import { useBlackFridayPhase } from "@/lib/useBlackFridayPhase";

const ROTATE_MS = 4500;

export function AnnouncementBar() {
  const phase = useBlackFridayPhase();

  const base = announcementBar.messages.filter((m) => m.trim());
  const promoOn = phase === "live" || phase === "teaser";
  const messages = promoOn ? [blackFridayPromo.bannerMessage] : base;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [messages.length]);

  if (!announcementBar.enabled || messages.length === 0) {
    return null;
  }

  return (
    <div
      className={
        promoOn
          ? "site-announcement border-b border-border/80 bg-sage-ink px-4 py-2.5 text-center"
          : "site-announcement border-b border-border/80 bg-soft-cream px-4 py-2 text-center"
      }
    >
      <p
        key={`${phase}-${index}`}
        className={
          promoOn
            ? "animate-[kwwFade_0.5s_ease] text-[13px] font-medium leading-relaxed text-white"
            : "animate-[kwwFade_0.5s_ease] text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase"
        }
        aria-live="polite"
      >
        {promoOn ? (
          <a href={blackFridayPromo.href} className="underline-offset-4 hover:underline">
            {blackFridayPromo.bannerMessage}
          </a>
        ) : (
          messages[index % messages.length]
        )}
        {announcementBar.showHeart && (
          <>
            {" "}
            <span className="text-rose" aria-hidden="true">
              ♥
            </span>
          </>
        )}
      </p>
    </div>
  );
}
