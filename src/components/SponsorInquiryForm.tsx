"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { HoneypotField } from "@/components/HoneypotField";
import { partnershipInterestTypes } from "@/data/partnerships";

const inputClass =
  "w-full rounded-xl border border-input-border bg-cream px-3.5 py-2.5 text-sm text-bark outline-none placeholder:text-label-muted focus:border-wag-sage disabled:opacity-60";

export function SponsorInquiryForm() {
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
      const res = await fetch("/api/sponsor-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: fd.get("businessName"),
          contactName: fd.get("contactName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          website: fd.get("website"),
          sponsorType: fd.get("sponsorType"),
          proposedPerk: fd.get("proposedPerk"),
          notes: fd.get("notes"),
          _hp: fd.get("_hp"),
        }),
      });
      const data = (await res.json()) as { error?: string; ok?: boolean };
      if (!res.ok || data.ok !== true) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      track("partnership_inquiry", { page: "/sponsors" });
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
        className="rounded-[20px] bg-sage-50 p-8 text-center ring-1 ring-sage-200"
        role="status"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-wag-sage" />
        <h3 className="mt-4 font-display text-2xl text-serif-ink">
          Inquiry received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-body-muted">
          Thanks. We have your partnership inquiry and will follow up if it is
          a fit. This does not reserve a sponsorship, confirm a member perk, or
          purchase a Keep Waco Wagging Approved recommendation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[20px] border border-border bg-soft-cream p-6 sm:p-8"
    >
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Contact name" required>
          <input
            name="contactName"
            required
            autoComplete="name"
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Business name" required>
          <input
            name="businessName"
            required
            autoComplete="organization"
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Phone" hint="Optional">
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Website" hint="Optional">
          <input
            name="website"
            type="url"
            placeholder="https://"
            autoComplete="url"
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Type of interest" required>
          <select
            name="sponsorType"
            required
            className={inputClass}
            defaultValue=""
            disabled={loading}
          >
            <option value="" disabled>
              Choose an option
            </option>
            {partnershipInterestTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Proposed member perk or sponsorship interest" required full>
          <textarea
            name="proposedPerk"
            required
            rows={3}
            disabled={loading}
            className={inputClass}
            placeholder="The offer you would give members, or the events you want to support."
          />
        </Field>
        <Field label="Additional details" hint="Optional" full>
          <textarea name="notes" rows={4} disabled={loading} className={inputClass} />
        </Field>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-label-muted">
        Submitting asks for a conversation. It does not start a paid sponsorship
        or a member perk. Sponsored mentions are labeled, and editorial approval
        is not for sale.
      </p>
      {error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-700" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-pill btn-sage mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
      >
        {loading ? "Submitting…" : "Send partnership inquiry"}
        <Send className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
  full,
  required,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  full?: boolean;
  required?: boolean;
}) {
  return (
    <label className={`block text-sm font-medium text-bark ${full ? "sm:col-span-2" : ""}`}>
      <span>
        {label}
        {required ? <span className="text-rose-deep"> *</span> : null}
        {hint ? (
          <span className="ml-2 font-normal text-label-muted">{hint}</span>
        ) : null}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
