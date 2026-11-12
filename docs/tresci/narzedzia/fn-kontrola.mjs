// Kontrola sesji FN (06-tresci, fix): testy akceptacyjne znalezisk 06-tresci-001…007, 010, 011 z recenzji FK
// (`docs/tresci/recenzje/recenzja-fd-fc16e128.md`) na szkicach `docs/tresci/szablony-robocze/fd/{pl,en}/`.
// Rozmiar zakładu liczony jak w generatorze: bet = Math.round(pula × ułamek) (`packages/poker-core/src/scenario-gen.ts:774`),
// dla KAŻDEJ pary pula × ułamek szablonu (pełne wyliczenie zamiast próby ziaren).
// Użycie: node docs/tresci/narzedzia/fn-kontrola.mjs [ID…]  · kod 0 = wszystkie zielone, 1 = są czerwone.
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const YAML = require('yaml');
const FD = 'docs/tresci/szablony-robocze/fd';
const sz = (j, id) => YAML.parse(readFileSync(`${FD}/${j}/${id}.yaml`, 'utf8'));
const surowy = (j, id) => readFileSync(`${FD}/${j}/${id}.yaml`, 'utf8');
const liczby = YAML.parse(readFileSync('content/numbers.yaml', 'utf8'));
const expl = (t, a) => t.decisions[0].actions.find((x) => x.action === a)?.explanation ?? '';
const KOLEJNOSC_PREFLOP = ['UTG', 'UTG1', 'UTG2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const req = (pot, bet) => bet / (pot + 2 * bet);

const testy = {
  '06-tresci-001': () => ['pl', 'en'].flatMap((j) => (surowy(j, 'sc-15').match(/alpha\.bet-third/g) ?? []).map(() => `${j}/sc-15: klauzula alpha.bet-third (próg rivera na flopie)`)),
  '06-tresci-002': () => ['sc-07', 'sc-17'].flatMap((id) => ['pl', 'en'].flatMap((j) => {
    const t = sz(j, id), d = t.decisions[0], bledy = [];
    const klucze = d.actions.flatMap((a) => [...a.explanation.matchAll(/\{\{n:(cbet\.size\.[a-z]+)\}\}/g)].map((m) => m[1]));
    for (const k of klucze) {
      const f = Number(liczby[k].value);
      for (const pot of d.pots) for (const fr of d.fractions) {
        const bet = Math.round(pot * fr);
        if (Math.abs(bet / pot - f) >= 0.02) bledy.push(`${j}/${id}: pula ${pot}, ułamek ${fr} → zakład ${bet} = ${(bet / pot).toFixed(3)} puli, tekst ${k} = ${f}`);
      }
    }
    return bledy;
  })),
  '06-tresci-003': () => ['pl', 'en'].flatMap((j) => {
    const t = sz(j, 'sc-09'), h = KOLEJNOSC_PREFLOP.indexOf(t.positions.hero), v = KOLEJNOSC_PREFLOP.indexOf(t.positions.villain);
    return v < h ? [] : [`${j}/sc-09: rywal ${t.positions.villain} nie działa preflop przed graczem ${t.positions.hero}, a sytuacja mówi, że limpował przed nim`];
  }),
  '06-tresci-004': () => {
    const s = sz('pl', 'sc-23').situation;
    return /AK i AQ \{\{t:suited\|w kolorze\}\}/.test(s) || !/każdym AK/.test(s) || !/wszystkimi \{\{t:suited\|w kolorze\}\}/.test(s) ? ['pl/sc-23: zasięg „w kolorze” dwuznaczny (AK; lista pasujących)'] : [];
  },
  '06-tresci-005': () => ['pl', 'en'].flatMap((j) => {
    const t = sz(j, 'sc-31'), d = t.decisions[0], bledy = [];
    if (!/^(Załóż|Assume)/.test(t.situation)) bledy.push(`${j}/sc-31: sytuacja nie zaczyna się ramą założenia`);
    const fold = Object.entries(t.bounds).filter(([, b]) => b.expected.includes('fold'));
    if (!fold.length) bledy.push(`${j}/sc-31: brak poziomu z expected [fold]`);
    for (const [poz, b] of fold) {
      const ok = d.pots.some((pot) => d.fractions.some((fr) => d.bluffShares.some((s) => { const r = req(pot, Math.round(pot * fr)), m = r - s; return m >= (b.marginMin ?? 0) && (b.marginMax == null || m < b.marginMax); })));
      if (!ok) bledy.push(`${j}/sc-31: poziom ${poz} (fold) bez żadnego kandydata pula × ułamek × udział blefów`);
    }
    return bledy;
  }),
  '06-tresci-006': () => [['pl', /ani [^.]*, ani /], ['en', /neither [^.]* nor /]].flatMap(([j, re]) => re.test(expl(sz(j, 'sc-07'), 'fold')) ? [`${j}/sc-07: pas uzasadniony zaprzeczeniem bezwzględnym (ani… ani)`] : []),
  '06-tresci-007': () => {
    const f = 'docs/decyzje/FN.md';
    return existsSync(f) && /D-1435[^\n]*pailiku\.com\/charts\/co-vs-btn-3bet[^\n]*deepfold/i.test(readFileSync(f, 'utf8')) ? [] : ['D-1435 nie nazywa sprzeczności źródeł spotu CO vs BTN (Pailiku, Deepfold)'];
  },
  // en ma tylko nagłówek-odsyłacz do pl (bez atrybucji; FK podało „pl i en”, grep: tylko pl), więc w en sprawdzany jest brak błędnej atrybucji
  '06-tresci-010': () => ['pl', 'en'].flatMap((j) => /pokercoaching When to Call/.test(surowy(j, 'sc-17')) || (j === 'pl' && !/Upswing/.test(surowy(j, 'sc-17').split('\nid:')[0])) ? [`${j}/sc-17: nagłówek nie przypisuje „When to Call With Ace-High” Upswingowi`] : []),
  '06-tresci-011': () => [['pl', /trzyma więcej kart|nie zasłania rąk do spasowania/], ['en', /holds more cards|doesn't block the hands that fold/]].flatMap(([j, re]) => {
    const t = sz(j, 'sc-23');
    return re.test(expl(t, 'best-hand') + expl(t, 'other-hand')) ? [`${j}/sc-23: wyjaśnienie mocniejsze niż kryterium a.v < b.v && a.f >= b.f`] : [];
  }),
};
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(testy);
let czerwone = 0;
for (const id of ids) {
  const b = testy[id]();
  console.log(`${b.length ? 'CZERWONY' : 'ZIELONY '} ${id}${b.length ? '\n  - ' + b.join('\n  - ') : ''}`);
  if (b.length) czerwone++;
}
console.log(`${czerwone} czerwonych z ${ids.length}`);
process.exitCode = czerwone ? 1 : 0;
