import { niezaimplementowane } from '../zaslepka';

/**
 * Ocena poziomu (PR-01, BR-ONB-001, BR-ONB-002; maszyna `aktywnosc` rodzaju `ocena_poziomu`, ADR 0010).
 * Pytanie: najwyżej OCENA_POZIOMU_MAKS_PYTAN (konfiguracja.ts), „Pomiń” na każdym ekranie.
 * Wynik: punkt startu i przycisk rozpoczęcia nauki; bez ekranu zakupu (D-105).
 */
export type PropsPytaniaOceny = {
  numer: number; // 1..liczba
  liczba: number;
  tresc: string;
  odpowiedzi: readonly string[];
  onOdpowiedz(indeks: number): void;
  onPomin(): void;
};
export type PropsWynikuOceny = {
  punktStartu: { modul: string; tytulLekcji: string };
  zaliczoneOcena: readonly string[]; // moduły zaliczone oceną (BR-ONB-002), np. ['M0', 'M1', 'M2']
  onZacznij(): void;
};

export function EkranPytaniaOceny(_: PropsPytaniaOceny): React.JSX.Element {
  return niezaimplementowane('EkranPytaniaOceny (BR-ONB-001)');
}
export function EkranWynikuOceny(_: PropsWynikuOceny): React.JSX.Element {
  return niezaimplementowane('EkranWynikuOceny (BR-ONB-001, BR-ONB-002)');
}
