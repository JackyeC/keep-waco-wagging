import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { checkAdmin } from "@/lib/daily-sniff/admin-auth";
import { Button } from "@/components/ui/Button";
import type { ContentBlock, DailySniffBrief } from "@/lib/daily-sniff/types";
import {
  approveBriefAction,
  archiveBriefAction,
  markNeedsVerificationAction,
  rejectBriefAction,
  updateContentBlockAction,
} from "../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Review brief",
  robots: { index: false, follow: false },
};

export default async function BriefDetailPage({
  params,
}: {
  params: Promise<{ briefId: string }>;
}) {
  const { briefId } = await params;
  const gate = await checkAdmin();

  if (gate.state !== "ok") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-sm text-stone-600">
          <Link href="/admin/daily-sniff" className="text-sage-700 underline">
            Unlock the review queue
          </Link>{" "}
          to view this brief.
        </p>
      </main>
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20">
        <p className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">
          Supabase service role key is not configured.
        </p>
      </main>
    );
  }

  const { data: brief } = await supabase
    .from("daily_sniff_briefs")
    .select("*")
    .eq("id", briefId)
    .single();

  if (!brief) notFound();
  const typedBrief = brief as DailySniffBrief;

  const { data: blockData } = await supabase
    .from("daily_sniff_content_blocks")
    .select("*")
    .eq("brief_id", briefId)
    .order("position", { ascending: true });
  const blocks = (blockData ?? []) as ContentBlock[];

  const approve = approveBriefAction.bind(null, briefId);
  const reject = rejectBriefAction.bind(null, briefId);
  const archive = archiveBriefAction.bind(null, briefId);
  const needsVerification = markNeedsVerificationAction.bind(null, briefId);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/admin/daily-sniff"
        className="text-sm text-sage-700 hover:underline"
      >
        &larr; Back to queue
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-semibold text-sage-800">
          {typedBrief.status}
        </span>
        {typedBrief.needs_verification ? (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            Needs verification
          </span>
        ) : null}
      </div>

      <h1 className="mt-3 font-serif text-3xl text-bark">{typedBrief.headline}</h1>
      {typedBrief.dek ? (
        <p className="mt-2 text-stone-600">{typedBrief.dek}</p>
      ) : null}

      {typedBrief.sources && typedBrief.sources.length > 0 ? (
        <div className="mt-4 rounded-2xl bg-stone-50 p-4 text-sm ring-1 ring-stone-200">
          <p className="font-semibold text-stone-700">Sources</p>
          <ul className="mt-2 space-y-1">
            {typedBrief.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-700 underline"
                >
                  {s.publisher ? `${s.publisher}: ` : ""}
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Editable content blocks */}
      <section className="mt-8 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Draft content
        </h2>
        {blocks.map((block) => {
          const save = updateContentBlockAction.bind(null, block.id);
          return (
            <form
              key={block.id}
              action={save}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {block.block_type}
                </span>
                <Button type="submit" variant="ghost" size="sm">
                  Save
                </Button>
              </div>
              <textarea
                name="content"
                defaultValue={block.content ?? ""}
                rows={block.block_type === "paragraph" || block.block_type === "callout" ? 4 : 2}
                className="mt-2 w-full resize-y rounded-xl border border-stone-200 p-3 text-sm focus:border-sage-400 focus:outline-none"
              />
            </form>
          );
        })}
        {blocks.length === 0 ? (
          <p className="text-sm text-stone-500">No content blocks on this brief.</p>
        ) : null}
      </section>

      {/* Verification notes */}
      <section className="mt-8 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <h2 className="text-sm font-semibold text-amber-900">
          Flag for verification
        </h2>
        <form action={needsVerification} className="mt-3 space-y-3">
          <textarea
            name="notes"
            rows={2}
            defaultValue={typedBrief.verification_notes ?? ""}
            placeholder="What needs to be confirmed before this can publish?"
            className="w-full resize-y rounded-xl border border-amber-200 bg-white p-3 text-sm focus:border-amber-400 focus:outline-none"
          />
          <Button type="submit" variant="secondary" size="sm">
            Mark needs verification
          </Button>
        </form>
      </section>

      {/* Decision actions */}
      <section className="mt-8 flex flex-wrap gap-3 border-t border-stone-200 pt-6">
        <form action={approve}>
          <Button type="submit" variant="primary">
            Approve
          </Button>
        </form>
        <form action={reject}>
          <Button type="submit" variant="secondary">
            Reject
          </Button>
        </form>
        <form action={archive}>
          <Button type="submit" variant="ghost">
            Archive
          </Button>
        </form>
      </section>
    </main>
  );
}
