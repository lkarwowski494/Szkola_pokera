// 08-N2 (sesja EF): schemat i bramka budowania punktu defend; ekran go jeszcze nie obsługuje.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'defend'))[0]!;
const spots = compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots;
const sctx = {
  ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set<string>(), moduleIds: new Set(['m6']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)] as const)),
};
const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, 'sc-fx-defend.yaml', sctx).join('\n');

describe('08-N2: bramka defend', () => {
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('nieznany spot obrony', () => { expect(blad(kopia((b) => { b.decisions[0].spot = 'nie-ma'; }))).toMatch(/nieznany spot zakresu nie-ma/); });
  it('akcje to dokładnie call i fold', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'call'; }))).toMatch(/dokładnie call i fold/); });
  it('oczekiwana akcja call albo fold', () => { expect(() => kopia((b) => { b.bounds.latwy.expected = ['raise']; })).not.toThrow(); expect(blad(kopia((b) => { b.bounds.latwy.expected = ['raise']; }))).toMatch(/call albo fold/); });
  it('ułamek c-betu między małym a dużym (0,4–0,7) nie ma odpowiedzi w źródle', () => { expect(blad(kopia((b) => { b.decisions[0].fractions = [0.5]; }))).toMatch(/0\.5.*między/); });
  it('D-1166: ułamek 0,7 to już luka (duży od 0,75), 0,75 jest dozwolony', () => {
    expect(blad(kopia((b) => { b.decisions[0].fractions = [0.7]; }))).toMatch(/0\.7.*między/);
    expect(blad(kopia((b) => { b.decisions[0].fractions = [0.75]; b.decisions[0].pots = [20]; }))).toBe('');
  });
  it('EI-003: zaokrąglony zakład w luce (pula 3 × 0,75 → 2 = 0,667) jest błędem szablonu', () => {
    expect(blad(kopia((b) => { b.decisions[0].fractions = [0.75]; b.decisions[0].pots = [3]; }))).toMatch(/pula 3.*zakład 2.*między/);
  });
  it('EI-006 (D-1144): gracz musi być BB, a spot to obrona BB (vs-open.bb-*)', () => {
    expect(blad(kopia((b) => { b.positions.hero = 'CO'; b.positions.villain = 'BTN'; }))).toMatch(/defend: gracz to BB/);
    expect(blad(kopia((b) => { b.decisions[0].spot = 'rfi.co'; }))).toMatch(/defend: spot vs-open\.bb-\*/);
  });
  it('ekran jeszcze nie obsługuje defend', () => { expect(checkScenarioNaEkran(fx.template).join('\n')).toMatch(/defend nie jest jeszcze obsługiwany na ekranie/); });
  it('generator wytwarza ≥ 40 odcisków (z prawdziwym zakresem obrony BB)', () => {
    expect(checkScenarioGenerator(fx.template, undefined, 2000, { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 } })).toEqual([]);
  });
});
