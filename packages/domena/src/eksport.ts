// Format eksportu (ADR 0008 pkt 1–3).
import { niezaimplementowane } from './niezaimplementowane';
import type { Wynik } from './typy';

export const FORMAT_EKSPORTU = 'szkola-pokera-postep';
export interface KopertaV1 {
  format: typeof FORMAT_EKSPORTU;
  wersja_formatu: 1;
  utworzono: string; // ISO 8601 UTC
  aplikacja: string;
  dane: Record<string, readonly Record<string, unknown>[]>;
}
export type KopertaDowolna = { format: string; wersja_formatu: number } & Record<string, unknown>;

export function walidujEksport(_tekst: string, _obslugiwana: number): Wynik<KopertaV1, 'bledny_plik' | 'nowsza_wersja'> {
  return niezaimplementowane('walidujEksport (ADR 0008, BR-DANE-002)');
}
export function migrujFormat(_k: KopertaDowolna): KopertaV1 {
  return niezaimplementowane('migrujFormat (ADR 0008 pkt 3)');
}
