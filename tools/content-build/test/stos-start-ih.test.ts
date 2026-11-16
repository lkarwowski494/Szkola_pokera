// IH (D-1894, KO-117): głębokość startu na ekranie to przedział z funkcji `zakresGlebokosciStartu` (poker-core), nie `stackBb`.
// Strażnik: dla każdego szablonu content/pl i poziomu każdy wariant z próbki (≥ 120 ziaren) ma start w [min, max], a oba końce są osiągnięte.
// Rachunek próbki jest niezależny od funkcji (`probkiStosow`: stack + (pula − martwe blindy) ÷ 2 z wariantu generatora).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { zakresGlebokosciStartu, type Equity169Data, type GeneratorContext, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { probkiStosow, ZIARNA_IG } from './stos-start';

const korzen = resolve(import.meta.dirname, '../../..');
const szablony = loadScenarioTemplates(join(korzen, 'content', 'pl', 'scenarios')).map((x) => x.template);
const ctx = { spots: compileRanges(join(korzen, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: JSON.parse(readFileSync(join(korzen, 'tools/equity/equity169.json'), 'utf8')) as Equity169Data } as unknown as GeneratorContext;
const generator = (sz: (typeof szablony)[number]) => ({ id: sz.id, stackBb: sz.stackBb, positions: sz.positions, levels: sz.bounds, decisions: sz.decisions }) as GeneratorTemplate; // jak naGenerator() w apps/mobile wariant.ts
const punktStosu = (sz: (typeof szablony)[number]) => sz.decisions.some((d: { kind: string }) => d.kind === 'spr-call' || d.kind === 'geo-size');

describe('głębokość startu jako przedział (IH, D-1894)', () => {
  it('próbka ma co najmniej 120 ziaren', () => {
    expect(ZIARNA_IG).toBeGreaterThanOrEqual(120);
  });

  it('oczekiwane przedziały ze specyfikacji: sc-26 12,5–15; sc-27 Ł 100, Ś 100–161,75; reszta = stackBb', () => {
    const wynik = (id: string, l: ScenarioLevel) => { const sz = szablony.find((x) => x.id === id)!; return zakresGlebokosciStartu(generator(sz), l); };
    expect(wynik('sc-26', 'latwy')).toEqual({ min: 12.5, max: 15 });
    expect(wynik('sc-26', 'sredni')).toEqual({ min: 12.5, max: 15 });
    expect(wynik('sc-27', 'latwy')).toEqual({ min: 100, max: 100 });
    expect(wynik('sc-27', 'sredni')).toEqual({ min: 100, max: 161.75 });
    for (const sz of szablony.filter((x) => !punktStosu(x))) for (const l of sz.levels as ScenarioLevel[]) expect(zakresGlebokosciStartu(generator(sz), l), `${sz.id} ${l}`).toEqual({ min: sz.stackBb, max: sz.stackBb });
  });

  for (const sz of szablony.filter(punktStosu)) {
    it(`${sz.id}: każdy wariant z próbki ma start w [min, max], oba końce osiągnięte`, () => {
      const probka = probkiStosow(sz, ctx, ZIARNA_IG);
      for (const level of sz.levels as ScenarioLevel[]) {
        const z = zakresGlebokosciStartu(generator(sz), level);
        expect(z, `${sz.id} ${level}`).not.toBeNull();
        const starty = probka.filter((p) => p.level === level).map((p) => p.start);
        expect(starty.length, `${sz.id} ${level}: próbka niepusta`).toBeGreaterThan(0);
        for (const s of starty) { expect(s).toBeGreaterThanOrEqual(z!.min); expect(s).toBeLessThanOrEqual(z!.max); }
        expect(Math.min(...starty), `${sz.id} ${level}: min osiągnięty`).toBe(z!.min);
        expect(Math.max(...starty), `${sz.id} ${level}: max osiągnięty`).toBe(z!.max);
      }
    });
  }
});
