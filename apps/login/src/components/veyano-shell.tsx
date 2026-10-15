// Veyano: the login's split screen (mockup v10.61). The form column on the left
// (minmax(480px, 25%)), the photo with the slogan on the right; one column below 900px.
import logoMark from "@/assets/veyano/logo-mark.svg";
import photo from "@/assets/veyano/login-photo.webp";
import { assetUrl } from "@/lib/veyano-asset";
import { Fragment, ReactNode } from "react";

export const SLOGAN_LINES = ["Meer inzicht.", "Minder handwerk.", "Meer tijd voor wat", "er echt toe doet."];

export function VeyanoShell({ children }: { children: ReactNode }) {
  return (
    <div className="vy-login">
      <main className="vy-form">
        <div className="vy-box">
          <div className="vy-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl(logoMark as any)} alt="Veyano" />
            <span aria-hidden="true">eyano</span>
          </div>
          {children}
        </div>
      </main>
      <aside className="vy-photo" aria-hidden="true" style={{ backgroundImage: `url("${assetUrl(photo as any)}")` }}>
        <p className="vy-slogan">
          {"“"}
          {SLOGAN_LINES.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
          {"”"}
        </p>
      </aside>
    </div>
  );
}
