// Repozytorium aktywności (moduly.md: „krok + odpowiedź w jednej transakcji”; ADR 0010; dane.md: UPSERT kroku po przerwaniu).
import type { OcenaOdpowiedzi, Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import { jakoWynik } from './bledy';

export interface OdpowiedzKroku {
  krok: number; zadanie_id: string; rodzina_id: string; wybor: string; // wybor: JSON
  ocena: OcenaOdpowiedzi; zaliczona: 0 | 1; czas_ms: number; odpowiedziano_ms: number;
}
// Zapis odpowiedzi kroku (UPSERT po (aktywnosc_id, krok)) i przesunięcie `aktywnosc.krok` w jednej transakcji;
// wartość = id wiersza odpowiedzi (ten sam przy ponownym zapisie kroku).
// Następny krok podaje maszyna domeny (`przejscieAktywnosci`; w scenariuszu `dalej` z grafu, D-219), repozytorium zapisuje
// max(krok, nastepnyKrok): po zabiciu aplikacji po skoku wznowienie wraca do decyzji `dalej`, a ponowny zapis wcześniejszego
// kroku nie cofa przebiegu (moduly.md „Repozytoria”, przegląd D-043 05 fix).
export function zapiszKrok(port: PortBazy, aktywnoscId: string, odp: OdpowiedzKroku, nastepnyKrok: number): Promise<Wynik<number, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    const wiersze = await tx.all<unknown>(
      `INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (aktywnosc_id, krok) DO UPDATE SET zadanie_id = excluded.zadanie_id, rodzina_id = excluded.rodzina_id,
         wybor = excluded.wybor, ocena = excluded.ocena, zaliczona = excluded.zaliczona, czas_ms = excluded.czas_ms,
         odpowiedziano_ms = excluded.odpowiedziano_ms
       RETURNING id`,
      [aktywnoscId, odp.krok, odp.zadanie_id, odp.rodzina_id, odp.wybor, odp.ocena, odp.zaliczona, odp.czas_ms, odp.odpowiedziano_ms],
    );
    const [w] = wiersze;
    if (!(typeof w === 'object' && w !== null && 'id' in w && typeof w.id === 'number')) throw new Error('UPSERT odpowiedzi bez id');
    const r = await tx.run('UPDATE aktywnosc SET krok = max(krok, ?) WHERE id = ?', [nastepnyKrok, aktywnoscId]);
    if (r.zmiany !== 1) throw new Error(`Brak aktywności ${aktywnoscId}`); // stan niemożliwy: klucz obcy odpowiedzi już to sprawdził
    return w.id;
  }));
}
