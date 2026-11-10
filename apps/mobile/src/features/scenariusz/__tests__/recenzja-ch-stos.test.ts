/// <reference types="jest" />
/**
 * Recenzja CH (rola 08, audit scalenia CD 70fdf40..07b04fb), znalezisko CH-01: test odtwarzający, celowo CZERWONY do naprawy.
 * Adapter ekranu `naGenerator` (wariant.ts) po scaleniu z BU mapuje decyzje po `kind`, ale nie przekazuje `stackBb`. Generator
 * (scenario-gen.ts, ŚR-203 z BU) ogranicza zakład do stosu gracza tylko przy `typeof t.stackBb === 'number'`, a budowanie treści
 * (tools/content-build/src/scenariusze.ts) przekazuje `stackBb`. Skutek: ekran losuje inne warianty niż sprawdzone w budowaniu
 * i pokazuje na turnie zakład większy niż stos gracza (SC-02 i SC-19, 35 bb, poziom łatwy).
 *
 * D-740 (CH): przypadki były `it.failing` do naprawy; po naprawie (CK, `stackBb` w `naGenerator`) są zwykłymi `it` (asercje bez zmian).
 */
import type { ScenarioTemplate } from '@szkola/content-schema';
import { generateVariant } from '@szkola/poker-core';
import { naGenerator } from '../wariant';

// SC-02 i SC-19 z content/pl/scenarios/sc-02.yaml i sc-19.yaml (stackBb 35); tylko pola potrzebne generatorowi.
const akcje = [{ action: 'call', explanation: '-' }, { action: 'fold', explanation: '-' }] as const;
const szablon = (id: string, draw: 'oesd' | 'flush', flop: number[], turn: number[]): ScenarioTemplate => ({
  id, module: 'm2', situation: '-', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 35,
  levels: ['latwy', 'sredni'],
  bounds: {
    latwy: { draws: [draw], marginMin: 0.1, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['call', 'fold'] },
    sredni: { draws: [draw], marginMin: 0.02, marginMax: 0.1, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['call', 'fold'] },
  },
  decisions: [
    { street: 'flop', kind: 'draw-call', pots: [16, 18, 20, 22], fractions: flop, villain: 'bet', rule: 'R-M2-005', actions: [...akcje] },
    { street: 'turn', kind: 'draw-call', pots: [], fractions: turn, villain: 'bet', rule: 'R-M7-007', actions: [...akcje] },
  ],
});
const SC02 = szablon('sc-02', 'oesd', [0.05, 0.1, 0.2, 0.25], [0.5, 0.6667, 0.75, 1]);
const SC19 = szablon('sc-19', 'flush', [0.1, 0.2, 0.25], [0.6667, 0.75, 1]);

const MARTWE_BLINDY_BB = 1.5; // jak scenario-gen.ts

describe('recenzja CH-01: ekran (naGenerator) nie pokazuje zakładu większego niż stos gracza (ŚR-203, BU KO-051)', () => {
  it('adapter przekazuje stackBb generatorowi', () => {
    expect(naGenerator(SC02).stackBb).toBe(35);
  });
  it.each([
    ['SC-02', SC02],
    ['SC-19', SC19],
  ] as const)('%s poziom łatwy, ziarna 1–200: zakład na turnie ≤ stos gracza za pulą', (_n, sz) => {
    const ponad: string[] = [];
    for (let ziarno = 1; ziarno <= 200; ziarno++) {
      const [f, tu] = generateVariant(naGenerator(sz), 'latwy', ziarno).decisions;
      if (!f || !tu) continue;
      const stos = 35 - (f.pot - MARTWE_BLINDY_BB) / 2 - f.bet;
      if (tu.bet > stos) ponad.push(`${ziarno}: zakład ${tu.bet} bb > stos ${stos} bb`);
    }
    expect(ponad).toEqual([]);
  });
  it('ten sam szablon z stackBb (jak w budowaniu treści) nie daje takich wariantów', () => {
    for (const sz of [SC02, SC19]) for (let ziarno = 1; ziarno <= 200; ziarno++) {
      const [f, tu] = generateVariant({ ...naGenerator(sz), stackBb: 35 }, 'latwy', ziarno).decisions;
      if (f && tu) expect(tu.bet).toBeLessThanOrEqual(35 - (f.pot - MARTWE_BLINDY_BB) / 2 - f.bet);
    }
  });
});
