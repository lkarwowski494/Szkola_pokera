import { retrievability } from './scheduler';
import type { StoredCard } from './types';

/**
 * Wskaźnik zaawansowania 0–100 (ADR-25). Etap 1: część „wiedza”, liczona z kart FSRS rodzin zadań.
 * Część „gra” dojdzie z trybem gry M13 (dokument 14); do tego czasu jest jawnie „niedostępna”, a nie zerem.
 *
 * Wiedza o umiejętności (rodzinie zadań) = przewidywana zapamiętywalność FSRS za HORIZON_DAYS dni bez powtórki.
 * Nieprzećwiczona umiejętność = 0, więc wskaźnik mierzy też pokrycie kursu. Obszar = moduł kursu.
 * Wynik obszaru = średnia po jego umiejętnościach; wynik ogólny = średnia po wszystkich liczonych umiejętnościach
 * (czyli średnia obszarów ważona liczbą umiejętności).
 */
export const ADVANCEMENT = {
  /**
   * Horyzont w dniach: pytamy, czy umiejętność przetrwa tyle dni bez powtórki. Bez horyzontu każda karta tuż po
   * odpowiedzi, także błędnej, ma zapamiętywalność 1, bo R(0, S) = 1. Wartość startowa do kalibracji (ADR-25).
   */
  horizonDays: 30,
  /** Skala wyświetlania: 0–100, liczby całkowite. */
  scale: 100,
} as const;

export interface AreaInput {
  /** Identyfikator obszaru = identyfikator modułu kursu (np. "m5"). */
  id: string;
  /** Rodziny zadań przypisane do obszaru (każda rodzina w dokładnie jednym obszarze). */
  skills: readonly string[];
  /** false dla modułu opcjonalnego: obszar jest pokazany, ale nie wchodzi do wyniku ogólnego. */
  counted: boolean;
}

export interface AreaKnowledge {
  id: string;
  skills: number;
  /** Ile umiejętności ma kartę FSRS (co najmniej jedna odpowiedź). */
  practiced: number;
  /** Średnia wiedza 0–1 albo null, gdy obszar nie ma jeszcze zadań. */
  raw: number | null;
  /** Wynik 0–100 (zaokrąglony) albo null, gdy obszar nie ma zadań. */
  score: number | null;
  counted: boolean;
}

/** Część „gra”: do czasu trybu gry M13 zawsze „pending”. Nowy wariant dojdzie razem z M13. */
export type GamePart = { status: 'pending' };

export interface AdvancementReport {
  /** Wynik ogólny 0–100; w etapie 1 równy części „wiedza” (null, gdy kurs nie ma żadnych zadań). */
  overall: number | null;
  knowledge: {
    raw: number | null;
    score: number | null;
    skills: number;
    practiced: number;
    areas: AreaKnowledge[];
  };
  game: GamePart;
}

/** Wiedza o jednej umiejętności, 0–1. Brak karty = umiejętność nieprzećwiczona = 0. */
export function skillKnowledge(card: StoredCard | undefined, now: number): number {
  return card ? retrievability(card, now, ADVANCEMENT.horizonDays) : 0;
}

export function toScore(raw: number | null): number | null {
  return raw === null ? null : Math.round(Math.max(0, Math.min(1, raw)) * ADVANCEMENT.scale);
}

export function computeAdvancement(areas: readonly AreaInput[], cards: readonly StoredCard[], now: number): AdvancementReport {
  const byFamily = new Map(cards.map((c) => [c.familyId, c]));
  let sum = 0;
  let skills = 0;
  let practiced = 0;
  const out: AreaKnowledge[] = areas.map((a) => {
    let areaSum = 0;
    let areaPracticed = 0;
    for (const f of a.skills) {
      const card = byFamily.get(f);
      if (card) areaPracticed++;
      areaSum += skillKnowledge(card, now);
    }
    const raw = a.skills.length ? areaSum / a.skills.length : null;
    if (a.counted) {
      sum += areaSum;
      skills += a.skills.length;
      practiced += areaPracticed;
    }
    return { id: a.id, skills: a.skills.length, practiced: areaPracticed, raw, score: toScore(raw), counted: a.counted };
  });
  const raw = skills ? sum / skills : null;
  const score = toScore(raw);
  return { overall: score, knowledge: { raw, score, skills, practiced, areas: out }, game: { status: 'pending' } };
}
