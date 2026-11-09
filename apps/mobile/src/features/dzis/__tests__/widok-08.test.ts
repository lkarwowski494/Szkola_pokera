/// <reference types="jest" />
// „Dziś” (08 cz. 5b krok 1; design-spec „Macierz stanów”: Dziś — następna lekcja; PR-01 po ocenie: pierwsza lekcja
// z punktu startu): blok następnej lekcji ze ścieżki domeny (`stanKursu` + `nastepnaLekcja`) i lekcje do sesji ćwiczeń (D-260).
import type { FaktyKursu } from '@szkola/domena';
import type { LessonSummary, ModuleRow } from '@/data/content/repo';
import { etykietaWiersza, lekcjeDoCwiczen, modulyKursu, nastepnaNaDzis } from '@/features/dzis/widok';

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

describe('A04-09: etykieta VoiceOver wiersza lekcji i egzaminu na „Dziś” ze stanem i wynikiem', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const i18n = require('@/i18n').default as { t: (k: string, o?: Record<string, unknown>) => string };
  const t = i18n.t.bind(i18n);
  it('ukończona z wynikiem, rozpoczęta, nowa (bez stanu), egzamin zaliczony', () => {
    expect(etykietaWiersza({ tytul: 'Ranking układów', opis: 'Od najwyższego', stan: 'done', wynik: { dobre: 8, razem: 10 } }, t)).toBe(
      'Ranking układów. Od najwyższego. Ukończona. Wynik: 8 z 10.',
    );
    expect(etykietaWiersza({ tytul: 'A', opis: 'B', stan: 'started', wynik: null }, t)).toBe('A. B. Rozpoczęta.');
    expect(etykietaWiersza({ tytul: 'A', opis: 'B', stan: 'new' }, t)).toBe('A. B.');
    expect(etykietaWiersza({ tytul: 'Egzamin', opis: '10 pytań', stan: 'passed' }, t)).toBe('Egzamin. 10 pytań. Zaliczony.');
    // opis z kropką na końcu (exam.hint): bez podwójnej kropki
    expect(etykietaWiersza({ tytul: 'Egzamin', opis: 'Wyjaśnienia na końcu.', stan: 'new' }, t)).toBe('Egzamin. Wyjaśnienia na końcu.');
  });

  it('ekran „Dziś” używa etykiety ze stanem dla lekcji i egzaminu', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { readFileSync } = require('node:fs') as typeof import('node:fs');
    const dzis = readFileSync(require('node:path').join(__dirname, '..', '..', '..', 'app', '(tabs)', 'index.tsx'), 'utf8');
    expect((dzis.match(/accessibilityLabel=\{etykietaWiersza\(/g) ?? []).length).toBe(2);
  });
});
