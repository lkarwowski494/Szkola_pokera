import { classCombos, combosCount, HAND_CLASSES } from '@szkola/poker-core';

export const N = 169;

/** Macierz equity heads-up 169×169 (wiersz vs kolumna) i liczba zgodnych par kombinacji. */
export interface EquityData {
  classes: string[];
  equity: number[][];
  pairs: number[][];
  /** Wariant (człon implied odds): dane z scripts/implied.ts (tools/equity/implied169.json). */
  implied?: ImpliedData;
}

/** Prawdopodobieństwa na rivera dla każdej klasy: silna ręka wymagająca obu kart (nut) i najwyższa para / overpara (pay). */
export interface ImpliedData {
  nut: number[];
  pay: number[];
  /** Jedna para niższa od najwyższej karty stołu (ręka średniej siły); potrzebne tylko w wariancie mid. */
  mid?: number[];
}

export function validateEquity(d: EquityData): void {
  if (d.classes.length !== N) throw new Error('Macierz equity: oczekiwano 169 klas');
  d.classes.forEach((c, i) => {
    if (c !== HAND_CLASSES[i]) throw new Error(`Macierz equity: klasa ${i} to ${c}, oczekiwano ${HAND_CLASSES[i]}`);
  });
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      const s = d.equity[i]![j]! + d.equity[j]![i]!;
      if (Math.abs(s - 1) > 1e-4) throw new Error(`Macierz equity niesymetryczna: ${d.classes[i]} vs ${d.classes[j]}`);
    }
}

/** Liczba kombinacji każdej klasy i rozkład a priori (combos/1326). */
export const COMBOS = Float64Array.from(HAND_CLASSES.map(combosCount));
export const PRIOR = Float64Array.from(COMBOS, (c) => c / 1326);

/**
 * Parametry modelu realizacji equity (EQR). Wartości wag klas to założenia z researchu
 * (dokument 08 i ADR-20); k i m są kalibrowane na dwóch celach, reszta wyników to walidacja.
 */
export interface EqrParams {
  /** Siła wpływu grywalności ręki (0 = brak, 1 = wagi jak w tabeli). */
  k: number;
  /** Przewaga pozycji: IP 1+m, OOP 1−m przy SPR ≥ sprFull (domyślnie 8). */
  m: number;
  /** Rake: odsetek puli i limit w bb; pobierany tylko, gdy jest flop. */
  rakeRate: number;
  rakeCap: number;
  /** Wariant (opcja A, raport 10): premia realizacji dla ostatniego podbijającego, kara dla sprawdzającego. 0 = brak. */
  role?: number;
  /** Wariant (raport 10): jak `role`, ale tylko w pulach 3-betowanych i wyżej (pule z jednym podbiciem bez zmian). Domyślnie = role. */
  role3?: number;
  /** SPR, od którego przewaga pozycji i grywalności działa w pełni (niżej maleje liniowo do czystego equity). Domyślnie 8 (założenie bez źródła, raport 10). */
  sprFull?: number;
  /** Wariant: czynnik roli w pulach 4-betowanych i wyżej. Domyślnie = role3. */
  role4?: number;
  /** Wariant (naprawa EQR, raport 10): wagi grywalności grup rąk zamiast tabeli kanonu (klucze: PLAY_GROUPS). */
  weights?: Partial<Record<PlayGroup, number>>;
  /** Wariant (naprawa EQR): SPR, od którego grywalność działa w pełni (osobno od pozycji). Domyślnie = sprFull. */
  sprPlay?: number;
  /**
   * Wariant (naprawa EQR, człon implied odds): do udziału ręki h przeciw v dochodzi
   * io · min(SPR, ioCap) · (nut(h)·pay(v) − nut(v)·pay(h)). Człon jest antysymetryczny, więc suma udziałów zostaje 1
   * (gra o stałej sumie), ale udział może wyjść poza [0, 1]: ręka, która trafia seta, wygrywa od overpary więcej niż
   * obecną pulę. 0 = brak (kanon).
   */
  io?: number;
  ioCap?: number;
  /**
   * Wariant (naprawa EQR, człon ręki średniej siły): od udziału ręki h przeciw v odejmuje się
   * mid · min(SPR, midCap) · (mid(h)·agg(v) − mid(v)·agg(h)), agg = nut + pay (ręce, które betują dla wartości).
   * Udział w puli, więc w bb kara rośnie z wielkością puli (średnie ręce nie chcą dużych pul). 0 = brak (kanon).
   */
  mid?: number;
  midCap?: number;
}

/** Człon implied odds dla pary klas (h, v) przy danym SPR, w udziałach puli (0 bez wariantu io). */
export function impliedTerm(p: EqrParams, d: ImpliedData | undefined, spr: number, h: number, v: number): number {
  if (!d) return 0;
  let t = 0;
  if (p.io) t += p.io * Math.min(spr, p.ioCap ?? Infinity) * (d.nut[h]! * d.pay[v]! - d.nut[v]! * d.pay[h]!);
  if (p.mid && d.mid) {
    const agg = (x: number) => d.nut[x]! + d.pay[x]!;
    t -= p.mid * Math.min(spr, p.midCap ?? 4) * (d.mid[h]! * agg(v) - d.mid[v]! * agg(h));
  }
  return t;
}

