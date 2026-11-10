import { router } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Ikona } from '@/components/Ikona';
import { Muted, Screen } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { useOdczytPostepu } from '@/data/postep';
import { useBazaTresci } from '@/data/tresc/kontekst';
import BlokLekcji from '@/features/dzis/BlokLekcji';
import Kafel from '@/features/dzis/Kafel';
import { liczbaKolumnKafli, nastepnaNaDzis } from '@/features/dzis/widok';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import { odczytajKarty, odczytajPostepLekcji, type PortBazy } from '@szkola/postep';
import { odstep, styl, useTokens } from '@/theme/tokens';

// Fakty kursu, postęp lekcji (następna lekcja) i powtórki na dziś z postep.db; błąd odczytu → stan bez postępu, komunikat
// z ponowieniem i wpis w dzienniku (useOdczytPostepu).
async function czytajDzis(port: PortBazy) {
  const [p, f, k] = await Promise.all([odczytajPostepLekcji(port), czytajFaktyKursu(port), odczytajKarty(port)]);
  if (!p.ok) return p;
  if (!f.ok) return f;
  if (!k.ok) return k;
  const teraz = Date.now();
  return { ok: true as const, wartosc: { postep: p.wartosc, fakty: f.wartosc, powtorkiNaDzis: k.wartosc.filter((x) => x.termin_ms <= teraz).length } };
}

/**
 * „Dziś” (D-541, KO-045; makieta `docs/design/ekrany/menu.html`): czynności dnia. Zębatka ustawień (D-540) w prawym górnym rogu,
 * duży tytuł, „Kontynuuj lekcję” na suknie, pod spodem kafelki Powtórki (liczba na dziś), Sesja ćwiczeń, Scenariusze.
 * Lista lekcji jest w zakładce „Lekcje” (D-542), Wskaźnik zaawansowania na „Postępie”. Licznik dziennego limitu: na ekranie
 * startu aktywności (EkranStartu, session.tsx), nie na kafelkach.
 */
export default function TodayScreen() {
  const db = useBazaTresci();
  const tk = useTokens();
  const { t } = useTranslation();
  const { fontScale } = useWindowDimensions();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const odczyt = useOdczytPostepu(czytajDzis, 'nauka');
  const blok = odczyt.stan === 'ok' ? nastepnaNaDzis(modules, lessons, odczyt.wartosc.fakty, odczyt.wartosc.postep) : null;
  const powtorki = odczyt.stan === 'ok' ? odczyt.wartosc.powtorkiNaDzis : 0;
  const szeroki = liczbaKolumnKafli(fontScale) === 1;

  return (
    <Screen>
      <View style={styles.naglowek}>
        <Text accessibilityRole="header" style={[styl.tytulDuzy, { color: tk.ink, flex: 1 }]}>
          {t('today.title')}
        </Text>
        {/* D-540: rysunek 24 pt (kreska 2 pt, `ink`), przycisk 44×44 pt bez hitSlop, ujemny margines wyrównuje rysunek do marginesu ekranu */}
        <Pressable testID="ustawienia" accessibilityRole="button" accessibilityLabel={t('settings.title')} onPress={() => router.push('/settings')} style={styles.zebatka}>
          <Ikona nazwa="ustawienia" kolor={tk.ink} />
        </Pressable>
      </View>
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={odczyt.odswiez} /> : null}
      {blok ? (
        <BlokLekcji blok={blok} onOtworz={(id) => router.push({ pathname: '/lesson/[id]', params: { id } })} />
      ) : odczyt.stan === 'ok' ? (
        <Muted>{t('today.courseDone')}</Muted>
      ) : null}
      <View style={styles.kafle}>
        <Kafel
          testID="dzis-powtorki"
          ikona="powtorki"
          tytul={t('today.reviewsTile')}
          stan={powtorki > 0 ? t('today.reviewsTileDue', { count: powtorki }) : t('today.reviewsTileNone')}
          szeroki={szeroki}
          onPress={() => router.push({ pathname: '/session', params: { mode: 'review' } })}
        />
        <Kafel
          testID="dzis-cwiczenia"
          ikona="cwiczenia"
          tytul={t('today.practice')}
          stan={t('today.practiceHint')}
          szeroki={szeroki}
          onPress={() => router.push({ pathname: '/session', params: { mode: 'practice' } })}
        />
        {/* Do kroku F ekran scenariuszy ma stan „wkrótce” (app/scenarios.tsx); kafelek zapowiada to w stanie, nie jest martwy. */}
        <Kafel testID="dzis-scenariusz" ikona="scenariusze" tytul={t('today.scenarios')} stan={t('today.scenariosSoon')} szeroki onPress={() => router.push('/scenarios')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  naglowek: { flexDirection: 'row', alignItems: 'center', gap: odstep.m },
  zebatka: { width: 44, height: 44, marginRight: -10, alignItems: 'center', justifyContent: 'center' },
  kafle: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.m },
});
