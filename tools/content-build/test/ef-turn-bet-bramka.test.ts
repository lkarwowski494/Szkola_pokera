// 08-N6 (sesja EF): schemat i bramka budowania turn-bet; ekran go obsługuje od FG.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'turn-bet'))[0]!;
const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set<string>(), moduleIds: new Set(['m7']) };
const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, 'sc-fx-turn-bet.yaml', sctx).join('\n');

describe('08-N6: bramka turn-bet', () => {
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('schemat: small musi być mniejsze od big', () => { expect(() => kopia((b) => { b.decisions[0].small = 0.9; })).toThrow(); });
  it('oczekiwana akcja tylko bet-big', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['bet-small']; }))).toMatch(/oczekiwana akcja punktu turn-bet to bet-big/); });
  it('akcje to dokładnie bet-small i bet-big', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'bet-small'; }))).toMatch(/dokładnie bet-small i bet-big/); });
  it('wymaga marginMin > 0 i listy draws', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.marginMin; }))).toMatch(/marginMin/);
    expect(blad(kopia((b) => { b.bounds.latwy.draws = []; }))).toMatch(/draws/);
  });
  it('ekran obsługuje turn-bet (FG: apps/mobile fg-turn-bet-ekran.test.tsx), więc bramka ekranu przepuszcza fixture', () => { expect(checkScenarioNaEkran(fx.template)).toEqual([]); });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000)).toEqual([]); }, 120_000);
});
