import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function HomeApprovedNote() {
  return (
    <section className="border-y border-border bg-sage-50">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-wag-sage ring-1 ring-sage-200">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.16em] text-wag-sage uppercase">
              Keep Waco Wagging Approved
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-bark-soft">
              Being in the directory means dogs are reported welcome. Approved
              means we actually thought about whether it works for dog parents —
              shade, water, noise, and whether we would take our own dogs.
              Businesses cannot buy that.
            </p>
          </div>
        </div>
        <Link
          href="/approved"
          className="shrink-0 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:text-wag-sage"
        >
          How we evaluate →
        </Link>
      </div>
    </section>
  );
}
