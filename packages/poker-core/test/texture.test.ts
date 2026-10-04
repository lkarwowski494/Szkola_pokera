import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  classifyFlop,
  createRng,
  generateFlop,
  generateTextureSpot,
  hitProbability,
  missProbability,
  parseCards,
  rankOf,
  suitOf,
  TEXTURE_AXES,
  TEXTURE_VALUES,
  textureMatches,
  type Card,
} from '../src';

const flopArb = fc.uniqueArray(fc.integer({ min: 0, max: 51 }), { minLength: 3, maxLength: 3 });

/** Wzorzec niezależny od klasyfikatora: czy istnieją dwie rangi, które z flopem dają pięć kolejnych rang. */
function referenceStraightPossible(flop: readonly Card[]): boolean {
  const board = new Set(flop.map(rankOf));
  if (board.size < 3) return false;
  for (let a = 0; a < 13; a++) {
    for (let b = a; b < 13; b++) {
      const all = new Set([...board, a, b]);
      const has = (r: number) => all.has(r === -1 ? 12 : r);
      for (let top = 12; top >= 3; top--) {
        let ok = true;
        for (let k = 0; k < 5; k++) if (!has(top - k)) ok = false;
        // strit musi używać wszystkich trzech kart flopu, bo gracz ma tylko dwie karty
        if (ok && [...board].every((r) => [0, 1, 2, 3, 4].some((k) => (top - k === -1 ? 12 : top - k) === r))) return true;
      }
    }
  }
  return false;
}

const tex = (s: string) => classifyFlop(parseCards(s));

describe('tekstura flopa', () => {
  it('przykłady z lekcji', () => {
    expect(tex('Ks 7d 2c')).toMatchObject({ height: 'high', suits: 'rainbow', ranks: 'disconnected', wetness: 'dry' });
    expect(tex('Ah 7d 2c')).toMatchObject({ height: 'high', ranks: 'disconnected', wetness: 'dry' });
    expect(tex('Jh Th 8c')).toMatchObject({ height: 'middle', suits: 'two-tone', ranks: 'connected', wetness: 'wet' });
    expect(tex('8s 7s 6s')).toMatchObject({ height: 'low', suits: 'monotone', ranks: 'connected', wetness: 'wet' });
    expect(tex('Qd Qc 6h')).toMatchObject({ height: 'high', ranks: 'paired', wetness: 'dry' });
    expect(tex('9h 8d 7c')).toMatchObject({ height: 'low', suits: 'rainbow', ranks: 'connected', wetness: 'medium' });
    expect(tex('Ah 5d 3c').ranks).toBe('connected'); // as jako 1: 2 i 4 dają strita od asa do piątki
    expect(tex('Ah Kd Tc').ranks).toBe('connected'); // QJ daje strita do asa
    expect(tex('Ah Kd 9c').ranks).toBe('disconnected');
    expect(tex('7h 7d 7c')).toMatchObject({ ranks: 'paired', trips: true });
    expect(tex('Kh 8h 3h')).toMatchObject({ suits: 'monotone', ranks: 'disconnected', wetness: 'medium' });
  });

  it('nie zależy od kolejności kart ani od zamiany kolorów', () => {
    fc.assert(
      fc.property(flopArb, fc.constantFrom([1, 2, 3, 0], [3, 2, 1, 0], [2, 0, 3, 1]), (flop, perm) => {
        const base = classifyFlop(flop);
        const mapped = flop.map((c) => (c & ~3) | perm[c & 3]!);
        expect(classifyFlop(flop.slice().reverse())).toEqual(base);
        expect(classifyFlop(mapped)).toEqual(base);
      }),
    );
  });

  it('kolory, para i wysokość zgadzają się z definicją', () => {
    fc.assert(
      fc.property(flopArb, (flop) => {
        const t = classifyFlop(flop);
        const suits = new Set(flop.map(suitOf)).size;
        const ranks = new Set(flop.map(rankOf)).size;
        expect(t.suits).toBe(suits === 3 ? 'rainbow' : suits === 2 ? 'two-tone' : 'monotone');
        expect(t.ranks === 'paired').toBe(ranks < 3);
        expect(t.trips).toBe(ranks === 1);
        const top = Math.max(...flop.map(rankOf));
        expect(t.top).toBe(top);
        expect(t.height).toBe(top >= 10 ? 'high' : top >= 8 ? 'middle' : 'low');
      }),
      { numRuns: 2000 },
    );
  });

  it('flop połączony wtedy i tylko wtedy, gdy dwie karty gracza mogą dać strita (wzorzec brute force)', () => {
    fc.assert(
      fc.property(flopArb, (flop) => {
        const t = classifyFlop(flop);
        expect(t.straightPossible).toBe(referenceStraightPossible(flop));
        expect(t.ranks === 'connected').toBe(t.straightPossible);
      }),
      { numRuns: 1500 },
    );
  });

  it('mokrość to liczba dróg do dobierania: kolor + strit', () => {
    fc.assert(
      fc.property(flopArb, (flop) => {
        const t = classifyFlop(flop);
        const draws = (t.suits === 'rainbow' ? 0 : 1) + (t.ranks === 'connected' ? 1 : 0);
        expect(t.wetness).toBe(['dry', 'medium', 'wet'][draws]);
        if (t.ranks === 'paired') expect(t.wetness).not.toBe('wet');
      }),
    );
  });

  it('generator spełnia filtr i daje trzy różne karty', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1_000_000 }),
        fc.constantFrom(...TEXTURE_AXES),
        fc.nat(2),
        (seed, axis, vi) => {
          const value = TEXTURE_VALUES[axis][vi]!;
          const s = generateFlop(createRng(seed), { [axis]: [value] });
          expect(new Set(s.flop).size).toBe(3);
          expect(s.texture[axis]).toBe(value);
          expect(textureMatches(classifyFlop(s.flop), { [axis]: [value] })).toBe(true);
        },
      ),
      { numRuns: 200 },
    );
  });

  it('niespełnialny filtr kończy się błędem, a nie pętlą', () => {
    expect(() => generateFlop(createRng(1), { suits: ['monotone'], ranks: ['paired'] })).toThrow();
  });

  it('ćwiczenie klasyfikacji pokazuje rzadkie tekstury często', () => {
    const rng = createRng(11);
    let mono = 0;
    const n = 600;
    for (let i = 0; i < n; i++) if (generateTextureSpot(rng, ['suits']).texture.suits === 'monotone') mono++;
    // naturalnie ok. 5% flopów; przy losowaniu wartości osi ok. 1/3
    expect(mono / n).toBeGreaterThan(0.2);
  });
});

describe('szansa chybienia', () => {
  it('ręka bez pary nie trafia pary na flopie w ok. 67,6% przypadków', () => {
    expect(missProbability(6, 50, 3)).toBeCloseTo(13244 / 19600, 10);
  });
  it('dla jednej i dwóch kart zgadza się z hitProbability', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 20 }), fc.integer({ min: 40, max: 50 }), (outs, unseen) => {
        expect(1 - missProbability(outs, unseen, 1)).toBeCloseTo(hitProbability(outs, unseen, 1), 12);
        expect(1 - missProbability(outs, unseen, 2)).toBeCloseTo(hitProbability(outs, unseen, 2), 12);
      }),
    );
  });
});
