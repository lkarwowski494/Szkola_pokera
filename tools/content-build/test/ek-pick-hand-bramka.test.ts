// KO-072 (SC-23a/b): schemat i bramka budowania pick-hand (wybór jednej z dwóch rąk do blefu); ekran: patrz ek-pick-hand-ekran w apps/mobile.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'pick-hand'))[0]!;
const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set(['bluff.share.bet-half']), moduleIds: new Set(['m8']) };
const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, 'sc-fx-pick-hand.yaml', sctx).join('\n');

describe('KO-072: bramka pick-hand', () => {
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('tryb spoza showdown/blockers odrzuca schemat', () => { expect(() => kopia((b) => { b.decisions[0].mode = 'inny'; })).toThrow(); });
  it('wyjaśnienia to dokładnie best-hand i other-hand (rola, nie strona A/B; EP-001)', () => {
    expect(() => kopia((b) => { b.decisions[0].actions[0].action = 'hand-a'; })).toThrow();
    expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'best-hand'; }))).toMatch(/dokładnie best-hand i other-hand/);
  });
  it('klasa w calls i w folds naraz', () => { expect(blad(kopia((b) => { b.decisions[0].folds = ['AA', '76s']; }))).toMatch(/klasa AA w calls i w folds/); });
  it('nieznana klasa ręki', () => { expect(blad(kopia((b) => { b.decisions[0].calls = ['AAx']; }))).toMatch(/nieznana klasa ręki AAx/); });
  it('oczekiwana akcja punktu to best-hand', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['call']; }))).toMatch(/best-hand/); });
  it('ekran obsługuje pick-hand (widok minimalny, KO-072)', () => { expect(checkScenarioNaEkran(fx.template)).toEqual([]); });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000)).toEqual([]); }, 120_000);
});
