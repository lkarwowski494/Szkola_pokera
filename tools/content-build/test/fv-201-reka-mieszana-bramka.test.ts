// 08-programista-201 (FU, opcja b; FV): dopóki widok oceny nie pokazuje drugiej poprawnej akcji ręki mieszanej jako poprawnej (projekt 04, FW),
// bramka ekranu odrzuca `correct: [..]`. Inaczej wybór drugiej poprawnej akcji ląduje pod nagłówkiem „Dlaczego nie” (fałsz merytoryczny, ADR-04).
// Sonda odtwarzająca: docs/programista/dowody/fu-sonda-reka-mieszana.txt. Wpisy z jednym `correct` i `acceptable` są bez zmian.
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioNaEkran } from '../src/scenariusze';

const szablon = (entries: unknown[]) => ScenarioTemplate.parse({
  id: 'sc-fx-lista-mieszana', module: 'm4', situation: 'Fixture.', table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['4bet'] } },
  decisions: [{ street: 'preflop', kind: 'list-hand', rule: 'R-M4-004', entries,
    actions: ['4bet', 'call', 'fold'].map((a) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ${a}.` })) }],
});

describe('08-programista-201: bramka ekranu a ręka mieszana', () => {
  it('odrzuca wpis z listą w correct, z powodem „czeka na projekt 04 (FW)”', () => {
    const e = checkScenarioNaEkran(szablon([{ hands: ['AKs'], correct: ['4bet', 'call'] }]));
    expect(e).toHaveLength(1);
    expect(e[0]).toMatch(/sc-fx-lista-mieszana/);
    expect(e[0]).toMatch(/ręka mieszana czeka na projekt 04 \(FW\)/);
  });
  it('przepuszcza correct jako napis oraz acceptable (druga akcja dopuszczalna, nie zgodna)', () => {
    expect(checkScenarioNaEkran(szablon([{ hands: ['AA'], correct: '4bet' }, { hands: ['AKo'], correct: '4bet', acceptable: ['call'] }]))).toEqual([]);
  });
});
