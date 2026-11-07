// Test roli 08 (fix L7-13c, L7-13b): liczba 5-kartowych układów każdej kategorii (RD-10). Wyrocznia: wektory RD-10-W1–W5
// (wszystkie 9 kategorii) z tests/wektory/brd.json (nie wpisane liczby) i niezależna relacja — suma po kategoriach = C(52, 5) = 2 598 960 rozdań.
import { describe, expect, it } from 'vitest';
import { fiveCardHandCount, HandCategory } from '../src';
import wektory from '../../../tests/wektory/brd.json';

const WEKTORY = wektory as unknown as { id: string; wejscie: Record<string, unknown>; oczekiwane: Record<string, unknown> }[];
const KATEGORIA: Record<string, HandCategory> = {
  poker: HandCategory.StraightFlush, kareta: HandCategory.FourOfAKind, full: HandCategory.FullHouse, kolor: HandCategory.Flush,
  strit: HandCategory.Straight, 'trójka': HandCategory.ThreeOfAKind, 'dwie pary': HandCategory.TwoPair, para: HandCategory.OnePair,
  'wysoka karta': HandCategory.HighCard,
};
const RD10 = WEKTORY.filter((v) => v.id.startsWith('RD-10-') && String(v.wejscie['Kategoria [-]']) in KATEGORIA);

describe('RD-10: liczba 5-kartowych układów kategorii', () => {
  it('wektory RD-10 obejmują 9 kategorii', () => expect(RD10).toHaveLength(9));
  it.each(RD10.map((w) => [w.id, w] as const))('%s', (_id, w) => {
    expect(fiveCardHandCount(KATEGORIA[String(w.wejscie['Kategoria [-]'])]!)).toBe(Number(w.oczekiwane['liczba [układy]']));
  });
  it('suma po 9 kategoriach = C(52, 5); kategoria silniejsza jest rzadsza', () => {
    const kat = Object.values(HandCategory).sort((a, b) => a - b);
    const n = kat.map(fiveCardHandCount);
    let c = 1;
    for (let i = 0; i < 5; i++) c = (c * (52 - i)) / (i + 1);
    expect(n.reduce((a, b) => a + b, 0)).toBe(c);
    for (let i = 1; i < n.length - 1; i++) expect(n[i]!, `kategoria ${kat[i]}`).toBeGreaterThan(n[i - 1]!);
  });
});
