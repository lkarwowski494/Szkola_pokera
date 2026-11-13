#!/usr/bin/env bash
# HD (06, audit): mutanty D-1566 na kopii roboczej (git worktree @ 0d59a42), testy gb-303 i fv-d1461. Użycie: hd-mutanty-d1566.sh <katalog worktree>
set -u; W=$1; F=$W/tools/content-build/src/build.ts; cd $W/tools/content-build
run() { npx vitest run test/gb-303-zarezerwowane-uzyta.test.ts test/fv-d1461-cena-dwoch-trzecich.test.ts 2>&1 | grep -E "✓|×|Test Files|Tests " | sed 's/^/    /'; }
echo "== M0 bez zmian (oczekiwane: oba zielone)"; run
cp $F $F.orig
sed -i 's/      if (used.has(key)) warnings.push(`liczba ${key} jest już używana: usuń ją z LICZBY_ZAREZERWOWANE (build.ts)`);/      \/\/ M2/' $F
echo "== M2 bez gałęzi ostrzeżenia (oczekiwane: gb-303 czerwony)"; grep -c "// M2" $F; run; cp $F.orig $F
sed -i 's/const powod = (opts.liczbyZarezerwowane ?? LICZBY_ZAREZERWOWANE)\[key\];/const powod = LICZBY_ZAREZERWOWANE[key]; \/\/ M3/' $F
echo "== M3 opcja ignorowana (oczekiwane: gb-303 czerwony)"; grep -c "// M3" $F; run; cp $F.orig $F
sed -i "s|export const LICZBY_ZAREZERWOWANE: Readonly<Record<string, string>> = {};.*|export const LICZBY_ZAREZERWOWANE: Readonly<Record<string, string>> = { 'ex.frac.two-thirds': 'M4', 'ex.bet.two-thirds': 'M4', 'eq.bet-two-thirds': 'M4' };|" $F
echo "== M4 wpisy D-1461 przywrócone (oczekiwane: fv-d1461 czerwony)"; grep -c "'M4'" $F; run; cp $F.orig $F; rm $F.orig
cd $W && git status --porcelain
