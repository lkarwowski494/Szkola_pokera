// D-1040 / KO-074 (sesja DX): szablon bez flopu (tylko range-spot i size-spot) ma próg pojemności min(40, liczba klas z eligibleClasses
// w pierwszym punkcie range-spot na poziomie); odcisk takiego wariantu to klasa ręki, więc klas nie da się przekroczyć.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { HAND_CLASSES } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, loadScenarioTemplates } from '../src/scenariusze';

const spots = compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots;
const ctx = { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 } };
const baza = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'range-spot')).find((x) => x.template.id === 'sc-fx-rfi-btn')!.template;
/** Szablon z wąskim poziomem łatwym: mało klas rąk spełnia przedział (rfi.utg, raise 2.5 w ≥ 99%). */
const waski = (): ScenarioTemplate => {
  const b = structuredClone(baza) as any;
  b.decisions[0].spot = 'rfi.utg';
  b.positions = { hero: 'UTG', villain: 'BB' };
  b.levels = ['latwy'];
  b.bounds = { latwy: { freqs: [{ min: 0.99, max: 1 }], expected: ['raise 2.5'] } };
  return ScenarioTemplate.parse(b);
};
const klasy = (): number => {
  const spot = spots.find((s) => s.id === 'rfi.utg')!;
  const a = spot.actions.findIndex((x) => x.label === 'raise 2.5');
  return HAND_CLASSES.filter((hc, h) => !spot.uncertain.includes(hc) && spot.actions[a]!.freqs[h]! >= 0.99).length;
};

describe('D-1040: próg pojemności bez flopu', () => {
  it('wąski poziom range-spot ma mniej klas niż 40 (założenie testu)', () => {
    expect(klasy()).toBeGreaterThan(0);
    expect(klasy()).toBeLessThan(40);
  });
  it('szablon z liczbą odcisków równą liczbie klas przechodzi', () => {
    expect(checkScenarioGenerator(waski(), undefined, 2000, ctx)).toEqual([]);
  });
  it('szablon z liczbą odcisków mniejszą niż liczba klas jest nadal odrzucany', () => {
    expect(checkScenarioGenerator(waski(), undefined, 3, ctx).join('\n')).toMatch(/pojemność/);
  });
});
