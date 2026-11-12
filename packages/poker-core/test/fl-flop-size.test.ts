// 08-FD-3 (= 08-EX-4, sesja FL; D-1306, D-1355, SC-13): rodzaj flop-size — rozmiar zakładu silną ręką na flopie two-tone wobec drawa do koloru.
// ¼ puli (mały) kontra ⅔ puli (duży), poprawny bet-big. Konwencja jednej karty: e = N/47 (N = karty turnu, po których rywal wygrywa albo remisuje),
// cena = zakład ÷ (pula + 2·zakład). Warunek przyjęcia: zbiór N równy nominalnym outom drawa, 0 remisów, e − cena(¼) ≥ δ i cena(⅔) − e ≥ δ, δ ≥ 0,02.
// Wyrocznia niezależna od generatora: (a) wektory A, B, C wpisane z `docs/tresci/dowody/fd-wektory.txt` (rachunek odniesienia `fd_wektory.py`),
// (b) pełne przejście po niewidzianych kartach ewaluatorem, bez analyseOutsSpot dla zbioru wygrywających.
import { describe, expect, it } from 'vitest';
import { categoryOf, FULL_DECK, flopSizeAnalysis, generateVariant, HandCategory, parseCards, rankOf, strength, suitOf, TemplateError, type Card, type GeneratorTemplate } from '../src';

type Reka = readonly [Card, Card];
const R = (s: string): Reka => parseCards(s) as unknown as Reka;
/** Karty turnu (z 45 niewidzianych), po których rywal wygrywa (W) albo remisuje (T) z graczem. */
function turnCards(hero: readonly Card[], villain: readonly Card[], flop: readonly Card[]) {
  const znane = new Set<Card>([...hero, ...villain, ...flop]);
  const wygrywa: Card[] = [], remisuje: Card[] = [];
  for (const c of FULL_DECK) {
    if (znane.has(c)) continue;
    const [r, h] = [strength([...villain, ...flop, c]), strength([...hero, ...flop, c])]; // mniejsza siła = lepsza ręka
    if (r < h) wygrywa.push(c); else if (r === h) remisuje.push(c);
  }
  return { wygrywa, remisuje, niewidziane: FULL_DECK.length - znane.size };
}
const cena = (ulamek: number) => ulamek / (1 + 2 * ulamek);
const MALY = 0.25, DUZY = 2 / 3;
const FLOP = parseCards('Ks 8h 5h');

describe('08-EX-4: wektory z fd-wektory.txt (cena ¼ = 0,1667, ⅔ = 0,2857; flop Ks8h5h)', () => {
  it('ceny: ¼ → 1/6, ⅔ → 2/7', () => {
    expect(cena(MALY)).toBeCloseTo(0.1667, 4);
    expect(cena(DUZY)).toBeCloseTo(0.2857, 4);
  });
  it('A: AsKd vs QhJh → 9 kart (2h 3h 4h 6h 7h 9h Th Kh Ah), e = 0,1915, marginesy +0,0248 / +0,0942, czyste outy', () => {
    const t = turnCards(R('As Kd'), R('Qh Jh'), FLOP);
    expect(t.wygrywa.slice().sort((a, b) => a - b)).toEqual(parseCards('2h 3h 4h 6h 7h 9h Th Kh Ah').sort((a, b) => a - b));
    expect(t.remisuje).toEqual([]);
    const a = flopSizeAnalysis(R('As Kd'), R('Qh Jh'), FLOP, MALY, DUZY);
    expect(a).not.toBeNull();
    expect(a!.drawKind).toBe('flush');
    expect([a!.nominalOuts, a!.winners, a!.ties, a!.clean]).toEqual([9, 9, 0, true]);
    expect(a!.e).toBeCloseTo(0.1915, 4);
    expect(a!.marginSmall).toBeCloseTo(0.0248, 4);
    expect(a!.marginBig).toBeCloseTo(0.0942, 4);
    expect(a!.eExact).toBeCloseTo(9 / 45, 12); // dokładne equity przy znanych kartach (45 niewidzianych), jak N/44 na turnie (D-1286)
    expect(a!.marginBigExact).toBeCloseTo(2 / 7 - 9 / 45, 12);
  });
  it('B: AhKd vs QhJh (gracz trzyma Ah) → 8 kart, e = 0,1702, margines przy ¼ = +0,0035 < 0,02', () => {
    expect(turnCards(R('Ah Kd'), R('Qh Jh'), FLOP).wygrywa).toHaveLength(8);
    const a = flopSizeAnalysis(R('Ah Kd'), R('Qh Jh'), FLOP, MALY, DUZY);
    expect(a).not.toBeNull();
    expect(a!.winners).toBe(8);
    expect(a!.clean).toBe(false); // nominalnie 9 outów, jeden (Ah) w ręce gracza
    expect(a!.e).toBeCloseTo(0.1702, 4);
    expect(a!.marginSmall).toBeCloseTo(0.0035, 4);
    expect(a!.marginSmall).toBeLessThan(0.02);
  });
  it('C: AsKd vs 7h6h (kolor + strit) → 15 kart, e = 0,3191 > cena ⅔, margines przy ⅔ = −0,0334', () => {
    expect(turnCards(R('As Kd'), R('7h 6h'), FLOP).wygrywa).toHaveLength(15);
    const a = flopSizeAnalysis(R('As Kd'), R('7h 6h'), FLOP, MALY, DUZY);
    expect(a).not.toBeNull();
    expect(a!.winners).toBe(15);
    expect(a!.e).toBeCloseTo(0.3191, 4);
    expect(a!.marginBig).toBeCloseTo(-0.0334, 4);
    expect(a!.marginSmall).toBeCloseTo(0.1525, 4);
  });
  it('rywal bez drawa (2c3c) → null; flop ≠ 3 karty to błąd', () => {
    expect(flopSizeAnalysis(R('As Kd'), R('2c 3c'), FLOP, MALY, DUZY)).toBeNull();
    expect(() => flopSizeAnalysis(R('As Kd'), R('Qh Jh'), FLOP.slice(0, 2), MALY, DUZY)).toThrow(/flop/);
  });
});

