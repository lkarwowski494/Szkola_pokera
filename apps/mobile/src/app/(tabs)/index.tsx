import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Muted, ProgressBar, Screen } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { odczytajKarty, odczytajPostepLekcji, wynikiLekcji, wynikiTestow, type PortBazy } from '@szkola/postep';
import { useOdczytPostepu } from '@/data/postep';
import BlokLekcji from '@/features/dzis/BlokLekcji';
import { etykietaWiersza, nastepnaNaDzis } from '@/features/dzis/widok';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import { podsumowanieLekcji, podsumowanieTestow } from '@/features/kurs/podsumowania';
import { AdvancementCard } from '@/features/advancement/AdvancementCard';
import { EXAM_SIZE } from '@/features/drills/thresholds';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
import { ZNAK_SKALA_MAX } from '@/theme/skalowanie';

const PUSTE_LEKCJE: ReturnType<typeof podsumowanieLekcji> = new Map();
const PUSTE_TESTY: ReturnType<typeof podsumowanieTestow> = new Map();
// Postęp lekcji, testów, fakty kursu i powtórki na dziś z postep.db; błąd odczytu → stan bez postępu, komunikat z ponowieniem
// i wpis w dzienniku (useOdczytPostepu).
async function czytajDzis(port: PortBazy) {
  const [p, l, t, f, k] = await Promise.all([odczytajPostepLekcji(port), wynikiLekcji(port), wynikiTestow(port), czytajFaktyKursu(port), odczytajKarty(port)]);
  if (!p.ok) return p;
  if (!l.ok) return l;
  if (!t.ok) return t;
  if (!f.ok) return f;
  if (!k.ok) return k;
  const teraz = Date.now();
  return {
    ok: true as const,
    wartosc: {
      postep: p.wartosc,
      fakty: f.wartosc,
      progress: podsumowanieLekcji(p.wartosc, l.wartosc),
      exams: podsumowanieTestow(t.wartosc),
      powtorkiNaDzis: k.wartosc.filter((x) => x.termin_ms <= teraz).length,
    },
  };
}

function WierszGrupy({ testID, tytul, podpis, wartosc, onPress, pierwszy }: { testID: string; tytul: string; podpis?: string; wartosc?: string; onPress(): void; pierwszy: boolean }) {
  const tk = useTokens();
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={[tytul, podpis, wartosc].filter(Boolean).join('. ')}
      onPress={onPress}
      style={({ pressed }) => [styles.wiersz, { borderTopColor: tk.separator, borderTopWidth: pierwszy ? 0 : StyleSheet.hairlineWidth, opacity: pressed ? 0.85 : 1 }]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[styl.tresc, { color: tk.ink }]}>{tytul}</Text>
        {podpis ? <Text style={[styl.przypis, { color: tk.muted }]}>{podpis}</Text> : null}
      </View>
      {wartosc ? <Text style={[styl.tresc, { color: tk.muted, fontVariant: ['tabular-nums'] }]}>{wartosc}</Text> : null}
      <Text style={[styl.tresc, { color: tk.muted }]} accessibilityElementsHidden importantForAccessibility="no">
        ›
      </Text>
    </Pressable>
  );
}

/**
 * „Dziś” (design-spec „Macierz stanów”, makieta e3 „dzis”; P-2 = B): następna lekcja na suknie (BlokLekcji), wejścia
 * do ćwiczeń (`dzis-cwiczenia`, `dzis-powtorki`; scenariusz tylko z treścią scenariuszy, D-255), pod nimi wszystkie
 * lekcje (każdą można otworzyć, FR-01). Licznik dziennego limitu: na ekranie startu aktywności (EkranStartu, session.tsx).
 */
