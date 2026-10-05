import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted, ProgressBar, Screen, Title } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { examSummaryMap, lessonProgressMap } from '@/data/user/repo';
import { AdvancementCard } from '@/features/advancement/AdvancementCard';
import { EXAM_SIZE } from '@/features/drills/thresholds';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Mapa nauki: moduły i lekcje. Każdą lekcję można otworzyć (FR-01). */
export default function LearnScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const [progress, setProgress] = useState(() => lessonProgressMap(userDb));
  const [exams, setExams] = useState(() => examSummaryMap(userDb));
  useFocusEffect(
    useCallback(() => {
      setProgress(lessonProgressMap(userDb));
      setExams(examSummaryMap(userDb));
    }, []),
  );

  const done = lessons.filter((l) => progress.get(l.id)?.done).length;

  return (
    <Screen>
      <Title>{t('learn.title')}</Title>
      <Muted>{t('learn.intro')}</Muted>
      <AdvancementCard />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${t('play.entry')}. ${t('play.entryHint')}`}
        onPress={() => router.push('/play')}
        style={({ pressed }) => [styles.play, { backgroundColor: tk.feltDeep, opacity: pressed ? 0.9 : 1 }]}
      >
        <Text style={[tp.h3, { color: tk.onFelt }]}>{t('play.entry')}</Text>
        <Text style={[tp.small, { color: tk.onFelt, opacity: 0.85 }]}>{t('play.entryHint')}</Text>
      </Pressable>
      <View style={{ gap: space.s }}>
        <ProgressBar value={lessons.length ? done / lessons.length : 0} />
        <Muted>{t('learn.lessonsDone', { done, total: lessons.length })}</Muted>
      </View>

      {modules.map((m) => {
        const items = lessons.filter((l) => l.moduleId === m.id);
        const available = items.length > 0;
        return (
          <View key={m.id} style={{ gap: space.s }}>
            <View style={styles.moduleHead}>
              <Text style={[tp.h3, { color: available ? tk.ink : tk.muted }]}>{m.title}</Text>
              {!m.recommended ? <Muted>{t('learn.optional')}</Muted> : null}
            </View>
            <Muted>{available ? m.sub : `${m.sub}. ${t('learn.soon')}.`}</Muted>
            {items.map((l) => {
              const p = progress.get(l.id);
              const state = p?.done ? 'done' : p ? 'started' : 'new';
              return (
                <Pressable
                  key={l.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${l.title}. ${l.sub}`}
                  onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: l.id } })}
                  style={({ pressed }) => [
                    styles.lesson,
                    { backgroundColor: tk.surface, borderColor: state === 'done' ? tk.felt : tk.line, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <View style={[styles.dot, { borderColor: tk.felt, backgroundColor: state === 'done' ? tk.felt : state === 'started' ? tk.feltSoft : 'transparent' }]}>
                    {state === 'done' ? <Text style={{ color: tk.onFelt, fontWeight: '800' }}>✓</Text> : null}
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[tp.body, { color: tk.ink, fontWeight: '600' }]}>{l.title}</Text>
                    <Muted>{l.sub}</Muted>
                  </View>
                  {p && p.total > 0 ? <Muted>{`${p.bestCorrect}/${p.total}`}</Muted> : null}
                </Pressable>
              );
            })}
            {available ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${t('exam.start')}. ${t('exam.hint', { count: EXAM_SIZE })}`}
                onPress={() => router.push({ pathname: '/session', params: { mode: 'exam', moduleId: m.id } })}
                style={({ pressed }) => [styles.lesson, { borderColor: exams.get(m.id)?.passed ? tk.felt : tk.line, borderStyle: 'dashed', opacity: pressed ? 0.85 : 1 }]}
              >
                <View style={[styles.dot, { borderColor: tk.felt, backgroundColor: exams.get(m.id)?.passed ? tk.felt : 'transparent' }]}>
                  {exams.get(m.id)?.passed ? <Text style={{ color: tk.onFelt, fontWeight: '800' }}>✓</Text> : null}
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={[tp.body, { color: tk.ink, fontWeight: '600' }]}>{t('exam.start')}</Text>
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
  play: { padding: space.l, borderRadius: radius.l, gap: space.xs },
  moduleHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: space.m },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: space.m, padding: space.l, borderRadius: radius.m, borderWidth: 1.5 },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
