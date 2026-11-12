// KO-072 (D-1054, SC-23a/b): punkt „wybór jednej z dwóch rąk” (pick-hand). Wyrocznia niezależna od generatora: kombinacje rywala liczone przez
// przejście po wszystkich parach kart talii i klasyfikację classOf (generator używa classCombos), siła z ewaluatora 7 kart.
import { describe, expect, it } from 'vitest';
import { classOf, FULL_DECK, generateVariant, parseCards, pickHandAnalysis, strength, TemplateError, type Card, type GeneratorTemplate } from '../src';

const CALLS = ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AKo', 'AQs'];
const FOLDS = ['98s', '87s', '76s', '65s', 'T9s', 'J9s', 'QJs'];
const szablon = (mode: 'showdown' | 'blockers', calls = CALLS, folds = FOLDS): GeneratorTemplate => ({
  id: `sc-fx-pick-${mode}`,
  positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], expected: ['best-hand'] } },
  decisions: [{ kind: 'pick-hand', street: 'river', mode, calls, folds }],
} as unknown as GeneratorTemplate);

type Reka = readonly [Card, Card];
/** Wyrocznia: V, F i SDV ręki h na stole board, z zakresu calls ∪ folds, przez pełne przejście po parach talii. */
function wyrocznia(h: Reka, board: readonly Card[], calls: readonly string[], folds: readonly string[]) {
  const martwe = new Set<Card>([...h, ...board]);
  let v = 0, f = 0, wygrywa = 0, wszystkie = 0;
  for (let a = 0; a < FULL_DECK.length; a++) for (let b = a + 1; b < FULL_DECK.length; b++) {
    const x = FULL_DECK[a]!, y = FULL_DECK[b]!;
    if (martwe.has(x) || martwe.has(y)) continue;
    const klasa = classOf(x, y);
    const czySprawdzi = calls.includes(klasa), czyPas = folds.includes(klasa);
    if (!czySprawdzi && !czyPas) continue;
    wszystkie++;
    if (czySprawdzi) v++; else f++;
    if (strength([...h, ...board]) < strength([x, y, ...board])) wygrywa++; // mniejsza siła = lepsza ręka (jak w EI-001)
  }
  return { v, f, sdv: wszystkie === 0 ? 0 : wygrywa / wszystkie };
}
function oczekiwana(mode: 'showdown' | 'blockers', hands: readonly [Reka, Reka], board: readonly Card[]): 0 | 1 | null {
  const [a, b] = [wyrocznia(hands[0], board, CALLS, FOLDS), wyrocznia(hands[1], board, CALLS, FOLDS)];
  if (mode === 'showdown') return a.sdv === 0 && b.sdv > 0 ? 0 : b.sdv === 0 && a.sdv > 0 ? 1 : null;
  if (a.sdv !== 0 || b.sdv !== 0) return null;
  if (a.v < b.v && a.f >= b.f) return 0;
  if (b.v < a.v && b.f >= a.f) return 1;
  return null;
}

