import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  checkRateLimit,
  clampText,
  isHoneypotTriggered,
} from "@/lib/formGuard";

describe("formGuard", () => {
  it("detects filled honeypot fields", () => {
    assert.equal(isHoneypotTriggered({ _hp: "bot" }), true);
    assert.equal(isHoneypotTriggered({ _hp: "  " }), false);
    assert.equal(isHoneypotTriggered({}), false);
  });

  it("clamps long text input", () => {
    assert.equal(clampText("  hello  ", 10), "hello");
    assert.equal(clampText("abcdefghijklmnopqrstuvwxyz", 5), "abcde");
  });

  it("rate limits repeated keys within a window", () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    assert.equal(checkRateLimit(key, 2, 60_000), true);
    assert.equal(checkRateLimit(key, 2, 60_000), true);
    assert.equal(checkRateLimit(key, 2, 60_000), false);
  });
});
