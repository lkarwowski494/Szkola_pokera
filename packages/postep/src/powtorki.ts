// Repozytorium powtórek (moduly.md: „karty do terminu, zapis karty UPSERT + log”; ADR 0003: UPSERT, nie REPLACE).
// Kształt wiersza = kolumny tabeli `karta` (schemat.sql); mapowanie z StoredCard (pakiet srs) robi rola 08.
import type { Wynik } from '@szkola/domena';
import { niezaimplementowane } from './niezaimplementowane';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';

export interface WierszKarty {
  rodzina_id: string; termin_ms: number; stabilnosc: number; trudnosc: number; dni_zaplanowane: number;
  kroki_nauki: number; powtorzenia: number; zapomnienia: number; stan: 0 | 1 | 2 | 3;
  ostatnia_powtorka_ms: number | null; zmieniono_ms: number;
}
export interface WierszLogu {
  odpowiedz_id: number | null; ocena_fsrs: 1 | 2 | 3 | 4; stan_przed: 0 | 1 | 2 | 3; termin_przed_ms: number; powtorzono_ms: number;
}
// Karta (UPSERT) i wpis logu w jednej transakcji.
export function zapiszPowtorke(_port: PortBazy, _karta: WierszKarty, _log: WierszLogu): Promise<Wynik<void, PowodZapisu>> {
  return niezaimplementowane('zapiszPowtorke (ADR 0003, K-15)');
}
