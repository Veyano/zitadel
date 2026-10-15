"use client";

import { useResponsiveLayout } from "@/lib/theme-hooks";
import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import React, { Children, ReactNode } from "react";
import { ThemeWrapper } from "./theme-wrapper";

/**
 * Veyano: every page's [title block, form] as one left-aligned step inside the Veyano
 * shell's form column (VeyanoShell, root layout). The logo is the shell's; branding still
 * feeds the colours through ThemeWrapper. A children function always gets false (no
 * side-by-side card any more).
 */
export function DynamicTheme({
  branding,
  children,
}: {
  children: ReactNode | ((isSideBySide: boolean) => ReactNode);
  branding?: BrandingSettings;
}) {
  useResponsiveLayout(); // kept: upstream pages may rely on its side effects
  const actualChildren: ReactNode = React.useMemo(
    () => (typeof children === "function" ? (children as (s: boolean) => ReactNode)(false) : children),
    [children],
  );
  const parts = Children.toArray(actualChildren);
  return (
    <ThemeWrapper branding={branding}>
      <div className="vy-step">
        {parts.length > 1 ? (
          <>
            <div className="vy-step-head">{parts[0]}</div>
            <div className="vy-step-body space-y-6">{parts.slice(1)}</div>
          </>
        ) : (
          <div className="vy-step-body space-y-6">{parts}</div>
        )}
      </div>
    </ThemeWrapper>
  );
}
