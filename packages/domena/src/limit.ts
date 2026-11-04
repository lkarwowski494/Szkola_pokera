// Limit dnia (ADR 0007; sygnatury: docs/architektura/moduly.md „Porty domeny”).
import type { Konfiguracja } from './konfiguracja';
import { niezaimplementowane } from './niezaimplementowane';
import type { RodzajAktywnosci } from './typy';

export type Limit = { bezLimitu: true } | { bezLimitu: false; pozostalo: number; odnowienieMs: number };

export function limitDnia(_wej: { zuzyteDzis: number; pro: boolean; dzien: string; strefa: string }, _k: Konfiguracja): Limit {
  return niezaimplementowane('limitDnia (ADR 0007, BR-LIM-001, BR-LIM-005)');
}

export function mozeStartowac(
  _rodzaj: RodzajAktywnosci,
  _pierwszePodejscieTestu: boolean,
  _limit: Limit,
): { start: true; zLimitu: boolean } | { start: false; powod: 'limit_wyczerpany' } {
  return niezaimplementowane('mozeStartowac (ADR 0007, BR-LIM-001, BR-LIM-003)');
}
