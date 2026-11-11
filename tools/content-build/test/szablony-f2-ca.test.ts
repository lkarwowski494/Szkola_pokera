// F2 (KO-049, sesja CA): punkt cbet-case. BR-GEN-003: 10 000 losowań na poziom. Wyrocznia niezależna od generatora: prawdziwe
// rozdanie w silniku gry (BTN otwiera 2,5 bb, BB sprawdza, BB czeka), ocena gradeDecision z kit (grading.ts `cbet-case`), a nie
// logika generatora; klasa ręki z samych rang (pair/air), dopasowanie tekstury classifyFlop + filtr poziomu.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  applyAction,
  classifyFlop,
  classifyHolding,
  generateVariant,
  gradeDecision,
  rankOf,
  startHand,
  textureMatches,
  type Card,
  type GeneratorTemplate,
  type HandState,
  type PlayerAction,
  type ScenarioLevel,
  type TableConfig,
} from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content, kit, number } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'cbet-case'));
const LOSOWANIA = 10_000;
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const cbetCases = content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!;
const ctx = { spots: compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, cbetCases };
const AKCJE = ['check', 'bet-small', 'bet-big'] as const;

/** Rozdanie: UTG, HJ, CO pasują, BTN (miejsce 3) otwiera 2,5 bb, SB pasuje, BB (5) sprawdza i czeka; decyzja BTN na flopie. */
function flopBtn(hero: [Card, Card], villain: [Card, Card], flop: Card[]): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[3] = hero;
  holes[5] = villain;
  let st = startHand(cfg, 1, { holes, board: flop });
  const seq: PlayerAction[] = [{ type: 'fold' }, { type: 'fold' }, { type: 'fold' }, { type: 'raise', to: Math.round(2.5 * BB) }, { type: 'fold' }, { type: 'call' }, { type: 'check' }];
  for (const a of seq) st = applyAction(st, a);
  return st;
}
const pula = 5 * BB; // 2 × 2,5 bb
const akcja = (a: (typeof AKCJE)[number]): PlayerAction =>
  a === 'check' ? { type: 'check' } : { type: 'bet', to: Math.round(pula * number(a === 'bet-small' ? 'cbet.size.small' : 'cbet.size.big')) };

/** Klasa ręki z samych rang (bez classifyHolding): para z kartą gracza albo para kieszonkowa = pair. */
const maPare = (hero: readonly Card[], flop: readonly Card[]) => rankOf(hero[0]!) === rankOf(hero[1]!) || hero.some((c) => flop.some((f) => rankOf(f) === rankOf(c)));

