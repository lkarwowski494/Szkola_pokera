import { Observe } from 'expo-observe';

/**
 * Raporty awarii i metryki startu przez EAS Observe (ADR-17, zmiana z 5.10.2026: zamiast Sentry). Jedno miejsce
 * konfiguracji i jedno wejście do zgłaszania złapanych wyjątków.
 *
 * Prywatność: Observe identyfikuje instalację losowym identyfikatorem (bez konta, bez danych osobowych) i nie nagrywa
 * ekranu. Nie wysyłamy własnych atrybutów ani zdarzeń; zgłaszamy tylko obiekty błędów z kodu, a ich komunikaty nie
 * zawierają odpowiedzi ani danych użytkownika. Bez extra.eas.projectId w konfiguracji (build E2E bez sekretów) iOS
 * zbiera dane lokalnie i niczego nie wysyła.
 */
export function configureObserve(): void {
  // jedno wywołanie z całą konfiguracją: każde kolejne zastępuje poprzednie (dokumentacja „Get started”, krok 7);
  // parametry tras (identyfikatory lekcji) nie są danymi osobowymi, więc filteredParams jest zbędne
  Observe.configure({ integrations: { 'expo-router': true } });
}

/** Wyjątek złapany i obsłużony w kodzie (zdarzenie „non-fatal”). Nigdy nie rzuca. */
export function reportError(error: unknown): void {
  try {
    Observe.reportError(error);
  } catch {
    // zgłoszenie nie może zepsuć ścieżki, która właśnie obsługuje błąd
  }
}
