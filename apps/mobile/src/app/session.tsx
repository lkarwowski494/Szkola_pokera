import { createRng } from '@szkola/poker-core';
import { DEFAULT_THRESHOLDS } from '@szkola/srs';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PaintGrid } from '@/components/PaintGrid';
import { RichText } from '@/components/RichText';
import { TableFelt } from '@/components/TableFelt';
import { Button, Muted, ProgressBar, Screen, Title } from '@/components/ui';
import { getAllRangeSpots, getDrillsBeforeModule, getDrillsForFamilies, getLessonDrills, getModuleDrills } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { allFamilies, dueFamilies, recordAnswer, saveExamResult, saveLessonResult } from '@/data/user/repo';
import { gradeAnswer, isPass, parseNumberInput, scorePaint } from '@/features/drills/grade';
import { pct, t as dt } from '@/features/drills/text.pl';
import { EXAM_PASS, PAINT_PASS } from '@/features/drills/thresholds';
import type { ChoiceInstance, DrillAnswer, DrillInstance, DrillOption, GradeResult, NumericInstance, PaintInstance, TextureInstance } from '@/features/drills/types';
import { buildExamSession, buildFamilySession, buildLessonSession, buildSpeedSession, type SessionMode } from '@/features/session/build';
import { useSettings } from '@/state/settings';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Limit czasu w trybie na czas = próg „wolnej” odpowiedzi FSRS (założenie do kalibracji, dokument 09). */
const SPEED_LIMIT_MS = DEFAULT_THRESHOLDS.slowMs;

interface Record_ {
  item: DrillInstance;
  answer: DrillAnswer;
  grade: GradeResult;
  elapsedMs: number;
}

const emptyGrid = () => Array.from({ length: 169 }, () => false);