export default function TodayScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const odczyt = useOdczytPostepu(czytajDzis, 'nauka');
  const progress = odczyt.stan === 'ok' ? odczyt.wartosc.progress : PUSTE_LEKCJE;
  const exams = odczyt.stan === 'ok' ? odczyt.wartosc.exams : PUSTE_TESTY;
  const blok = odczyt.stan === 'ok' ? nastepnaNaDzis(modules, lessons, odczyt.wartosc.fakty, odczyt.wartosc.postep) : null;
  const powtorki = odczyt.stan === 'ok' ? odczyt.wartosc.powtorkiNaDzis : 0;
  const otworzLekcje = (id: string) => router.push({ pathname: '/lesson/[id]', params: { id } });

  const done = lessons.filter((l) => progress.get(l.id)?.done).length;

  return (
    <Screen>
      <View style={styles.naglowek}>
        <Text accessibilityRole="header" style={[styl.tytulDuzy, { color: tk.ink, flex: 1 }]}>
          {t('today.title')}
        </Text>
        {/* makieta e3 „dzis”: ikona ustawień w prawym górnym rogu, etykieta czytnika „Ustawienia” (design-spec.md:70). Znak ⚙︎
            zamiast rysunku SVG z makiety: system nie ma komponentu ikony (zgłoszenie 08-F22 → 04). */}
        <Pressable testID="ustawienia" accessibilityRole="button" accessibilityLabel={t('settings.title')} hitSlop={12} onPress={() => router.push('/settings')}>
          <Text style={[styl.naglowek, { color: tk.ink }]} maxFontSizeMultiplier={ZNAK_SKALA_MAX} accessibilityElementsHidden importantForAccessibility="no">
            ⚙︎
          </Text>
        </Pressable>
      </View>
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={odczyt.odswiez} /> : null}
      {blok ? <BlokLekcji blok={blok} onOtworz={otworzLekcje} /> : odczyt.stan === 'ok' ? <Muted>{t('today.courseDone')}</Muted> : null}
      <Text style={[styl.przypis, { color: tk.muted }]}>{t('today.exercises')}</Text>
      <View style={[styles.grupa, { backgroundColor: tk.surface }]}>
        <WierszGrupy testID="dzis-cwiczenia" pierwszy tytul={t('today.practice')} podpis={t('today.practiceHint')} onPress={() => router.push({ pathname: '/session', params: { mode: 'practice' } })} />
        <WierszGrupy
          testID="dzis-powtorki"
          pierwszy={false}
          tytul={t('today.reviews')}
          wartosc={powtorki > 0 ? t('today.reviewsDue', { count: powtorki }) : undefined}
          onPress={() => router.push({ pathname: '/session', params: { mode: 'review' } })}
        />
      </View>
      <AdvancementCard />
      <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink, marginTop: odstep.l }]}>
        {t('today.allLessons')}
      </Text>
      <Muted>{t('learn.intro')}</Muted>
      <View style={{ gap: odstep.s }}>
        <ProgressBar value={lessons.length ? done / lessons.length : 0} />
        <Muted>{t('learn.lessonsDone', { done, total: lessons.length })}</Muted>
      </View>

      {modules.map((m) => {
        const items = lessons.filter((l) => l.moduleId === m.id);
        const available = items.length > 0;
        return (
          <View key={m.id} style={{ gap: odstep.s }}>
            <View style={styles.moduleHead}>
              <Text style={[styl.naglowek, { color: available ? tk.ink : tk.muted }]}>{m.title}</Text>
              {!m.recommended ? <Muted>{t('learn.optional')}</Muted> : null}
            </View>
            <Muted>{available ? m.sub : `${m.sub}. ${t('learn.soon')}.`}</Muted>
            {items.map((l) => {
              const p = progress.get(l.id);
              const state = p?.done ? 'done' : p ? 'started' : 'new';
              return (
                <Pressable
                  key={l.id}
                  testID={`lesson-${l.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={etykietaWiersza({ tytul: l.title, opis: l.sub, stan: state, wynik: p && p.total !== null && p.bestCorrect !== null ? { dobre: p.bestCorrect, razem: p.total } : null }, t)}
                  onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: l.id } })}
                  style={({ pressed }) => [
                    styles.lesson,
                    { backgroundColor: tk.surface, borderColor: state === 'done' ? tk.ink : tk.separator, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <View style={[styles.dot, { borderColor: tk.ink, backgroundColor: state === 'done' ? tk.primaryBg : 'transparent', borderStyle: state === 'started' ? 'dashed' : 'solid' }]}>
                    {state === 'done' ? <Text style={{ color: tk.primaryInk, fontWeight: '800' }} maxFontSizeMultiplier={ZNAK_SKALA_MAX}>✓</Text> : null}
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600' }]}>{l.title}</Text>
                    <Muted>{l.sub}</Muted>
                  </View>
                  {p && p.total !== null && p.bestCorrect !== null ? <Muted>{`${p.bestCorrect}/${p.total}`}</Muted> : null}
                </Pressable>
              );
            })}
            {available ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={etykietaWiersza({ tytul: t('exam.start'), opis: t('exam.hint', { count: EXAM_SIZE }), stan: exams.get(m.id)?.passed ? 'passed' : 'new' }, t)}
                onPress={() => router.push({ pathname: '/session', params: { mode: 'exam', moduleId: m.id } })}
                style={({ pressed }) => [styles.lesson, { borderColor: exams.get(m.id)?.passed ? tk.ink : tk.separator, borderStyle: 'dashed', opacity: pressed ? 0.85 : 1 }]}
              >
                <View style={[styles.dot, { borderColor: tk.ink, backgroundColor: exams.get(m.id)?.passed ? tk.primaryBg : 'transparent' }]}>
                  {exams.get(m.id)?.passed ? <Text style={{ color: tk.primaryInk, fontWeight: '800' }} maxFontSizeMultiplier={ZNAK_SKALA_MAX}>✓</Text> : null}
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600' }]}>{t('exam.start')}</Text>
                  <Muted>{t('exam.hint', { count: EXAM_SIZE })}</Muted>
                </View>
                {exams.get(m.id) ? <Muted>{`${exams.get(m.id)!.best}/${exams.get(m.id)!.total}`}</Muted> : null}
              </Pressable>
            ) : null}
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  naglowek: { flexDirection: 'row', alignItems: 'center', gap: odstep.m },
  moduleHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: odstep.m },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, padding: odstep.l, borderRadius: promien.przycisk, borderWidth: 1.5 },
  grupa: { borderRadius: promien.przycisk, overflow: 'hidden' },
  wiersz: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, minHeight: 56, paddingVertical: odstep.m, paddingHorizontal: odstep.l },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
