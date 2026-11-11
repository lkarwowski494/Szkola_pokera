// 08-A (sesja DX): bramka `holding` zgłasza błąd tylko, gdy żaden punkt szablonu nie jest cbet-case
// (generator stosuje holding w punkcie cbet-case po range-spot, scenario-gen.ts: filtr `b.holding`).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const dir = join(resolve(import.meta.dirname), 'fixtures');
const spots = compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots;
const cbetCases = content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!;
const ctx = {
  ruleLevels: new Map([['R-M3-002', 'gto' as const], ['R-M5-007', 'heur' as const]]),
  numberKeys: new Set<string>(),
  moduleIds: new Set(['m3']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)])),
  cbetCases,
};
const baza = loadScenarioTemplates(join(dir, 'range-cbet'))[0]!.template;

describe('08-A: holding w szablonie range-spot → cbet-case', () => {
  it('szablon range-spot → cbet-case z filtrem holding przechodzi bramkę', () => {
    expect(baza.bounds.latwy!.holding).toEqual(['air']);
    expect(checkScenarioTemplate(baza, 'sc-fx-range-cbet.yaml', ctx)).toEqual([]);
  });
  it('szablon bez punktu cbet-case z holding nadal jest odrzucany', () => {
    const b = structuredClone(baza) as any;
    b.decisions = [b.decisions[0]];
    b.bounds.latwy.expected = [b.bounds.latwy.expected[0]];
    b.bounds.latwy.freqs = [b.bounds.latwy.freqs[0]];
    b.bounds.sredni.expected = [b.bounds.sredni.expected[0]];
    b.bounds.sredni.freqs = [b.bounds.sredni.freqs[0]];
    const t = ScenarioTemplate.parse(b);
    expect(checkScenarioTemplate(t, 'sc-fx-range-cbet.yaml', ctx).join('\n')).toMatch(/holding tylko dla punktu cbet-case/);
  });
});
