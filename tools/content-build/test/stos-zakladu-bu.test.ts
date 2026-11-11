// KO-051 / ŚR-203: zakład rywala w punkcie draw-call nie jest większy niż stos gracza za pulą (inaczej sprawdzenie jest niemożliwe).
// Stos za pulą jak w szablony-bs.test.ts (D-630): stackBb − wkład gracza przed flopem (pula − martwe blindy z pozycji) ÷ 2 − wcześniejsze zakłady.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { martweBlindy } from './martwe-blindy-wyrocznia';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const pl = loadScenarioTemplates(join(contentDir, 'pl', 'scenarios'))
  // zakład rywala ma tylko punkt draw-call; cbet-case (gracz agresorem) i icm-call (all-in = stos efektywny) nie mają zakładu do porównania (sesja CO, D-791).
  // Szablon z draw-call i innym punktem też jest sprawdzany (`some`, nie `every`: CZ, 06-tresci-006); pętla niżej idzie tylko po punktach draw-call.
  .filter((x) => x.template.decisions.some((d) => d.kind === 'draw-call'));
// punkt range-spot generator losuje z zakresu (D-661); progi jak w content/numbers.yaml (szablony-f1-bu)
const ctx = { spots: compileRanges(contentDir).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 } };
const LOSOWANIA = 2_000;

describe('ŚR-203: zakład nie większy niż stos gracza', () => {
  for (const { template: t } of pl) {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: zakład ≤ stos za pulą w każdym punkcie`, () => {
        const zle: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA; seed++) {
          const v = generateVariant(g, level, seed, ctx);
          let zaklady = 0;
          v.decisions.forEach((d, i) => {
            const stos = t.stackBb - (v.decisions[0]!.pot - martweBlindy(t.positions)) / 2 - zaklady;
            if (d.bet > stos) zle.push(`${seed}#${i + 1}: zakład ${d.bet} > stos ${stos.toFixed(2)}`);
            zaklady += d.bet;
          });
        }
        expect(zle.slice(0, 5)).toEqual([]);
        expect(zle.length).toBe(0);
      }, 120_000);
    }
  }
});
