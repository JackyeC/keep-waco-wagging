"use client";

import { useEffect, useState } from "react";
import { Podcast, X } from "lucide-react";
import { podcast } from "@/lib/site";

const DISMISS_KEY = "kww-podcast-bar-dismissed-v1";

/**
 * Slim, dismissible site-wide announcement bar for the podcast.
 * Dismissal is remembered in localStorage (bump the key to re-show it).
 */
export function PodcastBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!podcast.enabled) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!podcast.enabled || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative bg-sage-800 text-sage-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 px-10 py-2 sm:px-6">
        <p className="flex items-center gap-2 text-center text-sm">
          <Podcast className="hidden h-4 w-4 shrink-0 text-gold-400 sm:inline" aria-hidden="true" />
          <span className="font-medium">{podcast.barText}</span>
          <a
            href={podcast.subscribeUrl}
            target={podcast.subscribeUrl.startsWith("http") ? "_blank" : undefined}
            rel={podcast.subscribeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex shrink-0 items-center rounded-full bg-gold-400 px-3 py-0.5 text-xs font-semibold text-bark transition-colors hover:bg-gold-500"
          >
            Subscribe
          </a>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss podcast announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-sage-200 transition-colors hover:bg-sage-700 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
