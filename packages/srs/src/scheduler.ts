import { forgetting_curve, fsrs } from 'ts-fsrs';
import type { StoredCard } from './types';

/** Jeden harmonogram FSRS dla całej aplikacji (ADR-05): docelowa retencja 0,9, bez losowego rozrzutu terminów. */
export const scheduler = fsrs({ request_retention: 0.9, enable_fuzz: false });

export const DAY_MS = 86_400_000;

/**
 * Przewidywana zapamiętywalność (retrievability, „probability of recall”) karty `extraDays` dni po chwili `now`:
 * krzywa zapominania FSRS z tymi samymi parametrami co harmonogram. Dni od ostatniej powtórki liczone w pełnych
 * dniach, jak w `get_retrievability` z ts-fsrs. Karta bez żadnej powtórki ma 0.
 */
export function retrievability(card: StoredCard, now: number, extraDays = 0): number {
  if (card.lastReview === null || card.reps === 0) return 0;
  const elapsed = Math.max(0, Math.floor((now - card.lastReview) / DAY_MS));
  return forgetting_curve(scheduler.parameters.w, elapsed + extraDays, card.stability);
}
