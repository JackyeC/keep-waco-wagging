import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  cleanListingDescription,
  publicMerchBenefit,
  publicMerchDescription,
} from "@/lib/merchCopy";

describe("merch copy", () => {
  it("strips draft boilerplate but keeps product copy", () => {
    const cleaned = cleanListingDescription(
      "<p>DRAFT — pending review. Not yet published. Cozy mug with Waco skyline.</p>",
    );
    assert.equal(cleaned, "Cozy mug with Waco skyline.");
  });

  it("drops bracketed production notes", () => {
    const text = publicMerchDescription(
      "Good dog. Good town. [Confirm whether local Waco pickup is offered before publishing.] Designed in Waco.",
    );
    assert.equal(text.includes("Confirm"), false);
    assert.equal(text.includes("Good dog. Good town."), true);
  });

  it("uses the first real sentence as the benefit", () => {
    const benefit = publicMerchBenefit(
      "A Golden and the Waco skyline, wrapped around the mug you reach for before the morning walk. Designed in Waco by Keep Waco Wagging. Made to order.",
      "Golden Retriever Waco Skyline Mug",
    );
    assert.equal(
      benefit,
      "A Golden and the Waco skyline, wrapped around the mug you reach for before the morning walk.",
    );
  });

  it("does not repeat the product name when that is all we have", () => {
    assert.equal(publicMerchBenefit("Waco Skyline Tee", "Waco Skyline Tee"), "");
  });
});
