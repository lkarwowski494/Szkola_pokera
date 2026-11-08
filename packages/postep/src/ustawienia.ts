// Repozytorium ustawień (moduly.md „Repozytoria”; schemat.sql `ustawienie`: wartość JSON, lista kluczy i kształt waliduje
// domena albo wywołujący). Odczyt zwraca wartość jako `unknown` (parsowanie u wywołującego), brak wiersza = null.
import type { Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import { jakoWynik } from './bledy';

export type PowodOdczytu = 'odczyt_nieudany';

// Błąd odczytu nie udaje braku: wywołujący dostaje `odczyt_nieudany` (tlo-i-bledy.md §4), nie null.
export async function odczytajUstawienie(port: PortBazy, klucz: string): Promise<Wynik<unknown, PowodOdczytu>> {
  try {
    const [w] = await port.all<unknown>('SELECT wartosc FROM ustawienie WHERE klucz = ?', [klucz]);
    if (w === undefined) return { ok: true, wartosc: null };
    if (!(typeof w === 'object' && w !== null && 'wartosc' in w && typeof w.wartosc === 'string')) return { ok: false, powod: 'odczyt_nieudany' };
    return { ok: true, wartosc: JSON.parse(w.wartosc) as unknown };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' }; // CHECK json_valid wyklucza zły JSON; tu tylko błąd bazy
  }
}

// UPSERT, nie INSERT OR REPLACE (ADR 0003 pkt 4): jeden wiersz na klucz, pozostałe klucze nietknięte.
export function zapiszUstawienie(port: PortBazy, klucz: string, wartosc: unknown, terazMs: number): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(async () => {
    const json = JSON.stringify(wartosc) as string | undefined; // undefined dla undefined i funkcji
    if (json === undefined) throw new Error(`Ustawienie ${klucz} bez wartości JSON`);
    await port.run(
      `INSERT INTO ustawienie (klucz, wartosc, zmieniono_ms) VALUES (?, ?, ?)
       ON CONFLICT (klucz) DO UPDATE SET wartosc = excluded.wartosc, zmieniono_ms = excluded.zmieniono_ms`,
      [klucz, json, terazMs],
    );
  });
}
