import { createEmptyCard, fsrs, Rating, type Card, type Grade } from 'ts-fsrs';

/**
 * Powtórki w odstępach (ADR-05): FSRS na poziomie RODZINY spotów.
 * Jedna karta FSRS = jedna rodzina (np. "m2.outs.flush"); każda powtórka losuje nowe rozdanie.
 * Stan zapisujemy jako zwykły JSON (daty jako ms), żeby trzymać go w SQLite.
 */

export interface StoredCard {
  familyId: string;
  due: number;
  stability: number;
  difficulty: number;
  scheduledDays: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  state: number;
  lastReview: number | null;
}

export interface ReviewLogRow {
  familyId: string;
  rating: number;
  reviewedAt: number;
  elapsedMs: number;
  correct: boolean;
  stateBefore: number;
  dueBefore: number;
}

export interface Outcome {
  correct: boolean;
  /** Czas decyzji w milisekundach. */
  elapsedMs: number;
}

/** Progi czasu decyzji. Wartości domyślne to założenia do kalibracji (dokument 09, otwarte pytania). */
export interface SpeedThresholds {
  fastMs: number;
  slowMs: number;
}

export const DEFAULT_THRESHOLDS: SpeedThresholds = { fastMs: 3000, slowMs: 8000 };

/** Wynik zadania → ocena FSRS. Błąd = Again; dobrze i wolno = Hard; dobrze = Good; dobrze i szybko = Easy. */
export function outcomeToRating(outcome: Outcome, t: SpeedThresholds = DEFAULT_THRESHOLDS): Grade {
  if (!outcome.correct) return Rating.Again;
  if (outcome.elapsedMs >= t.slowMs) return Rating.Hard;
  if (outcome.elapsedMs <= t.fastMs) return Rating.Easy;
  return Rating.Good;
}

const scheduler = fsrs({ request_retention: 0.9, enable_fuzz: false });

function toStored(familyId: string, c: Card): StoredCard {
  return {
    familyId,
    due: c.due.getTime(),
    stability: c.stability,
    difficulty: c.difficulty,
    scheduledDays: c.scheduled_days,
    learningSteps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    lastReview: c.last_review ? c.last_review.getTime() : null,
  };
}

function fromStored(s: StoredCard): Card {
  return {
    due: new Date(s.due),
    stability: s.stability,
    difficulty: s.difficulty,
    elapsed_days: 0,
    scheduled_days: s.scheduledDays,
    learning_steps: s.learningSteps,
    reps: s.reps,
    lapses: s.lapses,
    state: s.state,
    ...(s.lastReview !== null ? { last_review: new Date(s.lastReview) } : {}),
  };
}

export function newCard(familyId: string, now: number): StoredCard {
  return toStored(familyId, createEmptyCard(new Date(now)));
}

export function review(
  card: StoredCard,
  outcome: Outcome,
  now: number,
  thresholds: SpeedThresholds = DEFAULT_THRESHOLDS,
): { card: StoredCard; log: ReviewLogRow } {
  const rating = outcomeToRating(outcome, thresholds);
  const result = scheduler.next(fromStored(card), new Date(now), rating);
  return {
    card: toStored(card.familyId, result.card),
    log: {
      familyId: card.familyId,
      rating,
      reviewedAt: now,
      elapsedMs: outcome.elapsedMs,
      correct: outcome.correct,
      stateBefore: card.state,
      dueBefore: card.due,
    },
  };
}

/** Rodziny do powtórki teraz, od najbardziej zaległej. */
export function dueCards(cards: readonly StoredCard[], now: number, limit = Infinity): StoredCard[] {
  return cards
    .filter((c) => c.due <= now)
    .sort((a, b) => a.due - b.due)
    .slice(0, limit);
}

/**
 * Kolejność sesji z przeplataniem: kolejne zadania pochodzą z różnych rodzin,
 * a rodziny z tej samej grupy (np. podobne spoty) są rozrzucone, nie zbite w blok.
 * `perFamily` = ile zadań z każdej rodziny.
 */
export function interleave(familyIds: readonly string[], perFamily: number): string[] {
  const queues = familyIds.map((id) => ({ id, left: perFamily }));
  const out: string[] = [];
  let last: string | null = null;
  while (queues.some((q) => q.left > 0)) {
    const candidates = queues.filter((q) => q.left > 0 && q.id !== last);
    const pickFrom = candidates.length ? candidates : queues.filter((q) => q.left > 0);
    // najpierw rodzina z największą liczbą pozostałych zadań, żeby końcówka nie była jednolita
    pickFrom.sort((a, b) => b.left - a.left);
    const q = pickFrom[0]!;
    out.push(q.id);
    q.left--;
    last = q.id;
  }
  return out;
}

export { Rating };
