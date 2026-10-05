/// <reference types="jest" />
import { applyAction, BOT_POLICY_VERSION, createRng, permuteSituation, replaySituation, situationAt, startHand, type Finding, type GameSituation } from '@szkola/poker-core';
import { GAME_CARDS, gameCardId } from '@szkola/srs';
import {
  advancementHistoryFor,
  createGameSession,
  dueGameCards,
  introduceGameCards,
  newCardsToday,
  recentGameVerdicts,
  recordGameReview,
  saveAdvancementHistory,
  saveGameHand,
} from '../game';
import { recordAnswer } from '../repo';
import { openTestDb } from '@/test-utils/userTestDb';

jest.mock('better-sqlite3', () => function BetterSqlite3() {}, { virtual: true });

const NOW = new Date(2026, 9, 5, 12, 0, 0).getTime();
const cfg = { stacks: Array(6).fill(10000), smallBlind: 50, bigBlind: 100, button: 3 };

/** Rozdanie, w którym gracz (miejsce 0, UTG) pasuje, a reszta też: jedna decyzja do oceny. */
function hand(seed: number) {
  let st = startHand(cfg, seed);
  const actions: { seat: number; action: { type: 'fold' } }[] = [];
  while (st.toAct !== null) {
    actions.push({ seat: st.toAct, action: { type: 'fold' } });
    st = applyAction(st, { type: 'fold' });
  }
  return { actions, net: st.result!.net[0]! };
}

function finding(index: number, verdict: Finding['verdict'], key: string, family: string | null = 'm3.rfi.early'): Finding {
  return {
    index,
    street: 'preflop',
    seat: 0,
    position: 'UTG',
    hole: [48, 49],
    board: [],
    action: { type: 'fold' },
    verdict,
    ruleId: 'R-M3-002',
    level: 'gto',
    module: 'm3',
    family,
    detail: null,
    alsoRules: [],
    dedupeKey: key,
    pot: 150,
    toCall: 100,
    stack: 10000,
  };
}

function session(db: ReturnType<typeof openTestDb>['db']) {
  return createGameSession(
    db,
    { mode: 'free', areaModule: null, handsPlanned: 10, tablePreset: 'balanced', seatStyles: Array(5).fill('balanced'), players: 6, stackBb: 100, timeLimitS: null, botVersion: BOT_POLICY_VERSION, contentHash: 'h', seed: 1 },
    NOW,
  );
}

function save(db: ReturnType<typeof openTestDb>['db'], sid: number, seed: number, f: Finding[], at = NOW) {
  const h = hand(seed);
  const sit = situationAt(cfg, seed, h.actions, 0);
  return saveGameHand(
    db,
    sid,
    { handNo: seed, seed, config: cfg, preset: null, actions: h.actions, heroSeat: 0, timeouts: [], resultBb: h.net / 100 },
    f,
    new Map(f.map((x) => [x.index, sit])),
    { contentHash: 'h', stackBb: 100 },
    at,
  );
}

