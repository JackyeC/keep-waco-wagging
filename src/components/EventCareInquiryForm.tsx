"use client";

import { useState } from "react";
import { AlertCircle, CalendarHeart, CheckCircle2 } from "lucide-react";
import { eventCareRoles } from "@/data/eventCare";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";

export function EventCareInquiryForm() {
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
      const res = await fetch("/api/event-care", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          eventDate: fd.get("eventDate"),
          eventType: fd.get("eventType"),
          venue: fd.get("venue"),
          setting: fd.get("setting"),
          dogName: fd.get("dogName"),
          dogBreed: fd.get("dogBreed"),
          dogAge: fd.get("dogAge"),
          dogCount: fd.get("dogCount"),
          dogRole: fd.get("dogRole"),
          timeNeeded: fd.get("timeNeeded"),
          crowdComfort: fd.get("crowdComfort"),
          leashComfort: fd.get("leashComfort"),
          biteOrReactivity: fd.get("biteOrReactivity"),
          specialHandling: fd.get("specialHandling"),
          vendorContact: fd.get("vendorContact"),
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
        <h3 className="mt-4 text-xl font-semibold">Thanks — we&apos;ve got it!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
          We&apos;ll review your event details and follow up to talk through the
          right level of support for your pup&apos;s big day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card bg-cream p-6 ring-1 ring-inset ring-clay/70 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name"><input name="name" required disabled={loading} className={inputClass} /></Field>
        <Field label="Email"><input name="email" type="email" required disabled={loading} className={inputClass} /></Field>
        <Field label="Phone"><input name="phone" type="tel" disabled={loading} className={inputClass} /></Field>
        <Field label="Event date"><input name="eventDate" type="date" disabled={loading} className={inputClass} /></Field>
        <Field label="Event type">
          <input name="eventType" placeholder="Wedding, party, photo session, proposal…" disabled={loading} className={inputClass} />
        </Field>
        <Field label="Venue / location"><input name="venue" disabled={loading} className={inputClass} /></Field>
        <Field label="Indoor / outdoor / both">
          <select name="setting" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>Choose one</option>
            <option>Indoor</option>
            <option>Outdoor</option>
            <option>Both</option>
          </select>
        </Field>
        <Field label="Approximate time needed">
          <input name="timeNeeded" placeholder="e.g. 90 minutes, 3 hours" disabled={loading} className={inputClass} />
        </Field>

        <Field label="Dog's name"><input name="dogName" disabled={loading} className={inputClass} /></Field>
        <Field label="Dog breed / size"><input name="dogBreed" disabled={loading} className={inputClass} /></Field>
        <Field label="Dog age"><input name="dogAge" disabled={loading} className={inputClass} /></Field>
        <Field label="Number of dogs">
          <input name="dogCount" type="number" min={1} defaultValue={1} disabled={loading} className={inputClass} />
        </Field>

        <Field label="What role should the dog play?">
          <select name="dogRole" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>Choose one</option>
            {eventCareRoles.map((role) => <option key={role}>{role}</option>)}
          </select>
        </Field>
        <Field label="Is your dog comfortable around crowds?">
          <select name="crowdComfort" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>Choose one</option>
            <option>Yes</option>
            <option>Somewhat</option>
            <option>No / unsure</option>
          </select>
        </Field>
        <Field label="Is your dog comfortable on leash?">
          <select name="leashComfort" className={inputClass} defaultValue="" disabled={loading}>
            <option value="" disabled>Choose one</option>
            <option>Yes</option>
            <option>Somewhat</option>
            <option>No / unsure</option>
          </select>
        </Field>
        <Field label="Any bite history or reactivity?">
          <input name="biteOrReactivity" placeholder="Please be honest — it keeps everyone safe" disabled={loading} className={inputClass} />
        </Field>

        <Field label="Does your dog need medication or special handling?" full>
          <input name="specialHandling" disabled={loading} className={inputClass} />
        </Field>
        <Field label="Planner or photographer contact (if available)" full>
          <input name="vendorContact" disabled={loading} className={inputClass} />
        </Field>
        <Field label="Notes" full>
          <textarea name="notes" rows={4} placeholder="Tell us about the moment you're hoping to create." disabled={loading} className={inputClass} />
        </Field>
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white hover:bg-sage-700 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending..." : "Ask About Event Dog Care"} <CalendarHeart className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs leading-relaxed text-bark-faint">
        Final pricing depends on location, duration, number of dogs, and event
        needs. A meet-and-greet or planning call is required before any event.
      </p>
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
