// Format eksportu (ADR 0008 pkt 1–3; dane.md „Format eksportu (wersja 1)”).
import type { Wynik } from './typy';

export const FORMAT_EKSPORTU = 'szkola-pokera-postep';
// Tabele postępu w pliku (dane.md: bez uprawnienie_cache i dziennika), w kolejności rodzic → dziecko.
// `wariant_historia` (D-532, migracja v2) dopisana na końcu; wersja_formatu zostaje 1.
export const TABELE_EKSPORTU = ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki', 'wariant_historia'] as const;
export type TabelaEksportu = (typeof TABELE_EKSPORTU)[number];
// Tabele, których brak w pliku oznacza pustą tabelę: pliki sprzed ich dodania (v1 bez `wariant_historia`) muszą się importować.
// Pozostałe tabele są wymagane (brak = utrata danych przy imporcie, który kasuje i wstawia). Nowa tabela opcjonalna: tylko z decyzją.
const TABELE_OPCJONALNE: readonly TabelaEksportu[] = ['wariant_historia'];
export interface KopertaV1 {
  format: typeof FORMAT_EKSPORTU;
  wersja_formatu: 1;
  utworzono: string; // ISO 8601 UTC
  aplikacja: string;
  dane: Record<string, readonly Record<string, unknown>[]>;
}
export type KopertaDowolna = { format: string; wersja_formatu: number } & Record<string, unknown>;

const czyObiekt = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

// Koperta v1 z danych spoza aplikacji albo null, gdy struktura się nie zgadza (każda z 7 tabel wymaganych to tablica obiektów;
// brak tabeli = utrata danych przy imporcie, który kasuje i wstawia; wyjątek: TABELE_OPCJONALNE, brak = pusta tablica). Kolumny wierszy sprawdza import (pakiet postep).
function kopertaV1(k: Record<string, unknown>): KopertaV1 | null {
  if (k.format !== FORMAT_EKSPORTU || k.wersja_formatu !== 1) return null;
  if (typeof k.utworzono !== 'string' || typeof k.aplikacja !== 'string' || !czyObiekt(k.dane)) return null;
  const dane: Record<string, Record<string, unknown>[]> = {};
  for (const t of TABELE_EKSPORTU) {
    const wiersze = k.dane[t] === undefined && TABELE_OPCJONALNE.includes(t) ? [] : k.dane[t];
    if (!Array.isArray(wiersze)) return null;
    const sprawdzone: Record<string, unknown>[] = [];
    for (const w of wiersze) {
      if (!czyObiekt(w)) return null;
      sprawdzone.push(w);
    }
    dane[t] = sprawdzone;
  }
  return { format: FORMAT_EKSPORTU, wersja_formatu: 1, utworzono: k.utworzono, aplikacja: k.aplikacja, dane };
}

// Decyzja przed dotknięciem bazy: obcy `format`, zła struktura, ucięty plik → bledny_plik; wyższa `wersja_formatu` → nowsza_wersja.
export function walidujEksport(tekst: string, obslugiwana: number): Wynik<KopertaV1, 'bledny_plik' | 'nowsza_wersja'> {
  let k: unknown;
  try {
    k = JSON.parse(tekst);
  } catch {
    return { ok: false, powod: 'bledny_plik' };
  }
  if (!czyObiekt(k) || k.format !== FORMAT_EKSPORTU || typeof k.wersja_formatu !== 'number' || !Number.isInteger(k.wersja_formatu)) {
    return { ok: false, powod: 'bledny_plik' };
  }
  if (k.wersja_formatu > obslugiwana) return { ok: false, powod: 'nowsza_wersja' };
  const v1 = kopertaV1(k); // starsze wersje przeszłyby tu przez migrujFormat; dziś jedyna wersja to 1
  return v1 ? { ok: true, wartosc: v1 } : { ok: false, powod: 'bledny_plik' };
}

// Migracja starszej wersji formatu do bieżącej (ADR 0008 pkt 3). Wersja 1 jest pierwszą: przechodzi bez zmian. Wejście spoza
// zweryfikowanej struktury to błąd wywołującego (walidujEksport sprawdza przed wywołaniem).
export function migrujFormat(k: KopertaDowolna): KopertaV1 {
  const v1 = kopertaV1(k);
  if (!v1) throw new Error(`migrujFormat: nieobsługiwana wersja ${k.wersja_formatu} albo zła struktura`);
  return v1;
}
