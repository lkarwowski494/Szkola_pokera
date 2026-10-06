import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { classifyHolding, createRng, dealCards, parseCards, type Card } from '../src';

const h = (hole: string, board: string) => classifyHolding(parseCards(hole) as unknown as [Card, Card], parseCards(board));

describe('siła ręki po flopie (model bota)', () => {
  it('rozpoznaje rodzaje par i klasy', () => {
    expect(h('As Kd', 'Ac 7h 2s')).toMatchObject({ pairKind: 'top', kicker: 11, cls: 'strong' });
    expect(h('As 4d', 'Ac 7h 2s')).toMatchObject({ pairKind: 'top', cls: 'medium' });
    expect(h('Qs Qd', 'Jc 7h 2s')).toMatchObject({ pairKind: 'overpair', cls: 'strong' });
    expect(h('9s 9d', 'Jc 7h 2s')).toMatchObject({ pairKind: 'second', cls: 'medium' });
    expect(h('5s 5d', 'Jc 7h 6s')).toMatchObject({ pairKind: 'underpair', cls: 'weak' });
    expect(h('7s 6d', 'Jc 7h 2s')).toMatchObject({ pairKind: 'second', cls: 'medium' });
    expect(h('2c 3d', 'Jc 7h 2s')).toMatchObject({ pairKind: 'low', cls: 'weak' });
    expect(h('7s 7d', 'Jc 7h 2s').cls).toBe('very-strong');
    expect(h('Jd 7s', 'Jc 7h 2s').cls).toBe('very-strong');
    expect(h('Ah Kh', 'Qh 7h 2s')).toMatchObject({ cls: 'draw' });
    expect(h('9h 8h', 'Th 7h 2s').cls).toBe('strong'); // kolor + strit otwarty: 15 outów
    expect(h('9s 8d', 'Tc 7h 2s').cls).toBe('draw');
    expect(h('Ks Qd', '9c 7h 2s').cls).toBe('air');
    expect(h('Ks 2d', '9c 7h 4s').cls).toBe('air');
    expect(h('As 2d', '9c 7h 4s').cls).toBe('weak');
  });

  it('para ze stołu nie jest siłą gracza; para gracza obok pary ze stołu to jedna para', () => {
    expect(h('As Kd', '7c 7h 2s')).toMatchObject({ improvesBoard: false, pairKind: null, cls: 'weak' });
    expect(h('2c Kd', '7c 7h 2s')).toMatchObject({ pairKind: 'second', cls: 'medium' });
    expect(h('Qs Jd', '5c 5h 5s 5d Qh')).toMatchObject({ improvesBoard: false });
  });

  it('na riverze nie ma drawów; zamiana kolorów nie zmienia klasy', () => {
    expect(h('Ah Kh', 'Qh 7h 2s 3c 4d').draw).toBeNull();
    fc.assert(
      fc.property(fc.integer({ min: 3, max: 5 }), fc.integer(), (n, seed) => {
        const cards = dealCards(createRng(seed), 2 + n);
        const perm = [2, 0, 3, 1];
        const sw = (c: Card) => (c & ~3) | perm[c & 3]!;
        const a = classifyHolding([cards[0]!, cards[1]!], cards.slice(2));
        const b = classifyHolding([sw(cards[0]!), sw(cards[1]!)], cards.slice(2).map(sw));
        expect(b.cls).toBe(a.cls);
        expect(b.pairKind).toBe(a.pairKind);
      }),
      { numRuns: 500 },
    );
  });
});
