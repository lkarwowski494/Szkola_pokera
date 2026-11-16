#!/usr/bin/env bash
# HISTORYCZNE (ID, D-1860, 2026-11-16): katalog hz/ przeniesiony do content/ i usunięty; kontrola szablonów = pnpm content:build / content:check (bramka ekranu IB). Skrypt działał na c478cfa6.
# HZ (06, D-1826): kontrola szablonów roboczych docs/tresci/szablony-robocze/hz/{pl,en} pełną kompilacją treści (checkScenarioTemplate, checkScenarioGenerator ≥ 40 odcisków,
# znaczniki terminów, rejestr, 35 baz) na KOPII tymczasowej: content/ + szablony hz + liczby-hz.yaml w katalogu tymczasowym, src content-build skopiowane do
# tools/content-build/.hz-kopia (usuwane na wyjściu) z bramką ekranu otwartą tak, jak zrobi to rola 08 (5 rodzajów HO + iso-size). Kod repo i content/ bez zmian.
# Dodatkowo: liczba odcisków na poziom i (SC-30) margines pasu dla każdej wylosowanej klasy ręki przy VPIP 0,08 / 0,09 / 0,10.
# SC-30: odcisk = klasa ręki (vpips ma jedną wartość), a klas z pasem przy całym zakresie VPIP jest mniej niż POJEMNOSC_MIN; skrypt emuluje opcję A
# z PYTANIA do koordynatora (wyjątek pojemności min(40, liczba klas) jak D-1040) i wypisuje to jawnie (linia „HZ EMULACJA”), żeby sprawdzić resztę kompilacji.
# Rejestr: kopia docs/tresci z wpisami hz/bez-twierdzen-hz.json (dane zadania SC-30), do dopisania w docs/tresci/rejestr/bez-twierdzen.json przy przeniesieniu.
# Użycie (z katalogu repo): bash docs/tresci/narzedzia/hz-kontrola-szablonow.sh ; kod 0 = kompilacja bez błędów.
set -euo pipefail
R=$(cd "$(dirname "$0")/../../.." && pwd)
H="$R/docs/tresci/szablony-robocze/hz"
K="$R/tools/content-build/.hz-kopia"
T=$(mktemp -d)
trap 'rm -rf "$K" "$T"' EXIT
rm -rf "$K"; cp -r "$R/tools/content-build/src" "$K"
cp -r "$R/content" "$T/content"
mkdir -p "$T/tools/equity" && cp "$R/tools/equity/equity169.json" "$T/tools/equity/"
for j in "$H"/*/; do j=$(basename "$j"); cp "$H/$j"/sc-*.yaml "$T/content/$j/scenarios/"; done
grep -v '^#' "$H/liczby-hz.yaml" >> "$T/content/numbers.yaml"
mkdir -p "$T/docs" && cp -r "$R/docs/tresci" "$T/docs/tresci"
python3 - "$T/docs/tresci/rejestr/bez-twierdzen.json" "$H/bez-twierdzen-hz.json" <<'PY'
import json,sys
a=json.load(open(sys.argv[1])); a+=json.load(open(sys.argv[2])); json.dump(a,open(sys.argv[1],'w'),ensure_ascii=False,indent=1)
PY
python3 - "$K/scenariusze.ts" <<'PY'
import sys
f=sys.argv[1]; s=open(f).read()
def r(a,b):
    global s
    assert s.count(a)==1,a; s=s.replace(a,b)
r("'list-hand', 'river-value'];","'list-hand', 'river-value', 'spr-call', 'geo-size', 'turn-action', 'check-raise', 'nit-3bet'];")
r("if (d.kind === 'size-spot' && d.check === 'iso-size') {","if (false) {")
r("for (let seed = 1; seed <= proby; seed++) odciski.add(generateVariant(g, level, seed, ctx).fingerprint);",
  "for (let seed = 1; seed <= proby; seed++) { const v = generateVariant(g, level, seed, ctx); odciski.add(v.fingerprint); hzZapis(t.id, v, ctx); }")
r("    if (odciski.size < prog) e.push(", "    if (/^sc-(09|16|18|21|26|27|30)$/.test(t.id)) console.log(`HZ odciski ${t.id} ${level}: ${odciski.size} (próg ${prog}, losowań ${proby})`);\n    if (t.id === 'sc-30' && pierwszy?.kind === 'nit-3bet' && odciski.size < prog) { console.log(`HZ EMULACJA opcji A (PYTANIE do 08): sc-30 próg min(${prog}, liczba klas) = ${odciski.size}; bez wyjątku pojemności to BŁĄD ${odciski.size} < ${prog}`); prog = odciski.size; }\n    if (odciski.size < prog) e.push(")
s += '''
import { equityVsRange as hzEq, topRangeClasses as hzTop } from '@szkola/poker-core';
const hzNit = new Map<string, { req: number; m: Record<string, number | 'w zakresie'> }>();
function hzZapis(id: string, v: { points: readonly unknown[] }, ctx?: GeneratorContext): void {
  for (const p0 of v.points) {
    const p = p0 as { point: string; handClass?: string; required?: number };
    if (id !== 'sc-30' || p.point !== 'nit-3bet' || !ctx?.equity169 || hzNit.has(p.handClass!)) continue;
    const m: Record<string, number | 'w zakresie'> = {};
    for (const x of [0.08, 0.09, 0.1]) {
      const top = hzTop(ctx.equity169, x);
      m[String(x)] = top.has(p.handClass!) ? 'w zakresie' : p.required! - hzEq(ctx.equity169, p.handClass!, HAND_CLASSES.map((c) => (top.has(c) ? 1 : 0)));
    }
    hzNit.set(p.handClass!, { req: p.required!, m });
  }
}
export function hzRaportNit(): string[] {
  return [...hzNit.entries()].sort().map(([hc, { req, m }]) => `${hc}\\tcena ${req.toFixed(4)}\\t` + Object.entries(m).map(([x, v]) => `VPIP ${x}: ${typeof v === 'number' ? `margines ${v.toFixed(4)}${v < 0.03 - 1e-12 ? ' PONIŻEJ 0,03' : ''}` : v}`).join('\\t'));
}
'''
open(f,'w').write(s)
PY
cat > "$K/hz.ts" <<'TS'
import { compileAll } from './build';
import { hzRaportNit } from './scenariusze';
const [content, registryDir] = process.argv.slice(2);
const tresci = compileAll(content!, { registryDir });
const pl = tresci.find((c) => c.locale === 'pl')!;
const hz = (pl.scenarios ?? []).filter((s) => /^sc-(09|16|18|21|26|27|30)$/.test(s.id));
console.log(`HZ kompilacja: ${tresci.length} baz bez błędów; szablony HZ w bazie pl: ${hz.map((s) => `${s.id} [${s.levels.join(', ')}]`).join('; ')}`);
const nit = hzRaportNit();
console.log(`HZ SC-30: ${nit.length} klas rąk z generatora; margines pasu (cena − equity wobec górnych x%) przy każdym VPIP z zakresu:`);
for (const w of nit) console.log(`  ${w}`);
const zle = nit.filter((w) => /PONIŻEJ|w zakresie/.test(w));
console.log(zle.length ? `HZ SC-30: ${zle.length} klas z marginesem < 0,03 albo w zakresie rywala przy którymś VPIP` : 'HZ SC-30: pas z marginesem ≥ 0,03 dla każdej klasy przy VPIP 0,08, 0,09 i 0,10');
if (zle.length) process.exit(2);
TS
cd "$R/tools/content-build" && npx tsx .hz-kopia/hz.ts "$T/content" "$T/docs/tresci"
