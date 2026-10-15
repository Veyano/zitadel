#!/usr/bin/env bash
# Veyano: the upstream commits between two Zitadel tags that touch a file we changed.
#   apps/login/scripts/veyano-upstream-diff.sh v4.19.4 v4.20.0
# Reads the "Touched upstream files" list in apps/login/VEYANO.md. Prints "none" when
# no upstream commit touches them (then the upgrade is a plain cherry-pick).
set -euo pipefail
[ $# -eq 2 ] || { echo "usage: $0 <old tag> <new tag>" >&2; exit 2; }
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ROOT"
mapfile -t FILES < <(awk '/^## Touched upstream files/{on=1;next} /^## /{on=0} on' apps/login/VEYANO.md \
  | sed -n 's/^- `\([^`]*\)`.*/\1/p')
[ ${#FILES[@]} -gt 0 ] || { echo "no touched files listed in VEYANO.md" >&2; exit 2; }
out="$(git log --oneline "$1..$2" -- "${FILES[@]}")"
if [ -z "$out" ]; then echo none; else echo "$out"; fi
