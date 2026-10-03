import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  analyseShowdown,
  cardToString,
  classCombos,
  classOf,
  compareHands,
  createRng,
  drawOuts,
  evaluateHand,
  generateDrawCall,
  generateOuts,
  generatePotOdds,
  generateWhoWins,
  gridPosition,
  HAND_CLASSES,
  HandCategory,
  handEquity,
  hitProbability,
  mdf,
  alpha,
  parseCard,
  parseCards,
  parseRange,
  rangeStats,
  requiredEquity,
  geometricBetFraction,
  strength,
} from '../src';
import { referenceCompare } from './reference-evaluator';

/** Arbitrary: n różnych kart. */
const distinctCards = (n: number) =>
  fc.uniqueArray(fc.integer({ min: 0, max: 51 }), { minLength: n, maxLength: n });

describe('karty', () => {
  it('parsuje i formatuje w obie strony', () => {
    fc.assert(fc.property(fc.integer({ min: 0, max: 51 }), (c) => parseCard(cardToString(c)) === c));
  });
  it('odrzuca powtórzone karty', () => {
    expect(() => parseCards('As As')).toThrow();
  });
});

describe('ocena rąk', () => {
  it('zgadza się z wolnym evaluatorem wzorcowym na losowych parach rąk 7-kartowych', () => {
    fc.assert(
      fc.property(distinctCards(9), (cards) => {
        const board = cards.slice(4);
        const a = [cards[0]!, cards[1]!, ...board];
        const b = [cards[2]!, cards[3]!, ...board];
        return compareHands(a, b) === referenceCompare(a, b);
      }),
      { numRuns: 3000 },
    );
  });

  it('nie zależy od kolejności kart', () => {
    fc.assert(
      fc.property(distinctCards(7), (cards) => strength(cards) === strength(cards.slice().reverse())),
    );
  });

  it('nie zależy od zamiany kolorów (permutacja ♠♥♦♣)', () => {
    fc.assert(
      fc.property(distinctCards(7), fc.constantFrom([1, 2, 3, 0], [3, 2, 1, 0], [2, 0, 3, 1]), (cards, perm) => {
        const mapped = cards.map((c) => (c & ~3) | perm[c & 3]!);
        return strength(cards) === strength(mapped);
      }),
    );
  });

  it('rozpoznaje kategorie i najlepszą piątkę', () => {
    const royal = evaluateHand(parseCards('As Ks Qs Js Ts 2d 3c'));
    expect(royal.category).toBe(HandCategory.StraightFlush);
    expect(royal.strength).toBe(1);
    const wheel = evaluateHand(parseCards('Ah 2d 3c 4s 5h Kd Kc'));
    expect(wheel.category).toBe(HandCategory.Straight);
    const twoPair = evaluateHand(parseCards('Kh Kd 7c 7s Ah 2d 3c'));
    expect(twoPair.category).toBe(HandCategory.TwoPair);
    expect(twoPair.bestFive.map(cardToString)).toEqual(['Kh', 'Kd', '7s', '7c', 'Ah']);
    const wheelFive = evaluateHand(parseCards('Ah 2d 3c 4s 5h Kd Kc')).bestFive.map(cardToString);
    expect(wheelFive).toEqual(['5h', '4s', '3c', '2d', 'Ah']);
  });
});

describe('kto wygrywa', () => {
  it('kicker: AK bije KQ przy królu na stole', () => {
    const s = analyseShowdown(parseCards('As Kd'), parseCards('Kc Qh'), parseCards('Ks 9d 5c 2h 7s'));
    expect(s.winner).toBe('hero');
    expect(s.reason).toBe('kicker');
  });
  it('gra stół: strit na stole dzieli pulę', () => {
    const s = analyseShowdown(parseCards('Ac Ad'), parseCards('Kc 2d'), parseCards('5h 6h 7c 8d 9s'));
    expect(s.winner).toBe('split');
    expect(s.reason).toBe('board-plays');
  });
  it('generator zwraca spójne rozdania', () => {
    const rng = createRng(7);
    for (let i = 0; i < 200; i++) {
      const s = generateWhoWins(rng);
      const cmp = compareHands([...s.hero, ...s.board], [...s.villain, ...s.board]);
      expect(cmp).toBe(s.winner === 'hero' ? 1 : s.winner === 'villain' ? -1 : 0);
    }
  });
});

