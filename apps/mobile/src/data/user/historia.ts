import { asc, eq } from 'drizzle-orm';
import type { UserDb } from './db';
import { advancementHistory } from './schema';

/**
 * Historia wskaźnika zaawansowania (dokument 14, 4.8) w starej bazie `user.db` — przeniesiona z `game.ts` przy usunięciu
 * trybu gry (ADR 0011). Kolumny gry zostają w schemacie drizzle (bez migracji, część 4 krok 2); zapisy mają w nich `null`/0.
 */
export interface AdvancementHistoryRow {
  area: string;
  knowledge: number | null;
  game: number | null;
  combined: number | null;
  gameDecisions: number;
}

/** Dzień RRRR-MM-DD w czasie lokalnym. */
export function localDay(now: number): string {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Zapis historii wskaźnika: jeden wiersz na dzień i obszar, nadpisywany w ciągu dnia (4.8). */
export function saveAdvancementHistory(db: UserDb, rows: readonly AdvancementHistoryRow[], now = Date.now()): void {
  const day = localDay(now);
  db.transaction((tx) => {
    for (const r of rows) {
      tx.insert(advancementHistory)
        .values({ day, ...r, updatedAt: now })
        .onConflictDoUpdate({ target: [advancementHistory.day, advancementHistory.area], set: { ...r, updatedAt: now } })
        .run();
    }
  });
}

export function advancementHistoryFor(db: UserDb, area: string): (AdvancementHistoryRow & { day: string })[] {
  return db.select().from(advancementHistory).where(eq(advancementHistory.area, area)).orderBy(asc(advancementHistory.day)).all();
}