describe('F2: cbet-case', () => {
  it('fixture ładują się', () => {
    expect(fx.map((x) => x.template.id).sort()).toEqual(['sc-fx-cbet-dry', 'sc-fx-cbet-low']);
    expect(cbetCases.length).toBeGreaterThan(0);
  });
  for (const { template: t } of fx) {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów, ocena silnika gry zgodna z oczekiwaną akcją`, () => {
        const b = t.bounds[level]!;
        const oczekiwana = b.expected[0]! as (typeof AKCJE)[number];
        const regula = (t.decisions[0] as { rule: string }).rule;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed, ctx);
          const flop = v.board.slice(0, 3);
          if (new Set([...v.hero, ...v.villain, ...v.board]).size !== 9) bledy.push(`${seed}: karty się powtarzają`);
          if (v.points.length !== 1 || v.points[0]!.point !== 'cbet-case') { bledy.push(`${seed}: punkty ${v.points.map((p) => p.point)}`); continue; }
          if (b.flop && !textureMatches(classifyFlop(flop), b.flop)) bledy.push(`${seed}: tekstura poza filtrem`);
          const pare = maPare(v.hero, flop);
          const kl = classifyHolding(v.hero, flop).cls;
          for (const h of b.holding ?? []) {
            const ok = h === 'pair' ? pare : h === 'air' ? kl === 'air' && !pare : kl === 'draw' && !pare;
            if ((b.holding ?? []).length === 1 && !ok) bledy.push(`${seed}: ręka ${kl}, pare=${pare} poza filtrem ${h}`);
          }
          if (b.holding && !b.holding.some((h) => (h === 'pair' ? pare : h === 'air' ? kl === 'air' && !pare : kl === 'draw' && !pare))) bledy.push(`${seed}: ręka ${kl} poza filtrem ${b.holding}`);
          const st = flopBtn(v.hero, v.villain, flop);
          const oceny = AKCJE.map((a) => ({ a, f: gradeDecision(st, akcja(a), kit) }));
          const zgodne = oceny.filter((x) => x.f.verdict === 'compliant').map((x) => x.a);
          if (zgodne.join() !== oczekiwana) bledy.push(`${seed}: silnik ocenia jako zgodne [${zgodne}], oczekiwano ${oczekiwana}`);
          if (oceny.some((x) => x.f.ruleId !== regula)) bledy.push(`${seed}: reguła ${oceny.map((x) => x.f.ruleId)} zamiast ${regula}`);
          if (v.points[0]!.correct !== oczekiwana) bledy.push(`${seed}: punkt wariantu ${v.points[0]!.correct}`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioTemplate } from '../src/scenariusze';

describe('F2: walidacja szablonu cbet-case w budowaniu', () => {
  const cbetRules = new Set(content.evalRules.filter((r) => (r.check.cases ?? []).some((c) => c.rule === r.id)).map((r) => r.id));
  const sctx = {
    ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)),
    numberKeys: new Set<string>(),
    moduleIds: new Set(['m5']),
    cbetCases,
  };
  const baza = fx.find((x) => x.template.id === 'sc-fx-cbet-dry')!.template;
  const kopia = (f: (b: any) => void) => { const b = structuredClone(baza) as any; f(b); return ScenarioTemplate.parse(b); };
  it('fixture przechodzi, a reguły c-betu mają przypadki', () => {
    expect([...cbetRules].sort()).toEqual(['R-M5-004', 'R-M5-007', 'R-M5-009']);
    for (const { template, file } of fx) expect(checkScenarioTemplate(template, file, sctx)).toEqual([]);
  });
  it('oczekiwana akcja bez wyjaśnienia jest błędem', () => {
    const t = kopia((b) => { b.decisions[0].actions = b.decisions[0].actions.filter((a: any) => a.action !== 'bet-small'); });
    expect(checkScenarioTemplate(t, 'sc-fx-cbet-dry.yaml', sctx).join('\n')).toMatch(/oczekiwana akcja bet-small nie ma wyjaśnienia/);
  });
  it('reguła bez przypadków c-betu jest błędem', () => {
    const t = kopia((b) => { b.decisions[0].rule = 'R-M5-005'; });
    expect(checkScenarioTemplate(t, 'sc-fx-cbet-dry.yaml', sctx).join('\n')).toMatch(/reguła R-M5-005 nie ma przypadku c-betu/);
  });
  it('oczekiwana akcja inna niż best przypadku reguły jest błędem (check zamiast bet-small)', () => {
    const t = kopia((b) => { b.bounds.latwy.expected = ['check']; });
    expect(checkScenarioTemplate(t, 'sc-fx-cbet-dry.yaml', sctx).join('\n')).toMatch(/poziom latwy: oczekiwana akcja check/);
  });
  it('filtr ręki (holding) tylko dla punktu cbet-case', () => {
    const draw = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'scenariusze')).find((x) => x.template.id === 'sc-fx-turn-gutshot')!.template;
    const b = structuredClone(draw) as any;
    b.bounds.latwy.holding = ['air'];
    const t = ScenarioTemplate.parse(b);
    const e = checkScenarioTemplate(t, 'sc-fx-turn-gutshot.yaml', { ...sctx, moduleIds: new Set([t.module]), ruleLevels: new Map([...sctx.ruleLevels]) });
    expect(e.join('\n')).toMatch(/holding tylko dla punktu cbet-case/);
  });
  it('generator: pojemność i oczekiwana akcja na każdym poziomie (checkScenarioGenerator z przypadkami c-betu)', () => {
    expect(checkScenarioGenerator(baza, 40, 600, ctx)).toEqual([]);
  }, 300_000);
});
