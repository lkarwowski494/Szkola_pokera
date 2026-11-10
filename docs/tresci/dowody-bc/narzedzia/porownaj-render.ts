// KO-028 / D-520 (sesja BC): czy treść renderowana dla 12 języków jest identyczna przed i po zmianie terminu utg.
// Użycie (z katalogu tools/content-build): npx tsx <ten plik> <katalog content PRZED> <katalog content PO>
// Porównuje wynik compileContent bez pól `terms` (wpis terminu zmienia się celowo) i `hash` (skrót bazy liczony z terminów).
// Jednostka = każdy liść tekstowy wyniku (tytuł, akapit, opcja, wyjaśnienie, reguła…); wypisuje liczbę jednostek i różnice.
import { compileContent } from '../../../../tools/content-build/src/build';
const [przed, po] = process.argv.slice(2) as [string, string];
const J = ['pl', 'en', 'de', 'es', 'fr', 'it', 'pt', 'pt-BR', 'vi', 'ko', 'ja', 'zh-Hant'];
const liscie = (x: unknown, p: string, out: Map<string, string>) => {
  if (typeof x === 'string') out.set(p, x);
  else if (x && typeof x === 'object') for (const [k, v] of Object.entries(x)) liscie(v, `${p}.${k}`, out);
};
let suma = 0, roznic = 0;
console.log('| Język | jednostki tekstu (przed) | jednostki (po) | różne | wpis utg (po) |\n|---|---|---|---|---|');
for (const j of J) {
  const a = compileContent(przed, j) as Record<string, unknown>, b = compileContent(po, j) as Record<string, unknown>;
  const ma = new Map<string, string>(), mb = new Map<string, string>();
  for (const [k, v] of Object.entries(a)) if (k !== 'terms' && k !== 'hash') liscie(v, k, ma);
  for (const [k, v] of Object.entries(b)) if (k !== 'terms' && k !== 'hash') liscie(v, k, mb);
  const d = [...new Set([...ma.keys(), ...mb.keys()])].filter((k) => ma.get(k) !== mb.get(k));
  const utg = (b.terms as { key: string; pl: string; abbr?: string }[]).find((t) => t.key === 'utg');
  console.log(`| ${j} | ${ma.size} | ${mb.size} | ${d.length} | ${utg?.pl} / ${utg?.abbr} |`);
  for (const k of d.slice(0, 5)) console.log(`  RÓŻNICA ${j} ${k}: ${ma.get(k)} → ${mb.get(k)}`);
  suma += ma.size; roznic += d.length;
}
console.log(`\nRazem: ${suma} jednostek w 12 językach, różnych: ${roznic}.`);
process.exitCode = roznic ? 1 : 0;
