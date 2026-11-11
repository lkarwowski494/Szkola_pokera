// EI 08-programista-001 (test odtwarzający; uruchamiać z packages/poker-core/test/): R-M7-006 zakłada, że mały zakład daje drawowi rywala dobrą cenę.
// Gdy gracz trzyma rękę, której draw rywala nie pokona (full, kareta, wyższy kolor, karta koloru wyższa od rywala), draw jest martwy i uzasadnienie
// „duży zakład odbiera cenę” jest fałszywe. Wyrocznia: ewaluator 7 kart, każdy out z 44 nieznanych kart (karty obu graczy znane).
// Na 9a054b59: CZERWONY (ok. 17% wariantów fixture EF ma 0 żywych outów rywala; sonda: 507/3000).
import { describe, expect, it } from 'vitest';
import { cardToString, FULL_DECK, generateVariant, strength, type GeneratorTemplate } from '../src';

const t: GeneratorTemplate = {
  id: 'sc-fx-turn-bet',
  levels: { latwy: { draws: ['flush'], reject: [], marginMin: 0.02, expected: ['bet-big'] } },
  decisions: [{ kind: 'turn-bet', street: 'turn', pots: [8, 16, 24, 40], small: 0.25, big: 0.75 }],
};
describe('EI-001: turn-bet: draw rywala ma żywe outy', () => {
  it('ziarna 1–500: każdy wariant ma co najmniej jeden out, po którym rywal wygrywa', () => {
    const martwe: string[] = [];
    for (let seed = 1; seed <= 500; seed++) {
      const v = generateVariant(t, 'latwy', seed);
      const turn = v.board.slice(0, 4);
      const znane = new Set([...v.hero, ...v.villain, ...turn]);
      const zywe = FULL_DECK.filter((c) => !znane.has(c) && strength([...v.villain, ...turn, c]) < strength([...v.hero, ...turn, c])).length;
      if (zywe === 0) martwe.push(`seed ${seed}: ${v.hero.map(cardToString).join('')} vs ${v.villain.map(cardToString).join('')} na ${turn.map(cardToString).join('')}`);
    }
    expect(martwe).toEqual([]);
  });
});
describe('EI-001: turn-bet: „silna ręka” to ręka zrobiona, nie draw', () => {
  it('ziarna 1–3000 (draws flush, oesd): brak wariantów, w których klasa strong wynika tylko z outów (para niższa niż najwyższa albo underpair)', async () => {
    const { classifyHolding } = await import('../src');
    const t2: GeneratorTemplate = { ...t, levels: { latwy: { draws: ['flush', 'oesd'], reject: [], marginMin: 0.02, expected: ['bet-big'] } } };
    const zle: string[] = [];
    for (let seed = 1; seed <= 3000; seed++) {
      const v = generateVariant(t2, 'latwy', seed);
      const h = classifyHolding(v.hero, v.board.slice(0, 4));
      if (h.cls === 'strong' && h.pairKind !== 'overpair' && h.pairKind !== 'top') zle.push(`seed ${seed}: ${v.hero.map(cardToString).join('')} na ${v.board.slice(0, 4).map(cardToString).join('')} (${h.pairKind}, outy ${h.draw?.all.length})`);
    }
    expect(zle).toEqual([]);
  }, 120000);
});
