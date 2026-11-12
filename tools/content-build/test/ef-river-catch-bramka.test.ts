// 08-N7 (sesja EF): schemat i bramka budowania river-catch; ekran go obsługuje od FG.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'river-catch'))[0]!;
const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set(['bluff.share.bet-half']), moduleIds: new Set(['m8']) };
const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, 'sc-fx-river.yaml', sctx).join('\n');

describe('08-N7: bramka river-catch', () => {
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje call i fold wymusza schemat', () => { expect(() => kopia((b) => { b.decisions[0].actions[1].action = 'raise'; })).toThrow(); });
  it('dwa razy call odrzuca bramka', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'call'; }))).toMatch(/dokładnie call i fold/); });
  it('oczekiwana akcja call albo fold', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['raise']; }))).toMatch(/call albo fold/); });
  it('bez marginMin (ŚR-003: decyzja bliska progu nie ma jednoznacznej odpowiedzi)', () => { expect(blad(kopia((b) => { delete b.bounds.latwy.marginMin; }))).toMatch(/marginMin/); });
  it('udział blefów poza 0–1 odrzuca schemat', () => { expect(() => kopia((b) => { b.decisions[0].bluffShares = [1.2]; })).toThrow(); });
  it('ekran obsługuje river-catch (FG: apps/mobile fg-river-catch-ekran.test.tsx), więc bramka ekranu przepuszcza fixture', () => { expect(checkScenarioNaEkran(fx.template)).toEqual([]); });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000)).toEqual([]); });
});
