// Tłumaczenie wyjątków SQLite na powody z polityki błędów (tlo-i-bledy.md §4; D-203). Kontrakt adaptera (rola 07, start.ts):
// wyjątek niesie liczbowe `errcode` (podstawowy albo rozszerzony); rodzaj = errcode & 0xff (sqlite.org/rescode.html).
import type { Wynik } from '@szkola/domena';
import type { PowodZapisu } from './daneUzytkownika';

export const SQLITE_FULL = 13;
export const SQLITE_CORRUPT = 11;
export const SQLITE_NOTADB = 26;
export const SQLITE_CONSTRAINT = 19;

// Podstawowy kod SQLite z wyjątku albo null, gdy wyjątek nie pochodzi z SQLite.
export function kodSQLite(e: unknown): number | null {
  if (typeof e !== 'object' || e === null || !('errcode' in e) || typeof e.errcode !== 'number' || !Number.isInteger(e.errcode)) return null;
  return e.errcode & 0xff;
}
// Długa operacja przerwana na granicy instrukcji po wygaśnięciu czasu w tle (ADR 0013 pkt 4); transakcja wycofana.
export class PrzerwanoWTle extends Error {
  constructor() { super('przerwano_w_tle'); this.name = 'PrzerwanoWTle'; }
}
// 13 FULL → brak_miejsca; każdy inny błąd zapisu (10 IOERR, 5 BUSY i pozostałe) → zapis_nieudany: nigdy cicho.
export function powodZapisu(e: unknown): PowodZapisu {
  if (e instanceof PrzerwanoWTle) return 'przerwano_w_tle';
  return kodSQLite(e) === SQLITE_FULL ? 'brak_miejsca' : 'zapis_nieudany';
}
// Zapis przez port jako wartość: wyjątek → { ok: false, powod }; transakcja wycofana przez adapter (wTransakcji).
export async function jakoWynik<T>(zapis: () => Promise<T>): Promise<Wynik<T, PowodZapisu>> {
  try {
    return { ok: true, wartosc: await zapis() };
  } catch (e) {
    return { ok: false, powod: powodZapisu(e) };
  }
}
