// Historia odcisków wariantów scenariuszy (D-532; tabela `wariant_historia`, schemat-v2.sql): okno ostatnich odcisków
// na szablon i poziom, żeby generator nie powtarzał świeżo zagranego wariantu. Odcisk liczy wywołujący (poker-core).
import { KONFIGURACJA, type Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import type { PowodOdczytu } from './ustawienia';
import { jakoWynik } from './bledy';

export type PoziomWariantu = 'latwy' | 'sredni' | 'trudny';
export interface ZapisOdcisku { szablonId: string; poziom: PoziomWariantu; odcisk: string; ziarno: number; terazMs: number }
export interface Odcisk { odcisk: string; ziarno: number; zagranoMs: number }

// UPSERT po UNIQUE (szablon, poziom, odcisk) odświeża ziarno i czas (wiersz zostaje, ADR 0003 pkt 4: nie INSERT OR REPLACE),
// potem przycięcie do okna najnowszych (czas malejąco, remis: nowszy id) dla tej pary — wszystko w jednej transakcji.
// Inne szablony i poziomy nietknięte. Błąd (CHECK, dysk) wycofuje całość.
export function zapiszOdcisk(port: PortBazy, z: ZapisOdcisku): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(async () => {
    await port.transakcja(async (tx) => {
      await tx.run(
        `INSERT INTO wariant_historia (szablon_id, poziom, odcisk, ziarno, zagrano_ms) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT (szablon_id, poziom, odcisk) DO UPDATE SET ziarno = excluded.ziarno, zagrano_ms = excluded.zagrano_ms`,
        [z.szablonId, z.poziom, z.odcisk, z.ziarno, z.terazMs],
      );
      await tx.run(
        `DELETE FROM wariant_historia WHERE szablon_id = ? AND poziom = ? AND id NOT IN (
           SELECT id FROM wariant_historia WHERE szablon_id = ? AND poziom = ? ORDER BY zagrano_ms DESC, id DESC LIMIT ?)`,
        [z.szablonId, z.poziom, z.szablonId, z.poziom, KONFIGURACJA.WARIANTY_HISTORIA_OKNO],
      );
    });
  });
}

function jakoOdcisk(w: unknown): Odcisk | null {
  if (typeof w !== 'object' || w === null || !('odcisk' in w) || !('ziarno' in w) || !('zagrano_ms' in w)) return null;
  const { odcisk, ziarno, zagrano_ms: zagranoMs } = w;
  return typeof odcisk === 'string' && typeof ziarno === 'number' && Number.isInteger(ziarno) && typeof zagranoMs === 'number' && Number.isInteger(zagranoMs)
    ? { odcisk, ziarno, zagranoMs } : null;
}

// Od najstarszego do najnowszego. Zły kształt wiersza albo błąd bazy: `odczyt_nieudany`, nie udaje pustej historii.
export async function odczytajOdciski(port: PortBazy, szablonId: string, poziom: PoziomWariantu): Promise<Wynik<Odcisk[], PowodOdczytu>> {
  try {
    const wiersze = await port.all<unknown>(
      'SELECT odcisk, ziarno, zagrano_ms FROM wariant_historia WHERE szablon_id = ? AND poziom = ? ORDER BY zagrano_ms ASC, id ASC',
      [szablonId, poziom],
    );
    const wynik: Odcisk[] = [];
    for (const w of wiersze) {
      const o = jakoOdcisk(w);
      if (!o) return { ok: false, powod: 'odczyt_nieudany' };
      wynik.push(o);
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
