import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted, ProgressBar, Screen, Title } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { lessonProgressMap } from '@/data/user/repo';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Mapa nauki: moduły i lekcje. Każdą lekcję można otworzyć (FR-01). */
export default function LearnScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const [progress, setProgress] = useState(() => lessonProgressMap(userDb));
  useFocusEffect(useCallback(() => setProgress(lessonProgressMap(userDb)), []));

  const done = lessons.filter((l) => progress.get(l.id)?.done).length;

  return (
    <Screen>
      <Title>{t('learn.title')}</Title>
      <Muted>{t('learn.intro')}</Muted>
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
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  moduleHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: space.m },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: space.m, padding: space.l, borderRadius: radius.m, borderWidth: 1.5 },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
