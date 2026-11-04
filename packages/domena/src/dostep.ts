// Logika dostępu (ADR 0006; wektory: docs/monetyzacja.md „Logika dostępu: wektory”).
// Kształt `Pamiec` uzupełniony przez rolę 07 według tabeli `uprawnienie_cache` (schemat.sql:103–107), bo moduly.md go nie podaje.
import { niezaimplementowane } from './niezaimplementowane';

export type OdczytSklepu =
  | { ok: true; transakcje: { produkt: string; wygasaMs: number | null; odebrana: boolean }[] }
  | { ok: false };
export interface Pamiec {
  produkty: readonly { produkt: string; wygasaMs: number | null }[];
  odczytanoMs: number;
}

export function decyzja(
  _odczyt: OdczytSklepu,
  _pamiec: Pamiec | null,
  _teraz: number,
  _odblokowuja: readonly string[],
): { dostep: boolean; zrodlo: 'sklep' | 'pamiec' | 'brak'; nowaPamiec: Pamiec | null } {
  return niezaimplementowane('decyzja (ADR 0006, BR-ZAK-003)');
}
