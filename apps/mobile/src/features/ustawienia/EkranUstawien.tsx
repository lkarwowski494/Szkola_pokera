import { niezaimplementowane } from '../zaslepka';

/**
 * Ustawienia (PR-06, PR-07, PR-08): „Zarządzaj subskrypcją” (BR-ZAK-004), „Przywróć zakupy” (BR-ZAK-003),
 * „Pomoc” (BR-POM-002), „Usuń postęp” z potwierdzeniem systemowym Alert (BR-DANE-003; design-spec.md, słownik interakcji).
 */
export type PropsEkranuUstawien = {
  subskrypcjaAktywna: boolean;
  otworzZarzadzanie(): Promise<void>; // arkusz zarządzania subskrypcjami sklepu (ADR 0006 pkt 5)
  onPrzywroc(): void;
  onPomoc(): void;
  usunPostep(): Promise<void>; // repozytorium daneUzytkownika (pakiet postep); wołane tylko po potwierdzeniu
};

export default function EkranUstawien(_: PropsEkranuUstawien): React.JSX.Element {
  return niezaimplementowane('EkranUstawien (BR-ZAK-004, BR-POM-002, BR-DANE-003)');
}
