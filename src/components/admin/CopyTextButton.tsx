"use client";

import { useState } from "react";

export function CopyTextButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn-pill btn-sage px-3 py-1.5 text-[10px]"
    >
      {done ? "Copied" : label}
    </button>
  );
}
