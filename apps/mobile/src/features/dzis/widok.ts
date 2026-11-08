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
