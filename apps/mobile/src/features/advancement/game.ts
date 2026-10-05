import { verdictPoints } from '@szkola/poker-core';
import { ADVANCEMENT, type AdvancementReport, type GameInput } from '@szkola/srs';
import type { UserDb } from '@/data/user/db';
import { recentGameVerdicts, saveAdvancementHistory } from '@/data/user/game';
import { getSetting } from '@/data/user/repo';

/** Konfiguracja stołu w liczbie głównej („moja gra”, decyzja P16); w wersji 1 jedyna to 6-max 100bb. */
export function myGameConfig(db: UserDb): string {
  return getSetting(db, 'advancementConfig') ?? ADVANCEMENT.defaultConfig;
}

/** Punkty ostatnich ocenionych decyzji w każdym obszarze z grą (dokument 14, 4.8). */
export function gameInput(db: UserDb, config = myGameConfig(db)): GameInput {
  const points = new Map<string, (0 | 1)[]>();
  for (const m of ADVANCEMENT.gameModules) {
    const pts = recentGameVerdicts(db, m, config, ADVANCEMENT.gameWindow)
      .map((v) => verdictPoints(v as Parameters<typeof verdictPoints>[0]))
      .filter((p): p is 0 | 1 => p !== null);
    if (pts.length) points.set(m, pts);
  }
  return { config, points };
}

/** Zapis historii wskaźnika: wiersz „all” i po jednym na obszar, nadpisywany w ciągu dnia (4.8). */
export function saveHistory(db: UserDb, r: AdvancementReport, now = Date.now()): void {
  const games = r.game.status === 'active' ? new Map(r.game.areas.map((g) => [g.id, g])) : new Map();
  const total = r.game.status === 'active' ? r.game.areas.reduce((a, g) => a + (g.score !== null ? g.decisions : 0), 0) : 0;
  saveAdvancementHistory(
    db,
    [
      { area: 'all', knowledge: r.knowledge.score, game: null, combined: r.overall, gameDecisions: total },
      ...r.combined.map((c) => {
        const k = r.knowledge.areas.find((a) => a.id === c.id);
        const g = games.get(c.id);
        return { area: c.id, knowledge: k?.score ?? null, game: g?.score ?? null, combined: c.score, gameDecisions: g?.decisions ?? 0 };
      }),
    ],
    now,
  );
}
