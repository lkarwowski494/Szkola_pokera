// EY EV-3 (D-1287, R-M5-012): `params.heroPositions` (lista po przecinku): ocena cbet-case stosuje regułę tylko gdy pozycja gracza jest na liście,
// a bramka szablonu odrzuca positions.hero spoza listy. Fixture syntetyczny jak w ef-n5-oop.test.ts (CO otwiera, BTN sprawdza).
import { describe, expect, it } from 'vitest';
import { applyAction, gradeDecision, parseCards, startHand, type Card, type HandState, type PlayerAction, type TableConfig } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioTemplate } from '../src/scenariusze';
import { kit } from './kit';

const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const baza = kit.rules.find((r) => r.id === 'R-M5-007')!;
const regula = (heroPositions?: string) => ({ ...baza, id: 'R-OOP-X', check: { ...baza.check, params: { position: 'oop', ...(heroPositions === undefined ? {} : { heroPositions }) } as Record<string, number | string>, cases: [{ when: {}, best: 'check' as const, rule: 'R-OOP-X' }] } });
const kitZ = (r: ReturnType<typeof regula>) => ({ ...kit, rules: [r] });
const C = (s: string) => parseCards(s) as [Card, Card];
const F: PlayerAction = { type: 'fold' };
/** CO (miejsce 2) otwiera, BTN (3) sprawdza, blindy pasują; na flopie CO mówi pierwszy. */
function flopCoOop(): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[2] = C('Ah5d'); holes[3] = C('7c2s');
  let st = startHand(cfg, 1, { holes, board: parseCards('Ks8h3d') });
  for (const a of [F, F, { type: 'raise', to: Math.round(2.5 * BB) } as PlayerAction, { type: 'call' } as PlayerAction, F, F]) st = applyAction(st, a);
  return st;
}
describe('EY EV-3: heroPositions w ocenie cbet-case', () => {
  const st = flopCoOop();
  it('gracz z CO, lista HJ,CO → reguła stosowana (zgodne)', () => {
    const f = gradeDecision(st, { type: 'check' }, kitZ(regula('HJ,CO')));
    expect([f.ruleId, f.verdict]).toEqual(['R-OOP-X', 'compliant']);
  });
  it('gracz z CO, lista UTG,HJ → reguła nie ocenia (null)', () => {
    expect(gradeDecision(st, { type: 'check' }, kitZ(regula('UTG,HJ'))).ruleId).toBeNull();
  });
  it('lista ze spacjami („HJ, CO”) działa jak bez', () => {
    expect(gradeDecision(st, { type: 'check' }, kitZ(regula('HJ, CO'))).ruleId).toBe('R-OOP-X');
  });
  it('brak heroPositions → bez ograniczenia (jak dotąd)', () => {
    expect(gradeDecision(st, { type: 'check' }, kitZ(regula())).ruleId).toBe('R-OOP-X');
  });
});
describe('EY EV-3: heroPositions w bramce szablonu', () => {
  const szablon = (hero: string) => ScenarioTemplate.parse({
    id: 'sc-fx-cbet-oop', module: 'm5', situation: 'Fixture: c-bet poza pozycją.', table: '6max', positions: { hero, villain: 'BTN' }, stackBb: 100,
    levels: ['latwy'], bounds: { latwy: { flop: {}, expected: ['check'] } },
    decisions: [{ street: 'flop', kind: 'cbet-case', rule: 'R-OOP-X', actions: ['check', 'bet-small', 'bet-big'].map((a) => ({ action: a, explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wyjaśnienie.' })) }],
  });
  const sctx = (lista: string | undefined) => ({ ruleLevels: new Map([['R-OOP-X', 'heuristic']] as const), numberKeys: new Set<string>(), moduleIds: new Set(['m5']), cbetCases: [{ when: {}, best: 'check' as const, rule: 'R-OOP-X' }], cbetPositions: new Map([['R-OOP-X', 'oop']]), cbetHeroPositions: new Map([['R-OOP-X', lista]]) });
  it('CO na liście HJ,CO przechodzi', () => {
    expect(checkScenarioTemplate(szablon('CO'), 'sc-fx-cbet-oop.yaml', sctx('HJ,CO') as any)).toEqual([]);
  });
  it('UTG poza listą HJ,CO jest błędem', () => {
    expect(checkScenarioTemplate(szablon('UTG'), 'sc-fx-cbet-oop.yaml', sctx('HJ,CO') as any).join('\n')).toMatch(/heroPositions.*UTG/);
  });
  it('brak listy: bez ograniczenia', () => {
    expect(checkScenarioTemplate(szablon('CO'), 'sc-fx-cbet-oop.yaml', sctx(undefined) as any)).toEqual([]);
  });
});
