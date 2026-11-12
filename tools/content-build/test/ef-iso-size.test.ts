// 08-N3 (sesja EF): iso-size w size-spot. Wyrocznia niezależna od generatora: prawdziwe rozdanie w silniku gry (limperzy = call przed graczem)
// i gradeDecision z regułą iso-size (grading.ts); oczekiwany rozmiar liczony wprost z parametrów reguły w kit (base + n × perLimper (+ oopExtra)).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { applyAction, generateVariant, gradeDecision, startHand, type Card, type GeneratorTemplate, type HandState, type PlayerAction, type ScenarioLevel, type TableConfig } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content, kit } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'iso-size'));
const LOSOWANIA = 2_000;
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const reguly = kit.rules.filter((r) => ['open-size', 'three-bet-size', 'no-limp', 'iso-size'].includes(r.check.kind));
const kitIso = { ...kit, rules: reguly.filter((r) => r.check.kind === 'iso-size') };
// 08-FD-2 (sesja FL): iso-size losuje rękę z zakresu rfi.<pozycja>, więc kontekst niesie prawdziwe zakresy treści (dawniej spots: [])
const ctx = { spots: kit.spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, sizeRules: reguly };
const C: PlayerAction = { type: 'call' };
const F: PlayerAction = { type: 'fold' };
const R = (bb: number): PlayerAction => ({ type: 'raise', to: Math.round(bb * BB) });
// miejsca (button 3): 0 UTG, 1 HJ, 2 CO, 3 BTN, 4 SB, 5 BB; limperzy limpują przed graczem
const SCENA: Record<string, { seat: number; before: PlayerAction[]; oop: boolean }> = {
  'sc-fx-iso-btn': { seat: 3, before: [C, C, F], oop: false }, // UTG, HJ limpują, CO pas
  'sc-fx-iso-sb': { seat: 4, before: [C, C, C, F], oop: true }, // UTG, HJ, CO limpują, BTN pas; SB gra przed wszystkimi po flopie
};
function stan(id: string, hero: [Card, Card]): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[SCENA[id]!.seat] = hero;
  let st = startHand(cfg, 1, { holes });
  for (const a of SCENA[id]!.before) st = applyAction(st, a);
  return st;
}
const par = reguly.find((r) => r.check.kind === 'iso-size')!.check.params;
const wzor = (n: number, oop: boolean) => Number(par.base) + Number(par.perLimper) * n + (oop ? Number(par.oopExtra) : 0);

describe('08-N3: size-spot z kontrolą iso-size', () => {
  it('fixture ładują się', () => {
    expect(fx.map((x) => x.template.id).sort()).toEqual(Object.keys(SCENA).sort());
  });
  for (const { template: t } of fx) {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    const d = t.decisions[0] as unknown as { rule: string; limpers: number };
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów, rozmiary z rachunku i ocena silnika gry`, () => {
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed, ctx);
          const p = v.points[0];
          if (p?.point !== 'size-spot' || p.check !== 'iso-size') { bledy.push(`${seed}: punkt ${p?.point}`); continue; }
          const std = wzor(d.limpers, SCENA[t.id]!.oop);
          const bb = Object.fromEntries(p.options.map((o) => [o.action, o.bb]));
          if (bb.raise !== std || bb['raise-small'] !== Math.round(std * 0.8 * 10) / 10 || bb['raise-big'] !== Math.round(std * 1.6 * 10) / 10) bledy.push(`${seed}: rozmiary ${JSON.stringify(bb)}, standard ${std}`);
          const st = stan(t.id, v.hero);
          const zgodne = p.options.filter((o) => gradeDecision(st, R(o.bb!), kitIso).verdict === 'compliant').map((o) => o.action);
          if (zgodne.join() !== 'raise') bledy.push(`${seed}: silnik ocenia jako zgodne [${zgodne}]`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

describe('08-N3: bramka szablonu iso-size', () => {
  const sctx = { ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)), numberKeys: new Set<string>(), moduleIds: new Set(['m3', 'm4']), sizeRules: reguly };
  const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.find((x) => x.template.id === 'sc-fx-iso-btn')!.template) as any; f(b); return ScenarioTemplate.parse(b); };
  const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
  it('fixture przechodzą', () => {
    for (const { template, file } of fx) expect(checkScenarioTemplate(template, file, sctx)).toEqual([]);
  });
  it('iso-size bez limpers jest błędem', () => {
    expect(blad(kopia((b) => { delete b.decisions[0].limpers; }))).toMatch(/limpers/);
  });
  it('limpers poza size-spot iso-size jest błędem', () => {
    expect(blad(kopia((b) => { b.decisions[0].check = 'open-size'; b.decisions[0].rule = 'R-M3-007'; b.positions.hero = 'BTN'; }))).toMatch(/limpers tylko dla iso-size/);
  });
  it('więcej limperów niż miejsc przed graczem jest błędem', () => {
    expect(blad(kopia((b) => { b.positions.hero = 'CO'; b.decisions[0].limpers = 4; }))).toMatch(/4 limperów przed graczem na CO/);
  });
  it('iso-size nie trafia do bazy treści, dopóki ekran nie pokazuje limperów (RODZAJE_NA_EKRANIE tylko z widokiem)', () => {
    expect(checkScenarioNaEkran(kopia(() => undefined)).join('\n')).toMatch(/iso-size.*nie jest jeszcze obsługiwany na ekranie/);
  });
});
