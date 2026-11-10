// BR-GEN-001…003 (D-531, D-533): generator wariantów. Wyrocznia niezależna od generatora: zliczanie outów przez przejście
// po wszystkich nieznanych kartach i sprawdzanie 5-kartowych podzbiorów wzorcowym evaluatorem, cena z definicji (zakład / (pula + 2 × zakład)).
import { describe, expect, it } from 'vitest';
import {
  BET_FRACTIONS, classifyFlop, FULL_DECK, generateVariant, permuteCard, rankOf, SUIT_PERMUTATIONS, TemplateError, textureMatches, variantFingerprint,
  type GeneratorTemplate, type ScenarioLevel, type ScenarioVariant,
} from '../src';
import type { Card } from '../src';
import { referenceScore } from './reference-evaluator';

const POZIOMY: ScenarioLevel[] = ['latwy', 'sredni', 'trudny'];
const WSZYSTKIE_DRAWY = ['flush', 'oesd', 'gutshot'] as const;
const POZIOMY_GRANIC = {
  latwy: { draws: WSZYSTKIE_DRAWY, marginMin: 0.1, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['fold'] },
  sredni: { draws: WSZYSTKIE_DRAWY, marginMin: 0.02, marginMax: 0.1, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['fold'] },
  trudny: { draws: WSZYSTKIE_DRAWY, marginMin: 0.0001, marginMax: 0.02, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['call'] },
} as const;
// Szablony testowe (nie treść dla użytkownika): A — jedna decyzja na flopie, B — linia flop → brak trafienia na turnie → druga decyzja.
const SZABLON_A: GeneratorTemplate = {
  id: 'test-a', levels: POZIOMY_GRANIC,
  decisions: [{ street: 'flop', pots: [20, 40, 60, 100], fractions: BET_FRACTIONS }],
};
const SZABLON_B: GeneratorTemplate = {
  id: 'test-b', levels: { latwy: { ...POZIOMY_GRANIC.latwy, expected: ['fold', 'fold'] }, sredni: { ...POZIOMY_GRANIC.sredni, expected: ['fold', 'call'] } },
  decisions: [{ street: 'flop', pots: [20, 40, 60], fractions: BET_FRACTIONS }, { street: 'turn', pots: [], fractions: BET_FRACTIONS }],
};

// Wyrocznia: out = nieznana karta, po której istnieje 5-kartowy podzbiór z kartą gracza dający strita, kolor albo pokera,
// a sam stół z tą kartą (jeśli ma 5 kart) tego nie daje.
function wyroczniaOuty(hero: readonly Card[], board: readonly Card[]): Card[] {
  const znane = new Set([...hero, ...board]);
  const kat = (k: Card[]) => referenceScore(k)[0]!;
  const dobre = (k: Card[]) => [4, 5, 8].includes(kat(k));
  const podzbiory = (karty: Card[]): Card[][] => {
    const out: Card[][] = [];
    const rec = (start: number, acc: Card[]) => {
      if (acc.length === 5) { out.push([...acc]); return; }
      for (let i = start; i < karty.length; i++) rec(i + 1, [...acc, karty[i]!]);
    };
    rec(0, []);
    return out;
  };
  const czyDaje = (karty: Card[]) => podzbiory(karty).some((p) => p.some((c) => hero.includes(c)) && dobre(p));
  if (czyDaje([...hero, ...board])) return []; // gotowe, to nie draw
  return FULL_DECK.filter((c) => !znane.has(c)).filter((c) => {
    const z = [...board, c];
    if (z.length === 5 && dobre(z)) return false;
    return czyDaje([...hero, ...board, c]);
  });
}

function sprawdz(v: ScenarioVariant, s: GeneratorTemplate, poziom: ScenarioLevel): void {
  const wszystkie = [...v.hero, ...v.villain, ...v.board];
  expect(new Set(wszystkie).size).toBe(9); // karty ustalone i różne przed pierwszą decyzją (BR-GEN-001)
  expect(v.board).toHaveLength(5);
  const g = s.levels[poziom]!;
  expect(textureMatches(classifyFlop(v.board.slice(0, 3)), g.flop ?? {})).toBe(true);
  let pula = v.decisions[0]!.pot;
  v.decisions.forEach((d, i) => {
    const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
    const outy = wyroczniaOuty(v.hero, stol);
    expect(d.outs).toBe(outy.length);
    const szansa = outy.length / (52 - 2 - stol.length);
    const cena = d.bet / (pula + 2 * d.bet);
    expect(d.pot).toBe(pula);
    expect(d.correct).toBe(szansa > cena ? 'call' : 'fold'); // wyrocznia decyzji
    expect(d.correct).toBe(g.expected[i]); // ocena oczekiwana z szablonu (BR-GEN-003, D-556)
    const odl = Math.abs(szansa - cena);
    expect(odl).toBeGreaterThan(0);
    if (poziom === 'latwy') expect(odl).toBeGreaterThanOrEqual(0.1); // BR-GEN-003: ≥ 10 pp
    if (poziom === 'sredni') expect(odl).toBeGreaterThanOrEqual(0.02); // ≥ 2 pp
    if (poziom === 'trudny') expect(odl).toBeLessThan(0.02); // 0–2 pp
    if (g.reject.includes('rywal-ma-out-gracza')) expect(v.villain.some((c) => outy.includes(c))).toBe(false);
    if (g.reject.includes('stol-sparowany')) expect(new Set(v.board.slice(0, 3).map(rankOf)).size).toBe(3);
    if (i < s.decisions.length - 1) pula += 2 * d.bet;
  });
  expect(v.decisions).toHaveLength(s.decisions.length);
  if (s.decisions.length === 2) {
    // linia: po sprawdzeniu na flopie karta turnu nie trafia (BR: „brak trafienia”)
    expect(wyroczniaOuty(v.hero, v.board.slice(0, 3))).not.toContain(v.board[3]);
  }
}

