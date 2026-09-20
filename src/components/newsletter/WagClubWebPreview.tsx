import Link from "next/link";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import { Button } from "@/components/ui/Button";
import {
  getNewsletterSendBlockers,
  wagClubSept20Issue,
} from "@/data/newsletters/wagClubSept20";
import { cn } from "@/lib/utils";

const statusClass: Record<string, string> = {
  confirmed_dog_friendly: "bg-sage-100 text-sage-800",
  verify_policy: "bg-blush text-bark",
  heat_note: "bg-cream text-serif-ink ring-1 ring-inset ring-clay",
};

export function WagClubPreviewBanner() {
  const blockers = getNewsletterSendBlockers();
  return (
    <div className="border-b border-rose/40 bg-blush px-6 py-4">
      <div className="mx-auto max-w-[720px]">
        <p className="text-[11px] font-medium tracking-[0.16em] text-rose-deep uppercase">
          Internal preview — not sent — not indexed
        </p>
        <p className="mt-2 text-sm leading-relaxed text-bark">
          Production send is blocked until the mailing address, unsubscribe
          link, and featured article URL are replaced. Reply-To is the working
          owner inbox, not hello@ or info@keepwacowagging.com.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-bark-soft">
          {blockers.map((blocker) => (
            <li key={blocker}>{blocker}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WagClubPreviewNav({ current }: { current: "web" | "email" | "text" | "checklist" }) {
  const base = wagClubSept20Issue.previewPath;
  const links = [
    { id: "web", href: base, label: "Web preview" },
    { id: "email", href: `${base}/email`, label: "Email HTML" },
    { id: "text", href: `${base}/text`, label: "Plain text" },
    { id: "checklist", href: `${base}/checklist`, label: "Checklist" },
  ] as const;

  return (
    <nav
      aria-label="Newsletter preview versions"
      className="border-b border-border bg-soft-cream px-6"
    >
      <div className="mx-auto flex max-w-[720px] flex-wrap gap-2 py-3">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-medium",
              current === link.id
                ? "bg-wag-sage text-cream"
                : "bg-white text-bark ring-1 ring-inset ring-clay hover:border-bark",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function WagClubWebPreview() {
  const issue = wagClubSept20Issue;

  return (
    <article className="mx-auto max-w-[720px] px-6 py-10 sm:py-14">
      <header className="rounded-[28px] bg-wag-sage px-6 py-8 text-cream sm:px-10 sm:py-10">
        <BrandWordmark href="/" size="sm" onDark />
        <p className="mt-6 text-[11px] font-medium tracking-[0.2em] text-blush uppercase">
          {issue.welcome.eyebrow} · {issue.weekLabel}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-medium text-cream">
          {issue.welcome.headline}
        </h1>
        <p className="mt-3 text-[15px] text-blush">{issue.welcome.dek}</p>
      </header>

      <p className="mt-8 text-[16px] leading-relaxed text-bark-soft">
        {issue.welcome.body}
      </p>

      <section className="mt-12">
        <p className="eyebrow">This week</p>
        <h2 className="heading mt-2 text-[1.8rem]">{issue.weather.title}</h2>
        <p className="mt-4 font-display text-[1.35rem] leading-snug text-serif-ink">
          {issue.weather.line}
        </p>
        <dl className="mt-5 divide-y divide-border overflow-hidden rounded-[20px] border border-border bg-soft-cream">
          {issue.weather.days.map((day) => (
            <div
              key={day.day}
              className="flex items-baseline justify-between gap-4 px-4 py-2.5 text-[14.5px]"
            >
              <dt className="font-medium text-bark">{day.day}</dt>
              <dd className="text-body-muted">{day.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[15px] leading-relaxed text-body-muted">
          {issue.weather.advice}
        </p>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Events</p>
        <h2 className="heading mt-2 text-[1.8rem]">{issue.events.title}</h2>
        <div className="mt-6 space-y-4">
          {issue.events.items.map((item) => (
            <article
              key={item.id}
              className="rounded-[20px] border border-border bg-soft-cream p-5 sm:p-6"
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-wag-sage uppercase">
                {item.when}
              </p>
              <h3 className="mt-2 font-display text-[1.35rem] font-medium text-serif-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-[13px] text-label-muted">{item.place}</p>
              <p
                className={cn(
                  "mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase",
                  statusClass[item.status],
                )}
              >
                {item.statusLabel}
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-body-muted">
                {item.body}
              </p>
              {item.href && (
                <div className="mt-4">
                  <Button href={item.href} variant="secondary" size="sm">
                    Official details
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[20px] border border-rose/30 bg-blush/40 p-6">
        <p className="eyebrow text-rose-deep">{issue.leaveThemHome.when}</p>
        <h2 className="heading mt-2 text-[1.8rem]">{issue.leaveThemHome.title}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-bark-soft">
          {issue.leaveThemHome.body}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="heading text-[1.8rem]">{issue.wagWatchChanged.title}</h2>
        <article className="mt-5 rounded-[20px] border-l-4 border-rose-deep bg-[#f7eded] p-5 sm:p-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-rose-deep uppercase">
            {issue.wagWatchChanged.recall.label}
          </p>
          <h3 className="mt-2 font-display text-[1.3rem] font-medium text-serif-ink">
            {issue.wagWatchChanged.recall.headline}
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-body-muted">
            {issue.wagWatchChanged.recall.body}
          </p>
          <ul className="mt-4 space-y-3 text-[14px] text-bark">
            {issue.wagWatchChanged.recall.products.map((product) => (
              <li key={product.upc}>
                <span className="font-medium">{product.name}</span>
                <br />
                Lot {product.lot} · UPC {product.upc}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button href={issue.wagWatchChanged.recall.href} variant="sage" size="sm">
              {issue.wagWatchChanged.recall.hrefLabel}
            </Button>
          </div>
        </article>
        <p className="mt-4 text-[14.5px] leading-relaxed text-body-muted">
          {issue.wagWatchChanged.stillWorthChecking.body}{" "}
          <Link
            href={issue.wagWatchChanged.stillWorthChecking.href}
            className="font-medium text-wag-sage underline underline-offset-2"
          >
            {issue.wagWatchChanged.stillWorthChecking.hrefLabel}
          </Link>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="heading text-[1.8rem]">{issue.governmentWatch.title}</h2>
        <article className="mt-5 rounded-[20px] border border-border bg-soft-cream p-5 sm:p-6">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-serif-ink uppercase">
            {issue.governmentWatch.label}
          </p>
          <h3 className="mt-2 font-display text-[1.3rem] font-medium text-serif-ink">
            {issue.governmentWatch.headline}
          </h3>
          <p className="mt-1 text-[11px] font-medium tracking-[0.12em] text-wag-sage uppercase">
            {issue.governmentWatch.when}
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-body-muted">
            {issue.governmentWatch.body}
          </p>
          <p className="mt-4 font-display text-[1.15rem] leading-snug text-serif-ink">
            {issue.governmentWatch.question}
          </p>
          <div className="mt-4">
            <Button href={issue.governmentWatch.href} variant="secondary" size="sm">
              {issue.governmentWatch.hrefLabel}
            </Button>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-label-muted">
            {issue.governmentWatch.recordsNote}
          </p>
        </article>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Featured</p>
        <h2 className="heading mt-2 text-[1.8rem]">{issue.featuredArticle.title}</h2>
        <h3 className="mt-3 font-display text-[1.25rem] font-medium text-serif-ink">
          {issue.featuredArticle.headline}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body-muted">
          {issue.featuredArticle.body}
        </p>
        <p className="mt-4 rounded-xl border border-dashed border-rose bg-cream px-4 py-3 text-sm text-rose-deep">
          <span className="font-medium">Placeholder — do not send yet: </span>
          {issue.featuredArticle.href}
        </p>
      </section>

      <section className="mt-12 rounded-[28px] bg-wag-sage px-6 py-8 text-cream sm:px-8">
        <p className="text-[11px] font-medium tracking-[0.18em] text-blush uppercase">
          Camp Clayton
        </p>
        <h2 className="mt-2 font-display text-[1.8rem] font-medium text-cream">
          {issue.campClayton.title}
        </h2>
        <p className="mt-2 font-display text-[1.2rem] text-blush">
          {issue.campClayton.headline}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-cream/90">
          {issue.campClayton.body}
        </p>
        <div className="mt-6">
          <Button
            href={issue.campClayton.href}
            variant="secondary"
            className="border-cream/40 bg-cream text-wag-sage hover:bg-blush"
          >
            {issue.campClayton.cta}
          </Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="heading text-[1.8rem]">{issue.readerQuestion.title}</h2>
        <p className="mt-3 text-[16px] leading-relaxed text-bark-soft">
          {issue.readerQuestion.body}
        </p>
        <p className="mt-3 text-[15px] text-body-muted">
          {issue.readerQuestion.cta}
        </p>
        <p className="mt-2 text-[13px] text-label-muted">
          Replies go to the working owner inbox until domain inbound mail is
          confirmed.
        </p>
      </section>

      <footer className="mt-12 border-t border-border pt-6 text-[13px] leading-relaxed text-label-muted">
        <p className="text-bark">{issue.brandLine}</p>
        <p className="mt-2">{issue.mailingAddress}</p>
        <p className="mt-2">
          Unsubscribe:{" "}
          <span className="text-rose-deep">{issue.unsubscribeUrl}</span>
        </p>
      </footer>
    </article>
  );
}
