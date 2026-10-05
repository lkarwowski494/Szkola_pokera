import type { AreaDef, CbetDrill, CompiledEvalRule } from '@szkola/content-schema';
import {
  BOT_SOLVER_FILE,
  BOT_SOLVER_PLAYERS,
  botKnowledgeFrom,
  gradingKitFrom,
  type AreaContext,
  type BotKnowledge,
  type EvalSpot,
  type GradingKit,
} from '@szkola/poker-core';

/** Minimalny dostęp do bazy treści: expo-sqlite w aplikacji, node:sqlite w testach. */
export interface ContentQuery {
  all<T>(sql: string, ...params: (string | number)[]): T[];
}

export interface PlayKit {
  knowledge: BotKnowledge;
  grading: GradingKit;
  areaCtx: AreaContext;
  areas: AreaDef[];
  contentHash: string;
}

/**
 * Zestaw trybu gry z bazy treści (content-build → game_kit, ranges, numbers, drills): wiedza botów, reguły oceny,
 * spoty solvera i obszary. Jedno źródło prawdy: żadnych liczb w kodzie aplikacji.
 */
export function loadPlayKit(q: ContentQuery): PlayKit {
  const kit = new Map(q.all<{ key: string; value: string }>('SELECT key, value FROM game_kit').map((r) => [r.key, JSON.parse(r.value) as unknown]));
  const numbers = new Map(q.all<{ key: string; value: number }>('SELECT key, value FROM numbers').map((r) => [r.key, r.value]));
  const number = (k: string) => {
    const v = numbers.get(k);
    if (v === undefined) throw new Error(`Brak liczby ${k} w treści`);
    return v;
  };
  const spots = q
    .all<{ id: string; hero: string; path: string; groups: string; uncertain: string; solver: string; actions: string }>(
      'SELECT id, hero, path, groups, uncertain, solver, actions FROM ranges',
    )
    .map((r) => ({ id: r.id, hero: r.hero, path: r.path, groups: JSON.parse(r.groups), uncertain: JSON.parse(r.uncertain), solver: r.solver, actions: JSON.parse(r.actions) })) as (EvalSpot & {
    solver: string;
  })[];
  const cbetCases = q
    .all<{ data: string }>("SELECT data FROM drills WHERE kind = 'cbet'")
    .map((r) => JSON.parse(r.data) as CbetDrill)
    .filter((d) => d.position === 'BTN')
    .flatMap((d) => d.cases.map((c) => ({ when: c.when, best: c.best })));
  const knowledge = botKnowledgeFrom({ number, spots, handRanking: (kit.get('handRanking') as string[]) ?? [], cbetCases });
  const grading = gradingKitFrom({ number, rules: (kit.get('evalRules') as CompiledEvalRule[]) ?? [], spots, solverFile: BOT_SOLVER_FILE, players: BOT_SOLVER_PLAYERS });
  const contentHash = q.all<{ value: string }>("SELECT value FROM meta WHERE key = 'hash'")[0]?.value ?? '?';
  return {
    knowledge,
    grading,
    areaCtx: { spots: grading.spots, sizes: knowledge.sizes, cbetCases },
    areas: (kit.get('areas') as AreaDef[]) ?? [],
    contentHash,
  };
}
