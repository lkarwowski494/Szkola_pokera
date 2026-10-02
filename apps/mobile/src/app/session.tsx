import { createRng } from '@szkola/poker-core';
import { DEFAULT_THRESHOLDS } from '@szkola/srs';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RichText } from '@/components/RichText';
import { TableFelt } from '@/components/TableFelt';
import { Button, Muted, ProgressBar, Screen, Title } from '@/components/ui';
import { getDrillsForFamilies, getLessonDrills } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { allFamilies, dueFamilies, recordAnswer, saveLessonResult } from '@/data/user/repo';
import type { DrillInstance } from '@/features/drills/types';
import { buildFamilySession, buildLessonSession, buildSpeedSession, type SessionMode } from '@/features/session/build';
import { useSettings } from '@/state/settings';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Limit czasu w trybie na czas = próg „wolnej” odpowiedzi FSRS (założenie do kalibracji, dokument 09). */
const SPEED_LIMIT_MS = DEFAULT_THRESHOLDS.slowMs;

type Answer = { correct: boolean; elapsedMs: number };

export default function SessionScreen() {
  const { mode = 'lesson', lessonId } = useLocalSearchParams<{ mode?: SessionMode; lessonId?: string }>();
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const haptics = useSettings((s) => s.haptics);

  const build = useCallback((): DrillInstance[] => {
    const rng = createRng(Date.now() & 0x7fffffff);
    if (mode === 'lesson' && lessonId) return buildLessonSession(getLessonDrills(db, lessonId), rng);
    if (mode === 'review') {
      const families = dueFamilies(userDb).slice(0, 8).map((c) => c.familyId);
      return buildFamilySession(getDrillsForFamilies(db, families), families, rng, 2);
    }
    const known = allFamilies(userDb);
    return buildSpeedSession(getDrillsForFamilies(db, known), known, rng, 10);
  }, [db, mode, lessonId]);

  const [items, setItems] = useState<DrillInstance[]>(build);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | 'timeout' | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [now, setNow] = useState(Date.now());
  const startRef = useRef(Date.now());
  const finished = idx >= items.length;
  const item = items[idx];

  const commit = useCallback(
    (choice: number | 'timeout') => {
      if (!item || picked !== null) return;
      const elapsedMs = choice === 'timeout' ? SPEED_LIMIT_MS : Date.now() - startRef.current;
      const correct = choice !== 'timeout' && item.options[choice]!.correct;
      setPicked(choice);
      setAnswers((a) => [...a, { correct, elapsedMs }]);
      recordAnswer(userDb, { drillId: item.drillId, family: item.family, lessonId: item.lessonId, mode, correct, elapsedMs });
      if (haptics) void Haptics.notificationAsync(correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
    },
    [item, picked, mode, haptics],
  );

  // licznik czasu tylko w trybie na czas
  useEffect(() => {
    if (mode !== 'speed' || finished || picked !== null) return;
    const id = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n - startRef.current >= SPEED_LIMIT_MS) commit('timeout');
    }, 100);
    return () => clearInterval(id);
  }, [mode, finished, picked, commit]);

  const next = () => {
    setPicked(null);
    startRef.current = Date.now();
    setNow(Date.now());
    const nextIdx = idx + 1;
    if (nextIdx >= items.length && mode === 'lesson' && lessonId) {
      const correct = answers.filter((a) => a.correct).length;
      saveLessonResult(userDb, lessonId, correct, items.length);
    }
    setIdx(nextIdx);
  };

  const restart = () => {
    setItems(build());
    setIdx(0);
    setAnswers([]);
    setPicked(null);
    startRef.current = Date.now();
  };

  if (items.length === 0) {
    return (
      <Screen>
        <Title>{t('review.title')}</Title>
        <Muted>{t('review.none')}</Muted>
        <Button label={t('session.close')} onPress={() => router.back()} />
      </Screen>
    );
  }

  if (finished || !item) {
    const correct = answers.filter((a) => a.correct).length;
    const avg = answers.reduce((s, a) => s + a.elapsedMs, 0) / Math.max(1, answers.length) / 1000;
    return (
      <Screen>
        <Title>{t('session.resultTitle')}</Title>
        <Text style={[styles.score, { color: tk.felt }]}>{`${correct}/${items.length}`}</Text>
        <Muted>{t('session.avgTime', { s: avg.toFixed(1).replace('.', ',') })}</Muted>
        <Text style={[tp.body, { color: tk.ink }]}>{correct === items.length ? t('session.resultPerfect') : t('session.resultRetry')}</Text>
        <View style={{ gap: space.m }}>
          <Button label={t('session.again')} variant="ghost" onPress={restart} />
          <Button label={t('session.close')} onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const answered = picked !== null;
  const lastCorrect = answered && picked !== 'timeout' && item.options[picked]!.correct;
  const left = Math.max(0, SPEED_LIMIT_MS - (now - startRef.current));

  return (
    <Screen>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
          <Text style={[tp.body, { color: tk.felt, fontWeight: '600' }]}>{t('session.close')}</Text>
        </Pressable>
        <Muted>{t('session.of', { n: idx + 1, total: items.length })}</Muted>
      </View>
      <ProgressBar value={(idx + (answered ? 1 : 0)) / items.length} />
      {mode === 'speed' && !answered ? (
        <View style={{ gap: space.xs }}>
          <ProgressBar value={left / SPEED_LIMIT_MS} height={4} />
          <Muted>{t('session.secondsLeft', { s: Math.ceil(left / 1000) })}</Muted>
        </View>
      ) : null}

      {item.table ? <TableFelt table={item.table} /> : null}
      <RichText text={item.prompt} style={[tp.h3, { fontWeight: '600' }]} />

      <View style={{ gap: space.s }}>
        {item.options.map((o, i) => {
          const isPicked = picked === i;
          const showRight = answered && o.correct;
          const showWrong = answered && isPicked && !o.correct;
          return (
            <Pressable
              key={`${item.key}-${i}`}
              accessibilityRole="button"
              accessibilityState={{ disabled: answered, selected: isPicked }}
              disabled={answered}
              onPress={() => commit(i)}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: showRight ? tk.goodSoft : showWrong ? tk.badSoft : tk.surface,
                  borderColor: showRight ? tk.good : showWrong ? tk.bad : tk.line,
                  opacity: answered && !showRight && !showWrong ? 0.75 : pressed ? 0.85 : 1,
                },
              ]}
            >
              {showRight || showWrong ? (
                <Text style={[tp.caption, { color: showRight ? tk.good : tk.bad, fontWeight: '700' }]}>
                  {showRight ? (isPicked ? t('session.yourAnswer') : t('session.rightAnswer')) : t('session.yourAnswer')}
                </Text>
              ) : null}
              <RichText text={o.text} style={[tp.body, { fontWeight: '600' }]} />
              {answered ? <RichText text={o.why} style={[tp.small, { color: tk.muted }]} /> : null}
            </Pressable>
          );
        })}
      </View>

      {answered ? (
        <View style={{ gap: space.m }}>
          <Text style={[tp.h3, { color: lastCorrect ? tk.good : tk.bad }]}>
            {picked === 'timeout' ? t('session.timeout') : lastCorrect ? t('session.correct') : t('session.wrong')}
          </Text>
          {item.explanation ? (
            <View style={[styles.explain, { backgroundColor: tk.feltSoft }]}>
              <RichText text={item.explanation} style={tp.small} />
            </View>
          ) : null}
          <Button label={idx + 1 < items.length ? t('session.next') : t('session.finish')} onPress={next} />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  option: { borderWidth: 1.5, borderRadius: radius.m, padding: space.l, gap: space.xs },
  explain: { borderRadius: radius.m, padding: space.l },
  score: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
