"use client";

import { useState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { directoryCategories } from "@/data/categories";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";
const labelClass = "block text-sm font-medium text-bark";

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className={labelClass}>{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/** Get Listed form for Waco businesses. */
export function GetListedForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/get-listed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: fd.get("businessName"),
          contactName: fd.get("contactName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          website: fd.get("website"),
          social: fd.get("social"),
          category: fd.get("category"),
          address: fd.get("address"),
          dogsAllowed: fd.get("dogsAllowed"),
          dogAreas: fd.get("dogAreas"),
          dogRules: fd.get("dogRules"),
          waterBowls: fd.get("waterBowls"),
          shade: fd.get("shade"),
          bestTime: fd.get("bestTime"),
          sponsor: fd.get("sponsor"),
          notes: fd.get("notes"),
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-card bg-sage-50 p-8 text-center ring-1 ring-inset ring-sage-200">
        <CheckCircle2 className="mx-auto h-12 w-12 text-sage-600" />
        <h3 className="mt-4 text-xl font-semibold">Thanks — we got it!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
          We&apos;ll review your business and reach out about getting you listed
          on Keep Waco Wagging. Welcome to the pack.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card bg-cream p-6 ring-1 ring-inset ring-clay/70 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name">
          <input name="businessName" required disabled={loading} className={inputClass} />
        </Field>
        <Field label="Contact name">
          <input name="contactName" required disabled={loading} className={inputClass} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required disabled={loading} className={inputClass} />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" disabled={loading} className={inputClass} />
        </Field>
        <Field label="Website">
          <input
            name="website"
            type="url"
            placeholder="https://"
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Social links">
          <input
            name="social"
            placeholder="Instagram, Facebook, etc."
            disabled={loading}
            className={inputClass}
          />
        </Field>
        <Field label="Business category">
          <select name="category" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>
              Choose a category
            </option>
            {directoryCategories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="Address">
          <input name="address" disabled={loading} className={inputClass} />
        </Field>

        <Field label="Are dogs allowed?">
          <select name="dogsAllowed" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>
              Select
            </option>
            <option>Yes, dogs welcome</option>
            <option>Service animals only</option>
            <option>Not currently — but interested</option>
          </select>
        </Field>
        <Field label="Indoor, patio, or outdoor only?">
          <select name="dogAreas" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>
              Select
            </option>
            <option>Indoor &amp; patio</option>
            <option>Patio only</option>
            <option>Outdoor only</option>
            <option>Indoor only</option>
          </select>
        </Field>

        <Field label="Any dog rules?" full>
          <input
            name="dogRules"
            placeholder="e.g. leashed at all times, no dogs on furniture"
            disabled={loading}
            className={inputClass}
          />
        </Field>

        <Field label="Do you provide water bowls?">
          <select name="waterBowls" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>
              Select
            </option>
            <option>Yes</option>
            <option>No</option>
            <option>On request</option>
          </select>
        </Field>
        <Field label="Do you have shade?">
          <select name="shade" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>
              Select
            </option>
            <option>Yes</option>
            <option>Some</option>
            <option>No</option>
          </select>
        </Field>

        <Field label="Best time for dog parents to visit?" full>
          <input
            name="bestTime"
            placeholder="e.g. weekday mornings, before 5pm"
            disabled={loading}
            className={inputClass}
          />
        </Field>

        <Field label="Would you like to sponsor a feature?" full>
          <select name="sponsor" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>
              Select an option
            </option>
            <option>Free basic listing</option>
            <option>Featured listing</option>
            <option>Sponsored business spotlight</option>
            <option>Display ad placement</option>
            <option>Newsletter mention</option>
            <option>Event promotion</option>
            <option>Not sure yet — tell me more</option>
          </select>
        </Field>

        <Field label="Notes" full>
          <textarea
            name="notes"
            rows={4}
            placeholder="Anything else we should know?"
            disabled={loading}
            className={inputClass}
          />
        </Field>
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-sage-700 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Submitting…" : "Submit your business"}
        <Send className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-bark-faint">
        We&apos;ll never share your details. Listings are reviewed before they go
        live.
      </p>
    </form>
  );
}
