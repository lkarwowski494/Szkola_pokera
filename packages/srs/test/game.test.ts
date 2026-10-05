import { describe, expect, it } from 'vitest';
import { cardsToIntroduce, familiesToRecall, GAME_CARDS, gameCardId, gameOutcome, isGameCard, newCardCandidates, outcomeToRating, Rating } from '../src';

const DAY = 24 * 60 * 60 * 1000;

describe('karty z gry M13', () => {
  it('kartę tworzą tylko błąd, niedokładność i przekroczony czas, jedna na klucz deduplikacji', () => {
    const f = [
      { dedupeKey: 'a', verdict: 'mistake' },
      { dedupeKey: 'a', verdict: 'inaccuracy' },
      { dedupeKey: 'b', verdict: 'acceptable' },
      { dedupeKey: 'c', verdict: 'compliant' },
      { dedupeKey: 'd', verdict: 'unrated' },
      { dedupeKey: 'e', verdict: 'timeout' },
      { dedupeKey: 'f', verdict: 'inaccuracy' },
    ];
    expect(newCardCandidates(f, new Set(['f'])).map((x) => x.dedupeKey)).toEqual(['a', 'e']);
    expect(isGameCard(gameCardId('a'))).toBe(true);
    expect(isGameCard('m2.outs.flush')).toBe(false);
  });

  it('dzienny limit liczy też nowe karty z zadań; nadmiar czeka', () => {
    expect(cardsToIntroduce(5, 0, 10)).toBe(5);
    expect(cardsToIntroduce(15, 0, 10)).toBe(10);
    expect(cardsToIntroduce(15, 7, 10)).toBe(3);
    expect(cardsToIntroduce(15, 12, 10)).toBe(0);
    expect(cardsToIntroduce(3, 0)).toBe(Math.min(3, GAME_CARDS.dailyNew));
  });

  it('reguła „3 razy”: trzy błędy w 30 dniach przywracają rodzinę; czas i zgodne się nie liczą', () => {
    const now = 100 * DAY;
    const f = (family: string, verdict: string, daysAgo: number) => ({ family, verdict, decidedAt: now - daysAgo * DAY });
    const rows = [
      f('x', 'mistake', 1),
      f('x', 'inaccuracy', 10),
      f('x', 'mistake', 29),
      f('y', 'mistake', 1),
      f('y', 'mistake', 2),
      f('y', 'mistake', 31),
      f('z', 'mistake', 1),
      f('z', 'timeout', 2),
      f('z', 'timeout', 3),
      f('w', 'compliant', 1),
    ];
    expect(familiesToRecall(rows, now)).toEqual(['x']);
  });

  it('werdykt powtórki daje ocenę FSRS jak w zadaniach', () => {
    expect(outcomeToRating(gameOutcome('mistake', 2000)!)).toBe(Rating.Again);
    expect(outcomeToRating(gameOutcome('inaccuracy', 2000)!)).toBe(Rating.Again);
    expect(outcomeToRating(gameOutcome('acceptable', 2000)!)).toBe(Rating.Hard);
    expect(outcomeToRating(gameOutcome('compliant', 5000)!)).toBe(Rating.Good);
    expect(gameOutcome('unrated', 2000)).toBeNull();
  });
});
