import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Blocks } from '@/components/Blocks';
import { RuleCard } from '@/components/RuleCard';
import { Button, H2, Muted, Screen, Title } from '@/components/ui';
import { getLesson, getLessonDrills, getRulesByIds } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { markTheorySeen } from '@/data/user/repo';
import { space } from '@/theme/tokens';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const { t } = useTranslation();
  const lesson = useMemo(() => getLesson(db, id), [db, id]);
  const rules = useMemo(() => (lesson ? getRulesByIds(db, lesson.rules) : []), [db, lesson]);
  // liczba zadań w sesji: zadanie z generatora daje `count` rozdań
  const exerciseCount = useMemo(
    () => getLessonDrills(db, id).reduce((n, r) => n + (r.drill.kind === 'generated' ? r.drill.count : 1), 0),
    [db, id],
  );

  useEffect(() => {
    if (lesson) markTheorySeen(userDb, lesson.id);
  }, [lesson]);

  if (!lesson) {
    return (
      <Screen>
        <Muted>{t('lesson.notFound')}</Muted>
      </Screen>
    );
  }

  const start = () => router.push({ pathname: '/session', params: { mode: 'lesson', lessonId: lesson.id } });

  return (
    <Screen padTop={false}>
      <Stack.Screen options={{ title: lesson.title }} />
      <View style={{ gap: space.xs }}>
        <Title>{lesson.title}</Title>
        <Muted>{lesson.sub}</Muted>
      </View>
      <Blocks blocks={lesson.body} />
      {rules.length > 0 ? (
        <View style={{ gap: space.m }}>
          <H2>{t('lesson.rulesTitle')}</H2>
          {rules.map((r) => (
            <RuleCard key={r.id} rule={r} />
          ))}
        </View>
      ) : null}
      <View style={{ gap: space.s }}>
        <Button label={t('lesson.start')} onPress={start} />
        <Muted>{t('lesson.exercises', { count: exerciseCount })}</Muted>
      </View>
    </Screen>
  );
}
