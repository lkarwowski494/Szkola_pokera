import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { dueCards, interleave, newCard, outcomeToRating, Rating, review } from '../src';

const DAY = 86_400_000;

describe('srs', () => {
  it('mapuje wynik na ocenę', () => {
    expect(outcomeToRating({ correct: false, elapsedMs: 1000 })).toBe(Rating.Again);
    expect(outcomeToRating({ correct: true, elapsedMs: 9000 })).toBe(Rating.Hard);
    expect(outcomeToRating({ correct: true, elapsedMs: 5000 })).toBe(Rating.Good);
    expect(outcomeToRating({ correct: true, elapsedMs: 2000 })).toBe(Rating.Easy);
  });

  it('po poprawnej odpowiedzi termin nigdy nie jest w przeszłości', () => {
    fc.assert(
      fc.property(fc.array(fc.record({ correct: fc.boolean(), elapsedMs: fc.integer({ min: 200, max: 20000 }) }), { minLength: 1, maxLength: 15 }), (outcomes) => {
        let now = Date.UTC(2026, 9, 2);
        let card = newCard('m2.outs.flush', now);
        for (const o of outcomes) {
          const r = review(card, o, now);
          if (o.correct && r.card.due < now) return false;
          card = r.card;
          now = Math.max(now + 60_000, card.due);
        }
        return true;
      }),
    );
  });

  it('dobre odpowiedzi wydłużają odstęp, błąd go skraca', () => {
    let now = Date.UTC(2026, 9, 2);
    let card = newCard('f', now);
    for (let i = 0; i < 4; i++) {
      card = review(card, { correct: true, elapsedMs: 4000 }, now).card;
      now = card.due;
    }
    const goodInterval = card.due - now;
    const lapsed = review(card, { correct: false, elapsedMs: 4000 }, now).card;
    expect(card.scheduledDays).toBeGreaterThan(1);
    expect(lapsed.due - now).toBeLessThan(Math.max(goodInterval, card.scheduledDays * DAY));
    expect(lapsed.lapses).toBe(card.lapses + 1);
  });

  it('wybiera zaległe rodziny od najstarszej', () => {
    const now = 10 * DAY;
    const a = { ...newCard('a', 0), due: 5 * DAY };
    const b = { ...newCard('b', 0), due: 2 * DAY };
    const c = { ...newCard('c', 0), due: 20 * DAY };
    expect(dueCards([a, b, c], now).map((x) => x.familyId)).toEqual(['b', 'a']);
  });

  it('przeplatanie nie stawia tej samej rodziny dwa razy z rzędu, gdy jest wybór', () => {
    const order = interleave(['a', 'b', 'c'], 3);
    expect(order).toHaveLength(9);
    for (let i = 1; i < order.length; i++) expect(order[i]).not.toBe(order[i - 1]);
  });
});
