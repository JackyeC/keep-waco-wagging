"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { SocialLinksBlock } from "@/components/SocialLinksBlock";
import { signupCopy, signupInterests } from "@/lib/signup";
import { cityConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";

type EmailSignupFormProps = {
  /** full = all fields; compact = email only (footer) */
  compact?: boolean;
  /** Page path or label for owner notification emails */
  sourcePage?: string;
  /** Show social links below success state */
  showSocialOnSuccess?: boolean;
};

export function EmailSignupForm({
  compact = false,
  sourcePage,
  showSocialOnSuccess = true,
}: EmailSignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWarning(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — bots that fill this field get a silent success.
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
          firstName: fd.get("firstName"),
          email: fd.get("email"),
          dogName: fd.get("dogName"),
          zipCode: fd.get("zipCode"),
          interests: compact ? [] : fd.getAll("interests"),
          sourcePage: sourcePage ?? fd.get("sourcePage"),
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        warning?: string;
      };

      if (!res.ok || data.ok !== true) {
        throw new Error(data.error ?? signupCopy.error);
      }

      setSubmitted(true);
      if (data.warning) {
        setWarning(data.warning);
      }
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : signupCopy.error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card bg-sage-50 p-6 ring-1 ring-inset ring-sage-200">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-sage-600" />
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-bark">
            {signupCopy.success}
          </p>
          {showSocialOnSuccess && (
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-bark-soft">
              {signupCopy.successSocial}
            </p>
          )}
          {warning && (
            <p className="mx-auto mt-3 max-w-md text-xs text-bark-faint">{warning}</p>
          )}
        </div>
        {showSocialOnSuccess && (
          <SocialLinksBlock className="mt-6 border-t border-sage-200 pt-5" size="sm" />
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70 sm:p-6"
    >
      {sourcePage && (
        <input type="hidden" name="sourcePage" value={sourcePage} />
      )}

      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {!compact && (
          <label className="text-sm font-medium text-bark">
            First name <span className="text-bark-faint">(optional)</span>
            <input name="firstName" disabled={loading} className={`${inputClass} mt-1.5`} />
          </label>
        )}
        <label className={compact ? "text-sm font-medium text-bark sm:col-span-2" : "text-sm font-medium text-bark"}>
          Email
          <input
            name="email"
            type="email"
            required
            disabled={loading}
            autoComplete="email"
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
              Zip code <span className="text-bark-faint">(optional)</span>
              <input
                name="zipCode"
                inputMode="numeric"
                pattern="[0-9]{5}(-[0-9]{4})?"
                maxLength={10}
                disabled={loading}
                placeholder="76701"
                className={`${inputClass} mt-1.5`}
              />
            </label>
          </>
        )}
      </div>

      {!compact && (
        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-bark">
            What updates interest you?
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {signupInterests.map((interest) => (
              <label key={interest} className="flex items-start gap-2 text-sm text-bark-soft">
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-clay text-sage-600"
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
          {" "}
          <a
            href={`mailto:${cityConfig.sponsor.email}`}
            className="underline underline-offset-2"
          >
            Message us directly
          </a>
        </p>
      )}

      <div className="mt-5 space-y-3">
        <p className="text-xs leading-relaxed text-bark-faint">
          {signupCopy.privacyNote}
        </p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-sm bg-bark px-5 py-2.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-bark-soft disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Signing up…" : signupCopy.button}
        </button>
      </div>
    </form>
  );
}
