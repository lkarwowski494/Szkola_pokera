// FP, 08-programista-005: komunikat błędu punktu końcowego nazywa rodzaje z szablonu.
import { describe, expect, it } from 'vitest';
import { generateVariant, type GeneratorTemplate } from '../src';

describe('08-programista-005: komunikat punktu końcowego nazywa rodzaje', () => {
  it('dwa punkty końcowe: komunikat wymienia ich rodzaje (river-value), nie tylko „cbet-case albo size-spot”', () => {
    const t = {
      id: 'fp-dwa', positions: { hero: 'BTN', villain: 'BB' },
      levels: { latwy: { draws: [], reject: [], expected: ['bet', 'bet'], marginMin: 0.05 } },
      decisions: [
        { kind: 'river-value', street: 'river', calls: ['AJo'], folds: ['72o'] },
        { kind: 'river-value', street: 'river', calls: ['AJo'], folds: ['72o'] },
      ],
    } as unknown as GeneratorTemplate;
    expect(() => generateVariant(t, 'latwy', 1)).toThrow(/river-value/);
  });
});

