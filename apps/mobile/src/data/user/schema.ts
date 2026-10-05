import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Baza użytkownika (user.db). Odwołuje się do treści wyłącznie stabilnymi
 * identyfikatorami tekstowymi (lekcja, zadanie, rodzina spotów), bez kluczy obcych do content.db.
 */

export const lessonProgress = sqliteTable('lesson_progress', {
  lessonId: text('lesson_id').primaryKey(),
  /** Najlepszy wynik w ćwiczeniach lekcji (liczba poprawnych). */
  bestCorrect: integer('best_correct').notNull().default(0),
  total: integer('total').notNull().default(0),
  theorySeen: integer('theory_seen', { mode: 'boolean' }).notNull().default(false),
  completedAt: integer('completed_at'),
  updatedAt: integer('updated_at').notNull(),
});

export const answers = sqliteTable(
  'answers',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    drillId: text('drill_id').notNull(),
    family: text('family').notNull(),
    lessonId: text('lesson_id'),
    /** lesson | review | speed | exam */
    mode: text('mode').notNull(),
    correct: integer('correct', { mode: 'boolean' }).notNull(),
    /** correct | acceptable | close | size | wrong (od wersji 0001; acceptable od ADR-26; starsze wiersze: null, wtedy liczy się tylko correct). */
    grade: text('grade'),
    elapsedMs: integer('elapsed_ms').notNull(),
    answeredAt: integer('answered_at').notNull(),
  },
  (t) => [index('answers_family').on(t.family), index('answers_answered_at').on(t.answeredAt)],
);

export const reviewCards = sqliteTable('review_cards', {
  familyId: text('family_id').primaryKey(),
  due: integer('due').notNull(),
  stability: real('stability').notNull(),
  difficulty: real('difficulty').notNull(),
  scheduledDays: real('scheduled_days').notNull(),
  learningSteps: integer('learning_steps').notNull(),
  reps: integer('reps').notNull(),
  lapses: integer('lapses').notNull(),
  state: integer('state').notNull(),
  lastReview: integer('last_review'),
});

/** Każda powtórka zapisana osobno, żeby później dostroić parametry FSRS (ADR-05). */
export const reviewLogs = sqliteTable('review_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  familyId: text('family_id').notNull(),
  rating: integer('rating').notNull(),
  reviewedAt: integer('reviewed_at').notNull(),
  elapsedMs: integer('elapsed_ms').notNull(),
  correct: integer('correct', { mode: 'boolean' }).notNull(),
  stateBefore: integer('state_before').notNull(),
  dueBefore: integer('due_before').notNull(),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});

/** Wyniki egzaminów modułów (FR-10, B-023). Każde podejście osobno. */
export const examResults = sqliteTable(
  'exam_results',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    moduleId: text('module_id').notNull(),
    correct: integer('correct').notNull(),
    total: integer('total').notNull(),
    passed: integer('passed', { mode: 'boolean' }).notNull(),
    takenAt: integer('taken_at').notNull(),
  },
  (t) => [index('exam_results_module').on(t.moduleId)],
);
