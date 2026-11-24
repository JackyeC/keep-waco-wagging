/**
 * Subscriber-list classification for reporting, dedupe, and send-list prep.
 *
 * Does not write to Supabase. Signup forms still store every valid lead,
 * including owner and test addresses. This module only decides who belongs
 * on an outbound newsletter list.
 */

export type SubscriberBucket = "test" | "internal" | "likely_real";

export type AuditableLead = {
  email: string;
  first_name?: string | null;
  dog_name?: string | null;
  interests?: string[] | null;
  source_page?: string | null;
  created_at?: string | null;
};

export type ClassifiedLead = AuditableLead & {
  emailNorm: string;
  bucket: SubscriberBucket;
};

export type SendListEntry = {
  email: string;
  first_name: string | null;
  dog_name: string | null;
  interests: string[];
  first_signup_at: string | null;
  source_page: string | null;
};

export type SubscriberAuditSummary = {
  totalRows: number;
  uniqueEmails: number;
  uniqueByBucket: Record<SubscriberBucket, number>;
  sendList: SendListEntry[];
};

/** Owner / brand inboxes that should never be on a public send list. */
const INTERNAL_DOMAINS = new Set([
  "keepwacowagging.com",
  "platinumscoops.com",
  "jackyeclayton.com",
]);

/** Disposable / placeholder domains used in QA. */
const TEST_DOMAINS = [
  "example.com",
  "example.org",
  "example.net",
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "trashmail.com",
  "yopmail.com",
  "sharklasers.com",
  "10minutemail.com",
  "localhost",
];

const TEST_FIRST_NAMES = new Set([
  "test",
  "tester",
  "testing",
  "asdf",
  "foo",
  "bar",
]);

/**
 * Jackye's Gmail, including plus-aliases (jackyeclayton+tag@gmail.com).
 * Matches the owner mailbox used for site ops; not a public subscriber.
 */
const OWNER_GMAIL =
  /^jackyeclayton(?:\+[^@]+)?@gmail\.com$/;

export function normalizeLeadEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isOwnerGmailAddress(email: string): boolean {
  return OWNER_GMAIL.test(normalizeLeadEmail(email));
}

export function isInternalLeadEmail(email: string): boolean {
  const normalized = normalizeLeadEmail(email);
  if (isOwnerGmailAddress(normalized)) return true;

  const at = normalized.lastIndexOf("@");
  if (at <= 0) return false;
  const domain = normalized.slice(at + 1);
  return INTERNAL_DOMAINS.has(domain);
}

function isTestDomain(domain: string): boolean {
  if (TEST_DOMAINS.includes(domain)) return true;
  if (domain === "test" || domain === "testing" || domain === "invalid") {
    return true;
  }
  return (
    domain.startsWith("test.") ||
    domain.startsWith("testing.") ||
    domain.endsWith(".test") ||
    domain.endsWith(".invalid")
  );
}

export function isTestLead(lead: Pick<AuditableLead, "email" | "first_name">): boolean {
  const normalized = normalizeLeadEmail(lead.email);
  const at = normalized.lastIndexOf("@");
  const local = at >= 0 ? normalized.slice(0, at) : normalized;
  const domain = at >= 0 ? normalized.slice(at + 1) : "";

  if (isTestDomain(domain)) return true;
  if (local === "test" || local === "tester" || local.startsWith("test+")) {
    return true;
  }
  if (local.includes("+test")) return true;

  const firstName = lead.first_name?.trim().toLowerCase() ?? "";
  return TEST_FIRST_NAMES.has(firstName);
}

export function classifyLead(lead: AuditableLead): ClassifiedLead {
  const emailNorm = normalizeLeadEmail(lead.email);
  const bucket: SubscriberBucket = isInternalLeadEmail(emailNorm)
    ? "internal"
    : isTestLead({ email: emailNorm, first_name: lead.first_name })
      ? "test"
      : "likely_real";

  return { ...lead, emailNorm, bucket };
}

function nonempty(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

function completenessScore(lead: AuditableLead): number {
  let score = 0;
  if (nonempty(lead.first_name)) score += 4;
  if (nonempty(lead.dog_name)) score += 2;
  if (lead.interests && lead.interests.length > 0) score += 1;
  return score;
}

function earlierTimestamp(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a <= b ? a : b;
}

/**
 * Unique likely-real subscribers, one row per lowercase email.
 * Uses the earliest signup date and the most complete profile fields.
 */
export function prepareSendList(leads: AuditableLead[]): SendListEntry[] {
  const byEmail = new Map<
    string,
    { entry: SendListEntry; score: number }
  >();

  for (const lead of leads) {
    const classified = classifyLead(lead);
    if (classified.bucket !== "likely_real") continue;

    const score = completenessScore(lead);
    const createdAt = lead.created_at ?? null;
    const existing = byEmail.get(classified.emailNorm);

    if (!existing) {
      byEmail.set(classified.emailNorm, {
        score,
        entry: {
          email: classified.emailNorm,
          first_name: nonempty(lead.first_name),
          dog_name: nonempty(lead.dog_name),
          interests: lead.interests ?? [],
          first_signup_at: createdAt,
          source_page: nonempty(lead.source_page),
        },
      });
      continue;
    }

    existing.entry.first_signup_at = earlierTimestamp(
      existing.entry.first_signup_at,
      createdAt,
    );

    if (score > existing.score) {
      existing.score = score;
      existing.entry.first_name = nonempty(lead.first_name);
      existing.entry.dog_name = nonempty(lead.dog_name);
      existing.entry.interests = lead.interests ?? [];
      existing.entry.source_page = nonempty(lead.source_page);
    }
  }

  return [...byEmail.values()]
    .map(({ entry }) => entry)
    .sort((a, b) => {
      const left = a.first_signup_at ?? "";
      const right = b.first_signup_at ?? "";
      return left.localeCompare(right);
    });
}

export function summarizeSubscriberAudit(
  leads: AuditableLead[],
): SubscriberAuditSummary {
  const classified = leads.map(classifyLead);
  const uniqueByBucket: Record<SubscriberBucket, Set<string>> = {
    test: new Set(),
    internal: new Set(),
    likely_real: new Set(),
  };

  for (const lead of classified) {
    uniqueByBucket[lead.bucket].add(lead.emailNorm);
  }

  return {
    totalRows: leads.length,
    uniqueEmails: new Set(classified.map((lead) => lead.emailNorm)).size,
    uniqueByBucket: {
      test: uniqueByBucket.test.size,
      internal: uniqueByBucket.internal.size,
      likely_real: uniqueByBucket.likely_real.size,
    },
    sendList: prepareSendList(leads),
  };
}
