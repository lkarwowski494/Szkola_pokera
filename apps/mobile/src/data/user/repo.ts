import { review as fsrsReview, newCard, type Outcome, type StoredCard } from '@szkola/srs';
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm';
import type { UserDb } from './db';
import { answers, lessonProgress, reviewCards, reviewLogs, settings } from './schema';

export type AnswerMode = 'lesson' | 'review' | 'speed';

export interface AnswerInput {
  drillId: string;
  family: string;
  lessonId: string | null;
  mode: AnswerMode;
  correct: boolean;
  elapsedMs: number;
}

/**
 * Zapis odpowiedzi + aktualizacja karty FSRS rodziny w jednej transakcji.
 * Pierwsza odpowiedź z danej rodziny zakłada kartę (rodzina trafia do powtórek).
 */
export function recordAnswer(db: UserDb, a: AnswerInput, now = Date.now()): StoredCard {
  return db.transaction((tx) => {
    tx.insert(answers).values({ ...a, answeredAt: now }).run();
    const existing = tx.select().from(reviewCards).where(eq(reviewCards.familyId, a.family)).get();
    const card: StoredCard = existing ?? newCard(a.family, now);
    const outcome: Outcome = { correct: a.correct, elapsedMs: a.elapsedMs };
    const { card: next, log } = fsrsReview(card, outcome, now);
    tx.insert(reviewCards)
      .values(next)
      .onConflictDoUpdate({ target: reviewCards.familyId, set: { ...next } })
      .run();
    tx.insert(reviewLogs).values(log).run();
    return next;
  });
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

export function markTheorySeen(db: UserDb, lessonId: string, now = Date.now()): void {
  db.insert(lessonProgress)
    .values({ lessonId, theorySeen: true, updatedAt: now })
    .onConflictDoUpdate({ target: lessonProgress.lessonId, set: { theorySeen: true, updatedAt: now } })
    .run();
}

export function dueFamilies(db: UserDb, now = Date.now()): StoredCard[] {
  return db.select().from(reviewCards).where(lte(reviewCards.due, now)).orderBy(reviewCards.due).all();
}

export function nextDue(db: UserDb, now = Date.now()): number | null {
  const row = db.select({ due: reviewCards.due }).from(reviewCards).where(gte(reviewCards.due, now)).orderBy(reviewCards.due).limit(1).get();
  return row?.due ?? null;
}

export function allFamilies(db: UserDb): string[] {
  return db.select({ id: reviewCards.familyId }).from(reviewCards).all().map((r) => r.id);
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
  });
}

export function answerCountSince(db: UserDb, since: number): number {
  return db.select({ n: sql<number>`count(*)` }).from(answers).where(and(gte(answers.answeredAt, since))).get()?.n ?? 0;
}