describe('KO-072: pickHandAnalysis na wektorach ręcznych (oczekiwane wartości wpisane, nie wyliczane; EP-006)', () => {
  const r2 = (m: 'showdown' | 'blockers', board: string, a: string, b: string) => pickHandAnalysis(m, [parseCards(a) as [Card, Card], parseCards(b) as [Card, Card]], parseCards(board) as Card[], CALLS, FOLDS);
  it('SC-23a: siódemka-high bez SDV kontra para dziesiątek z SDV > 0 → poprawna jest ręka A', () => {
    const r = r2('showdown', 'Ts 9h 4d 3c 2s', '7h 6h', 'Tc 5c');
    expect(r.sdv[0]).toBe(0);
    expect(r.sdv[1]).toBeGreaterThan(0.5);
    expect(r.calls).toEqual([47, 45]);
    expect(r.folds).toEqual([21, 22]);
    expect(r.correct).toBe(0);
    const wa = wyrocznia(parseCards('7h 6h') as [Card, Card], parseCards('Ts 9h 4d 3c 2s') as Card[], CALLS, FOLDS);
    expect([r.calls[0], r.folds[0], r.sdv[0]]).toEqual([wa.v, wa.f, wa.sdv]); // zgodność z wyrocznią
  });
  it('SC-23a: obie ręce z SDV > 0 → null', () => {
    expect(r2('showdown', 'Ts 9h 4d 3c 2s', 'Jh Qh', 'Tc 5c').correct).toBeNull();
  });
  it('SC-23b: obie bez SDV, mniej sprawdzających (V 39 < 42) przy równych pasujących (F 23 = 23) → poprawna ręka B (granica „nie mniej pasujących”, EP-005)', () => {
    const r = r2('blockers', 'Ad 8s 6h 3d 2c', '4s 7s', '4s Ts');
    expect(r.sdv).toEqual([0, 0]);
    expect(r.calls).toEqual([42, 39]);
    expect(r.folds).toEqual([23, 23]);
    expect(r.correct).toBe(1);
    const r3 = r2('blockers', 'Ad 8s 6h 3d 2c', '4s Ts', '4s 7s'); // strony zamienione: poprawna ręka A
    expect(r3.correct).toBe(0);
  });
  it('SC-23b: brak dominacji w obu liczbach (mniej V, ale mniej F) → null (D-1054)', () => {
    const r = r2('blockers', 'Ad 8s 6h 3d 2c', '4s 7s', '5s Ts');
    expect(r.sdv).toEqual([0, 0]);
    expect(r.calls).toEqual([42, 39]);
    expect(r.folds).toEqual([23, 22]);
    expect(r.correct).toBeNull();
  });
  it('SC-23b: ręka z SDV > 0 wyklucza tryb blockers → null', () => {
    expect(r2('blockers', 'Kd 9s 5h 3d 2c', 'Ah 4h', '8c 7c').correct).toBeNull(); // Ah 4h: wheel (A-2-3-4-5), SDV = 1
  });
});

describe('KO-072: generator pick-hand', () => {
  for (const mode of ['showdown', 'blockers'] as const) {
    it(`${mode}: 300 wariantów zgodnych z wyrocznią (poprawna ręka, V, F, SDV, rozłączne karty)`, () => {
      const t = szablon(mode);
      for (let seed = 1; seed <= 300; seed++) {
        const v = generateVariant(t, 'latwy', seed);
        const p = v.points[0];
        expect(p?.point, `seed ${seed}`).toBe('pick-hand');
        if (p?.point !== 'pick-hand') return;
        expect(new Set([...p.hands[0], ...p.hands[1], ...v.board]).size).toBe(9);
        const [wa, wb] = [wyrocznia(p.hands[0], v.board, CALLS, FOLDS), wyrocznia(p.hands[1], v.board, CALLS, FOLDS)];
        expect(p.calls).toEqual([wa.v, wb.v]);
        expect(p.folds).toEqual([wa.f, wb.f]);
        expect(p.sdv[0]).toBeCloseTo(wa.sdv, 12);
        expect(p.sdv[1]).toBeCloseTo(wb.sdv, 12);
        const o = oczekiwana(mode, p.hands, v.board);
        expect(o, `seed ${seed}`).not.toBeNull();
        expect(p.correct).toBe(o === 0 ? 'hand-a' : 'hand-b');
      }
    }, 300_000);
  }
  it('ten sam seed daje ten sam wariant; odciski różnią się drugą ręką', () => {
    const t = szablon('showdown');
    expect(generateVariant(t, 'latwy', 7).fingerprint).toBe(generateVariant(t, 'latwy', 7).fingerprint);
    expect(new Set(Array.from({ length: 100 }, (_x, s) => generateVariant(t, 'latwy', s + 1).fingerprint)).size).toBeGreaterThan(80);
  });
  it('klasa w calls i w folds naraz to błąd szablonu', () => {
    expect(() => generateVariant(szablon('showdown', ['AA'], ['AA', '76s']), 'latwy', 1)).toThrow(TemplateError);
  });
});
