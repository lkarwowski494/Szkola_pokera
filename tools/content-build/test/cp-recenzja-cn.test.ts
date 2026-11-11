// Recenzja CP (D-043) zmian CN 9143dec..3ab616b, testy odtwarzające WYS-001 i WYS-003 (raport docs/programista/recenzje/recenzja-cn-3ab616b.md).
// Naprawione w CR (docs/decyzje/CR.md): `it.fails` zamienione na `it`; warunek wstępny WYS-001 sprawdza teraz, że szablon z dwiema akcjami jest
// poprawny wg schematu i generatora (D-815: bramka ekranu wymaga pełnego zestawu akcji, więc to ona go odrzuca).
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
  it('warunek wstępny: szablony z dwiema akcjami są zgodne ze schematem, walidacją treści i generatorem (odrzuca je dopiero bramka ekranu)', () => {
    expect(cbet.decisions[0]!.actions.map((a) => a.action)).toEqual(['bet-small', 'check']);
    expect(trojbet.decisions[0]!.actions.map((a) => a.action)).toEqual(['raise', 'raise-small']);
    for (const t of [cbet, trojbet]) {
      expect(checkScenarioTemplate(t, `${t.id}.yaml`, sctx)).toEqual([]);
      expect(checkScenarioGenerator(t, 1, 200, ctx)).toEqual([]);
    }
  }, 300_000);
  it('c-bet bez akcji bet-big jest odrzucony w budowaniu (ekran pokaże „Duży c-bet” bez wyjaśnienia)', () => {
    expect(bramka(cbet)).toEqual([expect.stringContaining('brak: bet-big')]);
  }, 300_000);
  it('3-bet bez akcji raise-big jest odrzucony w budowaniu (ekran pokaże trzeci rozmiar bez wyjaśnienia)', () => {
    expect(bramka(trojbet)).toEqual([expect.stringContaining('brak: raise-big')]);
  }, 300_000);
  it('pełne zestawy akcji (c-bet: 3, rozmiar: 3, no-limp: raise i limp) przechodzą bramkę ekranu', () => {
    for (const [f, id] of [['cbet-case', 'sc-fx-cbet-dry'], ['size-spot', 'sc-fx-3bet-ip'], ['size-spot', 'sc-fx-no-limp']] as const) {
      const t = loadScenarioTemplates(join(fixtures, f)).find((x) => x.template.id === id)!.template;
      expect(checkScenarioNaEkran(t)).toEqual([]);
    }
  });
});

describe('CP WYS-003 (CR, D-807) → DP D-889: icm-call na ekranie (widok stosów i nagród); poziom trudny czeka na 06-tresci-002 (SC-34, D-825)', () => {
  const icm = loadScenarioTemplates(join(fixtures, 'icm-call'))[0]!.template;
  it('bramka ekranu przyjmuje icm-call bez poziomu trudnego', () => {
    expect(checkScenarioNaEkran({ ...icm, levels: ['latwy', 'sredni'] })).toEqual([]);
  });
  it('bramka odrzuca icm-call z poziomem trudnym z powodem 06-tresci-002 (odpowiedź odporna na zakres all-inu z równowagi ICM)', () => {
    const e = checkScenarioNaEkran(icm);
    expect(e).toHaveLength(1);
    expect(e[0]).toContain('poziom trudny');
    expect(e[0]).toContain('06-tresci-002');
  });
});
