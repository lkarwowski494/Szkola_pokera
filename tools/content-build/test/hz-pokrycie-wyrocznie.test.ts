// IE (D-1872…D-1875): testy zgodności z wyrocznią niezależną na treści pl dla rodzajów spr-call (SC-26), check-raise (SC-16), turn-action (SC-18, SC-21),
// geo-size (SC-27) i nit-3bet (SC-30). Wyrocznie w wyrocznie-hz.ts liczą od zera z kart i liczb szablonu; filtr szablonów to `decisions.some((d) => d.kind === '…')`
// (pokrycie: cz-pokrycie-szablonow.test.ts). Fikstury tych rodzajów (ho-bramki, ho-nit-3bet) sprawdzają bramkę i generator na kontrolowanych danych, a nie treść aplikacji.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compileRanges } from '../src/ranges';
import { FULL_DECK, generateVariant, type Equity169Data } from '@szkola/poker-core';
import type { Generuj } from './wyrocznie-ho';
import { bledyCheckRaise, bledyGeoSize, bledyNit3bet, bledySprCall, bledyTurnAction, LOSOWANIA_HZ } from './wyrocznie-hz';

const korzen = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(korzen, 'content', 'pl', 'scenarios')).map((x) => x.template);
const ctx = { spots: compileRanges(join(korzen, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: JSON.parse(readFileSync(join(korzen, 'tools/equity/equity169.json'), 'utf8')) as Equity169Data };

describe('IE: szablony spr-call na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'spr-call'));
  it('jest szablon spr-call (SC-26)', () => { expect(s.map((t) => t.id)).toContain('sc-26'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HZ} ziaren na poziom`, () => { expect(bledySprCall(t, ctx)).toEqual([]); }, 300_000);
});
describe('IE: szablony check-raise na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'check-raise'));
  it('jest szablon check-raise (SC-16)', () => { expect(s.map((t) => t.id)).toContain('sc-16'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HZ} ziaren na poziom`, () => { expect(bledyCheckRaise(t, ctx, FULL_DECK)).toEqual([]); }, 300_000);
});
describe('IE: szablony turn-action na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'turn-action'));
  it('są szablony turn-action (SC-18, SC-21)', () => { expect(s.map((t) => t.id)).toEqual(expect.arrayContaining(['sc-18', 'sc-21'])); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HZ} ziaren na poziom`, () => { expect(bledyTurnAction(t, ctx)).toEqual([]); }, 300_000);
});
describe('IE: szablony geo-size na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'geo-size'));
  it('jest szablon geo-size (SC-27)', () => { expect(s.map((t) => t.id)).toContain('sc-27'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HZ} ziaren na poziom`, () => { expect(bledyGeoSize(t, ctx)).toEqual([]); }, 300_000);
});
describe('IE: szablony nit-3bet na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'nit-3bet'));
  it('jest szablon nit-3bet (SC-30)', () => { expect(s.map((t) => t.id)).toContain('sc-30'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HZ} ziaren na poziom`, () => { expect(bledyNit3bet(t, ctx)).toEqual([]); }, 300_000);
});
describe('IE: wyrocznia widzi błąd silnika (mutacje wyniku generatora)', () => {
  const psuj = (zmien: (p: Record<string, unknown>) => void): Generuj => (t, level, seed, c) => {
    const k = structuredClone(generateVariant(t, level, seed, c));
    for (const p of k.points) zmien(p as unknown as Record<string, unknown>);
    return k;
  };
  const sc = (id: string) => pl.find((x) => x.id === id)!;
  it('spr-call: zła cena', () => {
    expect(bledySprCall(sc('sc-26'), ctx, psuj((p) => { p.required = (p.required as number) + 0.01; })).length).toBeGreaterThan(0);
  });
  it('spr-call: zły rodzaj pary', () => {
    expect(bledySprCall(sc('sc-26'), ctx, psuj((p) => { p.pairKind = p.pairKind === 'top' ? 'overpair' : 'top'; })).length).toBeGreaterThan(0);
  });
  it('check-raise: zła cena BTN po dużym podbiciu', () => {
    expect(bledyCheckRaise(sc('sc-16'), ctx, FULL_DECK, psuj((p) => { p.requiredBig = (p.requiredBig as number) * 1.1; })).length).toBeGreaterThan(0);
  });
  it('check-raise: zła liczba outów', () => {
    expect(bledyCheckRaise(sc('sc-16'), ctx, FULL_DECK, psuj((p) => { p.outs = (p.outs as number) + 1; })).length).toBeGreaterThan(0);
  });
  it('turn-action: zła klasa turnu', () => {
    expect(bledyTurnAction(sc('sc-21'), ctx, psuj((p) => { p.turnClass = p.turnClass === 'other' ? 'overcard' : 'other'; })).length).toBeGreaterThan(0);
  });
  it('turn-action: zły rodzaj pary', () => {
    expect(bledyTurnAction(sc('sc-18'), ctx, psuj((p) => { p.pairKind = 'low'; })).length).toBeGreaterThan(0);
  });
  it('geo-size: zły ułamek geometryczny', () => {
    expect(bledyGeoSize(sc('sc-27'), ctx, psuj((p) => { p.fractionBig = (p.fractionBig as number) + 0.01; })).length).toBeGreaterThan(0);
  });
  it('geo-size: zła łączna wpłata małego zakładu', () => {
    expect(bledyGeoSize(sc('sc-27'), ctx, psuj((p) => { p.smallTotal = (p.smallTotal as number) + 1; })).length).toBeGreaterThan(0);
  });
  it('nit-3bet: złe equity', () => {
    expect(bledyNit3bet(sc('sc-30'), ctx, psuj((p) => { p.equity = (p.equity as number) + 0.02; })).length).toBeGreaterThan(0);
  });
  it('nit-3bet: zła cena', () => {
    expect(bledyNit3bet(sc('sc-30'), ctx, psuj((p) => { p.required = (p.required as number) + 0.01; })).length).toBeGreaterThan(0);
  });
});
