import { GAME_CARDS, review as fsrsReview, newCard, type Outcome, type StoredCard } from '@szkola/srs';
import { and, desc, eq, gte, lte, notLike, sql } from 'drizzle-orm';
import type { UserDb } from './db';
import { advancementHistory, answers, examResults, gameCards, gameFindings, gameHands, gameSessions, lessonProgress, reviewCards, reviewLogs, settings } from './schema';

export type AnswerMode = 'lesson' | 'review' | 'speed' | 'exam';
export type AnswerGrade = 'correct' | 'acceptable' | 'close' | 'size' | 'wrong';

export interface AnswerInput {
  drillId: string;
  family: string;
  lessonId: string | null;
  mode: AnswerMode;
  grade: AnswerGrade;
  elapsedMs: number;
  /** Zadanie bez presji czasu (malowanie zakresu): czas nie obniża oceny FSRS. */
  untimed?: boolean;
}

/**
 * Zapis odpowiedzi + aktualizacja karty FSRS rodziny w jednej transakcji.
 * Pierwsza odpowiedź z danej rodziny zakłada kartę (rodzina trafia do powtórek).
 * „Dopuszczalna” (ADR-26) zalicza (answers.correct = true), a w FSRS daje Hard.
 */
export function recordAnswer(db: UserDb, a: AnswerInput, now = Date.now()): StoredCard {
  return db.transaction((tx) => {
    const correct = a.grade === 'correct' || a.grade === 'acceptable';
    const { untimed, ...row } = a;
    tx.insert(answers).values({ ...row, correct, answeredAt: now }).run();
    const existing = tx.select().from(reviewCards).where(eq(reviewCards.familyId, a.family)).get();
    const card: StoredCard = existing ?? newCard(a.family, now);
    const outcome: Outcome = {
      correct,
      ...(a.grade === 'close' ? { close: true } : {}),
      ...(a.grade === 'acceptable' ? { acceptable: true } : {}),
      ...(untimed ? { untimed: true } : {}),
      elapsedMs: a.elapsedMs,
    };
    const { card: next, log } = fsrsReview(card, outcome, now);
    tx.insert(reviewCards)
      .values(next)
      .onConflictDoUpdate({ target: reviewCards.familyId, set: { ...next } })
      .run();
    tx.insert(reviewLogs).values(log).run();
    return next;
  });
}

/** Identyfikatory zadań, na które użytkownik odpowiadał na egzaminie (pula egzaminacyjna: „już widziane”). */
export function examDrillIdsSeen(db: UserDb): Set<string> {
  return new Set(
    db
      .selectDistinct({ id: answers.drillId })
      .from(answers)
      .where(eq(answers.mode, 'exam'))
      .all()
      .map((r) => r.id),
  );
}

export function saveLessonResult(db: UserDb, lessonId: string, correct: number, total: number, now = Date.now()): void {
  const prev = db.select().from(lessonProgress).where(eq(lessonProgress.lessonId, lessonId)).get();
  const best = Math.max(prev?.bestCorrect ?? 0, correct);
  const completedAt = prev?.completedAt ?? (correct === total ? now : null);
  db.insert(lessonProgress)
    .values({ lessonId, bestCorrect: best, total, theorySeen: true, completedAt, updatedAt: now })
    .onConflictDoUpdate({ target: lessonProgress.lessonId, set: { bestCorrect: best, total, completedAt, updatedAt: now } })
    .run();
}

export function saveExamResult(db: UserDb, moduleId: string, correct: number, total: number, passed: boolean, now = Date.now()): void {
  db.insert(examResults).values({ moduleId, correct, total, passed, takenAt: now }).run();
}

export interface ExamSummary {
  best: number;
  total: number;
  passed: boolean;
  attempts: number;
}

/** Najlepszy wynik egzaminu w każdym module. */
export function examSummaryMap(db: UserDb): Map<string, ExamSummary> {
  const out = new Map<string, ExamSummary>();
  for (const r of db.select().from(examResults).all()) {
    const prev = out.get(r.moduleId);
    const better = !prev || r.correct / r.total > prev.best / prev.total;
    out.set(r.moduleId, {
      best: better ? r.correct : prev.best,
      total: better ? r.total : prev.total,
      passed: (prev?.passed ?? false) || r.passed,
      attempts: (prev?.attempts ?? 0) + 1,
    });
  }
  return out;
}

