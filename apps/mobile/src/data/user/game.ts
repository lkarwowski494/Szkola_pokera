import type { Finding, GameSituation, HandPreset, PlayerAction, TableConfig } from '@szkola/poker-core';
import {
  cardsToIntroduce,
  familiesToRecall,
  GAME_CARDS,
  gameCardId,
  gameOutcome,
  newCard,
  newCardCandidates,
  review as fsrsReview,
  type StoredCard,
} from '@szkola/srs';
import { and, asc, eq, gte, inArray, isNotNull, isNull, like, lte, notLike, sql } from 'drizzle-orm';
import type { UserDb } from './db';
import { advancementHistory, gameCards, gameFindings, gameHands, gameSessions, reviewCards, reviewLogs } from './schema';

/**
 * Dane trybu gry M13 (dokument 14, 4.4.6): sesje, rozdania, werdykty, karty z błędów i historia wskaźnika.
 * Decyzje (które karty, limit dzienny, reguła „3 razy”) zapadają w @szkola/srs (game.ts); tu tylko zapis i odczyt.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

export interface GameSessionInput {
  mode: 'free' | 'area';
  areaModule: string | null;
  handsPlanned: number;
  tablePreset: string;
  seatStyles: readonly string[];
  players: number;
  stackBb: number;
  timeLimitS: 15 | 30 | null;
  botVersion: number;
  contentHash: string;
  seed: number;
}

export function createGameSession(db: UserDb, s: GameSessionInput, now = Date.now()): number {
  const row = db
    .insert(gameSessions)
    .values({ ...s, seatStyles: JSON.stringify(s.seatStyles), startedAt: now })
    .returning({ id: gameSessions.id })
    .get();
  return row.id;
}

export interface GameHandInput {
  handNo: number;
  seed: number;
  config: TableConfig;
  preset: HandPreset | null;
  actions: readonly { seat: number; action: PlayerAction }[];
  heroSeat: number;
  timeouts: readonly number[];
  resultBb: number;
}

/** Klucz konfiguracji stołu do wskaźnika (4.8): liczba graczy i głębokość stacków. */
export function configKey(players: number, stackBb: number): string {
  return `${players}-${stackBb}`;
}

/**
 * Zapis rozegranego rozdania i werdyktów jego decyzji w jednej transakcji. Werdykty z kartą (błąd, niedokładność,
 * przekroczony czas) trafiają do kolejki kart, bez duplikatów (4.4.5). Zwraca identyfikator rozdania.
 */
export function saveGameHand(
  db: UserDb,
  sessionId: number,
  hand: GameHandInput,
  findings: readonly Finding[],
  situations: ReadonlyMap<number, GameSituation>,
  meta: { contentHash: string; stackBb: number },
  now = Date.now(),
): number {
  return db.transaction((tx) => {
    const { id: handId } = tx
      .insert(gameHands)
      .values({
        sessionId,
        handNo: hand.handNo,
        seed: hand.seed,
        config: JSON.stringify(hand.config),
        preset: hand.preset ? JSON.stringify(hand.preset) : null,
        actions: JSON.stringify(hand.actions),
        heroSeat: hand.heroSeat,
        timeouts: JSON.stringify(hand.timeouts),
        resultBb: hand.resultBb,
        playedAt: now,
      })
      .returning({ id: gameHands.id })
      .get();
    const ck = configKey(hand.config.stacks.length, meta.stackBb);
    const ids = new Map<number, number>();
    for (const f of findings) {
      const { id } = tx
        .insert(gameFindings)
        .values({
          sessionId,
          handId,
          actionIndex: f.index,
          street: f.street,
          position: f.position,
          verdict: f.verdict,
          ruleId: f.ruleId,
          level: f.level,
          module: f.module,
          family: f.family,
          dedupeKey: f.dedupeKey,
          detail: f.detail ? JSON.stringify(f.detail) : null,
          configKey: ck,
          contentHash: meta.contentHash,
          decidedAt: now,
        })
        .returning({ id: gameFindings.id })
        .get();
      ids.set(f.index, id);
    }
    const existing = new Set(
      tx
        .select({ k: gameCards.dedupeKey })
        .from(gameCards)
        .where(inArray(gameCards.dedupeKey, findings.map((f) => f.dedupeKey).concat('')))
        .all()
        .map((r) => r.k),
    );
    for (const f of newCardCandidates(findings, existing)) {
      const situation = situations.get(f.index);
      if (!situation) throw new Error(`saveGameHand: brak sytuacji dla decyzji ${f.index}`);
      tx.insert(gameCards)
        .values({
          cardId: gameCardId(f.dedupeKey),
          dedupeKey: f.dedupeKey,
          situation: JSON.stringify(situation),
          ruleId: f.ruleId,
          family: f.family,
          findingId: ids.get(f.index)!,
          createdAt: now,
        })
        .onConflictDoNothing()
        .run();
    }
    tx.update(gameSessions)
      .set({ handsPlayed: sql`${gameSessions.handsPlayed} + 1`, resultBb: sql`coalesce(${gameSessions.resultBb}, 0) + ${hand.resultBb}` })
      .where(eq(gameSessions.id, sessionId))
      .run();
    return handId;
  });
}

