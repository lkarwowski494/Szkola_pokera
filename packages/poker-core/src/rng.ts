/**
 * Deterministyczny generator liczb losowych (mulberry32).
 * Ziarno pozwala odtworzyć dokładnie to samo rozdanie w testach i w powtórkach.
 */
export type Rng = () => number;

export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Losowa liczba całkowita z przedziału [0, max). */
export function randInt(rng: Rng, max: number): number {
  return Math.floor(rng() * max);
}

/** Losowy element tablicy. Rzuca błąd dla pustej tablicy. */
export function pick<T>(rng: Rng, items: readonly T[]): T {
  if (items.length === 0) throw new Error('pick: pusta tablica');
  return items[randInt(rng, items.length)] as T;
}

/** Tasowanie Fishera-Yatesa, zwraca nową tablicę. */
export function shuffle<T>(rng: Rng, items: readonly T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(rng, i + 1);
    const tmp = out[i] as T;
    out[i] = out[j] as T;
    out[j] = tmp;
  }
  return out;
}
