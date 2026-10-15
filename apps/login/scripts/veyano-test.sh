#!/usr/bin/env bash
# Veyano: the login app's unit tests in Docker (node 22, as upstream CI).
#   apps/login/scripts/veyano-test.sh                      # every unit test
#   apps/login/scripts/veyano-test.sh src/components/x.test.tsx ...
# The pnpm store and node_modules live in Docker volumes, not in the checkout.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
MSYS_NO_PATHCONV=1 docker run --rm \
  -v "$ROOT:/w" -w /w \
  -v veyano-zitadel-pnpm-store:/pnpm-store \
  -v veyano-zitadel-node-modules:/w/node_modules \
  -v veyano-zitadel-login-node-modules:/w/apps/login/node_modules \
  -e NX_NO_CLOUD=true -e CI=true \
  node:22 sh -c '
    corepack enable >/dev/null &&
    pnpm config set store-dir /pnpm-store >/dev/null &&
    pnpm install --frozen-lockfile >/dev/null &&
    pnpm nx run @zitadel/proto:generate >/dev/null &&
    pnpm nx run @zitadel/client:build >/dev/null &&
    cd apps/login && pnpm vitest --run "$@"' sh "$@"
