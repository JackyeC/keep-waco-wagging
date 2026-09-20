import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  classifyLead,
  isInternalLeadEmail,
  isOwnerGmailAddress,
  isTestLead,
  prepareSendList,
  summarizeSubscriberAudit,
} from "@/lib/subscriberAudit";

describe("owner Gmail classification", () => {
  it("treats the owner Gmail inbox as internal", () => {
    assert.equal(isOwnerGmailAddress("jackyeclayton@gmail.com"), true);
    assert.equal(isOwnerGmailAddress("JackyeClayton@Gmail.COM"), true);
    assert.equal(isInternalLeadEmail("  jackyeclayton@gmail.com  "), true);
    assert.equal(classifyLead({ email: "jackyeclayton@gmail.com" }).bucket, "internal");
  });

  it("treats every jackyeclayton+alias@gmail.com address as internal", () => {
    assert.equal(
      isOwnerGmailAddress("jackyeclayton+signupcheck@gmail.com"),
      true,
    );
    assert.equal(
      isOwnerGmailAddress("jackyeclayton+newsletter@gmail.com"),
      true,
    );
    assert.equal(
      classifyLead({ email: "JackyeClayton+QA@Gmail.com" }).bucket,
      "internal",
    );
  });

  it("does not treat similar Gmail addresses as owner inboxes", () => {
    assert.equal(isOwnerGmailAddress("notjackyeclayton@gmail.com"), false);
    assert.equal(isOwnerGmailAddress("jackyeclayton@yahoo.com"), false);
    assert.equal(isOwnerGmailAddress("jackyeclayton@gmail.com.evil.test"), false);
    assert.equal(
      classifyLead({ email: "smith.julianab@gmail.com" }).bucket,
      "likely_real",
    );
  });

  it("classifies owner Gmail as internal even when the row also looks like a test", () => {
    assert.equal(
      classifyLead({
        email: "jackyeclayton+test@gmail.com",
        first_name: "Test",
      }).bucket,
      "internal",
    );
  });
});

describe("internal domains and test records", () => {
  it("classifies brand and owner domains as internal", () => {
    assert.equal(classifyLead({ email: "hello@keepwacowagging.com" }).bucket, "internal");
    assert.equal(classifyLead({ email: "info@platinumscoops.com" }).bucket, "internal");
    assert.equal(classifyLead({ email: "hi@jackyeclayton.com" }).bucket, "internal");
  });

  it("classifies placeholder and QA addresses as test", () => {
    assert.equal(classifyLead({ email: "person@example.com" }).bucket, "test");
    assert.equal(classifyLead({ email: "bot@mailinator.com" }).bucket, "test");
    assert.equal(classifyLead({ email: "test@gmail.com" }).bucket, "test");
    assert.equal(
      classifyLead({ email: "visitor@gmail.com", first_name: "Tester" }).bucket,
      "test",
    );
    assert.equal(isTestLead({ email: "qa+test@outlook.com" }), true);
  });
});

describe("send-list preparation", () => {
  const rows = [
    {
      email: "jackyeclayton@gmail.com",
      first_name: "Jackye",
      interests: ["Pet care tips"],
      source_page: "/",
      created_at: "2026-06-11T20:37:36.564Z",
    },
    {
      email: "jackyeclayton+signupcheck@gmail.com",
      source_page: "/",
      created_at: "2026-07-30T21:28:32.816Z",
    },
    {
      email: "groomsbychessy@gmail.com",
      source_page: "/",
      created_at: "2026-08-10T19:34:19.603Z",
    },
    {
      email: "GroomsByChessy@gmail.com",
      first_name: "Chessy",
      dog_name: "Scout",
      interests: ["Waco dog-friendly events"],
      source_page: "/weekend",
      created_at: "2026-08-12T12:00:00.000Z",
    },
    {
      email: "person@example.com",
      source_page: "/",
      created_at: "2026-08-01T00:00:00.000Z",
    },
    {
      email: "smith.julianab@gmail.com",
      first_name: "Jules",
      dog_name: "Nova",
      interests: [
        "Doggy daycare camp",
        "Boarding availability",
        "Waco dog-friendly events",
      ],
      source_page: "/weekend",
      created_at: "2026-09-01T01:51:30.064Z",
    },
  ];

  it("excludes owner Gmail, plus-aliases, and test records from the send list", () => {
    const sendList = prepareSendList(rows);
    assert.deepEqual(
      sendList.map((entry) => entry.email),
      ["groomsbychessy@gmail.com", "smith.julianab@gmail.com"],
    );
  });

  it("dedupes by lowercase email and keeps the earliest signup with the richest profile", () => {
    const [chessy] = prepareSendList(rows);
    assert.equal(chessy.email, "groomsbychessy@gmail.com");
    assert.equal(chessy.first_name, "Chessy");
    assert.equal(chessy.dog_name, "Scout");
    assert.deepEqual(chessy.interests, ["Waco dog-friendly events"]);
    assert.equal(chessy.source_page, "/weekend");
    assert.equal(chessy.first_signup_at, "2026-08-10T19:34:19.603Z");
  });

  it("summarizes unique buckets without mutating input rows", () => {
    const snapshot = structuredClone(rows);
    const summary = summarizeSubscriberAudit(rows);
    assert.deepEqual(rows, snapshot);
    assert.equal(summary.totalRows, 6);
    assert.equal(summary.uniqueEmails, 5);
    assert.equal(summary.uniqueByBucket.internal, 2);
    assert.equal(summary.uniqueByBucket.test, 1);
    assert.equal(summary.uniqueByBucket.likely_real, 2);
    assert.equal(summary.sendList.length, 2);
  });
});
