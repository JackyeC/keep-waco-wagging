"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { signupCopy } from "@/lib/signup";
import { cityConfig } from "@/lib/site";

const inputClass =
  "flex-1 min-w-0 rounded-full border-[1.4px] border-input-border bg-cream px-5 py-3.5 font-sans text-[14.5px] font-normal text-bark outline-none placeholder:text-label-muted focus:border-wag-sage disabled:opacity-60";

type HomeNewsletterProps = {
  sourcePage?: string;
};

export function HomeNewsletter({ sourcePage = "/" }: HomeNewsletterProps) {
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
        throw new Error(data.error ?? signupCopy.error);
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : signupCopy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="card-panel flex flex-wrap items-center justify-between gap-6 p-8 md:p-10">
        <div>
          <h3 className="font-display text-[30px] font-semibold text-serif-ink">
            Get Keep Waco Wagging updates
          </h3>
          <p className="mt-2 text-[14.5px] font-light text-body-muted-light">
            Dog-camp openings, Waco pet events, and helpful notes for local dog
            families. No spam.
          </p>
        </div>

        {submitted ? (
          <div className="flex min-w-[290px] flex-1 items-center gap-3 text-sm text-wag-sage">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            {signupCopy.success}
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex min-w-[290px] flex-1 max-w-[450px] gap-2.5"
          >
            <input type="hidden" name="sourcePage" value={sourcePage} />
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
            </div>
            <input
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
              className="btn-pill btn-sage shrink-0 px-6 py-3.5"
            >
              {loading ? "…" : "Sign up"}
            </button>
          </form>
        )}

        {error && (
          <p className="flex w-full items-center gap-2 text-sm text-red-600">
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
      </div>
    </section>
  );
}
