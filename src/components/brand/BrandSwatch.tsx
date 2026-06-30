"use client";

import { useState } from "react";

export function BrandSwatch({
  name,
  hex,
  role,
  token,
  large,
  border,
}: {
  name: string;
  hex: string;
  role: string;
  token?: string;
  large?: boolean;
  border?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copyHex() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={copyHex}
      className={`w-full overflow-hidden rounded-[18px] border border-border bg-soft-cream text-left transition-colors hover:border-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage ${large ? "" : "rounded-[14px]"}`}
      aria-label={`Copy ${name} ${hex}`}
    >
      <div
        className={large ? "h-32" : "h-16"}
        style={{
          backgroundColor: hex,
          borderBottom: border ? "1px solid var(--color-border)" : undefined,
        }}
      />
      <div className={`${large ? "px-[18px] py-4" : "px-3 py-2.5"}`}>
        <p className="font-display text-[20px] font-semibold text-serif-ink">
          {name}
        </p>
        <p className="mt-0.5 text-[13px] text-body-muted-light">
          {hex}
          {token && (
            <span className="block text-[11px] text-label-muted">{token}</span>
          )}
        </p>
        <p className="mt-1 text-xs font-light text-label-muted">{role}</p>
        {copied && (
          <p className="mt-1 text-[11px] font-medium text-wag-sage">Copied!</p>
        )}
      </div>
    </button>
  );
}
