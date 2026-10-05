import { index, integer, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
  /** Źródło powtórki: null (zadania, wiersze sprzed 0002) albo "game" (karta z błędu w grze, 6.1 A). */
  source: text('source'),
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

// ---------- Tryb gry M13 (dokument 14, 4.4.6; migracja 0002) ----------

/** Sesja gry: ustawienia i wersje potrzebne do odtworzenia i przeliczenia werdyktów (6.5 A). */
export const gameSessions = sqliteTable(
  'game_sessions',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    /** free | area */
    mode: text('mode').notNull(),
    /** Moduł obszaru (np. "m5") albo null w grze swobodnej. */
    areaModule: text('area_module'),
    handsPlanned: integer('hands_planned').notNull(),
    handsPlayed: integer('hands_played').notNull().default(0),
    /** Gotowy zestaw stołu (BOT_POLICY.tables) albo "custom". */
    tablePreset: text('table_preset').notNull(),
    /** Style rywali w kolejności miejsc (JSON string[]). */
    seatStyles: text('seat_styles').notNull(),
    players: integer('players').notNull(),
    stackBb: real('stack_bb').notNull(),
    /** Limit czasu na decyzję w sekundach (15 albo 30) albo null, gdy wyłączony (5.11). */
    timeLimitS: integer('time_limit_s'),
    botVersion: integer('bot_version').notNull(),
    contentHash: text('content_hash').notNull(),
    seed: integer('seed').notNull(),
    startedAt: integer('started_at').notNull(),
    endedAt: integer('ended_at'),
    /** Wynik w bb (drugorzędny, z dopiskiem o wariancji, 5.8). */
    resultBb: real('result_bb'),
  },
  (t) => [index('game_sessions_started').on(t.startedAt)],
);

/** Rozdanie: pełny przebieg jako dane (konfiguracja, ziarno, karty, akcje), więc da się je odtworzyć. */
export const gameHands = sqliteTable(
  'game_hands',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sessionId: integer('session_id').notNull(),
    handNo: integer('hand_no').notNull(),
    seed: integer('seed').notNull(),
    /** TableConfig (JSON). */
    config: text('config').notNull(),
    /** HandPreset (JSON) albo null. */
    preset: text('preset'),
    /** Akcje { seat, action }[] (JSON). */
    actions: text('actions').notNull(),
    heroSeat: integer('hero_seat').notNull(),
    /** Indeksy akcji wykonanych automatycznie po przekroczeniu czasu (JSON number[]). */
    timeouts: text('timeouts').notNull().default('[]'),
    resultBb: real('result_bb').notNull(),
    playedAt: integer('played_at').notNull(),
  },
  (t) => [index('game_hands_session').on(t.sessionId)],
);

/** Werdykt decyzji gracza (grading.ts). Przeliczany po zmianie treści (6.5 A). */
export const gameFindings = sqliteTable(
  'game_findings',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sessionId: integer('session_id').notNull(),
    handId: integer('hand_id').notNull(),
    actionIndex: integer('action_index').notNull(),
    street: text('street').notNull(),
    position: text('position').notNull(),
    /** compliant | compliant-exploit | acceptable | inaccuracy | mistake | unrated | timeout */
    verdict: text('verdict').notNull(),
    ruleId: text('rule_id'),
    level: text('level'),
    module: text('module'),
    family: text('family'),
    dedupeKey: text('dedupe_key').notNull(),
    /** GradeDetail (JSON) albo null. */
    detail: text('detail'),
    /** Konfiguracja stołu do wskaźnika (np. "6-100"): liczba graczy i głębokość, 4.8. */
    configKey: text('config_key').notNull(),
    contentHash: text('content_hash').notNull(),
    decidedAt: integer('decided_at').notNull(),
  },
  (t) => [index('game_findings_session').on(t.sessionId), index('game_findings_module').on(t.module, t.configKey, t.decidedAt)],
);

/**
 * Karta z błędu: ta sama sytuacja do ponownej decyzji (4.4.5). Stan FSRS w review_cards pod identyfikatorem cardId
 * (przestrzeń nazw "game:", 6.1 A). Karta czeka w kolejce (introducedAt null), gdy dzienny limit nowych kart jest
 * wyczerpany (6.4 A); retiredAt, gdy po zmianie treści błąd zniknął (6.5 A).
 */
export const gameCards = sqliteTable(
  'game_cards',
  {
    cardId: text('card_id').primaryKey(),
    dedupeKey: text('dedupe_key').notNull().unique(),
    /** GameSituation (JSON): konfiguracja, ziarno, karty, akcje do decyzji, miejsce gracza. */
    situation: text('situation').notNull(),
    ruleId: text('rule_id'),
    family: text('family'),
    findingId: integer('finding_id').notNull(),
    createdAt: integer('created_at').notNull(),
    introducedAt: integer('introduced_at'),
    retiredAt: integer('retired_at'),
  },
  (t) => [index('game_cards_introduced').on(t.introducedAt)],
);

/** Historia wskaźnika zaawansowania: jeden wiersz na dzień i obszar ("all" = ogółem), nadpisywany w ciągu dnia (4.8). */
export const advancementHistory = sqliteTable(
  'advancement_history',
  {
    /** Dzień w czasie lokalnym, RRRR-MM-DD. */
    day: text('day').notNull(),
    area: text('area').notNull(),
    knowledge: real('knowledge'),
    game: real('game'),
    combined: real('combined'),
    gameDecisions: integer('game_decisions').notNull().default(0),
    updatedAt: integer('updated_at').notNull(),
  },
  (t) => [primaryKey({ columns: [t.day, t.area] })],
);