describe('equity', () => {
  // wartości referencyjne: dokładne przeliczenie wszystkich stołów (dokument 08)
  const exact = (a: string, b: string) => handEquity([parseCards(a), parseCards(b)]).equity[0]!;

  it('AA vs KK mieści się w 81–83% zależnie od kolorów (średnio 81,9%)', () => {
    const r = handEquity([parseCards('As Ah'), parseCards('Ks Kh')]);
    expect(r.exact).toBe(true);
    expect(r.equity[0]).toBeGreaterThan(0.81);
    expect(r.equity[0]).toBeLessThan(0.83);
  });
  it('dokładne przeliczenie zgadza się z evaluatorem wzorcowym (turn → river)', () => {
    fc.assert(
      fc.property(distinctCards(8), (cards) => {
        const a = cards.slice(0, 2);
        const b = cards.slice(2, 4);
        const board = cards.slice(4, 8);
        const used = new Set(cards);
        let share = 0;
        let n = 0;
        for (let river = 0; river < 52; river++) {
          if (used.has(river)) continue;
          const c = referenceCompare([...a, ...board, river], [...b, ...board, river]);
          share += c > 0 ? 1 : c === 0 ? 0.5 : 0;
          n++;
        }
        return Math.abs(handEquity([a, b], board).equity[0]! - share / n) < 1e-12;
      }),
      { numRuns: 60 },
    );
  });
  it('AsKs vs 2c2d oraz suma equity = 1', () => {
    const r = handEquity([parseCards('As Ks'), parseCards('2c 2d')]);
    expect(r.equity[0]! + r.equity[1]!).toBeCloseTo(1, 10);
    expect(r.equity[1]).toBeGreaterThan(0.49);
    expect(r.equity[1]).toBeLessThan(0.51);
    void exact;
  });
  it('jest symetryczne przy zamianie rąk', () => {
    fc.assert(
      fc.property(distinctCards(7), (cards) => {
        const a = cards.slice(0, 2);
        const b = cards.slice(2, 4);
        const board = cards.slice(4, 7);
        const ab = handEquity([a, b], board).equity[0]!;
        const ba = handEquity([b, a], board).equity[1]!;
        return Math.abs(ab - ba) < 1e-12;
      }),
      { numRuns: 100 },
    );
  });
  it('Monte Carlo zbiega do wyniku dokładnego', () => {
    const mc = handEquity([parseCards('As Ah'), parseCards('Ks Kh')], [], { exactLimit: 0, iterations: 40_000, rng: createRng(1) });
    expect(mc.exact).toBe(false);
    expect(Math.abs(mc.equity[0]! - 0.8195)).toBeLessThan(0.01);
  });
});

describe('matematyka', () => {
  it('pot odds i MDF zgodne z tabelami z dokumentu 08', () => {
    expect(requiredEquity(100, 50)).toBeCloseTo(0.25);
    expect(requiredEquity(100, 100)).toBeCloseTo(1 / 3);
    expect(mdf(100, 33)).toBeCloseTo(0.752, 2);
    expect(mdf(100, 100)).toBeCloseTo(0.5);
    expect(alpha(100, 60)).toBeCloseTo(0.375);
  });
  it('szanse trafienia: kolor 35,0% / 19,6%, OESD 31,5% / 17,4%, gutshot 16,5% / 8,7%', () => {
    expect(hitProbability(9, 47, 2)).toBeCloseTo(0.35, 3);
    expect(hitProbability(9, 46, 1)).toBeCloseTo(0.196, 3);
    expect(hitProbability(8, 47, 2)).toBeCloseTo(0.315, 3);
    expect(hitProbability(4, 47, 2)).toBeCloseTo(0.165, 3);
    expect(hitProbability(4, 46, 1)).toBeCloseTo(0.087, 3);
  });
  it('rozmiar geometryczny pozwala dojść do all-in', () => {
    fc.assert(
      fc.property(fc.double({ min: 1, max: 200, noNaN: true }), fc.double({ min: 1, max: 500, noNaN: true }), fc.integer({ min: 1, max: 3 }), (pot, stack, n) => {
        const f = geometricBetFraction(pot, stack, n);
        let p = pot;
        let s = stack;
        for (let i = 0; i < n; i++) {
          const bet = f * p;
          s -= bet;
          p += 2 * bet;
        }
        return Math.abs(s) < 1e-6 * stack;
      }),
    );
  });
});

