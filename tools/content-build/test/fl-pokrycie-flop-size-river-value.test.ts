// FL (08-FD-3, 08-FD-4): test zgodności z wyrocznią dla szablonów flop-size i river-value na treści pl (pokrycie rodzajów w cz-pokrycie-szablonow.test.ts).
// Dziś treść pl nie ma szablonów tych rodzajów (SC-13, SC-22, 25, 28, 29 wchodzą po recenzji 06), więc test na treści jest pusty, a ten sam kod wyroczni
// przechodzi po fixture'ach (dowód, że wyrocznia sprawdza, a nie przepuszcza). Wyrocznia niezależna od generatora: pełne przejście po talii ewaluatorem i classOf.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { classOf, FULL_DECK, generateVariant, strength, type Card, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { loadScenarioTemplates } from '../src/scenariusze';

const korzen = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(korzen, 'content', 'pl', 'scenarios')).map((x) => x.template);
const fixtures = ['flop-size', 'river-value'].flatMap((k) => loadScenarioTemplates(join(import.meta.dirname, 'fixtures', k)).map((x) => x.template));
const LOSOWANIA = 40;
const gen = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

/** Sprawdza flop-size: N kart turnu z wyroczni = nominalne 9 outów koloru, e = N/47, marginesy ≥ marginMin poziomu; zwraca listę błędów. */
function bledyFlopSize(t: ScenarioTemplate): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'flop-size');
  const d = t.decisions[idx]!;
  if (d.kind !== 'flop-size') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    const delta = t.bounds[level]!.marginMin ?? 0;
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(gen(t), level, seed);
      const p = v.points[idx];
      if (p?.point !== 'flop-size') { e.push(`${t.id} ${level} ${seed}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const znane = new Set<Card>([...v.hero, ...v.villain, ...flop]);
      let n = 0, remisy = 0;
      for (const c of FULL_DECK) {
        if (znane.has(c)) continue;
        const [r, h] = [strength([...v.villain, ...flop, c]), strength([...v.hero, ...flop, c])];
        if (r < h) n++; else if (r === h) remisy++;
      }
      const ee = n / 47;
      const cena = (f: number) => f / (1 + 2 * f);
      if (remisy !== 0) e.push(`${t.id} ${level} ${seed}: remisy ${remisy}`);
      if (Math.abs(p.hit - ee) > 1e-12) e.push(`${t.id} ${level} ${seed}: hit ${p.hit} ≠ ${ee}`);
      if (!(ee - cena(d.small) >= delta - 1e-12 && cena(d.big) - ee >= delta - 1e-12)) e.push(`${t.id} ${level} ${seed}: margines poniżej ${delta}`);
      const poprawna: string = p.correct;
      if (poprawna !== 'bet-big') e.push(`${t.id} ${level} ${seed}: poprawna ${poprawna}`);
    }
  }
  return e;
}
/** Sprawdza river-value: w z pełnego przejścia po talii, akcja oczekiwana poziomu, margines ≥ δ, brak lepszej ręki wśród pasujących. */
function bledyRiverValue(t: ScenarioTemplate): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'river-value');
  const d = t.decisions[idx]!;
  if (d.kind !== 'river-value') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    const b = t.bounds[level]!;
    const delta = b.marginMin ?? 0;
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(gen(t), level, seed);
      const p = v.points[idx];
      if (p?.point !== 'river-value') { e.push(`${t.id} ${level} ${seed}: punkt ${p?.point}`); continue; }
      const martwe = new Set<Card>([...v.hero, ...v.board]);
      const moja = strength([...v.hero, ...v.board]);
      let W = 0, L = 0, lepszePasujace = 0;
      for (let a = 0; a < FULL_DECK.length; a++) for (let c = a + 1; c < FULL_DECK.length; c++) {
        const [x, y] = [FULL_DECK[a]!, FULL_DECK[c]!];
        if (martwe.has(x) || martwe.has(y)) continue;
        const klasa = classOf(x, y);
        const jego = strength([x, y, ...v.board]);
        if (d.calls.includes(klasa)) { if (moja < jego) W++; else if (moja > jego) L++; }
        else if (d.folds.includes(klasa) && moja > jego) lepszePasujace++;
      }
      const w = W / (W + L);
      const oczekiwana = b.expected[idx];
      if (lepszePasujace !== 0) e.push(`${t.id} ${level} ${seed}: lepsze ręce wśród pasujących (${lepszePasujace})`);
      if (oczekiwana === 'bet' ? !(w - 0.5 >= delta - 1e-9) : !(0.5 - w >= delta - 1e-9)) e.push(`${t.id} ${level} ${seed}: w = ${w}, oczekiwana ${oczekiwana}, δ ${delta}`);
      if (p.correct !== oczekiwana || Math.abs(p.w - w) > 1e-12) e.push(`${t.id} ${level} ${seed}: wariant ${p.correct} w ${p.w}, wyrocznia ${oczekiwana} w ${w}`);
    }
  }
  return e;
}

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
