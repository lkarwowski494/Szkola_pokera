// Repozytorium aktywności (moduly.md: „krok + odpowiedź w jednej transakcji”; ADR 0010; dane.md: UPSERT kroku po przerwaniu).
import type { OcenaOdpowiedzi, Wynik } from '@szkola/domena';
import { niezaimplementowane } from './niezaimplementowane';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';

export interface OdpowiedzKroku {
  krok: number; zadanie_id: string; rodzina_id: string; wybor: string; // wybor: JSON
  ocena: OcenaOdpowiedzi; zaliczona: 0 | 1; czas_ms: number; odpowiedziano_ms: number;
}
// Zapis odpowiedzi kroku (UPSERT po (aktywnosc_id, krok)) i przesunięcie `aktywnosc.krok` w jednej transakcji;
// wartość = id wiersza odpowiedzi (ten sam przy ponownym zapisie kroku).
export function zapiszKrok(_port: PortBazy, _aktywnoscId: string, _odp: OdpowiedzKroku): Promise<Wynik<number, PowodZapisu>> {
  return niezaimplementowane('zapiszKrok (ADR 0003, 0010, K-15)');
}
