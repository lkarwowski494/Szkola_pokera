import '@/i18n';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import i18n from 'i18next';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { RenderErrorScreen } from '@/components/RenderErrorScreen';
import { GranicaBledu } from '@/components/GranicaBledu';
import { podlaczDziennik, zapiszBlad } from '@/platform/dziennik';
import { useSettings } from '@/state/settings';
import { useTokens } from '@/theme/tokens';
import { LIMIT_KROJU_MS, LITERATA, zaladujKroje } from '@/theme/kroje';
import { otworzTrescExpo, przygotujTrescExpo } from '@/data/tresc/startTresci';
import { useTresc } from '@/data/tresc/useTresc';
import { kontrolaK04, startPostepuExpo } from '@/data/postepExpo';
import { PostepKontekst } from '@/data/postepKontekst';
import type { PortBazy } from '@szkola/postep';
import { ProviderTresci, useBazaTresci } from '@/data/tresc/kontekst';
import { getDrillById, getLessonSummaries, getModules } from '@/data/content/repo';
import PierwszeUruchomienie from '@/features/ocena-poziomu/PierwszeUruchomienie';
import { zegarTelefonu } from '@/platform/zegar';
import { sklepAplikacji } from '@/platform/zakupy';
import { startDostepu } from '@/state/dostep';
import { odtworzZBazy } from '@/features/ustawienia/przypomnienie';
import { czytajJezyk } from '@/features/ustawienia/ustawieniaAplikacji';
import { ustawJezyk } from '@/i18n';
import { powiadomieniaExpo } from '@/platform/powiadomienia';

void SplashScreen.preventAutoHideAsync();

/** Krój tytułów (D-120) przed zdjęciem ekranu startowego, najwyżej LIMIT_KROJU_MS; bez kroju — systemowy (`theme/kroje`). */
function useKroje(): boolean {
  const [gotowe, ustaw] = useState(false);
  useEffect(() => {
    let aktualny = true;
    void zaladujKroje(() => Font.loadAsync({ [LITERATA]: require('../../assets/fonts/Literata-SemiBold.ttf') }), LIMIT_KROJU_MS).then(() => {
      if (aktualny) ustaw(true);
    });
    return () => {
      aktualny = false;
    };
  }, []);
  return gotowe;
}

/** Zapisany język interfejsu (ADR 0014 pkt 3); „auto” zostaje przy języku z preferencji systemu wybranym przy imporcie i18n.
 *  Baza treści idzie za językiem aplikacji (useTresc słucha zmiany języka, K2c): zapisany wybór przełącza też treść. */
async function zastosujJezyk(port: PortBazy): Promise<void> {
  const j = await czytajJezyk(port);
  if (!j.ok) zapiszBlad(j.powod, 'jezyk');
  else if (j.wartosc !== 'auto') await ustawJezyk(j.wartosc);
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
    let odepnijDostep: (() => void) | null = null;
    let odlaczDziennik: (() => void) | null = null;
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
      // dziennik do tabeli `dziennik` od otwarcia bazy, z wpisami sprzed otwarcia (ADR 0009 pkt 2; 08 cz. 5b krok 6)
      odlaczDziennik = podlaczDziennik(otwarty);
      // dostęp od startu (D-247): pamięć → nasłuch transakcji → odczyt sklepu
      odepnijDostep = startDostepu(otwarty, sklepAplikacji(), Date.now);
      ustaw({ stan: 'ok', port: otwarty });
    });
    return () => {
      aktualny = false;
      odepnijDostep?.();
      odlaczDziennik?.();
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
  const db = useBazaTresci();
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

const zapiszBladTresci = () => zapiszBlad('tresc_niedostepna');

export default function RootLayout() {
  const scheme = useColorScheme();
  const tk = useTokens();
  const { t } = useTranslation(); // „Wróć” w nagłówku z t() i po zmianie języka (A04-10, D-284)
  const loadSettings = useSettings((s) => s.load);
  const postep = usePostep();
  // Zapisany język (ADR 0014 pkt 3) przed pierwszym przygotowaniem bazy treści: jedna kopia bazy przy zimnym starcie
  // z językiem innym niż systemowy (przegląd sesji P, plan-09 §13). Bez bazy postępu (błąd startu) — język z i18n.
  const [jezykGotowy, ustawJezykGotowy] = useState(false);
  useEffect(() => {
    if (postep.stan === 'ladowanie') return;
    if (postep.stan === 'blad') ustawJezykGotowy(true);
    else void zastosujJezyk(postep.port).finally(() => ustawJezykGotowy(true));
  }, [postep]);
  const tresc = useTresc(przygotujTrescExpo, zapiszBladTresci, jezykGotowy);
  const kroje = useKroje();
  const trescGotowa = tresc.stan !== 'ladowanie' && postep.stan !== 'ladowanie' && kroje;

  useEffect(() => {
    if (!trescGotowa) return;
    // ustawienia interfejsu z postep.db (D-251) przed zdjęciem ekranu startowego (język zastosowany wyżej, przed treścią);
    // potem odtworzenie przypomnienia z zapisu (ADR 0012: start). Przy błędzie startu postępu — od razu.
    if (postep.stan === 'ok') {
      const port = postep.port;
      void loadSettings(port)
        .finally(() => void SplashScreen.hideAsync())
        .then(() => odtworzZBazy(port, powiadomieniaExpo, { tytul: i18n.t('reminder.title'), tresc: i18n.t('reminder.body') }));
    } else void SplashScreen.hideAsync();
  }, [loadSettings, trescGotowa, postep]);

  if (tresc.stan === 'ladowanie' || postep.stan === 'ladowanie' || !kroje) return null;
  if (tresc.stan === 'blad') return <RenderErrorScreen onRetry={tresc.ponow} />;
  if (postep.stan === 'blad') return <RenderErrorScreen onRetry={postep.ponow} />;

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = { ...base, colors: { ...base.colors, primary: tk.ink, background: tk.bg, card: tk.surface, text: tk.ink, border: tk.separator } };

  return (
    <ThemeProvider value={theme}>
      {/* błąd renderowania: wpis w dzienniku lokalnym (ADR 0009) i ekran z ponowieniem zamiast zamknięcia aplikacji */}
      <GranicaBledu fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        <PostepKontekst.Provider value={postep.port}>
          {/* Plik treści przygotowany przez useTresc (bez kopiowania przy każdym starcie, ADR 0005 pkt 2); zmiana języka
              podmienia bazę bez montowania nawigacji od nowa (ProviderTresci, plan-09 §13). */}
          <ProviderTresci plik={tresc.plik} otworz={otworzTrescExpo} onBlad={zapiszBladTresci}>
            <BramkaStartu port={postep.port}>
              <Stack screenOptions={{ headerBackTitle: t('nav.back'), headerTintColor: tk.link }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="lesson/[id]" options={{ title: '' }} />
                <Stack.Screen name="diagnostics" options={{ title: '' }} />
                <Stack.Screen name="advancement" options={{ title: '' }} />
                <Stack.Screen name="glossary" options={{ title: '' }} />
                <Stack.Screen name="help" options={{ title: '' }} />
                <Stack.Screen name="settings" options={{ title: '' }} />
                <Stack.Screen name="data" options={{ title: '' }} />
                <Stack.Screen name="language" options={{ title: '' }} />
                <Stack.Screen name="purchase" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="session" options={{ presentation: 'fullScreenModal', headerShown: false, gestureEnabled: false }} />
              </Stack>
            </BramkaStartu>
          </ProviderTresci>
        </PostepKontekst.Provider>
      </GranicaBledu>
    </ThemeProvider>
  );
}
