// 08-N2, N3, N4, N7 (sesja DX): wyrocznie niezależne od implementacji (rachunek wprost z definicji, klasy z rang i kolorów).
import { describe, expect, it } from 'vitest';
import { defendVsCbet, FULL_DECK, isoSizeOptions, isoSizeStandardBb, listHandVerdicts, parseCards, rankOf, riverCatchAction, suitOf, type Card } from '../src';

const ISO = { base: 3, perLimper: 1, oopExtra: 1 };

describe('08-N3: iso-size (R-M4-012)', () => {
  it('standard = base + n × perLimper (+ oopExtra bez pozycji)', () => {
    for (const n of [1, 2, 3]) {
      expect(isoSizeStandardBb(ISO, n, false)).toBe(3 + n);
      expect(isoSizeStandardBb(ISO, n, true)).toBe(3 + n + 1);
    }
  });
  it('rozmiary 0,8× i 1,6× to niedokładność, standard zgodny', () => {
    const o = isoSizeOptions(ISO, 2, false);
    expect(o.map((x) => x.action)).toEqual(['raise', 'raise-small', 'raise-big']);
    expect(o.map((x) => x.bb)).toEqual([5, 4, 8]);
    expect(o.map((x) => x.verdict)).toEqual(['compliant', 'inaccuracy', 'inaccuracy']);
  });
});

// wyrocznia N2: klasa ręki z rang i kolorów, bez classifyHolding
const H = (s: string): [Card, Card] => parseCards(s) as [Card, Card];
describe('08-N2: obrona BB wobec c-betu (R-M6-006, R-M6-007)', () => {
  it('mały c-bet 1/3: para → call, ręka bez pary i drawa → fold, as jako najwyższa karta → call', () => {
    expect(defendVsCbet(H('Ks 7d'), parseCards('Kh 8c 2d'), 1 / 3)).toBe('call'); // para
    expect(defendVsCbet(H('9h 7d'), parseCards('Kh 8c 2d'), 1 / 3)).toBe('fold'); // powietrze
    expect(defendVsCbet(H('Ah 5d'), parseCards('Kh 8c 2d'), 1 / 3)).toBe('call'); // as w ręce (najwyższa karta ręki)
    expect(defendVsCbet(H('Ah 5d'), parseCards('Qh 8c 2d'), 1 / 3)).toBe('call');
    expect(defendVsCbet(H('Jh Th'), parseCards('Qd 8c 2s'), 1 / 3)).toBe('fold'); // jednokolorowe, ale flop bez ich koloru: brak backdoora
    expect(defendVsCbet(H('Jh Th'), parseCards('Qh 8c 2s'), 1 / 3)).toBe('call'); // backdoor kolorowy z wysokimi kartami (flop ma 1 kartę koloru)
  });
  it('duży c-bet 3/4: dwie wysokie bez pary i drawa → fold; para i draw → call', () => {
    expect(defendVsCbet(H('Qh Jd'), parseCards('Ks 8c 2d'), 0.75)).toBe('fold');
    expect(defendVsCbet(H('Ks 7d'), parseCards('Kh 8c 2d'), 0.75)).toBe('call');
    expect(defendVsCbet(H('Jh Th'), parseCards('2h 8h 3d'), 0.75)).toBe('call'); // kolor (draw)
  });
  it('as na suchym flopie z królem przy dużym c-becie: wariant odrzucany', () => {
    expect(defendVsCbet(H('Ah 5d'), parseCards('Kh 8c 2d'), 0.75)).toBeNull();
  });
  it('10 000 losowań: wynik zgodny z wyrocznią z rang i kolorów', () => {
    let seed = 12345;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    for (let n = 0; n < 10000; n++) {
      const d = [...FULL_DECK];
      for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [d[i], d[j]] = [d[j]!, d[i]!]; }
      const hero: [Card, Card] = [d[0]!, d[1]!];
      const flop = [d[2]!, d[3]!, d[4]!];
      const frac = n % 2 ? 1 / 3 : 0.75;
      const r = defendVsCbet(hero, flop, frac);
      const ranks = flop.map(rankOf);
      const pair = hero.some((c) => ranks.includes(rankOf(c))) || rankOf(hero[0]) === rankOf(hero[1]);
      const suited = suitOf(hero[0]) === suitOf(hero[1]);
      const flush = suited && flop.filter((c) => suitOf(c) === suitOf(hero[0])).length >= 2;
      const set = [...new Set([...hero.map(rankOf), ...ranks])].sort((a, b) => a - b);
      let open = false; // strit otwarty: cztery kolejne rangi z kartą gracza, z obu stron wolne miejsce (bez koła)
      for (let lo = 1; lo + 3 <= 11; lo++) {
        const w = [0, 1, 2, 3].map((k) => lo + k);
        if (w.every((x) => set.includes(x)) && hero.some((c) => w.includes(rankOf(c)))) open = true;
      }
      if (pair || flush || open) { expect(r ?? 'call', `${hero} ${flop}`).toBe('call'); }
    }
  });
});

describe('08-N4: lista rąk (R-M4-010)', () => {
  const lista = [{ hands: ['AA', 'KK'], correct: '4bet' }, { hands: ['AKs', 'AKo'], correct: '4bet', acceptable: ['call'] }];
  it('oczekiwana akcja z listy; ręka spoza listy → null', () => {
    expect(listHandVerdicts('KK', lista)).toEqual({ correct: '4bet', acceptable: [] });
    expect(listHandVerdicts('AKs', lista)).toEqual({ correct: '4bet', acceptable: ['call'] });
    expect(listHandVerdicts('72o', lista)).toBeNull();
  });
});

describe('08-N7: bluff-catcher na riverze (R-M8-010)', () => {
  it('call, gdy udział blefów > bet ÷ (pula + 2·bet) z marginesem; fold poniżej; w marginesie null', () => {
    const pot = 100, bet = 50; // próg 50/200 = 0,25
    expect(riverCatchAction(0.4, pot, bet, 0.05)).toBe('call');
    expect(riverCatchAction(0.1, pot, bet, 0.05)).toBe('fold');
    expect(riverCatchAction(0.27, pot, bet, 0.05)).toBeNull();
    expect(riverCatchAction(0.23, pot, bet, 0.05)).toBeNull();
  });
});
