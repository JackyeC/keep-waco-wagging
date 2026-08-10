"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { LeadSignupConsent } from "@/components/LeadSignupConsent";
import { cityConfig } from "@/lib/site";

const clubCopy = {
  headline: "Join the Wag Club",
  body: "Get first access to new drops, local dog-parent favorites, special events, and subscriber-only perks.",
  button: "Join Now",
  success:
    "You're in. Welcome to the Wag Club — watch your inbox for first access to drops and local perks.",
  error: "Something went wrong. Please try again or message us directly.",
  perks: ["First access to drops", "Local perks", "Members-first favorites"],
} as const;

const closerCopy = {
  headline: "Waco dog people belong here.",
  body: "Join the Wag Club for first access to drops, local favorites, and subscriber-only perks.",
} as const;

type WagClubSignupProps = {
  id?: string;
  sourcePage?: string;
  variant?: "panel" | "closer" | "hero";
};

export function WagClubSignup({
  id = "wag-club",
  sourcePage = "/",
  variant = "panel",
}: WagClubSignupProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (String(fd.get("_hp") ?? "").trim()) {
      setSubmitted(true);
      setLoading(false);
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          interests: [],
          sourcePage: sourcePage ?? fd.get("sourcePage"),
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || data.ok !== true) {
        throw new Error(data.error ?? clubCopy.error);
      }

      // Conversion measurement: one event per completed Wag Club signup.
      track("wag_list_signup", { source: variant, page: sourcePage ?? "/" });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : clubCopy.error);
    } finally {
      setLoading(false);
    }
  }

  const isCloser = variant === "closer";

  const inputClass = isCloser
    ? "flex-1 min-w-0 rounded-full border-[1.4px] border-white/40 bg-white/95 px-5 py-3.5 font-sans text-[15px] text-bark outline-none placeholder:text-label-muted focus:border-white disabled:opacity-60"
    : "flex-1 min-w-0 rounded-full border-[1.4px] border-input-border bg-cream px-5 py-3.5 font-sans text-[15px] text-bark outline-none placeholder:text-label-muted focus:border-wag-sage disabled:opacity-60";

  const form = submitted ? (
    <div
      className={`flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm ${
        isCloser ? "bg-white/15 text-cream" : "bg-sage-50 text-wag-sage"
      }`}
      role="status"
    >
      <CheckCircle2 className="h-5 w-5 shrink-0" />
      <span>{clubCopy.success}</span>
    </div>
  ) : (
    <>
      <form
        onSubmit={onSubmit}
        className={`flex flex-col gap-2.5 sm:flex-row ${
          isCloser ? "mx-auto max-w-md" : "w-full max-w-md"
        }`}
      >
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          aria-hidden
        >
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="sr-only" htmlFor={`${id}-email`}>
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          disabled={loading}
          autoComplete="email"
          placeholder="you@email.com"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={loading}
          className={
            isCloser
              ? "btn-pill shrink-0 bg-cream px-8 py-3.5 text-wag-sage hover:bg-blush hover:text-bark"
              : "btn-pill btn-sage shrink-0 px-8 py-3.5"
          }
        >
          {loading ? "…" : clubCopy.button}
        </button>
      </form>

      <div className={isCloser ? "mx-auto mt-4 max-w-md" : "mt-4 max-w-md"}>
        <div className={isCloser ? "[&_a]:text-cream [&_p]:text-cream/80" : ""}>
          <LeadSignupConsent />
        </div>
      </div>

      {error && (
        <p
          className={`mt-3 flex items-center gap-2 text-sm ${
            isCloser ? "text-cream" : "text-red-600"
          }`}
          role="alert"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}{" "}
          <a
            href={`mailto:${cityConfig.sponsor.email}`}
            className="underline underline-offset-2"
          >
            Message us directly
          </a>
        </p>
      )}
    </>
  );

  if (variant === "hero") {
    return (
      <div id={id} className="mt-8 max-w-md">
        <p className="text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
          Join the Wag Club — free
        </p>
        <div className="mt-3">{form}</div>
      </div>
    );
  }

  if (isCloser) {
    return (
      <section id={id} className="mx-auto mt-20 max-w-[1200px] scroll-mt-24 px-6">
        <div className="overflow-hidden rounded-[30px] bg-wag-sage px-6 py-14 text-center text-cream md:px-12 md:py-16">
          <p className="text-xs font-medium tracking-[0.24em] text-blush uppercase">
            The Wag Club
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-medium text-cream">
            {closerCopy.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] font-light opacity-90">
            {closerCopy.body}
          </p>
          <div className="mt-8">{form}</div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="mx-auto mt-16 max-w-[1200px] scroll-mt-24 px-6">
      <div className="card-panel grid items-center gap-8 p-8 md:grid-cols-[1fr_1fr] md:p-12">
        <div>
          <p className="eyebrow tracking-[0.24em]">Members first</p>
          <h2 className="heading mt-3 text-[clamp(2rem,3.6vw,2.75rem)]">
            {clubCopy.headline}
          </h2>
          <p className="dek mt-4 max-w-md">{clubCopy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {clubCopy.perks.map((perk) => (
              <li
                key={perk}
                className="rounded-full border border-border bg-cream px-3.5 py-1.5 text-[11px] font-medium tracking-[0.12em] text-body-muted uppercase"
              >
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:pl-4">{form}</div>
      </div>
    </section>
  );
}
