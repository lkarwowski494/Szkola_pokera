// 08-EX-5 (sesja HO, SC-26, R-M9-001/002/003): punkt „sprawdzenie all-inu przy niskim SPR”. Wyrocznia niezależna od generatora i od math.ts:
// SPR = stack za pulą ÷ pula (R-M9-001), potrzebne equity = S ÷ (P + 2S) (R-M9-002; przy SPR 2 równo 0,4), ręka i stół sprawdzane z rang i kolorów kart.
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, variantFingerprint, HAND_CLASSES, rankOf, suitOf, TemplateError, type GeneratorContext, type GeneratorTemplate, type LevelBounds } from '../src';

const rangiTekst = '23456789TJQKA';
const broadway = (hc: string) => hc.length === 2 || /^[AKQJT]{2}[so]$/.test(hc); // zakres obrony BB (fixture)
const ctx: GeneratorContext = {
  spots: [{ id: 'vs-open.bb-vs-btn', uncertain: [], actions: [
    { label: 'call', freqs: HAND_CLASSES.map((hc) => (broadway(hc) ? 1 : 0)) },
    { label: 'fold', freqs: HAND_CLASSES.map((hc) => (broadway(hc) ? 0 : 1)) },
  ] }],
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
};
const POTY = [5.5];
const STACKI = [10, 10.5, 11, 11.5, 12, 12.5]; // stack za pulą przy puli 5,5: SPR od 1,82 do 2,27
const poziom = (extra: Partial<LevelBounds>, expected = 'call'): LevelBounds => ({ draws: [], reject: [], expected: [expected], sprRange: [1.8, 2.3], ...extra });
const szablon = (b: LevelBounds, pots: number[] = POTY, stacks: number[] = STACKI): GeneratorTemplate => ({
  id: 'sc-ho-spr',
  stackBb: 14,
  positions: { hero: 'BB', villain: 'BTN' },
  levels: { latwy: b },
  decisions: [{ kind: 'spr-call', street: 'flop', spot: 'vs-open.bb-vs-btn', pots, stacks }],
});
const LOSOWANIA = 2_000;

// niezależna klasyfikacja ręki względem flopu (bez classifyHolding)
function para(hero: readonly number[], flop: readonly number[]): { rodzaj: 'overpair' | 'top' | 'inne'; kicker: number | null } {
  const [a, b] = hero as [number, number];
  const top = Math.max(...flop);
  if (a === b) return a > top ? { rodzaj: 'overpair', kicker: null } : { rodzaj: 'inne', kicker: null };
  const trafiona = [a, b].filter((r) => r === top);
  if (trafiona.length === 1) return { rodzaj: 'top', kicker: a === top ? b : a };
  return { rodzaj: 'inne', kicker: null };
}

describe('08-EX-5: spr-call', () => {
  it(`HT HR-004 (M3): poziom bez pairKind i bez kickerów: ${LOSOWANIA} wariantów to wyłącznie nadpara albo najwyższa para (druga para jest odrzucana przez strażnik silnika, nie przez filtr poziomu)`, () => {
    const t = szablon(poziom({}));
    const widziane = new Set<string>();
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(t, 'latwy', seed, ctx);
      const flop = v.board.slice(0, 3).map(rankOf);
      const r = para(v.hero.map(rankOf), flop);
      expect(r.rodzaj, `ziarno ${seed}`).not.toBe('inne');
      widziane.add(r.rodzaj);
    }
    expect([...widziane].sort()).toEqual(['overpair', 'top']);
  }, 300_000);
  it('rachunek: cena przy SPR 2 to dokładnie 0,4 (S ÷ (P + 2S))', () => {
    const t = szablon(poziom({ sprRange: [2, 2] }), [5], [10]);
    const p = generateVariant(t, 'latwy', 1, ctx).points[0];
    expect(p?.point).toBe('spr-call');
    if (p?.point !== 'spr-call') return;
    expect(p.pot).toBe(5);
    expect(p.stack).toBe(10);
    expect(p.spr).toBe(2);
    expect(p.required).toBeCloseTo(0.4, 12);
  });
  for (const [nazwa, b] of [
    ['Ł: nadpara albo najwyższa para z kickerem A/K', poziom({ pairKind: ['overpair', 'top'], kickerMin: 'K' })],
    ['Ś: najwyższa para z kickerem najwyżej Q', poziom({ pairKind: ['top'], kickerMax: 'Q' })],
  ] as const) {
    it(`${nazwa}: ${LOSOWANIA} wariantów spełnia niezmienniki`, () => {
      const t = szablon(b);
      const minK = b.kickerMin ? rangiTekst.indexOf(b.kickerMin) : -1;
      const maxK = b.kickerMax ? rangiTekst.indexOf(b.kickerMax) : 99;
      for (let seed = 1; seed <= LOSOWANIA; seed++) {
        const v = generateVariant(t, 'latwy', seed, ctx);
        const p = v.points[0];
        expect(p?.point).toBe('spr-call');
        if (p?.point !== 'spr-call') return;
        expect(broadway(classOf(v.hero[0], v.hero[1]))).toBe(true); // ręka z zakresu obrony spotu
        const flop = v.board.slice(0, 3);
        const rangi = flop.map(rankOf);
        expect(new Set(rangi).size).toBe(3); // stół niesparowany
        expect(new Set(flop.map(suitOf)).size).toBeGreaterThan(1); // nie trzy karty jednego koloru
        const r = para(v.hero.map(rankOf), rangi);
        expect(['overpair', 'top']).toContain(r.rodzaj);
        expect(b.pairKind).toContain(r.rodzaj);
        if (r.rodzaj === 'top') {
          expect(r.kicker!).toBeGreaterThanOrEqual(minK);
          expect(r.kicker!).toBeLessThanOrEqual(maxK);
        }
        expect(POTY).toContain(p.pot);
        expect(STACKI).toContain(p.stack);
        expect(p.spr).toBeCloseTo(p.stack / p.pot, 12);
        expect(p.spr).toBeGreaterThanOrEqual(1.8);
        expect(p.spr).toBeLessThanOrEqual(2.3);
        expect(p.required).toBeCloseTo(p.stack / (p.pot + 2 * p.stack), 12);
        expect(p.correct).toBe('call');
        expect(v.board).toHaveLength(5);
      }
    }, 300_000);
  }
  it('ten sam seed daje ten sam wariant i odcisk zawiera pulę i stack', () => {
    const t = szablon(poziom({ pairKind: ['overpair', 'top'] }));
    const a = generateVariant(t, 'latwy', 9, ctx);
    expect(generateVariant(t, 'latwy', 9, ctx)).toEqual(a);
    const p = a.points[0];
    if (p?.point !== 'spr-call') throw new Error('spr-call');
    expect(a.fingerprint).toBe(`${variantFingerprint(t.id, 'latwy', a.hero, a.board.slice(0, 3))}|${p.pot}-${p.stack}`); // odcisk obejmuje flop (pokazany w decyzji), pulę i stack
  });
  it('błędy szablonu: brak zakresu obrony, zła akcja oczekiwana, brak sprRange, brak kombinacji w przedziale', () => {
    expect(() => generateVariant(szablon(poziom({})), 'latwy', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({}, 'fold')), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({ sprRange: undefined as never })), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({ sprRange: [3, 4] })), 'latwy', 1, ctx)).toThrow(TemplateError);
  });
});
