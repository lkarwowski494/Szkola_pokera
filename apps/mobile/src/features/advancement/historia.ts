import type { AdvancementReport } from '@szkola/srs';
import type { UserDb } from '@/data/user/db';
import { saveAdvancementHistory } from '@/data/user/historia';

/**
 * Zapis historii wskaźnika: wiersz „all” i po jednym na obszar, nadpisywany w ciągu dnia (4.8). Tylko wiedza: część „gra”
 * usunięta z trybem gry (ADR 0011, D-104), więc `game` = null i `gameDecisions` = 0.
 */
export function saveHistory(db: UserDb, r: AdvancementReport, now = Date.now()): void {
  saveAdvancementHistory(
    db,
    [
      { area: 'all', knowledge: r.knowledge.score, game: null, combined: r.overall, gameDecisions: 0 },
      ...r.knowledge.areas.map((a) => ({ area: a.id, knowledge: a.score, game: null, combined: a.score, gameDecisions: 0 })),
    ],
    now,
  );
}