export default function SessionScreen() {
  const { mode = 'lesson', lessonId, moduleId } = useLocalSearchParams<{ mode?: SessionMode; lessonId?: string; moduleId?: string }>();
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const haptics = useSettings((s) => s.haptics);
  const exam = mode === 'exam';

  const build = useCallback((): DrillInstance[] => {
    const rng = createRng(Date.now() & 0x7fffffff);
    const ranges = getAllRangeSpots(db);
    const ctx = { range: (id: string) => ranges.get(id) };
    if (mode === 'lesson' && lessonId) return buildLessonSession(getLessonDrills(db, lessonId), rng, ctx);
    if (mode === 'exam' && moduleId) return buildExamSession(getModuleDrills(db, moduleId), getDrillsBeforeModule(db, moduleId), rng, ctx);
    if (mode === 'review') {
      const families = dueFamilies(userDb).slice(0, 8).map((c) => c.familyId);
      return buildFamilySession(getDrillsForFamilies(db, families), families, rng, 2, ctx);
    }
    const known = allFamilies(userDb);
    return buildSpeedSession(getDrillsForFamilies(db, known), known, rng, 10, ctx);
  }, [db, mode, lessonId, moduleId]);

  const [items, setItems] = useState<DrillInstance[]>(build);
  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState<Record_ | null>(null);
  const [records, setRecords] = useState<Record_[]>([]);
  const [painted, setPainted] = useState<boolean[]>(emptyGrid);
  const [numText, setNumText] = useState('');
  const [texPicks, setTexPicks] = useState<(number | null)[]>([]);
  const [painting, setPainting] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const savedRef = useRef(false);
  const finished = idx >= items.length;
  const item = items[idx];

  const resetInputs = () => {
    setCurrent(null);
    setPainted(emptyGrid());
    setNumText('');
    setTexPicks([]);
    const n = Date.now();
    setStartedAt(n);
    setNow(n);
  };

  const next = useCallback(
    (all: Record_[]) => {
      const nextIdx = idx + 1;
      if (nextIdx >= items.length && !savedRef.current) {
        savedRef.current = true;
        const correct = all.filter((r) => isPass(r.grade)).length;
        if (mode === 'lesson' && lessonId) saveLessonResult(userDb, lessonId, correct, items.length);
        if (exam && moduleId) saveExamResult(userDb, moduleId, correct, items.length, correct / items.length >= EXAM_PASS);
      }
      resetInputs();
      setIdx(nextIdx);
    },
    [idx, items.length, mode, lessonId, moduleId, exam],
  );

  const commit = useCallback(
    (answer: DrillAnswer) => {
      if (!item || current) return;
      const elapsedMs = answer.kind === 'timeout' ? SPEED_LIMIT_MS : Date.now() - startedAt;
      const grade = gradeAnswer(item, answer);
      const rec = { item, answer, grade, elapsedMs };
      recordAnswer(userDb, {
        drillId: item.drillId,
        family: item.family,
        lessonId: item.lessonId,
        mode,
        grade,
        elapsedMs,
        ...(item.kind === 'paint' ? { untimed: true } : {}),
      });
      const all = [...records, rec];
      setRecords(all);
      if (exam) {
        // egzamin: bez informacji zwrotnej po każdym zadaniu, wyjaśnienia na końcu (decyzja właściciela, B-023)
        next(all);
        return;
      }
      setCurrent(rec);
      if (haptics) {
        void Haptics.notificationAsync(
          grade === 'correct' ? Haptics.NotificationFeedbackType.Success : grade === 'wrong' ? Haptics.NotificationFeedbackType.Error : Haptics.NotificationFeedbackType.Warning,
        );
      }
    },
    [item, current, mode, haptics, records, exam, next, startedAt],
  );

  // licznik czasu tylko w trybie na czas
  useEffect(() => {
    if (mode !== 'speed' || finished || current !== null) return;
    const id = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n - startedAt >= SPEED_LIMIT_MS) commit({ kind: 'timeout' });
    }, 100);
    return () => clearInterval(id);
  }, [mode, finished, current, commit, startedAt]);

  const restart = () => {
    setItems(build());
    setIdx(0);
    setRecords([]);
    savedRef.current = false;
    resetInputs();
  };

  if (items.length === 0) {
    return (
      <Screen>
        <Title>{exam ? t('exam.title') : t('review.title')}</Title>
        <Muted>{exam ? t('exam.empty') : t('review.none')}</Muted>
        <Button label={t('session.close')} onPress={() => router.back()} />
      </Screen>
    );
  }

  if (finished || !item) {
    const correct = records.filter((r) => isPass(r.grade)).length;
    const avg = records.reduce((s, r) => s + r.elapsedMs, 0) / Math.max(1, records.length) / 1000;
    const passed = correct / items.length >= EXAM_PASS;
    return (
      <Screen>
        <Title>{exam ? t('exam.resultTitle') : t('session.resultTitle')}</Title>
        <Text style={[styles.score, { color: exam && !passed ? tk.bad : tk.felt }]}>{`${correct}/${items.length}`}</Text>
        {exam ? (
          <Text style={[tp.body, { color: tk.ink }]}>
            {passed ? t('exam.passed', { need: pct(EXAM_PASS) }) : t('exam.failed', { need: pct(EXAM_PASS) })}
          </Text>
        ) : (
          <>
            <Muted>{t('session.avgTime', { s: avg.toFixed(1).replace('.', ',') })}</Muted>
            <Text style={[tp.body, { color: tk.ink }]}>{correct === items.length ? t('session.resultPerfect') : t('session.resultRetry')}</Text>
          </>
        )}
        <View style={{ gap: space.m }}>
          <Button label={exam ? t('exam.again') : t('session.again')} variant="ghost" onPress={restart} />
          <Button label={t('session.close')} onPress={() => router.back()} />
        </View>
        {exam ? (
          <View style={{ gap: space.l }}>
            <Text style={[tp.h3, { color: tk.ink }]}>{t('exam.review')}</Text>
            {records.map((r, i) => (
              <View key={r.item.key} style={[styles.reviewItem, { borderColor: gradeColor(tk, r.grade), backgroundColor: tk.surface }]}>
                <Muted>{`${i + 1}. ${gradeLabel(t, r.grade)}`}</Muted>
                {r.item.table ? <TableFelt table={r.item.table} /> : null}
                <RichText text={r.item.prompt} style={[tp.body, { fontWeight: '600' }]} />
                <Feedback rec={r} painted={r.answer.kind === 'paint' ? [...r.answer.painted] : undefined} />
              </View>
            ))}
          </View>
        ) : null}
      </Screen>
    );
  }

  const left = Math.max(0, SPEED_LIMIT_MS - (now - startedAt));

  return (
    <Screen scrollEnabled={!painting}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
          <Text style={[tp.body, { color: tk.felt, fontWeight: '600' }]}>{t('session.close')}</Text>
        </Pressable>
        <Muted>{exam ? t('exam.of', { n: idx + 1, total: items.length }) : t('session.of', { n: idx + 1, total: items.length })}</Muted>
      </View>
      <ProgressBar value={(idx + (current ? 1 : 0)) / items.length} />
      {mode === 'speed' && !current ? (
        <View style={{ gap: space.xs }}>
          <ProgressBar value={left / SPEED_LIMIT_MS} height={4} />
          <Muted>{t('session.secondsLeft', { s: Math.ceil(left / 1000) })}</Muted>
        </View>
      ) : null}

      {item.table ? <TableFelt table={item.table} /> : null}
      <RichText text={item.prompt} style={[tp.h3, { fontWeight: '600' }]} />

      {item.kind === 'choice' ? (
        <ChoiceOptions item={item} picked={current?.answer.kind === 'choice' ? current.answer.index : current ? -1 : null} onPick={(i) => commit({ kind: 'choice', index: i })} />
      ) : null}

      {item.kind === 'numeric' && !current ? (
        <NumericEntry item={item} text={numText} onText={setNumText} onSubmit={(v) => commit({ kind: 'numeric', value: v })} />
      ) : null}

      {item.kind === 'texture' && !current ? (
        <TextureEntry
          item={item}
          picks={texPicks}
          onPick={(axis, i) => setTexPicks((p) => item.axes.map((_, k) => (k === axis ? i : (p[k] ?? null))))}
          onSubmit={(picks) => commit({ kind: 'texture', picks })}
        />
      ) : null}

      {item.kind === 'paint' && !current ? (
        <View style={{ gap: space.m }}>
          <PaintGrid painted={painted} onChange={setPainted} onActive={setPainting} />
          <View style={styles.row}>
            <Button label={t('session.clear')} variant="ghost" onPress={() => setPainted(emptyGrid())} style={{ flex: 1 }} />
            <Button label={t('session.check')} onPress={() => commit({ kind: 'paint', painted })} style={{ flex: 1 }} />
          </View>
        </View>
      ) : null}

      {current ? (
        <View style={{ gap: space.m }}>
          <Text style={[tp.h3, { color: gradeColor(tk, current.grade) }]}>
            {current.answer.kind === 'timeout' ? t('session.timeout') : gradeLabel(t, current.grade)}
          </Text>
          <Feedback rec={current} painted={current.answer.kind === 'paint' ? [...current.answer.painted] : undefined} hideChoices />
          <Button label={idx + 1 < items.length ? t('session.next') : t('session.finish')} onPress={() => next(records)} />
        </View>
      ) : null}
    </Screen>
  );
}