export function endGameSession(db: UserDb, sessionId: number, now = Date.now()): void {
  db.update(gameSessions).set({ endedAt: now }).where(eq(gameSessions.id, sessionId)).run();
}

/** Początek dnia w czasie lokalnym. */
export function dayStart(now: number): number {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Nowe karty wprowadzone dziś: rodziny zadań z pierwszą odpowiedzią dziś i karty z gry wprowadzone dziś (6.4 A). */
export function newCardsToday(db: UserDb, now = Date.now()): number {
  const from = dayStart(now);
  const lessons = db
    .select({ f: reviewLogs.familyId })
    .from(reviewLogs)
    .where(notLike(reviewLogs.familyId, `${GAME_CARDS.prefix}%`))
    .groupBy(reviewLogs.familyId)
    .having(gte(sql`min(${reviewLogs.reviewedAt})`, from))
    .all().length;
  const games = db
    .select({ id: gameCards.cardId })
    .from(gameCards)
    .where(and(gte(gameCards.introducedAt, from), lte(gameCards.introducedAt, now)))
    .all().length;
  return lessons + games;
}

/**
 * Wprowadza do powtórek karty z kolejki (najstarsze pierwsze) w granicach dziennego limitu i przywraca rodziny
 * z reguły „3 razy” (5.7). Wywoływane po sesji i przy otwarciu powtórek. Zwraca liczbę wprowadzonych kart.
 */
export function introduceGameCards(db: UserDb, now = Date.now()): { introduced: number; recalled: string[] } {
  return db.transaction((tx) => {
    const queued = tx
      .select({ cardId: gameCards.cardId })
      .from(gameCards)
      .where(and(isNull(gameCards.introducedAt), isNull(gameCards.retiredAt)))
      .orderBy(asc(gameCards.createdAt))
      .all();
    const n = cardsToIntroduce(queued.length, newCardsToday(tx as unknown as UserDb, now));
    for (const { cardId } of queued.slice(0, n)) {
      tx.insert(reviewCards).values(newCard(cardId, now)).onConflictDoNothing().run();
      tx.update(gameCards).set({ introducedAt: now }).where(eq(gameCards.cardId, cardId)).run();
    }
    const from = now - GAME_CARDS.recallWindowDays * DAY_MS;
    const recent = tx
      .select({ family: gameFindings.family, verdict: gameFindings.verdict, decidedAt: gameFindings.decidedAt })
      .from(gameFindings)
      .where(and(gte(gameFindings.decidedAt, from), isNotNull(gameFindings.family)))
      .all();
    const recalled = familiesToRecall(recent, now);
    for (const family of recalled) {
      const card = tx.select().from(reviewCards).where(eq(reviewCards.familyId, family)).get();
      // rodzina wraca do powtórek: termin teraz (karta z zadań) albo nowa karta, jeśli rodziny jeszcze nie ćwiczono
      if (card) {
        if (card.due > now) tx.update(reviewCards).set({ due: now }).where(eq(reviewCards.familyId, family)).run();
      } else tx.insert(reviewCards).values(newCard(family, now)).run();
    }
    return { introduced: n, recalled };
  });
}

/** Karty z gry do powtórki teraz (aktywne, niewycofane), od najbardziej zaległej. */
export function dueGameCards(db: UserDb, now = Date.now(), limit = 50): { card: StoredCard; situation: GameSituation; ruleId: string | null }[] {
  return db
    .select({ card: reviewCards, situation: gameCards.situation, ruleId: gameCards.ruleId })
    .from(reviewCards)
    .innerJoin(gameCards, eq(gameCards.cardId, reviewCards.familyId))
    .where(and(like(reviewCards.familyId, `${GAME_CARDS.prefix}%`), lte(reviewCards.due, now), isNull(gameCards.retiredAt)))
    .orderBy(asc(reviewCards.due))
    .limit(limit)
    .all()
    .map((r) => ({ card: r.card, situation: JSON.parse(r.situation) as GameSituation, ruleId: r.ruleId }));
}

/**
 * Zapis powtórki karty z gry: werdykt ponownej decyzji → FSRS jak w zadaniach, log ze źródłem „game” (6.1 A).
 * Decyzja bez oceny (reguła zmieniła się po aktualizacji treści) wycofuje kartę (6.5 A). Zwraca nowy stan albo null.
 */
export function recordGameReview(db: UserDb, cardId: string, verdict: string, elapsedMs: number, now = Date.now()): StoredCard | null {
  return db.transaction((tx) => {
    const outcome = gameOutcome(verdict, elapsedMs);
    if (!outcome) {
      tx.update(gameCards).set({ retiredAt: now }).where(eq(gameCards.cardId, cardId)).run();
      return null;
    }
    const card = tx.select().from(reviewCards).where(eq(reviewCards.familyId, cardId)).get() ?? newCard(cardId, now);
    const { card: next, log } = fsrsReview(card, outcome, now);
    tx.insert(reviewCards).values(next).onConflictDoUpdate({ target: reviewCards.familyId, set: { ...next } }).run();
    tx.insert(reviewLogs).values({ ...log, source: 'game' }).run();
    return next;
  });
}

/** Werdykty do części „gra” wskaźnika: ostatnie decyzje obszaru w danej konfiguracji, od najnowszych (4.8). */
export function recentGameVerdicts(db: UserDb, module: string, config: string, limit: number): string[] {
  return db
    .select({ v: gameFindings.verdict })
    .from(gameFindings)
    .where(and(eq(gameFindings.module, module), eq(gameFindings.configKey, config), inArray(gameFindings.verdict, ['compliant', 'compliant-exploit', 'acceptable', 'inaccuracy', 'mistake'])))
    .orderBy(sql`${gameFindings.decidedAt} desc, ${gameFindings.id} desc`)
    .limit(limit)
    .all()
    .map((r) => r.v);
}

export interface AdvancementHistoryRow {
  area: string;
  knowledge: number | null;
  game: number | null;
  combined: number | null;
  gameDecisions: number;
}

/** Dzień RRRR-MM-DD w czasie lokalnym. */
export function localDay(now: number): string {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Zapis historii wskaźnika: jeden wiersz na dzień i obszar, nadpisywany w ciągu dnia (4.8). */
export function saveAdvancementHistory(db: UserDb, rows: readonly AdvancementHistoryRow[], now = Date.now()): void {
  const day = localDay(now);
  db.transaction((tx) => {
    for (const r of rows) {
      tx.insert(advancementHistory)
        .values({ day, ...r, updatedAt: now })
        .onConflictDoUpdate({ target: [advancementHistory.day, advancementHistory.area], set: { ...r, updatedAt: now } })
        .run();
    }
  });
}

export function advancementHistoryFor(db: UserDb, area: string): (AdvancementHistoryRow & { day: string })[] {
  return db.select().from(advancementHistory).where(eq(advancementHistory.area, area)).orderBy(asc(advancementHistory.day)).all();
}

export function gameSessionsList(db: UserDb, limit = 20) {
  return db.select().from(gameSessions).orderBy(sql`${gameSessions.startedAt} desc`).limit(limit).all();
}

export function gameFindingsForSession(db: UserDb, sessionId: number) {
  return db.select().from(gameFindings).where(eq(gameFindings.sessionId, sessionId)).orderBy(asc(gameFindings.id)).all();
}

/** Liczba decyzji sesji: wszystkie i ocenione (bez „bez oceny”), do nagłówka raportu „Oceniono X z Y”. */
export function gameVerdictCounts(db: UserDb, sessionId: number): { all: number; rated: number } {
  const rows = db.select({ v: gameFindings.verdict }).from(gameFindings).where(eq(gameFindings.sessionId, sessionId)).all();
  return { all: rows.length, rated: rows.filter((r) => r.v !== 'unrated').length };
}

export function gameSession(db: UserDb, id: number) {
  return db.select().from(gameSessions).where(eq(gameSessions.id, id)).get() ?? null;
}

export function gameHandsForSession(db: UserDb, sessionId: number) {
  return db.select().from(gameHands).where(eq(gameHands.sessionId, sessionId)).orderBy(asc(gameHands.handNo)).all();
}

/** Liczba kart z gry do powtórki teraz (wprowadzonych, niewycofanych). */
export function dueGameCardCount(db: UserDb, now = Date.now()): number {
  return db
    .select({ id: reviewCards.familyId })
    .from(reviewCards)
    .innerJoin(gameCards, eq(gameCards.cardId, reviewCards.familyId))
    .where(and(lte(reviewCards.due, now), isNull(gameCards.retiredAt)))
    .all().length;
}

/** Ile kart powstało z danej sesji (do raportu). */
export function gameCardsFromSession(db: UserDb, sessionId: number): number {
  return db
    .select({ id: gameCards.cardId })
    .from(gameCards)
    .innerJoin(gameFindings, eq(gameFindings.id, gameCards.findingId))
    .where(eq(gameFindings.sessionId, sessionId))
    .all().length;
}
