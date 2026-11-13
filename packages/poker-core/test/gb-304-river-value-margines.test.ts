// 08-programista-304 (GB; recenzja FX, KO-099; mutanty M5, M6): river-value — (1) granica |w − 0,5| = marginMax jest wyłączona (ostra nierówność, jak `margin < m.max` w inMargin),
// (2) `margins[i].max` obowiązuje bez globalnego marginMax, (3) `margins[i]` ZASTĘPUJE marginMin/marginMax (schemat: content-schema/src/index.ts „zastępuje marginMin/marginMax”):
// `margins: [{ min, max: null }]` = bez górnej granicy nawet przy globalnym marginMax, jak w inMargin (draw-call). Wyrocznia: classComboSplit, niezależnie od generatora.
import { describe, expect, it } from 'vitest';
import { classComboSplit, generateVariant, type GeneratorTemplate, type Card } from '../src';

const CALLS = ['AJs', 'AJo', 'KJs', 'KJo', 'JTs', 'JTo', 'J9s', 'J9o', '88', '55', 'AKs', 'AKo', 'AQs', 'AQo', 'KQs', 'KQo'];
const FOLDS = ['76s', '65s', '54s', 'T9s', '98s'];
type Poziom = { marginMin?: number; marginMax?: number; margins?: { min: number; max: number | null }[] };
const szablon = (poziom: Poziom): GeneratorTemplate => ({
  id: 'gb-304-rv', positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], expected: ['bet'], ...poziom } },
  decisions: [{ kind: 'river-value', street: 'river', calls: CALLS, folds: FOLDS }],
} as unknown as GeneratorTemplate);
const odPolowy = (hero: readonly [Card, Card], board: readonly Card[]): number => {
  const s = classComboSplit(hero, board, CALLS);
  return Math.abs(s.worse / (s.worse + s.better) - 0.5);
};
const odleglosci = (poziom: Poziom, ziarna = 120): number[] => {
  const out: number[] = [];
  for (let seed = 1; seed <= ziarna; seed++) { const v = generateVariant(szablon(poziom), 'latwy', seed); out.push(odPolowy(v.hero as [Card, Card], v.board)); }
  return out;
};

describe('08-programista-304: marginMax i margins w river-value', () => {
  it('granica: |w − 0,5| równe marginMax jest odrzucane (M5: „>=” → „>” przepuszcza wariant dokładnie na granicy)', () => {
    const bezGranicy = odleglosci({ marginMin: 0.05 });
    const powtarzane = bezGranicy.filter((d) => bezGranicy.filter((x) => x === d).length >= 3 && d > 0.05 + 1e-9);
    expect(powtarzane.length).toBeGreaterThan(0); // kontrola: wśród wariantów jest odległość, która się powtarza, więc granica jest naprawdę osiągana
    const granica = powtarzane[0]!;
    for (const d of odleglosci({ marginMin: 0.05, marginMax: granica })) expect(d).toBeLessThan(granica);
  }, 120_000);
  it('margins[0].max bez globalnego marginMax ogranicza odległość od góry (M6: pominięte margins?.[i]?.max → bez górnej granicy)', () => {
    for (const d of odleglosci({ margins: [{ min: 0.05, max: 0.2 }] })) { expect(d).toBeGreaterThanOrEqual(0.05 - 1e-9); expect(d).toBeLessThan(0.2); }
  }, 120_000);
  it('margins[0] zastępuje marginMax: { min, max: null } przy globalnym marginMax 0,1 nie ma górnej granicy (jak inMargin)', () => {
    expect(odleglosci({ marginMin: 0.05, marginMax: 0.1, margins: [{ min: 0.05, max: null }] }).some((d) => d >= 0.1)).toBe(true);
  }, 120_000);
  it('margins[0].min zastępuje globalny marginMin (dolna granica z punktu)', () => {
    for (const d of odleglosci({ marginMin: 0.3, margins: [{ min: 0.05, max: 0.1 }] })) { expect(d).toBeGreaterThanOrEqual(0.05 - 1e-9); expect(d).toBeLessThan(0.1); }
  }, 120_000);
});
