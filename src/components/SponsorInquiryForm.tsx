"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { sponsorTypes } from "@/data/sponsors";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";

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
          notes: fd.get("notes"),
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
      <div className="rounded-card bg-sage-50 p-8 text-center ring-1 ring-inset ring-sage-200">
        <CheckCircle2 className="mx-auto h-12 w-12 text-sage-600" />
        <h3 className="mt-4 text-xl font-semibold">Thanks!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
          We&apos;ll follow up with sponsor options for local Waco dog-friendly businesses.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card bg-cream p-6 ring-1 ring-inset ring-clay/70 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name"><input name="businessName" required disabled={loading} className={inputClass} /></Field>
        <Field label="Contact name"><input name="contactName" disabled={loading} className={inputClass} /></Field>
        <Field label="Email"><input name="email" type="email" required disabled={loading} className={inputClass} /></Field>
        <Field label="Phone"><input name="phone" type="tel" disabled={loading} className={inputClass} /></Field>
        <Field label="Website"><input name="website" type="url" placeholder="https://" disabled={loading} className={inputClass} /></Field>
        <Field label="Sponsor type">
          <select name="sponsorType" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>Choose an option</option>
            {sponsorTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </Field>
        <Field label="Notes" full><textarea name="notes" rows={4} disabled={loading} className={inputClass} /></Field>
      </div>
      {error && <p className="mt-4 flex items-center gap-2 text-sm text-red-600"><AlertCircle className="h-4 w-4" />{error}</p>}
      <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white hover:bg-sage-700 disabled:opacity-60 sm:w-auto">
        {loading ? "Submitting..." : "Become a Local Sponsor"} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <label className={`block text-sm font-medium text-bark ${full ? "sm:col-span-2" : ""}`}>{label}<div className="mt-1.5">{children}</div></label>;
}
