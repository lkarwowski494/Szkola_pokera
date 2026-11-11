// Recenzja CM (D-043) scalenia CL 07b04fb..5637200, testy odtwarzające znalezisk ŚR (raport docs/programista/recenzje/recenzja-cl-5637200.md).
// Każdy blok: warunek wstępny jako zwykły `it` (zielony, pokazuje mechanizm) i oczekiwane zachowanie jako `it.fails` (dziś pada,
// więc `pnpm run ci` zostaje zielone). Po naprawie: zamienić `it.fails` na `it`.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const fixtures = join(resolve(import.meta.dirname), 'fixtures');
/** Ta sama konwersja co ekran (`apps/mobile/src/features/scenariusz/wariant.ts`, `naGenerator`) i kontrola generatora; ekran nie podaje kontekstu. */
const jakNaEkranie = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

describe('CM ŚR-001: budowanie przepuszcza szablony, których ekran scenariusza nie wygeneruje (cbet-case, size-spot, icm-call)', () => {
  const szablony = ['cbet-case', 'size-spot', 'icm-call'].flatMap((k) => loadScenarioTemplates(join(fixtures, k)).map((x) => x.template));
  it('fixture F2–F4 istnieją', () => expect(szablony.length).toBeGreaterThanOrEqual(8));
  for (const t of szablony) {
    it(`${t.id}: ekran (generator bez kontekstu) nie wygeneruje wariantu, więc otworzScenariusz kończy się „plan_niepoprawny”`, () => {
      expect(() => generateVariant(jakNaEkranie(t), t.levels[0] as ScenarioLevel, 1)).toThrow(/GeneratorContext/);
    });
    it.fails(`${t.id}: checkScenarioNaEkran odrzuca szablon (jak range-spot, CK 08-programista-002)`, () => {
      expect(checkScenarioNaEkran(t)).not.toEqual([]);
    });
  }
});

describe('CM ŚR-002: icm-call przyjmuje gracza SB wobec all-inu BB (pas liczony jako strata 0,5 bb, zakres all-inu z pozycji SB)', () => {
  const eq = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8'));
  const spots = compileRanges(join(root, 'content')).spots;
  const ctx = { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: eq };
  const sctx = {
    ruleLevels: new Map(content.rules.map((r) => [r.id, r.level] as const)),
    numberKeys: new Set<string>(),
    moduleIds: new Set(['m11']),
    spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)])),
  };
  const baza = loadScenarioTemplates(join(fixtures, 'icm-call'))[0]!.template;
  const odwrocone = ScenarioTemplate.parse({ ...structuredClone(baza), positions: { hero: 'SB', villain: 'BB' } });
  const bledy = (t: ScenarioTemplate) => [...checkScenarioTemplate(t, `${t.id}.yaml`, sctx), ...checkScenarioGenerator(t, 40, 600, ctx)];
  it('fixture BB wobec all-inu SB przechodzi (warunek wstępny; zakres push.sb-10 to zakres all-inu z SB)', () => {
    expect(baza.positions).toEqual({ hero: 'BB', villain: 'SB' });
    expect(bledy(baza)).toEqual([]);
  }, 300_000);
  it.fails('SB wobec all-inu BB jest odrzucony (BB wchodzi all-in dopiero po akcji SB: pas kosztuje wkład SB ≥ 1 bb, nie blind 0,5 bb; zakres push.sb-10 nie jest zakresem BB)', () => {
    expect(bledy(odwrocone)).not.toEqual([]);
  }, 300_000);
});
