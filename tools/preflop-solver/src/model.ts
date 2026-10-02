import { classCombos, combosCount, HAND_CLASSES } from '@szkola/poker-core';

export const N = 169;

/** Macierz equity heads-up 169×169 (wiersz vs kolumna) i liczba zgodnych par kombinacji. */
export interface EquityData {
  classes: string[];
  equity: number[][];
  pairs: number[][];
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
}

export const DEFAULT_EQR: EqrParams = { k: 1, m: 0.08, rakeRate: 0.05, rakeCap: 3, role: 0 };

/**
 * Waga grywalności klasy (przed skalowaniem k). Grupy i wartości: priorytety z researchu
 * (Deepfold, GTO Wizard: ręce w kolorze i połączone realizują więcej, offsuit mniej). Do kalibracji.
 */
export function playabilityWeight(hc: string): number {
  const R = '23456789TJQKA';
  const hi = R.indexOf(hc[0]!);
  const lo = R.indexOf(hc[1]!);
  if (hc.length === 2) return hi <= 4 ? 1.1 : hi <= 8 ? 1.05 : 1.0; // 22–66, 77–TT, JJ+
  const suited = hc[2] === 's';
  const gap = hi - lo - 1;
  const broadway = lo >= 8;
  const ace = hi === 12;
  const connected = gap <= 1 && lo >= 3; // np. 54s, 65s, 97s
  if (suited) {
    if (broadway) return 1.04;
    if (connected) return 1.08;
    if (ace) return 1.0;
    return gap <= 2 ? 0.98 : 0.94;
  }
  if (broadway) return 0.9;
  if (ace) return 0.85;
  if (connected) return 0.85;
  return 0.78;
}

/**
 * Udział w puli gracza OOP z ręką h przeciw IP z ręką v (model „udziału w puli”, stała suma).
 * Przy SPR → 0 (all-in) wraca do czystego equity.
 */
export function shareMatrix(eq: number[][], p: EqrParams, spr: number, aggressorIsOop: boolean | null = null): Float64Array {
  const full = p.sprFull ?? 8;
  const f = Math.min(spr, full) / full;
  const r = (p.role ?? 0) * f;
  const fo = (1 - p.m * f) * (aggressorIsOop === null ? 1 : aggressorIsOop ? 1 + r : 1 - r);
  const fi = (1 + p.m * f) * (aggressorIsOop === null ? 1 : aggressorIsOop ? 1 - r : 1 + r);
  const w = HAND_CLASSES.map((hc) => 1 + p.k * (playabilityWeight(hc) - 1) * f);
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
      out[h * N + v] = a + b > 0 ? a / (a + b) : 0.5;
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
