// 08-N5 (sesja EF): c-bet z pozycji poza pozycją (OOP, R-M5-012): reguła cbet-case z `params.position: oop` ocenia gracza, który mówi pierwszy po flopie
// (CO wobec BTN); reguła bez parametru zostaje IP (jak dotąd). Reguła i przypadki są syntetyczne (treść szablonów robi rola 06): test dotyczy silnika.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { applyAction, generateVariant, gradeDecision, parseCards, startHand, type Card, type GeneratorTemplate, type HandState, type PlayerAction, type TableConfig } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content, kit } from './kit';

const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const baza = kit.rules.find((r) => r.id === 'R-M5-007')!;
const regula = (id: string, position?: 'ip' | 'oop') => ({ ...baza, id, check: { ...baza.check, params: (position ? { position } : {}) as Record<string, number | string>, cases: [{ when: {}, best: 'check' as const, rule: id }] } });
const kitZ = (r: ReturnType<typeof regula>) => ({ ...kit, rules: [r] });
const C = (s: string) => parseCards(s) as [Card, Card];
const F: PlayerAction = { type: 'fold' };

/** CO (miejsce 2) otwiera 2,5 bb, BTN (3) sprawdza, blindy pasują; na flopie CO mówi pierwszy (poza pozycją) albo BTN po czeku CO. */
function flopCoOop(): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[2] = C('Ah5d');
  holes[3] = C('7c2s');
  let st = startHand(cfg, 1, { holes, board: parseCards('Ks8h3d') });
  for (const a of [F, F, { type: 'raise', to: Math.round(2.5 * BB) } as PlayerAction, { type: 'call' } as PlayerAction, F, F]) st = applyAction(st, a);
  return st;
}

describe('08-N5: cbet-case poza pozycją (grading)', () => {
  const st = flopCoOop();
  it('reguła oop ocenia czekanie gracza poza pozycją jako zgodne', () => {
    const f = gradeDecision(st, { type: 'check' }, kitZ(regula('R-OOP-X', 'oop')));
    expect(f.ruleId).toBe('R-OOP-X');
    expect(f.verdict).toBe('compliant');
  });
  it('reguła oop ocenia zakład przy najlepszym czekaniu jako niedokładność lub dopuszczalną (nie zgodną)', () => {
    const f = gradeDecision(st, { type: 'bet', to: Math.round(5 * BB * 0.33) }, kitZ(regula('R-OOP-X', 'oop')));
    expect(f.ruleId).toBe('R-OOP-X');
    expect(f.verdict).not.toBe('compliant');
  });
  it('reguła bez parametru (IP) nie ocenia gracza poza pozycją', () => {
    expect(gradeDecision(st, { type: 'check' }, kitZ(regula('R-IP-X'))).ruleId).toBeNull();
    expect(gradeDecision(st, { type: 'check' }, kitZ(regula('R-IP-Y', 'ip'))).ruleId).toBeNull();
  });
});

describe('08-N5: cbet-case poza pozycją (generator i bramka)', () => {
  const spots = compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots;
  const t = ScenarioTemplate.parse({
    id: 'sc-fx-cbet-oop', module: 'm5', situation: 'Fixture: c-bet z CO wobec BTN.', table: '6max', positions: { hero: 'CO', villain: 'BTN' }, stackBb: 100,
    levels: ['latwy'], bounds: { latwy: { flop: {}, expected: ['check'] } },
    decisions: [{ street: 'flop', kind: 'cbet-case', rule: 'R-OOP-X', actions: ['check', 'bet-small', 'bet-big'].map((a) => ({ action: a, explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wyjaśnienie.' })) }],
  });
  const ctx = { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, cbetCases: regula('R-OOP-X', 'oop').check.cases };
  it('generator losuje rękę z zakresu otwarcia CO (positions.hero)', () => {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    const co = spots.find((s) => s.id === 'rfi.co')!;
    for (let seed = 1; seed <= 300; seed++) {
      const v = generateVariant(g, 'latwy', seed, ctx);
      expect(v.points[0]?.point).toBe('cbet-case');
      expect(co.actions.some((a) => a.label !== 'fold')).toBe(true);
    }
  });
  const sctx = (position: string) => ({ ruleLevels: new Map([['R-OOP-X', 'heuristic']] as const), numberKeys: new Set<string>(), moduleIds: new Set(['m5']), cbetCases: [{ when: {}, best: 'check' as const, rule: 'R-OOP-X' }], cbetPositions: new Map([['R-OOP-X', position]]) });
  it('bramka: reguła oop i gracz poza pozycją (CO wobec BTN) przechodzi', () => {
    expect(checkScenarioTemplate(t, 'sc-fx-cbet-oop.yaml', sctx('oop') as any)).toEqual([]);
  });
  it('bramka: reguła ip, a gracz poza pozycją to błąd', () => {
    expect(checkScenarioTemplate(t, 'sc-fx-cbet-oop.yaml', sctx('ip') as any).join('\n')).toMatch(/reguła ma position ip, a gracz jest poza pozycją/);
  });
});
