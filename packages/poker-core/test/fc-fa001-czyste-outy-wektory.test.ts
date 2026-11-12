// FC FA-001 (recenzja FA, 08-programista-001): wektory wpisane ręcznie dla czysteOuty (D-1286): remis rivera, brudny kolor, czysty kolor, czysty OESD.
// Zabijają mutanty M3 (usunięty warunek remisu) i M6 (nieosiągalny warunek remisu), które przeżyły testy generatora na fixture z samym kolorem.
// Oracle niezależna od czysteOuty: pełne przejście po talii z ewaluatorem 7 kart (strength), liczby W i T wpisane w oczekiwaniach.
import { describe, expect, it } from 'vitest';
import { analyseOutsSpot, czysteOuty, FULL_DECK, parseCards, strength, type Card } from '../src';

const wt = (hero: string, villain: string, board: string) => {
  const [h, v, b] = [parseCards(hero), parseCards(villain), parseCards(board)];
  const znane = new Set<Card>([...h, ...v, ...b]);
  let w = 0, t = 0;
  for (const c of FULL_DECK) {
    if (znane.has(c)) continue;
    const [r, g] = [strength([...v, ...b, c]), strength([...h, ...b, c])];
    if (r < g) w++; else if (r === g) t++;
  }
  const spot = analyseOutsSpot(v, b);
  return { w, t, n: spot?.outs ?? -1, kind: spot?.draw.kind, wynik: czysteOuty(h, v, b, spot?.draw.all ?? []) };
};

describe('FC FA-001: czysteOuty — wektory', () => {
  it('remis na riverze: 7d5s vs 5h3h na QsQh7hAs: W = 9 = N, ale T = 2 → odrzucone (M3, M6)', () => {
    const r = wt('7d 5s', '5h 3h', 'Qs Qh 7h As');
    expect([r.w, r.t, r.n, r.kind]).toEqual([9, 2, 9, 'flush']);
    expect(r.wynik).toBeNull();
  });
  it('remis na riverze: 7d4d vs 4c7c na 6sJc9cAd: W = 9 = N, T = 35 → odrzucone', () => {
    const r = wt('7d 4d', '4c 7c', '6s Jc 9c Ad');
    expect([r.w, r.t, r.n]).toEqual([9, 35, 9]);
    expect(r.wynik).toBeNull();
  });
  it('czysty kolor: AsKd vs QhJh na Ks8h5h2c: W = 9 = N, T = 0 → przyjęte, 9 kart kierowych', () => {
    const r = wt('As Kd', 'Qh Jh', 'Ks 8h 5h 2c');
    expect([r.w, r.t, r.n, r.kind]).toEqual([9, 0, 9, 'flush']);
    expect(r.wynik?.size).toBe(9);
  });
  it('brudny kolor: AhKd vs QhJh na Ks8h5h2c: kolor gracza zabija jeden out, W = 8 ≠ N = 9 → odrzucone', () => {
    const r = wt('Ah Kd', 'Qh Jh', 'Ks 8h 5h 2c');
    expect([r.w, r.t, r.n]).toEqual([8, 0, 9]);
    expect(r.wynik).toBeNull();
  });
  it('czysty OESD: AhAd vs 9c8d na Ts7h2cKd: W = 8 = N, T = 0 → przyjęte (ścieżka OESD D-1286)', () => {
    const r = wt('Ah Ad', '9c 8d', 'Ts 7h 2c Kd');
    expect([r.w, r.t, r.n, r.kind]).toEqual([8, 0, 8, 'oesd']);
    expect(r.wynik?.size).toBe(8);
  });
});
