// HT: HR-001 (SC-27 geo-size: mały zakład = niedokładność, nie błąd; warunki-hp.md:66) i HR-002 (SC-18 turn-action: czekanie = dopuszczalne, mały zakład = niedokładność;
// SC-21: czekanie zgodne, duży zakład niedokładność; warunki-hp.md:43 i SC-21). Decyzja koordynatora KO-112 po recenzji HS.
import type { ScenarioTemplate } from '@szkola/content-schema';
import type { ScenarioVariant } from '@szkola/poker-core';
import { ocenyAkcji } from '../wariant';

const wariant = (point: unknown): ScenarioVariant => ({ points: [point] }) as unknown as ScenarioVariant;
const szablon = (decision: unknown): Pick<ScenarioTemplate, 'decisions'> => ({ decisions: [decision] }) as unknown as Pick<ScenarioTemplate, 'decisions'>;

describe('HT HR-001: oceny akcji geo-size (SC-27)', () => {
  const w = wariant({ point: 'geo-size', street: 'flop', pot: 20, stack: 80, spr: 4, streets: 3, fractionBig: 0.6, fractionSmall: 1 / 3, smallTotal: 60, correct: 'bet-big' });
  it('bet-big zgodne, bet-small niedokładność (nie błąd)', () => {
    const o = ocenyAkcji(w, 0, szablon({ kind: 'geo-size', street: 'flop', actions: [{ action: 'bet-small' }, { action: 'bet-big' }] }));
    expect(o['bet-big']).toBe('zgodne');
    expect(o['bet-small']).toBe('niedokladnosc');
  });
});

describe('HT HR-002: oceny akcji turn-action (SC-18, SC-21)', () => {
  const akcje = { kind: 'turn-action', street: 'turn', actions: [{ action: 'check' }, { action: 'bet-small' }, { action: 'bet-big' }] };
  it('SC-18 (poprawna bet-big): bet-big zgodne, check dopuszczalne, bet-small niedokładność', () => {
    const o = ocenyAkcji(wariant({ point: 'turn-action', street: 'turn', turnClass: 'overcard', pairKind: 'top', correct: 'bet-big' }), 0, szablon(akcje));
    expect(o['bet-big']).toBe('zgodne');
    expect(o.check).toBe('dopuszczalne');
    expect(o['bet-small']).toBe('niedokladnosc');
  });
  it('SC-21 (poprawne check): check zgodne, bet-big niedokładność', () => {
    const o = ocenyAkcji(wariant({ point: 'turn-action', street: 'turn', turnClass: 'other', pairKind: 'second', correct: 'check' }), 0, szablon(akcje));
    expect(o.check).toBe('zgodne');
    expect(o['bet-big']).toBe('niedokladnosc');
  });
});
