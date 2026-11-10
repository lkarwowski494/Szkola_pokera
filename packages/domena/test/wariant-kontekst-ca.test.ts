// KO-049 (sesja CA): GeneratorContext przechodzi przez wybierzWariant do generatora (punkty range-spot, cbet-case, size-spot, icm-call
// potrzebują danych spoza szablonu, D-661). Bez kontekstu takie punkty kończą się TemplateError.
import { describe, expect, it } from 'vitest';
import { generateVariant, TemplateError, type GeneratorContext, type GeneratorTemplate } from '@szkola/poker-core';
import { wybierzWariant } from '../src';

const SZABLON: GeneratorTemplate = {
  id: 'test-ctx',
  levels: {
    latwy: { draws: [], marginMin: 0, marginMax: null, reject: [], flop: { height: ['high'], suits: ['rainbow'], ranks: ['disconnected'] }, expected: ['bet-small'] },
  },
  decisions: [{ kind: 'cbet-case', street: 'flop', rule: 'R-M5-007' }],
};
const KONTEKST: GeneratorContext = {
  spots: [],
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
  cbetCases: [{ when: { height: ['high'], suits: ['rainbow'], ranks: ['disconnected', 'semi-connected'] }, best: 'small', rule: 'R-M5-007' }],
};

describe('wybierzWariant: kontekst generatora', () => {
  it('z kontekstem generuje wariant punktu cbet-case', () => {
    const v = wybierzWariant(SZABLON, 'latwy', 1, { historia: [], sesja: new Set(), kontekst: KONTEKST });
    expect(v.points[0]?.point).toBe('cbet-case');
  });
  it('przekazuje kontekst generatorowi (4. argument) w każdym wywołaniu', () => {
    const widziane: (GeneratorContext | undefined)[] = [];
    const generuj: typeof generateVariant = (t, p, z, c) => { widziane.push(c); return generateVariant(t, p, z, c); };
    wybierzWariant(SZABLON, 'latwy', 1, { historia: [], sesja: new Set(), kontekst: KONTEKST, generuj });
    expect(widziane.length).toBeGreaterThan(0);
    expect(widziane.every((c) => c === KONTEKST)).toBe(true);
  });
  it('bez kontekstu punkt cbet-case kończy się błędem szablonu, nie cichym wariantem', () => {
    expect(() => wybierzWariant(SZABLON, 'latwy', 1, { historia: [], sesja: new Set() })).toThrow(TemplateError);
  });
});
