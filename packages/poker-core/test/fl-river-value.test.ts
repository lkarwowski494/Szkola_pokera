// 08-FD-4 (= 08-EX-1 + 08-EX-2, sesja FL; D-1302, D-1355): publiczne liczenie kombinacji klas z kartami martwymi (lepsze / gorsze / remis)
// i rodzaj river-value: w = W ÷ (W + L); bet ⇔ w ≥ 0,5 + δ, czekanie ⇔ w ≤ 0,5 − δ, pas ±δ → odrzucenie; ręka lepsza od gracza wśród pasujących → odrzucenie.
// Wyrocznia niezależna od generatora: (a) wektory wpisane z `docs/tresci/dowody/fd-wektory.txt` (rachunek odniesienia `fd_wektory.py`, ten sam plik),
// (b) pełne przejście po parach kart talii z classOf i evaluatorem 7 kart (generator używa classCombos).
import { describe, expect, it } from 'vitest';
import { classComboSplit, classOf, FULL_DECK, generateVariant, parseCards, riverValueVerdict, strength, TemplateError, type Card, type GeneratorTemplate } from '../src';

type Reka = readonly [Card, Card];
const R = (s: string): Reka => parseCards(s) as unknown as Reka;
const QQ = R('Qh Qd');
const STOL = parseCards('Js 8c 5d 3h 2s');

describe('08-EX-1: classComboSplit, wektory z fd-wektory.txt (QhQd na Js8c5d3h2s)', () => {
  it('G: sprawdza AJ KJ JT J9 88 55 → gorsze 48, lepsze 6, remisy 0; pasuje 76 → 16 kombinacji, 0 lepszych', () => {
    const v = classComboSplit(QQ, STOL, ['AJs', 'AJo', 'KJs', 'KJo', 'JTs', 'JTo', 'J9s', 'J9o', '88', '55']);
    expect(v).toEqual({ worse: 48, better: 6, ties: 0, total: 54 });
    expect(classComboSplit(QQ, STOL, ['76s', '76o'])).toEqual({ worse: 16, better: 0, ties: 0, total: 16 });
  });
  it('H: sprawdza AJ 88 55 JJ AA KK → gorsze 12, lepsze 21', () => {
    const v = classComboSplit(QQ, STOL, ['AJs', 'AJo', '88', '55', 'JJ', 'AA', 'KK']);
    expect([v.worse, v.better, v.ties]).toEqual([12, 21, 0]);
  });
  it('E: sprawdza AJ KJ 88 55 JJ AA KK → gorsze 24, lepsze 21', () => {
    const v = classComboSplit(QQ, STOL, ['AJs', 'AJo', 'KJs', 'KJo', '88', '55', 'JJ', 'AA', 'KK']);
    expect([v.worse, v.better, v.ties]).toEqual([24, 21, 0]);
  });
  it('D: A4 (strit A–5) wśród pasujących: 16 lepszych z 32; F: KK pasuje → 6 lepszych z 6', () => {
    expect(classComboSplit(QQ, STOL, ['76s', '76o', 'A4s', 'A4o'])).toEqual({ worse: 16, better: 16, ties: 0, total: 32 });
    expect(classComboSplit(QQ, STOL, ['KK'])).toEqual({ worse: 0, better: 6, ties: 0, total: 6 });
  });
  it('karty martwe: kombinacje z kartą gracza albo stołu nie są liczone (QQ przy QhQd: 1 kombinacja z 6; J przy Js na stole: 3 z 4 asów... )', () => {
    expect(classComboSplit(QQ, STOL, ['QQ']).total).toBe(1); // Qs Qc
    expect(classComboSplit(QQ, STOL, ['JJ']).total).toBe(3); // Js na stole: Jh Jd Jc
  });
  it('remis: ręka grająca stołem; gracz i rywal dzielą (osobny licznik, nie wygrana)', () => {
    const stol = parseCards('Ah Kh Qh Jh Th'); // strit kolor królewski na stole, gra każdy
    const v = classComboSplit(R('2c 3d'), stol, ['98o', '87o']);
    expect(v.ties).toBe(v.total);
    expect([v.worse, v.better]).toEqual([0, 0]);
  });
  it('wejście: nieznana klasa, duplikat klasy, karta gracza na stole i stół ≠ 5 kart to błąd', () => {
    expect(() => classComboSplit(QQ, STOL, ['XX'])).toThrow(/klasa/);
    expect(() => classComboSplit(QQ, STOL, ['AA', 'AA'])).toThrow(/powtórzon/);
    expect(() => classComboSplit(R('Js Qd'), STOL, ['AA'])).toThrow(/powtarza/);
    expect(() => classComboSplit(QQ, STOL.slice(0, 4), ['AA'])).toThrow(/5 kart/);
  });
  it('pełne przejście po talii zgadza się z funkcją dla 300 losowych układów (wyrocznia b)', () => {
    let s = 12345;
    const los = (n: number) => { s = (s * 1103515245 + 12345) % 2147483648; return s % n; };
    const klasy = ['AA', 'KK', 'AKs', 'AKo', 'QJs', '76s', '98o', 'T9s', '55', 'A4o'];
    for (let t = 0; t < 300; t++) {
      const talia = [...FULL_DECK];
      const karty: Card[] = [];
      for (let i = 0; i < 7; i++) karty.push(talia.splice(los(talia.length), 1)[0]!);
      const h: Reka = [karty[0]!, karty[1]!];
      const stol = karty.slice(2);
      let worse = 0, better = 0, ties = 0, total = 0;
      const martwe = new Set<Card>(karty);
      for (let a = 0; a < FULL_DECK.length; a++) for (let b = a + 1; b < FULL_DECK.length; b++) {
        const [x, y] = [FULL_DECK[a]!, FULL_DECK[b]!];
        if (martwe.has(x) || martwe.has(y) || !klasy.includes(classOf(x, y))) continue;
        total++;
        const [moja, jego] = [strength([...h, ...stol]), strength([x, y, ...stol])]; // mniejsza siła = lepsza ręka
        if (moja < jego) worse++; else if (moja > jego) better++; else ties++;
      }
      expect(classComboSplit(h, stol, klasy)).toEqual({ worse, better, ties, total });
    }
  });
});