describe('generator wariantów: poprawna decyzja niezmienna w granicach (BR-GEN-003, D-533)', () => {
  for (const [nazwa, szablon] of [['A', SZABLON_A], ['B', SZABLON_B]] as const) {
    for (const poziom of POZIOMY) {
      if (!szablon.levels[poziom]) continue;
      it(`szablon ${nazwa}, poziom ${poziom}: 10 000 losowań zgodnych z wyrocznią`, () => {
        for (let seed = 1; seed <= 10_000; seed++) sprawdz(generateVariant(szablon, poziom, seed), szablon, poziom);
      }, 600_000);
    }
  }
});

describe('generator wariantów: ziarno i odcisk (BR-GEN-001, D-531)', () => {
  it('to samo ziarno daje to samo rozdanie, inne ziarna dają różne', () => {
    expect(generateVariant(SZABLON_A, 'sredni', 77)).toEqual(generateVariant(SZABLON_A, 'sredni', 77));
    const kart = new Set(Array.from({ length: 50 }, (_, i) => generateVariant(SZABLON_A, 'sredni', i + 1).board.join()));
    expect(kart.size).toBeGreaterThan(40);
  });
  it('odcisk nie zależy od permutacji kolorów, a zależy od rang', () => {
    const v = generateVariant(SZABLON_A, 'latwy', 5);
    const cards = [...v.hero, ...v.board];
    const widoczny = v.board.slice(0, 3); // szablon A: decyzja tylko na flopie, odcisk obejmuje flop
    const baza = variantFingerprint('x', 'latwy', v.hero, widoczny);
    expect(baza).toBe(v.fingerprint.replace(/^test-a\|/, 'x|'));
    for (const p of SUIT_PERMUTATIONS) {
      const h = v.hero.map((c) => permuteCard(c, p));
      const b = widoczny.map((c) => permuteCard(c, p));
      expect(variantFingerprint('x', 'latwy', h, b)).toBe(baza);
    }
    const inne = generateVariant(SZABLON_A, 'latwy', 6);
    expect(inne.fingerprint === v.fingerprint && cards.join() !== [...inne.hero, ...inne.board].join()).toBe(false);
    expect(variantFingerprint('x', 'sredni', v.hero, widoczny)).not.toBe(baza);
  });
  it('szablon niespełnialny: błąd szablonu po 1000 odrzuceniach z rzędu, bez wariantu', () => {
    const zly: GeneratorTemplate = { id: 'zly', levels: { latwy: { ...POZIOMY_GRANIC.latwy, marginMin: 0.99, marginMax: null } }, decisions: SZABLON_A.decisions };
    expect(() => generateVariant(zly, 'latwy', 1)).toThrow(TemplateError);
  });
  it('oczekiwana akcja nieosiągalna w granicach poziomu: błąd szablonu, nie wariant z inną oceną (BR-GEN-003, D-556)', () => {
    // łatwy (≥ 10 pp) przy zakładzie 2 × pula: cena 40% — „call” niemożliwy
    const nieosiagalny: GeneratorTemplate = {
      id: 'nieosiagalny', levels: { latwy: { ...POZIOMY_GRANIC.latwy, expected: ['call'] } },
      decisions: [{ street: 'flop', pots: [20, 40], fractions: [2] }],
    };
    expect(() => generateVariant(nieosiagalny, 'latwy', 1)).toThrow(TemplateError);
  });
  it('liczba oczekiwanych akcji różna od liczby punktów decyzji to błąd szablonu', () => {
    const zly: GeneratorTemplate = { id: 'zly2', levels: { latwy: { ...POZIOMY_GRANIC.latwy, expected: ['fold', 'fold'] } }, decisions: SZABLON_A.decisions };
    expect(() => generateVariant(zly, 'latwy', 1)).toThrow(TemplateError);
  });
  it('poziom, którego szablon nie ma, to błąd', () => {
    expect(() => generateVariant(SZABLON_B, 'trudny', 1)).toThrow(TemplateError);
  });
  it('pojemność: co najmniej 40 różnych odcisków na poziom (BR-GEN-002 c, dolna granica z 5000 losowań)', () => {
    for (const s of [SZABLON_A, SZABLON_B]) {
      for (const poziom of POZIOMY) {
        if (!s.levels[poziom]) continue;
        const odciski = new Set<string>();
        for (let seed = 1; seed <= 5000; seed++) odciski.add(generateVariant(s, poziom, seed).fingerprint);
        expect(odciski.size).toBeGreaterThanOrEqual(40);
      }
    }
  }, 600_000);
});
