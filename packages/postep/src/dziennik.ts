// Dziennik lokalny w `postep.db` (ADR 0009 pkt 2; moduly.md „Repozytoria”: `dziennik`; D-240): wpis i przycięcie do
// `maks` najnowszych w jednej transakcji; bez treści błędu i danych osób (czas, kod, ekran, wersja).
import type { Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodZapisu } from './daneUzytkownika';
import type { PowodOdczytu } from './ustawienia';
import { jakoWynik } from './bledy';

export interface WpisDziennikaBazy { ms: number; kod: string; ekran: string | null; wersja: string }

export function zapiszWpisDziennika(port: PortBazy, w: WpisDziennikaBazy, maks: number): Promise<Wynik<void, PowodZapisu>> {
  return jakoWynik(() => port.transakcja(async (tx) => {
    await tx.run('INSERT INTO dziennik (ms, kod, ekran, wersja) VALUES (?, ?, ?, ?)', [w.ms, w.kod, w.ekran, w.wersja]);
    await tx.run('DELETE FROM dziennik WHERE id NOT IN (SELECT id FROM dziennik ORDER BY id DESC LIMIT ?)', [maks]);
  }));
}
export async function odczytajDziennik(port: PortBazy): Promise<Wynik<WpisDziennikaBazy[], PowodOdczytu>> {
  try {
    const wynik: WpisDziennikaBazy[] = [];
    for (const w of await port.all<unknown>('SELECT ms, kod, ekran, wersja FROM dziennik ORDER BY id')) {
      if (typeof w !== 'object' || w === null || !('ms' in w) || typeof w.ms !== 'number' || !Number.isInteger(w.ms)) return { ok: false, powod: 'odczyt_nieudany' };
      if (!('kod' in w) || typeof w.kod !== 'string' || !('wersja' in w) || typeof w.wersja !== 'string') return { ok: false, powod: 'odczyt_nieudany' };
      if (!('ekran' in w) || (w.ekran !== null && typeof w.ekran !== 'string')) return { ok: false, powod: 'odczyt_nieudany' };
      wynik.push({ ms: w.ms, kod: w.kod, ekran: typeof w.ekran === 'string' ? w.ekran : null, wersja: w.wersja });
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}
