import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getRelatedDirectoryListings,
  isPublishableDirectoryValue,
} from "@/lib/directoryPublish";

describe("directory publish helpers", () => {
  it("hides placeholder values Google would treat as thin copy", () => {
    assert.equal(isPublishableDirectoryValue(undefined), false);
    assert.equal(isPublishableDirectoryValue(""), false);
    assert.equal(isPublishableDirectoryValue("unknown"), false);
    assert.equal(isPublishableDirectoryValue("Unknown"), false);
    assert.equal(isPublishableDirectoryValue("tbd"), false);
    assert.equal(isPublishableDirectoryValue("todo verify patio"), false);
    assert.equal(isPublishableDirectoryValue("Dogs welcome on the patio."), true);
  });

  it("varies related listings by category instead of always using the first rows", () => {
    const cafeRelated = getRelatedDirectoryListings("street-dog-cafe");
    const parkRelated = getRelatedDirectoryListings("cameron-park");

    assert.equal(cafeRelated.length, 3);
    assert.equal(parkRelated.length, 3);
    assert.equal(
      cafeRelated.some((listing) => listing.slug === "street-dog-cafe"),
      false,
    );
    assert.notDeepEqual(
      cafeRelated.map((listing) => listing.slug),
      parkRelated.map((listing) => listing.slug),
    );
    assert.ok(cafeRelated.some((listing) => listing.category === "Coffee shops"));
    assert.ok(parkRelated.some((listing) => listing.category === "Parks and trails"));
  });
});
