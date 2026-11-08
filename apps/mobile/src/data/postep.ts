import { useFocusEffect } from 'expo-router';
import { useCallback, useContext, useRef, useState } from 'react';
import type { Wynik } from '@szkola/domena';
import type { StoredCard, ReviewLogRow } from '@szkola/srs';
import type { PortBazy, PowodOdczytu, PowodZapisu, WierszKarty, WierszLogu } from '@szkola/postep';
import { zapiszBlad } from '@/platform/dziennik';
import { PostepKontekst } from './postepKontekst';

/** Port `postep.db` z `_layout` (ekrany renderują się dopiero po udanym starcie, więc brak portu to błąd programisty). */
export function usePortPostepu(): PortBazy {
  const port = useContext(PostepKontekst);
  if (!port) throw new Error('usePortPostepu poza PostepKontekst');
  return port;
}

const STANY = [0, 1, 2, 3] as const;
function stanKarty(s: number): 0 | 1 | 2 | 3 {
  const x = STANY.find((v) => v === s);
  if (x === undefined) throw new Error(`Stan karty FSRS spoza 0–3: ${s}`); // ts-fsrs State ma 4 wartości (schemat.sql CHECK)
  return x;
}

/** Karta FSRS pakietu `srs` ↔ wiersz tabeli `karta` (kolumny schemat.sql; `zmieniono_ms` = czas zapisu). */
export function wierszZKarty(c: StoredCard, terazMs: number): WierszKarty {
  return {
    rodzina_id: c.familyId, termin_ms: c.due, stabilnosc: c.stability, trudnosc: c.difficulty, dni_zaplanowane: c.scheduledDays,
    kroki_nauki: c.learningSteps, powtorzenia: c.reps, zapomnienia: c.lapses, stan: stanKarty(c.state),
    ostatnia_powtorka_ms: c.lastReview, zmieniono_ms: terazMs,
  };
}
export function kartaZWiersza(w: WierszKarty): StoredCard {
  return {
    familyId: w.rodzina_id, due: w.termin_ms, stability: w.stabilnosc, difficulty: w.trudnosc, scheduledDays: w.dni_zaplanowane,
    learningSteps: w.kroki_nauki, reps: w.powtorzenia, lapses: w.zapomnienia, state: w.stan, lastReview: w.ostatnia_powtorka_ms,
  };
}
const OCENY_FSRS = [1, 2, 3, 4] as const;
/** Wpis logu FSRS bez `odpowiedz_id` (repozytorium dopisuje id odpowiedzi w tej samej transakcji). */
export function logZPowtorki(l: ReviewLogRow): Omit<WierszLogu, 'odpowiedz_id'> {
  const ocena = OCENY_FSRS.find((v) => v === l.rating);
  if (ocena === undefined) throw new Error(`Ocena FSRS spoza 1–4: ${l.rating}`); // review() nie daje Manual (0)
  return { ocena_fsrs: ocena, stan_przed: stanKarty(l.stateBefore), termin_przed_ms: l.dueBefore, powtorzono_ms: l.reviewedAt };
}

export type StanOdczytu<T> = { stan: 'ladowanie' } | { stan: 'ok'; wartosc: T } | { stan: 'blad' };

/**
 * Odczyt z `postep.db` przy każdym wejściu na ekran (dane zmieniają sesje na innych ekranach). Błąd odczytu → stan `blad`
 * i wpis w dzienniku (nie pusta lista: brak danych nie może wyglądać jak brak postępu).
 */
export function useOdczytPostepu<T>(czytaj: (port: PortBazy) => Promise<Wynik<T, string>>, ekran: string): StanOdczytu<T> & { odswiez(): void } {
  const port = usePortPostepu();
  const [stan, ustaw] = useState<StanOdczytu<T>>({ stan: 'ladowanie' });
  const aktualny = useRef(0);
  const odswiez = useCallback(() => {
    const nr = ++aktualny.current;
    void czytaj(port).then((w) => {
      if (nr !== aktualny.current) return; // starszy odczyt nie nadpisuje nowszego
      if (!w.ok) zapiszBlad('odczyt_nieudany', ekran);
      ustaw(w.ok ? { stan: 'ok', wartosc: w.wartosc } : { stan: 'blad' });
    });
  }, [czytaj, port, ekran]);
  useFocusEffect(odswiez);
  return { ...stan, odswiez };
}

/** Wpis w dzienniku dla nieudanego zapisu albo odczytu z portu (kody tlo-i-bledy.md §4). */
export function zapiszBladPostepu(powod: PowodZapisu | PowodOdczytu, ekran: string): void {
  zapiszBlad(powod, ekran);
}
