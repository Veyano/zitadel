// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const dir = fileURLToPath(new URL(".", import.meta.url));
const src = readFileSync(join(dir, "layout.tsx"), "utf8");

describe("root layout (Veyano)", () => {
  it("has no language switch, no theme switch and no Google font", () => {
    expect(src).not.toMatch(/LanguageSwitcher|ThemeSwitch|next\/font\/google/);
  });
  it("brands every tab: a page's own title gets \" · Veyano\", the default is common.title", () => {
    // KAN-128 RT2 ruling (2026-10-16): "Welkom terug · Veyano"; "Inloggen bij Veyano" where a
    // page sets no title. A page's generateMetadata title passes through the parent template.
    expect(src).toMatch(/title:\s*\{\s*template:\s*"%s · Veyano",\s*default:\s*t\("title"\)\s*\}/);
  });
  it("wraps the pages and the loading fallback in the Veyano shell, with Inter", () => {
    expect(src.match(/<VeyanoShell>/g)?.length).toBe(2);
    expect(src).toMatch(/next\/font\/local/);
  });
});
