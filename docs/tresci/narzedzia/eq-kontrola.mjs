// Sesja EQ (rola 06, fix): kontrola poprawek 06-tresci-001 i 06-tresci-002 z recenzji EO (docs/tresci/recenzje/recenzja-el-f5780bb3.md).
// Użycie (z katalogu głównego repo): node docs/tresci/narzedzia/eq-kontrola.mjs   → kod 0: wszystkie warunki spełnione, 1: braki.
// Dlaczego osobny skrypt, a nie test w tools/content-build/test: polecenie EQ zakazuje zmian w tools/ (to obszar 08);
// ten sam wyjątek nazwany co D-1219 (zapis: D-1257 w docs/decyzje/EQ.md); przeniesienie do CI: zadanie 08-EL-3.
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url));
const YAML = require('yaml');

const bledy = [];
const ok = (warunek, opis) => { if (!warunek) bledy.push(opis); };
const regula = (jezyk, id) => YAML.parse(readFileSync(`content/${jezyk}/rules.yaml`, 'utf8')).find((r) => r.id === id);
const plik = (sciezka) => readFileSync(sciezka, 'utf8');
const rejestr = JSON.parse(plik('docs/tresci/rejestr/m5-m8.json'));
const wpis = (id) => rejestr.find((w) => w.id === id);
const stan = existsSync('docs/tresci/stan-eq.md') ? plik('docs/tresci/stan-eq.md') : '';

// 06-tresci-001: „silna ręka” w R-M7-006 = najwyższa para z dobrym kickerem albo lepsza (źródło: „strong top pairs and better”),
// spójnie z m7-l2 (najwyższa para ze słabym kickerem = średnia ręka).
const KONEKTED = 'https://pokercoaching.com/blog/bet-sizing-on-connected-boards-pot-it-or-slow-down/';
for (const j of ['pl', 'en']) {
  const r = regula(j, 'R-M7-006');
  ok(j === 'pl' ? /\{\{t:top-pair[^}]*\}\} z dobrym \{\{t:kicker/.test(r.if) : /\{\{t:top-pair\}\} with a good \{\{t:kicker/.test(r.if),
    `${j} R-M7-006: warunek bez „najwyższa para z dobrym kickerem” (06-tresci-001)`);
  ok(!(j === 'pl' ? /silna = najwyższa para i lepsze/ : /strong = top pair and better/).test(r.source),
    `${j} R-M7-006: source nadal definiuje silną rękę jako każdą najwyższą parę (06-tresci-001)`);
}
ok(/\{\{t:top-pair\|Najwyższa para\}\} ze słabym kickerem to średnia ręka/.test(plik('content/pl/lessons/m7-l2-polaryzacja.md')),
  'pl m7-l2: zniknęło zdanie o TPWK jako średniej ręce (punkt odniesienia 06-tresci-001)');
const w7 = wpis('R-M7-006');
ok(/z dobrym kickerem/.test(w7.twierdzenie), 'rejestr R-M7-006: twierdzenie bez „z dobrym kickerem”');
ok(w7.zrodla.some((z) => z.adres === KONEKTED && /strong top pairs and better/.test(z.cytat) && z.odczyt === '2026-11-12' && /Tip #2/.test(z.miejsce)),
  'rejestr R-M7-006: brak cytatu „strong top pairs and better” (Tip #2) z odczytem 2026-11-12');
ok(/08-EL-1/.test(stan) && /kicker/.test(stan) && /K♥4♣/.test(stan), 'stan-eq.md: brak specyfikacji filtra 08-EL-1 bez TPWK');

// 06-tresci-002: backdoor → sprawdzenie tylko z co najmniej jedną overkartą (źródło: „backdoor plus overcard”, BB wobec SB).
const UPSWING_BD = 'https://upswingpoker.com/backdoor-flush-straight-draw-tips/';
for (const j of ['pl', 'en']) {
  const r = regula(j, 'R-M6-006');
  ok(j === 'pl' ? /kartą wyższą od (wszystkich )?kart \{\{t:board/.test(r.then) : /card higher than (every|all) \{\{t:board/.test(r.then),
    `${j} R-M6-006: then bez warunku overkarty przy backdoorze (06-tresci-002)`);
  ok(!/wysokimi kartami z dodatkowym|high cards with an additional/.test(r.then), `${j} R-M6-006: then nadal „wysokimi kartami z dodatkowym drawem”`);
  ok(j === 'pl' ? /blind vs blind|BB wobec c-betu SB/.test(r.source) : /blind vs blind|BB vs an SB c-bet/.test(r.source), `${j} R-M6-006: source bez zakresu źródła (BB wobec SB)`);
  const lekcja = plik(`content/${j}/lessons/m6-l2-sprawdzenie.md`);
  ok(j === 'pl' ? !/^- wysokimi kartami z dodatkowym/m.test(lekcja) : !/^- high cards with a backdoor/m.test(lekcja), `${j} m6-l2: lista „Czym sprawdzasz” bez warunku overkarty`);
}
const w6 = wpis('R-M6-006');
ok(/wyższą od (wszystkich )?kart stołu/.test(w6.twierdzenie), 'rejestr R-M6-006: twierdzenie bez warunku overkarty');
ok(w6.zrodla.some((z) => z.adres === UPSWING_BD && /blind vs blind/.test(z.cytat) && z.odczyt === '2026-11-12'), 'rejestr R-M6-006: brak cytatu „blind vs blind” (Tip 4) z odczytem 2026-11-12');
ok(/BvB|blind vs blind|SB/.test(w6.uproszczenie ?? ''), 'rejestr R-M6-006: uproszczenie bez nazwanego zakresu źródła (BvB)');
ok(/08-EH-3/.test(stan) && /J♠T♠/.test(stan) && /Q♥4♥/.test(stan), 'stan-eq.md: brak specyfikacji zmiany 08-EH-3 (overkarta)');

for (const b of bledy) console.log(`BRAK ${b}`);
console.log(`${bledy.length} braków`);
process.exitCode = bledy.length ? 1 : 0;
