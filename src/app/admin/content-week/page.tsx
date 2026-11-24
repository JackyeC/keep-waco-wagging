import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CopyTextButton } from "@/components/admin/CopyTextButton";
import { contentWeek } from "@/data/contentWeek";
import { checkAdmin } from "@/lib/daily-sniff/admin-auth";
import { noindexRobots } from "@/lib/metadata";
import { loginContentWeek, logoutContentWeek } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Content week | Keep Waco Wagging",
  robots: noindexRobots,
};

const lineClass: Record<string, string> = {
  community: "bg-blush/50 text-rose-deep",
  merch: "bg-sage-100 text-sage-800",
  service: "bg-cream text-bark",
  daycare: "bg-sage-50 text-sage-700",
};

function LoginForm({ error }: { error?: boolean }) {
  return (
    <div className="mx-auto max-w-sm rounded-[20px] border border-border bg-soft-cream p-8">
      <h1 className="font-display text-2xl text-serif-ink">Content week</h1>
      <p className="mt-2 text-sm text-body-muted">
        Same admin token as Daily Sniff. Captions are drafts — schedule them in
        Metricool yourself.
      </p>
      <form action={loginContentWeek} className="mt-6 space-y-3">
        <input
          type="password"
          name="token"
          required
          placeholder="Admin token"
          className="w-full rounded-full border border-input-border bg-cream px-4 py-2.5 text-sm text-bark focus:border-wag-sage focus:outline-none"
        />
        <Button type="submit" className="w-full">
          Unlock
        </Button>
        {error ? (
          <p className="text-center text-sm text-rose-deep">Invalid token.</p>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  copyText,
}: {
  label: string;
  children: ReactNode;
  copyText?: string;
}) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
          {label}
        </p>
        {copyText ? <CopyTextButton text={copyText} /> : null}
      </div>
      {children}
    </div>
  );
}

export default async function ContentWeekPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const gate = await checkAdmin();

  if (gate.state === "unconfigured") {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-[20px] border border-border bg-sage-50 p-8">
          <h1 className="font-display text-2xl text-serif-ink">
            Content week not configured
          </h1>
          <p className="mt-3 text-sm text-body-muted">
            Set{" "}
            <code className="rounded bg-cream px-1.5 py-0.5">
              DAILY_SNIFF_ADMIN_TOKEN
            </code>{" "}
            to unlock the posting plan.
          </p>
        </div>
      </main>
    );
  }

  if (gate.state === "locked") {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20">
        <LoginForm error={params.error === "1"} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[860px] px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow tracking-[0.18em]">Internal · drafts only</p>
          <h1 className="heading mt-2 text-[clamp(1.8rem,4vw,2.6rem)]">
            {contentWeek.title}
          </h1>
          <p className="mt-2 text-[15px] text-body-muted">
            {contentWeek.rangeLabel} · {contentWeek.season}
          </p>
        </div>
        <form action={logoutContentWeek}>
          <button
            type="submit"
            className="text-xs font-medium tracking-[0.14em] text-label-muted uppercase underline decoration-border underline-offset-4"
          >
            Log out
          </button>
        </form>
      </div>

      <p className="mt-6 rounded-[16px] border border-border bg-sage-50 p-4 text-[14px] leading-relaxed text-bark-soft">
        <span className="font-medium text-bark">{contentWeek.postOrderNote}.</span>{" "}
        {contentWeek.rhythm} Camp Clayton this week is{" "}
        <span className="font-medium text-bark">{contentWeek.campClaytonWeek}</span>
        .
      </p>

      <p className="mt-4 text-sm text-label-muted">
        <Link href="/admin/daily-sniff" className="underline underline-offset-4">
          Daily Sniff queue
        </Link>
      </p>

      <div className="mt-10 space-y-6">
        {contentWeek.posts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-[20px] border border-border bg-soft-cream"
          >
            <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
              <span className="rounded-full bg-wag-sage px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-cream uppercase">
                {post.day}
              </span>
              <span className="text-sm font-medium text-serif-ink">
                {post.date}
              </span>
              <span className="text-[12px] text-label-muted">{post.format}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] uppercase ${lineClass[post.line]}`}
              >
                {post.lineLabel}
              </span>
            </div>
            <div className="px-5 py-5">
              <p className="text-[13px] leading-relaxed text-label-muted">
                {post.platform}
              </p>
              <Field label="Hook" copyText={post.hook}>
                <p className="rounded-xl bg-cream p-3 text-[15px] font-medium italic text-serif-ink">
                  {post.hook}
                </p>
              </Field>
              <Field label="Caption" copyText={post.caption}>
                <pre className="overflow-x-auto rounded-xl border border-border bg-cream p-4 font-sans text-[14.5px] leading-relaxed whitespace-pre-wrap text-bark">
                  {post.caption}
                </pre>
              </Field>
              <Field label="Hashtags" copyText={post.hashtags}>
                <p className="rounded-xl bg-sage-50 p-3 text-[13.5px] text-sage-800">
                  {post.hashtags}
                </p>
              </Field>
              {post.cta ? (
                <Field label="CTA" copyText={post.cta}>
                  <p className="rounded-xl bg-cream p-3 text-[14px] text-bark-soft">
                    {post.cta}
                  </p>
                </Field>
              ) : null}
              <Field label="Comment prompt" copyText={post.commentPrompt}>
                <p className="rounded-xl bg-blush/40 p-3 text-[14px] text-bark">
                  {post.commentPrompt}
                </p>
              </Field>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-12 rounded-[20px] border border-border bg-soft-cream p-6">
        <h2 className="font-display text-[1.5rem] text-serif-ink">
          Stories this week
        </h2>
        <p className="mt-1 text-sm text-body-muted">
          Low-lift, daily, and where the link stickers live.
        </p>
        <ul className="mt-4 divide-y divide-border">
          {contentWeek.stories.map((story) => (
            <li key={story.day} className="py-3 text-[14.5px] text-bark-soft">
              <span className="font-medium text-bark">{story.day}:</span>{" "}
              {story.copy}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-[20px] border border-border bg-cream p-6">
        <h2 className="font-display text-[1.5rem] text-serif-ink">
          Scorecard check-in
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-body-muted">
          Reach and link clicks are leading indicators. Follower count is vanity.
          Bookings and sales tied to social are the scoreboard.
        </p>
        <table className="mt-5 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[11px] tracking-[0.12em] text-label-muted uppercase">
              <th className="py-2 font-medium">Metric</th>
              <th className="py-2 font-medium">This week</th>
            </tr>
          </thead>
          <tbody>
            {contentWeek.scorecardMetrics.map((metric) => (
              <tr key={metric.name} className="border-b border-border">
                <td className="py-2.5 text-bark">
                  {metric.name}{" "}
                  <span className="text-[10px] tracking-[0.12em] text-label-muted uppercase">
                    {metric.tier}
                  </span>
                </td>
                <td className="py-2.5 text-label-muted">______</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
