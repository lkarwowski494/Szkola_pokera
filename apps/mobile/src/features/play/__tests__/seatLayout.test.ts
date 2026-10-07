import { FELT_MIN_HEIGHT, seatLayout, type Box } from '../seatLayout';

const overlap = (a: Box, b: Box) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

describe('układ miejsc przy stole (tryb gry M13)', () => {
  // iPhone 375 pt minus marginesy ekranu stołu (space.m po obu stronach); 320 pt jako zapas
  const widths = [375 - 2 * 12, 343, 320];
  const heights = [FELT_MIN_HEIGHT, 420];
  for (const players of [6, 9]) {
    for (const W of widths) {
      for (const H of heights) {
        it(`${players} graczy, sukno ${W}×${H} pt: wszystko w granicach, bez nakładania`, () => {
          const l = seatLayout(players, W, H);
          expect(l.seats).toHaveLength(players);
          for (const b of [...l.seats, l.board]) {
            expect(b.x).toBeGreaterThanOrEqual(0);
            expect(b.x + b.w).toBeLessThanOrEqual(W + 1e-9);
            expect(b.y).toBeGreaterThanOrEqual(0);
            expect(b.y + b.h).toBeLessThanOrEqual(H + 1e-9);
          }
          for (let i = 0; i < l.seats.length; i++) {
            expect(overlap(l.seats[i]!, l.board)).toBe(false);
            for (let j = i + 1; j < l.seats.length; j++) expect(overlap(l.seats[i]!, l.seats[j]!)).toBe(false);
          }
        });
      }
    }
  }

  it('gracz siedzi u dołu pośrodku, a 9-osobowy stół ma zwarte pola i małe karty wspólne', () => {
    for (const players of [6, 9]) {
      const l = seatLayout(players, 351, 300);
      const hero = l.seats[0]!;
      expect(hero.x + hero.w / 2).toBeCloseTo(351 / 2, 6);
      expect(hero.y + hero.h).toBeCloseTo(300, 6);
    }
    expect(seatLayout(9, 351, 300)).toMatchObject({ compact: true, boardSize: 'sm' });
    expect(seatLayout(6, 351, 300)).toMatchObject({ compact: false, boardSize: 'md' });
  });
});
