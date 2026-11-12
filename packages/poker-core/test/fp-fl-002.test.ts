// FP, 08-programista-002: filtr dryBoard w river-value (M06 kolor, M07 strit) testowany tam, gdzie żaden inny warunek go nie maskuje.
import { describe, expect, it } from 'vitest';
import { categoryOf, generateVariant, HandCategory, strength, suitOf, type Card, type GeneratorTemplate } from '../src';

const rv = (folds: string[], extra: Record<string, unknown>, calls = ['AJo', 'KJo', 'JTo', 'J9o', '88', '55', 'AKo', 'AQo', 'KQo']): GeneratorTemplate => ({
  id: 'fp-rv', positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], expected: ['bet'], marginMin: 0.05 } },
  decisions: [{ kind: 'river-value', street: 'river', calls, folds, ...extra }],
} as unknown as GeneratorTemplate);
const kolory = (board: readonly Card[]) => [0, 1, 2, 3].map((su) => board.filter((c) => suitOf(c) === su).length);

describe('08-programista-002: dryBoard (M06, M07)', () => {
  it('M06: pasujące ręce bez koloru (72o) nie maskują warunku: stół bez 3 kart jednej barwy i bez strita', () => {
    const zle: string[] = [];
    for (let seed = 1; seed <= 200; seed++) {
      const v = generateVariant(rv(['72o'], { pairKind: ['overpair'], dryBoard: true }), 'latwy', seed);
      if (Math.max(...kolory(v.board)) >= 3) zle.push(`${seed}: kolor`);
      if (categoryOf(strength(v.board)) === HandCategory.Straight) zle.push(`${seed}: strit na stole`);
    }
    expect(zle).toEqual([]);
  }, 300_000);
  it('M07: dryBoard bez pairKind odrzuca stół ze stritem (przy pairKind: overpair warunek jest nadmiarowy)', () => {
    const zle: string[] = [];
    for (let seed = 1; seed <= 600; seed++) {
      const v = generateVariant(rv(['32o'], { dryBoard: true }), 'latwy', seed);
      if (categoryOf(strength(v.board)) === HandCategory.Straight) zle.push(`${seed}: strit na stole`);
    }
    expect(zle).toEqual([]);
  }, 300_000);
});

