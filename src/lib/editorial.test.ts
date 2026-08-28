import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  wouldWeTakeOurDog,
  type ApprovedListing,
} from "@/data/approvedListings";
import {
  editorialFranchises,
  getEditorialFranchise,
} from "@/data/editorialFranchises";

describe("Would We Take Our Dog vernacular", () => {
  it("stays silent on pending leads", () => {
    const pending: Pick<ApprovedListing, "evaluationStatus" | "status"> = {
      evaluationStatus: "pending",
      status: "approved",
    };
    assert.equal(wouldWeTakeOurDog(pending), null);
  });

  it("maps evaluated verdicts without inventing a second rating", () => {
    assert.equal(
      wouldWeTakeOurDog({ evaluationStatus: "evaluated", status: "approved" }),
      "Yes",
    );
    assert.equal(
      wouldWeTakeOurDog({ evaluationStatus: "evaluated", status: "cautions" }),
      "Yes, but…",
    );
    assert.equal(
      wouldWeTakeOurDog({
        evaluationStatus: "evaluated",
        status: "not_recommended",
      }),
      "Probably not for our dogs",
    );
  });
});

describe("editorial franchises", () => {
  it("keeps the six named series and a New Dog hub", () => {
    assert.equal(editorialFranchises.length, 6);
    assert.equal(getEditorialFranchise("new-dog-in-waco")?.href, "/new-dog-in-waco");
    assert.equal(getEditorialFranchise("waco-dog-weekend")?.href, "/weekend");
  });
});
