import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

/**
 * Raporty awarii przez Sentry (ADR-17, wariant C z 5.10.2026: Sentry zbiera błędy, EAS Observe tylko metryki startu).
 *
 * DSN wpisuje się raz, w app.json (expo.extra.sentry.dsn); obok, w pluginie @sentry/react-native/expo, organizacja
 * i projekt do wysyłania map źródeł. Pusty DSN = Sentry wyłączone: init nie jest wołany, nic nie wychodzi z telefonu.
 *
 * Prywatność: bez danych osobowych (sendDefaultPii: false, IP zastąpione 0.0.0.0), bez okruszków z konsoli, bez
 * śledzenia wydajności i bez nagrywania sesji. Śledzenie i replay wyłącza się przez POMINIĘCIE ich opcji: SDK włącza
 * integracje, gdy tracesSampleRate albo replays*SampleRate jest jakąkolwiek liczbą, także 0
 * (@sentry/react-native 7.11, dist/js/integrations/default.js: hasTracingEnabled, hasReplayOptions).
 */
export function sentryDsn(): string | undefined {
  const extra = Constants.expoConfig?.extra as { sentry?: { dsn?: unknown } } | undefined;
  const dsn = extra?.sentry?.dsn;
  return typeof dsn === 'string' && dsn.trim() ? dsn.trim() : undefined;
}

let enabled = false;

/** Wywoływane raz, przed zamontowaniem pierwszego ekranu. Zwraca, czy Sentry zostało włączone. */
export function initCrashReports(): boolean {
  const dsn = sentryDsn();
  if (!dsn || enabled) return enabled;
  Sentry.init({
    dsn,
    environment: __DEV__ ? 'development' : 'production',
    sendDefaultPii: false,
    attachScreenshot: false,
    attachViewHierarchy: false,
    // zastępuje domyślną integrację okruszków (ta sama nazwa „Breadcrumbs”): bez console.*
    integrations: [Sentry.breadcrumbsIntegration({ console: false })],
  });
  // dokumentacja Sentry: „To disable sending the user's IP address, override the default value by a custom String
  // value, for example by calling Sentry.setUser({ip_address: '0.0.0.0'})”
  Sentry.setUser({ ip_address: '0.0.0.0' });
  enabled = true;
  return true;
}

/** Wyjątek złapany i obsłużony w kodzie. Bez DSN nic nie robi. Nigdy nie rzuca. */
export function reportError(error: unknown): void {
  if (!enabled) return;
  try {
    Sentry.captureException(error);
  } catch {
    // zgłoszenie nie może zepsuć ścieżki, która właśnie obsługuje błąd
  }
}

/** Granica błędów renderowania (Sentry.ErrorBoundary): zgłasza błąd z drzewem komponentów i pokazuje fallback. */
export const CrashBoundary = Sentry.ErrorBoundary;
