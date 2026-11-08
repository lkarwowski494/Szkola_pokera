import '@/i18n';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import i18n from 'i18next';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { RenderErrorScreen } from '@/components/RenderErrorScreen';
import { GranicaBledu } from '@/components/GranicaBledu';
import { zapiszBlad } from '@/platform/dziennik';
import { useSettings } from '@/state/settings';
import { useTokens } from '@/theme/tokens';
import { przygotujTrescExpo } from '@/data/tresc/startTresci';
import { kontrolaK04, startPostepuExpo } from '@/data/postepExpo';
import { PostepKontekst } from '@/data/postepKontekst';
import type { PortBazy } from '@szkola/postep';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getDrillById, getLessonSummaries, getModules } from '@/data/content/repo';
import PierwszeUruchomienie from '@/features/ocena-poziomu/PierwszeUruchomienie';
import { zegarTelefonu } from '@/platform/zegar';

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

type StanPostepu = { stan: 'ladowanie' } | { stan: 'ok'; port: PortBazy } | { stan: 'blad' };

/**
 * Baza postępu `postep.db` (ADR 0003, 0004; moduly.md „Adaptery”): start z ochroną tła (ADR 0013), błąd startu → ekran
 * z ponowieniem, bez zapisu (tlo-i-bledy.md §4, D-200). W buildzie deweloperskim kontrola K-04. Jedyna baza postępu
 * od części 5 (drizzle usunięty, ADR 0004); stare `user.db*` nietknięte (usuwa je tylko „Usuń postęp”).
 */
function usePostep(): StanPostepu & { ponow: () => void } {
  const [stan, ustaw] = useState<StanPostepu>({ stan: 'ladowanie' });
  const [proba, ustawProbe] = useState(0);
  useEffect(() => {
    let aktualny = true;
    let otwarty: PortBazy | null = null;
    void startPostepuExpo().then(async (w) => {
      if (!w.ok) {
        if (aktualny) ustaw({ stan: 'blad' });
        return;
      }
      otwarty = w.wartosc.port;
      if (!aktualny) {
        await otwarty.zamknij();
        return;
      }
      if (__DEV__) await kontrolaK04(otwarty);
      ustaw({ stan: 'ok', port: otwarty });
    });
    return () => {
      aktualny = false;
      if (otwarty) void otwarty.zamknij();
    };
  }, [proba]);
  const ponow = useCallback(() => {
    ustaw({ stan: 'ladowanie' });
    ustawProbe((p) => p + 1);
  }, []);
  return { ...stan, ponow };
}

/** Pierwsze uruchomienie (PR-01) nad nawigacją: moduły i pierwsze lekcje z bazy treści, pytania oceny z puli egzaminów. */
function BramkaStartu({ port, children }: { port: PortBazy; children: ReactNode }) {
  const db = useSQLiteContext();
  const moduly = useMemo(() => {
    const lekcje = getLessonSummaries(db);
    return getModules(db).map((m) => ({ id: m.id, title: m.title, pierwszaLekcja: lekcje.find((l) => l.moduleId === m.id)?.title ?? null }));
  }, [db]);
  const wiersz = useCallback((id: string) => getDrillById(db, id), [db]);
  return (
    <PierwszeUruchomienie port={port} moduly={moduly} wiersz={wiersz} zegar={zegarTelefonu}>
      {children}
    </PierwszeUruchomienie>
  );
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const tk = useTokens();
  const loadSettings = useSettings((s) => s.load);
  const tresc = useTresc();
  const postep = usePostep();
  const trescGotowa = tresc.stan !== 'ladowanie' && postep.stan !== 'ladowanie';

  useEffect(() => {
    if (!trescGotowa) return;
    // ustawienia interfejsu z postep.db (D-251) przed zdjęciem ekranu startowego; przy błędzie startu postępu — od razu
    if (postep.stan === 'ok') void loadSettings(postep.port).finally(() => void SplashScreen.hideAsync());
    else void SplashScreen.hideAsync();
  }, [loadSettings, trescGotowa, postep]);

  if (tresc.stan === 'ladowanie' || postep.stan === 'ladowanie') return null;
  if (tresc.stan === 'blad') return <RenderErrorScreen onRetry={tresc.ponow} />;
  if (postep.stan === 'blad') return <RenderErrorScreen onRetry={postep.ponow} />;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = { ...base, colors: { ...base.colors, primary: tk.ink, background: tk.bg, card: tk.surface, text: tk.ink, border: tk.separator } };

  return (
    <ThemeProvider value={theme}>
      {/* błąd renderowania: wpis w dzienniku lokalnym (ADR 0009) i ekran z ponowieniem zamiast zamknięcia aplikacji */}
      <GranicaBledu fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        <PostepKontekst.Provider value={postep.port}>
          {/* Plik treści przygotowany przez useTresc (bez kopiowania przy każdym starcie, ADR 0005 pkt 2). */}
          <SQLiteProvider databaseName={tresc.plik} options={{ useNewConnection: false }}>
            <BramkaStartu port={postep.port}>
              <Stack screenOptions={{ headerBackTitle: 'Wróć', headerTintColor: tk.link }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="lesson/[id]" options={{ title: '' }} />
                <Stack.Screen name="diagnostics" options={{ title: '' }} />
                <Stack.Screen name="advancement" options={{ title: '' }} />
                <Stack.Screen name="glossary" options={{ title: '' }} />
                <Stack.Screen name="help" options={{ title: '' }} />
                <Stack.Screen name="session" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
              </Stack>
            </BramkaStartu>
          </SQLiteProvider>
        </PostepKontekst.Provider>
      </GranicaBledu>
    </ThemeProvider>
  );
}
