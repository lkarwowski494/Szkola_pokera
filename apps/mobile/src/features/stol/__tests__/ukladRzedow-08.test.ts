/// <reference types="jest" />
// D-476 (błąd układu stołu w ocenie, build 1009): stół z trzema rzędami kart (rywal 2 + board 5 + gracz 2) przepełniał owal
// i karty gracza zasłaniały tekst pod stołem. Układ jest liczony czystą funkcją: wysokość sukna z liczby rzędów, rozmiar kart
// zmniejszany (lg → md → sm), gdy rząd nie mieści się w szerokości sukna. Szerokości: iPhone 390 pt i wąski 320 pt.
import { odstep } from '@/theme/tokeny';
import { SZEROKOSC_KARTY, szerokoscRzedu, ukladRzedow, type RzedyStolu } from '@/features/stol/ukladRzedow';

const TRZY: RzedyStolu = { opp: 2, board: 5, hero: 2 };
const PODPIS = 21; // przypis.line (tokeny.ts)
const EKRANY = [320, 390, 430];
/** Szerokość pola stołu jak w `Stol`: ekran − 2 × odstep.l (Screen) ; padding poziomy pola liczy sama funkcja. */
const pole = (ekran: number) => ekran - 2 * odstep.l;

describe('układ rzędów stołu (D-476)', () => {
  it.each(EKRANY)('ekran %i pt: wysokość sukna ≥ suma rzędów, podpisów i odstępów (karty nie wychodzą poza stół)', (ekran) => {
    const u = ukladRzedow(pole(ekran), TRZY);
    const wysokosci = { sm: 30, md: 56, lg: 72 } as const;
    const tresc = wysokosci[u.opp] + wysokosci[u.board] + wysokosci[u.hero] + 2 * PODPIS + 4 * odstep.s;
    expect(u.wysokoscSukna).toBeGreaterThanOrEqual(tresc + 2 * odstep.l);
    expect(u.wysokoscRamy).toBeGreaterThanOrEqual(u.wysokoscSukna);
  });

  it.each(EKRANY)('ekran %i pt: każdy rząd mieści się w szerokości sukna (5 kart board)', (ekran) => {
    const u = ukladRzedow(pole(ekran), TRZY);
    for (const r of ['opp', 'board', 'hero'] as const) expect(szerokoscRzedu(TRZY[r], u[r])).toBeLessThanOrEqual(u.szerokoscSukna);
  });

  it('wąski 320 pt: board schodzi do mniejszych kart, 390 pt: board zostaje „md”', () => {
    expect(ukladRzedow(pole(320), TRZY).board).not.toBe('lg');
    expect(SZEROKOSC_KARTY[ukladRzedow(pole(320), TRZY).board]).toBeLessThan(SZEROKOSC_KARTY.md + 1);
    expect(ukladRzedow(pole(390), TRZY).board).toBe('md');
  });

  it('dwa rzędy (board + gracz) i jeden rząd nie rosną ponad potrzebę: wysokość ≥ proporcji 1,7:1 i rośnie z liczbą rzędów', () => {
    const w = pole(390);
    const jeden = ukladRzedow(w, { opp: 0, board: 0, hero: 2 });
    const dwa = ukladRzedow(w, { opp: 0, board: 3, hero: 2 });
    const trzy = ukladRzedow(w, TRZY);
    expect(jeden.wysokoscRamy).toBeLessThanOrEqual(dwa.wysokoscRamy);
    expect(dwa.wysokoscRamy).toBeLessThanOrEqual(trzy.wysokoscRamy);
    expect(jeden.wysokoscRamy).toBeGreaterThanOrEqual(Math.floor(jeden.szerokoscRamy / 1.7));
  });
});
