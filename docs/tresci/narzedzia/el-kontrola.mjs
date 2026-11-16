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

// KO-076 (D-1141, D-1215): warunkowe, czeka na 08-EL-4 (testy w tools/); włączyć flagą --ko076 po wdrożeniu.
if (process.argv.includes('--ko076')) for (const j of ['pl', 'en']) for (const sc of ['sc-06', 'sc-32', 'sc-33']) {
  const t = YAML.parse(readFileSync(`content/${j}/scenarios/${sc}.yaml`, 'utf8'));
  ok(t.bounds?.latwy?.equityMarginMin === 0.02, `${j} ${sc}: poziom łatwy bez equityMarginMin 0.02`);
}

// HU (D-1770…D-1773; recenzja HS 06-tresci-302, -305): kontrola zastępcza po stronie treści (sesja HU bez zmian w tools/, zasada 7).
const JEZYKI_SC = ['pl', 'en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'pt-BR', 'vi', 'zh-Hant'];
const liczby = YAML.parse(readFileSync('content/numbers.yaml', 'utf8'));
for (const j of JEZYKI_SC) {
  // D-1770 (= D-1752): SC-07 poziom średni (pas) tylko na flopach wysokich; warunek identyczny w każdym języku
  const s7 = YAML.parse(readFileSync(`content/${j}/scenarios/sc-07.yaml`, 'utf8'));
  ok(JSON.stringify(s7.bounds?.sredni?.flop?.height) === '["high"]', `${j} sc-07: poziom średni bez flop.height [high] (D-1752)`);
  // D-1771: SC-20 rozmiary zakładu na turnie = klucze ex.frac.* w tekście (ten sam korzeń co eq.bet-quarter / eq.bet-three-quarters)
  const s20 = YAML.parse(readFileSync(`content/${j}/scenarios/sc-20.yaml`, 'utf8'));
  const d = s20.decisions[0], akcja = (a) => d.actions.find((x) => x.action === a)?.explanation ?? '';
  ok(d.small === liczby['ex.frac.quarter'].value && d.big === liczby['ex.frac.three-quarters'].value, `${j} sc-20: small/big ≠ ex.frac.quarter/three-quarters`);
  ok(akcja('bet-small').includes('{{n:ex.frac.quarter}}') && akcja('bet-small').includes('{{n:eq.bet-quarter}}'), `${j} sc-20 bet-small: bez {{n:ex.frac.quarter}} i {{n:eq.bet-quarter}}`);
  ok(akcja('bet-big').includes('{{n:ex.frac.three-quarters}}') && akcja('bet-big').includes('{{n:eq.bet-three-quarters}}'), `${j} sc-20 bet-big: bez {{n:ex.frac.three-quarters}} i {{n:eq.bet-three-quarters}}`);
  ok(!/cbet\.size/.test(akcja('bet-small') + akcja('bet-big')), `${j} sc-20: klucz c-betu w zakładzie na turnie (D-1771)`);
}
for (const k of ['ex.frac.quarter', 'ex.frac.three-quarters']) ok(liczby[k].unit === 'percent', `numbers.yaml ${k}: jednostka ≠ percent (D-1771)`);
for (const k of ['eq.bet-quarter', 'eq.bet-three-quarters']) ok(liczby[liczby[k].refs[1]].refs.includes(k.replace('eq.bet-', 'ex.frac.')), `numbers.yaml ${k}: nie liczy z ex.frac.* (D-1771)`);

for (const b of bledy) console.log(`BRAK ${b}`);
console.log(`${bledy.length} braków`);
process.exitCode = bledy.length ? 1 : 0;
