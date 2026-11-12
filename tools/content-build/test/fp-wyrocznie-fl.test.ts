// FP, 08-programista-003: wyrocznie pokrycia biorą δ jak generator (`margins[idx].min` przed `marginMin`), brak δ to błąd testu, nie 0.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { loadScenarioTemplates } from '../src/scenariusze';
import { bledyRiverValue, deltaPunktu } from './wyrocznie-fl';

describe('08-programista-003: deltaPunktu', () => {
  it('margins[idx].min ma pierwszeństwo przed marginMin (jak w scenario-gen.ts)', () => {
    expect(deltaPunktu({ margins: [{ min: 0.05 }] }, 0)).toBe(0.05);
    expect(deltaPunktu({ marginMin: 0.02, margins: [{ min: 0.05 }] }, 0)).toBe(0.05);
    expect(deltaPunktu({ marginMin: 0.03 }, 0)).toBe(0.03);
  });
  it('brak δ (ani margins[idx], ani marginMin) to błąd, nie cicha wartość 0', () => {
    expect(() => deltaPunktu({}, 0)).toThrow(/δ/);
    expect(() => deltaPunktu({ margins: [{ min: 0.05 }] }, 1)).toThrow(/δ/);
  });
  it('wyrocznia river-value na szablonie z samym `margins` (bez marginMin) sprawdza δ = 0,05 i przechodzi', () => {
    const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'river-value'))[0]!.template;
    const b = structuredClone(fx) as unknown as { bounds: { latwy: Record<string, unknown> } };
    delete b.bounds.latwy.marginMin;
    b.bounds.latwy.margins = [{ min: 0.05, max: null }];
    expect(bledyRiverValue(b as unknown as ScenarioTemplate)).toEqual([]);
  }, 120_000);
});
