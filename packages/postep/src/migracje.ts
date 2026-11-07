// Runner migracji (ADR 0003; dane.md „Polityka migracji”; wzór: e1-sqlite.mjs E4, e2-schemat.mjs `migruj`).
import type { OchronaTla, Wynik } from '@szkola/domena';
import type { Polaczenie } from './port';
import { SCHEMAT_V1 } from './schemat-v1';

export interface Migracja { wersja: number; sql: string; przebudowa?: boolean }
// Lista migracji aplikacji; v1 = docs/architektura/schemat.sql (ADR 0004). Wydanej migracji się nie zmienia (dane.md).
const MIGRACJE: readonly Migracja[] = [{ wersja: 1, sql: SCHEMAT_V1 }];
export function listaMigracji(): readonly Migracja[] {
  return MIGRACJE;
}

// ROLLBACK po błędzie: SQLite sam wycofuje transakcję przy części błędów (np. SQLITE_FULL, sqlite.org/lang_transaction.html
// „Response To Errors Within A Transaction”), wtedy ROLLBACK zgłasza brak transakcji — to jedyny błąd, który pomijamy.
export async function wycofaj(pol: Pick<Polaczenie, 'exec'>): Promise<void> {
  try {
    await pol.exec('ROLLBACK');
  } catch (e) {
    if (!/no transaction is active/i.test(String(e))) throw e;
  }
}

async function wersjaBazy(pol: Polaczenie): Promise<number> {
  const [w] = await pol.all<unknown>('PRAGMA user_version');
  if (typeof w === 'object' && w !== null && 'user_version' in w && typeof w.user_version === 'number' && Number.isInteger(w.user_version)) {
    return w.user_version;
  }
  throw new Error(`PRAGMA user_version: nieoczekiwany wynik ${JSON.stringify(w)}`);
}

// Każda migracja w transakcji; `przebudowa`: foreign_keys=OFF przed BEGIN, foreign_key_check przed COMMIT, ochrona (ADR 0013 pkt 3).
// Uzupełnienie roli 07: wynik jako wartość (tlo-i-bledy.md §4: `baza_nowsza`, `migracja_nieudana`); `wartosc` = user_version po migracji.
// Błąd odczytu wersji (np. plik, który nie jest bazą) nie jest wynikiem migracji: wyjątek idzie do wywołującego (uruchomPostep, K-12).
export async function migruj(
  pol: Polaczenie,
  migracje: readonly Migracja[],
  _ochrona?: OchronaTla,
): Promise<Wynik<number, 'baza_nowsza' | 'migracja_nieudana' | 'przerwano_w_tle'>> {
  for (const m of migracje) if (!Number.isInteger(m.wersja) || m.wersja < 1) throw new Error(`Migracja z błędną wersją: ${m.wersja}`);
  const start = await wersjaBazy(pol);
  const cel = Math.max(0, ...migracje.map((m) => m.wersja));
  if (start > cel) return { ok: false, powod: 'baza_nowsza' }; // E4f: bez żadnej zmiany w pliku
  for (const m of [...migracje].filter((x) => x.wersja > start).sort((a, b) => a.wersja - b.wersja)) {
    if (m.przebudowa) await pol.exec('PRAGMA foreign_keys = OFF'); // przed BEGIN: w transakcji pragma nic nie robi (sqlite.org/foreignkeys.html)
    try {
      await pol.exec('BEGIN IMMEDIATE');
      try {
        await pol.exec(m.sql);
        if ((await pol.all('PRAGMA foreign_key_check')).length > 0) throw new Error(`Migracja ${m.wersja}: naruszenia kluczy obcych`);
        await pol.exec(`PRAGMA user_version = ${m.wersja}`); // liczba całkowita sprawdzona wyżej; pragma nie przyjmuje parametru
        await pol.exec('COMMIT');
      } catch {
        await wycofaj(pol);
        return { ok: false, powod: 'migracja_nieudana' }; // E4e: wersja i dane sprzed migracji
      }
    } finally {
      if (m.przebudowa) await pol.exec('PRAGMA foreign_keys = ON');
    }
  }
  return { ok: true, wartosc: Math.max(start, cel) };
}
