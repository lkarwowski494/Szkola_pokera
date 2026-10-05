/// <reference types="jest" />
import { applyAction, situationAt, startHand, type Finding } from '@szkola/poker-core';
import { ADVANCEMENT, computeAdvancement } from '@szkola/srs';
import { advancementHistoryFor, createGameSession, saveGameHand } from '@/data/user/game';
import { openTestDb } from '@/test-utils/userTestDb';
import { gameInput, saveHistory } from '../game';

jest.mock('better-sqlite3', () => function BetterSqlite3() {}, { virtual: true });

const cfg = { stacks: Array(6).fill(10000), smallBlind: 50, bigBlind: 100, button: 3 };

function foldHand(seed: number) {
  let st = startHand(cfg, seed);
  while (st.toAct !== null) st = applyAction(st, { type: 'fold' });
  return st;
}

function finding(verdict: Finding['verdict'], module: string): Finding {
  return { index: 0, street: 'preflop', seat: 0, position: 'UTG', hole: [0, 1], board: [], action: { type: 'fold' }, verdict, ruleId: 'R', level: 'gto', module, family: 'f', detail: null, alsoRules: [], dedupeKey: `${module}-${verdict}-${Math.random()}`, pot: 150, toCall: 100, stack: 10000 };
}

describe('wskaźnik zaawansowania: część „gra” z danych gry', () => {
  it('punkty z werdyktów (bez „bez oceny” i czasu), wynik połączony i historia dnia', () => {
    const { db } = openTestDb();
    const sid = createGameSession(db, { mode: 'free', areaModule: null, handsPlanned: 50, tablePreset: 'balanced', seatStyles: [], players: 6, stackBb: 100, timeLimitS: null, botVersion: 1, contentHash: 'h', seed: 1 });
    const now = new Date(2026, 9, 5, 12).getTime();
    for (let i = 0; i < ADVANCEMENT.gameMin; i++) {
      const st = foldHand(i);
      const verdicts: Finding['verdict'][] = [i % 4 === 0 ? 'mistake' : 'compliant'];
      if (i % 5 === 0) verdicts.push('unrated', 'timeout');
      const f = verdicts.map((v) => finding(v, 'm3'));
      saveGameHand(db, sid, { handNo: i, seed: i, config: cfg, preset: null, actions: st.actions, heroSeat: 0, timeouts: [], resultBb: 0 }, f, new Map([[0, situationAt(cfg, i, st.actions, 0)]]), { contentHash: 'h', stackBb: 100 }, now + i);
    }
    const input = gameInput(db);
    expect(input.config).toBe('6-100');
    expect(input.points.get('m3')).toHaveLength(ADVANCEMENT.gameMin);
    const areas = [{ id: 'm3', skills: ['x'], counted: true }];
    const r = computeAdvancement(areas, [], now, input);
    expect(r.game.status).toBe('active');
    // 30 z 40 bez błędu = 75; wiedza 0 → obszar 38 (0,375 zaokrąglone)
    expect(r.game.status === 'active' && r.game.areas[0]!.score).toBe(75);
    expect(r.combined[0]).toMatchObject({ score: 38, provisional: true, knowledgeOnly: false });
    saveHistory(db, r, now);
    saveHistory(db, r, now + 1000);
    const all = advancementHistoryFor(db, 'all');
    expect(all).toHaveLength(1);
    expect(all[0]).toMatchObject({ combined: r.overall, gameDecisions: ADVANCEMENT.gameMin });
    expect(advancementHistoryFor(db, 'm3')[0]).toMatchObject({ game: 75, combined: 38 });
  });
});
