import { createRng } from '@szkola/poker-core';
import { dzienLokalny } from '@szkola/domena';
import { odczytajKarty, wynikiTestow, zadaniaZTestow } from '@szkola/postep';
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
import {
  getAllRangeSpots,
  getDrillById,
  getDrillsBeforeModule,
  getDrillsForFamilies,
  getExamDrills,
  getExamDrillsBeforeModule,
  getLessonDrills,
  getModuleDrills,
  getSeenExamDrillsForFamilies,
} from '@/data/content/repo';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { gradeAnswer, isPass, parseNumberInput, scorePaint } from '@/features/drills/grade';
import { pct, t as dt } from '@/features/drills/text.pl';
import { EXAM_PASS, PAINT_PASS } from '@/features/drills/thresholds';
import type { ChoiceInstance, DrillAnswer, DrillInstance, DrillOption, GradeResult, NumericInstance, PaintInstance, TextureInstance } from '@/features/drills/types';
import { odpowiedzWSesji, otworzSesje, type PowodSesji, type RodzajSesji, type Sesja } from '@/features/session/aktywnoscSesji';
import { buildExamSession, buildFamilySession, buildLessonSession, type SessionMode } from '@/features/session/build';
import { zapiszBlad } from '@/platform/dziennik';
import { zegarTelefonu } from '@/platform/zegar';
import { useSettings } from '@/state/settings';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

interface Record_ {
  item: DrillInstance;
  answer: DrillAnswer;
  grade: GradeResult;
  elapsedMs: number;
}

const emptyGrid = () => Array.from({ length: 169 }, () => false);
const RODZAJ: Record<SessionMode, RodzajSesji> = { lesson: 'lekcja', review: 'powtorki', exam: 'test_modulu' };
const noweId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
type Stan = { stan: 'ladowanie' } | { stan: 'pusta' } | { stan: 'blad' } | { stan: 'gotowa'; sesja: Sesja };

/**
 * Sesja zadań jako aktywność (ADR 0010, część 5): wejście wznawia aktywność w toku (te same zadania, D-248) albo zaczyna nową;
 * każda odpowiedź zapisana przed pokazaniem oceny; błąd zapisu → komunikat, odpowiedź do ponowienia (tlo-i-bledy.md §4).
 * Limit dnia i ekran zakupu: część 5b — do tego czasu start bez limitu (`bezLimitu`, stan przejściowy nazwany w plan-08).
 */
