#!/usr/bin/env bash
# Zrzuty ekranu iPhone'a do App Store Connect z symulatora (K-12, D-337; workflow store-screenshots.yml, tylko ręcznie).
# Wzór: Trening scripts/ci/store-screenshots.sh (2e4b0f8, odczyt 2026-11-09) — stan aplikacji zapisany w jej bazie przed każdym ekranem,
# ekran otwierany łączem aplikacji (schemat „szkolapokera”, trasy expo-router), zrzut `simctl io screenshot`, pasek stanu 9:41.
# Dane pokazowe: scripts/ci/dane-pokazowe.mjs (packages/postep, ten sam schemat i migracje co aplikacja) → Documents/SQLite/postep.db
# kontenera aplikacji (katalog baz expo-sqlite, apps/mobile/src/data/postepExpo.ts:107). Język: ustawienie „jezyk” w danych pokazowych
# (aplikacja stosuje zapisany język przed treścią, D-328) i -AppleLanguages przy uruchomieniu (okna systemowe w tym języku).
# Odstępstwa od Treningu (nazwane): bez akcji Maestro i podziału na zadania (5 ekranów × 2 języki), bez ramek i podpisów (decyzja 04/właściciela).
# W logu tylko nazwy plików i liczby (repo publiczne — bez identyfikatorów urządzeń).
# Użycie: bash scripts/ci/zrzuty-sklepu.sh <UDID> <katalog_wyjściowy> <języki po przecinku> [ekrany|przeglad]
set -euo pipefail
UDID="$1"; OUT="$2"; LANGS="$3"; ZESTAW="${4:-ekrany}"
BUNDLE="pl.lkarwowski.szkolapokera"; SCHEMAT="szkolapokera"
DIR="$(cd "$(dirname "$0")" && pwd)"
LISTA="$DIR/zrzuty-sklepu.json"
mkdir -p "$OUT"
xcrun simctl status_bar "$UDID" override --time "9:41" --dataNetwork wifi --wifiMode active --wifiBars 3 --cellularMode active --cellularBars 4 --batteryState charged --batteryLevel 100 >/dev/null 2>&1 || echo "::warning::Nie udało się ustawić paska stanu"
N=0; FAILED=0
for lang in ${LANGS//,/ }; do
  mkdir -p "$OUT/$lang"
  while IFS=$'\t' read -r name route; do
    xcrun simctl terminate "$UDID" "$BUNDLE" >/dev/null 2>&1 || true
    C=$(xcrun simctl get_app_container "$UDID" "$BUNDLE" data)
    rm -f "$C/Documents/SQLite/postep.db" "$C/Documents/SQLite/postep.db-wal" "$C/Documents/SQLite/postep.db-shm"
    node "$DIR/dane-pokazowe.mjs" "$C/Documents/SQLite" "$lang" >/dev/null
    xcrun simctl launch "$UDID" "$BUNDLE" -AppleLanguages "($lang)" >/dev/null
    sleep 8   # zimny start: ekran startowy, kopia bazy treści przy pierwszym uruchomieniu, odczyt postępu
    if [ "$route" != "/" ]; then xcrun simctl openurl "$UDID" "$SCHEMAT://${route#/}"; sleep 3; fi
    if xcrun simctl io "$UDID" screenshot "$OUT/$lang/$name.png" >/dev/null 2>&1 && [ -s "$OUT/$lang/$name.png" ]; then N=$((N+1)); echo "$lang/$name.png"
    else FAILED=$((FAILED+1)); echo "::warning::Brak zrzutu $lang/$name"; fi
  done < <(node -e 'const l=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); for (const e of l[process.argv[2]]) console.log(e.nazwa+"\t"+e.trasa)' "$LISTA" "$ZESTAW")
done
echo "zrzutów: $N, nieudanych: $FAILED"
[ "$FAILED" -eq 0 ]
