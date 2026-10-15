import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("./theme-wrapper", () => ({ ThemeWrapper: ({ children }: any) => <>{children}</> }));
vi.mock("@/lib/theme-hooks", () => ({ useResponsiveLayout: () => ({ isSideBySide: true }) }));

import { DynamicTheme } from "./dynamic-theme";

describe("DynamicTheme (Veyano)", () => {
  it("renders the title block and the form as one left-aligned step, without a card or logo", () => {
    const { container } = render(
      <DynamicTheme branding={{ lightTheme: { logoUrl: "/logo.png" } } as any}>
        <div><h1>Inloggen</h1></div>
        <form />
      </DynamicTheme>,
    );
    expect(container.querySelector(".vy-step .vy-step-head h1")?.textContent).toBe("Inloggen");
    expect(container.querySelector(".vy-step .vy-step-body form")).toBeTruthy();
    expect(container.querySelector("img")).toBeNull();
  });

  it("calls a children function with the side-by-side flag false", () => {
    const fn = vi.fn(() => <p>x</p>);
    render(<DynamicTheme>{fn}</DynamicTheme>);
    expect(fn).toHaveBeenCalledWith(false);
  });
});
