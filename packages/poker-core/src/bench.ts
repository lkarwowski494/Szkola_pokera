import { dealCards, parseCards } from './cards';
import { handEquity } from './equity';
import { evaluateHand } from './evaluate';
import { createRng } from './rng';

/**
 * Pomiar wydajności silnika (NFR-03, backlog B-009). Ta sama funkcja działa w Node (skrypt bench)
 * i na telefonie (ekran diagnostyki), więc wyniki da się porównać 1:1.
 */

/** Wymaganie NFR-03: equity Monte Carlo, 20 tys. prób, poniżej 50 ms (dokument 01). */
export const NFR03 = { iterations: 20_000, maxMs: 50 } as const;

export interface BenchResult {
  /** Mediana czasu equity MC (ms) z kolejnych pomiarów, po rozgrzewce. */
  equityMedianMs: number;
  equityRunsMs: number[];
  /** Equity pierwszej ręki z ostatniego pomiaru (kontrola, że liczenie ma sens). */
  equityCheck: number;
  /** Ocen 7-kartowych na sekundę (pełna ocena z najlepszą piątką). */
  evalsPerSecond: number;
  passesNfr03: boolean;
}

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
};

/**
 * @param now zegar w milisekundach (performance.now w aplikacji i w Node)
 * @param runs liczba pomiarów equity po jednym przebiegu rozgrzewkowym
 */
export function runBenchmark(now: () => number, runs = 5, evalCount = 20_000): BenchResult {
  // AA kontra KK przed flopem: 5 kart do dobrania, za dużo rozkładów na liczenie dokładne, więc Monte Carlo
  const hands = [parseCards('As Ah'), parseCards('Kd Kc')];
  const once = (seed: number) => handEquity(hands, [], { iterations: NFR03.iterations, exactLimit: 0, rng: createRng(seed) });
  once(1); // rozgrzewka (JIT w Node, kompilacja leniwa w Hermes)
  const equityRunsMs: number[] = [];
  let equityCheck = 0;
  for (let i = 0; i < runs; i++) {
    const t0 = now();
    const r = once(100 + i);
    equityRunsMs.push(now() - t0);
    equityCheck = r.equity[0]!;
  }

  const rng = createRng(7);
  const boards = Array.from({ length: evalCount }, () => dealCards(rng, 7));
  const t0 = now();
  for (const b of boards) evaluateHand(b);
  const evalMs = Math.max(now() - t0, 1e-6);

  const equityMedianMs = median(equityRunsMs);
  return {
    equityMedianMs,
    equityRunsMs,
    equityCheck,
    evalsPerSecond: (evalCount / evalMs) * 1000,
    passesNfr03: equityMedianMs < NFR03.maxMs,
  };
}
