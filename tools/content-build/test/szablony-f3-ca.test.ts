// F3 (KO-049, sesja CA): rozmiar jako akcja (open-size, three-bet-size, no-limp). BR-GEN-003: 10 000 losowań na poziom.
// Wyrocznia niezależna od generatora: prawdziwe rozdanie w silniku gry i gradeDecision (grading.ts: sizeCandidate/near, no-limp),
// oczekiwany rozmiar liczony wprost z parametrów reguły w kit (nie z generatora).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  applyAction,
  generateVariant,
  gradeDecision,
  startHand,
  type Card,
  type GeneratorTemplate,
  type HandState,
  type PlayerAction,
  type ScenarioLevel,
  type TableConfig,
} from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';
import { kit } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'size-spot'));
const LOSOWANIA = 10_000;
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
// ocena samego rozmiaru: bez reguł solvera (rfi/vs-open), które oceniają samą akcję i przesłaniają regułę rozmiaru w gradeDecision
const reguly = kit.rules.filter((r) => ['open-size', 'three-bet-size', 'no-limp'].includes(r.check.kind));
const kitRozmiaru = { ...kit, rules: reguly };
const ctx = { spots: [], thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, sizeRules: reguly };
const F: PlayerAction = { type: 'fold' };
const R = (bb: number): PlayerAction => ({ type: 'raise', to: Math.round(bb * BB) });
// miejsca (button 3): 0 UTG, 1 HJ, 2 CO, 3 BTN, 4 SB, 5 BB
const SCENA: Record<string, { seat: number; before: PlayerAction[] }> = {
  'sc-fx-open-size': { seat: 3, before: [F, F, F] },
  'sc-fx-open-size-sb': { seat: 4, before: [F, F, F, F] },
  'sc-fx-no-limp': { seat: 3, before: [F, F, F] },
  'sc-fx-3bet-ip': { seat: 3, before: [F, F, R(2.5)] },
  'sc-fx-3bet-oop': { seat: 5, before: [F, F, F, R(2.5), F] },
};
function stan(id: string, hero: [Card, Card]): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[SCENA[id]!.seat] = hero;
  let st = startHand(cfg, 1, { holes });
  for (const a of SCENA[id]!.before) st = applyAction(st, a);
  return st;
}
const akcja = (opt: { action: string; bb: number | null }): PlayerAction => (opt.action === 'limp' ? { type: 'call' } : R(opt.bb!));

describe('F3: size-spot', () => {
  it('fixture ładują się', () => {
    expect(fx.map((x) => x.template.id).sort()).toEqual(Object.keys(SCENA).sort());
  });
  for (const { template: t } of fx) {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    const d = t.decisions[0] as { rule: string };
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów, ocena silnika gry zgodna z oczekiwaną akcją`, () => {
        const oczekiwana = t.bounds[level]!.expected[0]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed, ctx);
          const p = v.points[0];
          if (v.points.length !== 1 || p?.point !== 'size-spot') { bledy.push(`${seed}: punkty ${v.points.map((x) => x.point)}`); continue; }
          const st = stan(t.id, v.hero);
          const zgodne = p.options.filter((o) => {
            const f = gradeDecision(st, akcja(o), kitRozmiaru);
            if (f.ruleId === null) bledy.push(`${seed}: ${o.action} bez oceny`);
            return f.verdict === 'compliant';
          }).map((o) => o.action);
          if (zgodne.join() !== oczekiwana) bledy.push(`${seed}: silnik ocenia jako zgodne [${zgodne}], oczekiwano ${oczekiwana}`);
          if (p.correct !== oczekiwana || p.rule !== d.rule) bledy.push(`${seed}: punkt wariantu ${p.correct}/${p.rule}`);
          // rozmiar wprost z parametrów reguły w kit
          const par = kit.rules.find((r) => r.id === d.rule)!.check.params;
          const open = (t.decisions[0] as { openBb?: number }).openBb;
          const oczRozmiar = p.check === 'open-size' ? Number((t.decisions[0] as { sb?: boolean }).sb ? par.openSb : par.open) : p.check === 'three-bet-size' ? Math.round(Number(par.mult) * open! * 10) / 10 : Number(kit.rules.find((r) => r.check.kind === 'open-size')!.check.params.open);
          const std = p.options.find((o) => o.action === 'raise')?.bb ?? null;
          if (std !== oczRozmiar) bledy.push(`${seed}: rozmiar ${std}, oczekiwano ${oczRozmiar}`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioTemplate } from '../src/scenariusze';
import { content } from './kit';

describe('F3: walidacja szablonu size-spot w budowaniu', () => {
  const sctx = {
    ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)),
    numberKeys: new Set<string>(),
    moduleIds: new Set(['m3', 'm4']),
    sizeRules: reguly,
  };
  const wez = (id: string) => fx.find((x) => x.template.id === id)!.template;
  const kopia = (id: string, f: (b: any) => void) => { const b = structuredClone(wez(id)) as any; f(b); return ScenarioTemplate.parse(b); };
  const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
  it('fixture przechodzą', () => {
    for (const { template, file } of fx) expect(checkScenarioTemplate(template, file, sctx)).toEqual([]);
  });
  it('reguła innego rodzaju niż check jest błędem', () => {
    expect(blad(kopia('sc-fx-open-size', (b) => { b.decisions[0].rule = 'R-M4-001'; }))).toMatch(/reguła R-M4-001 nie jest regułą open-size/);
  });
  it('oczekiwana akcja inna niż raise jest błędem', () => {
    expect(blad(kopia('sc-fx-open-size', (b) => { b.bounds.latwy.expected = ['raise-big']; }))).toMatch(/poziom latwy: oczekiwana akcja size-spot to raise/);
  });
  it('three-bet-size bez openBb jest błędem', () => {
    expect(blad(kopia('sc-fx-3bet-ip', (b) => { delete b.decisions[0].openBb; }))).toMatch(/three-bet-size wymaga openBb/);
  });
  it('sb niezgodne z pozycją gracza jest błędem', () => {
    expect(blad(kopia('sc-fx-open-size', (b) => { b.decisions[0].sb = true; }))).toMatch(/sb: true wymaga pozycji gracza SB/);
  });
  it('limp tylko dla no-limp, a no-limp bez limp jest błędem', () => {
    expect(blad(kopia('sc-fx-open-size', (b) => { b.decisions[0].actions[1].action = 'limp'; }))).toMatch(/limp tylko dla no-limp/);
    expect(blad(kopia('sc-fx-no-limp', (b) => { b.decisions[0].actions = b.decisions[0].actions.filter((a: any) => a.action !== 'limp').concat([{ action: 'raise-big', explanation: 'x {{w:reka}}' }]); }))).toMatch(/no-limp: akcje to raise i limp/);
  });
  it('generator: pojemność na każdym poziomie', () => {
    expect(checkScenarioGenerator(wez('sc-fx-3bet-oop'), 40, 600, ctx)).toEqual([]);
  }, 120_000);
});