describe('08-EX-2: riverValueVerdict (wektory fd-wektory.txt, δ = 0,05)', () => {
  it('G: w = 8/9 → bet; H: w = 4/11 → czekanie; E: w = 8/15 w pasie ±δ → null', () => {
    expect(riverValueVerdict({ worse: 48, better: 6, ties: 0, total: 54 }, 0.05)).toBe('bet');
    expect(riverValueVerdict({ worse: 12, better: 21, ties: 0, total: 33 }, 0.05)).toBe('check');
    expect(riverValueVerdict({ worse: 24, better: 21, ties: 0, total: 45 }, 0.05)).toBeNull();
  });
  it('granice włącznie: w = 0,55 przy δ 0,05 to bet, w = 0,45 to czekanie; tuż wewnątrz pasa null', () => {
    expect(riverValueVerdict({ worse: 11, better: 9, ties: 0, total: 20 }, 0.05)).toBe('bet');
    expect(riverValueVerdict({ worse: 9, better: 11, ties: 0, total: 20 }, 0.05)).toBe('check');
    expect(riverValueVerdict({ worse: 21, better: 19, ties: 0, total: 40 }, 0.05)).toBeNull(); // 0,525
  });
  it('remisy nie wpływają na w; brak sprawdzających (W + L = 0) to null', () => {
    expect(riverValueVerdict({ worse: 48, better: 6, ties: 500, total: 554 }, 0.05)).toBe('bet');
    expect(riverValueVerdict({ worse: 0, better: 0, ties: 9, total: 9 }, 0.05)).toBeNull();
  });
  it('δ < 0,02 (D-1051) i δ nieskończone to błąd', () => {
    expect(() => riverValueVerdict({ worse: 5, better: 1, ties: 0, total: 6 }, 0.01)).toThrow(/riverValueVerdict/);
    expect(() => riverValueVerdict({ worse: 5, better: 1, ties: 0, total: 6 }, Number.NaN)).toThrow(/riverValueVerdict/);
  });
});