export function markTheorySeen(db: UserDb, lessonId: string, now = Date.now()): void {
  db.insert(lessonProgress)
    .values({ lessonId, theorySeen: true, updatedAt: now })
    .onConflictDoUpdate({ target: lessonProgress.lessonId, set: { theorySeen: true, updatedAt: now } })
    .run();
}

/** Karty rodzin zadań (bez kart z gry M13, które mają własną kolejkę sytuacji, przestrzeń nazw „game:”). */
const familyCardsOnly = notLike(reviewCards.familyId, `${GAME_CARDS.prefix}%`);

export function dueFamilies(db: UserDb, now = Date.now()): StoredCard[] {
  return db.select().from(reviewCards).where(and(lte(reviewCards.due, now), familyCardsOnly)).orderBy(reviewCards.due).all();
}

export function nextDue(db: UserDb, now = Date.now()): number | null {
  const row = db
    .select({ due: reviewCards.due })
    .from(reviewCards)
    .where(and(gte(reviewCards.due, now), familyCardsOnly))
    .orderBy(reviewCards.due)
    .limit(1)
    .get();
  return row?.due ?? null;
}

/** Wszystkie karty FSRS (do wskaźnika zaawansowania). */
export function allCards(db: UserDb): StoredCard[] {
  return db.select().from(reviewCards).all();
}

export function allFamilies(db: UserDb): string[] {
  return db.select({ id: reviewCards.familyId }).from(reviewCards).where(familyCardsOnly).all().map((r) => r.id);
}

export interface FamilyStat {
  family: string;
  total: number;
  correct: number;
}

export function familyStats(db: UserDb): FamilyStat[] {
  return db
    .select({
      family: answers.family,
      total: sql<number>`count(*)`,
      correct: sql<number>`sum(case when ${answers.correct} then 1 else 0 end)`,
    })
    .from(answers)
    .groupBy(answers.family)
    .all();
}

/** Liczba kolejnych dni (do dziś lub wczoraj) z co najmniej jedną odpowiedzią. */
export function streakDays(db: UserDb, now = Date.now()): number {
  const rows = db
    .select({ day: sql<string>`date(${answers.answeredAt} / 1000, 'unixepoch', 'localtime')` })
    .from(answers)
    .groupBy(sql`1`)
    .orderBy(desc(sql`1`))
    .all();
  const days = new Set(rows.map((r) => r.day));
  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const cursor = new Date(now);
  if (!days.has(fmt(cursor))) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (days.has(fmt(cursor))) {
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function lessonProgressMap(db: UserDb): Map<string, { bestCorrect: number; total: number; done: boolean }> {
  const out = new Map<string, { bestCorrect: number; total: number; done: boolean }>();
  for (const r of db.select().from(lessonProgress).all()) {
    out.set(r.lessonId, { bestCorrect: r.bestCorrect, total: r.total, done: r.completedAt !== null });
  }
  return out;
}

export function getSetting(db: UserDb, key: string): string | null {
  return db.select().from(settings).where(eq(settings.key, key)).get()?.value ?? null;
}

export function setSetting(db: UserDb, key: string, value: string): void {
  db.insert(settings).values({ key, value }).onConflictDoUpdate({ target: settings.key, set: { value } }).run();
}

export function resetProgress(db: UserDb): void {
  db.transaction((tx) => {
    tx.delete(answers).run();
    tx.delete(reviewCards).run();
    tx.delete(reviewLogs).run();
    tx.delete(lessonProgress).run();
    tx.delete(examResults).run();
    tx.delete(gameCards).run();
    tx.delete(gameFindings).run();
    tx.delete(gameHands).run();
    tx.delete(gameSessions).run();
    tx.delete(advancementHistory).run();
  });
}

export function answerCountSince(db: UserDb, since: number): number {
  return db.select({ n: sql<number>`count(*)` }).from(answers).where(and(gte(answers.answeredAt, since))).get()?.n ?? 0;
}
