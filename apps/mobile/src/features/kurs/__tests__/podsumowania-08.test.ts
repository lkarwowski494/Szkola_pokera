/// <reference types="jest" />
// Podsumowania na ekranie Nauka (rola 08 cz. 5): test modułu — najlepszy wynik (ułamek), zaliczony w którejkolwiek próbie,
// liczba prób (jak dotychczasowe examSummaryMap w user.db); lekcja ukończona = postep_lekcji.ukonczono_ms.
import { podsumowanieLekcji, podsumowanieTestow } from '@/features/kurs/podsumowania';

const w = (modulId: string, poprawne: number, wszystkie: number, zaliczony: boolean, koniecMs: number) => ({ aktywnoscId: `a${koniecMs}`, modulId, poprawne, wszystkie, zaliczony, koniecMs });

describe('podsumowania', () => {
  it('testy: najlepszy ułamek (nie najwyższa liczba), zaliczenie z dowolnej próby, liczba prób; brak prób → brak wpisu', () => {
    const m = podsumowanieTestow([w('m1', 9, 15, false, 1), w('m1', 13, 15, true, 2), w('m1', 10, 12, false, 3), w('m2', 1, 15, false, 4)]);
    expect(m.get('m1')).toEqual({ best: 13, total: 15, passed: true, attempts: 3 });
    expect(m.get('m2')).toEqual({ best: 1, total: 15, passed: false, attempts: 1 });
    expect(m.has('m3')).toBe(false);
  });
  it('lekcje: ukończona tylko z datą ukończenia; wynik najlepszy z wyników lekcji albo brak', () => {
    const m = podsumowanieLekcji(
      [{ lekcjaId: 'l1', teoriaPrzeczytana: true, ukonczonoMs: 5 }, { lekcjaId: 'l2', teoriaPrzeczytana: true, ukonczonoMs: null }],
      [{ lekcjaId: 'l1', poprawne: 2, wszystkie: 3 }],
    );
    expect(m.get('l1')).toEqual({ done: true, bestCorrect: 2, total: 3 });
    expect(m.get('l2')).toEqual({ done: false, bestCorrect: null, total: null });
    expect(m.has('l3')).toBe(false);
  });
});
