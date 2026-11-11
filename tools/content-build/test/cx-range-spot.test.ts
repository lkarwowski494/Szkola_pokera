// CX (F1, D-866): range-spot na ekranie scenariusza. Bramka ekranu (`checkScenarioNaEkran`) i kontrola szablonu (`checkScenarioTemplate`) dla
// punktu range-spot: akcje wszystkich węzłów spotu mają wyjaśnienia (ekran pokazuje je wszystkie),
// a linia range-spot → draw-call generuje wariant z dwoma punktami na każdym poziomie. Fixture: tools/content-build/test/fixtures (nie treść aplikacji).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
// eslint-disable-next-line
import { buildGeneratorContext, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const fixtures = join(resolve(import.meta.dirname), 'fixtures');
const spots = compileRanges(join(root, 'content')).spots;
const eq = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8'));
const ctx = buildGeneratorContext({ spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, evalRules: content.evalRules, equity169: eq });
const sctx = {
  ruleLevels: new Map(content.rules.map((r) => [r.id, r.level] as const)),
  numberKeys: new Set<string>(),
  moduleIds: new Set(['m3']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)])),
};
const jakNaEkranie = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;
const rfiBtn = loadScenarioTemplates(join(fixtures, 'range-spot')).find((x) => x.template.id === 'sc-fx-rfi-btn')!.template;
const wyjasnienie = (a: string) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. Wyjaśnienie akcji ${a}.` });
const bledy = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).filter((e) => /akcje spotu/.test(e));

describe('CX: range-spot na ekranie scenariusza', () => {
  it('fixture rfi.btn: bramka ekranu i kontrola szablonu bez uwag o akcjach spotu', () => {
    expect(checkScenarioNaEkran(rfiBtn)).toEqual([]);
    expect(bledy(rfiBtn)).toEqual([]);
  });
  it('spot z akcją bez wyjaśnienia jest odrzucony (ekran pokazuje wszystkie akcje węzła, BR-OCE-002)', () => {
    const t = ScenarioTemplate.parse({
      ...structuredClone(rfiBtn), id: 'sc-cx-vs-open', positions: { hero: 'BTN', villain: 'CO' }, levels: ['latwy'],
      bounds: { latwy: { freqs: [{ min: 0.99, max: 1 }], expected: ['fold'], draws: [], reject: [] } },
      decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'vs-open.btn-vs-co', rule: 'R-M3-003', actions: [wyjasnienie('fold'), wyjasnienie('raise 7.5')] }],
    });
    expect(bledy(t)).toEqual([expect.stringContaining('brak wyjaśnienia akcji: call 2.5')]);
    const pelny = ScenarioTemplate.parse({ ...structuredClone(t), decisions: [{ ...structuredClone(t.decisions[0]!), actions: [wyjasnienie('fold'), wyjasnienie('call 2.5'), wyjasnienie('raise 7.5')] }] });
    expect(bledy(pelny)).toEqual([]);
  });
  it('range-spot + draw-call: wariant ma dwa punkty (range-spot, draw-call) na każdym poziomie, bramka ekranu bez uwag', () => {
    const t = ScenarioTemplate.parse({
      ...structuredClone(rfiBtn), id: 'sc-cx-rfi-draw', levels: ['latwy'],
      bounds: { latwy: { freqs: [{ min: 0.25, max: 1 }, null], draws: ['flush'], marginMin: 0.1, marginMax: null, expected: ['raise 2.5', 'call'], reject: ['rywal-ma-out-gracza', 'stol-sparowany'] } },
      decisions: [
        structuredClone(rfiBtn.decisions[0]!),
        { street: 'flop', kind: 'draw-call', pots: [18, 20, 22, 24], fractions: [0.1, 0.2, 0.25, 0.3], villain: 'bet', rule: 'R-M2-005', actions: [wyjasnienie('call'), wyjasnienie('fold')] },
      ],
    });
    expect(checkScenarioNaEkran(t)).toEqual([]);
    expect(() => generateVariant(jakNaEkranie(t), 'latwy', 1)).toThrow(/GeneratorContext/);
    for (const l of t.levels as ScenarioLevel[]) expect(generateVariant(jakNaEkranie(t), l, 1, ctx).points.map((p) => p.point)).toEqual(['range-spot', 'draw-call']);
  }, 120_000);
});
