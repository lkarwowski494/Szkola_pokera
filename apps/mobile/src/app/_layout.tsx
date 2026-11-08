import '@/i18n';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import migrations from '../../drizzle/migrations';
import { RenderErrorScreen } from '@/components/RenderErrorScreen';
import { userDb } from '@/data/user/db';
import { CrashBoundary, initCrashReports, reportError } from '@/observability/crashReports';
import { ObserveRoot } from '@/observability/observe';
import { useSettings } from '@/state/settings';
import { space, type as tp, useTokens } from '@/theme/tokens';
import { PLIKI_TRESCI } from '@/data/content/tresc.generated';

void SplashScreen.preventAutoHideAsync();
// przed zamontowaniem pierwszego ekranu; bez DSN w app.json Sentry zostaje wyłączone
initCrashReports();

// Baza treści polskiej z modułu content-build (nazwa zależy od wersji treści, D-229). Przejściowo jak dotąd: kopia przy
// każdym starcie; wybór języka i instalacja jednej kopii na wersję przez przygotujTresc (ADR 0005 pkt 2) — 08 cz. 3 krok 4.
const { plik: CONTENT_DB, zasob: contentAsset } = PLIKI_TRESCI.pl!;

/** Korzeń: EAS Observe mierzy pierwsze wyrenderowanie (metryki startu, ADR-17). */
export default function Root() {
  return (
    <ObserveRoot>
      <RootLayout />
    </ObserveRoot>
  );
}

function RootLayout() {
  const scheme = useColorScheme();
  const tk = useTokens();
  const { success, error } = useMigrations(userDb, migrations);
  const loadSettings = useSettings((s) => s.load);

  useEffect(() => {
    if (success) {
      loadSettings();
      void SplashScreen.hideAsync();
    }
    if (error) {
      reportError(error);
      void SplashScreen.hideAsync();
    }
  }, [success, error, loadSettings]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: space.xl, backgroundColor: tk.bg }}>
        <Text style={[tp.body, { color: tk.bad }]}>Nie udało się przygotować bazy postępu: {error.message}</Text>
      </View>
    );
  }
  if (!success) return null;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = { ...base, colors: { ...base.colors, primary: tk.felt, background: tk.bg, card: tk.surface, text: tk.ink, border: tk.line } };

  return (
    <ThemeProvider value={theme}>
      {/* błąd renderowania: zgłoszenie z drzewem komponentów (Sentry) i ekran z ponowieniem zamiast zamknięcia aplikacji */}
      <CrashBoundary fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        {/* Treść jest kopiowana z paczki przy każdym starcie (forceOverwrite), więc nowa wersja treści zawsze wygrywa. */}
        <SQLiteProvider databaseName={CONTENT_DB} assetSource={{ assetId: contentAsset, forceOverwrite: true }} options={{ useNewConnection: false }}>
          <Stack screenOptions={{ headerBackTitle: 'Wróć', headerTintColor: tk.felt }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="lesson/[id]" options={{ title: '' }} />
            <Stack.Screen name="diagnostics" options={{ title: '' }} />
            <Stack.Screen name="advancement" options={{ title: '' }} />
            <Stack.Screen name="glossary" options={{ title: '' }} />
            <Stack.Screen name="help" options={{ title: '' }} />
            <Stack.Screen name="session" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="play/index" options={{ title: '' }} />
            <Stack.Screen name="play/table" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="play/report/[id]" options={{ title: '' }} />
            <Stack.Screen name="play/review" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
          </Stack>
        </SQLiteProvider>
      </CrashBoundary>
    </ThemeProvider>
  );
}
