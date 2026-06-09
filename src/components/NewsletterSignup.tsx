"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Where to Wag This Weekend" newsletter signup.
 */
export function NewsletterSignup({
  variant = "card",
  className,
}: {
  variant?: "card" | "inline";
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const dark = variant === "card";

  return (
    <div
      className={cn(
        variant === "card" &&
          "rounded-card bg-sage-700 p-6 text-white sm:p-8",
        className,
      )}
    >
      <p
        className={cn(
          "text-sm font-semibold uppercase tracking-wide",
          dark ? "text-sage-200" : "text-sage-600",
        )}
      >
        Where to Wag This Weekend
      </p>
      <h3
        className={cn(
          "mt-1 text-xl sm:text-2xl",
          dark ? "text-white" : "text-bark",
        )}
      >
        Dog-friendly Waco, in your inbox.
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          dark ? "text-sage-100" : "text-bark-soft",
        )}
      >
        Get dog-friendly Waco ideas, local events, training tips, yard reminders,
        and pet-parent finds in your inbox. Presented by Platinum Scoops.
      </p>

      {submitted ? (
        <div
          className={cn(
            "mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium",
            dark ? "bg-sage-600 text-white" : "bg-sage-100 text-sage-700",
          )}
        >
          <CheckCircle2 className="h-5 w-5" />
          You&apos;re on the list! Watch your inbox this weekend.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <label htmlFor={`nl-${variant}`} className="sr-only">
            Email address
          </label>
          <input
            id={`nl-${variant}`}
            type="email"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-full border-0 px-4 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60",
              dark
                ? "bg-white text-sage-700 hover:bg-sage-50"
                : "bg-sage-600 text-white hover:bg-sage-700",
            )}
          >
            {loading ? "Joining…" : "Join the List"}
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}

      {error && (
        <p
          className={cn(
            "mt-3 flex items-center gap-2 text-sm",
            dark ? "text-red-200" : "text-red-600",
          )}
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