/** Grupy rąk w modelu grywalności (wartości kanonu w CANON_WEIGHTS). */
export const PLAY_GROUPS = ['p22', 'p77', 'pJJ', 'sBw', 'sConn', 'sAce', 'sGap', 'sOther', 'oBw', 'oAce', 'oConn', 'oOther'] as const;
export type PlayGroup = (typeof PLAY_GROUPS)[number];
export const CANON_WEIGHTS: Record<PlayGroup, number> = {
  p22: 1.1,
  p77: 1.05,
  pJJ: 1.0,
  sBw: 1.04,
  sConn: 1.08,
  sAce: 1.0,
  sGap: 0.98,
  sOther: 0.94,
  oBw: 0.9,
  oAce: 0.85,
  oConn: 0.85,
  oOther: 0.78,
};

export const DEFAULT_EQR: EqrParams = { k: 1, m: 0.08, rakeRate: 0.05, rakeCap: 3, role: 0 };

/** Grupa grywalności klasy ręki. */
export function playGroup(hc: string): PlayGroup {
  const R = '23456789TJQKA';
  const hi = R.indexOf(hc[0]!);
  const lo = R.indexOf(hc[1]!);
  if (hc.length === 2) return hi <= 4 ? 'p22' : hi <= 8 ? 'p77' : 'pJJ'; // 22–66, 77–TT, JJ+
  const suited = hc[2] === 's';
  const gap = hi - lo - 1;
  const broadway = lo >= 8;
  const ace = hi === 12;
  const connected = gap <= 1 && lo >= 3; // np. 54s, 65s, 97s
  if (suited) {
    if (broadway) return 'sBw';
    if (connected) return 'sConn';
    if (ace) return 'sAce';
    return gap <= 2 ? 'sGap' : 'sOther';
  }
  if (broadway) return 'oBw';
  if (ace) return 'oAce';
  if (connected) return 'oConn';
  return 'oOther';
}

/**
 * Waga grywalności klasy (przed skalowaniem k). Grupy i wartości: priorytety z researchu
 * (serwis szkoleniowy i opublikowane analizy solvera: ręce w kolorze i połączone realizują więcej, offsuit mniej). Do kalibracji.
 */
export function playabilityWeight(hc: string, weights?: Partial<Record<PlayGroup, number>>): number {
  const g = playGroup(hc);
  return weights?.[g] ?? CANON_WEIGHTS[g];
}

/**
 * Udział w puli gracza OOP z ręką h przeciw IP z ręką v (model „udziału w puli”, stała suma).
 * Przy SPR → 0 (all-in) wraca do czystego equity.
 */
export function shareMatrix(eq: number[][], p: EqrParams, spr: number, aggressorIsOop: boolean | null = null, implied?: ImpliedData): Float64Array {
  const full = p.sprFull ?? 8;
  const f = Math.min(spr, full) / full;
  const r = (p.role ?? 0) * f;
  const fo = (1 - p.m * f) * (aggressorIsOop === null ? 1 : aggressorIsOop ? 1 + r : 1 - r);
  const fi = (1 + p.m * f) * (aggressorIsOop === null ? 1 : aggressorIsOop ? 1 - r : 1 + r);
  const fp = Math.min(spr, p.sprPlay ?? full) / (p.sprPlay ?? full);
  const w = HAND_CLASSES.map((hc) => 1 + p.k * (playabilityWeight(hc, p.weights) - 1) * fp);
  const out = new Float64Array(N * N);
  for (let h = 0; h < N; h++)
    for (let v = 0; v < N; v++) {
      const e = eq[h]![v]!;
      if (f === 0) {
        out[h * N + v] = e;
        continue;
      }
      const a = e * w[h]! * fo;
      const b = (1 - e) * w[v]! * fi;
      out[h * N + v] = (a + b > 0 ? a / (a + b) : 0.5) + impliedTerm(p, implied, spr, h, v);
    }
  return out;
}

/**
 * Waga pary klas (h, v) uwzględniająca wspólne karty (blokery):
 * pairs / (combos(h)·combos(v)) · 1326/1225, tak że PRIOR(h)·PRIOR(v)·c(h,v) to dokładne
 * prawdopodobieństwo rozdania tej pary klas dwóm graczom (suma po wszystkich parach = 1).
 */
export function compatMatrix(pairs: number[][]): Float64Array {
  const out = new Float64Array(N * N);
  const norm = 1326 / 1225;
  for (let h = 0; h < N; h++) for (let v = 0; v < N; v++) out[h * N + v] = (pairs[h]![v]! / (COMBOS[h]! * COMBOS[v]!)) * norm;
  return out;
}

export function rake(pot: number, p: EqrParams): number {
  return Math.min(pot * p.rakeRate, p.rakeCap);
}

/** Liczba par kombinacji bez wspólnych kart dla każdej pary klas (do testów i kontroli pliku equity). */
export function computePairs(): number[][] {
  const combos = HAND_CLASSES.map(classCombos);
  return combos.map((a) =>
    combos.map((b) => {
      let n = 0;
      for (const [a0, a1] of a) for (const [b0, b1] of b) if (a0 !== b0 && a0 !== b1 && a1 !== b0 && a1 !== b1) n++;
      return n;
    }),
  );
}
