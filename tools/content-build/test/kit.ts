import { join, resolve } from 'node:path';
import { BOT_SOLVER_FILE, BOT_SOLVER_PLAYERS, botKnowledgeFrom, gradingKitFrom, type BotKnowledge, type GradingKit } from '@szkola/poker-core';
import { compileContent } from '../src/build';

/** Skompilowana treść i zestawy dla botów i oceny (wspólne dla testów trybu gry). */
export const content = compileContent(join(resolve(import.meta.dirname, '../../..'), 'content'));
const numbers = new Map(content.numbers.map((n) => [n.key, n.value]));
export const number = (k: string): number => {
  const v = numbers.get(k);
  if (v === undefined) throw new Error(`brak liczby ${k}`);
  return v;
};
export const cbetCases = content.lessons
  .flatMap((l) => l.drills)
  .flatMap((d) => (d.kind === 'cbet' && d.position === 'BTN' ? d.cases.map((c) => ({ when: c.when, best: c.best })) : []));
export const knowledge: BotKnowledge = botKnowledgeFrom({ number, spots: content.ranges, handRanking: content.handRanking, cbetCases });
export const kit: GradingKit = gradingKitFrom({ number, rules: content.evalRules, spots: content.ranges, solverFile: BOT_SOLVER_FILE, players: BOT_SOLVER_PLAYERS });
