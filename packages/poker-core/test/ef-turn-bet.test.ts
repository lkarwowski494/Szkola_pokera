// 08-N6 (sesja EF): zakład gracza na turnie z silną ręką wobec drawa rywala (R-M7-006, math): duży zakład (3/4 puli) odbiera drawowi cenę,
// mały (1/4) ją daje. Wyrocznia: cena bet ÷ (pula + 2·bet) i szansa koloru 9/46 liczone wprost w teście.
import { describe, expect, it } from 'vitest';
import { classifyHolding, generateVariant, rankOf, suitOf, TemplateError, type GeneratorTemplate } from '../src';

const szablon = (marginMin = 0.02, small = 0.25, big = 0.75, pots: number[] = [8, 16, 24, 40]): GeneratorTemplate => ({
  id: 'sc-fx-turn-bet',
  levels: { latwy: { draws: ['flush'], reject: [], marginMin, expected: ['bet-big'] } },
  decisions: [{ kind: 'turn-bet', street: 'turn', pots, small, big }],
});
const LOSOWANIA = 3_000;

describe('08-N6: turn-bet', () => {
  it(`${LOSOWANIA} wariantów: draw koloru rywala, cena z rachunku, duży zakład odbiera cenę, mały ją daje`, () => {
    const t = szablon();
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(t, 'latwy', seed);
      const p = v.points[0];
      expect(p?.point).toBe('turn-bet');
      if (p?.point !== 'turn-bet') return;
      const cena = (bet: number) => bet / (p.pot + 2 * bet);
      expect(p.requiredSmall).toBeCloseTo(cena(p.betSmall), 12);
      expect(p.requiredBig).toBeCloseTo(cena(p.betBig), 12);
      expect(p.betSmall).toBe(Math.round(p.pot * 0.25));
      expect(p.betBig).toBe(Math.round(p.pot * 0.75));
      // niezależnie: rywal ma 4 karty jednego koloru z kart własnych i stołu turnu (draw koloru), 9 outów z 46 nieznanych kart
      const turn = v.board.slice(0, 4);
      const kolory = [0, 1, 2, 3].map((s) => [...v.villain, ...turn].filter((c) => suitOf(c) === s).length);
      expect(Math.max(...kolory)).toBe(4);
      expect(p.hit).toBeCloseTo(9 / 46, 12);
      expect(p.hit).toBeGreaterThan(p.requiredSmall + 0.02 - 1e-12); // mały zakład: draw ma cenę
      expect(p.hit).toBeLessThan(p.requiredBig - 0.02 + 1e-12); // duży zakład: draw jej nie ma
      expect(p.correct).toBe('bet-big');
      // gracz ma co najmniej parę z kartą własną (silna ręka)
      const rangi = turn.map(rankOf);
      expect(rankOf(v.hero[0]) === rankOf(v.hero[1]) || v.hero.some((c) => rangi.includes(rankOf(c)))).toBe(true);
      // EI-002: klasa ręki gracza (bez „strong” z samych outów, EI-001) i brak poprawy stołu u rywala
      const h = classifyHolding(v.hero, turn);
      expect(h.cls === 'very-strong' || (h.cls === 'strong' && (h.pairKind === 'overpair' || h.pairKind === 'top')), `seed ${seed}: ${h.cls}/${h.pairKind}`).toBe(true);
      expect(classifyHolding(v.villain, turn).improvesBoard, `seed ${seed}: rywal poprawia stół`).toBe(false);
    }
  }, 120_000);
  it('odciski różnią się liczbą zakładów i pulą (zakład pokazany w decyzji)', () => {
    const t = szablon();
    expect(new Set(Array.from({ length: 300 }, (_x, s) => generateVariant(t, 'latwy', s + 1).fingerprint)).size).toBeGreaterThan(100);
  });
  it('niemożliwy rachunek (cena dużego zakładu poniżej szansy drawa) to błąd szablonu', () => {
    expect(() => generateVariant(szablon(0.02, 0.25, 0.3), 'latwy', 1)).toThrow(TemplateError);
  });
  it('EI-002: margines od progu dużego zakładu: pula 40, big 0,36 → zakład 14, cena 0,206, margines 0,010 < 0,02 → brak wariantów (błąd szablonu)', () => {
    expect(() => generateVariant(szablon(0.02, 0.25, 0.36, [40]), 'latwy', 1)).toThrow(TemplateError);
  });
  // D-1286: margines od progu dużego zakładu liczony od e = N/44 (równe outy 9: 0,2045), nie od hit = N/46; dawny wektor big 0,4 (cena 0,222, margines od e 0,018 < 0,02) nie daje już wariantów
  it('EI-002 (D-1286): tuż nad marginesem od progu dużego zakładu: pula 40, big 0,42 → zakład 17, cena 0,2297, margines od e = 9/44 0,025 ≥ 0,02 → warianty są', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const p = generateVariant(szablon(0.02, 0.25, 0.42, [40]), 'latwy', seed).points[0];
      expect(p?.point === 'turn-bet' && p.betBig === 17 && (p.hit * 46) / 44 < p.requiredBig - 0.02).toBe(true);
    }
  }, 120_000);
  it('EI-002 (D-1286): pula 40, big 0,4 → zakład 16, cena 0,222, margines od e = 9/44 0,018 < 0,02 → brak wariantów (błąd szablonu)', () => {
    expect(() => generateVariant(szablon(0.02, 0.25, 0.4, [40]), 'latwy', 1)).toThrow(TemplateError);
  }, 120_000);
  it('ten sam seed daje ten sam wariant', () => {
    expect(generateVariant(szablon(), 'latwy', 4).fingerprint).toBe(generateVariant(szablon(), 'latwy', 4).fingerprint);
  });
});