const szablon = (extra: Partial<{ pots: number[]; small: number; big: number; marginMin: number; expected: string }> = {}): GeneratorTemplate => ({
  id: 'sc-fx-flop-size',
  levels: {
    latwy: { draws: ['flush'], reject: [], marginMin: extra.marginMin ?? 0.02, expected: [extra.expected ?? 'bet-big'], flop: { suits: ['two-tone'] } },
  },
  decisions: [{ kind: 'flop-size', street: 'flop', pots: extra.pots ?? [12, 24, 36, 48], small: extra.small ?? MALY, big: extra.big ?? DUZY }],
} as unknown as GeneratorTemplate);
const LOSOWANIA = 100;

describe('08-EX-4: generator flop-size', () => {
  it(`${LOSOWANIA} wariantów: N = 9 czystych outów koloru, 0 remisów, e = 9/47, marginesy ≥ 0,02, silna ręka, flop two-tone`, () => {
    const zle: string[] = [];
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(szablon(), 'latwy', seed);
      const p = v.points[0];
      if (p?.point !== 'flop-size') { zle.push(`${seed}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const t = turnCards(v.hero, v.villain, flop);
      const kolory = [0, 1, 2, 3].map((su) => flop.filter((c) => suitOf(c) === su).length).sort((a, b) => b - a);
      const kat = categoryOf(strength([...v.hero, ...flop]));
      const rangiStolu = flop.map(rankOf);
      const [r1, r2] = [rankOf(v.hero[0]), rankOf(v.hero[1])];
      const nadpara = r1 === r2 && r1 > Math.max(...rangiStolu);
      const najwyzsza = Math.max(...rangiStolu);
      const topZKickerem = (r1 === najwyzsza && r2 >= 10) || (r2 === najwyzsza && r1 >= 10);
      const silna = kat <= HandCategory.TwoPair || nadpara || topZKickerem;
      const bledy = [
        t.niewidziane !== 45 && 'niewidziane',
        t.wygrywa.length !== 9 && `N=${t.wygrywa.length}`,
        t.remisuje.length !== 0 && 'remisy',
        Math.abs(p.hit - 9 / 47) > 1e-12 && `hit=${p.hit}`,
        !(p.requiredBig - 9 / 45 >= 0.02) && 'margines ⅔ wobec dokładnego equity',
        !(9 / 45 - p.requiredSmall >= 0.02) && 'margines ¼ wobec dokładnego equity',
        p.betSmall !== p.pot / 4 && 'betSmall',
        Math.abs(p.betBig - (p.pot * 2) / 3) > 1e-9 && 'betBig',
        Math.abs(p.requiredSmall - cena(MALY)) > 1e-9 && 'requiredSmall',
        Math.abs(p.requiredBig - cena(DUZY)) > 1e-9 && 'requiredBig',
        !(p.hit - p.requiredSmall >= 0.02) && 'margines ¼',
        !(p.requiredBig - p.hit >= 0.02) && 'margines ⅔',
        p.drawKind !== 'flush' && 'rodzaj',
        p.correct !== 'bet-big' && 'correct',
        !(kolory[0] === 2 && kolory[1] === 1) && 'flop nie two-tone',
        !silna && 'ręka nie jest silna',
        ![12, 24, 36, 48].includes(p.pot) && 'pula',
      ].filter(Boolean);
      if (bledy.length) zle.push(`${seed}: ${bledy.join(', ')}`);
    }
    expect(zle).toEqual([]);
  }, 300_000);
  it('szablon: ułamek puli, który nie daje całego zakładu, margines < 0,02, zła akcja oczekiwana i 0 < small < big to błędy', () => {
    expect(() => generateVariant(szablon({ pots: [10] }), 'latwy', 1)).toThrow(/całą kwotą/);
    expect(() => generateVariant(szablon({ marginMin: 0.01 }), 'latwy', 1)).toThrow(/margines/);
    expect(() => generateVariant(szablon({ expected: 'bet-small' }), 'latwy', 1)).toThrow(/bet-big/);
    expect(() => generateVariant(szablon({ small: 0.7 }), 'latwy', 1)).toThrow(TemplateError);
  });
});
