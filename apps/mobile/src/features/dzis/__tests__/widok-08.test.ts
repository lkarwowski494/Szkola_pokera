/// <reference types="jest" />
// „Dziś” (08 cz. 5b krok 1; design-spec „Macierz stanów”: Dziś — następna lekcja; PR-01 po ocenie: pierwsza lekcja
// z punktu startu): blok następnej lekcji ze ścieżki domeny (`stanKursu` + `nastepnaLekcja`) i lekcje do sesji ćwiczeń (D-260).
import type { FaktyKursu } from '@szkola/domena';
import type { LessonSummary, ModuleRow } from '@/data/content/repo';
import { lekcjeDoCwiczen, modulyKursu, nastepnaNaDzis } from '@/features/dzis/widok';

const mod = (id: string, ord: number, title: string): ModuleRow => ({ id, ord, title, sub: '', phase: 'mvp', recommended: true });
const lek = (id: string, moduleId: string, ord: number): LessonSummary => ({ id, moduleId, ord, title: `T ${id}`, sub: `S ${id}`, drillCount: 3 });
const MODULY = [mod('m0', 0, 'Zasady gry'), mod('m1', 1, 'Licytacja'), mod('m9', 9, 'Bez lekcji')];
const LEKCJE = [lek('m0.l1', 'm0', 1), lek('m0.l2', 'm0', 2), lek('m1.l1', 'm1', 1)];
const fakty = (f: Partial<FaktyKursu> = {}): FaktyKursu => ({ ukonczoneLekcje: [], punktStartu: null, testy: [], ...f });

describe('widok Dziś', () => {
  it('moduły kursu tylko z lekcjami, w kolejności treści', () => {
    expect(modulyKursu(MODULY, LEKCJE)).toEqual([{ id: 'm0', lekcje: ['m0.l1', 'm0.l2'] }, { id: 'm1', lekcje: ['m1.l1'] }]);
  });

  it('pierwsze użycie („Pomiń” albo brak oceny): pierwsza lekcja pierwszego modułu, nierozpoczęta', () => {
    expect(nastepnaNaDzis(MODULY, LEKCJE, fakty(), [])).toEqual({ lekcjaId: 'm0.l1', modulTytul: 'Zasady gry', nrLekcji: 1, tytul: 'T m0.l1', opis: 'S m0.l1', rozpoczeta: false });
  });

  it('po ukończeniu m0.l1: m0.l2; teoria przeczytana bez ukończenia = rozpoczęta', () => {
    const b = nastepnaNaDzis(MODULY, LEKCJE, fakty({ ukonczoneLekcje: ['m0.l1'] }), [{ lekcjaId: 'm0.l2', teoriaPrzeczytana: true, ukonczonoMs: null }]);
    expect(b).toMatchObject({ lekcjaId: 'm0.l2', nrLekcji: 2, rozpoczeta: true });
  });

  it('punkt startu m1 (ocena poziomu): pierwsza lekcja m1', () => {
    expect(nastepnaNaDzis(MODULY, LEKCJE, fakty({ punktStartu: { modulId: 'm1', ustawionoMs: 1 } }), [])).toMatchObject({ lekcjaId: 'm1.l1', modulTytul: 'Licytacja' });
  });

  it('kurs przerobiony → null', () => {
    expect(nastepnaNaDzis(MODULY, LEKCJE, fakty({ ukonczoneLekcje: ['m0.l1', 'm0.l2', 'm1.l1'] }), [])).toBeNull();
  });

  it('lekcje do ćwiczeń: ukończone w kolejności kursu i następna; bez lekcji spoza kursu', () => {
    expect(lekcjeDoCwiczen(MODULY, LEKCJE, fakty({ ukonczoneLekcje: ['m1.l1', 'm0.l1', 'zz.l9'] }))).toEqual(['m0.l1', 'm1.l1', 'm0.l2']);
    expect(lekcjeDoCwiczen(MODULY, LEKCJE, fakty())).toEqual(['m0.l1']);
  });
});
