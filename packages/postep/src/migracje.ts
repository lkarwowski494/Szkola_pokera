// Runner migracji (ADR 0003; dane.md „Polityka migracji”; wzór: e1-sqlite.mjs E4, e2-schemat.mjs `migruj`).
import type { OchronaTla, Wynik } from '@szkola/domena';
import { niezaimplementowane } from './niezaimplementowane';
import type { Polaczenie } from './port';

export interface Migracja { wersja: number; sql: string; przebudowa?: boolean }
// Lista migracji aplikacji; v1 = docs/architektura/schemat.sql (ADR 0004). Funkcja zamiast stałej, żeby zaślepka rzucała znacznik.
export function listaMigracji(): readonly Migracja[] {
  return niezaimplementowane('listaMigracji: v1 = schemat.sql (ADR 0003, 0004)');
}
// Każda migracja w transakcji; `przebudowa`: foreign_keys=OFF przed BEGIN, foreign_key_check przed COMMIT, ochrona (ADR 0013 pkt 3).
// Uzupełnienie roli 07: wynik jako wartość (tlo-i-bledy.md §4: `baza_nowsza`, `migracja_nieudana`); `wartosc` = user_version po migracji.
export function migruj(
  _pol: Polaczenie,
  _migracje: readonly Migracja[],
  _ochrona?: OchronaTla,
): Promise<Wynik<number, 'baza_nowsza' | 'migracja_nieudana' | 'przerwano_w_tle'>> {
  return niezaimplementowane('migruj (ADR 0003, E4a–E4f)');
}
