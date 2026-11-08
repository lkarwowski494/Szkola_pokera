/// <reference types="jest" />
// Historia wskaźnika bez części „gra” (ADR 0011; zastępuje game.test.ts, który sprawdzał werdykty trybu gry).
import { computeAdvancement } from '@szkola/srs';
import { advancementHistoryFor } from '@/data/user/historia';
import { openTestDb } from '@/test-utils/userTestDb';
import { saveHistory } from '../historia';

jest.mock('better-sqlite3', () => function BetterSqlite3() {}, { virtual: true });

describe('wskaźnik zaawansowania: historia tylko z wiedzy', () => {
  it('jeden wiersz na dzień i obszar, nadpisywany w ciągu dnia; bez części „gra”', () => {
    const { db } = openTestDb();
    const now = new Date(2026, 9, 5, 12).getTime();
    const r = computeAdvancement([{ id: 'm3', skills: ['x'], counted: true }], [], now);
    expect(r.game.status).toBe('pending');
    saveHistory(db, r, now);
    saveHistory(db, r, now + 1000);
    const all = advancementHistoryFor(db, 'all');
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject({ knowledge: r.knowledge.score, game: null, combined: r.overall, gameDecisions: 0 });
    expect(advancementHistoryFor(db, 'm3')[0]).toMatchObject({ knowledge: 0, game: null, combined: 0 });
  });
});
