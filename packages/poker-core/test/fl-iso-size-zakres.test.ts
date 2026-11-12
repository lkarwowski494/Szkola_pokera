// 08-FD-2 (SC-09, sesja FL): iso-size bez punktu range-spot: ręka gracza z zakresu otwarcia jego pozycji (spot rfi.<pozycja>),
// a nie z całej talii. Wyrocznia niezależna od generatora: częstość klasy ręki czytana wprost z danych spotu przez classOf.
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, HAND_CLASSES, TemplateError, type GeneratorContext, type GeneratorTemplate } from '../src';

// spot fixture rfi.co: otwiera tylko co czwarta klasa (indeks % 4 === 0), z częstością 0,6; reszta pas
const otwiera = (h: number): boolean => h % 4 === 0;
const rfiCo = {
  id: 'rfi.co', uncertain: [] as string[],
  actions: [
    { label: 'fold', freqs: HAND_CLASSES.map((_hc, h) => (otwiera(h) ? 0.4 : 1)) },
    { label: 'raise 2.5', freqs: HAND_CLASSES.map((_hc, h) => (otwiera(h) ? 0.6 : 0)) },
  ],
};
const ISO_RULE = { id: 'R-M4-012', check: { kind: 'iso-size', params: { base: 3, perLimper: 1, oopExtra: 1 } } };
const ctx: GeneratorContext = { spots: [rfiCo], thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, sizeRules: [ISO_RULE] };
const szablon = (hero = 'CO'): GeneratorTemplate => ({
  id: 'sc-fx-iso-zakres',
  positions: { hero, villain: 'BB' },
  stackBb: 100,
  levels: { latwy: { draws: [], reject: [], expected: ['raise'] } },
  decisions: [{ kind: 'size-spot', street: 'preflop', check: 'iso-size', rule: 'R-M4-012', limpers: 1 }],
} as unknown as GeneratorTemplate);
const LOSOWANIA = 2_000;

describe('08-FD-2: iso-size losuje rękę z zakresu otwarcia pozycji', () => {
  it(`${LOSOWANIA} ziaren: każda klasa ręki ma częstość otwarcia > 0 w rfi.co`, () => {
    const poza: string[] = [];
    const widziane = new Set<string>();
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(szablon(), 'latwy', seed, ctx);
      const hc = classOf(v.hero[0], v.hero[1]);
      widziane.add(hc);
      const h = HAND_CLASSES.indexOf(hc);
      const freq = rfiCo.actions.filter((a) => a.label !== 'fold').reduce((s, a) => s + (a.freqs[h] ?? 0), 0);
      if (!(freq > 0)) poza.push(`${seed}: ${hc}`);
    }
    expect(poza.slice(0, 5)).toEqual([]);
    expect(widziane.size).toBeGreaterThan(10); // losowanie z zakresu, nie jedna klasa
  });
  it('punkt iso-size i rozmiary bez zmian (standard 4 bb, 3,2 i 6,4)', () => {
    const p = generateVariant(szablon(), 'latwy', 7, ctx).points[0];
    expect(p?.point === 'size-spot' && p.options.map((o) => o.bb)).toEqual([4, 3.2, 6.4]);
  });
  it('brak spotu rfi.<pozycja> w kontekście to błąd szablonu, nie ręka z całej talii', () => {
    expect(() => generateVariant(szablon(), 'latwy', 1, { ...ctx, spots: [] })).toThrow(TemplateError);
    expect(() => generateVariant(szablon('BB'), 'latwy', 1, ctx)).toThrow(/rfi\.bb/);
  });
  it('brak kontekstu to błąd szablonu', () => {
    expect(() => generateVariant(szablon(), 'latwy', 1)).toThrow(TemplateError);
  });
});
