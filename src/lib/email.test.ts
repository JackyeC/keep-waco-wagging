import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { isEmailConfigured, sendLeadNotification } from "./email";

describe("email configuration", () => {
  const snapshot = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEAD_NOTIFICATION_EMAIL: process.env.LEAD_NOTIFICATION_EMAIL,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  };

  afterEach(() => {
    if (snapshot.RESEND_API_KEY === undefined) {
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = snapshot.RESEND_API_KEY;
    }
    if (snapshot.LEAD_NOTIFICATION_EMAIL === undefined) {
      delete process.env.LEAD_NOTIFICATION_EMAIL;
    } else {
      process.env.LEAD_NOTIFICATION_EMAIL = snapshot.LEAD_NOTIFICATION_EMAIL;
    }
    if (snapshot.RESEND_FROM_EMAIL === undefined) {
      delete process.env.RESEND_FROM_EMAIL;
    } else {
      process.env.RESEND_FROM_EMAIL = snapshot.RESEND_FROM_EMAIL;
    }
  });

  it("requires both RESEND_API_KEY and LEAD_NOTIFICATION_EMAIL", () => {
    process.env.RESEND_API_KEY = "re_test_key_12345678901234567890";
    process.env.LEAD_NOTIFICATION_EMAIL = "info@keepwacowagging.com";
    assert.equal(isEmailConfigured(), true);

    delete process.env.LEAD_NOTIFICATION_EMAIL;
    assert.equal(isEmailConfigured(), false);
  });

  it("sendLeadNotification fails without LEAD_NOTIFICATION_EMAIL (no false success)", async () => {
    process.env.RESEND_API_KEY = "re_test_key_12345678901234567890";
    delete process.env.LEAD_NOTIFICATION_EMAIL;

    const result = await sendLeadNotification("Test subject", "Test body", {
      replyTo: "visitor@example.com",
    });

    assert.equal(result.ok, false);
    assert.equal(result.error, "Email not configured");
    assert.equal(result.messageId, undefined);
  });

  it("sendLeadNotification fails without RESEND_API_KEY", async () => {
    delete process.env.RESEND_API_KEY;
    process.env.LEAD_NOTIFICATION_EMAIL = "info@keepwacowagging.com";

    const result = await sendLeadNotification("Test subject", "Test body");

    assert.equal(result.ok, false);
    assert.equal(result.error, "Email not configured");
  });
});
