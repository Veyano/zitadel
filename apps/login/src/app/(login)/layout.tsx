import "@/styles/globals.scss";

import { LanguageProvider } from "@/components/language-provider";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import { VeyanoShell } from "@/components/veyano-shell";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import React, { Suspense } from "react";

// Veyano: Inter, self-hosted and bundled (the login's CSP allows same-origin fonts only).
const inter = localFont({
  src: [
    { path: "../../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Veyano: every tab carries the brand -- a page's own title becomes "Welkom terug · Veyano";
// a page without one shows common.title ("Inloggen bij Veyano").
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: { template: "%s · Veyano", default: t("title") } };
}

// Veyano: no language switch (the browser's language decides) and no theme switch (the
// OS colour scheme decides); every page sits in the split screen.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <VeyanoShell>
                  <Skeleton>
                    <div className="h-40"></div>
                  </Skeleton>
                </VeyanoShell>
              }
            >
              <LanguageProvider>
                <VeyanoShell>{children}</VeyanoShell>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
