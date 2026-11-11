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

// wyrocznia N2: klasa ręki z rang i kolorów, bez classifyHolding (D-1116; recenzja EC 08-programista-001/002/003)
const H = (s: string): [Card, Card] => parseCards(s) as [Card, Card];
const F = (s: string): Card[] => parseCards(s);
const RANK_A = 12;
const RANK_T = 8;

/** Rangi z asem także jako 1 (indeks −1), do okien strita. */
const rangiZAsem = (cards: readonly Card[]): Set<number> => new Set(cards.flatMap((c) => (rankOf(c) === RANK_A ? [RANK_A, -1] : [rankOf(c)])));
/** Najwięcej rang z kart (gracza + stół) w oknie pięciu kolejnych rang zawierającym kartę gracza: 4 = gutshot lub strit otwarty, 3 = backdoor strita. */
function najlepszeOkno(hero: readonly Card[], flop: readonly Card[]): number {
  const wszystkie = rangiZAsem([...hero, ...flop]);
  const reka = rangiZAsem(hero);
  let max = 0;
  for (let lo = -1; lo + 4 <= RANK_A; lo++) {
    const okno = [0, 1, 2, 3, 4].map((k) => lo + k);
    if (okno.some((r) => reka.has(r))) max = Math.max(max, okno.filter((r) => wszystkie.has(r)).length);
  }
  return max;
}
/** Najwięcej kart jednego koloru z udziałem karty gracza: 4 = draw do koloru, 3 = backdoor koloru. */
function najlepszyKolor(hero: readonly Card[], flop: readonly Card[]): number {
  let max = 0;
  for (let suit = 0; suit < 4; suit++) {
    if (hero.some((c) => suitOf(c) === suit)) max = Math.max(max, [...hero, ...flop].filter((c) => suitOf(c) === suit).length);
  }
  return max;
}
function oczekiwana(hero: [Card, Card], flop: Card[], frac: number): 'call' | 'fold' | null | 'call-lub-null' | 'fold-lub-null' {
  if (frac > 0.4 && frac < 0.7) return null;
  const ranks = flop.map(rankOf);
  const para = hero.some((c) => ranks.includes(rankOf(c))) || rankOf(hero[0]) === rankOf(hero[1]);
  const okno = najlepszeOkno(hero, flop);
  const kolor = najlepszyKolor(hero, flop);
  const draw = kolor >= 4 || okno >= 4;
  const backdoor = kolor === 3 || okno === 3;
  const czysta = !para && !draw && !backdoor; // „bez pary i bez drawa”, także bez backdoora
  const dwieWysokie = hero.every((c) => rankOf(c) >= RANK_T);
  if (frac > 0.4) return czysta && dwieWysokie ? 'fold' : null;
  const as = hero.some((c) => rankOf(c) === RANK_A);
  if (para || kolor >= 4 || as) return 'call'; // para, draw do koloru (9 outów), as w ręce
  if (czysta) return 'fold';
  return 'call-lub-null'; // gutshot, strit otwarty (call od 8 outów), backdoor: źródło nie rozstrzyga lub call z kolorowego backdoora
}

