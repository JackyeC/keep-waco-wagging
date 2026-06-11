"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { directoryCategories } from "@/data/directory";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";

export function DirectorySubmissionForm() {
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
      const res = await fetch("/api/directory-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submitterName: fd.get("submitterName"),
          submitterEmail: fd.get("submitterEmail"),
          placeName: fd.get("placeName"),
          category: fd.get("category"),
          address: fd.get("address"),
          website: fd.get("website"),
          phone: fd.get("phone"),
          neighborhood: fd.get("neighborhood"),
          dogPolicy: fd.get("dogPolicy"),
          patioDetails: fd.get("patioDetails"),
          waterBowls: fd.get("waterBowls"),
          shade: fd.get("shade"),
          bestTimeToVisit: fd.get("bestTimeToVisit"),
          notes: fd.get("notes"),
          ownerOrManager: fd.get("ownerOrManager") === "yes",
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
        <h3 className="mt-4 text-xl font-semibold">Thank you!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
          We&apos;ll review this listing before adding it to Keep Waco Wagging.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card bg-cream p-6 ring-1 ring-inset ring-clay/70 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Submitter name"><input name="submitterName" className={inputClass} disabled={loading} /></Field>
        <Field label="Submitter email"><input name="submitterEmail" type="email" className={inputClass} disabled={loading} /></Field>
        <Field label="Business/place name"><input name="placeName" required className={inputClass} disabled={loading} /></Field>
        <Field label="Category">
          <select name="category" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>Choose a category</option>
            {directoryCategories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </Field>
        <Field label="Address"><input name="address" className={inputClass} disabled={loading} /></Field>
        <Field label="Website"><input name="website" type="url" placeholder="https://" className={inputClass} disabled={loading} /></Field>
        <Field label="Phone"><input name="phone" type="tel" className={inputClass} disabled={loading} /></Field>
        <Field label="Neighborhood"><input name="neighborhood" className={inputClass} disabled={loading} /></Field>
        <Field label="Dog policy" full><textarea name="dogPolicy" rows={3} className={inputClass} disabled={loading} /></Field>
        <Field label="Patio/indoor/outdoor details" full><input name="patioDetails" className={inputClass} disabled={loading} /></Field>
        <Field label="Water bowls">
          <select name="waterBowls" className={inputClass} defaultValue="unknown" disabled={loading}>
            <option value="yes">Yes</option><option value="no">No</option><option value="unknown">Unknown</option>
          </select>
        </Field>
        <Field label="Shade">
          <select name="shade" className={inputClass} defaultValue="unknown" disabled={loading}>
            <option value="yes">Yes</option><option value="no">No</option><option value="unknown">Unknown</option>
          </select>
        </Field>
        <Field label="Best time to visit"><input name="bestTimeToVisit" className={inputClass} disabled={loading} /></Field>
        <Field label="Are you the owner/manager?">
          <select name="ownerOrManager" className={inputClass} defaultValue="no" disabled={loading}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </Field>
        <Field label="Notes" full><textarea name="notes" rows={4} className={inputClass} disabled={loading} /></Field>
      </div>
      {error && <p className="mt-4 flex items-center gap-2 text-sm text-red-600"><AlertCircle className="h-4 w-4" />{error}</p>}
      <button type="submit" disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white hover:bg-sage-700 disabled:opacity-60 sm:w-auto">
        {loading ? "Submitting..." : "Submit a Dog-Friendly Place"} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block text-sm font-medium text-bark ${full ? "sm:col-span-2" : ""}`}>
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
