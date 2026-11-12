/// <reference types="jest" />
// 08-FN-1 (FR; 06-tresci-007, D-1435): ręka mieszana w list-hand (ADR-04, DC WYS-001). AKs: `correct: [4bet, call]` → obie akcje „zgodne”;
// AKo: `correct: 4bet, acceptable: [call]` → call „dopuszczalne”. `poprawnaAkcja` = pierwsza z listy.
import '@/i18n';
import { classOf, type ListHandVariantDecision, type ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { wariantFg } from '@/test-utils/fgScenariusz';
import { bloki, ocenyAkcji, poprawnaAkcja, przebiegWariantu } from '../wariant';

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const POZIOM: ScenarioLevel = 'latwy';
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-fx-lista', module: 'm4', situation: 'Fixture.', table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['4bet'] } },
  decisions: [{
    street: 'preflop', kind: 'list-hand', rule: 'R-M4-004',
    entries: [{ hands: ['AA'], correct: '4bet' }, { hands: ['AKs'], correct: ['4bet', 'call'] }, { hands: ['AKo'], correct: '4bet', acceptable: ['call'] }],
    actions: [
      { action: '4bet', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, 4-bet.' },
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, sprawdzenie.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, pas.' },
    ],
  }],
});
const ziarnoKlasy = (klasa: string) => {
  for (let z = 1; z < 400; z++) {
    const w = wariantFg(SZABLON, POZIOM, z);
    if (classOf(w.hero[0], w.hero[1]) === klasa) return w;
  }
  throw new Error(`brak ziarna dla ${klasa}`);
};
const punkt = (klasa: string): ListHandVariantDecision => {
  const p = ziarnoKlasy(klasa).points[0]!;
  if (p.point !== 'list-hand') throw new Error('nie list-hand');
  return p;
};

describe('08-FN-1: ręka mieszana w widoku list-hand', () => {
  it('AKs: poprawna = pierwsza z listy (4bet), obie akcje z listy „zgodne”, pas błąd', () => {
    expect(poprawnaAkcja(punkt('AKs'))).toBe('4bet');
    const o = ocenyAkcji(ziarnoKlasy('AKs'), 0, SZABLON);
    expect([o['4bet'], o.call, o.fold]).toEqual(['zgodne', 'zgodne', 'blad']);
  });
  it('AKs: wybór call w przebiegu daje ocenę zgodne, a wyjaśnienie „dobrze” + „dlaczego nie” pozostałych', () => {
    const w = ziarnoKlasy('AKs');
    const r = przebiegWariantu(w, ['call'], SZABLON);
    expect(r.ok && r.wartosc.kroki[0]?.ocena).toBe('zgodne');
    expect(bloki(w, SZABLON, 0, 'call', t)[0]?.rodzaj).toBe('dobrze');
  });
  it('AKo (jedna poprawna + dopuszczalna) bez zmian: 4bet zgodne, call dopuszczalne', () => {
    const o = ocenyAkcji(ziarnoKlasy('AKo'), 0, SZABLON);
    expect([o['4bet'], o.call, o.fold]).toEqual(['zgodne', 'dopuszczalne', 'blad']);
  });
});
