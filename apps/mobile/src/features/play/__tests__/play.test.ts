/// <reference types="jest" />
/// <reference types="node" />
import { CONTENT_SCHEMA_VERSION } from '@szkola/content-schema';
import {
  actionMenu,
  botDecide,
  botView,
  applyAction,
  classOf,
  createRng,
  dealPlayHand,
  gradeDecision,
  HAND_CLASSES,
  parseCards,
  startHand,
  finishPlayHand,
  heroAct,
  nextActor,
  runAuto,
  styleOf,
  type AreaGeneratorId,
  type PlayConfig,
  type PlayHand,
} from '@szkola/poker-core';
import i18n from 'i18next';
import { join } from 'node:path';
import { createGameSession, gameFindingsForSession, gameHandsForSession, gameVerdictCounts, saveGameHand } from '@/data/user/game';
import '@/i18n';
import { openTestDb } from '@/test-utils/userTestDb';
import { areaStatuses } from '../areas';
import { menuLabel } from '../format';
import { loadPlayKit } from '../kit';
import { buildReport } from '../report';

jest.mock('better-sqlite3', () => function BetterSqlite3() {}, { virtual: true });
jest.mock('@formatjs/intl-pluralrules/polyfill.js', () => ({}));
jest.mock('@formatjs/intl-pluralrules/locale-data/pl.js', () => ({}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const content = new DatabaseSync(join(__dirname, `../../../../assets/content/content-v${CONTENT_SCHEMA_VERSION}.db`), { readOnly: true });
const kit = loadPlayKit({ all: (sql, ...p) => content.prepare(sql).all(...p) as never });
const t = i18n.t.bind(i18n);

const pc = (area: AreaGeneratorId | null): PlayConfig => ({ players: 6, stackBb: 100, bigBlind: 100, seatStyles: Array(5).fill(styleOf('balanced')), hands: 10, seed: 11, area });

function play(hp: PlayHand, config: PlayConfig): PlayHand {
  let h = hp;
  for (let i = 0; i < 200; i++) {
    h = runAuto(h, kit.knowledge, config);
    if (nextActor(h) === 'done') return h;
    h = heroAct(h, botDecide(botView(h.state), kit.knowledge, styleOf('loose-passive'), createRng(i + h.seed)));
  }
  throw new Error('rozdanie się nie kończy');
}

/** Tekst bez niepodstawionych kluczy i znaczników. */
const clean = (s: string) => {
  expect(s).not.toMatch(/\{\{|play\.|undefined|NaN/);
};

describe('tryb gry: zestaw z treści i ekrany (logika)', () => {
  it('zestaw gry z bazy treści: spoty solvera, reguły z warunkiem, obszary', () => {
    expect(kit.knowledge.spots).toHaveLength(9);
    expect(kit.grading.rules.length).toBeGreaterThanOrEqual(20);
    expect(kit.areas.map((a) => a.module)).toEqual(['m2', 'm3', 'm4', 'm5', 'm7']);
    expect(kit.knowledge.handRanking).toHaveLength(169);
  });

  it('obszar odblokowuje się po ukończeniu wszystkich lekcji modułu', () => {
    const lessons = [
      { id: 'a', moduleId: 'm3' },
      { id: 'b', moduleId: 'm3' },
    ];
    const [m2, m3] = areaStatuses(kit.areas.slice(0, 2), lessons, (id) => id === 'a');
    expect(m2!.unlocked).toBe(false);
    expect(m3!.unlocked).toBe(false);
    expect(areaStatuses(kit.areas.slice(1, 2), lessons, () => true)[0]!.unlocked).toBe(true);
    expect(areaStatuses(kit.areas.slice(1, 2), lessons, () => false, (m) => m === 'm3')[0]!.unlocked).toBe(true);
  });

  it.each([null, 'rfi', 'vs-open', 'cbet-ip', 'flop-draw', 'turn-draw'] as const)('sesja %s: zapis rozdań i raport bez brakujących tekstów', (area) => {
    const { db } = openTestDb();
    const config = pc(area);
    const sid = createGameSession(db, { mode: area ? 'area' : 'free', areaModule: null, handsPlanned: 10, tablePreset: 'balanced', seatStyles: Array(5).fill('balanced'), players: 6, stackBb: 100, timeLimitS: null, botVersion: 1, contentHash: kit.contentHash, seed: 11 });
    for (let n = 0; n < 10; n++) {
      const h = play(dealPlayHand(config, n, kit.areaCtx), config);
      const r = finishPlayHand(h, kit.grading);
      saveGameHand(db, sid, { handNo: n, seed: h.seed, config: h.config, preset: h.preset, actions: h.state.actions, heroSeat: 0, timeouts: h.timeouts, resultBb: r.resultBb }, r.findings, r.situations, { contentHash: kit.contentHash, stackBb: 100 });
    }
    const items = buildReport(t, gameFindingsForSession(db, sid), gameHandsForSession(db, sid));
    expect(items.length).toBe(gameVerdictCounts(db, sid).all);
    expect(items.length).toBeGreaterThan(0);
    for (const i of items) {
      clean(i.action);
      if (i.detail) clean(i.detail);
      for (const s of i.log) for (const l of s.lines) clean(l);
      expect(i.hole).toHaveLength(2);
    }
  });

  it('BB wobec SB i Button wobec CO: sprawdzenie i 3-bet tą samą ręką mają ten sam werdykt (ocenia się tylko gram / pas)', () => {
    // podział 3-bet / sprawdzenie w tych spotach nie przeszedł walidacji solvera (dokument 10: BB vs SB odstępstwo od K1,
    // BTN vs CO decyzja A2), więc ocena nie może karać za wybór jednej z dwóch akcji „gram”
    // 6 graczy, button na miejscu 3: UTG = 0, HJ = 1, CO = 2, BTN = 3, SB = 4, BB = 5
    const cases = [
      { spot: 'vs-open.bb-vs-sb', hero: 5, folds: 4, open: 300, threeBet: 900, cards: { AA: 'AsAh', A5s: 'As5s', '76s': '7s6s', K9o: 'Ks9d', '22': '2s2h', T7o: 'Ts7d', ATo: 'AsTd', Q4s: 'Qs4s' } },
      { spot: 'vs-open.btn-vs-co', hero: 3, folds: 2, open: 250, threeBet: 750, cards: { AA: 'AsAh', KQs: 'KsQs', A5s: 'As5s', '55': '5s5h', T9s: 'Ts9s', KJo: 'KsJd', '72o': '7s2d', J5o: 'Js5d' } },
    ];
    for (const c of cases) {
      const spot = kit.grading.spots.find((s) => s.id === c.spot)!;
      expect(spot.groups).toHaveLength(1);
      for (const [hc, txt] of Object.entries(c.cards)) {
        const hole = parseCards(txt) as [number, number];
        expect(classOf(hole[0], hole[1])).toBe(hc);
        const holes: ([number, number] | null)[] = Array(6).fill(null);
        holes[c.hero] = hole;
        let st = startHand({ stacks: Array(6).fill(10000), smallBlind: 50, bigBlind: 100, button: 3 }, 1, { holes });
        for (let i = 0; i < c.folds; i++) st = applyAction(st, { type: 'fold' });
        st = applyAction(st, { type: 'raise', to: c.open });
        const call = gradeDecision(st, { type: 'call' }, kit.grading);
        const threeBet = gradeDecision(st, { type: 'raise', to: c.threeBet }, kit.grading);
        expect(call.ruleId).not.toBeNull();
        expect(threeBet.verdict).toBe(call.verdict);
        const play = spot.groups[0]!.freqs[HAND_CLASSES.indexOf(hc as never)]!;
        if (play > 0.9) expect(call.verdict).toBe('compliant');
      }
    }
  });

  it('napisy przycisków akcji bez brakujących kluczy', () => {
    const config = pc(null);
    for (let n = 0; n < 30; n++) {
      let h = dealPlayHand(config, n, kit.areaCtx);
      for (let k = 0; k < 20; k++) {
        h = runAuto(h, kit.knowledge, config);
        if (nextActor(h) === 'done') break;
        const menu = actionMenu(h.state, kit.knowledge.sizes);
        for (const m of menu) clean(menuLabel(t, m));
        h = heroAct(h, menu[(n + k) % menu.length]!.action);
      }
    }
  });
});
