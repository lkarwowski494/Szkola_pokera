// Sesja EL (rola 06): kontrola treści po recenzjach EJ (06-tresci-001…003) i EI (EI-001 do 06) oraz kolejce EF (KO-076).
// Użycie (z katalogu głównego repo): node docs/tresci/narzedzia/el-kontrola.mjs   → kod 0: wszystkie warunki spełnione, 1: braki.
// Dlaczego osobny skrypt, a nie test w tools/content-build/test: w sesji EL zakaz zmian w tools/ (równoległa sesja 08 EK);
// kontrola zastępcza według zasady 7 (wyjątek nazwany w docs/decyzje/EL.md, D-1219).
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url));
const YAML = require('yaml');

const bledy = [];
const ok = (warunek, opis) => { if (!warunek) bledy.push(opis); };
const regula = (jezyk, id) => YAML.parse(readFileSync(`content/${jezyk}/rules.yaml`, 'utf8')).find((r) => r.id === id);
const rejestr = JSON.parse(readFileSync('docs/tresci/rejestr/m5-m8.json', 'utf8'));
const wpis = (id) => rejestr.find((w) => w.id === id);

// NIS-002 (EJ 06-tresci-002): „2/3” z sekcji streszczenia AI strony nie jest źródłem.
for (const j of ['pl', 'en']) ok(!/2\/3/.test(regula(j, 'R-M6-007').source), `${j} R-M6-007: source zawiera „2/3” (streszczenie AI strony, EJ NIS-002)`);
ok(!/2\/3/.test(wpis('R-M6-007').uwagi ?? ''), 'rejestr R-M6-007: uwagi zawierają „2/3”');

// NIS-003 (EJ 06-tresci-003): R-M6-006 ma przeczytany cytat Upswing o backdoorach przy sprawdzaniu.
const UPSWING_BD = 'https://upswingpoker.com/backdoor-flush-straight-draw-tips/';
for (const j of ['pl', 'en']) {
  const r = regula(j, 'R-M6-006');
  ok(r.source.includes(UPSWING_BD) && /Unless you start calling with these non-made, backdoor plus overcard/.test(r.source), `${j} R-M6-006: brak cytatu Upswing o sprawdzaniu backdoorem z overkartą`);
  ok(r.sources.some((s) => s.url === UPSWING_BD), `${j} R-M6-006: sources bez adresu Upswing`);
}
ok(wpis('R-M6-006').zrodla.some((z) => z.adres === UPSWING_BD && /Unless you start calling/.test(z.cytat)), 'rejestr R-M6-006: brak cytatu Upswing (Tip 4)');

// EI-001 (b), D-1214: przesłanka R-M7-006 — silna ręka (najwyższa para albo lepsza) i draw, który po trafieniu wygrywa.
for (const j of ['pl', 'en']) {
  const r = regula(j, 'R-M7-006');
  ok(/\{\{t:top-pair/.test(r.if), `${j} R-M7-006: warunek bez „najwyższa para albo lepsza” (silna ręka)`);
  ok(j === 'pl' ? /po trafieniu/.test(r.if) : /when it hits/.test(r.if), `${j} R-M7-006: warunek bez żywego drawa („po trafieniu cię pokona”)`);
}
ok(/żyw/.test(wpis('R-M7-006').twierdzenie), 'rejestr R-M7-006: twierdzenie bez warunku żywych outów');

// KO-076 (D-1141, D-1215): poziom łatwy SC-06, SC-32, SC-33 z equityMarginMin 0.02 (wartość tylko w pl; bounds w en są kopią).
for (const j of ['pl', 'en']) for (const sc of ['sc-06', 'sc-32', 'sc-33']) {
  const t = YAML.parse(readFileSync(`content/${j}/scenarios/${sc}.yaml`, 'utf8'));
  ok(t.bounds?.latwy?.equityMarginMin === 0.02, `${j} ${sc}: poziom łatwy bez equityMarginMin 0.02`);
}

for (const b of bledy) console.log(`BRAK ${b}`);
console.log(`${bledy.length} braków`);
process.exitCode = bledy.length ? 1 : 0;