export default function SessionScreen() {
  const { mode = 'lesson', lessonId, moduleId } = useLocalSearchParams<{ mode?: SessionMode; lessonId?: string; moduleId?: string }>();
  const db = useSQLiteContext();
  const port = usePortPostepu();
  const tk = useTokens();
  const { t } = useTranslation();
  const haptics = useSettings((s) => s.haptics);
  const exam = mode === 'exam';
  const trescId = mode === 'lesson' ? (lessonId ?? null) : mode === 'exam' ? (moduleId ?? null) : null;

  const otworz = useCallback(async (): Promise<Stan> => {
    const [seenW, kartyW, testyW] = await Promise.all([zadaniaZTestow(port), odczytajKarty(port), wynikiTestow(port)]);
    if (!seenW.ok || !kartyW.ok || !testyW.ok) return { stan: 'blad' };
    const seen = new Set(seenW.wartosc);
    const teraz = Date.now();
    const ranges = getAllRangeSpots(db);
    const ctx = { range: (id: string) => ranges.get(id) };
    const buduj = (): DrillInstance[] => {
      const rng = createRng(teraz & 0x7fffffff);
      if (mode === 'lesson' && lessonId) return buildLessonSession(getLessonDrills(db, lessonId), rng, ctx);
      if (mode === 'exam' && moduleId) {
        const src = {
          modulePool: getExamDrills(db, moduleId),
          moduleLessons: getModuleDrills(db, moduleId),
          earlierPool: getExamDrillsBeforeModule(db, moduleId),
          earlierLessons: getDrillsBeforeModule(db, moduleId),
        };
        return buildExamSession(src, rng, ctx, undefined, seen);
      }
      // zadania z puli egzaminacyjnej trafiają do powtórek dopiero po tym, jak użytkownik zobaczył je na egzaminie
      const familyRows = (families: readonly string[]) => [...getDrillsForFamilies(db, families), ...getSeenExamDrillsForFamilies(db, families, seen)];
      // powtórki: rodziny z terminem ≤ teraz, najwcześniejsze najpierw (karty w kolejności terminu), najwyżej 8
      const families = kartyW.wartosc.filter((k) => k.termin_ms <= teraz).slice(0, 8).map((k) => k.rodzina_id);
      return buildFamilySession(familyRows(families), families, rng, 2, ctx);
    };
    const r = await otworzSesje(port, {
      rodzaj: RODZAJ[mode], trescId, limit: { bezLimitu: true },
      pierwszePodejscieTestu: !testyW.wartosc.some((w) => w.modulId === moduleId),
      buduj, wiersz: (id) => getDrillById(db, id), ctx, zegar: { ...zegarTelefonu, teraz: () => teraz, dzienLokalny }, noweId,
    });
    if (!r.ok) return { stan: 'blad' };
    return r.wartosc ? { stan: 'gotowa', sesja: r.wartosc } : { stan: 'pusta' };
  }, [db, port, mode, lessonId, moduleId, trescId]);

  const [stan, ustawStan] = useState<Stan>({ stan: 'ladowanie' });
  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState<Record_ | null>(null);
  const [bladZapisu, ustawBladZapisu] = useState<PowodSesji | 'krok_niezgodny' | null>(null);
  const [painted, setPainted] = useState<boolean[]>(emptyGrid);
  const [numText, setNumText] = useState('');
  const [texPicks, setTexPicks] = useState<(number | null)[]>([]);
  const [painting, setPainting] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const zapisWToku = useRef(false);
  const sesja = stan.stan === 'gotowa' ? stan.sesja : null;
  const items = sesja?.items ?? [];
  const records: readonly Record_[] = sesja?.odpowiedzi ?? [];
  const finished = sesja !== null && idx >= items.length;
  const item = items[idx];

  const resetInputs = () => {
    setCurrent(null);
    ustawBladZapisu(null);
    setPainted(emptyGrid());
    setNumText('');
    setTexPicks([]);
    setStartedAt(Date.now());
  };

  const zaladuj = useCallback(() => {
    ustawStan({ stan: 'ladowanie' });
    void otworz()
      .catch((): Stan => ({ stan: 'blad' })) // wyjątek przy budowie zestawu: komunikat z ponowieniem, nie pusty ekran
      .then((s) => {
        if (s.stan === 'blad') zapiszBlad('odczyt_nieudany', 'sesja');
        ustawStan(s);
        setIdx(s.stan === 'gotowa' ? s.sesja.odpowiedzi.length : 0); // wznowienie: pierwszy krok bez odpowiedzi
      });
  }, [otworz]);
  useEffect(() => {
    zaladuj();
  }, [zaladuj]);

  const next = useCallback(() => {
    resetInputs();
    setIdx((i) => i + 1);
  }, []);

  const commit = useCallback(
    (answer: DrillAnswer) => {
      if (!item || !sesja || current || zapisWToku.current || idx !== sesja.odpowiedzi.length) return;
      const elapsedMs = Date.now() - startedAt;
      const grade = gradeAnswer(item, answer);
      zapisWToku.current = true;
      void odpowiedzWSesji(port, sesja, { answer, grade, elapsedMs }, Date.now()).then((w) => {
        zapisWToku.current = false;
        if (!w.ok) {
          // nigdy cicho: komunikat, odpowiedź zostaje na ekranie do ponowienia (tlo-i-bledy.md §4)
          if (w.powod === 'zapis_nieudany' || w.powod === 'brak_miejsca' || w.powod === 'przerwano_w_tle') zapiszBladPostepu(w.powod, 'sesja');
          ustawBladZapisu(w.powod);
          return;
        }
        ustawBladZapisu(null);
        ustawStan({ stan: 'gotowa', sesja: w.wartosc.sesja });
        if (exam) {
          // egzamin: bez informacji zwrotnej po każdym zadaniu, wyjaśnienia na końcu (decyzja właściciela, B-023)
          next();
          return;
        }
        setCurrent({ item, answer, grade, elapsedMs });
        if (haptics) {
          void Haptics.notificationAsync(
            grade === 'correct' ? Haptics.NotificationFeedbackType.Success : grade === 'wrong' ? Haptics.NotificationFeedbackType.Error : Haptics.NotificationFeedbackType.Warning,
          );
        }
      });
    },
    [item, sesja, current, idx, port, haptics, exam, next, startedAt],
  );

  const restart = () => {
    resetInputs();
    zaladuj();
  };

  if (stan.stan === 'ladowanie') return <Screen>{null}</Screen>;
  if (stan.stan === 'blad') {
    return (
      <Screen>
        <Muted>{t('postep.odczytNieudany')}</Muted>
        <Button label={t('postep.ponow')} onPress={zaladuj} />
        <Button label={t('session.close')} variant="ghost" onPress={() => router.back()} />
      </Screen>
    );
  }

  if (stan.stan === 'pusta' || items.length === 0) {
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
        <Text style={[styles.score, { color: exam && !passed ? tk.przejsciowe.bad : tk.ink }]}>{`${correct}/${items.length}`}</Text>
        {exam ? (
          <Text style={[styl.tresc, { color: tk.ink }]}>
            {passed ? t('exam.passed', { need: pct(EXAM_PASS) }) : t('exam.failed', { need: pct(EXAM_PASS) })}
          </Text>
        ) : (
          <>
            <Muted>{t('session.avgTime', { s: avg.toFixed(1).replace('.', ',') })}</Muted>
            <Text style={[styl.tresc, { color: tk.ink }]}>{correct === items.length ? t('session.resultPerfect') : t('session.resultRetry')}</Text>
          </>
        )}
        <View style={{ gap: odstep.m }}>
          <Button label={exam ? t('exam.again') : t('session.again')} variant="ghost" onPress={restart} />
          <Button label={t('session.close')} onPress={() => router.back()} />
        </View>
        {exam ? (
          <View style={{ gap: odstep.l }}>
            <Text style={[styl.naglowek, { color: tk.ink }]}>{t('exam.review')}</Text>
            {records.map((r, i) => (
              <View key={r.item.key} style={[styles.reviewItem, { borderColor: gradeColor(tk, r.grade), backgroundColor: tk.surface }]}>
                <Muted>{`${i + 1}. ${gradeLabel(t, r.grade)}`}</Muted>
                {r.item.table ? <TableFelt table={r.item.table} /> : null}
                <RichText text={r.item.prompt} style={[styl.tresc, { fontWeight: '600' }]} />
                <Feedback rec={r} painted={r.answer.kind === 'paint' ? [...r.answer.painted] : undefined} />
              </View>
            ))}
          </View>
        ) : null}
      </Screen>
    );
  }

  return (
    <Screen scrollEnabled={!painting}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
          <Text style={[styl.tresc, { color: tk.link, fontWeight: '600' }]}>{t('session.close')}</Text>
        </Pressable>
        <Muted>{exam ? t('exam.of', { n: idx + 1, total: items.length }) : t('session.of', { n: idx + 1, total: items.length })}</Muted>
      </View>
      <ProgressBar value={(idx + (current ? 1 : 0)) / items.length} />

      {item.table ? <TableFelt table={item.table} /> : null}
      <RichText text={item.prompt} style={[styl.naglowek, { fontWeight: '600' }]} />
      {bladZapisu && bladZapisu !== 'krok_niezgodny' ? (
        <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.alert }]}>{t(bladZapisu === 'brak_miejsca' ? 'session.saveNoSpace' : 'session.saveFailed')}</Text>
      ) : null}

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
        <View style={{ gap: odstep.m }}>
          <PaintGrid painted={painted} onChange={setPainted} onActive={setPainting} />
          <View style={styles.row}>
            <Button label={t('session.clear')} variant="ghost" onPress={() => setPainted(emptyGrid())} style={{ flex: 1 }} />
            <Button label={t('session.check')} onPress={() => commit({ kind: 'paint', painted })} style={{ flex: 1 }} />
          </View>
        </View>
      ) : null}

      {current ? (
        <View style={{ gap: odstep.m }}>
          <Text style={[styl.naglowek, { color: gradeColor(tk, current.grade) }]}>
            {current.answer.kind === 'timeout' ? t('session.timeout') : gradeLabel(t, current.grade)}
          </Text>
          <Feedback rec={current} painted={current.answer.kind === 'paint' ? [...current.answer.painted] : undefined} hideChoices />
          <Button label={idx + 1 < items.length ? t('session.next') : t('session.finish')} onPress={next} />
        </View>
      ) : null}
    </Screen>
  );
}

