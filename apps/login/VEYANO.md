# Veyano login (fork of zitadel/zitadel apps/login)

Thin fork (KAN-128, spec docs/superpowers/specs/KAN-128-login-v2.md in the Veyano repo):
the split layout with photo, slogan, logo and Inter, plus a show/hide eye. Core Zitadel is
never changed; only `apps/login/` (MIT) and `.github/workflows/veyano-login.yml`.

## Release

| Branch | Upstream tag | Image tags (digest) |
|---|---|---|
| `veyano/v4.19.4` | `v4.19.4` (101343ad) | `v4.19.4-veyano.1` (sha256:b0a57f63198de2e3aafc2504b3bca8139a8db78d194b3ffe20be5f77a06433a0); `v4.19.4-veyano.2` (superseded the same day); `v4.19.4-veyano.3` (sha256:aecf899e0ab423da8bfe1d92d8ca05a5856f778fe07c996de44dd3020cef7681) |

## Our commits (on top of the tag)

1. Test loop: `scripts/veyano-test.sh`.
2. Layout: VeyanoShell (photo, slogan, logo), DynamicTheme as one step, no switches, Inter.
3. Eye: PasswordToggle in TextInput.
4. This file, the upstream check, the image workflow.
5. Tab title: the layout's title template "%s · Veyano" with the fixed default "Inloggen bij Veyano" (KAN-128 RT2 ruling, veyano.2 and .3).

## Touched upstream files

- `apps/login/src/app/(login)/layout.tsx` -- the shell, Inter, no language/theme switch, the title template "%s · Veyano"
- `apps/login/src/components/dynamic-theme.tsx` -- one left-aligned step, no card or logo
- `apps/login/src/app/global-error.tsx` -- the error page in the shell
- `apps/login/src/styles/globals.scss` -- one `@use "./veyano.scss"`
- `apps/login/src/components/input.tsx` -- renders PasswordToggle for type=password, and names a password input by its label text alone (`aria-labelledby`: browsers would add the eye's name)
- `apps/login/.env` -- NEXT_PUBLIC_APPLICATION_NAME=Veyano

## Added files (ours only)

- `apps/login/VEYANO.md`, `apps/login/scripts/veyano-test.sh`, `apps/login/scripts/veyano-upstream-diff.sh`
- `apps/login/src/components/veyano-shell.tsx` (+ test), `password-toggle.tsx` (+ test), `dynamic-theme.test.tsx`
- `apps/login/src/lib/veyano-asset.ts` (+ test), `apps/login/src/app/(login)/layout.veyano.test.ts`
- `apps/login/src/styles/veyano.scss`, `apps/login/src/assets/veyano/*`, `apps/login/src/fonts/*` (Inter, OFL.txt)
- `.github/workflows/veyano-login.yml`

## Deviations from the plan

- `globals.scss` has `@use "./veyano.scss";` BEFORE `@config`, because Sass requires `@use` to come first.
- `layout.veyano.test.ts` runs in the node vitest environment.

## Notes

1. `BackgroundWrapper`, `LanguageSwitcher` and `ThemeSwitch` are unused now; they are left in place to keep the diff small.
2. The upstream test `src/instrumentation.test.ts` ("verifies credentials on startup") can time out under full-suite load, on the plain tag too. If the image workflow fails only on it, re-run the job.
3. A local `docker build apps/login` on Windows cannot read pnpm's symlinks in `.next/standalone`. Workaround: stream the context from a Linux container: `docker run --rm -v <fork>/apps/login:/l:ro alpine tar -cf - -C /l Dockerfile .next/standalone | docker build -t veyano-login:local -`. CI builds on Linux and is unaffected.
4. `*.sh` must keep LF line endings (`core.autocrlf` on Windows).

## Upgrading to a new Zitadel release

1. `apps/login/scripts/veyano-upstream-diff.sh v4.19.4 v<new>`: every listed commit touches one of our files; read it.
2. `git checkout -b veyano/v<new> v<new>`, then cherry-pick our commits in order (fix conflicts by hand).
3. `apps/login/scripts/veyano-test.sh`, then push and tag `v<new>-veyano.1`; the workflow builds the image.
4. In the Veyano repo:
   - refresh the text key snapshot: `python infra/zitadel/upstream/extract_keys.py <fork>/apps/login/locales/en.json v<new> > infra/zitadel/upstream/login-locale-keys.json`, set `look.PINNED_RELEASE = "v<new>"`, run `pytest infra/zitadel/tests/test_look.py`, and fix every override key it reports;
   - set `ZITADEL_TAG`, `VEYANO_LOGIN_TAG` and `VEYANO_LOGIN_DIGEST` together; remote test first (spec §3.3).