describe('zakresy', () => {
  it('169 klas, 1326 kombinacji', () => {
    expect(HAND_CLASSES).toHaveLength(169);
    expect(rangeStats(HAND_CLASSES).combos).toBe(1326);
  });
  it('parser notacji', () => {
    expect(parseRange('22+')).toHaveLength(13);
    expect(parseRange('A2s+')).toHaveLength(12);
    expect(parseRange('KTo+')).toEqual(['KQo', 'KJo', 'KTo']);
    expect(parseRange('77-99')).toEqual(['99', '88', '77']);
    expect(parseRange('A5s-A2s')).toEqual(['A5s', 'A4s', 'A3s', 'A2s']);
    expect(() => parseRange('AK')).toThrow();
  });
  it('klasa kombinacji wraca do swojej klasy', () => {
    for (const hc of HAND_CLASSES) for (const [a, b] of classCombos(hc)) expect(classOf(a, b)).toBe(hc);
  });
  it('pozycje w siatce są unikalne', () => {
    const keys = new Set(HAND_CLASSES.map((hc) => JSON.stringify(gridPosition(hc))));
    expect(keys.size).toBe(169);
    expect(gridPosition('AA')).toEqual({ row: 0, col: 0 });
    expect(gridPosition('AKs')).toEqual({ row: 0, col: 1 });
    expect(gridPosition('AKo')).toEqual({ row: 1, col: 0 });
  });
});

describe('outy i generatory', () => {
  it('kolor 9 outów, OESD 8, gutshot 4', () => {
    expect(drawOuts(parseCards('Ah 5h'), parseCards('Kh 8h 3c')).all).toHaveLength(9);
    expect(drawOuts(parseCards('8c 9d'), parseCards('6s 7h Kd')).all).toHaveLength(8);
    expect(drawOuts(parseCards('5c 6d'), parseCards('8s 9h Kd')).all).toHaveLength(4);
  });
  it('generator outów zwraca żądany typ i właściwą liczbę outów', () => {
    const rng = createRng(3);
    for (const kind of ['flush', 'oesd', 'gutshot'] as const) {
      for (let i = 0; i < 30; i++) {
        const s = generateOuts(rng, kind);
        expect(s.draw.kind).toBe(kind);
        expect(s.outs).toBe(kind === 'flush' ? 9 : kind === 'oesd' ? 8 : 4);
      }
    }
  });
  it('decyzja z dobieraniem porównuje szansę z ceną', () => {
    const rng = createRng(11);
    for (let i = 0; i < 100; i++) {
      const s = generateDrawCall(rng);
      expect(s.correct).toBe(s.hitToRiver > s.required ? 'call' : 'fold');
      expect(Math.abs(s.hitToRiver - s.required)).toBeGreaterThanOrEqual(0.02);
    }
  });
  it('pot odds w generatorze', () => {
    const rng = createRng(5);
    for (let i = 0; i < 50; i++) {
      const s = generatePotOdds(rng);
      expect(s.required).toBeCloseTo(s.bet / (s.pot + 2 * s.bet));
    }
  });
});

describe('pomiar wydajności (NFR-03)', () => {
  it('liczy sensowne equity i zwraca komplet pomiarów', async () => {
    const { runBenchmark } = await import('../src/bench');
    const r = runBenchmark(() => Date.now(), 3, 1000);
    expect(r.equityRunsMs).toHaveLength(3);
    // AA vs KK przed flopem: ok. 82% (dokument 08), Monte Carlo 20 tys. prób mieści się w ±1,5 pp
    expect(Math.abs(r.equityCheck - 0.8195)).toBeLessThan(0.015);
    expect(r.evalsPerSecond).toBeGreaterThan(0);
  });
});
