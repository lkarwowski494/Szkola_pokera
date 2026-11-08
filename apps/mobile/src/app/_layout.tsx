import '@/i18n';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import i18n from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import migrations from '../../drizzle/migrations';
import { RenderErrorScreen } from '@/components/RenderErrorScreen';
import { userDb } from '@/data/user/db';
import { GranicaBledu } from '@/components/GranicaBledu';
import { zapiszBlad } from '@/platform/dziennik';
import { useSettings } from '@/state/settings';
import { space, type as tp, useTokens } from '@/theme/tokens';
import { przygotujTrescExpo } from '@/data/tresc/startTresci';

void SplashScreen.preventAutoHideAsync();

type StanTresci = { stan: 'ladowanie' } | { stan: 'ok'; plik: string } | { stan: 'blad' };

/**
 * Baza treści języka interfejsu (ADR 0005 pkt 2, D-232): jedna kopia z paczki na wersję treści, stary plik usuwany po
 * otwarciu nowego (`przygotujTresc`). Błąd = `tresc_niedostepna`: ekran z ponowieniem, postęp nietknięty (tlo-i-bledy.md §4).
 */
function useTresc(): StanTresci & { ponow: () => void } {
  const [stan, ustaw] = useState<StanTresci>({ stan: 'ladowanie' });
  const [proba, ustawProbe] = useState(0);
  useEffect(() => {
    let aktualny = true;
    void przygotujTrescExpo(i18n.language).then((w) => {
      if (!aktualny) return;
      if (!w.ok) zapiszBlad('tresc_niedostepna');
      ustaw(w.ok ? { stan: 'ok', plik: w.wartosc.plik } : { stan: 'blad' });
    });
    return () => {
      aktualny = false;
    };
  }, [proba]);
  const ponow = useCallback(() => {
    ustaw({ stan: 'ladowanie' });
    ustawProbe((p) => p + 1);
  }, []);
  return { ...stan, ponow };
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const tk = useTokens();
  const { success, error } = useMigrations(userDb, migrations);
  const loadSettings = useSettings((s) => s.load);
  const tresc = useTresc();
  const trescGotowa = tresc.stan !== 'ladowanie';

  useEffect(() => {
    if (success && trescGotowa) {
      loadSettings();
      void SplashScreen.hideAsync();
    }
    if (error) {
      zapiszBlad('migracja_nieudana');
      void SplashScreen.hideAsync();
    }
  }, [success, error, loadSettings, trescGotowa]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: space.xl, backgroundColor: tk.bg }}>
        <Text style={[tp.body, { color: tk.bad }]}>Nie udało się przygotować bazy postępu: {error.message}</Text>
      </View>
    );
  }
  if (!success || tresc.stan === 'ladowanie') return null;
  if (tresc.stan === 'blad') return <RenderErrorScreen onRetry={tresc.ponow} />;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = { ...base, colors: { ...base.colors, primary: tk.felt, background: tk.bg, card: tk.surface, text: tk.ink, border: tk.line } };

  return (
    <ThemeProvider value={theme}>
      {/* błąd renderowania: wpis w dzienniku lokalnym (ADR 0009) i ekran z ponowieniem zamiast zamknięcia aplikacji */}
      <GranicaBledu fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        {/* Plik treści przygotowany przez useTresc (bez kopiowania przy każdym starcie, ADR 0005 pkt 2). */}
        <SQLiteProvider databaseName={tresc.plik} options={{ useNewConnection: false }}>
          <Stack screenOptions={{ headerBackTitle: 'Wróć', headerTintColor: tk.felt }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="lesson/[id]" options={{ title: '' }} />
            <Stack.Screen name="diagnostics" options={{ title: '' }} />
            <Stack.Screen name="advancement" options={{ title: '' }} />
            <Stack.Screen name="glossary" options={{ title: '' }} />
            <Stack.Screen name="help" options={{ title: '' }} />
            <Stack.Screen name="session" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
          </Stack>
        </SQLiteProvider>
      </GranicaBledu>
    </ThemeProvider>
  );
}
