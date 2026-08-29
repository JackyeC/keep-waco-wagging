import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export function DogMatchTeaser() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-4">
      <Link
        href="/dog-match"
        className="card-panel group flex flex-col gap-4 p-6 transition-colors hover:border-wag-sage sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
            <HeartHandshake className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="eyebrow">Dog Match</p>
            <h2 className="mt-1 font-display text-[1.7rem] font-medium text-serif-ink">
              You may love the dog. Can you live with the dog?
            </h2>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-body-muted">
              A lifestyle matcher for the life you actually live — not a
              personality quiz.
            </p>
          </div>
        </div>
        <span className="text-xs font-medium tracking-[0.12em] text-rose-deep uppercase group-hover:text-wag-sage">
          Find my dog match →
        </span>
      </Link>
    </section>
  );
}
