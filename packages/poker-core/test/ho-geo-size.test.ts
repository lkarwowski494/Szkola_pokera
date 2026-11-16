// 08-EX-4 (sesja HO, SC-27, R-M9-006/009 math): rozmiar zakładu na flopie, który wpłaca cały stack równymi zakładami do rivera. Wyrocznia niezależna od math.ts:
// łańcuch `streets` zakładów po ułamku f puli, każdy sprawdzony, musi wpłacić cały stack (±0,5 bb); trzy zakłady 1/3 puli wpłacają mniej niż połowę stacku przy SPR ≥ 4.
import { describe, expect, it } from 'vitest';
import { generateVariant, rankOf, suitOf, TemplateError, type GeneratorTemplate, type LevelBounds } from '../src';

const POTY = [16.5]; // pula po 3-becie z pozycją i sprawdzeniu (numbers.yaml: vs3bet.pot-after)
const STACKI = [92.5, 80, 70, 60, 50, 40]; // stack za pulą: SPR 5,6 … 2,4
const poziom = (extra: Partial<LevelBounds> = {}, expected = 'bet-big'): LevelBounds => ({ draws: [], reject: [], expected: [expected], ...extra });
const szablon = (b: LevelBounds, over: { streets?: number; small?: number } = {}): GeneratorTemplate => ({
  id: 'sc-ho-geo',
  stackBb: 100,
  positions: { hero: 'BTN', villain: 'CO' },
  levels: { sredni: b },
  decisions: [{ kind: 'geo-size', street: 'flop', pots: POTY, stacks: STACKI, streets: over.streets ?? 3, small: over.small ?? 1 / 3 }],
});
const LOSOWANIA = 600;

/** Ile wpłaci łańcuch `n` zakładów po ułamku f puli (każdy sprawdzony); niezależnie od math.ts. */
function lancuch(pot: number, f: number, n: number): number {
  let p = pot;
  let razem = 0;
  for (let k = 0; k < n; k++) {
    const bet = p * f;
    razem += bet;
    p += 2 * bet;
  }
  return razem;
}

describe('08-EX-4: geo-size', () => {
  it('wyrocznia: f geometryczne wpłaca cały stack, 1/3 puli wpłaca mniej niż połowę przy SPR ≥ 4', () => {
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(szablon(poziom()), 'sredni', seed);
      const p = v.points[0];
      expect(p?.point).toBe('geo-size');
      if (p?.point !== 'geo-size') return;
      expect(POTY).toContain(p.pot);
      expect(STACKI).toContain(p.stack);
      expect(p.spr).toBeCloseTo(p.stack / p.pot, 12);
      expect(Math.abs(lancuch(p.pot, p.fractionBig, 3) - p.stack)).toBeLessThan(0.5);
      expect(p.streets).toBe(3);
      expect(p.fractionSmall).toBeCloseTo(1 / 3, 12);
      expect(p.smallTotal).toBeCloseTo(lancuch(p.pot, 1 / 3, 3), 9);
      if (p.spr >= 4) expect(p.smallTotal).toBeLessThan(p.stack / 2);
      expect(p.smallTotal).toBeLessThan(p.stack - 0.5); // mały zakład nie wpłaca stacku
      expect(p.correct).toBe('bet-big');
    }
  });
  it('ręka: set (kieszonkowa para + karta stołu), stół niesparowany i bez trzech kart jednego koloru', () => {
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(szablon(poziom()), 'sredni', seed);
      const [a, b] = v.hero.map(rankOf) as [number, number];
      const flop = v.board.slice(0, 3);
      const rangi = flop.map(rankOf);
      expect(a).toBe(b);
      expect(rangi.filter((r) => r === a)).toHaveLength(1);
      expect(new Set(rangi).size).toBe(3);
      expect(new Set(flop.map(suitOf)).size).toBeGreaterThan(1);
    }
  });
  it('sprRange poziomu zawęża SPR (trudny: 4–8)', () => {
    for (let seed = 1; seed <= 200; seed++) {
      const p = generateVariant(szablon(poziom({ sprRange: [4, 8] })), 'sredni', seed).points[0];
      if (p?.point !== 'geo-size') throw new Error('geo-size');
      expect(p.spr).toBeGreaterThanOrEqual(4);
      expect(p.spr).toBeLessThanOrEqual(8);
    }
  });
  it('ten sam seed daje ten sam wariant', () => {
    expect(generateVariant(szablon(poziom()), 'sredni', 5)).toEqual(generateVariant(szablon(poziom()), 'sredni', 5));
  });
  it('błędy szablonu: oczekiwana akcja ≠ bet-big, zła liczba ulic, mały zakład ≥ geometrycznego, pusty przedział SPR', () => {
    expect(() => generateVariant(szablon(poziom({}, 'bet-small')), 'sredni', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom(), { streets: 0 }), 'sredni', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom(), { small: 0.9 }), 'sredni', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({ sprRange: [20, 30] })), 'sredni', 1)).toThrow(TemplateError);
  });
});
