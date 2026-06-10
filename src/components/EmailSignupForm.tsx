"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";

const interests = [
  "Dog-friendly places",
  "Platinum Scoops",
  "Pet care",
  "Product recommendations",
  "Local dog events",
  "Sponsorship",
];

export function EmailSignupForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          email: fd.get("email"),
          dogName: fd.get("dogName"),
          neighborhood: fd.get("neighborhood"),
          interests: fd.getAll("interests"),
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card bg-sage-50 p-6 text-center ring-1 ring-inset ring-sage-200">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sage-600" />
        <p className="mt-3 font-semibold text-bark">You&apos;re on the list!</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
          We&apos;ll send you the best local dog-friendly finds, pet care updates,
          and Waco dog parent tips.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70 sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-bark">
          First name
          <input name="firstName" disabled={loading} className={`${inputClass} mt-1.5`} />
        </label>
        <label className="text-sm font-medium text-bark">
          Email
          <input
            name="email"
            type="email"
            required
            disabled={loading}
            className={`${inputClass} mt-1.5`}
          />
        </label>
        {!compact && (
          <>
            <label className="text-sm font-medium text-bark">
              Dog name <span className="text-bark-faint">(optional)</span>
              <input name="dogName" disabled={loading} className={`${inputClass} mt-1.5`} />
            </label>
            <label className="text-sm font-medium text-bark">
              Neighborhood <span className="text-bark-faint">(optional)</span>
              <input name="neighborhood" disabled={loading} className={`${inputClass} mt-1.5`} />
            </label>
          </>
        )}
      </div>

      {!compact && (
        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-bark">What should we send you?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {interests.map((interest) => (
              <label key={interest} className="flex items-center gap-2 text-sm text-bark-soft">
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  className="h-4 w-4 rounded border-clay text-sage-600"
                />
                {interest}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-700 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Joining..." : "Join the Waco Dog Parent List"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
