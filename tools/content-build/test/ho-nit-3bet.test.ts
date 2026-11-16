// 08-EX-8 (sesja HO, SC-30, R-M10-007 / R-M2-005): punkt `nit-3bet` — gracz otworzył z BTN, nit z BB 3-betuje; ręka spoza górnych x% jego VPIP pasuje.
// Wyrocznia: osobna pętla po macierzy equity169 z pliku narzędzia (nie funkcja generatora), cena z żetonów: dopłata ÷ pula po dopłacie.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, HAND_CLASSES, TemplateError, type Equity169Data, type GeneratorContext, type GeneratorTemplate, type LevelBounds } from '@szkola/poker-core';

const m = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as Equity169Data;
const rangeBtn = (hc: string) => hc !== '32o' && hc !== '42o'; // fixture otwarcia BTN: prawie wszystko (ręce spoza zakresu odpadają i tak)
const ctx: GeneratorContext = {
  spots: [{ id: 'rfi.btn', uncertain: [], actions: [
    { label: 'raise', freqs: HAND_CLASSES.map((hc) => (rangeBtn(hc) ? 1 : 0)) },
    { label: 'fold', freqs: HAND_CLASSES.map((hc) => (rangeBtn(hc) ? 0 : 1)) },
  ] }],
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
  equity169: m,
};
const poziom = (extra: Partial<LevelBounds> = {}): LevelBounds => ({ draws: [], reject: [], expected: ['fold'], marginMin: 0.03, ...extra });
const szablon = (b: LevelBounds, vpips: number[] = [0.08, 0.1]): GeneratorTemplate => ({
  id: 'sc-ho-nit',
  stackBb: 100,
  positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: b },
  decisions: [{ kind: 'nit-3bet', street: 'preflop', open: 2.5, threeBet: 10, vpips }],
});
const LOSOWANIA = 300;

// niezależnie od generatora: ranking równości wobec losowej ręki i górne x% w kombinacjach
const kombinacje = (h: string) => (h.length === 2 ? 6 : h.endsWith('s') ? 4 : 12);
function gornex(x: number): Set<string> {
  const vs = m.classes.map((_, i) => m.classes.reduce((s, __, j) => s + m.pairs[i]![j]! * m.equity[i]![j]!, 0) / m.pairs[i]!.reduce((a, b) => a + b, 0));
  const kolej = m.classes.map((_, i) => i).sort((a, b) => vs[b]! - vs[a]!);
  const out = new Set<string>();
  let suma = 0;
  for (const i of kolej) {
    const c = kombinacje(m.classes[i]!);
    if (suma + c > x * 1326) break;
    suma += c;
    out.add(m.classes[i]!);
  }
  return out;
}
function equityWobec(hc: string, zakres: Set<string>): number {
  const i = m.classes.indexOf(hc);
  let w = 0;
  let s = 0;
  m.classes.forEach((vc, j) => { if (zakres.has(vc)) { w += m.pairs[i]![j]!; s += m.pairs[i]![j]! * m.equity[i]![j]!; } });
  return s / w;
}

describe('08-EX-8: nit-3bet', () => {
  it('górne 8% to 104 kombinacje, górne 10% to 130 (rachunek niezależny, zgodny z przykładem HP D-1721)', () => {
    expect(gornex(0.08).size).toBe(16);
    expect(gornex(0.1).size).toBe(20);
    expect(gornex(0.08).has('KQs')).toBe(true);
    expect(gornex(0.08).has('ATo')).toBe(false);
  });
  it(`${LOSOWANIA} wariantów: offsuit bez pary, spoza górnych x%, equity ≤ cena − 0,03, cena z żetonów`, () => {
    const t = szablon(poziom());
    const widziane = new Set<string>();
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(t, 'latwy', seed, ctx);
      const p = v.points[0];
      if (p?.point !== 'nit-3bet') throw new Error('nit-3bet');
      const hc = classOf(v.hero[0], v.hero[1]);
      expect(p.handClass).toBe(hc);
      expect(hc.length === 3 && hc.endsWith('o')).toBe(true); // offsuit bez pary
      expect(rangeBtn(hc)).toBe(true);
      expect([0.08, 0.1]).toContain(p.vpip);
      const top = gornex(p.vpip);
      expect(top.has(hc)).toBe(false);
      // cena: dopłata 10 − 2,5 = 7,5 do puli 10 (3-bet) + 10 (call) + 0,5 (SB) = 20,5 → 7,5 / 20,5
      expect(p.required).toBeCloseTo(7.5 / 20.5, 12);
      expect(p.equity).toBeCloseTo(equityWobec(hc, top), 9);
      expect(p.equity).toBeLessThanOrEqual(p.required - 0.03 + 1e-12);
      expect(p.correct).toBe('fold');
      expect(v.board).toHaveLength(5);
      widziane.add(`${p.vpip}|${hc}`);
    }
    expect(widziane.size).toBeGreaterThan(5);
  }, 300_000);
  it('determinizm i odcisk zależny od VPIP', () => {
    const t = szablon(poziom());
    const a = generateVariant(t, 'latwy', 3, ctx);
    expect(generateVariant(t, 'latwy', 3, ctx)).toEqual(a);
    const p = a.points[0];
    if (p?.point !== 'nit-3bet') throw new Error('nit-3bet');
    expect(a.fingerprint.endsWith(`|${p.vpip}`)).toBe(true);
  });
  it('błędy szablonu: brak zakresu, brak macierzy equity, zła akcja oczekiwana, za mały margines, pusta lista VPIP', () => {
    expect(() => generateVariant(szablon(poziom()), 'latwy', 1)).toThrow(TemplateError);
    const { equity169: _, ...bezMacierzy } = ctx;
    expect(() => generateVariant(szablon(poziom()), 'latwy', 1, bezMacierzy)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({ expected: ['call'] })), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({ marginMin: 0.01 })), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom(), []), 'latwy', 1, ctx)).toThrow(TemplateError);
  });
});
