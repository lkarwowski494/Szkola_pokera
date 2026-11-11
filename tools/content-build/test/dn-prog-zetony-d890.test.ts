// D-890 (docs/decyzje/DA.md): próg „w grze o żetony” w icm-call = (S − b) ÷ (2S), nie stałe 0,5.
// Rachunek niezależny od kodu: pas zostawia S − b żetonów, sprawdzenie daje 2S z prawdopodobieństwem e i 0 w przeciwnym razie;
// próg to e, przy którym oczekiwane żetony się zrównują (szukany bisekcją, bez wzoru zamkniętego).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { blindBb, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';

const root = resolve(import.meta.dirname, '../../..');
const fixtures = join(resolve(import.meta.dirname), 'fixtures');
const szablon = loadScenarioTemplates(join(fixtures, 'icm-call'))[0]!.template;
const gt = { id: szablon.id, stackBb: szablon.stackBb, positions: szablon.positions, levels: szablon.bounds, decisions: szablon.decisions } as GeneratorTemplate;
const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) };

/** Próg e, przy którym sprawdzenie i pas dają tyle samo oczekiwanych żetonów (bisekcja po funkcji wartości, nie wzór). */
function progBisekcja(stos: number, blind: number): number {
  const wartoscSprawdzenia = (e: number) => e * 2 * stos;
  const wartoscPasa = stos - blind;
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (wartoscSprawdzenia(mid) < wartoscPasa) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

describe('D-890: requiredChips w wariancie icm-call liczony z blindem', () => {
  it('BB, 10 bb: niezależny rachunek daje 45% (9 ÷ 20), nie 50%', () => {
    expect(progBisekcja(10, blindBb('BB'))).toBeCloseTo(0.45, 9);
  });
  for (const l of ['latwy', 'sredni', 'trudny'] as ScenarioLevel[]) {
    it(`poziom ${l}: requiredChips wariantu = próg z bisekcji dla stosu i blinda gracza`, () => {
      const p = generateVariant(gt, l, 7, ctx).points.find((x) => x.point === 'icm-call');
      if (!p || p.point !== 'icm-call') throw new Error('brak punktu icm-call');
      expect(p.requiredChips).toBeCloseTo(progBisekcja(szablon.stackBb as number, blindBb(szablon.positions!.hero)), 9);
    }, 60_000);
  }
});
