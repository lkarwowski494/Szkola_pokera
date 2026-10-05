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
  /**
   * Część „gra” (dokument 14, 4.8 i 5.10): wynik z ostatnich `gameWindow` ocenionych decyzji obszaru w jednej
   * konfiguracji stołu; poniżej `gameMin` decyzji nie liczony („za mało gry”), od `gameMin` do `gameWindow − 1`
   * „wstępny”. Progi wynikają z błędu odsetka √(p(1 − p)/n) ≤ 0,5/√n: ok. ±15 pkt przy 40, ±10 pkt przy 100
   * (95%); wybór tych szerokości to wartość startowa do kalibracji.
   */
  gameWindow: 100,
  gameMin: 40,
  /** Łączenie w obszarze: wiedza i gra po równo (neutralny punkt startowy bez źródła, 5.10). */
  knowledgeWeight: 0.5,
  gameWeight: 0.5,
  /** Moduły z częścią „gra” (M2–M9); M0, M1 i M10–M12 tylko „wiedza” (4.8). */
  gameModules: ['m2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'] as readonly string[],
  /** Konfiguracja stołu w liczbie głównej, gdy użytkownik nie wybrał innej („moja gra”, decyzja P16). */
  defaultConfig: '6-100',
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

export interface AreaGame {
  id: string;
  /** Ocenione decyzje w oknie (najwyżej gameWindow). */
  decisions: number;
  /** Średnia punktów 0–1 albo null poniżej gameMin. */
  raw: number | null;
  score: number | null;
  /** no-game: obszar bez części „gra” (M0, M1, M10–M12); too-little: mniej niż gameMin decyzji. */
  status: 'no-game' | 'too-little' | 'provisional' | 'ok';
}

/** Część „gra”: „pending” bez danych z trybu gry (np. w testach wiedzy), inaczej wynik obszarów w konfiguracji. */
export type GamePart = { status: 'pending' } | { status: 'active'; config: string; areas: AreaGame[] };

/** Obszar po połączeniu: 0,5 × wiedza + 0,5 × gra, a bez gry sama wiedza z oznaczeniem „bez gry” (decyzja P15). */
export interface AreaCombined {
  id: string;
  raw: number | null;
  score: number | null;
  /** true, gdy w obszarze liczy się tylko wiedza. */
  knowledgeOnly: boolean;
  provisional: boolean;
}

/**
 * Wejście części „gra”: punkty ocenionych decyzji obszaru (1 = zgodna lub dopuszczalna, 0 = błąd lub niedokładność;
 * bez oceny i przekroczony czas pominięte), od najnowszych, w jednej konfiguracji stołu.
 */
export interface GameInput {
  config: string;
  points: ReadonlyMap<string, readonly (0 | 1)[]>;
}

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
  /** Obszary po połączeniu wiedzy i gry (przy części „gra” pending równe wiedzy). */
  combined: AreaCombined[];
}

/** Wiedza o jednej umiejętności, 0–1. Brak karty = umiejętność nieprzećwiczona = 0. */
export function skillKnowledge(card: StoredCard | undefined, now: number): number {
  return card ? retrievability(card, now, ADVANCEMENT.horizonDays) : 0;
}

export function toScore(raw: number | null): number | null {
  return raw === null ? null : Math.round(Math.max(0, Math.min(1, raw)) * ADVANCEMENT.scale);
}

/** Wynik gry obszaru z punktów decyzji (od najnowszych). */
export function areaGame(id: string, points: readonly (0 | 1)[] | undefined): AreaGame {
  if (!ADVANCEMENT.gameModules.includes(id)) return { id, decisions: 0, raw: null, score: null, status: 'no-game' };
  const window = (points ?? []).slice(0, ADVANCEMENT.gameWindow);
  if (window.length < ADVANCEMENT.gameMin) return { id, decisions: window.length, raw: null, score: null, status: 'too-little' };
  const raw = window.reduce<number>((a, b) => a + b, 0) / window.length;
  return { id, decisions: window.length, raw, score: toScore(raw), status: window.length < ADVANCEMENT.gameWindow ? 'provisional' : 'ok' };
}

export function computeAdvancement(areas: readonly AreaInput[], cards: readonly StoredCard[], now: number, game?: GameInput): AdvancementReport {
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
  const knowledge = { raw, score, skills, practiced, areas: out };
  if (!game) {
    const combined = out.map((a) => ({ id: a.id, raw: a.raw, score: a.score, knowledgeOnly: true, provisional: false }));
    return { overall: score, knowledge, game: { status: 'pending' }, combined };
  }
  const games = areas.map((a) => areaGame(a.id, game.points.get(a.id)));
  // wynik ogólny jak w ADR-25: średnia obszarów ważona liczbą umiejętności, z wartością połączoną tam, gdzie jest gra
  let wsum = 0;
  let wskills = 0;
  const combined: AreaCombined[] = out.map((a, i) => {
    const g = games[i]!;
    const withGame = a.raw !== null && g.raw !== null;
    const cRaw = withGame ? ADVANCEMENT.knowledgeWeight * a.raw! + ADVANCEMENT.gameWeight * g.raw! : a.raw;
    if (a.counted && cRaw !== null) {
      wsum += cRaw * a.skills;
      wskills += a.skills;
    }
    return { id: a.id, raw: cRaw, score: toScore(cRaw), knowledgeOnly: !withGame, provisional: withGame && g.status === 'provisional' };
  });
  const overallRaw = wskills ? wsum / wskills : null;
  return { overall: toScore(overallRaw), knowledge, game: { status: 'active', config: game.config, areas: games }, combined };
}
