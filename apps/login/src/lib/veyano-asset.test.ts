import { afterEach, describe, expect, it } from "vitest";
import { assetUrl, withBasePath } from "./veyano-asset";

describe("withBasePath", () => {
  const old = process.env.NEXT_PUBLIC_BASE_PATH;
  afterEach(() => { process.env.NEXT_PUBLIC_BASE_PATH = old; });

  it("prefixes a root-relative URL once", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/ui/v2/login";
    expect(withBasePath("/_next/static/media/p.webp")).toBe("/ui/v2/login/_next/static/media/p.webp");
    expect(withBasePath("/ui/v2/login/_next/static/media/p.webp")).toBe("/ui/v2/login/_next/static/media/p.webp");
  });

  it("leaves a URL alone without a base path", () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    expect(withBasePath("/x.webp")).toBe("/x.webp");
  });

  it("reads Next's static import object and vite's string alike", () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/ui/v2/login";
    expect(assetUrl({ src: "/_next/static/media/p.webp" })).toBe("/ui/v2/login/_next/static/media/p.webp");
    expect(assetUrl("/src/assets/p.webp")).toBe("/ui/v2/login/src/assets/p.webp");
  });
});