type Tk = ReturnType<typeof useTokens>;
type TFn = ReturnType<typeof useTranslation>['t'];

function gradeColor(tk: Tk, g: GradeResult): string {
  return g === 'correct' ? tk.good : g === 'wrong' ? tk.bad : tk.warn;
}

function gradeLabel(t: TFn, g: GradeResult): string {
  return g === 'correct' ? t('session.correct') : g === 'acceptable' ? t('session.acceptable') : g === 'close' ? t('session.near') : g === 'size' ? t('session.sizeError') : t('session.wrong');
}

/** Opcje zadania z wyborem. `picked`: null = jeszcze bez odpowiedzi, -1 = brak wyboru (czas minął). */
function ChoiceOptions({ item, picked, onPick, readOnly }: { item: ChoiceInstance; picked: number | null; onPick?: (i: number) => void; readOnly?: boolean }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const answered = picked !== null;
  return (
    <View style={{ gap: space.s }}>
      {item.options.map((o, i) => {
        const isPicked = picked === i;
        const showRight = answered && o.correct;
        const showOk = answered && isPicked && !o.correct && !!o.acceptable;
        const showSize = answered && isPicked && !o.correct && !o.acceptable && !!o.sizeError;
        const showWrong = answered && isPicked && !o.correct && !o.acceptable && !o.sizeError;
        return (
          <Pressable
            key={`${item.key}-${i}`}
            testID={`option-${i}`}
            accessibilityRole="button"
            accessibilityState={{ disabled: answered || readOnly, selected: isPicked }}
            disabled={answered || readOnly}
            onPress={() => onPick?.(i)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: showRight ? tk.goodSoft : showWrong ? tk.badSoft : showSize || showOk ? tk.warnSoft : tk.surface,
                borderColor: showRight ? tk.good : showWrong ? tk.bad : showSize || showOk ? tk.warn : tk.line,
                opacity: answered && !showRight && !showWrong && !showSize && !showOk ? 0.75 : pressed ? 0.85 : 1,
              },
            ]}
          >
            {showRight || showWrong || showSize || showOk ? (
              <Text style={[tp.caption, { color: showRight ? tk.good : showSize || showOk ? tk.warn : tk.bad, fontWeight: '700' }]}>
                {showRight
                  ? isPicked
                    ? t('session.yourAnswer')
                    : t('session.rightAnswer')
                  : showOk
                    ? t('session.yourAnswerAcceptable')
                    : showSize
                      ? t('session.yourAnswerSize')
                      : t('session.yourAnswer')}
              </Text>
            ) : null}
            <RichText text={o.text} style={[tp.body, { fontWeight: '600' }]} />
            {answered ? <RichText text={o.why} style={[tp.small, { color: tk.muted }]} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

function NumericEntry({ item, text, onText, onSubmit }: { item: NumericInstance; text: string; onText: (s: string) => void; onSubmit: (v: number) => void }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const value = parseNumberInput(text);
  const suffix = item.unit === 'percent' ? '%' : item.unit === 'bb' ? 'bb' : item.unit === 'bb100' ? 'bb/100' : item.unit === 'multiplier' ? 'x' : '';
  return (
    <View style={{ gap: space.m }}>
      <View style={[styles.inputRow, { borderColor: tk.line, backgroundColor: tk.surface }]}>
        <TextInput
          value={text}
          onChangeText={onText}
          keyboardType="decimal-pad"
          returnKeyType="done"
          autoFocus
          accessibilityLabel={t('session.numberLabel')}
          placeholder="0"
          placeholderTextColor={tk.muted}
          onSubmitEditing={() => value !== null && onSubmit(value)}
          style={[styles.input, { color: tk.ink }]}
        />
        {suffix ? <Text style={[tp.h3, { color: tk.muted }]}>{suffix}</Text> : null}
      </View>
      <Button label={t('session.check')} disabled={value === null} onPress={() => value !== null && onSubmit(value)} />
    </View>
  );
}

/**
 * Klasyfikacja tekstury flopa (M5): w każdym wierszu jedna oś (np. wysokość) i jej wartości jako przyciski.
 * „Sprawdź” aktywne dopiero po wyborze w każdym wierszu.
 */
function TextureEntry({
  item,
  picks,
  onPick,
  onSubmit,
}: {
  item: TextureInstance;
  picks: readonly (number | null)[];
  onPick: (axis: number, option: number) => void;
  onSubmit: (picks: number[]) => void;
}) {
  const tk = useTokens();
  const { t } = useTranslation();
  const complete = item.axes.every((_, i) => picks[i] !== null && picks[i] !== undefined);
  return (
    <View style={{ gap: space.l }}>
      {item.axes.map((a, ai) => (
        <View key={a.axis} style={{ gap: space.xs }}>
          <Muted>{a.label}</Muted>
          <View style={styles.segments} accessibilityRole="radiogroup" accessibilityLabel={a.label}>
            {a.options.map((o, oi) => {
              const on = picks[ai] === oi;
              return (
                <Pressable
                  key={o.text}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on, checked: on }}
                  accessibilityLabel={`${a.label}: ${o.text}`}
                  onPress={() => onPick(ai, oi)}
                  style={({ pressed }) => [
                    styles.segment,
                    { backgroundColor: on ? tk.feltSoft : tk.surface, borderColor: on ? tk.felt : tk.line, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <Text style={[tp.small, { color: tk.ink, fontWeight: on ? '700' : '500', textAlign: 'center' }]}>{o.text}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <Button label={t('session.check')} disabled={!complete} onPress={() => complete && onSubmit(picks.map((p) => p ?? -1))} />
    </View>
  );
}

/** Po ocenie: każda oś z zaznaczeniem poprawnej wartości, twojego wyboru i wyjaśnieniem każdej opcji. */
function TextureFeedback({ item, picks }: { item: TextureInstance; picks: readonly number[] }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const tone = (o: DrillOption, picked: boolean) => (o.correct ? 'good' : picked ? 'bad' : 'none');
  return (
    <View style={{ gap: space.l }}>
      {item.axes.map((a, ai) => (
        <View key={a.axis} style={{ gap: space.xs }}>
          <Text style={[tp.caption, { color: tk.muted, fontWeight: '700' }]}>{a.label}</Text>
          {a.options.map((o, oi) => {
            const picked = picks[ai] === oi;
            const k = tone(o, picked);
            return (
              <View
                key={o.text}
                style={[
                  styles.texOption,
                  {
                    backgroundColor: k === 'good' ? tk.goodSoft : k === 'bad' ? tk.badSoft : tk.surface,
                    borderColor: k === 'good' ? tk.good : k === 'bad' ? tk.bad : tk.line,
                  },
                ]}
              >
                <Text style={[tp.body, { color: tk.ink, fontWeight: '600' }]}>
                  {o.text}
                  {picked ? <Text style={[tp.caption, { color: o.correct ? tk.good : tk.bad }]}>{`  ${t('session.yourAnswer')}`}</Text> : null}
                </Text>
                <RichText text={o.why} style={[tp.small, { color: tk.muted }]} />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const fmtNum = (v: number, unit: NumericInstance['unit']) => {
  const s = String(Math.round(v * 100) / 100).replace('.', ',');
  return unit === 'percent' ? `${s}%` : unit === 'bb' ? `${s}bb` : unit === 'bb100' ? `${s}bb/100` : unit === 'multiplier' ? `${s}x` : s;
};

/** Informacja zwrotna po odpowiedzi (w lekcji od razu, w egzaminie w podsumowaniu). */
function Feedback({ rec, painted, hideChoices }: { rec: Record_; painted?: boolean[]; hideChoices?: boolean }) {
  const tk = useTokens();
  const { item, answer } = rec;
  return (
    <View style={{ gap: space.m }}>
      {item.kind === 'choice' && !hideChoices ? (
        <ChoiceOptions item={item} picked={answer.kind === 'choice' ? answer.index : -1} readOnly />
      ) : null}
      {item.kind === 'numeric' ? <NumericFeedback item={item} answer={answer} /> : null}
      {item.kind === 'paint' ? <PaintFeedback item={item} painted={painted ?? emptyGrid()} /> : null}
      {item.kind === 'texture' ? <TextureFeedback item={item} picks={answer.kind === 'texture' ? answer.picks : []} /> : null}
      {item.explanation ? (
        <View style={[styles.explain, { backgroundColor: tk.feltSoft }]}>
          <RichText text={item.explanation} style={tp.small} />
        </View>
      ) : null}
    </View>
  );
}

function NumericFeedback({ item, answer }: { item: NumericInstance; answer: DrillAnswer }) {
  const tk = useTokens();
  const given = answer.kind === 'numeric' ? answer.value : null;
  return (
    <View style={{ gap: space.xs }}>
      {given !== null ? <Text style={[tp.body, { color: tk.ink }]}>{dt.numeric.yours(fmtNum(given, item.unit))}</Text> : null}
      <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{dt.numeric.exact(item.display)}</Text>
      {given !== null && Math.abs(given - item.answer) >= 0.05 ? (
        <Muted>{item.unit === 'percent' ? dt.numeric.diffPp(given - item.answer) : dt.numeric.diff(given - item.answer)}</Muted>
      ) : null}
    </View>
  );
}

function PaintFeedback({ item, painted }: { item: PaintInstance; painted: boolean[] }) {
  const tk = useTokens();
  const s = scorePaint(item.spot, painted);
  return (
    <View style={{ gap: space.s }}>
      <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{dt.paint.score(s.score, PAINT_PASS)}</Text>
      <PaintGrid painted={painted} result={s.cells} />
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', gap: space.m },
  option: { borderWidth: 1.5, borderRadius: radius.m, padding: space.l, gap: space.xs },
  explain: { borderRadius: radius.m, padding: space.l },
  reviewItem: { borderWidth: 1.5, borderRadius: radius.m, padding: space.l, gap: space.s },
  segments: { flexDirection: 'row', gap: space.s },
  segment: { flex: 1, minHeight: 44, justifyContent: 'center', borderWidth: 1.5, borderRadius: radius.m, paddingHorizontal: space.s, paddingVertical: space.m },
  texOption: { borderWidth: 1.5, borderRadius: radius.m, padding: space.m, gap: space.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: radius.m, paddingHorizontal: space.l, gap: space.s },
  input: { flex: 1, fontSize: 28, fontWeight: '700', paddingVertical: space.m, fontVariant: ['tabular-nums'] },
  score: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
