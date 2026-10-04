import '@/i18n';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import migrations from '../../drizzle/migrations';
import { userDb } from '@/data/user/db';
import { useSettings } from '@/state/settings';
import { space, type as tp, useTokens } from '@/theme/tokens';

void SplashScreen.preventAutoHideAsync();

// Nazwa pliku musi odpowiadać CONTENT_SCHEMA_VERSION (content-build zapisuje content-v3.db).
const CONTENT_DB = 'content-v3.db';
const contentAsset = require('../../assets/content/content-v3.db') as number;

export default function RootLayout() {
  const scheme = useColorScheme();
  const tk = useTokens();
  const { success, error } = useMigrations(userDb, migrations);
  const loadSettings = useSettings((s) => s.load);

  useEffect(() => {
    if (success) {
      loadSettings();
      void SplashScreen.hideAsync();
    }
    if (error) void SplashScreen.hideAsync();
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
      {/* Treść jest kopiowana z paczki przy każdym starcie (forceOverwrite), więc nowa wersja treści zawsze wygrywa. */}
      <SQLiteProvider databaseName={CONTENT_DB} assetSource={{ assetId: contentAsset, forceOverwrite: true }} options={{ useNewConnection: false }}>
        <Stack screenOptions={{ headerBackTitle: 'Wróć', headerTintColor: tk.felt }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="lesson/[id]" options={{ title: '' }} />
          <Stack.Screen name="diagnostics" options={{ title: '' }} />
          <Stack.Screen name="advancement" options={{ title: '' }} />
          <Stack.Screen name="session" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
        </Stack>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
