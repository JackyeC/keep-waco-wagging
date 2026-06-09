"use client";

import { useState } from "react";
import { CheckCircle2, PawPrint, AlertCircle } from "lucide-react";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:opacity-60";

/** "Submit your pup" form for the pet showcase. */
export function PetSubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const photo = fd.get("photo");
    const photoFilename =
      photo instanceof File && photo.name ? photo.name : null;

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petName: fd.get("petName"),
          breed: fd.get("breed"),
          ageOrStage: fd.get("ageOrStage"),
          neighborhood: fd.get("neighborhood"),
          bio: fd.get("bio"),
          ownerName: fd.get("ownerName"),
          email: fd.get("email"),
          photoFilename,
        }),
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

  if (submitted) {
    return (
      <div className="rounded-card bg-sage-50 p-8 text-center ring-1 ring-inset ring-sage-200">
        <CheckCircle2 className="mx-auto h-12 w-12 text-sage-600" />
        <h3 className="mt-4 text-xl font-semibold">Thanks for sharing your pup!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
          We review submissions before they hit the Wagging Wall. Keep an eye out
          — your dog might be our next Pet of the Week.
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
        <div>
          <label className="block text-sm font-medium text-bark">Your dog&apos;s name</label>
          <input name="petName" required disabled={loading} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-bark">Breed (or best guess)</label>
          <input name="breed" disabled={loading} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-bark">Age or stage</label>
          <input name="ageOrStage" placeholder="Puppy, 3 yrs, Senior…" disabled={loading} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-bark">Neighborhood</label>
          <input name="neighborhood" placeholder="Woodway, Hewitt, Downtown…" disabled={loading} className={`${inputClass} mt-1.5`} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-bark">A little about them</label>
          <textarea
            name="bio"
            rows={3}
            placeholder="Personality, favorite spots, claim to fame…"
            disabled={loading}
            className={`${inputClass} mt-1.5`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-bark">Your name</label>
          <input name="ownerName" required disabled={loading} className={`${inputClass} mt-1.5`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-bark">Your email</label>
          <input name="email" type="email" required disabled={loading} className={`${inputClass} mt-1.5`} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-bark">Photo</label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            disabled={loading}
            className="mt-1.5 block w-full text-sm text-bark-soft file:mr-3 file:rounded-full file:border-0 file:bg-sage-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sage-700 hover:file:bg-sage-200 disabled:opacity-60"
          />
          <p className="mt-1 text-xs text-bark-faint">
            A clear, well-lit photo works best. By submitting, you confirm it&apos;s
            your photo to share. (Photo upload storage coming soon — we&apos;ll follow
            up by email.)
          </p>
        </div>
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
        <PawPrint className="h-4 w-4" />
        {loading ? "Submitting…" : "Submit your pup"}
      </button>
    </form>
  );
}