describe('dane trybu gry (migracja 0002)', () => {
  it('migracje 0000–0002 tworzą tabele gry i kolumnę źródła w review_logs', () => {
    const { raw } = openTestDb();
    const tables = (raw.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all() as { name: string }[]).map((t) => t.name);
    for (const t of ['game_sessions', 'game_hands', 'game_findings', 'game_cards', 'advancement_history']) expect(tables).toContain(t);
    const cols = (raw.prepare('PRAGMA table_info(review_logs)').all() as { name: string }[]).map((c) => c.name);
    expect(cols).toContain('source');
  });

  it('błędy stają się kartami bez duplikatów; sesja sumuje rozdania i wynik', () => {
    const { db, raw } = openTestDb();
    const sid = session(db);
    save(db, sid, 1, [finding(0, 'mistake', 'k1')]);
    save(db, sid, 2, [finding(0, 'mistake', 'k1')]);
    save(db, sid, 3, [finding(0, 'compliant', 'k2')]);
    save(db, sid, 4, [finding(0, 'inaccuracy', 'k3')]);
    const cards = raw.prepare('SELECT card_id FROM game_cards ORDER BY card_id').all() as { card_id: string }[];
    expect(cards.map((c) => c.card_id)).toEqual([gameCardId('k1'), gameCardId('k3')]);
    const s = raw.prepare('SELECT hands_played, result_bb FROM game_sessions').get() as { hands_played: number; result_bb: number };
    expect(s.hands_played).toBe(4);
    expect(raw.prepare('SELECT count(*) AS n FROM game_findings').get()).toEqual({ n: 4 });
  });

  it('dzienny limit wprowadza część kart, reszta czeka do następnego dnia; limit liczy też nowe rodziny z zadań', () => {
    const { db } = openTestDb();
    const sid = session(db);
    for (let i = 0; i < GAME_CARDS.dailyNew + 5; i++) save(db, sid, 100 + i, [finding(0, 'mistake', `q${i}`, `fam${i}`)]);
    recordAnswer(db, { drillId: 'd', family: 'm2.outs', lessonId: null, mode: 'lesson', grade: 'correct', elapsedMs: 4000 }, NOW);
    expect(newCardsToday(db, NOW)).toBe(1);
    const first = introduceGameCards(db, NOW);
    expect(first.introduced).toBe(GAME_CARDS.dailyNew - 1);
    expect(introduceGameCards(db, NOW + 1000).introduced).toBe(0);
    const next = introduceGameCards(db, NOW + 24 * 60 * 60 * 1000);
    expect(next.introduced).toBe(6);
    expect(dueGameCards(db, NOW + 24 * 60 * 60 * 1000, 100)).toHaveLength(GAME_CARDS.dailyNew + 5);
  });

  it('reguła „3 razy” przywraca rodzinę do powtórek', () => {
    const { db } = openTestDb();
    const sid = session(db);
    save(db, sid, 1, [finding(0, 'mistake', 'a', 'm3.rfi.early')]);
    save(db, sid, 2, [finding(0, 'mistake', 'b', 'm3.rfi.early')]);
    expect(introduceGameCards(db, NOW).recalled).toEqual([]);
    save(db, sid, 3, [finding(0, 'inaccuracy', 'c', 'm3.rfi.early')]);
    expect(introduceGameCards(db, NOW + 1).recalled).toEqual(['m3.rfi.early']);
  });

  it('powtórka karty: ta sama sytuacja z innymi kolorami, log ze źródłem „game”, karta bez oceny wycofana', () => {
    const { db, raw } = openTestDb();
    const sid = session(db);
    save(db, sid, 7, [finding(0, 'mistake', 'r1'), finding(0, 'timeout', 'r2')]);
    introduceGameCards(db, NOW);
    const due = dueGameCards(db, NOW);
    expect(due).toHaveLength(2);
    const sit: GameSituation = due[0]!.situation;
    const st = replaySituation(permuteSituation(sit, createRng(1)));
    expect(st.toAct).toBe(0);
    const next = recordGameReview(db, due[0]!.card.familyId, 'compliant', 3000, NOW + 1000);
    expect(next!.reps).toBe(1);
    expect(raw.prepare("SELECT source FROM review_logs WHERE family_id LIKE 'game:%'").all()).toEqual([{ source: 'game' }]);
    expect(recordGameReview(db, due[1]!.card.familyId, 'unrated', 3000, NOW + 2000)).toBeNull();
    expect(dueGameCards(db, NOW + 10_000)).toHaveLength(0);
  });

  it('werdykty do wskaźnika i historia wskaźnika (jeden wiersz na dzień i obszar)', () => {
    const { db } = openTestDb();
    const sid = session(db);
    save(db, sid, 1, [finding(0, 'compliant', 'x1')], NOW);
    save(db, sid, 2, [finding(0, 'unrated', 'x2')], NOW + 1);
    save(db, sid, 3, [finding(0, 'timeout', 'x3')], NOW + 2);
    save(db, sid, 4, [finding(0, 'mistake', 'x4')], NOW + 3);
    expect(recentGameVerdicts(db, 'm3', '6-100', 100)).toEqual(['mistake', 'compliant']);
    saveAdvancementHistory(db, [{ area: 'all', knowledge: 40, game: null, combined: 40, gameDecisions: 0 }], NOW);
    saveAdvancementHistory(db, [{ area: 'all', knowledge: 42, game: 50, combined: 46, gameDecisions: 2 }], NOW + 60_000);
    saveAdvancementHistory(db, [{ area: 'all', knowledge: 44, game: 50, combined: 47, gameDecisions: 2 }], NOW + 24 * 60 * 60 * 1000);
    const h = advancementHistoryFor(db, 'all');
    expect(h.map((r) => [r.day, r.combined])).toEqual([
      ['2026-10-05', 46],
      ['2026-10-06', 47],
    ]);
  });
});
