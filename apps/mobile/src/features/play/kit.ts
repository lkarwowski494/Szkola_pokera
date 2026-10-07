import type { AreaDef, CbetDrill, CompiledEvalRule } from '@szkola/content-schema';
import {
  BOT_SOLVER_PLAYERS,
  botKnowledgeFrom,
  gradingKitFrom,
  PLAY_TABLE_SIZES,
  solverFile,
  type AreaContext,
  type BotKnowledge,
  type EvalSpot,
  type GradingKit,
} from '@szkola/poker-core';

/** Minimalny dostęp do bazy treści: expo-sqlite w aplikacji, node:sqlite w testach. */
export interface ContentQuery {
  all<T>(sql: string, ...params: (string | number)[]): T[];
}

export interface PlayFormat {
  knowledge: BotKnowledge;
  grading: GradingKit;
}

export interface PlayKit {
  /** Stół 6-osobowy (domyślny; obszary treningowe M13 grają tylko przy nim). */
  knowledge: BotKnowledge;
  grading: GradingKit;
  /** Wiedza botów i ocena według liczby graczy przy stole (6 albo 9). */
  formats: Record<number, PlayFormat>;
  areaCtx: AreaContext;
  areas: AreaDef[];
  contentHash: string;
}

/**
 * Zestaw trybu gry z bazy treści (content-build → game_kit, ranges, numbers, drills): wiedza botów, reguły oceny,
 * spoty solvera i obszary. Jedno źródło prawdy: żadnych liczb w kodzie aplikacji.
 */
/** Wiedza botów i ocena dla stołu z daną liczbą graczy (zapisane rozdania mają ją w konfiguracji). */
export function playFormat(kit: PlayKit, players: number): PlayFormat {
  const f = kit.formats[players];
  if (!f) throw new Error(`Tryb gry nie obsługuje stołu ${players}-osobowego`);
  return f;
}

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
  const handRanking = (kit.get('handRanking') as string[]) ?? [];
  const rules = (kit.get('evalRules') as CompiledEvalRule[]) ?? [];
  const formats: Record<number, PlayFormat> = {};
  for (const players of PLAY_TABLE_SIZES) {
    formats[players] = {
      knowledge: botKnowledgeFrom({ number, spots, handRanking, cbetCases, players }),
      grading: gradingKitFrom({ number, rules, spots, solverFile: solverFile(players), players }),
    };
  }
  const { knowledge, grading } = formats[BOT_SOLVER_PLAYERS]!;
  const contentHash = q.all<{ value: string }>("SELECT value FROM meta WHERE key = 'hash'")[0]?.value ?? '?';
  return {
    knowledge,
    grading,
    formats,
    areaCtx: { spots: grading.spots, sizes: knowledge.sizes, cbetCases },
    areas: (kit.get('areas') as AreaDef[]) ?? [],
    contentHash,
  };
}
