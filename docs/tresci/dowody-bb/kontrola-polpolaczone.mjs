// Kontrola Z-1/Z-2 (KO-029, D-510): wyjaśnienia, które wyświetlają się na flopach półpołączonych
// (strit niemożliwy, content/terms.yaml „semi-connected”), nie mogą mówić o stricie ani o braku przewagi nutsów
// bez zawężenia do flopu połączonego. Klucze terminów ({{t:straight…}}, {{t:connected…}}) są wspólne dla 12 języków.
// Reguła: każde zdanie z {{t:straight lub {{t:nuts-advantage w tekście dla przypadku z semi-connected
// musi zawierać {{t:connected (kwalifikator) albo {{t:semi-connected (zdanie mówi wprost o flopie półpołączonym).
// Użycie: node docs/tresci/dowody-bb/kontrola-polpolaczone.mjs  → kod 0 brak naruszeń, 1 są.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = 'content';
const langs = readdirSync(root).filter((d) => statSync(join(root, d)).isDirectory() && d !== 'ranges');
const zdania = (s) => s.split(/(?<=[.!?。！？])\s*/u).filter((z) => z.trim());
const ok = (z) => !/\{\{t:(straight|nuts-advantage)[|}]/.test(z) || /\{\{t:(connected|semi-connected)[|}]/.test(z);
let bledy = 0, sprawdzone = 0;
for (const L of langs) {
  const pliki = [join(root, L, 'rules.yaml'), ...readdirSync(join(root, L, 'lessons')).map((f) => join(root, L, 'lessons', f))];
  for (const f of pliki) {
    const linie = readFileSync(f, 'utf8').split('\n');
    let wPrzypadku = false, wRegule = false;
    linie.forEach((l, i) => {
      if (/^\s*- when:/.test(l)) wPrzypadku = /semi-connected/.test(l);
      else if (/^\s*(count:|- kind:|---)/.test(l)) wPrzypadku = false;
      if (/^- id: /.test(l)) wRegule = /R-M5-004\b/.test(l);
      const m = (wPrzypadku && l.match(/^\s*(check|small|big): "(.*)"\s*$/)) || (wRegule && l.match(/^\s*(because): "(.*)"\s*$/));
      if (!m) return;
      sprawdzone++;
      for (const z of zdania(m[2])) if (!ok(z)) { bledy++; console.log(`BŁĄD ${f}:${i + 1} (${m[1]}): „${z.slice(0, 120)}”`); }
    });
  }
}
console.log(`${langs.length} języków, ${sprawdzone} tekstów, ${bledy} naruszeń`);
process.exit(bledy ? 1 : 0);
