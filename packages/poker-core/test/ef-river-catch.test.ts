// 08-N7 (sesja EF): sprawdzenie bluff-catcherem na riverze (R-M8-010, math): call, gdy udział blefów > bet ÷ (pula + 2·bet).
// Wyrocznia: cena liczona wprost w teście, nie przez requiredEquity/riverCatchAction.
import { describe, expect, it } from 'vitest';
import { generateVariant, rankOf, TemplateError, type GeneratorTemplate } from '../src';

const szablon = (expected: 'call' | 'fold', marginMin = 0.03, shares = [0.15, 0.2, 0.25, 0.3, 0.35, 0.4]): GeneratorTemplate => ({
  id: 'sc-fx-river',
  levels: { latwy: { draws: [], reject: [], marginMin, expected: [expected] } },
  decisions: [{ kind: 'river-catch', street: 'river', pots: [10, 20, 40], fractions: [0.33, 0.5, 0.75, 1], bluffShares: shares }],
});
const LOSOWANIA = 10_000;

describe('08-N7: river-catch', () => {
  for (const oczekiwana of ['call', 'fold'] as const) {
    it(`oczekiwana ${oczekiwana}: ${LOSOWANIA} wariantów zgodnych z rachunkiem i marginesem`, () => {
      const t = szablon(oczekiwana);
      for (let seed = 1; seed <= LOSOWANIA; seed++) {
        const v = generateVariant(t, 'latwy', seed);
        const p = v.points[0];
        expect(p?.point).toBe('river-catch');
        if (p?.point !== 'river-catch') return;
        const potrzeba = p.bet / (p.pot + 2 * p.bet);
        expect(p.correct).toBe(p.bluffShare > potrzeba ? 'call' : 'fold');
        expect(p.correct).toBe(oczekiwana);
        expect(Math.abs(p.bluffShare - potrzeba)).toBeGreaterThanOrEqual(0.03 - 1e-12);
        expect(p.required).toBeCloseTo(potrzeba, 12);
        expect(v.board).toHaveLength(5);
        // bluff-catcher: para z kartą gracza: karta gracza o randze ze stołu albo kieszonkowa para (generator wymaga dokładnie jednej pary z kartą gracza)
        const rangiStolu = v.board.map(rankOf);
        expect(v.hero.some((c) => rangiStolu.includes(rankOf(c))) || rankOf(v.hero[0]) === rankOf(v.hero[1]), `seed ${seed}: ${JSON.stringify([v.hero, v.board])}`).toBe(true);
      }
    });
  }
  it('żadna kombinacja udziału i ceny nie daje oczekiwanej akcji: błąd szablonu', () => {
    expect(() => generateVariant(szablon('call', 0.03, [0.01]), 'latwy', 1)).toThrow(TemplateError);
  });
  it('ten sam seed daje ten sam wariant, a inny bet to inny odcisk', () => {
    const t = szablon('call');
    expect(generateVariant(t, 'latwy', 5).fingerprint).toBe(generateVariant(t, 'latwy', 5).fingerprint);
    const odciski = new Set(Array.from({ length: 400 }, (_x, s) => generateVariant(t, 'latwy', s + 1).fingerprint));
    expect(odciski.size).toBeGreaterThan(100);
  });
});
