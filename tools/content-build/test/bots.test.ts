import { describe, expect, it } from 'vitest';
import {
  applyAction,
  BOT_POLICY,
  BOT_POLICY_VERSION,
  botDecide,
  botView,
  classOf,
  combosCount,
  createRng,
  HAND_CLASSES,
  startHand,
  styleOf,
  validateAction,
  type HandState,
  type StyleId,
  type TableConfig,
} from '@szkola/poker-core';
import { content, knowledge } from './kit';

const BB = 100;
const table = (button: number): TableConfig => ({ stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button });

/** Rozgrywa rozdanie samymi botami; zwraca stan końcowy. */
function playBots(seed: number, styles: readonly StyleId[], button = seed % 6): HandState {
  const rng = createRng(seed * 7919 + 1);
  let st = startHand(table(button), seed);
  let steps = 0;
  while (st.toAct !== null) {
    const a = botDecide(botView(st), knowledge, styleOf(styles[st.toAct]!), rng);
    const err = validateAction(st, a);
    if (err) throw new Error(`bot: nielegalna akcja ${JSON.stringify(a)}: ${err}`);
    st = applyAction(st, a);
    if (++steps > 200) throw new Error('rozdanie się nie kończy');
  }
  return st;
}

/** VPIP i PFR (dobrowolne wejście i przebicie przed flopem) dla miejsc o danym stylu. */
function preflopStats(style: StyleId, hands: number): { vpip: number; pfr: number } {
  let opps = 0;
  let vpip = 0;
  let pfr = 0;
  const styles = Array<StyleId>(6).fill(style);
  for (let i = 0; i < hands; i++) {
    const st = playBots(10_000 + i, styles);
    for (let seat = 0; seat < 6; seat++) {
      const ev = st.events.filter((e) => e.street === 'preflop' && e.seat === seat && !e.type.startsWith('post'));
      opps++;
      if (ev.some((e) => e.type === 'call' || e.type === 'raise')) vpip++;
      if (ev.some((e) => e.type === 'raise')) pfr++;
    }
  }
  return { vpip: vpip / opps, pfr: pfr / opps };
}

describe('boty M13: wiedza z treści', () => {
  it('spoty bota to dokładnie spoty 6-max 100bb ze spots.yaml, z pełnymi częstościami akcji', () => {
    const sixMax = content.ranges.filter((r) => r.solver === 'preflop-6max-100bb.json');
    expect(knowledge.spots.map((s) => s.path).sort()).toEqual(sixMax.map((r) => r.path).sort());
    for (const s of knowledge.spots) {
      for (let i = 0; i < HAND_CLASSES.length; i++) {
        const sum = s.actions.reduce((a, x) => a + x.freqs[i]!, 0);
        expect(Math.abs(sum - 1)).toBeLessThan(0.01);
      }
    }
    expect(knowledge.handRanking).toHaveLength(169);
    expect(knowledge.handRanking[0]).toBe('AA');
    expect(knowledge.handRanking.indexOf('AKs')).toBeLessThan(knowledge.handRanking.indexOf('72o'));
    expect(knowledge.handRanking[168]).toBe('32o');
    expect(knowledge.cbetCases.length).toBeGreaterThan(0);
    expect(knowledge.sizes.open).toBe(content.numbers.find((n) => n.key === 'pf.open-size')!.value);
  });
});

describe('boty M13: polityka', () => {
  it('ma numer wersji', () => {
    expect(BOT_POLICY_VERSION).toBe(BOT_POLICY.version);
    expect(BOT_POLICY_VERSION).toBeGreaterThanOrEqual(1);
  });

  it('rozgrywają tysiące rozdań legalnie, przy każdym stylu i mieszanym stole', () => {
    for (const preset of Object.values(BOT_POLICY.tables)) {
      const styles = [preset[0], ...preset] as StyleId[];
      for (let i = 0; i < 300; i++) {
        const st = playBots(i, styles);
        expect(st.result!.net.reduce((a, b) => a + b, 0)).toBe(0);
      }
    }
  });

  it('w spocie solvera (UTG, wszyscy przed nim spasowali) otwierają tak często jak solver', () => {
    const spot = content.ranges.find((r) => r.id === 'rfi.utg')!;
    const styles = Array<StyleId>(6).fill('balanced');
    let opens = 0;
    let n = 0;
    // UTG to miejsce za dużym blindem; button 3 → UTG to miejsce 0
    for (let i = 0; i < 6000; i++) {
      const rng = createRng(i + 1);
      const st = startHand(table(3), 50_000 + i);
      expect(st.toAct).toBe(0);
      const a = botDecide(botView(st), knowledge, styleOf(styles[0]!), rng);
      n++;
      if (a.type === 'raise') {
        opens++;
        expect(a.to).toBe(Math.round(knowledge.sizes.open * BB));
      }
    }
    // odchylenie standardowe udziału przy 6000 próbach ok. 0,5 pp
    expect(Math.abs(opens / n - spot.playPercent)).toBeLessThan(0.02);
  });

  it('styl działa w zapowiadanym kierunku: luźny gra więcej rąk, agresywny częściej przebija', () => {
    const hands = 400;
    const tight = preflopStats('tight-passive', hands);
    const base = preflopStats('balanced', hands);
    const loose = preflopStats('loose-passive', hands);
    const lag = preflopStats('loose-aggressive', hands);
    expect(tight.vpip).toBeLessThan(base.vpip);
    expect(base.vpip).toBeLessThan(loose.vpip);
    expect(lag.pfr / lag.vpip).toBeGreaterThan(loose.pfr / loose.vpip);
  });

  it('decyzja bota nie zależy od kart innych graczy ani od kart, które dopiero padną', () => {
    for (let i = 0; i < 300; i++) {
      const seed = 70_000 + i;
      let st = startHand(table(i % 6), seed);
      const rng = createRng(i);
      // kilka akcji botów, żeby trafić też na flop
      for (let step = 0; step < 6 && st.toAct !== null; step++) st = applyAction(st, botDecide(botView(st), knowledge, styleOf('balanced'), rng));
      if (st.toAct === null) continue;
      const me = st.toAct;
      const others = st.seats.filter((s) => s.seat !== me);
      // inne karty rywali i inny dalszy przebieg talii, te same karty bota i stołu
      const used = new Set([...st.seats[me]!.hole, ...st.board]);
      const free = Array.from({ length: 52 }, (_, c) => c).filter((c) => !used.has(c)).reverse();
      const swapped: HandState = {
        ...st,
        seats: st.seats.map((s) => (s.seat === me ? s : { ...s, hole: [free[2 * others.indexOf(s)]!, free[2 * others.indexOf(s) + 1]!] as const })),
        runout: [...st.board, ...free.slice(10, 10 + 5 - st.board.length)],
      };
      const a1 = botDecide(botView(st), knowledge, styleOf('balanced'), createRng(seed));
      const a2 = botDecide(botView(swapped), knowledge, styleOf('balanced'), createRng(seed));
      expect(a2).toEqual(a1);
    }
  });

  it('ranking rąk jest zgodny z liczbą kombinacji (1326) i klasy rąk z kart', () => {
    expect(knowledge.handRanking.reduce((a, hc) => a + combosCount(hc), 0)).toBe(1326);
    expect(classOf(48, 49)).toBe('AA');
  });
});
