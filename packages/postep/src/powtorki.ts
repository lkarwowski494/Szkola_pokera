// Repozytorium powtórek (moduly.md: „karty do terminu, zapis karty UPSERT + log”; ADR 0003: UPSERT, nie REPLACE).
// Kształt wiersza = kolumny tabeli `karta` (schemat.sql); mapowanie z StoredCard (pakiet srs) robi rola 08.
import type { Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import { jakoWynik } from './bledy';

export interface WierszKarty {
  rodzina_id: string; termin_ms: number; stabilnosc: number; trudnosc: number; dni_zaplanowane: number;
  kroki_nauki: number; powtorzenia: number; zapomnienia: number; stan: 0 | 1 | 2 | 3;
  ostatnia_powtorka_ms: number | null; zmieniono_ms: number;
}
export interface WierszLogu {
  odpowiedz_id: number | null; ocena_fsrs: 1 | 2 | 3 | 4; stan_przed: 0 | 1 | 2 | 3; termin_przed_ms: number; powtorzono_ms: number;
}
// Karta (UPSERT) i wpis logu w jednej transakcji.
// UPSERT, nie INSERT OR REPLACE: REPLACE usuwa wiersz karty, a ON DELETE CASCADE kasuje jej log (ADR 0003 pkt 4, E2a).
export function zapiszPowtorke(port: PortBazy, karta: WierszKarty, log: WierszLogu): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    await tx.run(
      `INSERT INTO karta (rodzina_id, termin_ms, stabilnosc, trudnosc, dni_zaplanowane, kroki_nauki, powtorzenia, zapomnienia, stan,
         ostatnia_powtorka_ms, zmieniono_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (rodzina_id) DO UPDATE SET termin_ms = excluded.termin_ms, stabilnosc = excluded.stabilnosc,
         trudnosc = excluded.trudnosc, dni_zaplanowane = excluded.dni_zaplanowane, kroki_nauki = excluded.kroki_nauki,
         powtorzenia = excluded.powtorzenia, zapomnienia = excluded.zapomnienia, stan = excluded.stan,
         ostatnia_powtorka_ms = excluded.ostatnia_powtorka_ms, zmieniono_ms = excluded.zmieniono_ms`,
      [karta.rodzina_id, karta.termin_ms, karta.stabilnosc, karta.trudnosc, karta.dni_zaplanowane, karta.kroki_nauki,
        karta.powtorzenia, karta.zapomnienia, karta.stan, karta.ostatnia_powtorka_ms, karta.zmieniono_ms],
    );
    await tx.run(
      `INSERT INTO log_powtorki (rodzina_id, odpowiedz_id, ocena_fsrs, stan_przed, termin_przed_ms, powtorzono_ms)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [karta.rodzina_id, log.odpowiedz_id, log.ocena_fsrs, log.stan_przed, log.termin_przed_ms, log.powtorzono_ms],
    );
  }));
}
