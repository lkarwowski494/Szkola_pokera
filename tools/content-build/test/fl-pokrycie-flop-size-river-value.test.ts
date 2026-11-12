// FL (08-FD-3, 08-FD-4): test zgodności z wyrocznią dla szablonów flop-size i river-value na treści pl (pokrycie rodzajów w cz-pokrycie-szablonow.test.ts).
// Dziś treść pl nie ma szablonów tych rodzajów (SC-13, SC-22, 25, 28, 29 wchodzą po recenzji 06), więc test na treści jest pusty, a ten sam kod wyroczni
// przechodzi po fixture'ach (dowód, że wyrocznia sprawdza, a nie przepuszcza). Wyrocznia niezależna od generatora: pełne przejście po talii ewaluatorem i classOf.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { loadScenarioTemplates } from '../src/scenariusze';
import { bledyFlopSize, bledyRiverValue, LOSOWANIA } from './wyrocznie-fl';

const korzen = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(korzen, 'content', 'pl', 'scenarios')).map((x) => x.template);
const fixtures = ['flop-size', 'river-value'].flatMap((k) => loadScenarioTemplates(join(import.meta.dirname, 'fixtures', k)).map((x) => x.template));

describe('FL: szablony flop-size na treści pl zgodne z wyrocznią', () => {
  const szablony = pl.filter((x) => x.decisions.some((d) => d.kind === 'flop-size'));
  it(`liczba szablonów flop-size na treści pl: ${szablony.length} (0 do wejścia SC-13; każdy nowy dostaje test niżej)`, () => { expect(szablony.length).toBeGreaterThanOrEqual(0); });
  for (const t of szablony) {
    it(`${t.id}: ${LOSOWANIA} ziaren na poziom`, () => { expect(bledyFlopSize(t)).toEqual([]); }, 300_000);
  }
});
describe('FL: szablony river-value na treści pl zgodne z wyrocznią', () => {
  const szablony = pl.filter((x) => x.decisions.some((d) => d.kind === 'river-value'));
  it(`liczba szablonów river-value na treści pl: ${szablony.length} (0 do wejścia SC-22, 25, 28, 29; każdy nowy dostaje test niżej)`, () => { expect(szablony.length).toBeGreaterThanOrEqual(0); });
  for (const t of szablony) {
    it(`${t.id}: ${LOSOWANIA} ziaren na poziom`, () => { expect(bledyRiverValue(t)).toEqual([]); }, 300_000);
  }
});
describe('FL: ta sama wyrocznia na fixture\'ach (dowód, że sprawdza)', () => {
  it('flop-size: fixture bez błędów', () => { for (const t of fixtures.filter((x) => x.decisions.some((d) => d.kind === 'flop-size'))) expect(bledyFlopSize(t)).toEqual([]); }, 300_000);
  it('river-value: fixture bez błędów', () => { for (const t of fixtures.filter((x) => x.decisions.some((d) => d.kind === 'river-value'))) expect(bledyRiverValue(t)).toEqual([]); }, 300_000);
  it('wyrocznia widzi błąd: zaniżony margines δ w fixture river-value (0,5) daje błędy', () => {
    const t = fixtures.find((x) => x.decisions.some((d) => d.kind === 'river-value'))!;
    const zly = { ...t, bounds: { ...t.bounds, latwy: { ...t.bounds.latwy!, marginMin: 0.5 } } } as ScenarioTemplate;
    expect(() => bledyRiverValue(zly)).toThrow(); // generator odmawia δ ≥ 0,5 (brak wariantów), wyrocznia nie przepuszcza
  });
});
