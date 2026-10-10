"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { HoneypotField } from "@/components/HoneypotField";
import { LeadSignupConsent } from "@/components/LeadSignupConsent";
import {
  FOUNDING_MEMBERSHIP_INTEREST,
  LEAD_SOURCE_FOUNDING,
  shirtSizeInterest,
  shirtSizes,
} from "@/lib/signup";
import { cityConfig } from "@/lib/site";

const inputClass =
  "w-full rounded-full border-[1.4px] border-input-border bg-cream px-5 py-3 text-[15px] text-bark outline-none placeholder:text-label-muted focus:border-wag-sage disabled:opacity-60";

export function FoundingInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const size = String(fd.get("shirtSize") ?? "");
    const sizeInterest = shirtSizeInterest(size);

    if (!sizeInterest) {
      setError("Choose a shirt size, or “Not sure yet.”");
      setLoading(false);
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
          interests: [FOUNDING_MEMBERSHIP_INTEREST, sizeInterest],
          source: LEAD_SOURCE_FOUNDING,
          sourcePage: "/wagclub#founding",
          _hp: fd.get("_hp"),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || data.ok !== true) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      track("wag_club_founding_interest", { page: "/wagclub" });
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
      <div
        className="rounded-[20px] bg-sage-50 px-5 py-6 text-sm leading-relaxed text-sage-ink"
        role="status"
      >
        <p className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wag-sage" />
          <span>
            You&rsquo;re on the founding membership interest list. This does not
            charge you, and it does not turn a free update signup into a paid
            membership. We&rsquo;ll be in touch after pricing and fulfillment are
            confirmed.
          </span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-3">
      <HoneypotField />
      <label className="sr-only" htmlFor="founding-name">
        First name
      </label>
      <input
        id="founding-name"
        name="firstName"
        required
        autoComplete="given-name"
        disabled={loading}
        placeholder="First name"
        className={inputClass}
      />
      <label className="sr-only" htmlFor="founding-email">
        Email address
      </label>
      <input
        id="founding-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        disabled={loading}
        placeholder="Email"
        className={inputClass}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="founding-dog">
            Dog&rsquo;s name, optional
          </label>
          <input
            id="founding-dog"
            name="dogName"
            autoComplete="off"
            disabled={loading}
            placeholder="Dog's name (optional)"
            className={inputClass}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="founding-zip">
            ZIP code, optional
          </label>
          <input
            id="founding-zip"
            name="zipCode"
            inputMode="numeric"
            autoComplete="postal-code"
            disabled={loading}
            placeholder="ZIP (optional)"
            className={inputClass}
          />
        </div>
      </div>
      <label className="text-sm text-bark" htmlFor="founding-size">
        Shirt size for the founding household
        <select
          id="founding-size"
          name="shirtSize"
          required
          defaultValue=""
          disabled={loading}
          className={`${inputClass} mt-1.5`}
        >
          <option value="" disabled>
            Choose a size
          </option>
          {shirtSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading} className="btn-pill btn-sage px-8 py-3.5">
        {loading ? "Sending…" : "Join the interest list"}
      </button>
      <LeadSignupConsent />
      <p className="text-xs leading-relaxed text-label-muted">
        One interest per household. Shirt size is saved with this request so a
        later kit can be packed. Membership purchase, welcome-kit fulfillment,
        and a fulfillment date are not recorded until those steps are approved.
      </p>
      {error && (
        <p className="flex items-center gap-2 text-sm text-red-700" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}{" "}
          <a
            href={`mailto:${cityConfig.publicEmail}`}
            className="underline underline-offset-2"
          >
            Email us
          </a>
        </p>
      )}
    </form>
  );
}
