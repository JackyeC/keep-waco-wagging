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
    <div className="bg-wag-sage px-4 py-2.5 text-center text-cream">
      <p
        key={index}
        className="animate-[kwwFade_0.5s_ease] text-[12.5px] font-normal tracking-[0.16em] uppercase"
        aria-live="polite"
      >
        {messages[index]}
        {announcementBar.showHeart && (
          <>
            {" "}
            <span className="text-blush-warm" aria-hidden="true">
              ♥
            </span>
          </>
        )}
      </p>
    </div>
  );
}
