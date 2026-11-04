// Eksport, import, kopia i „Usuń postęp” przez port (ADR 0008, 0013; dane.md; algorytmy: e2-schemat.mjs sekcje 6–7).
// Sygnatury uzupełnione przez rolę 07 (moduly.md podaje tylko nazwy operacji) — luka dla 05, zapis w strategia.md §9.
import type { Wynik } from '@szkola/domena';
import { niezaimplementowane } from './niezaimplementowane';
import type { PortBazy } from './port';

export type PowodZapisu = 'zapis_nieudany' | 'brak_miejsca' | 'przerwano_w_tle';
// Koperta ADR 0008 jako tekst JSON; odczyt w jednej transakcji pod ochroną.
export function eksportuj(_port: PortBazy, _meta: { terazMs: number; aplikacja: string }): Promise<Wynik<string, PowodZapisu>> {
  return niezaimplementowane('eksportuj (ADR 0008, BR-DANE-001)');
}
// Walidacja całości przed dotknięciem bazy; jedna transakcja; dzisiejsze aktywności z limitu spoza pliku zostają (ADR 0007).
export function importuj(
  _port: PortBazy,
  _tekst: string,
  _dzienLokalny: string,
): Promise<Wynik<void, 'bledny_plik' | 'nowsza_wersja' | PowodZapisu>> {
  return niezaimplementowane('importuj (ADR 0008, BR-DANE-002)');
}
// Kopia działającej bazy przed importem i migracją: VACUUM INTO ? (dane.md „Polityka kopii”), pod ochroną.
export function kopiaBazy(_port: PortBazy, _sciezka: string): Promise<Wynik<void, PowodZapisu>> {
  return niezaimplementowane('kopiaBazy (ADR 0008, 0013)');
}
// BR-DANE-003: postęp usunięty; dzisiejsze zużycie limitu (puste znaczniki) i uprawnienie_cache zostają.
export function usunPostep(_port: PortBazy, _dzienLokalny: string): Promise<Wynik<void, PowodZapisu>> {
  return niezaimplementowane('usunPostep (BR-DANE-003, ADR 0004, 0007)');
}
