import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  DOCUMENTED_LEAD_NOTIFICATION_FALLBACK,
  getLeadNotificationEmail,
  isLeadNotificationRecipientConfigured,
} from "./leadNotificationConfig";

describe("leadNotificationConfig", () => {
  const original = process.env.LEAD_NOTIFICATION_EMAIL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.LEAD_NOTIFICATION_EMAIL;
    } else {
      process.env.LEAD_NOTIFICATION_EMAIL = original;
    }
  });

  it("documents Keep Waco Wagging fallback email", () => {
    assert.equal(DOCUMENTED_LEAD_NOTIFICATION_FALLBACK, "info@keepwacowagging.com");
  });

  it("reads notification recipient from LEAD_NOTIFICATION_EMAIL", () => {
    process.env.LEAD_NOTIFICATION_EMAIL = "info@keepwacowagging.com";
    assert.equal(getLeadNotificationEmail(), "info@keepwacowagging.com");
    assert.equal(isLeadNotificationRecipientConfigured(), true);
  });

  it("returns null when LEAD_NOTIFICATION_EMAIL is missing", () => {
    delete process.env.LEAD_NOTIFICATION_EMAIL;
    assert.equal(getLeadNotificationEmail(), null);
    assert.equal(isLeadNotificationRecipientConfigured(), false);
  });

  it("ignores blank LEAD_NOTIFICATION_EMAIL", () => {
    process.env.LEAD_NOTIFICATION_EMAIL = "   ";
    assert.equal(getLeadNotificationEmail(), null);
    assert.equal(isLeadNotificationRecipientConfigured(), false);
  });
});
