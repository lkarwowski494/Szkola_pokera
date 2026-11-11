// 08-EH-1 (D-1165, sesja EK): po punkcie range-spot flop jest dolosowywany do tekstury poziomu (jak w cbet-case). Bez tego SC-04 na samym flopie
// rozłączonym miał akceptację ok. 0,06% (tekstura 0,47% × ręka bez pary i drawa) i generator zgłaszał błąd szablonu.
// Akceptacja: ≥ 10 000 wariantów bez TemplateError (odrzuceń seryjnych) i każdy flop spełnia teksturę poziomu; ręka nadal z zakresu otwarcia (range-spot).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { classifyFlop, generateVariant, textureMatches, type GeneratorTemplate } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const sc04 = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template).find((t) => t.id === 'sc-04')!;
const ctx = {
  spots: compileRanges(join(root, 'content')).spots,
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
  cbetCases: content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!,
  sizeRules: [],
  equity169: JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')),
};
const wezszy = (): GeneratorTemplate => {
  const t = structuredClone(sc04) as unknown as GeneratorTemplate & { bounds: any };
  const gen = { id: t.id, stackBb: (sc04 as any).stackBb, positions: (sc04 as any).positions, levels: structuredClone((sc04 as any).bounds), decisions: (sc04 as any).decisions } as any;
  gen.levels.latwy.flop = { height: ['high'], suits: ['rainbow'], ranks: ['disconnected'], wetness: ['dry'], oesdPossible: false };
  return gen as GeneratorTemplate;
};

describe('08-EH-1: SC-04 na wąskim flopie (rozłączony, suchy) po range-spot', () => {
  it('10 000 wariantów bez błędu szablonu; flop zgodny z teksturą; punkt range-spot i cbet-case', () => {
    const t = wezszy();
    const flop = (t.levels as any).latwy.flop;
    for (let seed = 1; seed <= 10_000; seed++) {
      const v = generateVariant(t, 'latwy', seed, ctx);
      expect(textureMatches(classifyFlop(v.board.slice(0, 3)), flop), `seed ${seed}`).toBe(true);
      expect(v.points.map((p) => p.point)).toEqual(['range-spot', 'cbet-case']);
    }
  }, 600_000);
});