type Tk = ReturnType<typeof useTokens>;
type TFn = ReturnType<typeof useTranslation>['t'];

function gradeColor(tk: Tk, g: GradeResult): string {
  return g === 'correct' ? tk.przejsciowe.good : g === 'wrong' ? tk.przejsciowe.bad : tk.przejsciowe.warn;
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
    <View style={{ gap: odstep.s }}>
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
                backgroundColor: showRight ? tk.przejsciowe.goodSoft : showWrong ? tk.przejsciowe.badSoft : showSize || showOk ? tk.przejsciowe.warnSoft : tk.surface,
                borderColor: showRight ? tk.przejsciowe.good : showWrong ? tk.przejsciowe.bad : showSize || showOk ? tk.przejsciowe.warn : tk.separator,
                opacity: answered && !showRight && !showWrong && !showSize && !showOk ? 0.75 : pressed ? 0.85 : 1,
              },
            ]}
          >
            {showRight || showWrong || showSize || showOk ? (
              <Text style={[styl.drobny, { color: showRight ? tk.przejsciowe.good : showSize || showOk ? tk.przejsciowe.warn : tk.przejsciowe.bad, fontWeight: '700' }]}>
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
            <RichText text={o.text} style={[styl.tresc, { fontWeight: '600' }]} />
            {answered ? <RichText text={o.why} style={[styl.przypis, { color: tk.muted }]} /> : null}
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
    <View style={{ gap: odstep.m }}>
      <View style={[styles.inputRow, { borderColor: tk.separator, backgroundColor: tk.surface }]}>
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
        {suffix ? <Text style={[styl.naglowek, { color: tk.muted }]}>{suffix}</Text> : null}
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
    <View style={{ gap: odstep.l }}>
      {item.axes.map((a, ai) => (
        <View key={a.axis} style={{ gap: odstep.xs }}>
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
                    { backgroundColor: tk.surface, borderColor: on ? tk.ink : tk.separator, borderWidth: on ? 2.5 : 1.5, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <Text style={[styl.przypis, { color: tk.ink, fontWeight: on ? '700' : '500', textAlign: 'center' }]}>{o.text}</Text>
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
    <View style={{ gap: odstep.l }}>
      {item.axes.map((a, ai) => (
        <View key={a.axis} style={{ gap: odstep.xs }}>
          <Text style={[styl.drobny, { color: tk.muted, fontWeight: '700' }]}>{a.label}</Text>
          {a.options.map((o, oi) => {
            const picked = picks[ai] === oi;
            const k = tone(o, picked);
            return (
              <View
                key={o.text}
                style={[
                  styles.texOption,
                  {
                    backgroundColor: k === 'good' ? tk.przejsciowe.goodSoft : k === 'bad' ? tk.przejsciowe.badSoft : tk.surface,
                    borderColor: k === 'good' ? tk.przejsciowe.good : k === 'bad' ? tk.przejsciowe.bad : tk.separator,
                  },
                ]}
              >
                <Text style={[styl.tresc, { color: tk.ink, fontWeight: '600' }]}>
                  {o.text}
                  {picked ? <Text style={[styl.drobny, { color: o.correct ? tk.przejsciowe.good : tk.przejsciowe.bad }]}>{`  ${t('session.yourAnswer')}`}</Text> : null}
                </Text>
                <RichText text={o.why} style={[styl.przypis, { color: tk.muted }]} />
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
    <View style={{ gap: odstep.m }}>
      {item.kind === 'choice' && !hideChoices ? (
        <ChoiceOptions item={item} picked={answer.kind === 'choice' ? answer.index : -1} readOnly />
      ) : null}
      {item.kind === 'numeric' ? <NumericFeedback item={item} answer={answer} /> : null}
      {item.kind === 'paint' ? <PaintFeedback item={item} painted={painted ?? emptyGrid()} /> : null}
      {item.kind === 'texture' ? <TextureFeedback item={item} picks={answer.kind === 'texture' ? answer.picks : []} /> : null}
      {item.explanation ? (
        <View style={[styles.explain, { backgroundColor: tk.przejsciowe.feltSoft }]}>
          <RichText text={item.explanation} style={styl.przypis} />
        </View>
      ) : null}
    </View>
  );
}

function NumericFeedback({ item, answer }: { item: NumericInstance; answer: DrillAnswer }) {
  const tk = useTokens();
  const given = answer.kind === 'numeric' ? answer.value : null;
  return (
    <View style={{ gap: odstep.xs }}>
      {given !== null ? <Text style={[styl.tresc, { color: tk.ink }]}>{dt.numeric.yours(fmtNum(given, item.unit))}</Text> : null}
      <Text style={[styl.tresc, { color: tk.ink, fontWeight: '700' }]}>{dt.numeric.exact(item.display)}</Text>
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
    <View style={{ gap: odstep.s }}>
      <Text style={[styl.tresc, { color: tk.ink, fontWeight: '700' }]}>{dt.paint.score(s.score, PAINT_PASS)}</Text>
      <PaintGrid painted={painted} result={s.cells} />
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', gap: odstep.m },
  option: { borderWidth: 1.5, borderRadius: promien.przycisk, padding: odstep.l, gap: odstep.xs },
  explain: { borderRadius: promien.przycisk, padding: odstep.l },
  reviewItem: { borderWidth: 1.5, borderRadius: promien.przycisk, padding: odstep.l, gap: odstep.s },
  segments: { flexDirection: 'row', gap: odstep.s },
  segment: { flex: 1, minHeight: 44, justifyContent: 'center', borderWidth: 1.5, borderRadius: promien.przycisk, paddingHorizontal: odstep.s, paddingVertical: odstep.m },
  texOption: { borderWidth: 1.5, borderRadius: promien.przycisk, padding: odstep.m, gap: odstep.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: promien.przycisk, paddingHorizontal: odstep.l, gap: odstep.s },
  input: { flex: 1, fontSize: 28, fontWeight: '700', paddingVertical: odstep.m, fontVariant: ['tabular-nums'] },
  score: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
