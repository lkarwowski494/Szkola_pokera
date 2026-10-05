import type { Outcome } from './index';

/**
 * Karty powtórek z gry M13 (dokument 14, 4.4.5, 5.6, 5.7, 6.1 A, 6.4 A). Logika bez bazy danych: aplikacja podaje
 * werdykty i liczniki, a tu zapada, które karty powstają, które czekają w kolejce i które rodziny wracają.
 *
 * Wszystkie progi są tutaj (jeden moduł progów, 5.7). Żaden nie ma źródła: to wartości startowe do kalibracji.
 */
export const GAME_CARDS = {
  /** Przestrzeń nazw identyfikatorów kart z gry w review_cards (6.1 A). */
  prefix: 'game:',
  /**
   * Dzienny limit nowych kart, liczony razem z nowymi rodzinami z zadań (6.4 A). Wartość startowa bez źródła
   * (podręcznik Anki podaje tylko przykład: 20 nowych kart dziennie daje ok. 200 powtórek dziennie).
   */
  dailyNew: 10,
  /** Reguła „3 razy” z programu (5.7): tyle błędów albo niedokładności w jednej rodzinie spotów… */
  recallMistakes: 3,
  /** …w tylu dniach przywraca rodzinę do powtórek. */
  recallWindowDays: 30,
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Werdykty z grading.ts, które tworzą kartę (błąd, niedokładność, przekroczony czas). */
export const CARD_VERDICTS: readonly string[] = ['mistake', 'inaccuracy', 'timeout'];

export function gameCardId(dedupeKey: string): string {
  return `${GAME_CARDS.prefix}${dedupeKey}`;
}

export function isGameCard(familyId: string): boolean {
  return familyId.startsWith(GAME_CARDS.prefix);
}

export interface CardCandidate {
  dedupeKey: string;
  verdict: string;
}

/**
 * Które werdykty sesji stają się kartami: tylko błąd, niedokładność i przekroczony czas; jedna karta na klucz
 * deduplikacji (ta sama reguła, klasa ręki i spot), z pominięciem kluczy, które już mają kartę.
 */
export function newCardCandidates<T extends CardCandidate>(findings: readonly T[], existingKeys: ReadonlySet<string>): T[] {
  const seen = new Set(existingKeys);
  const out: T[] = [];
  for (const f of findings) {
    if (!CARD_VERDICTS.includes(f.verdict) || seen.has(f.dedupeKey)) continue;
    seen.add(f.dedupeKey);
    out.push(f);
  }
  return out;
}

/**
 * Ile kart z kolejki wprowadzić dziś do powtórek: limit dzienny minus nowe karty już wprowadzone dziś (z zadań
 * i z gry). Nadmiar czeka na kolejne dni (6.4 A).
 */
export function cardsToIntroduce(queued: number, newToday: number, limit: number = GAME_CARDS.dailyNew): number {
  return Math.max(0, Math.min(queued, limit - newToday));
}

/**
 * Reguła „3 razy” (5.7): rodziny spotów z co najmniej `recallMistakes` błędami albo niedokładnościami w oknie
 * `recallWindowDays` dni. Przekroczony czas się nie liczy (5.11), wynik rozdania też nie (5.1).
 */
export function familiesToRecall(
  findings: readonly { family: string | null; verdict: string; decidedAt: number }[],
  now: number,
): string[] {
  const from = now - GAME_CARDS.recallWindowDays * DAY_MS;
  const counts = new Map<string, number>();
  for (const f of findings) {
    if (!f.family || f.decidedAt < from || f.decidedAt > now) continue;
    if (f.verdict !== 'mistake' && f.verdict !== 'inaccuracy') continue;
    counts.set(f.family, (counts.get(f.family) ?? 0) + 1);
  }
  return [...counts].filter(([, n]) => n >= GAME_CARDS.recallMistakes).map(([f]) => f);
}

/**
 * Werdykt powtórzonej decyzji → wynik FSRS, jak w zadaniach (outcomeToRating): zgodna jak dobra odpowiedź,
 * dopuszczalna jak w ADR-26 (Hard), niedokładność i błąd jak błąd (Again). Przekroczony czas w powtórce = błąd.
 * null: decyzja bez oceny (np. reguła zmieniła się po aktualizacji treści) — kartę trzeba wycofać, nie oceniać.
 */
export function gameOutcome(verdict: string, elapsedMs: number): Outcome | null {
  switch (verdict) {
    case 'compliant':
    case 'compliant-exploit':
      return { correct: true, elapsedMs };
    case 'acceptable':
      return { correct: true, acceptable: true, elapsedMs };
    case 'inaccuracy':
    case 'mistake':
    case 'timeout':
      return { correct: false, elapsedMs };
    default:
      return null;
  }
}
