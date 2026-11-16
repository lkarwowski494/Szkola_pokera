// 08-EX-7 (sesja HO, SC-16, R-M6-008/010): punkt `check-raise` — BB z drawem wobec małego c-betu BTN. Wyrocznia niezależna od generatora i math.ts:
// cena BTN liczona z żetonów (dopłata ÷ pula po dopłacie), draw (kolor / strit otwarty) z rang i kolorów kart, nie z classifyHolding.
import { describe, expect, it } from 'vitest';
import { generateVariant, variantFingerprint, HAND_CLASSES, rankOf, suitOf, TemplateError, type GeneratorContext, type GeneratorTemplate, type LevelBounds } from '../src';

const ctx: GeneratorContext = {
  spots: [{ id: 'vs-open.bb-vs-btn', uncertain: [], actions: [
    { label: 'call', freqs: HAND_CLASSES.map(() => 1) },
    { label: 'fold', freqs: HAND_CLASSES.map(() => 0) },
  ] }],
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
};
const POTY = [6];
const poziom = (extra: Partial<LevelBounds> = {}): LevelBounds => ({
  draws: ['flush', 'oesd', 'combo'], reject: ['stol-sparowany'], flop: { suits: ['two-tone', 'rainbow'], ranks: ['disconnected', 'semi-connected'] },
  expected: ['raise-big'], flopBroadwayMax: 2, ...extra,
});
const szablon = (b: LevelBounds, mult: { big: number; small?: number } = { big: 4.5 }): GeneratorTemplate => ({
  id: 'sc-ho-xr',
  stackBb: 100,
  positions: { hero: 'BB', villain: 'BTN' },
  levels: { latwy: b },
  decisions: [{ kind: 'check-raise', street: 'flop', spot: 'vs-open.bb-vs-btn', pots: POTY, cbet: 1 / 3, multipliers: mult }],
});
const LOSOWANIA = 300;

// niezależnie: outy drawa liczone przez przeliczenie 47 kart: ile kart rivera/turnu daje kolor albo strit kartom gracza (bez pary po drodze nie sprawdzamy)
function outyKoloru(hero: readonly number[], flop: readonly number[]): number {
  const wszystkie = Array.from({ length: 52 }, (_, c) => c);
  const znane = new Set([...hero, ...flop]);
  let n = 0;
  for (const c of wszystkie) {
    if (znane.has(c)) continue;
    const s = [...hero, ...flop, c];
    const kolory = [0, 1, 2, 3].map((k) => s.filter((x) => suitOf(x) === k).length);
    if (kolory.some((k) => k >= 5)) n++;
  }
  return n;
}
function czyStritKarta(rangi: readonly number[]): boolean {
  const z = new Set(rangi);
  if (z.has(12)) z.add(-1);
  for (let lo = -1; lo <= 8; lo++) { let n = 0; for (let r = lo; r < lo + 5; r++) if (z.has(r)) n++; if (n === 5) return true; }
  return false;
}
function outyStrita(hero: readonly number[], flop: readonly number[]): number {
  const znane = new Set([...hero, ...flop]);
  let n = 0;
  for (let c = 0; c < 52; c++) {
    if (znane.has(c)) continue;
    if (czyStritKarta([...hero, ...flop, c].map(rankOf))) n++;
  }
  return n;
}

describe('08-EX-7: check-raise', () => {
  it('rachunek: cena BTN przy puli 6, c-becie 2 i krotności 4,5 (wyrównanie z żetonów)', () => {
    const t = szablon(poziom());
    const p = generateVariant(t, 'latwy', 1, ctx).points[0];
    expect(p?.point).toBe('check-raise');
    if (p?.point !== 'check-raise') return;
    expect(p.pot).toBe(6);
    expect(p.cbet).toBeCloseTo(2, 12);
    expect(p.raiseBig).toBeCloseTo(9, 12); // 4,5 × 2
    // żetony: pula 6 + c-bet 2 + podbicie do 9; BTN dopłaca 7 do puli 6 + 2 + 9 = 17 → 24
    expect(p.requiredBig).toBeCloseTo(7 / (17 + 7), 12);
    expect(p.raiseSmall).toBeNull();
    expect(p.requiredSmall).toBeNull();
  });
  it('z małą krotnością (T): 1,5 × c-bet = 3, BTN dopłaca 1 do puli 6 + 2 + 3 = 11 → 12', () => {
    const p = generateVariant(szablon(poziom(), { big: 4.5, small: 1.5 }), 'latwy', 2, ctx).points[0];
    if (p?.point !== 'check-raise') throw new Error('check-raise');
    expect(p.raiseSmall).toBeCloseTo(3, 12);
    expect(p.requiredSmall).toBeCloseTo(1 / 12, 12);
  });
  it(`${LOSOWANIA} wariantów: bez pary z kartą gracza, draw od 8 outów, stół bez pary / trzech kart koloru / strita / trzech broadwayów`, () => {
    const t = szablon(poziom());
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(t, 'latwy', seed, ctx);
      const p = v.points[0];
      if (p?.point !== 'check-raise') throw new Error('check-raise');
      const flop = v.board.slice(0, 3);
      const rF = flop.map(rankOf);
      expect(new Set(rF).size).toBe(3);
      expect(Math.max(...[0, 1, 2, 3].map((s) => flop.filter((c) => suitOf(c) === s).length))).toBeLessThan(3);
      expect(czyStritKarta(rF)).toBe(false);
      expect(rF.filter((r) => r >= 8).length).toBeLessThanOrEqual(2); // 8 = T
      const rH = v.hero.map(rankOf);
      expect(rH.some((r) => rF.includes(r)) || rH[0] === rH[1]).toBe(false); // bez pary z kartą gracza (także kieszonkowej)
      const outy = outyKoloru(v.hero, flop);
      const strit = outyStrita(v.hero, flop);
      expect(outy + strit).toBeGreaterThanOrEqual(8); // kolor 9 outów albo strit otwarty 8 (combo więcej)
      expect(p.outs).toBeGreaterThanOrEqual(8);
      expect(p.correct).toBe('raise-big');
      expect(v.fingerprint).toBe(`${variantFingerprint(t.id, 'latwy', v.hero, flop)}|${p.pot}`);
    }
  }, 300_000);
  it('determinizm', () => {
    const t = szablon(poziom());
    expect(generateVariant(t, 'latwy', 7, ctx)).toEqual(generateVariant(t, 'latwy', 7, ctx));
  });
  it('błędy szablonu: brak zakresu, zła akcja oczekiwana, krotność ≤ 1, brak puli', () => {
    expect(() => generateVariant(szablon(poziom()), 'latwy', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom({ expected: ['call'] })), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziom(), { big: 1 }), 'latwy', 1, ctx)).toThrow(TemplateError);
    const t = szablon(poziom());
    expect(() => generateVariant({ ...t, decisions: [{ kind: 'check-raise', street: 'flop', spot: 'vs-open.bb-vs-btn', pots: [], cbet: 1 / 3, multipliers: { big: 4.5 } }] }, 'latwy', 1, ctx)).toThrow(TemplateError);
  });
});
