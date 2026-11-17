// IM (09 audit, 2026-11-17): znaczniki {{n:…}} i {{w:…}} w przekładach 7 szablonów HZ identyczne jak we wzorcu (pl i en).
// Dla każdego tekstu (situation, explanation każdej akcji w kolejności) porównuje multizbiór i kolejność znaczników n/w z pl;
// dodatkowo: en zgodne z pl (wzorzec spójny), zbiór kluczy {{t:}} jak w pl (informacyjnie, błąd), brak niedomkniętych/nieznanych znaczników.
// Użycie (z katalogu repo): node audit/im-przeklady-hz-2026-11-17/placeholdery.mjs ; kod 0 = brak błędów, 1 = błędy.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const YAML = createRequire(new URL('../../tools/content-build/package.json', import.meta.url))('yaml');
const SZ = ['sc-09', 'sc-16', 'sc-18', 'sc-21', 'sc-26', 'sc-27', 'sc-30'];
const JEZ = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'pt-BR', 'vi', 'zh-Hant'];
const W = new Set(['reka', 'stol', 'pozycja', 'rywal', 'spr', 'rozmiar', 'vpip']); // VARIANT_MARKERS, packages/poker-core/src/scenario-gen.ts:1368
const liczby = YAML.parse(readFileSync('content/numbers.yaml', 'utf8'));
const teksty = (t) => [['situation', t.situation], ...t.decisions.flatMap((d, i) => d.actions.map((a) => [`d${i}.${a.action}`, a.explanation]))];
const nw = (s) => [...s.matchAll(/\{\{([nw]):([^}]+)\}\}/g)].map((m) => `${m[1]}:${m[2]}`);
const tk = (s) => [...new Set([...s.matchAll(/\{\{t:([a-z0-9-]+)/g)].map((m) => m[1]))].sort().join(',');
let bledy = 0, porownan = 0;
const blad = (m) => { bledy++; console.log('BŁĄD', m); };
for (const id of SZ) {
  const pl = YAML.parse(readFileSync(`content/pl/scenarios/${id}.yaml`, 'utf8'));
  const tp = teksty(pl);
  for (const [, s] of tp) for (const z of nw(s)) { const [r, k] = [z[0], z.slice(2)]; if (r === 'w' && !W.has(k)) blad(`pl/${id}: nieznany {{w:${k}}}`); if (r === 'n' && !(k in liczby)) blad(`pl/${id}: brak klucza ${k} w numbers.yaml`); }
  for (const j of JEZ) {
    const t = YAML.parse(readFileSync(`content/${j}/scenarios/${id}.yaml`, 'utf8'));
    const tt = teksty(t);
    if (tt.length !== tp.length || tt.some(([e], i) => e !== tp[i][0])) { blad(`${j}/${id}: inna lista tekstów (${tt.map((x) => x[0])} ≠ ${tp.map((x) => x[0])})`); continue; }
    tp.forEach(([etk, s], i) => {
      porownan++;
      const u = tt[i][1];
      const a = nw(s), b = nw(u);
      if ([...a].sort().join(' ') !== [...b].sort().join(' ')) blad(`${j}/${id} ${etk}: multizbiór n/w [${b}] ≠ pl [${a}]`);
      else if (a.join(' ') !== b.join(' ')) console.log(`INFO ${j}/${id} ${etk}: inna kolejność n/w (szyk języka) [${b}] vs pl [${a}]`);
      if (tk(u) !== tk(s)) blad(`${j}/${id} ${etk}: klucze t [${tk(u)}] ≠ pl [${tk(s)}]`);
      const reszta = u.replace(/\{\{[ntw]:[^{}]+\}\}/g, '');
      if (/\{\{|\}\}/.test(reszta)) blad(`${j}/${id} ${etk}: niedomknięty albo zniekształcony znacznik`);
    });
  }
}
console.log(`${porownan} tekstów porównanych (${SZ.length} szablonów × ${JEZ.length} języków względem pl), ${bledy} błędów`);
process.exit(bledy ? 1 : 0);
