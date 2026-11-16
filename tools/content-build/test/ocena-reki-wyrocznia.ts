// HT (HR-003, 08-programista-003): własny ewaluator 5–7 kart dla wyroczni KO-111, niezależny od `strength` silnika (poker-core/evaluate.ts).
// Liczony z rang i kolorów (`rankOf`, `suitOf` to tożsamość karty, nie logika oceny). Zgodność z silnikiem sprawdza osobny test `ht-wyrocznia-ocena.test.ts`.
import { rankOf, suitOf, type Card } from '@szkola/poker-core';

const PODSTAWA = 13;
const koduj = (r: readonly number[]): number => [0, 1, 2, 3, 4].reduce((a, i) => a * PODSTAWA + (r[i] ?? 0), 0);
const KAT = PODSTAWA ** 5;
/** Najwyższa ranga strita w zbiorze rang (0 = dwójka … 12 = as; as także jako najniższa: koło 5-4-3-2-A ma szczyt 3), albo -1. */
function szczytStrita(rangi: ReadonlySet<number>): number {
  for (let top = 12; top >= 3; top--) {
    let ok = true;
    for (let k = 0; k < 5; k++) {
      const r = top - k;
      if (!rangi.has(r < 0 ? 12 : r)) { ok = false; break; }
    }
    if (ok) return top;
  }
  return -1;
}
const malejaco = (r: Iterable<number>): number[] => [...r].sort((a, b) => b - a);

/** Siła ręki z 5–7 kart: WIĘKSZA = silniejsza (kategoria × 13^5 + rangi rozstrzygające). */
export function mocReki(karty: readonly Card[]): number {
  const licz = new Array<number>(13).fill(0);
  for (const c of karty) licz[rankOf(c)] = (licz[rankOf(c)] ?? 0) + 1;
  const rangi = (n: number) => malejaco([...licz.keys()].filter((r) => licz[r] === n));
  const [czworki, trojki, pary, pojedyncze] = [rangi(4), rangi(3), rangi(2), rangi(1)];
  const wszystkie = malejaco(new Set(karty.map(rankOf)));
  const kolor = [0, 1, 2, 3].find((s) => karty.filter((c) => suitOf(c) === s).length >= 5);
  const rangiKoloru = kolor === undefined ? [] : malejaco(karty.filter((c) => suitOf(c) === kolor).map(rankOf));
  if (kolor !== undefined) {
    const sf = szczytStrita(new Set(rangiKoloru));
    if (sf >= 0) return 8 * KAT + koduj([sf]);
  }
  if (czworki.length > 0) return 7 * KAT + koduj([czworki[0]!, wszystkie.filter((r) => r !== czworki[0])[0]!]);
  if (trojki.length > 0 && (trojki.length > 1 || pary.length > 0)) return 6 * KAT + koduj([trojki[0]!, malejaco([...trojki.slice(1), ...pary])[0]!]);
  if (kolor !== undefined) return 5 * KAT + koduj(rangiKoloru.slice(0, 5));
  const strit = szczytStrita(new Set(wszystkie));
  if (strit >= 0) return 4 * KAT + koduj([strit]);
  if (trojki.length > 0) return 3 * KAT + koduj([trojki[0]!, ...pojedyncze.slice(0, 2)]);
  if (pary.length >= 2) return 2 * KAT + koduj([pary[0]!, pary[1]!, malejaco([...pary.slice(2), ...pojedyncze])[0]!]);
  if (pary.length === 1) return 1 * KAT + koduj([pary[0]!, ...pojedyncze.slice(0, 3)]);
  return koduj(pojedyncze.slice(0, 5));
}

/** Jak `strength` silnika: MNIEJSZA wartość = silniejsza ręka (podmiana bez zmiany porównań w wyrocznii). */
export const silaReki = (karty: readonly Card[]): number => -mocReki(karty);
