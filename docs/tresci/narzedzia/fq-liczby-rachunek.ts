// FQ: sprawdzenie, że wzory zdań „Liczby” dają te same liczby co pole wariantu (river-catch: required) i formuły numbers.yaml (requiredEquity, mdf)
// Użycie: cp docs/tresci/narzedzia/fq-liczby-rachunek.ts tools/content-build/rep-tmp.ts && (cd tools/content-build && npx tsx rep-tmp.ts; rm rep-tmp.ts) — import `./src/scenariusze` wymaga katalogu content-build. Wynik: docs/tresci/dowody/fq-liczby-rachunek.txt
import { generateVariant, requiredEquity, mdf } from '@szkola/poker-core';
import { loadScenarioTemplates } from './src/scenariusze';
const ts = loadScenarioTemplates('/home/user/Szkola_pokera/docs/tresci/szablony-robocze/fd/pl').map((x) => x.template).filter((t) => ['sc-24', 'sc-31'].includes(t.id));
let n = 0, bl = 0;
for (const t of ts) { const g: any = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions };
  for (const l of t.levels as any[]) for (let s = 1; s <= 200; s++) { const v: any = generateVariant(g, l, s); const p = v.points[0];
    const pula = p.pot + p.bet, kwota = p.bet; const potrzeba = kwota / (pula + kwota);
    n++; if (Math.abs(potrzeba - p.required) > 1e-12 || Math.abs(potrzeba - requiredEquity(p.pot, p.bet)) > 1e-12) bl++;
    if ((p.bluffShare > p.required) !== (p.correct === 'call')) bl++;
    if (s === 1) console.log(t.id, l, `pula ${pula} kwota ${kwota} potrzeba ${potrzeba.toFixed(4)} raz na ${Math.max(1, Math.round(1 / potrzeba))} udział ${p.bluffShare} raz na ${Math.max(1, Math.round(1 / p.bluffShare))} → ${p.correct}`);
  } }
console.log(`river-catch: ${n} wariantów, rozbieżności ${bl}`);
const ex = [[10, 5], [12, 4], [100, 33.333333]]; for (const [P, B] of ex) console.log(`defend pula przed ${P}, zakład ${B}: cena ${(B / (P + 2 * B)).toFixed(4)} = requiredEquity ${requiredEquity(P, B).toFixed(4)}; MDF ${(P / (P + B)).toFixed(4)} = mdf ${mdf(P, B).toFixed(4)}`);
