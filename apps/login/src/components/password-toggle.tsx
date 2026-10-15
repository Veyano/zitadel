"use client";

// Veyano: the show/hide eye on every password input (spec L2), rendered by TextInput.
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function PasswordToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  const t = useTranslations("common");
  const label = shown ? t("hidePassword") : t("showPassword");
  return (
    <button
      type="button"
      className="vy-eye"
      data-testid="password-visibility-toggle"
      aria-label={label}
      title={label}
      aria-pressed={shown}
      onClick={onToggle}
    >
      {shown ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
    </button>
  );
}
