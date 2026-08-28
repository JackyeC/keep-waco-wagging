import Link from "next/link";
import { Bell, CalendarDays, MapPin, PawPrint } from "lucide-react";

const paths = [
  {
    icon: MapPin,
    title: "Dog-friendly Waco",
    copy: "Where can we go together — and what is it actually like with a dog?",
    cta: "Explore Dog-Friendly Waco",
    href: "/dog-friendly-waco",
  },
  {
    icon: PawPrint,
    title: "Dog care",
    copy: "Who can I trust with my dog when they should stay somewhere safe?",
    cta: "See Dog Care",
    href: "/dog-care",
  },
  {
    icon: Bell,
    title: "Wag Watch",
    copy: "What changed that could matter to you and your dog this week?",
    cta: "Read Wag Watch",
    href: "/wag-watch",
  },
  {
    icon: CalendarDays,
    title: "This weekend",
    copy: "What can we do in Waco with a dog — and when should we leave them home?",
    cta: "See Waco Dog Weekend",
    href: "/weekend",
  },
] as const;

export function ChoosePath() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="text-center">
        <p className="eyebrow tracking-[0.24em]">What do you need today?</p>
        <h2 className="heading mt-2 text-[clamp(1.9rem,3.6vw,2.6rem)]">
          If it involves your dog in Waco, start here
        </h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => {
          const Icon = path.icon;
          return (
            <Link
              key={path.title}
              href={path.href}
              className="card-panel group flex flex-col p-6 transition-colors hover:border-wag-sage"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-wag-sage">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-[1.4rem] font-medium text-serif-ink">
                {path.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body-muted">
                {path.copy}
              </p>
              <span className="mt-4 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase group-hover:text-wag-sage">
                {path.cta} →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
