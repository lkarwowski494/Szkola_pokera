// BX (rola 06 fix, BN-M12-1…4): porównanie egzaminu przed/po i kontrola wzorca D-565 (sens przed rachunkiem).
// Użycie (z katalogu głównego repo): node docs/tresci/narzedzia/bx-porownaj-egzamin.mjs <baza-git> <plik.yaml> <id:opcja>...
// Kontrole: (1) każde pytanie i opcja: te same pola poza `why` wskazanych opcji, ta sama poprawna odpowiedź,
// ten sam zbiór kluczy {{n:}} w każdym `why`; (2) we wskazanych opcjach pierwsze zdanie `why` bez wzoru
// (bez =, ÷, ×, ≈, √) i zdanie z rachunkiem po nim. Kod wyjścia: 0 zgodne, 1 niezgodności.
// Dlaczego: przeróbka D-565 zmienia kolejność i słowa, nie decyzję ani liczby (przewodnik KO-040 §2).
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url));
const YAML = require('yaml');
const [baza, plik, ...cele] = process.argv.slice(2);
const przed = YAML.parse(execFileSync('git', ['show', `${baza}:${plik}`], { encoding: 'utf8' })).drills;
const po = YAML.parse(readFileSync(plik, 'utf8')).drills;
const klucze = (s) => [...(s ?? '').matchAll(/\{\{n:([^}]+)\}\}/g)].map((m) => m[1]).sort().join(',');
const WZOR = /[=÷×≈√]/;
const bledy = [], wiersze = [];
if (przed.length !== po.length) bledy.push(`liczba pytań ${przed.length} → ${po.length}`);
const linie = readFileSync(plik, 'utf8').split('\n');
for (const [i, a] of przed.entries()) {
  const b = po[i];
  const { options: oa, ...ra } = a, { options: ob, ...rb } = b ?? {};
  if (JSON.stringify(ra) !== JSON.stringify(rb)) bledy.push(`${a.id}: pola pytania zmienione`);
  for (const [k, x] of oa.entries()) {
    const y = ob?.[k] ?? {}, cel = cele.includes(`${a.id}:${k}`);
    const nr = linie.findIndex((l) => y.text && l.includes(`text: ${JSON.stringify(y.text)}`)) + 1;
    const { why: wa, ...xa } = x, { why: wb, ...yb } = y;
    if (JSON.stringify(xa) !== JSON.stringify(yb)) bledy.push(`${a.id}:${k}: text albo correct zmienione`);
    if (klucze(wa) !== klucze(wb)) bledy.push(`${a.id}:${k}: klucze {{n:}} w why: ${klucze(wa)} → ${klucze(wb)}`);
    if (!cel && wa !== wb) bledy.push(`${a.id}:${k}: why zmienione poza zakresem`);
    if (cel) {
      const pierwsze = (wb ?? '').split(/(?<=[.!?])\s+/)[0];
      const okSens = !WZOR.test(pierwsze) && WZOR.test((wb ?? '').slice(pierwsze.length));
      if (!okSens) bledy.push(`${a.id}:${k} (l.${nr}): pierwsze zdanie why to rachunek, nie sens: „${pierwsze.slice(0, 70)}”`);
      wiersze.push(`${plik}:${nr} ${a.id}:${k} klucze ${klucze(wa) === klucze(wb) ? 'ZGODNE' : 'RÓŻNE'}, poprawna ${x.correct === y.correct ? 'ZGODNA' : 'RÓŻNA'}, pierwsze zdanie ${okSens ? 'SENS' : 'RACHUNEK'}, why ${wa === wb ? 'BEZ ZMIAN' : 'ZMIENIONE'}`);
    }
  }
}
for (const w of wiersze) console.log(w);
for (const b of bledy) console.log(`BŁĄD ${b}`);
console.log(`niezgodności: ${bledy.length}`);
process.exitCode = bledy.length ? 1 : 0;
