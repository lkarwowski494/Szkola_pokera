import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  cardsToString,
  classifyFlop,
  drawOuts,
  FULL_DECK,
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
  WETNESS_POINTS,
  WETNESS_THRESHOLDS,
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

/** Wzorzec niezależny od klasyfikatora: czy jakaś ręka (dwie karty) ma na tym flopie dobieranie do strita (drawOuts). */
function referenceStraightDraw(flop: readonly Card[]): boolean {
  const free = (r: number, used: readonly Card[]) => FULL_DECK.filter((c) => rankOf(c) === r && !used.includes(c));
  for (let a = 0; a < 13; a++) {
    for (let b = a; b < 13; b++) {
      const c1 = free(a, flop)[0];
      if (c1 === undefined) continue;
      const c2 = free(b, [...flop, c1])[0];
      if (c2 === undefined) continue;
      if (drawOuts([c1, c2], flop).straight.length > 0) return true;
    }
  }
  return false;
}

/** Wszystkie strategicznie różne flopy (z dokładnością do zamiany kolorów): 1755. */
function canonicalFlops(): Card[][] {
  const perms: number[][] = [];
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) for (let c = 0; c < 4; c++) for (let d = 0; d < 4; d++) {
    if (new Set([a, b, c, d]).size === 4) perms.push([a, b, c, d]);
  }
  const seen = new Map<string, Card[]>();
  for (let x = 0; x < 52; x++) for (let y = x + 1; y < 52; y++) for (let z = y + 1; z < 52; z++) {
    const keys = perms.map((p) => [x, y, z].map((c) => (c & ~3) | p[c & 3]!).sort((m, n) => m - n).join(','));
    const key = keys.sort()[0]!;
    if (!seen.has(key)) seen.set(key, [x, y, z]);
  }
  return [...seen.values()];
}

describe('tekstura flopa', () => {
  it('przykłady z lekcji i z audytu', () => {
    expect(tex('Ks 7d 2c')).toMatchObject({ height: 'high', suits: 'rainbow', ranks: 'disconnected', wetness: 'dry', wetnessPoints: 0 });
    expect(tex('Kh Qd 4c')).toMatchObject({ ranks: 'semi-connected', wetness: 'dry', wetnessPoints: 1, straightDrawPossible: true });
    expect(tex('Jc Td 4s')).toMatchObject({ height: 'middle', ranks: 'semi-connected', wetness: 'dry' });
    expect(tex('7d 6c 2h')).toMatchObject({ height: 'low', ranks: 'semi-connected', wetness: 'dry' });
    expect(tex('Ah 7d 2c')).toMatchObject({ height: 'high', ranks: 'semi-connected', wetness: 'dry' }); // A i 2 w oknie A–5
    expect(tex('Jh Th 8c')).toMatchObject({ height: 'middle', suits: 'two-tone', ranks: 'connected', wetness: 'wet', wetnessPoints: 4 });
    expect(tex('8s 7s 6s')).toMatchObject({ height: 'low', suits: 'monotone', ranks: 'connected', wetness: 'wet' });
    expect(tex('9h 8d 7c')).toMatchObject({ height: 'low', suits: 'rainbow', ranks: 'connected', wetness: 'wet', wetnessPoints: 3 });
    expect(tex('Kh 8h 3h')).toMatchObject({ suits: 'monotone', ranks: 'disconnected', wetness: 'medium', wetnessPoints: 2 });
    expect(tex('Kh 8h 4h')).toMatchObject({ suits: 'monotone', ranks: 'semi-connected', wetness: 'wet' });
    expect(tex('Qd Qc 6h')).toMatchObject({ height: 'high', ranks: 'paired', wetness: 'dry', straightDrawPossible: false });
    expect(tex('Qd Qh 6h')).toMatchObject({ suits: 'two-tone', ranks: 'paired', wetness: 'dry', wetnessPoints: 1 });
    expect(tex('Jd Jc Ts')).toMatchObject({ ranks: 'paired', straightDrawPossible: true, wetness: 'dry', wetnessPoints: 1 });
    expect(tex('Jd Jh Th')).toMatchObject({ ranks: 'paired', wetness: 'medium', wetnessPoints: 2 });
    expect(tex('Ah 5d 3c').ranks).toBe('connected'); // as jako 1: 2 i 4 dają strita od asa do piątki
    expect(tex('Ah Kd Tc').ranks).toBe('connected'); // QJ daje strita do asa
    expect(tex('Ah Kd 9c').ranks).toBe('semi-connected'); // QJ albo QT dają dobieranie do strita
    expect(tex('7h 7d 7c')).toMatchObject({ ranks: 'paired', trips: true, straightDrawPossible: false, wetness: 'dry' });
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

  // Test wyczerpujący po wszystkich 1755 strategicznie różnych flopach (rangi × układ kolorów):
  // połączony ⇔ strit możliwy, półpołączony/sparowany z dobieraniem ⇔ istnieje ręka z dobieraniem do strita.
  const canon = canonicalFlops();
  it('jest dokładnie 1755 strategicznie różnych flopów', () => {
    expect(canon.length).toBe(1755);
  });

  it('połączony ⇔ strit możliwy; dwie rangi w oknie pięciu ⇔ istnieje ręka z dobieraniem do strita (wszystkie 1755 flopów)', () => {
    for (const flop of canon) {
      const t = classifyFlop(flop);
      const draw = referenceStraightDraw(flop);
      expect(t.straightPossible, cardsToString(flop)).toBe(referenceStraightPossible(flop));
      expect(t.ranks === 'connected').toBe(t.straightPossible);
      expect(t.straightDrawPossible, cardsToString(flop)).toBe(draw);
      if (t.ranks !== 'paired') expect(t.ranks === 'disconnected', cardsToString(flop)).toBe(!draw);
    }
  });

  it('rozłączone są tylko flopy Q72, K72, K82 i K83 (w dowolnych kolorach)', () => {
    const shapes = new Set(canon.filter((f) => classifyFlop(f).ranks === 'disconnected').map((f) => cardsToString(f).replace(/[shdc]/g, '').split(' ').sort().join('')));
    expect([...shapes].sort()).toEqual(['27K', '27Q', '28K', '38K']);
  });

  it('mokrość to suma punktów za strita i kolory, z progami', () => {
    fc.assert(
      fc.property(flopArb, (flop) => {
        const t = classifyFlop(flop);
        const straight = t.straightPossible ? 'made' : t.straightDrawPossible ? 'draw' : 'none';
        const points = WETNESS_POINTS.straight[straight] + WETNESS_POINTS.suits[t.suits];
        expect(t.wetnessPoints).toBe(points);
        expect(t.wetness).toBe(points >= WETNESS_THRESHOLDS.wet ? 'wet' : points >= WETNESS_THRESHOLDS.medium ? 'medium' : 'dry');
        if (t.ranks === 'paired') expect(t.wetness).not.toBe('wet');
        if (t.ranks === 'connected') expect(t.wetness).toBe('wet');
      }),
    );
  });

  it('generator spełnia filtr i daje trzy różne karty', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1_000_000 }),
        fc.constantFrom(...TEXTURE_AXES),
        fc.nat(3),
        (seed, axis, vi) => {
          const values = TEXTURE_VALUES[axis];
          const value = values[vi % values.length]!;
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
