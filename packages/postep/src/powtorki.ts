// Repozytorium powtórek (moduly.md: „karty do terminu, zapis karty UPSERT + log”; ADR 0003: UPSERT, nie REPLACE).
// Kształt wiersza = kolumny tabeli `karta` (schemat.sql); mapowanie z StoredCard (pakiet srs) robi rola 08.
import type { Wynik } from '@szkola/domena';
import type { PortBazy, Tx } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import { jakoWynik } from './bledy';
import type { PowodOdczytu } from './ustawienia';

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
  return jakoWynik(() => port.transakcja((tx) => powtorkaTx(tx, karta, log)));
}

// Karta (UPSERT) i wpis logu w transakcji wywołującego (też odpowiedź powtórki w `zapiszKrok`, aktywnosci.ts).
export async function powtorkaTx(tx: Tx, karta: WierszKarty, log: WierszLogu): Promise<void> {
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
}

// Wszystkie karty w kolejności terminu (kolejka i następny termin liczy wywołujący regułą `dueCards`, D-211).
export async function odczytajKarty(port: PortBazy): Promise<Wynik<WierszKarty[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>(
      `SELECT rodzina_id, termin_ms, stabilnosc, trudnosc, dni_zaplanowane, kroki_nauki, powtorzenia, zapomnienia, stan,
         ostatnia_powtorka_ms, zmieniono_ms FROM karta ORDER BY termin_ms, rodzina_id`,
    );
    const karty: WierszKarty[] = [];
    for (const w of wiersze) {
      const k = wierszKarty(w);
      if (!k) return { ok: false, powod: 'odczyt_nieudany' };
      karty.push(k);
    }
    return { ok: true, wartosc: karty };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

const liczba = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const calkowita = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);
const STANY_KARTY = [0, 1, 2, 3] as const;

function wierszKarty(w: unknown): WierszKarty | null {
  if (typeof w !== 'object' || w === null || !('rodzina_id' in w) || typeof w.rodzina_id !== 'string') return null;
  if (!('termin_ms' in w) || !calkowita(w.termin_ms) || !('stabilnosc' in w) || !liczba(w.stabilnosc)) return null;
  if (!('trudnosc' in w) || !liczba(w.trudnosc) || !('dni_zaplanowane' in w) || !liczba(w.dni_zaplanowane)) return null;
  if (!('kroki_nauki' in w) || !calkowita(w.kroki_nauki) || !('powtorzenia' in w) || !calkowita(w.powtorzenia)) return null;
  if (!('zapomnienia' in w) || !calkowita(w.zapomnienia) || !('stan' in w) || !('zmieniono_ms' in w) || !calkowita(w.zmieniono_ms)) return null;
  const stan = STANY_KARTY.find((x) => x === w.stan);
  if (stan === undefined) return null;
  if (!('ostatnia_powtorka_ms' in w) || (w.ostatnia_powtorka_ms !== null && !calkowita(w.ostatnia_powtorka_ms))) return null;
  return {
    rodzina_id: w.rodzina_id, termin_ms: w.termin_ms, stabilnosc: w.stabilnosc, trudnosc: w.trudnosc, dni_zaplanowane: w.dni_zaplanowane,
    kroki_nauki: w.kroki_nauki, powtorzenia: w.powtorzenia, zapomnienia: w.zapomnienia, stan,
    ostatnia_powtorka_ms: typeof w.ostatnia_powtorka_ms === 'number' ? w.ostatnia_powtorka_ms : null, zmieniono_ms: w.zmieniono_ms,
  };
}
