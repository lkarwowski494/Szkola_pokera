// KO-111 (sesja HO): testy zgodności z wyrocznią niezależną na treści pl dla rodzajów defend (SC-07, 15, 17), list-hand (SC-10), turn-bet (SC-20), pick-hand (SC-23)
// i river-catch (SC-24, 31). Wyrocznie w wyrocznie-ho.ts liczą od zera z kart; filtr szablonów to `decisions.some((d) => d.kind === '…')` (pokrycie: cz-pokrycie-szablonow.test.ts).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compileRanges } from '../src/ranges';
import { generateVariant } from '@szkola/poker-core';
import { bledyDefend, bledyListHand, bledyPickHand, bledyRiverCatch, bledyTurnBet, LOSOWANIA_HO, type Generuj } from './wyrocznie-ho';

const korzen = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(korzen, 'content', 'pl', 'scenarios')).map((x) => x.template);
const ctx = { spots: compileRanges(join(korzen, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 } };

describe('KO-111: szablony defend na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'defend'));
  it('są szablony defend (SC-07, 15, 17)', () => { expect(s.map((t) => t.id)).toEqual(expect.arrayContaining(['sc-07', 'sc-15', 'sc-17'])); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HO} ziaren na poziom`, () => { expect(bledyDefend(t, ctx)).toEqual([]); }, 300_000);
});
describe('KO-111: szablony list-hand na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'list-hand'));
  it('jest szablon list-hand (SC-10)', () => { expect(s.map((t) => t.id)).toContain('sc-10'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HO} ziaren na poziom`, () => { expect(bledyListHand(t, ctx)).toEqual([]); }, 300_000);
});
describe('KO-111: szablony turn-bet na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'turn-bet'));
  it('jest szablon turn-bet (SC-20)', () => { expect(s.map((t) => t.id)).toContain('sc-20'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HO} ziaren na poziom`, () => { expect(bledyTurnBet(t, ctx)).toEqual([]); }, 300_000);
});
describe('KO-111: szablony pick-hand na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'pick-hand'));
  it('jest szablon pick-hand (SC-23)', () => { expect(s.map((t) => t.id)).toContain('sc-23'); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HO} ziaren na poziom`, () => { expect(bledyPickHand(t, ctx)).toEqual([]); }, 300_000);
});
describe('KO-111: szablony river-catch na treści pl zgodne z wyrocznią', () => {
  const s = pl.filter((x) => x.decisions.some((d) => d.kind === 'river-catch'));
  it('są szablony river-catch (SC-24, 31)', () => { expect(s.map((t) => t.id)).toEqual(expect.arrayContaining(['sc-24', 'sc-31'])); });
  for (const t of s) it(`${t.id}: ${LOSOWANIA_HO} ziaren na poziom`, () => { expect(bledyRiverCatch(t, ctx)).toEqual([]); }, 300_000);
});
describe('KO-111: wyrocznia widzi błąd silnika (mutacje wyniku generatora)', () => {
  const psuj = (zmien: (p: Record<string, unknown>) => void): Generuj => (t, level, seed, c) => {
    const v = generateVariant(t, level, seed, c);
    const k = structuredClone(v) as typeof v;
    for (const p of k.points) zmien(p as unknown as Record<string, unknown>);
    return k;
  };
  const sc = (id: string) => pl.find((x) => x.id === id)!;
  it('river-catch: odwrócona poprawna akcja', () => {
    expect(bledyRiverCatch(sc('sc-24'), ctx, psuj((p) => { p.correct = p.correct === 'call' ? 'fold' : 'call'; })).length).toBeGreaterThan(0);
  });
  it('river-catch: zła cena', () => {
    expect(bledyRiverCatch(sc('sc-31'), ctx, psuj((p) => { p.required = (p.required as number) + 0.01; })).length).toBeGreaterThan(0);
  });
  it('defend: odwrócona poprawna akcja', () => {
    expect(bledyDefend(sc('sc-17'), ctx, psuj((p) => { p.correct = p.correct === 'call' ? 'fold' : 'call'; })).length).toBeGreaterThan(0);
  });
  it('list-hand: zła poprawna akcja', () => {
    expect(bledyListHand(sc('sc-10'), ctx, psuj((p) => { p.correct = 'fold'; })).length).toBeGreaterThan(0);
  });
  it('turn-bet: zły hit', () => {
    expect(bledyTurnBet(sc('sc-20'), ctx, psuj((p) => { p.hit = (p.hit as number) + 0.05; })).length).toBeGreaterThan(0);
  });
  it('pick-hand: zamienione rozstrzygnięcie', () => {
    expect(bledyPickHand(sc('sc-23'), ctx, psuj((p) => { p.correct = p.correct === 'hand-a' ? 'hand-b' : 'hand-a'; })).length).toBeGreaterThan(0);
  });
});
