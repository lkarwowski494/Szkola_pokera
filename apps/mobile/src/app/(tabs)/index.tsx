import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Muted, ProgressBar, Screen, Title } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { odczytajPostepLekcji, wynikiLekcji, wynikiTestow, type PortBazy } from '@szkola/postep';
import { useOdczytPostepu } from '@/data/postep';
import { podsumowanieLekcji, podsumowanieTestow } from '@/features/kurs/podsumowania';
import { AdvancementCard } from '@/features/advancement/AdvancementCard';
import { EXAM_SIZE } from '@/features/drills/thresholds';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

const PUSTE_LEKCJE: ReturnType<typeof podsumowanieLekcji> = new Map();
const PUSTE_TESTY: ReturnType<typeof podsumowanieTestow> = new Map();
// Postęp lekcji i testów z postep.db (część 5); błąd odczytu → mapa bez postępu i wpis w dzienniku (useOdczytPostepu).
async function czytajNauke(port: PortBazy) {
  const [p, l, t] = await Promise.all([odczytajPostepLekcji(port), wynikiLekcji(port), wynikiTestow(port)]);
  if (!p.ok) return p;
  if (!l.ok) return l;
  if (!t.ok) return t;
  return { ok: true as const, wartosc: { progress: podsumowanieLekcji(p.wartosc, l.wartosc), exams: podsumowanieTestow(t.wartosc) } };
}

/** Mapa nauki: moduły i lekcje. Każdą lekcję można otworzyć (FR-01). */
export default function LearnScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const odczyt = useOdczytPostepu(czytajNauke, 'nauka');
  const progress = odczyt.stan === 'ok' ? odczyt.wartosc.progress : PUSTE_LEKCJE;
  const exams = odczyt.stan === 'ok' ? odczyt.wartosc.exams : PUSTE_TESTY;

  const done = lessons.filter((l) => progress.get(l.id)?.done).length;

  return (
    <Screen>
      <Title>{t('learn.title')}</Title>
      <Muted>{t('learn.intro')}</Muted>
      <AdvancementCard />
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={odczyt.odswiez} /> : null}
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
                  accessibilityLabel={`${l.title}. ${l.sub}`}
                  onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: l.id } })}
                  style={({ pressed }) => [
                    styles.lesson,
                    { backgroundColor: tk.surface, borderColor: state === 'done' ? tk.ink : tk.separator, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <View style={[styles.dot, { borderColor: tk.ink, backgroundColor: state === 'done' ? tk.primaryBg : 'transparent', borderStyle: state === 'started' ? 'dashed' : 'solid' }]}>
                    {state === 'done' ? <Text style={{ color: tk.primaryInk, fontWeight: '800' }}>✓</Text> : null}
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
                accessibilityLabel={`${t('exam.start')}. ${t('exam.hint', { count: EXAM_SIZE })}`}
                onPress={() => router.push({ pathname: '/session', params: { mode: 'exam', moduleId: m.id } })}
                style={({ pressed }) => [styles.lesson, { borderColor: exams.get(m.id)?.passed ? tk.ink : tk.separator, borderStyle: 'dashed', opacity: pressed ? 0.85 : 1 }]}
              >
                <View style={[styles.dot, { borderColor: tk.ink, backgroundColor: exams.get(m.id)?.passed ? tk.primaryBg : 'transparent' }]}>
                  {exams.get(m.id)?.passed ? <Text style={{ color: tk.primaryInk, fontWeight: '800' }}>✓</Text> : null}
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
  moduleHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: odstep.m },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, padding: odstep.l, borderRadius: promien.przycisk, borderWidth: 1.5 },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
