// F5 (KO-049): draw-call od turnu, linia all-in, filtr „draw do najlepszej ręki”, margines osobno na punkt decyzji.
// BR-GEN-003: 10 000 losowań na poziom; wyrocznia niezależna od generatora (outy z analyseOutsSpot, cena z requiredEquity,
// udział nutowych outów z nutOutsShare, margines per punkt z pliku szablonu).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { analyseOutsSpot, generateVariant, hitProbability, nutOutsShare, NUT_DRAW_MIN_SHARE, requiredEquity, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'scenariusze'));
const LOSOWANIA = 10_000;
const MARTWE_BB = 1.5;
const wkladGracza = (pula: number) => (pula - MARTWE_BB) / 2; // jak w szablony-bs.test.ts (D-630)

describe('F5: rozszerzenia draw-call', () => {
  it('fixture ładują się przez schemat', () => {
    expect(fx.map((f) => f.template.id).sort()).toEqual(['sc-fx-allin-draw', 'sc-fx-margines', 'sc-fx-turn-gutshot']);
  });
  for (const { template: t } of fx) {
    const g = { id: t.id, stackBb: t.stackBb, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów zgodnych z wyrocznią`, () => {
        const b = t.bounds[level]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed);
          expect(v.decisions.length).toBe(t.decisions.length);
          v.decisions.forEach((d, i) => {
            const spec = t.decisions[i]!;
            if (d.street !== spec.street) bledy.push(`${seed}#${i + 1}: ulica ${d.street}`);
            const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
            const spot = analyseOutsSpot(v.hero, stol);
            if (!spot || !(b.draws as readonly string[]).includes(spot.draw.kind)) { bledy.push(`${seed}#${i + 1}: brak drawa`); return; }
            if (b.drawToBest && nutOutsShare(v.hero, stol) < NUT_DRAW_MIN_SHARE) bledy.push(`${seed}#${i + 1}: draw nie do najlepszej ręki`);
            const wszystkieKarty = spec.villain === 'all-in' && d.street === 'flop' ? 2 : 1;
            const hit = wszystkieKarty === 2 ? hitProbability(spot.outs, 52 - 2 - stol.length, 2) : spot.hitNextCard;
            const cena = requiredEquity(d.pot, d.bet);
            const akcja = hit > cena ? 'call' : 'fold';
            if (akcja !== b.expected[i]) bledy.push(`${seed}#${i + 1}: rachunek ${akcja}, szablon ${b.expected[i]}`);
            const m = b.margins?.[i] ?? { min: b.marginMin, max: b.marginMax };
            const margines = Math.abs(hit - cena);
            if (!(margines > 0 && margines >= m.min && (m.max === null || margines < m.max))) bledy.push(`${seed}#${i + 1}: margines ${margines} poza [${m.min}, ${m.max}]`);
            if (spec.villain === 'all-in') {
              const stosZaPula = Math.round(t.stackBb - wkladGracza(d.pot));
              if (d.bet !== stosZaPula) bledy.push(`${seed}#${i + 1}: all-in ${d.bet}, oczekiwano ${stosZaPula}`);
            }
          });
        }
        expect(bledy).toEqual([]);
      }, 600_000);
    }
  }
});
