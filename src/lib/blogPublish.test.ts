import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  blogPostsWithImages,
  getIndexablePosts,
  getPublishedPosts,
  isPublishedGuide,
} from "@/data/blog";
import { blogCovers } from "@/data/blogCovers";
import {
  getGuideContent,
  getGuideSources,
  getRelatedGuideSlugs,
} from "@/data/guideContent";

describe("published blog guides", () => {
  it("only treats indexable posts with guide bodies as published", () => {
    const published = getPublishedPosts();
    assert.equal(published.length, 12);

    for (const post of published) {
      assert.equal(post.indexable, true);
      const sections = getGuideContent(post.slug);
      assert.ok(sections);
      assert.ok(sections.flatMap((section) => section.paragraphs).length >= 5);
      assert.ok(getGuideSources(post.slug).length >= 1);
      assert.ok(getRelatedGuideSlugs(post.slug).length >= 1);
      assert.ok(post.updated);
      assert.ok(blogCovers[post.slug], `missing cover for ${post.slug}`);
      assert.equal(isPublishedGuide(post), true);
    }
  });

  it("keeps public index and sitemap helpers aligned", () => {
    const stubs = blogPostsWithImages.filter((post) => !isPublishedGuide(post));

    const publishedIds = new Set(getPublishedPosts().map((post) => post.id));
    const indexableIds = new Set(getIndexablePosts().map((post) => post.id));

    assert.deepEqual(indexableIds, publishedIds);
    for (const stub of stubs) {
      assert.equal(publishedIds.has(stub.id), false);
      assert.equal(indexableIds.has(stub.id), false);
    }
  });

  it("gives every published guide a unique cover line", () => {
    const lines = getPublishedPosts().map((post) => blogCovers[post.slug]!.line);
    assert.equal(new Set(lines).size, lines.length);
  });
});
