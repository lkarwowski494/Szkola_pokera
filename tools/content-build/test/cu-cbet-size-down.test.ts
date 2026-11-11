// CU (rola 06, fix WYS-001 recenzji CT, D-845): duży c-bet przy przypadku `best: check` (R-M5-004, niski flop) jest niedokładnością tylko na
// flopie połączonym (strit możliwy z dwiema kartami gracza), a na półpołączonym pozostaje dopuszczalny. Źródło (szczebel 2, odczyt 2026-11-11,
// https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/): „Connected boards are a unique case due to flopped straights often
// being in the BB’s range. In order to be respectful of this, we size down”; „OESD possible … This board texture sees the increased use of the
// 66% pot bet size, but decreased overall betting frequency due to our newfound polarity.”
import { describe, expect, it } from 'vitest';
import { applyAction, cbetVerdict, classifyFlop, gradeDecision, parseCards, startHand, type Card, type HandState, type PlayerAction, type TableConfig } from '@szkola/poker-core';
import { content, kit, number } from './kit';

describe('cbetVerdict z sizeDown (D-845)', () => {
  it('best check: duży zakład niedokładny tylko przy sizeDown; mały zawsze dopuszczalny', () => {
    expect([cbetVerdict('check', 'check', true), cbetVerdict('check', 'small', true), cbetVerdict('check', 'big', true)]).toEqual(['compliant', 'acceptable', 'inaccuracy']);
    expect([cbetVerdict('check', 'check'), cbetVerdict('check', 'small'), cbetVerdict('check', 'big')]).toEqual(['compliant', 'acceptable', 'acceptable']);
  });
  it('best small i big bez zmian (sizeDown nie zmienia ocen, D-793)', () => {
    for (const sd of [false, true]) {
      expect([cbetVerdict('small', 'check', sd), cbetVerdict('small', 'small', sd), cbetVerdict('small', 'big', sd)]).toEqual(['acceptable', 'compliant', 'inaccuracy']);
      expect([cbetVerdict('big', 'check', sd), cbetVerdict('big', 'small', sd), cbetVerdict('big', 'big', sd)]).toEqual(['acceptable', 'inaccuracy', 'compliant']);
    }
  });
});

const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
function flopBtn(hero: Card[], villain: Card[], flop: Card[]): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[3] = [hero[0]!, hero[1]!];
  holes[5] = [villain[0]!, villain[1]!];
  let st = startHand(cfg, 1, { holes, board: flop });
  const seq: PlayerAction[] = [{ type: 'fold' }, { type: 'fold' }, { type: 'fold' }, { type: 'raise', to: Math.round(2.5 * BB) }, { type: 'fold' }, { type: 'call' }, { type: 'check' }];
  for (const a of seq) st = applyAction(st, a);
  return st;
}
const pula = 5 * BB;
const zaklad = (k: string): PlayerAction => ({ type: 'bet', to: Math.round(pula * number(k)) });

describe('treść pl: przypadek R-M5-004 ma sizeDown na flopie połączonym; ocena w grze (gradeDecision) jak D-845', () => {
  it('przypadek c-betu R-M5-004 w skompilowanej regule niesie sizeDown { ranks: [connected] }', () => {
    const c = content.evalRules.find((r) => r.id === 'R-M5-004')!.check.cases!.find((x) => x.rule === 'R-M5-004')!;
    expect(c.best).toBe('check');
    expect(c.sizeDown).toEqual({ ranks: ['connected'] });
  });
  // wektory: tekstura z classifyFlop, ocena z silnika gry na prawdziwym rozdaniu (BTN otwiera, BB sprawdza i czeka)
  const WEKTORY = [
    { flop: '7h 6d 5c', ranks: 'connected', big: 'inaccuracy' },
    { flop: '8s 6h 4d', ranks: 'connected', big: 'inaccuracy' },
    { flop: '8s 5h 2d', ranks: 'semi-connected', big: 'acceptable' },
    { flop: '9c 7d 2h', ranks: 'semi-connected', big: 'acceptable' },
  ] as const;
  for (const w of WEKTORY) {
    it(`${w.flop} (${w.ranks}): czekanie zgodne, mały dopuszczalny, duży ${w.big}`, () => {
      const flop = parseCards(w.flop);
      expect(classifyFlop(flop)).toMatchObject({ height: 'low', ranks: w.ranks });
      const st = flopBtn(parseCards('Ad Kd'), parseCards('Qs Qc'), flop);
      const oceny = [gradeDecision(st, { type: 'check' }, kit), gradeDecision(st, zaklad('cbet.size.small'), kit), gradeDecision(st, zaklad('cbet.size.big'), kit)];
      expect(oceny.map((f) => f.ruleId)).toEqual(['R-M5-004', 'R-M5-004', 'R-M5-004']);
      expect(oceny.map((f) => f.verdict)).toEqual(['compliant', 'acceptable', w.big]);
    });
  }
});
