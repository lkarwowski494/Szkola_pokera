// IJ (P3 recenzji IH, 2a): `zakresGlebokosciStartu` (D-1894, KO-117) — gałęzie, których test ekranu startu nie dotyka. Wyrocznia niezależna od generatora:
// start = stack za pulą + (pula − martwe blindy) ÷ 2; BB wobec BTN: martwe blindy 1,5 − 1 − 0 = 0,5 bb.
import { describe, expect, it } from 'vitest';
import { zakresGlebokosciStartu, type GeneratorTemplate, type LevelBounds } from '../src';

const poziom = (extra: Partial<LevelBounds> = {}): LevelBounds => ({ draws: [], reject: [], expected: ['call'], sprRange: [1.8, 2.3], ...extra });
const spr = (pots: number[], stacks: number[]) => ({ kind: 'spr-call' as const, street: 'flop' as const, spot: 'vs-open.bb-vs-btn', pots, stacks });
const szablon = (extra: Partial<GeneratorTemplate>): GeneratorTemplate => ({
  id: 'sc-ij-zakres', stackBb: 100, positions: { hero: 'BB', villain: 'BTN' }, levels: { latwy: poziom() }, decisions: [spr([5.5], [10, 12])], ...extra,
});
const bezStosu = { kind: 'turn-action', street: 'turn' } as unknown as GeneratorTemplate['decisions'][number];

describe('zakresGlebokosciStartu', () => {
  it('przedział: punkt spr-call, pary z SPR w sprRange → min i max startu (stack + (pula − 0,5) ÷ 2)', () => {
    // pula 5,5; stacki 10 i 12: SPR 1,82 i 2,18 (oba w 1,8–2,3); starty 10 + 2,5 = 12,5 i 12 + 2,5 = 14,5
    expect(zakresGlebokosciStartu(szablon({}), 'latwy')).toEqual({ min: 12.5, max: 14.5 });
  });
  it('para poza sprRange nie wchodzi do przedziału (stack 13: SPR 2,36 > 2,3)', () => {
    expect(zakresGlebokosciStartu(szablon({ decisions: [spr([5.5], [10, 13])] }), 'latwy')).toEqual({ min: 12.5, max: 12.5 });
  });
  it('min = max: decyzja bez punktu stosu → stackBb', () => {
    expect(zakresGlebokosciStartu(szablon({ decisions: [bezStosu], stackBb: 100 }), 'latwy')).toEqual({ min: 100, max: 100 });
  });
  it('szablon z kilkoma punktami: min i max z punktów, w tym stackBb decyzji bez stosu', () => {
    expect(zakresGlebokosciStartu(szablon({ decisions: [spr([5.5], [10, 12]), bezStosu], stackBb: 100 }), 'latwy')).toEqual({ min: 12.5, max: 100 });
  });
  it('null: punkt spr-call bez `positions` (brak martwych blindów → nie zgadujemy)', () => {
    expect(zakresGlebokosciStartu(szablon({ positions: undefined }), 'latwy')).toBeNull();
  });
  it('null: punkt spr-call bez granic wybranego poziomu', () => {
    expect(zakresGlebokosciStartu(szablon({ levels: { sredni: poziom() } }), 'latwy')).toBeNull();
  });
  it('null: decyzja bez punktu stosu i bez `stackBb`', () => {
    expect(zakresGlebokosciStartu(szablon({ decisions: [bezStosu], stackBb: undefined }), 'latwy')).toBeNull();
  });
  it('null: żadna para pula × stack nie mieści się w sprRange poziomu', () => {
    expect(zakresGlebokosciStartu(szablon({ decisions: [spr([5.5], [30])] }), 'latwy')).toBeNull();
  });
});
