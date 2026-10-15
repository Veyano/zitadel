"use client";

import "@/styles/globals.scss";

import { Boundary } from "@/components/boundary";
import { Button } from "@/components/button";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Translated } from "@/components/translated";
import { VeyanoShell } from "@/components/veyano-shell";

// Veyano: the error page in the same split screen; no stack trace, only the message.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <ThemeWrapper branding={undefined}>
          <VeyanoShell>
            <Boundary labels={["Login"]} color="red">
              <div className="space-y-4">
                <div className="text-sm text-red-500 dark:text-red-500">{error?.message}</div>
                <div>
                  <Button data-i18n-key="error.tryagain" onClick={() => reset()}>
                    <Translated i18nKey="tryagain" namespace="error" />
                  </Button>
                </div>
              </div>
            </Boundary>
          </VeyanoShell>
        </ThemeWrapper>
      </body>
    </html>
  );
}
