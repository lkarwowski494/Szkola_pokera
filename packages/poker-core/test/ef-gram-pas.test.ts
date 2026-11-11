// 08-N1 (sesja EF): range-spot z grupą „gram / pas” (`play`): akcje spotu wymienione w `play` (np. sprawdzenie i 3-bet) liczą się jako jedna akcja „play”,
// z sumą częstości jak w siatce grupy. Wyrocznia: suma częstości liczona w teście wprost z danych spotu.
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, HAND_CLASSES, TemplateError, type GeneratorContext, type GeneratorTemplate } from '../src';

// spot fixture: klasy wg indeksu: co trzecia gra 0,5 call + 0,48 3-bet (suma 0,98), co trzecia 0,5 + 0,3 (suma 0,8), reszta pas
const dane = HAND_CLASSES.map((_hc, h) => (h % 3 === 0 ? { call: 0.5, raise: 0.48 } : h % 3 === 1 ? { call: 0.5, raise: 0.3 } : { call: 0, raise: 0 }));
const spot = {
  id: 'vs-open.fx', uncertain: [] as string[],
  actions: [
    { label: 'fold', freqs: dane.map((x) => 1 - x.call - x.raise) },
    { label: 'call 2.5', freqs: dane.map((x) => x.call) },
    { label: 'raise 10', freqs: dane.map((x) => x.raise) },
  ],
};
const ctx: GeneratorContext = { spots: [spot], thresholds: { mixedMin: 0.035, mixedLow: 0.25 } };
const szablon = (expected: string, play = ['call 2.5', 'raise 10']): GeneratorTemplate => ({
  id: 'sc-fx-gram',
  positions: { hero: 'BB', villain: 'BTN' },
  levels: { latwy: { draws: [], reject: [], freqs: [{ min: 0.97, max: 1 }], expected: [expected] } },
  decisions: [{ kind: 'range-spot', street: 'preflop', spot: 'vs-open.fx', play }],
});
const LOSOWANIA = 5_000;

describe('08-N1: range-spot z grupą play', () => {
  it(`oczekiwane play: ${LOSOWANIA} wariantów tylko z klas z sumą częstości gry ≥ 0,97; play zgodne, pas niedokładność/błąd`, () => {
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(szablon('play'), 'latwy', seed, ctx);
      const p = v.points[0];
      expect(p?.point).toBe('range-spot');
      if (p?.point !== 'range-spot') return;
      const h = HAND_CLASSES.indexOf(classOf(v.hero[0], v.hero[1]));
      const suma = dane[h]!.call + dane[h]!.raise;
      expect(suma).toBeGreaterThanOrEqual(0.97);
      expect(p.options.map((o) => o.action).sort()).toEqual(['fold', 'play']);
      expect(p.options.find((o) => o.action === 'play')).toMatchObject({ verdict: 'correct' });
      expect(p.options.find((o) => o.action === 'play')!.f).toBeCloseTo(suma, 12);
      // pas z częstością 0,02 (< mixedMin 0,035) to niedokładność, nie błąd (ADR-26: częstość > 0); przy sumie 1,0 byłby błędem
      expect(p.options.find((o) => o.action === 'fold')).toMatchObject({ verdict: 1 - suma > 0 ? 'inaccuracy' : 'wrong' });
      expect(p.correct).toBe('play');
    }
  });
  it('oczekiwany pas: tylko klasy z pasem ≥ 0,97', () => {
    for (let seed = 1; seed <= 500; seed++) {
      const v = generateVariant({ ...szablon('fold'), levels: { latwy: { draws: [], reject: [], freqs: [{ min: 0.97, max: 1 }], expected: ['fold'] } } }, 'latwy', seed, ctx);
      const h = HAND_CLASSES.indexOf(classOf(v.hero[0], v.hero[1]));
      expect(dane[h]!.call + dane[h]!.raise).toBe(0);
    }
  });
  it('akcja spoza spotu w play to błąd szablonu', () => {
    expect(() => generateVariant(szablon('play', ['call 2.5', 'raise 99']), 'latwy', 1, ctx)).toThrow(TemplateError);
  });
  it('etykieta play zarezerwowana: spot z akcją o takiej etykiecie to błąd', () => {
    const zly: GeneratorContext = { ...ctx, spots: [{ ...spot, actions: [...spot.actions, { label: 'play', freqs: dane.map(() => 0) }] }] };
    expect(() => generateVariant(szablon('play'), 'latwy', 1, zly)).toThrow(TemplateError);
  });
});
