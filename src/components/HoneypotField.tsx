"use client";

/** Hidden honeypot field — bots that fill it are rejected server-side. */
export function HoneypotField() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label>
        Website
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
