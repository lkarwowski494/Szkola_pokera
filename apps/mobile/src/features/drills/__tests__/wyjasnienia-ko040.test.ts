/// <reference types="jest" />
/// <reference types="node" />
/**
 * KO-040, BR-OCE-001/002 (sesja BG, rola 06): wyjaśnienia generatorów decyzji zaczynają się od sytuacji, mówią
 * „bo” przed liczbą, a każda opcja ma własne „dlaczego” (nie samo „Tak.”/„Nie.”). Przewodnik:
 * `docs/tresci/przewodnik-wyjasnien-ko040.md`. Decyzja (która opcja jest poprawna) jest testowana w engine.test.ts.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Drill } from '@szkola/content-schema';
import { createRng, HAND_CLASSES } from '@szkola/poker-core';
import pl from '@/i18n/locales/pl.json';
import type { RangeSpot } from '@/data/content/repo';
import { instantiate } from '../engine';
import { RANGE_REASON, REASON_DIRECTION } from '../range-reasons';
import { razNa } from '../text';
import type { ChoiceInstance, DrillInstance } from '../types';

const gen = (generator: string, params: Record<string, string> = {}, count = 40): Drill =>
  ({ kind: 'generated', id: `t.${generator}`, family: `f.${generator}`, rules: [], generator, params, count }) as Drill;
const choice = (d: DrillInstance): ChoiceInstance => {
  if (d.kind !== 'choice') throw new Error(d.kind);
  return d;
};
/** Progi HUD jak w engine.test.ts (hud.* z numbers.yaml po podstawieniu). */
const HUD = { nitMax: 0.14, regLow: 0.18, regHigh: 0.3, loose: 0.35, passiveGap: 10, aggressiveGap: 3, minHands: 30, readHands: 100 };
/** Pozycja pierwszej liczby z procentem w tekście (−1, gdy brak). */
const firstPct = (s: string) => s.search(/\d[\d,]*\s?%/);

describe('KO-040: wyjaśnienia generatorów decyzji', () => {
  it('każdy spot z content/ranges/spots.yaml ma powód z reguły, a klucz istnieje w pl.json', () => {
    const yaml = readFileSync(join(__dirname, '../../../../../../content/ranges/spots.yaml'), 'utf8');
    const ids = [...yaml.matchAll(/^- id: (\S+)/gm)].map((m) => m[1]!);
    expect(ids.length).toBeGreaterThan(30);
    expect(ids.filter((id) => !RANGE_REASON[id])).toEqual([]);
    const reasons = (pl.drill.range as unknown as { reason: Record<string, string> }).reason;
    expect(Object.values(RANGE_REASON).filter((k) => !reasons[k])).toEqual([]);
    expect(Object.values(RANGE_REASON).filter((k) => !REASON_DIRECTION[k])).toEqual([]);
  });

  it('rangeDecision: sytuacja, potem „bo”, częstość solvera dopiero po „bo”; każda opcja ma powód', () => {
    const freqs = HAND_CLASSES.map((hc) => (hc === 'AA' ? 1 : hc === 'AKs' ? 0.5 : hc === 'AKo' ? 0.1 : 0));
    const spot: RangeSpot = { id: 'rfi.utg', title: 'UTG, nikt jeszcze nie wszedł do gry', hero: 'UTG', path: '', playPercent: 0.1, groups: [{ name: 'Przebicie', freqs }] };
    for (const raw of instantiate(gen('rangeDecision', { spots: 'rfi.utg' }, 60), 'l', createRng(3), undefined, { range: () => spot })) {
      const x = choice(raw);
      const e = x.explanation ?? '';
      expect(e).toMatch(/^Masz \S+\. Sytuacja: UTG/);
      const bo = e.indexOf(', bo ');
      expect(bo).toBeGreaterThan(0);
      expect(firstPct(e)).toBeGreaterThan(bo);
      // powód „wąski zakres” (R-M3-002) tylko przy ręce poza zakresem albo na granicy, nigdy przy ręce w zakresie
      if (/Najlepsza akcja/.test(e)) expect(e).not.toContain('pięciu graczy');
      else expect(e).toContain('pięciu graczy');
      for (const o of x.options) {
        expect(o.why).toMatch(/w tej sytuacji ta ręka|na granicy/);
        expect(o.why).not.toMatch(/^Solver/);
      }
    }
  });

  it.each(['flop', 'turn'])('drawCall (%s): sytuacja z drawem i zakładem, decyzja „bo” przed liczbą, powód przy obu opcjach', (street) => {
    for (const raw of instantiate(gen('drawCall', { street }), 'l', createRng(11))) {
      const x = choice(raw);
      const e = x.explanation ?? '';
      expect(e).toMatch(new RegExp(`^Masz .+ na ${street === 'flop' ? 'flopie' : 'turnie'}, rywal`));
      const bo = e.indexOf(', bo ');
      expect(bo).toBeGreaterThan(0);
      expect(firstPct(e)).toBeGreaterThan(bo);
      expect(e).toMatch(/mniej więcej raz na \d/);
      for (const o of x.options) expect(o.why.length).toBeGreaterThan(25);
    }
  });

  it('whoWins, outs, icm, playerType, potOdds: zła opcja ma powód, nie samo „Nie.” (dlaczego dobrze: wyjaśnienie zadania)', () => {
    const drills = [gen('whoWins'), gen('outs', { kind: 'flush' }), gen('outs', { kind: 'gutshot' }), gen('icm', { mode: 'call' }), ({ ...gen('playerType'), params: HUD } as unknown as Drill), gen('potOdds')];
    for (const d of drills)
      for (const raw of instantiate(d, 'l', createRng(7))) {
        const x = choice(raw);
        for (const o of x.options.filter((y) => !y.correct)) expect(o.why).not.toMatch(/^(Tak|Nie)\.?$/);
      }
  });

  it('„raz na N” to rachunek 1 ÷ ułamek zaokrąglony do 0,5', () => {
    expect(razNa(0.25)).toBe('4');
    expect(razNa(1 / 3)).toBe('3');
    expect(razNa(0.2857)).toBe('3,5');
    expect(razNa(0.191)).toBe('5');
  });
});
