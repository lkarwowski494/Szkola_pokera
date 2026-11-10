import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Muted, ProgressBar, Screen, Title } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { useOdczytPostepu } from '@/data/postep';
import { useBazaTresci } from '@/data/tresc/kontekst';
import { etykietaWiersza, nastepnaNaDzis } from '@/features/dzis/widok';
import { EXAM_SIZE } from '@/features/drills/thresholds';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import { podsumowanieLekcji, podsumowanieTestow } from '@/features/kurs/podsumowania';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
import { ZNAK_SKALA_MAX } from '@/theme/skalowanie';
import { odczytajPostepLekcji, wynikiLekcji, wynikiTestow, type PortBazy } from '@szkola/postep';

const PUSTE_LEKCJE: ReturnType<typeof podsumowanieLekcji> = new Map();
const PUSTE_TESTY: ReturnType<typeof podsumowanieTestow> = new Map();

// Postęp lekcji, wyniki testów modułów i fakty kursu (bieżący moduł) z postep.db; błąd odczytu → stan bez postępu
// i komunikat z ponowieniem (useOdczytPostepu).
async function czytajLekcje(port: PortBazy) {
  const [p, l, t, f] = await Promise.all([odczytajPostepLekcji(port), wynikiLekcji(port), wynikiTestow(port), czytajFaktyKursu(port)]);
  if (!p.ok) return p;
  if (!l.ok) return l;
  if (!t.ok) return t;
  if (!f.ok) return f;
  return { ok: true as const, wartosc: { postep: p.wartosc, fakty: f.wartosc, progress: podsumowanieLekcji(p.wartosc, l.wartosc), exams: podsumowanieTestow(t.wartosc) } };
}

/**
 * „Lekcje” (D-542, KO-045): zakładka paska z dotychczasową listą moduły × lekcje + test modułu (FR-01: każdą lekcję można
 * otworzyć). Moduł z następną lekcją kursu jest rozwinięty, pozostałe zwinięte; stuknięcie nagłówka rozwija w miejscu
 * (`accessibilityState.expanded`). Rozwinięcia ręczne trwają do opuszczenia ekranu.
 */
export default function LessonsScreen() {
  const db = useBazaTresci();
  const tk = useTokens();
  const { t } = useTranslation();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const odczyt = useOdczytPostepu(czytajLekcje, 'lekcje');
  const [reczne, ustawReczne] = useState<Record<string, boolean>>({});
  const progress = odczyt.stan === 'ok' ? odczyt.wartosc.progress : PUSTE_LEKCJE;
  const exams = odczyt.stan === 'ok' ? odczyt.wartosc.exams : PUSTE_TESTY;
  const nastepna = odczyt.stan === 'ok' ? nastepnaNaDzis(modules, lessons, odczyt.wartosc.fakty, odczyt.wartosc.postep) : null;
  const biezacy = lessons.find((l) => l.id === nastepna?.lekcjaId)?.moduleId ?? null;
  const done = lessons.filter((l) => progress.get(l.id)?.done).length;

  return (
    <Screen>
      <Title>{t('lessons.title')}</Title>
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={odczyt.odswiez} /> : null}
      <Muted>{t('learn.intro')}</Muted>
      <View style={{ gap: odstep.s }}>
        <ProgressBar value={lessons.length ? done / lessons.length : 0} />
        <Muted>{t('learn.lessonsDone', { done, total: lessons.length })}</Muted>
      </View>

      {modules.map((m) => {
        const items = lessons.filter((l) => l.moduleId === m.id);
        const available = items.length > 0;
        const ukonczone = items.filter((l) => progress.get(l.id)?.done).length;
        const rozwiniety = reczne[m.id] ?? m.id === biezacy;
        const stan = !available ? t('learn.soon') : ukonczone === items.length ? t('lessons.moduleDone') : t('lessons.moduleProgress', { done: ukonczone, total: items.length });
        return (
          <View key={m.id} style={{ gap: odstep.s }}>
            <Pressable
              testID={`modul-${m.id}`}
              accessibilityRole="button"
              accessibilityState={{ expanded: rozwiniety }}
              accessibilityLabel={`${m.title}. ${stan}. ${t(rozwiniety ? 'lessons.collapse' : 'lessons.expand')}.`}
              onPress={() => ustawReczne((r) => ({ ...r, [m.id]: !rozwiniety }))}
              style={({ pressed }) => [styles.modul, { backgroundColor: tk.surface, opacity: pressed ? 0.85 : 1 }]}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={[styl.naglowek, { color: available ? tk.ink : tk.muted }]}>{m.title}</Text>
                <Muted>{stan}</Muted>
              </View>
              <Text style={[styl.tresc, { color: tk.muted }]} maxFontSizeMultiplier={ZNAK_SKALA_MAX} accessibilityElementsHidden importantForAccessibility="no">
                {rozwiniety ? '⌃' : '⌄'}
              </Text>
            </Pressable>
            {rozwiniety ? <Muted>{available ? m.sub : `${m.sub}. ${t('learn.soon')}.`}</Muted> : null}
            {rozwiniety
              ? items.map((l) => {
                  const p = progress.get(l.id);
                  const state = p?.done ? 'done' : p ? 'started' : 'new';
                  return (
                    <Pressable
                      key={l.id}
                      testID={`lesson-${l.id}`}
                      accessibilityRole="button"
                      accessibilityLabel={etykietaWiersza({ tytul: l.title, opis: l.sub, stan: state, wynik: p && p.total !== null && p.bestCorrect !== null ? { dobre: p.bestCorrect, razem: p.total } : null }, t)}
                      onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: l.id } })}
                      style={({ pressed }) => [styles.lesson, { backgroundColor: tk.surface, borderColor: state === 'done' ? tk.ink : tk.separator, opacity: pressed ? 0.85 : 1 }]}
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
                })
              : null}
            {rozwiniety && available ? (
              <Pressable
                testID={`egzamin-${m.id}`}
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
  modul: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, minHeight: 56, paddingVertical: odstep.m, paddingHorizontal: odstep.l, borderRadius: promien.przycisk },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, padding: odstep.l, borderRadius: promien.przycisk, borderWidth: 1.5 },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