describe('08-N2: obrona BB wobec c-betu (R-M6-006, R-M6-007)', () => {
  it('mały c-bet 1/3: para → call, powietrze → fold, as jako najwyższa karta → call', () => {
    expect(defendVsCbet(H('Ks 7d'), F('Kh 8c 2d'), 1 / 3)).toBe('call'); // para
    expect(defendVsCbet(H('9h 3d'), F('Kh 7c 2d'), 1 / 3)).toBe('fold'); // powietrze: bez pary, drawa i backdoora
    expect(defendVsCbet(H('Ah 5d'), F('Kh 8c 2d'), 1 / 3)).toBe('call'); // as w ręce
    expect(defendVsCbet(H('Jh Th'), F('Qh 8c 2s'), 1 / 3)).toBe('call'); // backdoor kolorowy z wysokimi kartami (flop ma 1 kartę koloru)
  });
  it('08-programista-001: gutshot i backdoor strita bez pary nie dostają „fold” wobec małego c-betu (R-M6-006: „bez pary i bez drawa”)', () => {
    expect(defendVsCbet(H('Jd Tc'), F('Qh 8c 2s'), 1 / 3)).toBeNull(); // gutshot
    expect(defendVsCbet(H('5d 4c'), F('Kh 7c 3s'), 1 / 3)).toBeNull(); // gutshot (A–5 koło: 3,4,5 + brak) lub backdoor
    expect(defendVsCbet(H('Kd Qd'), F('Jh 7c 2s'), 0.33)).toBeNull(); // backdoor strita z dwoma wysokimi
    expect(defendVsCbet(H('7h 6h'), F('Kc 9h 2s'), 1 / 3)).toBeNull(); // niskie karty jednego koloru: backdoor, ale nie „wysokie karty”
    expect(defendVsCbet(H('Jh Th'), F('Qd 8c 2s'), 1 / 3)).toBeNull(); // jednokolorowe, flop bez ich koloru, ale J-T-Q to backdoor strita
  });
  it('08-programista-002: duży c-bet ≥ 3/4 — para i draw poza zakresem R-M6-007 → null; tylko dwie wysokie karty bez pary, drawa i backdoora → fold', () => {
    expect(defendVsCbet(H('2d 2c'), F('Ah Kc Qs'), 0.75)).toBeNull(); // underpara
    expect(defendVsCbet(H('3d 2c'), F('Ah Kc 2s'), 0.75)).toBeNull(); // niska para
    expect(defendVsCbet(H('Ks 7d'), F('Kh 8c 2d'), 0.75)).toBeNull(); // top para
    expect(defendVsCbet(H('Jh Th'), F('2h 8h 3d'), 0.75)).toBeNull(); // draw do koloru
    expect(defendVsCbet(H('Qh Jd'), F('7c 3d 2s'), 0.75)).toBe('fold'); // dwie wysokie, czyste
    expect(defendVsCbet(H('Qh Jd'), F('Ks 8c 2d'), 0.75)).toBeNull(); // K-Q-J: backdoor strita
    expect(defendVsCbet(H('9h 3d'), F('Kh 7c 2d'), 0.75)).toBeNull(); // powietrze, ale nie dwie wysokie karty (R-M6-007 mówi o dwóch wysokich)
    expect(defendVsCbet(H('Ah 5d'), F('Kh 8c 2d'), 0.75)).toBeNull(); // wyjątek źródła: as na suchym flopie z królem
  });
  it('granice rozmiaru: 0,4 to mały, 0,7 to duży, pomiędzy null; zły rozmiar to błąd', () => {
    expect(defendVsCbet(H('9h 3d'), F('Kh 7c 2d'), 0.4)).toBe('fold');
    expect(defendVsCbet(H('Qh Jd'), F('7c 3d 2s'), 0.7)).toBe('fold');
    for (const f of [0.41, 0.55, 0.69]) expect(defendVsCbet(H('9h 3d'), F('Kh 7c 2d'), f)).toBeNull();
    for (const f of [0, -0.5, Number.NaN, Infinity]) expect(() => defendVsCbet(H('9h 3d'), F('Kh 7c 2d'), f)).toThrow(/rozmiar c-betu/);
  });
  it('backdoor kolorowy tylko z obiema kartami ≥ T i dokładnie jedną kartą koloru na flopie', () => {
    expect(defendVsCbet(H('Jh Th'), F('Qh 8c 2s'), 1 / 3)).toBe('call');
    expect(defendVsCbet(H('Th 4h'), F('Kh 9c 2s'), 1 / 3)).toBeNull(); // 4h niska: nie „wysokie karty”
    expect(defendVsCbet(H('Jh Th'), F('Qh 8h 2s'), 1 / 3)).toBe('call'); // dwie karty koloru na flopie = draw do koloru (9 outów)
  });
  it('wyrocznia 20 000 losowań (rangi i kolory, trzy wartości): fold i call tylko tam, gdzie reguła je daje; reszta null albo call z drawu', () => {
    let seed = 12345;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    const licznik = { call: 0, fold: 0, nul: 0 };
    for (let n = 0; n < 20000; n++) {
      const d = [...FULL_DECK];
      for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [d[i], d[j]] = [d[j]!, d[i]!]; }
      const hero: [Card, Card] = [d[0]!, d[1]!];
      const flop = [d[2]!, d[3]!, d[4]!];
      const frac = [1 / 3, 0.75, 0.5][n % 3]!;
      const r = defendVsCbet(hero, flop, frac);
      const o = oczekiwana(hero, flop, frac);
      const opis = `${hero} | ${flop} | ${frac} → ${r}`;
      if (o === 'call-lub-null') expect(r === 'call' || r === null, opis).toBe(true);
      else expect(r, opis).toBe(o);
      licznik[r === 'call' ? 'call' : r === 'fold' ? 'fold' : 'nul']++;
    }
    expect(licznik.call).toBeGreaterThan(500);
    expect(licznik.fold).toBeGreaterThan(300);
    expect(licznik.nul).toBeGreaterThan(500);
  });
});

