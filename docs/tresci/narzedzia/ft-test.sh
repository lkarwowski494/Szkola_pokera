#!/usr/bin/env bash
# FT: uruchamia ft-test.ts dla pl i en; wynik do pliku $1 (dowód). Kod wyjścia 1, gdy którykolwiek język czerwony.
set -u
export NPM_CONFIG_UPDATE_NOTIFIER=false
OUT=$1; N=${2:-1000}
cd "$(git rev-parse --show-toplevel)/packages/poker-core" || exit 2
mkdir -p .ft-tmp && cp ../../docs/tresci/narzedzia/ft-test.ts .ft-tmp/
rc=0
{ echo "# FT test odtwarzający 06-tresci-001…005; commit $(git rev-parse --short HEAD)$(git diff --quiet HEAD -- ../../docs/tresci || echo ' + zmiany w docs/tresci'); $(date -u +%F)"
  for L in pl en; do
    echo "# komenda: cd packages/poker-core && npx tsx .ft-tmp/ft-test.ts ../../docs/tresci/szablony-robocze/fq/$L ../../docs/tresci/liczby-river-catch-defend.md $N"
    npx tsx .ft-tmp/ft-test.ts ../../docs/tresci/szablony-robocze/fq/$L ../../docs/tresci/liczby-river-catch-defend.md $N; r=$?
    echo "kod wyjścia ($L): $r"; [ $r -ne 0 ] && rc=1
  done; } > "../../$OUT" 2>&1
rm -rf .ft-tmp
echo "kod wyjścia łącznie: $rc" >> "../../$OUT"
exit $rc
