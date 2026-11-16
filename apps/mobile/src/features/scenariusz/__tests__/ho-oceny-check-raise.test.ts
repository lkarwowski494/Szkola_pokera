// HO (D-1722, HP): w SC-16 `call` to zagranie zgodne (ręka mieszana, ADR-04); fold i zbyt małe podbicie to niedokładność (R-M6-006/010).
import type { ScenarioTemplate, ScenarioVariant } from '@szkola/content-schema';
import { ocenyAkcji } from '../wariant';

const wariant = {
  points: [{ point: 'check-raise', street: 'flop', pot: 10, cbet: 4, raiseBig: 12, raiseSmall: 8, requiredBig: 0.3, requiredSmall: 0.2, drawKind: 'flush', outs: 9, correct: 'raise-big' }],
} as unknown as ScenarioVariant;
const szablon = { decisions: [{ kind: 'check-raise', street: 'flop', actions: [{ action: 'raise-big' }, { action: 'call' }, { action: 'fold' }] }] } as unknown as Pick<ScenarioTemplate, 'decisions'>;

describe('HO D-1722: oceny akcji check-raise', () => {
  it('raise-big i call zgodne, fold niedokładność', () => {
    const o = ocenyAkcji(wariant, 0, szablon);
    expect(o['raise-big']).toBe('zgodne');
    expect(o.call).toBe('zgodne');
    expect(o.fold).toBe('niedokladnosc');
  });
});
