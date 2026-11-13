// HA (06): niezależny rachunek zdania SC-13 „przy zakładzie 2/3 puli cena za następną kartę ({{n:eq.bet-two-thirds}} equity) jest wyższa niż jego szansa na nią”.
// Dla 2000 ziaren Ł: N = karty turnu, z którymi rywal wygrywa albo remisuje (compareHands na 6 kartach, bez danych generatora o outach),
// e47 = N/47 (konwencja pokazu), e45 = N/45 (dokładnie: 2 karty rywala nieznane graczowi pominięte, D-1421); cena = zakład/(pula+2·zakład) z kwot wariantu.
// Użycie (z katalogu repo): mkdir -p tools/content-build/.ha-tmp && cp docs/tresci/narzedzia/ha-sc13-cena.ts tools/content-build/.ha-tmp/ && (cd tools/content-build && npx tsx .ha-tmp/ha-sc13-cena.ts)
import { join, resolve } from 'node:path';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compareHands, generateVariant, type GeneratorTemplate } from '@szkola/poker-core';
const root = resolve(import.meta.dirname, '../../..');
const t = loadScenarioTemplates(join(root, 'content/pl/scenarios')).map((x) => x.template).find((x) => x.id === 'sc-13')!;
const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
let bledy = 0, minOdstep = 1, maxE45 = 0; const procent = (x: number) => Math.round(x * 100);
for (let seed = 1; seed <= 2000; seed++) {
  const v: any = generateVariant(g, 'latwy', seed, { thresholds: { mixedMin: 0.035, mixedLow: 0.25 } } as any);
  const d = v.points[0]; const flop = v.board.slice(0, 3); const znane = new Set([...v.hero, ...v.villain, ...flop]);
  let n = 0;
  for (let c = 0; c < 52; c++) if (!znane.has(c) && compareHands([...v.villain, ...flop, c], [...v.hero, ...flop, c]) >= 0) n++;
  const cena = d.betBig / (d.pot + 2 * d.betBig), e47 = n / 47, e45 = n / 45;
  minOdstep = Math.min(minOdstep, cena - e47); maxE45 = Math.max(maxE45, e45);
  if (!(e45 < cena && procent(e47) < procent(cena) && Math.abs(cena - 2 / 7) < 1e-9)) { bledy++; if (bledy <= 5) console.log(`BŁĄD ziarno ${seed}: N=${n} e47=${e47} cena=${cena}`); }
}
console.log(`2000 wariantów: ${bledy} błędów; najmniejszy odstęp cena − N/47 = ${minOdstep.toFixed(4)}; największe N/45 = ${maxE45.toFixed(4)}; cena 2/7 = ${(2 / 7).toFixed(4)}`);
process.exit(bledy ? 1 : 0);
