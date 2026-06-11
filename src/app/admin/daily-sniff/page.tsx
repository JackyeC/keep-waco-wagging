import Link from "next/link";
import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { checkAdmin } from "@/lib/daily-sniff/admin-auth";
import { Button } from "@/components/ui/Button";
import type { DailySniffBrief } from "@/lib/daily-sniff/types";
import { loginAdmin, logoutAdmin } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Daily Sniff review queue",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  needs_verification: "Needs verification",
  approved: "Approved",
  rejected: "Rejected",
  archived: "Archived",
};

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-sage-100 text-sage-800",
  needs_verification: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-700",
  archived: "bg-stone-200 text-stone-600",
};

function Badge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        STATUS_STYLES[status] ?? "bg-stone-100 text-stone-700"
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function LoginForm({ error }: { error?: boolean }) {
  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
      <h1 className="font-serif text-2xl text-bark">Daily Sniff</h1>
      <p className="mt-2 text-sm text-stone-600">
        Enter the admin token to access the review queue.
      </p>
      <form action={loginAdmin} className="mt-6 space-y-3">
        <input
          type="password"
          name="token"
          required
          placeholder="Admin token"
          className="w-full rounded-full border border-stone-300 px-4 py-2.5 text-sm focus:border-sage-400 focus:outline-none"
        />
        <Button type="submit" className="w-full">
          Unlock
        </Button>
        {error ? (
          <p className="text-center text-sm text-rose-600">Invalid token.</p>
        ) : null}
      </form>
    </div>
  );
}

export default async function DailySniffQueuePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const gate = await checkAdmin();

  if (gate.state === "unconfigured") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20">
        <div className="rounded-3xl bg-amber-50 p-8 ring-1 ring-amber-200">
          <h1 className="font-serif text-2xl text-bark">Daily Sniff not configured</h1>
          <p className="mt-3 text-sm text-stone-700">
            Set <code className="rounded bg-white px-1.5 py-0.5">DAILY_SNIFF_ADMIN_TOKEN</code> in
            your environment to enable the review queue.
          </p>
        </div>
      </main>
    );
  }

  if (gate.state === "locked") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20">
        <LoginForm error={params.error === "1"} />
      </main>
    );
  }

  const supabase = getSupabaseAdmin();
  let briefs: DailySniffBrief[] = [];
  let dbError: string | null = null;

  if (!supabase) {
    dbError = "Supabase service role key is not configured.";
  } else {
    const { data, error } = await supabase
      .from("daily_sniff_briefs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) dbError = error.message;
    else briefs = (data ?? []) as DailySniffBrief[];
  }

  const pending = briefs.filter(
    (b) => b.status === "draft" || b.status === "needs_verification",
  );
  const reviewed = briefs.filter(
    (b) => b.status !== "draft" && b.status !== "needs_verification",
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-bark">Daily Sniff review queue</h1>
          <p className="mt-1 text-sm text-stone-600">
            Nothing publishes automatically. Review, edit, and approve each brief.
          </p>
        </div>
        <form action={logoutAdmin}>
          <Button type="submit" variant="ghost" size="sm">
            Log out
          </Button>
        </form>
      </div>

      {dbError ? (
        <p className="mt-6 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700 ring-1 ring-rose-200">
          {dbError}
        </p>
      ) : null}

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Pending review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">
            No drafts waiting. Run the fetch / score / draft steps to populate the queue.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {pending.map((brief) => (
              <BriefRow key={brief.id} brief={brief} />
            ))}
          </ul>
        )}
      </section>

      {reviewed.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            Reviewed ({reviewed.length})
          </h2>
          <ul className="mt-3 space-y-3">
            {reviewed.map((brief) => (
              <BriefRow key={brief.id} brief={brief} />
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function BriefRow({ brief }: { brief: DailySniffBrief }) {
  const source = brief.sources?.[0];
  return (
    <li className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <div className="flex flex-wrap items-center gap-2">
        <Badge status={brief.status} />
        {brief.category ? (
          <span className="text-xs font-medium text-stone-500">{brief.category}</span>
        ) : null}
        <span className="text-xs text-stone-400">
          {new Date(brief.created_at).toLocaleDateString()}
        </span>
      </div>
      <Link
        href={`/admin/daily-sniff/${brief.id}`}
        className="mt-2 block font-serif text-lg text-bark hover:text-sage-700"
      >
        {brief.headline}
      </Link>
      {brief.dek ? (
        <p className="mt-1 line-clamp-2 text-sm text-stone-600">{brief.dek}</p>
      ) : null}
      {source ? (
        <p className="mt-2 truncate text-xs text-stone-400">
          {source.publisher ? `${source.publisher} \u2014 ` : ""}
          {source.url}
        </p>
      ) : null}
    </li>
  );
}
