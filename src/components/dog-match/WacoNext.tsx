import Link from "next/link";
import { trackDogMatch } from "@/lib/dog-match/analytics";
import { ctas } from "@/lib/site";

const nextSteps = [
  {
    title: "Dog Care",
    copy: "When they should stay somewhere safe — boarding, daycare, camp, scooping.",
    href: "/dog-care",
    event: "dog_match_dog_care_clicked" as const,
  },
  {
    title: "Lifestyle Training",
    copy: "Real-life manners for the dog you actually live with.",
    href: "/training",
  },
  {
    title: "Dog-Friendly Waco",
    copy: "Places worth going — and notes for when you should leave them home.",
    href: "/dog-friendly-waco",
  },
  {
    title: "Events & weekends",
    copy: "Yappy Hours and a weekend guide that includes rest days.",
    href: "/weekend",
  },
  {
    title: "Waco Dog Parent List",
    copy: "Meet the dogs already living this life here.",
    href: "/pets",
  },
];

export function WacoNext() {
  return (
    <section className="mt-16 border-t border-border pt-12">
      <p className="eyebrow">Keep Waco Wagging</p>
      <h2 className="heading mt-2 text-[clamp(1.8rem,3.3vw,2.5rem)]">
        Whatever dog finds you, you don’t have to figure it out alone.
      </h2>
      <p className="dek mt-4 max-w-2xl">
        Keep Waco Wagging is here for the real-life part — dog care, training
        resources, dog-friendly places, events, and the people who make life with
        dogs in Waco easier.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {nextSteps.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              if (item.event) trackDogMatch(item.event, { dest: item.href });
            }}
            className="card-panel group p-5 transition-colors hover:border-wag-sage"
          >
            <h3 className="font-display text-[1.3rem] font-medium text-serif-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-body-muted">{item.copy}</p>
            <span className="mt-3 inline-block text-xs font-medium tracking-[0.12em] text-rose-deep uppercase group-hover:text-wag-sage">
              Learn more →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 card-panel p-6 sm:p-8">
        <h3 className="font-display text-[1.6rem] font-medium text-serif-ink">
          In Waco? Jackye &amp; Todd can help with what comes next.
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body-muted">
          We can help you find the right next step — training resources, local
          care, or a conversation about whether boarding or daycare is even the
          right tool. Not every dog is automatically accepted for daycare or
          boarding. The promise is help, not a guaranteed stall.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={ctas.bookService.href} className="btn-pill btn-sage px-6 py-3">
            Talk about next steps
          </Link>
          <Link
            href="/new-dog-in-waco"
            className="btn-pill btn-rose-outline px-6 py-3"
          >
            New dog in Waco
          </Link>
        </div>
      </div>

      <div className="mt-12 max-w-xl">
        <p className="eyebrow">A small true thing</p>
        <h2 className="heading mt-2 text-[clamp(1.6rem,3vw,2.2rem)]">
          Every dog needs something different.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body-muted">
          Some need a couch.
          <br />
          Some need a job.
          <br />
          Some need two miles before breakfast.
          <br />
          Some need a quiet room and a minute.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-serif-ink">
          Keep Waco Wagging helps you figure out what your dog needs — and where
          to find it in Waco.
        </p>
      </div>
    </section>
  );
}
