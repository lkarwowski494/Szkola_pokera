import { niezaimplementowane } from '../zaslepka';

/**
 * Opinie (PR-09; BR-OPIN-002, BR-OPIN-003; NFR-PRYW-001: bez SDK i serwera, aplikacja niczego nie wysyła sama).
 * `otworzAdres` to Linking.openURL (false albo wyjątek = nie da się otworzyć, np. brak poczty).
 */
export type PropsOpinii = {
  idAplikacjiSklepu: string; // App Store ID [DO USTALENIA] (rola 10)
  adresKontaktowy: string;
  otworzAdres(url: string): Promise<boolean>;
};
export type PropsZgloszeniaBledu = {
  zadanieId: string;
  wersjaAplikacji: string;
  jezyk: string;
  adresKontaktowy: string;
  otworzAdres(url: string): Promise<boolean>;
};

/** Sekcja ustawień: „Oceń w sklepie”, „Napisz do nas” (BR-OPIN-002). */
export function SekcjaOpinii(_: PropsOpinii): React.JSX.Element {
  return niezaimplementowane('SekcjaOpinii (BR-OPIN-002)');
}
/** „Zgłoś błąd w tym zadaniu” pod oceną (BR-OPIN-003; słownik interakcji design-spec.md). */
export function ZglosBlad(_: PropsZgloszeniaBledu): React.JSX.Element {
  return niezaimplementowane('ZglosBlad (BR-OPIN-003)');
}
