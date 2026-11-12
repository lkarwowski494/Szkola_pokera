// 08-FN-1 (sesja FR): schemat i bramka szablonu dla ręki mieszanej w list-hand (`correct: [..]`, ADR-04). Wpisy z jednym `correct` bez zmian.
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioTemplate } from '../src/scenariusze';

const baza = (entries: unknown[], expected = ['4bet'], akcje = ['4bet', 'call', 'fold']) => ({
  id: 'sc-fx-lista-mieszana', module: 'm4', situation: 'Fixture.', table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected } },
  decisions: [{ street: 'preflop', kind: 'list-hand', rule: 'R-M4-004', entries, actions: akcje.map((a) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ${a}.` })) }],
});
const ctx = { ruleLevels: new Map<string, 'math'>([['R-M4-004', 'math']]), numberKeys: new Set<string>(), moduleIds: new Set(['m4']) } as unknown as Parameters<typeof checkScenarioTemplate>[2];
const blad = (b: unknown) => checkScenarioTemplate(ScenarioTemplate.parse(b), 'sc-fx-lista-mieszana.yaml', ctx).join('\n');

describe('08-FN-1: ręka mieszana w list-hand', () => {
  it('schemat: correct jako lista (≥ 2 różne akcje) przechodzi; jedna akcja jako napis jak dotąd', () => {
    expect(() => ScenarioTemplate.parse(baza([{ hands: ['AKs'], correct: ['4bet', 'call'] }, { hands: ['AKo'], correct: '4bet', acceptable: ['call'] }]))).not.toThrow();
  });
  it('schemat: lista z jedną akcją albo z powtórzeniem jest odrzucona', () => {
    expect(() => ScenarioTemplate.parse(baza([{ hands: ['AKs'], correct: ['4bet'] }]))).toThrow();
    expect(() => ScenarioTemplate.parse(baza([{ hands: ['AKs'], correct: ['call', 'call'] }]))).toThrow();
  });
  it('bramka: poprawna ręka mieszana bez błędów', () => {
    expect(blad(baza([{ hands: ['AKs'], correct: ['4bet', 'call'] }]))).toBe('');
  });
  it('bramka: każda akcja poprawna z listy wymaga wyjaśnienia (BR-OCE-002)', () => {
    expect(blad(baza([{ hands: ['AKs'], correct: ['4bet', 'limp'] }]))).toMatch(/akcja limp z listy rąk nie ma wyjaśnienia/);
  });
  it('bramka: oczekiwana akcja poziomu to pierwsza z listy (druga nie liczy się jako oczekiwana)', () => {
    expect(blad(baza([{ hands: ['AKs'], correct: ['4bet', 'call'] }], ['4bet']))).toBe('');
    expect(blad(baza([{ hands: ['AKs'], correct: ['4bet', 'call'] }], ['call']))).toMatch(/żaden wpis listy nie ma akcji oczekiwanej call/);
  });
});
