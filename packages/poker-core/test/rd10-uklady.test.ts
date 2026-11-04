// AK-BR-CWI-007 / R-28: ranking układów. Wyrocznia: wektory RD-10 (tests/wektory/brd.json; liczności z wyliczenia wszystkich
// C(52,5) układów skryptem roli 01 bez poker-core, docs/brd/reguly.md:165–184), nie test/reference-evaluator.ts (D-176).
import { describe, expect, it } from 'vitest';
import type { Card } from '../src/cards';
import { evaluateHand, HandCategory } from '../src/evaluate';
import wektory from '../../../tests/wektory/brd.json';

const NAZWY: Record<string, HandCategory> = {
  poker: HandCategory.StraightFlush, kareta: HandCategory.FourOfAKind, full: HandCategory.FullHouse, kolor: HandCategory.Flush,
  strit: HandCategory.Straight, 'trójka': HandCategory.ThreeOfAKind, 'dwie pary': HandCategory.TwoPair, para: HandCategory.OnePair,
  'wysoka karta': HandCategory.HighCard,
};
const rd10 = (wektory as unknown as { regula: string; id: string; wejscie: Record<string, string>; oczekiwane: Record<string, number | string> }[])
  .filter((w) => w.regula === 'RD-10' && w.wejscie['Kategoria [-]']! in NAZWY)
  .map((w) => ({ id: w.id, kategoria: NAZWY[w.wejscie['Kategoria [-]']!]!, liczba: w.oczekiwane['liczba [układy]'] as number }));

describe('RD-10: wszystkie 2 598 960 układów pięciokartowych', () => {
  const licznosc = new Map<number, number>();
  const najsilniejsza = new Map<number, number>(); // kategoria → najlepsza (najniższa) siła
  const najslabsza = new Map<number, number>();
  let razem = 0;
  for (let a = 0; a < 52; a++) for (let b = a + 1; b < 52; b++) for (let c = b + 1; c < 52; c++) for (let d = c + 1; d < 52; d++) for (let e = d + 1; e < 52; e++) {
    const r = evaluateHand([a, b, c, d, e] as Card[]);
    licznosc.set(r.category, (licznosc.get(r.category) ?? 0) + 1);
    najsilniejsza.set(r.category, Math.min(najsilniejsza.get(r.category) ?? Infinity, r.strength));
    najslabsza.set(r.category, Math.max(najslabsza.get(r.category) ?? -Infinity, r.strength));
    razem++;
  }

  it('RD-10-W10: dziewięć rozłącznych kategorii wyczerpuje C(52,5) (brak kategorii spoza listy)', () => {
    expect(razem).toBe(2_598_960);
    expect([...licznosc.keys()].sort()).toEqual(Object.values(NAZWY).sort());
  });
  it.each(rd10.map((w) => [w.id, w] as const))('%s liczność kategorii', (_id, w) => {
    expect(licznosc.get(w.kategoria)).toBe(w.liczba);
  });
  it('ranking: rzadsza kategoria jest silniejsza (np. kolor 5108 bije strit 10200), bez nakładania się sił', () => {
    const wgLicznosci = [...rd10].sort((x, y) => x.liczba - y.liczba);
    for (let i = 1; i < wgLicznosci.length; i++) {
      const silniejsza = wgLicznosci[i - 1]!.kategoria;
      const slabsza = wgLicznosci[i]!.kategoria;
      expect(najslabsza.get(silniejsza)!, `${wgLicznosci[i - 1]!.id} przed ${wgLicznosci[i]!.id}`).toBeLessThan(najsilniejsza.get(slabsza)!);
    }
  });
}, 60_000);
