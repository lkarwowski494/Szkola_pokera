// 08-EX-6 (sesja HO, SC-18/SC-21, R-M7-001/003/005): punkt `turn-action` — zakład albo czekanie na turnie z pozycji. Wyrocznia niezależna od generatora i holding.ts:
// klasa karty turnu i para z rang i kolorów kart, nie z classifyHolding. Ręka z zakresu otwarcia pozycji gracza (spot rfi.btn).
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, stolZeStritem, variantFingerprint, HAND_CLASSES, rankOf, suitOf, TemplateError, type GeneratorContext, type GeneratorTemplate, type LevelBounds } from '../src';

const ctx: GeneratorContext = {
  spots: [{ id: 'rfi.btn', uncertain: [], actions: [
    { label: 'raise', freqs: HAND_CLASSES.map(() => 1) },
    { label: 'fold', freqs: HAND_CLASSES.map(() => 0) },
  ] }],
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
};
const rainbow = { suits: ['rainbow'] } as const;
const poziomPrzeciwNadkarcie = (extra: Partial<LevelBounds> = {}): LevelBounds => ({ draws: [], reject: ['stol-sparowany'], flop: rainbow, expected: ['bet-big'], turnClass: 'overcard', flopMiss: true, pairKind: ['top'], ...extra });
const poziomSrednia = (extra: Partial<LevelBounds> = {}): LevelBounds => ({ draws: [], reject: ['stol-sparowany'], flop: rainbow, expected: ['check'], turnClass: 'other', flopHighMin: 'K', pairKind: ['second'], ...extra });
const szablon = (b: LevelBounds): GeneratorTemplate => ({
  id: 'sc-ho-turn',
  stackBb: 100,
  positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: b },
  decisions: [{ kind: 'turn-action', street: 'turn' }],
});
const LOSOWANIA = 400;
const R = '23456789TJQKA';

// niezależne: rodzaje par z rang (bez classifyHolding)
function paraNaTurnie(hero: readonly number[], board4: readonly number[]): 'top' | 'second' | 'low' | 'overpair' | 'underpair' | 'inna' {
  const [a, b] = hero as [number, number];
  const rangi = [...new Set(board4)].sort((x, y) => y - x);
  if (a === b) return a > rangi[0]! ? 'overpair' : a > (rangi[1] ?? -1) ? 'second' : 'underpair';
  const trafione = [a, b].filter((r) => rangi.includes(r));
  if (trafione.length !== 1) return 'inna';
  return trafione[0] === rangi[0] ? 'top' : trafione[0] === rangi[1] ? 'second' : 'low';
}
// HT (D-1750): „turn bez możliwego strita na stole” = żadne trzy różne rangi z czterech kart stołu nie mieszczą się w oknie pięciu kolejnych rang (as jako 1 albo 14),
// czyli `straightPossible` liczone na stole turnu. Oracle z rang, bez texture.ts.
function stritMozliwyNaStole(rangi: readonly number[]): boolean {
  const r = [...new Set(rangi)];
  for (let lo = 1; lo <= 10; lo++) {
    const wOknie = r.filter((x) => (x === 12 ? [14, 1] : [x + 2]).some((p) => p >= lo && p <= lo + 4));
    if (wOknie.length >= 3) return true;
  }
  return false;
}

describe('HT D-1750: oracle strita na stole turnu', () => {
  it('przykład GW: flop J-8-5 + turn T: J, T, 8 w oknie 7–J, więc strit możliwy (stary filtr „cztery w oknie” go przepuszczał)', () => {
    const R2 = (s: string) => [...s].map((c) => R.indexOf(c));
    expect(stritMozliwyNaStole(R2('J85T'))).toBe(true);
    expect(stritMozliwyNaStole(R2('J85A'))).toBe(false);
    expect(stritMozliwyNaStole(R2('K72A'))).toBe(false);
    expect(stritMozliwyNaStole(R2('A532'))).toBe(true); // as jako 1
  });
  it('generator nie zwraca turnu J-8-5 + T (3 rangi w oknie 5)', () => {
    expect(stolZeStritem([...'J85T'].map((c) => R.indexOf(c)))).toBe(true);
  });
});

describe('08-EX-6: turn-action', () => {
  for (const [nazwa, b] of [
    ['SC-18 Ś: turn-nadkarta paruje kartę gracza, flop bez pary', poziomPrzeciwNadkarcie()],
    ['SC-21 Ś: druga para na turnie (nie nadkarta)', poziomSrednia()],
    ['SC-21 Ł: niska para na turnie', poziomSrednia({ pairKind: ['low'] })],
  ] as const) {
    it(`${nazwa}: ${LOSOWANIA} wariantów spełnia niezmienniki`, () => {
      const t = szablon(b);
      for (let seed = 1; seed <= LOSOWANIA; seed++) {
        const v = generateVariant(t, 'latwy', seed, ctx);
        const p = v.points[0];
        expect(p?.point).toBe('turn-action');
        if (p?.point !== 'turn-action') return;
        const flop = v.board.slice(0, 3);
        const turn = v.board[3]!;
        const board4 = v.board.slice(0, 4).map(rankOf);
        const rF = flop.map(rankOf);
        expect(new Set(flop.map(suitOf)).size).toBe(3); // flop tęczowy
        expect(new Set(rF).size).toBe(3); // niesparowany
        expect(rF).not.toContain(rankOf(turn)); // turn nie paruje stołu
        const kolory = [0, 1, 2, 3].map((s) => v.board.slice(0, 4).filter((c) => suitOf(c) === s).length);
        expect(Math.max(...kolory)).toBeLessThan(3); // brak trzeciej karty koloru
        expect(stritMozliwyNaStole(board4)).toBe(false);
        const nadkarta = rankOf(turn) > Math.max(...rF);
        expect(nadkarta).toBe(b.turnClass === 'overcard');
        const rodzaj = paraNaTurnie(v.hero.map(rankOf), board4);
        expect(b.pairKind).toContain(rodzaj);
        expect(p.pairKind).toBe(rodzaj);
        expect(p.correct).toBe(b.expected[0]);
        if (b.flopMiss) expect(paraNaTurnie(v.hero.map(rankOf), rF)).toBe('inna'); // flop bez pary z kartą gracza (para kieszonkowa też wyklucza: 'inna' tylko dla braku pary)
        if (b.flopHighMin) expect(Math.max(...rF)).toBeGreaterThanOrEqual(R.indexOf(b.flopHighMin));
        expect(classOf(v.hero[0], v.hero[1])).toBeTruthy();
        expect(v.board).toHaveLength(5);
      }
    }, 300_000);
  }
  it('ten sam seed daje ten sam wariant; odcisk zawiera turn', () => {
    const t = szablon(poziomPrzeciwNadkarcie());
    const a = generateVariant(t, 'latwy', 5, ctx);
    expect(generateVariant(t, 'latwy', 5, ctx)).toEqual(a);
    expect(a.fingerprint).toBe(variantFingerprint(t.id, 'latwy', a.hero, a.board.slice(0, 4)));
  });
  it('błędy szablonu: brak zakresu, zła akcja oczekiwana, brak turnClass, brak pairKind', () => {
    expect(() => generateVariant(szablon(poziomSrednia()), 'latwy', 1)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziomSrednia({ expected: ['bet-small'] })), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziomSrednia({ turnClass: undefined })), 'latwy', 1, ctx)).toThrow(TemplateError);
    expect(() => generateVariant(szablon(poziomSrednia({ pairKind: undefined })), 'latwy', 1, ctx)).toThrow(TemplateError);
  });
});
