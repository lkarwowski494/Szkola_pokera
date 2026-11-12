// FP, 08-programista-006: δ ≥ 0,5 w river-value to TemplateError z nazwą szablonu (generator).
import { describe, expect, it } from 'vitest';
import { generateVariant, TemplateError, type GeneratorTemplate } from '../src';

const rv = (folds: string[], extra: Record<string, unknown>, calls = ['AJo', 'KJo', 'JTo', 'J9o', '88', '55', 'AKo', 'AQo', 'KQo']): GeneratorTemplate => ({
  id: 'fp-rv', positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], expected: ['bet'], marginMin: 0.05 } },
  decisions: [{ kind: 'river-value', street: 'river', calls, folds, ...extra }],
} as unknown as GeneratorTemplate);
describe('08-programista-006: δ ≥ 0,5 w river-value to TemplateError z nazwą szablonu', () => {
  it.each([0.5, 0.7])('δ = %s', (delta) => {
    const t = rv(['72o'], {});
    (t.levels as unknown as Record<string, { marginMin: number }>).latwy!.marginMin = delta;
    expect(() => generateVariant(t, 'latwy', 1)).toThrow(TemplateError);
    expect(() => generateVariant(t, 'latwy', 1)).toThrow(/fp-rv.*river-value/);
  });
});
