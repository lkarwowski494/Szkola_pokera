// 08-EX-4…8 (sesja HO): schemat i bramka budowania punktów spr-call, geo-size, turn-action, check-raise i nit-3bet (fixtures to nie treść aplikacji).
// Każda bramka: fixture przechodzi, a psuta kopia daje błąd z miejscem; generator wytwarza ≥ 40 odcisków na poziom (BR-GEN-003) z prawdziwym zakresem i macierzą equity.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import type { Equity169Data } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates, RODZAJE_NA_EKRANIE } from '../src/scenariusze';

const dir = resolve(import.meta.dirname);
const root = resolve(dir, '../../..');
const spots = compileRanges(join(root, 'content')).spots;
const equity169 = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as Equity169Data;
const liczby: Record<string, number> = { 'pf.open-size': 2.5, 'pf.3bet.oop-total': 10, 'xr.mult.example': 4.5, 'xr.too-small.mult': 1.5 };
const sctx = {
  ruleLevels: new Map([['R-M9-002', 'math'], ['R-M9-009', 'math'], ['R-M7-001', 'heuristic'], ['R-M6-008', 'heuristic'], ['R-M10-007', 'heuristic']] as const),
  numberKeys: new Set<string>(Object.keys(liczby)), numberValue: (k: string) => liczby[k], moduleIds: new Set(['m6', 'm7', 'm9', 'm10']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)] as const)),
};
const gctx = { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169 };
const wczytaj = (nazwa: string) => loadScenarioTemplates(join(dir, 'fixtures', nazwa))[0]!;
const zgodnie = (nazwa: string) => {
  const fx = wczytaj(nazwa);
  const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
  const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
  return { fx, kopia, blad };
};

describe('08-EX-5: bramka spr-call', () => {
  const { fx, kopia, blad } = zgodnie('spr-call');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje call i fold', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'call'; }))).toMatch(/call i fold/); });
  it('oczekiwana akcja to call', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['fold']; }))).toMatch(/call/); });
  it('sprRange nieosiągalny z puli i stacków', () => { expect(blad(kopia((b) => { b.bounds.latwy.sprRange = [5, 6]; }))).toMatch(/spr/i); });
  it('kickerMin ≤ kickerMax', () => { expect(blad(kopia((b) => { b.bounds.latwy.kickerMin = 'A'; b.bounds.latwy.kickerMax = 'K'; }))).toMatch(/kicker/i); });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-4: bramka geo-size', () => {
  const { fx, kopia, blad } = zgodnie('geo-size');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje bet-small i bet-big', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'bet-small'; }))).toMatch(/bet-small i bet-big/); });
  it('oczekiwana akcja to bet-big', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['bet-small']; }))).toMatch(/bet-big/); });
  it('mały zakład nie może wpłacać stacku ani być większy od geometrycznego', () => { expect(blad(kopia((b) => { b.decisions[0].small = 0.9; }))).toMatch(/sprRange|mały zakład|para/i); });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-6: bramka turn-action', () => {
  const { fx, kopia, blad } = zgodnie('turn-action');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje check i bet-big (bet-small opcjonalnie)', () => { expect(blad(kopia((b) => { b.decisions[0].actions[0].action = 'bet-small'; }))).toMatch(/check, bet-big/); });
  it('oczekiwana akcja bet-big albo check', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['fold']; }))).toMatch(/bet-big albo check/); });
  it('turnClass i pairKind są wymagane', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.turnClass; }))).toMatch(/turnClass/);
    expect(blad(kopia((b) => { delete b.bounds.latwy.pairKind; }))).toMatch(/pairKind/);
  });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-7: bramka check-raise', () => {
  const { fx, kopia, blad } = zgodnie('check-raise');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('gracz to BB, spot obrony BB', () => {
    expect(blad(kopia((b) => { b.positions.hero = 'CO'; b.positions.villain = 'BTN'; }))).toMatch(/gracz to BB/);
    expect(blad(kopia((b) => { b.decisions[0].spot = 'rfi.co'; }))).toMatch(/vs-open\.bb-/);
  });
  it('krotności zgodne z numbers.yaml (jedno źródło prawdy)', () => {
    expect(blad(kopia((b) => { b.decisions[0].multipliers.big = 4; }))).toMatch(/xr\.mult\.example/);
    expect(blad(kopia((b) => { b.decisions[0].multipliers.small = 2; }))).toMatch(/xr\.too-small\.mult/);
  });
  it('raise-small i multipliers.small występują razem', () => { expect(blad(kopia((b) => { delete b.decisions[0].multipliers.small; }))).toMatch(/raise-small/); });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-8: bramka nit-3bet', () => {
  const { fx, kopia, blad } = zgodnie('nit-3bet');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('liczby zgodne z numbers.yaml', () => {
    expect(blad(kopia((b) => { b.decisions[0].open = 3; }))).toMatch(/pf\.open-size/);
    expect(blad(kopia((b) => { b.decisions[0].threeBet = 9; }))).toMatch(/pf\.3bet\.oop-total/);
  });
  it('tylko poziom łatwy (D-1721) i margines ≥ 0,03', () => {
    expect(blad(kopia((b) => { b.levels = ['latwy', 'sredni']; b.bounds.sredni = { expected: ['fold'], marginMin: 0.03 }; }))).toMatch(/tylko poziom łatwy/);
    expect(blad(kopia((b) => { b.bounds.latwy.marginMin = 0.01; }))).toMatch(/0,03/);
  });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('widoki: nowe rodzaje nie trafiają do treści bez ekranu (opcja A)', () => {
  it.each(['spr-call', 'geo-size', 'turn-action', 'check-raise', 'nit-3bet'])('%s poza RODZAJE_NA_EKRANIE', (k) => {
    expect(RODZAJE_NA_EKRANIE).not.toContain(k);
    expect(checkScenarioNaEkran(wczytaj(k).template).join('\n')).toMatch(new RegExp(k));
  });
});
