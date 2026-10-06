import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { testimonialExcerpt, testimonials } from "@/data/testimonials";

describe("testimonial excerpts", () => {
  it("uses complete sentences instead of cut-off ellipses", () => {
    for (const item of testimonials) {
      const excerpt = testimonialExcerpt(item);
      assert.equal(
        excerpt.includes("..."),
        false,
        `${item.id} still contains a truncated ellipsis`,
      );
      assert.equal(
        excerpt.includes("…"),
        false,
        `${item.id} still ends mid-thought`,
      );
      assert.match(
        excerpt,
        /[.!]$/,
        `${item.id} should end on a complete sentence`,
      );
    }
  });
});
