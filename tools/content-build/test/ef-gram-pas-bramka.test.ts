// 08-N1 (sesja EF): bramka budowania range-spot z grupą play („gram / pas”); ekran jej jeszcze nie obsługuje.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate } from '../src/scenariusze';
import { content } from './kit';

const spots = compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots;
const etykiety = spots.find((s) => s.id === 'vs-open.bb-vs-btn')!.actions.map((a) => a.label);
const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set<string>(), moduleIds: new Set(['m4']), spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)] as const)) };
const szablon = (f: (b: any) => void = () => undefined) => {
  const b: any = {
    id: 'sc-fx-gram', module: 'm4', situation: 'Fixture: obrona BB gram / pas.', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 100,
    levels: ['latwy'], bounds: { latwy: { freqs: [{ min: 0.97, max: 1 }], expected: ['play'] } },
    decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'vs-open.bb-vs-btn', rule: 'R-M4-004', play: ['call 2.5', 'raise 10'],
      actions: ['play', 'fold'].map((a) => ({ action: a, explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wyjaśnienie.' })) }],
  };
  f(b);
  return ScenarioTemplate.parse(b);
};
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, 'sc-fx-gram.yaml', sctx).join('\n');

describe('08-N1: bramka grupy play', () => {
  it('założenie testu: spot ma akcje call 2.5, raise 10 i fold', () => { expect(etykiety).toEqual(expect.arrayContaining(['call 2.5', 'raise 10', 'fold'])); });
  it('szablon z grupą play przechodzi', () => { expect(checkScenarioTemplate(szablon(), 'sc-fx-gram.yaml', sctx)).toEqual([]); });
  it('akcja grupy spoza spotu', () => { expect(blad(szablon((b) => { b.decisions[0].play = ['call 2.5', 'raise 99']; }))).toMatch(/grupa play: akcje spoza spotu.*raise 99/); });
  it('akcje punktu muszą być etykietami grupy (play, fold), nie surowymi akcjami spotu', () => { expect(blad(szablon((b) => { b.decisions[0].actions[0].action = 'call 2.5'; }))).toMatch(/akcje spoza węzła spotu/); });
  it('brak wyjaśnienia pasu odrzuca schemat (min. 2 akcje)', () => { expect(() => szablon((b) => { b.decisions[0].actions = [b.decisions[0].actions[0]]; })).toThrow(); });
  it('ekran jeszcze nie obsługuje grupy play', () => { expect(checkScenarioNaEkran(szablon()).join('\n')).toMatch(/grupą play nie jest jeszcze obsługiwany na ekranie/); });
  it('generator: próg pojemności z klas grupy (obrona BB wobec BTN ma ≥ 40 klas gry ≥ 0,97 albo próg = liczba klas)', () => {
    expect(checkScenarioGenerator(szablon(), undefined, 2000, { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 } })).toEqual([]);
  });
});
