// 08-N2 (sesja EF): punkt „obrona wobec c-betu” w generatorze (R-M6-006 mały, R-M6-007 duży). Niezależne niezmienniki z kart (bez defendVsCbet):
// fold wobec małego c-betu tylko bez pary i asa w ręce; ręka z zakresu obrony spotu (częstość akcji ≠ pas > 0); ułamek c-betu z listy szablonu.
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, HAND_CLASSES, rankOf, TemplateError, type GeneratorContext, type GeneratorTemplate } from '../src';

// zakres obrony BB (fixture): pary i karty od dziesiątki; reszta pas
const broadway = (hc: string) => hc.length === 2 || /^[AKQJT]{2}[so]$/.test(hc);
const ctx: GeneratorContext = {
  spots: [{ id: 'vs-open.bb-vs-btn', uncertain: [], actions: [
    { label: 'call', freqs: HAND_CLASSES.map((hc) => (broadway(hc) ? 1 : 0)) },
    { label: 'fold', freqs: HAND_CLASSES.map((hc) => (broadway(hc) ? 0 : 1)) },
  ] }],
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
};
const szablon = (expected: 'call' | 'fold', fractions: number[]): GeneratorTemplate => ({
  id: 'sc-fx-defend',
  positions: { hero: 'BB', villain: 'BTN' },
  levels: { latwy: { draws: [], reject: [], expected: [expected] } },
  decisions: [{ kind: 'defend', street: 'flop', spot: 'vs-open.bb-vs-btn', pots: [6, 9], fractions }],
});
const LOSOWANIA = 3_000;

describe('08-N2: defend', () => {
  for (const [oczekiwana, ulamki] of [['call', [0.33]], ['fold', [0.33]], ['fold', [0.75, 1]]] as const) {
    it(`oczekiwana ${oczekiwana}, c-bet ${ulamki.join('/')}: ${LOSOWANIA} wariantów`, () => {
      const t = szablon(oczekiwana, [...ulamki]);
      for (let seed = 1; seed <= LOSOWANIA; seed++) {
        const v = generateVariant(t, 'latwy', seed, ctx);
        const p = v.points[0];
        expect(p?.point).toBe('defend');
        if (p?.point !== 'defend') return;
        const hc = classOf(v.hero[0], v.hero[1]);
        expect(broadway(hc)).toBe(true); // ręka z zakresu obrony spotu
        expect(p.correct).toBe(oczekiwana);
        expect(Math.abs(p.bet / p.pot - p.fraction)).toBeLessThan(1e-12);
        expect(ulamki.some((u) => Math.abs(Math.round(p.pot * u) / p.pot - p.fraction) < 1e-12)).toBe(true);
        const stol = v.board.slice(0, 3).map(rankOf);
        const para = rankOf(v.hero[0]) === rankOf(v.hero[1]) || v.hero.some((c) => stol.includes(rankOf(c)));
        if (p.correct === 'fold') {
          expect(para).toBe(false); // fold tylko bez pary
          if (p.fraction <= 0.4) expect(v.hero.some((c) => rankOf(c) === 12)).toBe(false); // mały c-bet: bez asa w ręce
          else expect(v.hero.every((c) => rankOf(c) >= 8)).toBe(true); // duży c-bet: tylko dwie karty ≥ T (zakres R-M6-007)
        }
        expect(v.board).toHaveLength(5);
      }
    }, 300_000);
  }
  it('bez zakresu obrony w kontekście to błąd szablonu', () => {
    expect(() => generateVariant(szablon('call', [0.33]), 'latwy', 1, { ...ctx, spots: [] })).toThrow(TemplateError);
    expect(() => generateVariant(szablon('call', [0.33]), 'latwy', 1)).toThrow(TemplateError);
  });
  it('ten sam seed daje ten sam wariant', () => {
    const t = szablon('call', [0.33]);
    expect(generateVariant(t, 'latwy', 9, ctx).fingerprint).toBe(generateVariant(t, 'latwy', 9, ctx).fingerprint);
  });
});
