import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { testimonials } from "@/data/testimonials";

describe("testimonial excerpts", () => {
  it("uses complete sentences instead of cut-off ellipses", () => {
    for (const item of testimonials) {
      assert.equal(
        item.quote.includes("..."),
        false,
        `${item.id} still contains a truncated ellipsis`,
      );
      assert.equal(
        item.quote.includes("…"),
        false,
        `${item.id} still ends mid-thought`,
      );
      assert.match(
        item.quote,
        /[.!]$/,
        `${item.id} should end on a complete sentence`,
      );
    }
  });
});