// ---- generator ----
const CALLS_G = ['AJs', 'AJo', 'KJs', 'KJo', 'JTs', 'JTo', 'J9s', 'J9o', '88', '55', 'AKs', 'AKo', 'AQs', 'AQo', 'KQs', 'KQo'];
const FOLDS_G = ['76s', '65s', '54s', 'T9s', '98s'];
const szablon = (expected: 'bet' | 'check', delta = 0.05, extra: Record<string, unknown> = {}, calls = CALLS_G, folds = FOLDS_G): GeneratorTemplate => ({
  id: `sc-fx-rv-${expected}`,
  positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], expected: [expected], marginMin: delta } },
  decisions: [{ kind: 'river-value', street: 'river', calls, folds, ...extra }],
} as unknown as GeneratorTemplate);
const LOSOWANIA = 120;

describe('08-EX-2: generator river-value', () => {
  for (const expected of ['bet', 'check'] as const) {
    it(`${LOSOWANIA} wariantów „${expected}”: w z wyroczni po obu stronach progu, żadna pasująca ręka lepsza od gracza`, () => {
      for (let seed = 1; seed <= LOSOWANIA; seed++) {
        const v = generateVariant(szablon(expected), 'latwy', seed);
        const p = v.points[0];
        expect(p?.point).toBe('river-value');
        if (p?.point !== 'river-value') return;
        const hero: Reka = v.hero;
        const sprawdza = classComboSplit(hero, v.board, CALLS_G);
        expect([p.worse, p.better, p.ties]).toEqual([sprawdza.worse, sprawdza.better, sprawdza.ties]);
        const w = sprawdza.worse / (sprawdza.worse + sprawdza.better);
        expect(p.w).toBeCloseTo(w, 12);
        expect(p.correct).toBe(expected);
        if (expected === 'bet') expect(w).toBeGreaterThanOrEqual(0.55 - 1e-9); else expect(w).toBeLessThanOrEqual(0.45 + 1e-9);
        expect(classComboSplit(hero, v.board, FOLDS_G).better).toBe(0);
        expect(v.fingerprint).toBe(generateVariant(szablon(expected), 'latwy', seed).fingerprint); // odcisk deterministyczny dla ziarna
      }
    }, 120_000);
  }
  it('filtr ręki overpair i stół bez koloru (3 karty jednej barwy) i bez strita: SC-28 w miniaturze', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const v = generateVariant(szablon('bet', 0.05, { pairKind: ['overpair'], dryBoard: true }), 'latwy', seed);
      const [a, b] = v.hero;
      const rangi = v.board.map((c) => Math.floor(c / 4));
      expect(Math.floor(a / 4)).toBe(Math.floor(b / 4)); // para w ręce
      expect(Math.floor(a / 4)).toBeGreaterThan(Math.max(...rangi)); // wyższa od każdej karty stołu
      for (let su = 0; su < 4; su++) expect(v.board.filter((c) => c % 4 === su).length).toBeLessThanOrEqual(2);
    }
  }, 120_000);
  it('szablon: calls i folds niepuste, rozłączne, znane klasy; margines < 0,02 to błąd', () => {
    expect(() => generateVariant(szablon('bet', 0.05, {}, [], FOLDS_G), 'latwy', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon('bet', 0.05, {}, ['AA'], ['AA']), 'latwy', 1)).toThrow(/naraz/);
    expect(() => generateVariant(szablon('bet', 0.05, {}, ['ZZ'], ['AA']), 'latwy', 1)).toThrow(/nieznana klasa/);
    expect(() => generateVariant(szablon('bet', 0.01), 'latwy', 1)).toThrow(/margines/);
    expect(() => generateVariant(szablon('wait' as 'bet'), 'latwy', 1)).toThrow(/bet albo check/);
  });
});
