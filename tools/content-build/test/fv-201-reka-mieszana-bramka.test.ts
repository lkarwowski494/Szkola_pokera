// 08-programista-201 (FU, opcja b; FV): dopóki widok oceny nie pokazywał drugiej poprawnej akcji ręki mieszanej jako poprawnej (projekt 04, FW),
// bramka ekranu odrzucała `correct: [..]`. Inaczej wybór drugiej poprawnej akcji lądował pod nagłówkiem „Dlaczego nie” (fałsz merytoryczny, ADR-04).
// GB (FW §3, D-1502, kryterium 6): widok oceny pokazuje „Też dobrze” (apps/mobile gb-reka-mieszana-ekran.test.tsx, kryteria 1–4 zielone), więc bramka przepuszcza `correct: [..]`.
// ZMIANA ISTNIEJĄCEGO TESTU (powód): pierwszy test oczekiwał odrzucenia; po wdrożeniu widoku oczekuje przepuszczenia. Wpisy z jednym `correct` i `acceptable` bez zmian.
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioNaEkran } from '../src/scenariusze';

const szablon = (entries: unknown[]) => ScenarioTemplate.parse({
  id: 'sc-fx-lista-mieszana', module: 'm4', situation: 'Fixture.', table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['4bet'] } },
  decisions: [{ street: 'preflop', kind: 'list-hand', rule: 'R-M4-004', entries,
    actions: ['4bet', 'call', 'fold'].map((a) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ${a}.` })) }],
});

describe('08-programista-201 (zdjęta w GB, FW §3): bramka ekranu a ręka mieszana', () => {
  it('przepuszcza wpis z listą w correct (ręka mieszana, ADR-04): widok oceny pokazuje obie akcje jako poprawne (FW §3, kryterium 6)', () => {
    expect(checkScenarioNaEkran(szablon([{ hands: ['AKs'], correct: ['4bet', 'call'] }]))).toEqual([]);
  });
  it('wpis z listą w correct obok wpisu z acceptable: też bez zastrzeżeń bramki', () => {
    expect(checkScenarioNaEkran(szablon([{ hands: ['AKs'], correct: ['4bet', 'call'] }, { hands: ['AKo'], correct: '4bet', acceptable: ['call'] }]))).toEqual([]);
  });
  it('przepuszcza correct jako napis oraz acceptable (druga akcja dopuszczalna, nie zgodna)', () => {
    expect(checkScenarioNaEkran(szablon([{ hands: ['AA'], correct: '4bet' }, { hands: ['AKo'], correct: '4bet', acceptable: ['call'] }]))).toEqual([]);
  });
});
