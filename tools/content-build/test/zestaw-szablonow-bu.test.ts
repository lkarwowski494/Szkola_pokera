// ŚR-103 b (F6, KO-049): zestaw szablonów modułu nie ma wszystkich poziomów łatwych z tą samą oczekiwaną odpowiedzią.
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioSet } from '../src/scenariusze';

const B = (expected: string[]) => ({ draws: ['flush'], marginMin: 0.1, marginMax: null, reject: [], expected });
const szablon = (id: string, module: string, expected: string[]) =>
  ScenarioTemplate.parse({
    id, module, situation: 's', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 100, levels: ['latwy'],
    bounds: { latwy: B(expected) },
    decisions: [{ street: 'flop', kind: 'draw-call', pots: [20], fractions: [0.5], villain: 'bet', rule: 'R-M2-001',
      actions: [{ action: 'call', explanation: 'x' }, { action: 'fold', explanation: 'y' }] }],
  });

describe('F6: ŚR-103 b, zestaw szablonów modułu', () => {
  it('dwa szablony modułu z łatwym „call” w obu to błąd z modułem i id szablonów', () => {
    const e = checkScenarioSet([szablon('sc-a', 'm2', ['call']), szablon('sc-b', 'm2', ['call'])]);
    expect(e.join('\n')).toMatch(/m2.*sc-a.*sc-b.*call/);
  });
  it('różne odpowiedzi łatwe w module: bez błędu', () => {
    expect(checkScenarioSet([szablon('sc-a', 'm2', ['call']), szablon('sc-b', 'm2', ['fold'])])).toEqual([]);
  });
  it('jeden szablon w module albo różne moduły: bez błędu', () => {
    expect(checkScenarioSet([szablon('sc-a', 'm2', ['call']), szablon('sc-b', 'm3', ['call'])])).toEqual([]);
  });
});
