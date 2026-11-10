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
import { liczbaKolumnKafli, nastepnaNaDzis, stanKafli } from '@/features/dzis/widok';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import { odczytajKarty, odczytajPostepLekcji, zuzyteDzis, type PortBazy } from '@szkola/postep';
import { limitZeZuzycia } from '@/features/start/wejscieStartu';
import { zegarTelefonu } from '@/platform/zegar';
import { useDostep } from '@/state/dostep';
import { odstep, styl, useTokens } from '@/theme/tokens';

// Fakty kursu, postęp lekcji (następna lekcja) i powtórki na dziś z postep.db; błąd odczytu → stan bez postępu, komunikat
// z ponowieniem i wpis w dzienniku (useOdczytPostepu).
async function czytajDzis(port: PortBazy) {
  const teraz = Date.now();
  const dzien = zegarTelefonu.dzienLokalny(teraz, zegarTelefonu.strefa());
  const [p, f, k, z] = await Promise.all([odczytajPostepLekcji(port), czytajFaktyKursu(port), odczytajKarty(port), zuzyteDzis(port, dzien)]);
  if (!p.ok) return p;
  if (!f.ok) return f;
  if (!k.ok) return k;
  if (!z.ok) return z;
  return { ok: true as const, wartosc: { postep: p.wartosc, fakty: f.wartosc, zuzyte: z.wartosc, powtorkiNaDzis: k.wartosc.filter((x) => x.termin_ms <= teraz).length } };
}

/**
 * „Dziś” (D-541, KO-045; makieta `docs/design/ekrany/menu.html`): czynności dnia. Zębatka ustawień (D-540) w prawym górnym rogu,
 * duży tytuł, „Kontynuuj lekcję” na suknie, pod spodem kafelki Powtórki (liczba na dziś), Sesja ćwiczeń, Scenariusze.
 * Lista lekcji jest w zakładce „Lekcje” (D-542), Wskaźnik zaawansowania na „Postępie”. Limit dnia: stan kafelków i stopka (BR-LIM-001), licznik
 * na ekranie startu aktywności (EkranStartu, session.tsx).
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
  const pro = useDostep((x) => x.pro);
  // Limit z tej samej logiki co EkranStartu (domena `limitDnia` przez `limitZeZuzycia`); do pierwszego odczytu bez stanu limitu.
  const stan =
    odczyt.stan === 'ok'
      ? stanKafli({ limit: limitZeZuzycia(odczyt.wartosc.zuzyte, { pro, zegar: zegarTelefonu }), powtorkiNaDzis: powtorki, ukonczoneLekcje: odczyt.wartosc.fakty.ukonczoneLekcje, moduly: modules, lekcje: lessons })
      : null;
  const stanPowtorek = stan?.powtorki === 'po_pierwszej' ? t('today.afterFirstLesson') : powtorki > 0 ? t('today.reviewsTileDue', { count: powtorki }) : t('today.reviewsTileNone');
  const stanScenariuszy = stan?.scenariusze === 'po_m2' ? t('today.afterFirstLessonM2') : stan?.scenariusze === 'limit' ? t('today.limitTile') : t('today.scenariosSoon');

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
          stan={stanPowtorek}
          szeroki={szeroki}
          onPress={() => router.push({ pathname: '/session', params: { mode: 'review' } })}
        />
        <Kafel
          testID="dzis-cwiczenia"
          ikona="cwiczenia"
          tytul={t('today.practice')}
          stan={stan?.sesja === 'limit' ? t('today.limitTile') : t('today.practiceHint')}
          limit={stan?.sesja === 'limit'}
          szeroki={szeroki}
          onPress={() => router.push({ pathname: '/session', params: { mode: 'practice' } })}
        />
        {/* Do kroku F ekran scenariuszy ma stan „wkrótce” (app/scenarios.tsx); kafelek zapowiada to w stanie, nie jest martwy. */}
        <Kafel testID="dzis-scenariusz" ikona="scenariusze" tytul={t('today.scenarios')} stan={stanScenariuszy} limit={stan?.scenariusze === 'limit'} szeroki onPress={() => router.push('/scenarios')} />
      </View>
      {stan?.stopkaLimitu ? (
        <View style={{ gap: odstep.s }}>
          <Text style={[styl.przypis, { color: tk.ink, fontWeight: '600' }]}>{t('today.limitReached')}</Text>
          <Pressable testID="dzis-pelny-dostep" accessibilityRole="link" onPress={() => router.push('/purchase')} style={styles.link}>
            <Text style={[styl.tresc, { color: tk.link, fontWeight: '600' }]}>{t('start.fullAccess')}</Text>
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  naglowek: { flexDirection: 'row', alignItems: 'center', gap: odstep.m },
  zebatka: { width: 44, height: 44, marginRight: -10, alignItems: 'center', justifyContent: 'center' },
  kafle: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.m },
  link: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
});
