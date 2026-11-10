import { nastepnaLekcja, stanKursu, type FaktyKursu, type ModulKursu } from '@szkola/domena';
import type { PostepLekcji } from '@szkola/postep';
import type { LessonSummary, ModuleRow } from '@/data/content/repo';

/**
 * „Dziś” (08 cz. 5b krok 1): następna lekcja ze ścieżki domeny (`stanKursu` + `nastepnaLekcja`, moduly.md „Kurs”)
 * i lekcje, z których sesja ćwiczeń bierze zadania (ukończone + następna, D-260). Czyste funkcje, bez bazy.
 */
export interface BlokNastepnejLekcji {
  lekcjaId: string;
  modulTytul: string;
  nrLekcji: number; // kolejność lekcji w module (1, 2, …)
  tytul: string;
  opis: string;
  rozpoczeta: boolean; // teoria przeczytana, lekcja nieukończona → „Kontynuuj lekcję”
}

/** Moduły ścieżki: tylko z lekcjami (moduł „w przygotowaniu” nie blokuje ścieżki), w kolejności treści. */
export function modulyKursu(moduly: readonly ModuleRow[], lekcje: readonly LessonSummary[]): ModulKursu[] {
  return moduly
    .map((m) => ({ id: m.id, lekcje: lekcje.filter((l) => l.moduleId === m.id).map((l) => l.id) }))
    .filter((m) => m.lekcje.length > 0);
}

function nastepnaId(kurs: readonly ModulKursu[], fakty: FaktyKursu): string | null {
  if (kurs.length === 0) return null;
  return nastepnaLekcja(kurs, stanKursu(kurs, fakty));
}

export function nastepnaNaDzis(
  moduly: readonly ModuleRow[],
  lekcje: readonly LessonSummary[],
  fakty: FaktyKursu,
  postep: readonly PostepLekcji[],
): BlokNastepnejLekcji | null {
  const id = nastepnaId(modulyKursu(moduly, lekcje), fakty);
  const l = lekcje.find((x) => x.id === id);
  if (!l) return null;
  const nr = lekcje.filter((x) => x.moduleId === l.moduleId).findIndex((x) => x.id === l.id) + 1;
  return {
    lekcjaId: l.id,
    modulTytul: moduly.find((m) => m.id === l.moduleId)?.title ?? '',
    nrLekcji: nr,
    tytul: l.title,
    opis: l.sub,
    rozpoczeta: postep.some((p) => p.lekcjaId === l.id && p.teoriaPrzeczytana),
  };
}

export function lekcjeDoCwiczen(moduly: readonly ModuleRow[], lekcje: readonly LessonSummary[], fakty: FaktyKursu): string[] {
  const kurs = modulyKursu(moduly, lekcje);
  const ukonczone = kurs.flatMap((m) => m.lekcje).filter((id) => fakty.ukonczoneLekcje.includes(id));
  const nastepna = nastepnaId(kurs, fakty);
  return nastepna === null ? ukonczone : [...ukonczone, nastepna];
}

type TFn = (k: string, o?: Record<string, unknown>) => string;
/**
 * Etykieta VoiceOver wiersza lekcji albo egzaminu na „Dziś” (A04-09): tytuł, opis, stan i wynik — stan nie tylko na
 * rysunku kropki. Zdania z `t()` (`today.row*`), łączone spacją.
 */
export function etykietaWiersza(w: { tytul: string; opis: string; stan: 'done' | 'started' | 'new' | 'passed'; wynik?: { dobre: number; razem: number } | null }, t: TFn): string {
  return [
    t('today.rowLabel', { tytul: w.tytul, opis: w.opis.replace(/[.!?…]+\s*$/u, '') }), // opis z kropką (exam.hint) bez podwójnej
    w.stan === 'done' ? t('today.rowDone') : w.stan === 'started' ? t('today.rowStarted') : w.stan === 'passed' ? t('today.rowPassed') : null,
    w.wynik ? t('today.rowScore', { dobre: w.wynik.dobre, razem: w.wynik.razem }) : null,
  ]
    .filter((x): x is string => x !== null)
    .join(' ');
}

/** Kolumny kafelków na „Dziś” (D-541): przy dużym tekście jedna kolumna. Próg 1,3 = od ok. AX1 (iOS: AX1 ≈ 1,35, XXXL ≈ 1,24 skali treści). */
export function liczbaKolumnKafli(skalaTekstu: number): 1 | 2 {
  return skalaTekstu >= 1.3 ? 1 : 2;
}

/** Etykieta VoiceOver kafelka: „{tytuł}. {stan}.” — stan nie tylko tekstem na ekranie; bez podwójnej kropki. */
export function etykietaKafla(tytul: string, stan: string): string {
  return `${tytul}. ${stan.replace(/[.!?…]+\s*$/u, '')}.`;
}