describe('08-programista-006: strażniki wejścia', () => {
  it('iso-size: parametry nieskończone lub limperzy < 1 to błąd', () => {
    expect(() => isoSizeStandardBb({ base: Number.NaN, perLimper: 1, oopExtra: 1 }, 1, false)).toThrow(/isoSizeStandardBb/);
    expect(() => isoSizeStandardBb(ISO, 0, false)).toThrow(/isoSizeStandardBb/);
    expect(() => isoSizeStandardBb(ISO, 1.5, false)).toThrow(/isoSizeStandardBb/);
  });
  it('lista rąk: klasa w dwóch wpisach to błąd, a nie cichy wybór pierwszego', () => {
    expect(() => listHandVerdicts('AA', [{ hands: ['AA'], correct: '4bet' }, { hands: ['AA', 'KK'], correct: 'call' }])).toThrow(/klasa AA w 2 wpisach/);
  });
  it('bluff-catcher: udział blefów poza [0, 1] i ujemny margines to błąd', () => {
    for (const x of [-0.1, 1.1, Number.NaN]) expect(() => riverCatchAction(x, 100, 50, 0.05)).toThrow(/riverCatchAction/);
    expect(() => riverCatchAction(0.3, 100, 50, -0.01)).toThrow(/riverCatchAction/);
  });
});

describe('08-programista-005: jedno źródło wzoru iso-size', () => {
  it('opcje iso (0,8× i 1,6×) z tej samej listy co size-spot generatora: standard 5 → 4 i 8', () => {
    expect(isoSizeOptions(ISO, 2, false).map((o) => o.bb)).toEqual([5, 4, 8]);
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
  it('08-programista-003: dokładnie na granicy marginesu odpowiedź istnieje, w progu bez marginesu „call” wymaga udziału większego od ceny', () => {
    // pula 2, bet 1: próg 1/4, margines 1/8: liczby dokładne w binarnym zapisie
    expect(riverCatchAction(0.375, 2, 1, 0.125)).toBe('call'); // |0,375 − 0,25| = 0,125, nie mniej niż margines
    expect(riverCatchAction(0.125, 2, 1, 0.125)).toBe('fold');
    expect(riverCatchAction(0.25, 2, 1, 0.125)).toBeNull(); // dokładnie na progu, w marginesie
    expect(riverCatchAction(0.25, 2, 1, 0)).toBe('fold'); // bez marginesu udział równy cenie to nie „więcej niż”
    expect(riverCatchAction(0.2500001, 2, 1, 0)).toBe('call');
  });
  it('szerszy margines (×2) już odrzuca wynik: 0,375 przy marginesie 0,25 to null', () => {
    expect(riverCatchAction(0.375, 2, 1, 0.25)).toBeNull();
  });
});
