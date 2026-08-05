"use client";

import { useEffect, useState } from "react";
import { announcementBar } from "@/lib/site";

const ROTATE_MS = 4500;

export function AnnouncementBar() {
  const messages = announcementBar.messages.filter((m) => m.trim());
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
    <div className="border-b border-border/80 bg-soft-cream px-4 py-2 text-center">
      <p
        key={index}
        className="animate-[kwwFade_0.5s_ease] text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase"
        aria-live="polite"
      >
        {messages[index]}
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
