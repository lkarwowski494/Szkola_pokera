// 08-FD-3 / 08-FD-4 (sesja FL): schemat i bramka budowania rodzajów flop-size i river-value (jak ef-turn-bet-bramka.test.ts dla turn-bet).
// flop-size ma widok (apps/mobile fl-flop-size-ekran.test.tsx); river-value też od FR (fr-river-value-ekran.test.tsx, KO-091): bramka ekranu przepuszcza oba rodzaje.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioNaEkran, RODZAJE_NA_EKRANIE, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const ladujFx = (katalog: string) => loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', katalog))[0]!;
const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set<string>(), moduleIds: new Set(['m5', 'm8']) };
const kopiaZ = (fx: ReturnType<typeof ladujFx>) => (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
const bladZ = (id: string) => (t: ScenarioTemplate) => checkScenarioTemplate(t, `${id}.yaml`, sctx).join('\n');

describe('08-FD-3: bramka flop-size', () => {
  const fx = ladujFx('flop-size');
  const kopia = kopiaZ(fx);
  const blad = bladZ('sc-fx-flop-size');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('schemat: small musi być mniejsze od big', () => { expect(() => kopia((b) => { b.decisions[0].small = 0.9; })).toThrow(); });
  it('oczekiwana akcja tylko bet-big', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['bet-small']; }))).toMatch(/oczekiwana akcja punktu flop-size to bet-big/); });
  it('akcje to dokładnie bet-small i bet-big', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'bet-small'; }))).toMatch(/dokładnie bet-small i bet-big/); });
  it('wymaga marginMin ≥ 0,02 (D-1051) i listy draws', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.marginMin; }))).toMatch(/marginMin ≥ 0\.02/);
    expect(blad(kopia((b) => { b.bounds.latwy.marginMin = 0.01; }))).toMatch(/marginMin ≥ 0\.02/);
    expect(blad(kopia((b) => { b.bounds.latwy.draws = []; }))).toMatch(/draws/);
  });
  it('pula, z której ułamek nie daje całego zakładu (pula 10: ¼ = 2,5), to błąd bramki', () => {
    expect(blad(kopia((b) => { b.decisions[0].pots = [10]; }))).toMatch(/pula 10 × 0\.25 nie daje zakładu będącego całą kwotą/);
  });
  it('ekran obsługuje flop-size (FL: apps/mobile fl-flop-size-ekran.test.tsx), więc bramka ekranu przepuszcza fixture', () => { expect(checkScenarioNaEkran(fx.template)).toEqual([]); });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 600)).toEqual([]); }, 120_000);
});

describe('08-FD-4: bramka river-value', () => {
  const fx = ladujFx('river-value');
  const kopia = kopiaZ(fx);
  const blad = bladZ('sc-fx-river-value');
  it('fixture przechodzi bramkę szablonu', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('oczekiwana akcja tylko bet albo check', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['bet-big']; }))).toMatch(/oczekiwana akcja punktu river-value to bet albo check/); });
  it('akcje to dokładnie bet i check', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'bet'; }))).toMatch(/dokładnie bet i check/); });
  it('margines δ ≥ 0,02 (D-1051)', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.marginMin; }))).toMatch(/marginMin ≥ 0\.02/);
    expect(blad(kopia((b) => { b.bounds.latwy.marginMin = 0.01; }))).toMatch(/marginMin ≥ 0\.02/);
  });
  it('08-programista-006: margines δ ≥ 0,5 to błąd bramki z poziomem i nazwą pola', () => {
    expect(blad(kopia((b) => { b.bounds.latwy.marginMin = 0.5; }))).toMatch(/poziom latwy: punkt river-value wymaga marginMin < 0,5/);
  });
  it('klasy: nieznana, wspólna dla calls i folds, powtórzona', () => {
    expect(blad(kopia((b) => { b.decisions[0].calls.push('ZZ'); }))).toMatch(/nieznana klasa ręki ZZ/);
    expect(blad(kopia((b) => { b.decisions[0].folds.push('AKs'); }))).toMatch(/klasa AKs w calls i w folds naraz/);
    expect(blad(kopia((b) => { b.decisions[0].calls.push('AKs'); }))).toMatch(/powtórzona/);
  });
  it('KO-091 (FR): ekran ma widok river-value (apps/mobile fr-river-value-ekran.test.tsx), więc bramka ekranu przepuszcza szablon', () => {
    expect(RODZAJE_NA_EKRANIE).toContain('river-value');
    expect(checkScenarioNaEkran(fx.template)).toEqual([]);
  });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 150)).toEqual([]); }, 300_000);
});
