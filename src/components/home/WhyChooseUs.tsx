import { cityConfig } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

const values = [
  {
    title: "Full-time care, not a side gig",
    detail:
      "Jackye & Todd built this around dogs — boarding, daycare, scooping, and training are the work, not an after-hours add-on.",
  },
  {
    title: "Home-based boarding & daycare",
    detail:
      "Dogs stay in a calm Waco home with walks, enrichment, rest, and updates — not a warehouse kennel.",
  },
  {
    title: "Family-run Waco business",
    detail:
      "The local pet-care home of Platinum Scoops — the same family behind every service we offer.",
  },
  {
    title: roverCredentialsLine,
    detail: `Rated by dog families across ${cityConfig.serviceAreas.slice(0, 4).join(", ")}, and greater ${cityConfig.county}.`,
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto mt-16 max-w-[1200px] px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">Why Waco dog families choose us</p>
          <h2 className="heading mt-3 text-[40px]">
            Local, full-time, and built around real dogs in real homes.
          </h2>
          <blockquote className="mt-6 border-l-2 border-rose pl-5">
            <p className="font-display text-[22px] leading-snug text-wag-sage italic">
              &ldquo;They are not boarding. They are visiting — bathed in the
              kitchen sink, dried with the good towels.&rdquo;
            </p>
            <cite className="mt-3 block text-xs font-medium tracking-[0.16em] text-label-muted not-italic uppercase">
              {cityConfig.founders.jackye}, founder
            </cite>
          </blockquote>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((item) => (
            <div key={item.title}>
              <span className="text-lg text-rose" aria-hidden="true">
                ♥
              </span>
              <h3 className="mt-2 font-display text-[21px] font-semibold text-serif-ink">
                {item.title}
              </h3>
              <p className="body-light mt-1.5">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
