import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

import { TextInput } from "./input";

afterEach(cleanup);

describe("the password eye", () => {
  it("shows and hides the password, without submitting the form", () => {
    const submit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={submit}>
        <TextInput label="Wachtwoord" type="password" data-testid="password-text-input" />
      </form>,
    );
    const input = screen.getByTestId("password-text-input") as HTMLInputElement;
    const eye = screen.getByTestId("password-visibility-toggle");
    expect(input.type).toBe("password");
    expect(eye.getAttribute("type")).toBe("button");
    expect(eye.getAttribute("aria-label")).toBe("showPassword");
    fireEvent.click(eye);
    expect(input.type).toBe("text");
    expect(eye.getAttribute("aria-label")).toBe("hidePassword");
    expect(eye.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(eye);
    expect(input.type).toBe("password");
    expect(submit).not.toHaveBeenCalled();
  });

  it("names the password input by its label text alone, never by the eye", () => {
    render(<TextInput label="Wachtwoord" type="password" data-testid="password-text-input" />);
    const input = screen.getByTestId("password-text-input");
    const eye = screen.getByTestId("password-visibility-toggle");
    expect(screen.getByLabelText("Wachtwoord")).toBe(input);
    // The eye sits inside the <label>. Chromium adds an embedded button's aria-label to the
    // wrapping label's name ("Wachtwoord Toon wachtwoord"); jsdom does not, so the name is
    // pinned by aria-labelledby: the label's text, without the eye.
    const id = input.getAttribute("aria-labelledby");
    const naming = id ? document.getElementById(id) : null;
    expect(naming?.textContent?.trim()).toBe("Wachtwoord");
    expect(naming?.contains(eye)).toBe(false);
    expect(input).toHaveAccessibleName("Wachtwoord");
    expect(eye).toHaveAccessibleName("showPassword");
  });

  it("is absent on other inputs", () => {
    render(<TextInput label="E-mailadres" type="email" />);
    expect(screen.queryByTestId("password-visibility-toggle")).toBeNull();
  });
});
