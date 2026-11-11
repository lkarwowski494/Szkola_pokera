// Recenzja CP (D-043) zmian CN 9143dec..3ab616b, test odtwarzający WYS-001 (raport docs/programista/recenzje/recenzja-cn-3ab616b.md).
// Warunek wstępny jako zwykły `it` (zielony, pokazuje mechanizm), oczekiwane zachowanie jako `it.fails` (dziś pada, więc `pnpm run ci`
// zostaje zielone). Po naprawie: zamienić `it.fails` na `it`.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildGeneratorContext } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const fixtures = join(resolve(import.meta.dirname), 'fixtures');
const spots = compileRanges(join(root, 'content')).spots;
const ctx = buildGeneratorContext({ spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, evalRules: content.evalRules });
const sctx = {
  ruleLevels: new Map(content.rules.map((r) => [r.id, r.level] as const)),
  numberKeys: new Set<string>(),
  moduleIds: new Set(['m4', 'm5']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)])),
  cbetCases: ctx.cbetCases,
  sizeRules: ctx.sizeRules,
};
/** Pełna bramka budowania dla szablonu pl: walidacja treści, bramka ekranu i kontrola generatora (jak compileContent). */
const bramka = (t: ScenarioTemplate) => {
  const e = [...checkScenarioTemplate(t, `${t.id}.yaml`, sctx), ...checkScenarioNaEkran(t)];
  return e.length ? e : checkScenarioGenerator(t, 1, 200, ctx);
};
const bez = (f: string, id: string, akcja: string): ScenarioTemplate => {
  const b = structuredClone(loadScenarioTemplates(join(fixtures, f)).find((x) => x.template.id === id)!.template) as { decisions: { actions: { action: string }[] }[] };
  b.decisions[0]!.actions = b.decisions[0]!.actions.filter((a) => a.action !== akcja);
  return ScenarioTemplate.parse(b);
};

describe('CP WYS-001: bramka przepuszcza punkt c-betu albo rozmiaru z niepełną listą akcji, a ekran pokazuje zawsze wszystkie akcje generatora', () => {
  // ekran: akcjePunktu (apps/mobile/src/features/scenariusz/wariant.ts) dla cbet-case zawsze check, bet-small, bet-big;
  // dla size-spot (bez no-limp) opcje generatora raise, raise-small, raise-big; wyjaśnienie spoza szablonu → bloki() rzuca wyjątek
  const cbet = bez('cbet-case', 'sc-fx-cbet-dry', 'bet-big');
  const trojbet = bez('size-spot', 'sc-fx-3bet-ip', 'raise-big');
  it('warunek wstępny: szablony z dwiema akcjami są zgodne ze schematem i przechodzą całą bramkę budowania', () => {
    expect(cbet.decisions[0]!.actions.map((a) => a.action)).toEqual(['bet-small', 'check']);
    expect(trojbet.decisions[0]!.actions.map((a) => a.action)).toEqual(['raise', 'raise-small']);
    expect(bramka(cbet)).toEqual([]);
    expect(bramka(trojbet)).toEqual([]);
  }, 300_000);
  it.fails('c-bet bez akcji bet-big jest odrzucony w budowaniu (ekran pokaże „Duży c-bet” bez wyjaśnienia)', () => {
    expect(bramka(cbet)).not.toEqual([]);
  }, 300_000);
  it.fails('3-bet bez akcji raise-big jest odrzucony w budowaniu (ekran pokaże trzeci rozmiar bez wyjaśnienia)', () => {
    expect(bramka(trojbet)).not.toEqual([]);
  }, 300_000);
});
