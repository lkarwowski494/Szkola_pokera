// Recenzja CM (D-043) scalenia CL 07b04fb..5637200, testy odtwarzające znalezisk ŚR (raport docs/programista/recenzje/recenzja-cl-5637200.md).
// Naprawione w CN (docs/decyzje/CN.md): ŚR-001 (D-782: bramka ekranu jako lista dozwolonych; ekran obsługuje F2–F4, więc test sprawdza spójność
// bramki z tym, co ekran generuje, zamiast odrzucać trzy rodzaje) i ŚR-002 (D-786: `it.fails` zamienione na `it`).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { akcjeSzablonu, buildGeneratorContext, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates, RODZAJE_NA_EKRANIE } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const fixtures = join(resolve(import.meta.dirname), 'fixtures');
/** Ta sama konwersja co ekran (`apps/mobile/src/features/scenariusz/wariant.ts`, `naGenerator`) i kontrola generatora; ekran nie podaje kontekstu. */
const jakNaEkranie = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

describe('CM ŚR-001 (naprawa CN, D-782): bramka ekranu przepuszcza tylko rodzaje, które ekran faktycznie wygeneruje', () => {
  const rodzaje = ['cbet-case', 'size-spot'];
  const szablony = rodzaje.flatMap((k) => loadScenarioTemplates(join(fixtures, k)).map((x) => x.template));
  const rangeSpot = loadScenarioTemplates(join(fixtures, 'range-spot')).map((x) => x.template);
  const eq = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8'));
  // kontekst składany tak jak w aplikacji (`getKontekstGeneratora`) i w kontroli generatora: buildGeneratorContext z danych treści
  const ctx = buildGeneratorContext({ spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, evalRules: content.evalRules, equity169: eq });
  it('fixture F1–F4 istnieją', () => {
    expect(szablony.length).toBeGreaterThanOrEqual(7);
    expect(rangeSpot.length).toBeGreaterThanOrEqual(2);
  });
  it('lista dozwolonych: draw-call, cbet-case, size-spot, range-spot, icm-call, pick-hand, turn-bet, river-catch, defend, list-hand (range-spot od CX, D-866; icm-call od DP, D-889: widok stosów i nagród; pick-hand od KO-072: widok minimalny, EK; turn-bet, river-catch, defend i list-hand od FG; flop-size od FL, D-1420: widok jak turn-bet; river-value od FR, KO-091)', () => expect(RODZAJE_NA_EKRANIE).toEqual(['draw-call', 'cbet-case', 'size-spot', 'range-spot', 'icm-call', 'pick-hand', 'turn-bet', 'flop-size', 'river-catch', 'defend', 'list-hand', 'river-value']));
  for (const t of rangeSpot) {
    it(`${t.id}: range-spot przepuszczony przez bramkę (CX, D-866), więc ekran z kontekstem generuje wariant i ocenę każdej akcji na każdym poziomie, a bez kontekstu odmawia`, () => {
      expect(checkScenarioNaEkran(t)).toEqual([]);
      expect(() => generateVariant(jakNaEkranie(t), t.levels[0] as ScenarioLevel, 1)).toThrow(/GeneratorContext/);
      for (const l of t.levels as ScenarioLevel[]) {
        const p = generateVariant(jakNaEkranie(t), l, 1, ctx).points[0]!;
        if (p.point !== 'range-spot') throw new Error(`nieoczekiwany punkt ${p.point}`);
        expect(p.options.map((o) => o.action).sort()).toEqual(t.decisions[0]!.actions.map((a) => a.action).sort()); // każda pokazana akcja ma wyjaśnienie (BR-OCE-002)
        expect(p.options.find((o) => o.action === p.correct)?.verdict).toBe('correct');
      }
    }, 120_000);
  }
  for (const t of szablony) {
    it(`${t.id}: przepuszczony przez bramkę, więc ekran z kontekstem generuje wariant na każdym poziomie, a bez kontekstu odmawia (jak przed CN)`, () => {
      expect(checkScenarioNaEkran(t)).toEqual([]);
      expect(() => generateVariant(jakNaEkranie(t), t.levels[0] as ScenarioLevel, 1)).toThrow(/GeneratorContext/);
      for (const l of t.levels as ScenarioLevel[]) expect(generateVariant(jakNaEkranie(t), l, 1, ctx).points).toHaveLength(t.decisions.length);
    }, 120_000);
    it(`${t.id}: akcje i oceny (CR ŚR-004): akcje szablonu = akcje wymagane przez ekran, a wariant ocenia każdą z nich werdyktem reguły`, () => {
      const d = t.decisions[0]!;
      const wymagane = akcjeSzablonu(d.kind, d.kind === 'size-spot' ? d.check : undefined)!;
      expect(d.actions.map((a) => a.action).sort()).toEqual([...wymagane].sort());
      for (const l of t.levels as ScenarioLevel[]) {
        const p = generateVariant(jakNaEkranie(t), l, 1, ctx).points[0]!;
        if (p.point !== 'cbet-case' && p.point !== 'size-spot') throw new Error(`nieoczekiwany punkt ${p.point}`);
        expect(Object.keys(p.verdicts).sort()).toEqual([...wymagane].sort());
        expect(p.verdicts[p.correct as keyof typeof p.verdicts]).toBe('compliant');
      }
    }, 120_000);
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
  it('SB wobec all-inu BB jest odrzucony (BB wchodzi all-in dopiero po akcji SB: pas kosztuje wkład SB ≥ 1 bb, nie blind 0,5 bb; zakres push.sb-10 nie jest zakresem BB)', () => {
    expect(bledy(odwrocone)).not.toEqual([]);
  }, 300_000);
});
