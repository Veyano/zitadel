import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SLOGAN_LINES, VeyanoShell } from "./veyano-shell";

describe("VeyanoShell", () => {
  it("puts the page in the form column, with the logo above it", () => {
    const { container } = render(<VeyanoShell><h1>Inloggen</h1></VeyanoShell>);
    const box = container.querySelector(".vy-form .vy-box")!;
    expect(box.querySelector(".vy-logo")).toBeTruthy();
    expect(box.textContent).toContain("eyano");
    expect(box.querySelector("h1")?.textContent).toBe("Inloggen");
  });

  it("shows the photo panel with the quoted slogan, hidden from screen readers", () => {
    const { container } = render(<VeyanoShell><p>x</p></VeyanoShell>);
    const photo = container.querySelector(".vy-photo") as HTMLElement;
    expect(photo.getAttribute("aria-hidden")).toBe("true");
    expect(photo.style.backgroundImage).toContain("login-photo");
    const slogan = photo.querySelector(".vy-slogan")!.textContent!;
    expect(slogan.startsWith("\u201C")).toBe(true);
    expect(slogan.endsWith("\u201D")).toBe(true);
    for (const line of SLOGAN_LINES) expect(slogan).toContain(line);
  });

  it("has no language or theme switch", () => {
    render(<VeyanoShell><p>x</p></VeyanoShell>);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.querySelector("[data-testid='theme-switch']")).toBeNull();
  });
});
