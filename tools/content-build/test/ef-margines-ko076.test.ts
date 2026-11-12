// KO-076 (sesja EF, BR-POZ-001): poziom łatwy szablonu zakresowego nie losuje rąk z marginesem equity < 2 pp.
// Margines (D-1141): odległość equity klasy ręki wobec losowej ręki od najbliższej klasy po drugiej stronie granicy akcji oczekiwanej
// (klasy z częstością akcji oczekiwanej ≤ 0,5). Wyrocznia niezależna od generatora: liczona tu wprost z macierzy equity169.json.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { classOf, generateVariant, HAND_CLASSES, type Equity169Data, type GeneratorTemplate } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';

const korzen = join(resolve(import.meta.dirname), '..', '..', '..');
const eq = JSON.parse(readFileSync(join(korzen, 'tools', 'equity', 'equity169.json'), 'utf8')) as Equity169Data;
const spots = compileRanges(join(korzen, 'content')).spots;
const ctx = { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: eq };
const LOSOWANIA = 10_000;
const MIN = 0.02;

/** equity klasy wobec losowej ręki (wszystkie 169 klas ważone liczbą par kombinacji). */
const wobecLosowej = (i: number): number => {
  let w = 0;
  let s = 0;
  for (let j = 0; j < eq.classes.length; j++) { w += eq.pairs[i]![j]!; s += eq.pairs[i]![j]! * eq.equity[i]![j]!; }
  return s / w;
};
const e = eq.classes.map((_c, i) => wobecLosowej(i));
const pamiec = new Map<string, number>(); // margines zależy tylko od (spot, akcja, klasa): 169 klas, nie 10 000 losowań
function margines(spotId: string, expected: string, hc: string): number {
  const klucz = `${spotId}|${expected}|${hc}`;
  const znany = pamiec.get(klucz);
  if (znany !== undefined) return znany;
  const m = marginesWprost(spotId, expected, hc);
  pamiec.set(klucz, m);
  return m;
}
function marginesWprost(spotId: string, expected: string, hc: string): number {
  const spot = spots.find((x) => x.id === spotId)!;
  const a = spot.actions.findIndex((x) => x.label === expected);
  const i = eq.classes.indexOf(hc);
  let best = Infinity;
  eq.classes.forEach((c, j) => { if ((spot.actions[a]!.freqs[HAND_CLASSES.indexOf(c)] ?? 0) <= 0.5) best = Math.min(best, Math.abs(e[i]! - e[j]!)); });
  return best;
}

const baza = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'range-spot')).find((x) => x.template.id === 'sc-fx-rfi-btn')!.template;
const szablon = (marginMin?: number): ScenarioTemplate => {
  const b = structuredClone(baza) as any;
  b.levels = ['latwy'];
  b.bounds = { latwy: { freqs: [{ min: 0.97, max: 1 }], expected: ['raise 2.5'], ...(marginMin === undefined ? {} : { equityMarginMin: marginMin }) } };
  return ScenarioTemplate.parse(b);
};
const gen = (t: ScenarioTemplate): GeneratorTemplate => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;
const spotId = (baza.decisions[0] as { spot: string }).spot;
const wartosci = (t: ScenarioTemplate, c = ctx): number[] =>
  Array.from({ length: LOSOWANIA }, (_x, s) => { const v = generateVariant(gen(t), 'latwy', s + 1, c); return margines(spotId, 'raise 2.5', classOf(v.hero[0], v.hero[1])); });

describe('KO-076: margines equity w poziomie łatwym', () => {
  it('bez equityMarginMin generator losuje ręce z marginesem < 2 pp (założenie testu: problem istnieje)', () => {
    expect(Math.min(...wartosci(szablon()))).toBeLessThan(MIN);
  });
  it(`z equityMarginMin ${MIN}: 0 wariantów z marginesem < 2 pp w ${LOSOWANIA} losowaniach`, () => {
    expect(wartosci(szablon(MIN)).filter((m) => m < MIN)).toEqual([]);
  });
  it('equityMarginMin bez macierzy equity w kontekście to błąd szablonu, nie ciche pominięcie', () => {
    const { equity169: _e, ...bez } = ctx;
    expect(() => generateVariant(gen(szablon(MIN)), 'latwy', 1, bez)).toThrow(/equity169/);
  });
});

describe('KO-076: macierz equity w bazie treści', () => {
  it('potrzebna dla szablonu z equityMarginMin i icm-call, niepotrzebna dla zwykłego range-spot', async () => {
    const { potrzebujeMacierzyEquity } = await import('../src/scenariusze');
    expect(potrzebujeMacierzyEquity([baza])).toBe(false);
    expect(potrzebujeMacierzyEquity([szablon(MIN)])).toBe(true);
    const icm = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'icm-call'))[0]!.template;
    expect(potrzebujeMacierzyEquity([icm])).toBe(true);
  });
});
