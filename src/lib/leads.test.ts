import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

describe("saveSubmission production configuration", () => {
  const envSnapshot = { ...process.env };

  afterEach(() => {
    process.env = { ...envSnapshot };
  });

  it("does not report success when LEAD_NOTIFICATION_EMAIL is missing in production", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    delete process.env.LEAD_NOTIFICATION_EMAIL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    const { saveSubmission } = await import("./leads");
    const result = await saveSubmission("contact_message", {
      email: "visitor@example.com",
      message: "Hello",
      status: "new",
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /temporarily unavailable|email us directly/i);
    }
  });
});

describe("extractCustomerReplyTo", () => {
  it("returns validated customer email from payload", async () => {
    const { extractCustomerReplyTo } = await import("./leads");
    assert.equal(
      extractCustomerReplyTo({ email: "Visitor@Example.com" }),
      "visitor@example.com",
    );
    assert.equal(
      extractCustomerReplyTo({ submitter_email: "submitter@example.com" }),
      "submitter@example.com",
    );
    assert.equal(extractCustomerReplyTo({ email: "not-an-email" }), undefined);
  });
});
