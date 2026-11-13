// 08-FQ-2 (FQ D-1467; FV): `marginMax` w river-value = górna granica odległości w od połowy: δ ≤ |w − 0,5| < marginMax (null = bez górnej granicy, jak dotąd).
// Bez niej poziomy Ś/T SC-22/25/28/29 losowałyby te same rozdania co Ł. Wyrocznia: własne liczenie W/L po klasach (classComboSplit), niezależne od generatora.
import { describe, expect, it } from 'vitest';
import { classComboSplit, generateVariant, TemplateError, type GeneratorTemplate, type Card } from '../src';

const CALLS = ['AJs', 'AJo', 'KJs', 'KJo', 'JTs', 'JTo', 'J9s', 'J9o', '88', '55', 'AKs', 'AKo', 'AQs', 'AQo', 'KQs', 'KQo'];
const FOLDS = ['76s', '65s', '54s', 'T9s', '98s'];
const szablon = (expected: 'bet' | 'check', min: number, max: number | null): GeneratorTemplate => ({
  id: `fv-rv-${expected}`, positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], expected: [expected], marginMin: min, ...(max === null ? {} : { marginMax: max }) } },
  decisions: [{ kind: 'river-value', street: 'river', calls: CALLS, folds: FOLDS }],
} as unknown as GeneratorTemplate);
const odPolowy = (hero: readonly [Card, Card], board: readonly Card[]): number => {
  const s = classComboSplit(hero, board, CALLS);
  return Math.abs(s.worse / (s.worse + s.better) - 0.5);
};

describe('08-FQ-2: marginMax w river-value', () => {
  for (const expected of ['bet', 'check'] as const) {
    it(`„${expected}”: każdy z 120 wariantów ma δ ≤ |w − 0,5| < marginMax (0,05; 0,2)`, () => {
      for (let seed = 1; seed <= 120; seed++) {
        const v = generateVariant(szablon(expected, 0.05, 0.2), 'latwy', seed);
        const d = odPolowy(v.hero as [Card, Card], v.board);
        expect(d).toBeGreaterThanOrEqual(0.05 - 1e-9);
        expect(d).toBeLessThan(0.2);
      }
    }, 120_000);
  }
  it('bez marginMax warianty „bet” sięgają dalej niż 0,2 od połowy (kontrola, że ograniczenie coś odrzuca)', () => {
    let dalej = 0;
    for (let seed = 1; seed <= 120; seed++) { const v = generateVariant(szablon('bet', 0.05, null), 'latwy', seed); if (odPolowy(v.hero as [Card, Card], v.board) >= 0.2) dalej++; }
    expect(dalej).toBeGreaterThan(0);
  }, 120_000);
  it('marginMax ≤ δ to TemplateError z nazwą szablonu (puste przedział, bez wariantu)', () => {
    expect(() => generateVariant(szablon('bet', 0.1, 0.1), 'latwy', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon('bet', 0.1, 0.05), 'latwy', 1)).toThrow(/fv-rv-bet.*marginMax/);
  });
});
