import { describe, expect, it } from 'vitest';
import {
  applyAction,
  botDecide,
  botView,
  classOf,
  createRng,
  gradeDecision,
  gradeHand,
  HAND_CLASSES,
  makesCard,
  permuteSituation,
  replaySituation,
  situationAt,
  parseCards,
  rangeVerdict,
  startHand,
  styleOf,
  verdictPoints,
  type Card,
  type Finding,
  type HandPreset,
  type HandState,
  type PlayerAction,
  type TableConfig,
} from '@szkola/poker-core';
import { content, kit, knowledge, number } from './kit';

const BB = 100;
/** button 3: miejsca 0 UTG, 1 HJ, 2 CO, 3 BTN, 4 SB, 5 BB */
const cfg = (stack = 100 * BB): TableConfig => ({ stacks: Array(6).fill(stack), smallBlind: BB / 2, bigBlind: BB, button: 3 });
const hole = (s: string) => parseCards(s) as unknown as [Card, Card];
const F: PlayerAction = { type: 'fold' };
const C: PlayerAction = { type: 'call' };
const K: PlayerAction = { type: 'check' };
const R = (bb: number): PlayerAction => ({ type: 'raise', to: Math.round(bb * BB) });
const B = (chips: number): PlayerAction => ({ type: 'bet', to: Math.round(chips) });

/** Gra akcje po kolei (od miejsca, które mówi) i ocenia ostatnią. */
function gradeLast(seq: PlayerAction[], preset: HandPreset, config = cfg()): Finding {
  let st: HandState = startHand(config, 1, preset);
  for (const a of seq.slice(0, -1)) st = applyAction(st, a);
  return gradeDecision(st, seq[seq.length - 1]!, kit);
}

const at = (seat: number, cards: string): HandPreset => {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[seat] = hole(cards);
  return { holes };
};

/** Klasa, w której przebicie albo pas ma w spocie częstość z danego przedziału (z kanonu, bez wpisywania liczb). */
function classWithFreq(spotId: string, lo: number, hi: number): { hc: string; action: 'raise' | 'fold' } {
  const spot = content.ranges.find((r) => r.id === spotId)!;
  for (let i = 0; i < HAND_CLASSES.length; i++) {
    const hc = HAND_CLASSES[i]!;
    if (spot.uncertain.includes(hc)) continue;
    const play = spot.groups.reduce((s, g) => s + g.freqs[i]!, 0);
    if (play >= lo && play < hi) return { hc, action: 'raise' };
    if (1 - play >= lo && 1 - play < hi) return { hc, action: 'fold' };
  }
  throw new Error(`brak klasy z częstością ${lo}–${hi} w ${spotId}`);
}

function cardsOf(hc: string): string {
  const s = hc[2] === 's' ? ['s', 's'] : ['s', 'h'];
  return `${hc[0]}${s[0]} ${hc[1]}${s[1]}`;
}

describe('ocena M13: zakresy solvera przed flopem (5.2, ADR-26)', () => {
  it('UTG: otwarcie i pas według częstości solvera, z regułą i poziomem', () => {
    const aa = gradeLast([R(2.5)], at(0, 'As Ah'));
    expect(aa).toMatchObject({ verdict: 'compliant', ruleId: 'R-M3-002', level: 'gto', module: 'm3' });
    expect(gradeLast([F], at(0, 'As Ah'))).toMatchObject({ verdict: 'mistake', ruleId: 'R-M3-002' });
    expect(gradeLast([R(2.5)], at(0, '7s 2h'))).toMatchObject({ verdict: 'mistake' });
    expect(gradeLast([F], at(0, '7s 2h'))).toMatchObject({ verdict: 'compliant' });
    expect(aa.family).toBeTruthy();
  });

  it('akcja grana przez solver w 3,5–25% przypadków jest dopuszczalna', () => {
    const lo = number('range.mixed.min');
    const hi = number('range.mixed.low');
    const { hc, action } = classWithFreq('rfi.btn', lo, hi);
    expect(gradeLast([F, F, F, action === 'raise' ? R(2.5) : F], at(3, cardsOf(hc))).verdict).toBe('acceptable');
    expect(rangeVerdict([0.9, 0.1, 0.02], kit.thresholds)).toEqual(['correct', 'acceptable', 'wrong']);
  });

  it('klasy niepewne nie dostają oceny solverem', () => {
    const spot = content.ranges.find((r) => r.id === 'rfi.utg')!;
    const hc = spot.uncertain[0]!;
    expect(gradeLast([F], at(0, cardsOf(hc))).verdict).toBe('unrated');
  });

  it('dobra akcja, zły rozmiar: niedokładność z regułą rozmiaru', () => {
    expect(gradeLast([R(4)], at(0, 'As Ah'))).toMatchObject({ verdict: 'inaccuracy', ruleId: 'R-M3-007' });
    // zły rozmiar złej akcji to nadal błąd
    expect(gradeLast([R(4)], at(0, '7s 2h'))).toMatchObject({ verdict: 'mistake' });
  });

  it('limp jako pierwszy wchodzący to błąd (R-M3-004)', () => {
    expect(gradeLast([C], at(0, 'As Ah'))).toMatchObject({ verdict: 'mistake', ruleId: 'R-M3-004' });
  });

  it('duży blind wobec Buttona: gram albo pas, 3-bet bez pozycji do 4x', () => {
    const toBB = [F, F, F, R(2.5), F];
    expect(gradeLast([...toBB, R(10)], at(5, 'As Ah'))).toMatchObject({ verdict: 'compliant' });
    expect(gradeLast([...toBB, R(7.5)], at(5, 'As Ah'))).toMatchObject({ verdict: 'inaccuracy', ruleId: 'R-M4-002' });
    expect(gradeLast([...toBB, F], at(5, 'As Ah'))).toMatchObject({ verdict: 'mistake', ruleId: 'R-M4-004' });
    expect(gradeLast([...toBB, F], at(5, '7s 2h'))).toMatchObject({ verdict: 'compliant' });
  });

  it('pas przy darmowym czekaniu to błąd rachunkowy (R-M1-002) i wygrywa z innymi regułami', () => {
    // wszyscy pasują do SB, SB dopłaca, BB może czekać
    const f = gradeLast([F, F, F, F, C, F], at(5, '7s 2h'));
    expect(f).toMatchObject({ verdict: 'mistake', ruleId: 'R-M1-002', level: 'math' });
    // czekanie nie daje werdyktu tej reguły (reguła-zakaz)
    expect(gradeLast([F, F, F, F, C, K], at(5, '7s 2h')).verdict).toBe('unrated');
  });
});

describe('ocena M13: dobieranie (5.4)', () => {
  // BTN otwiera, BB sprawdza; flop z dwoma pikami; BB betuje, BTN (gracz) z kolorem
  const preset: HandPreset = { holes: [null, null, null, hole('As 5s'), null, hole('Kd Qc')], board: parseCards('Ks 7s 2d 9h 3c') };
  const pre = [F, F, F, R(2.5), F, C];
  const pot = 2 * 250 + 50;

  it('cena za wysoka: pas zgodny, sprawdzenie bez implied odds to błąd', () => {
    // bet całej puli: potrzeba 1/3, kolor na jedną kartę ok. 19%
    const seq = [...pre, B(pot)];
    const call = gradeLast([...seq, C], preset, cfg(10 * BB));
    expect(call.detail).toMatchObject({ kind: 'draw', outs: 9, cards: 1 });
    expect(call.verdict).toBe('mistake');
    expect(gradeLast([...seq, F], preset, cfg(10 * BB))).toMatchObject({ verdict: 'compliant', ruleId: 'R-M2-005' });
  });

  it('cena dobra: sprawdzenie zgodne, pas to błąd', () => {
    const seq = [...pre, B(Math.round(pot / 5))];
    expect(gradeLast([...seq, C], preset)).toMatchObject({ verdict: 'compliant', ruleId: 'R-M2-005' });
    expect(gradeLast([...seq, F], preset)).toMatchObject({ verdict: 'mistake', ruleId: 'R-M2-005' });
  });

  it('implied odds: głęboki stack i dobieranie do najlepszej ręki dają sprawdzenie dopuszczalne', () => {
    const seq = [...pre, B(Math.round(pot / 2))];
    const f = gradeLast([...seq, C], preset, cfg(300 * BB));
    expect(f).toMatchObject({ verdict: 'acceptable', ruleId: 'R-M7-008' });
    expect(f.detail).toMatchObject({ kind: 'draw', implied: { nutDraw: true, mathOk: true } });
    // ten sam spot przy płytkich stackach: implied odds nie ma skąd wziąć, sprawdzenie to błąd
    expect(gradeLast([...seq, C], preset, cfg(10 * BB))).toMatchObject({ verdict: 'mistake', ruleId: 'R-M7-008' });
    // dobieranie nie do najlepszej ręki (niski kolor przy możliwym wyższym)
    const weak: HandPreset = { holes: [null, null, null, hole('6s 5s'), null, hole('Kd Qc')], board: parseCards('Ks 7s 2d 9h 3c') };
    expect(gradeLast([...seq, C], weak, cfg(300 * BB))).toMatchObject({ verdict: 'mistake', ruleId: 'R-M7-008' });
  });
});

describe('ocena M13: c-bet (przypadki z lekcji M5)', () => {
  const pre = [F, F, F, R(2.5), F, C, K];
  const pot = 2 * 250 + 50;
  const dry: HandPreset = { holes: [null, null, null, hole('Ah Qd'), null, null], board: parseCards('Ks 7d 2c 9h 3c') };
  const low: HandPreset = { holes: [null, null, null, hole('Ah Qd'), null, null], board: parseCards('7s 6d 5c 9h 3c') };

  it('suchy, wysoki flop: mały c-bet zgodny, duży niedokładność, czekanie dopuszczalne', () => {
    expect(gradeLast([...pre, B(pot / 3)], dry)).toMatchObject({ verdict: 'compliant', ruleId: 'R-M5-007' });
    expect(gradeLast([...pre, B(pot * 0.75)], dry)).toMatchObject({ verdict: 'inaccuracy', ruleId: 'R-M5-007' });
    expect(gradeLast([...pre, K], dry)).toMatchObject({ verdict: 'acceptable', ruleId: 'R-M5-007' });
  });

  it('niski, połączony flop: czekanie zgodne, c-bet dopuszczalny', () => {
    expect(gradeLast([...pre, K], low)).toMatchObject({ verdict: 'compliant', ruleId: 'R-M5-004' });
    expect(gradeLast([...pre, B(pot / 3)], low)).toMatchObject({ verdict: 'acceptable', ruleId: 'R-M5-004' });
  });
});

describe('ocena M13: zasady ogólne', () => {
  /** Rozgrywa rozdanie: gracz na miejscu 0 gra botem zbalansowanym, reszta botami. */
  function playHand(seed: number, config = cfg()): HandState {
    const rng = createRng(seed + 99);
    let st = startHand(config, seed);
    while (st.toAct !== null) st = applyAction(st, botDecide(botView(st), knowledge, styleOf('balanced'), rng));
    return st;
  }

  it('werdykt nie zależy od kart rywali ani od kart, które padły po decyzji (5.1)', () => {
    for (let i = 0; i < 150; i++) {
      const st = playHand(i);
      const a = gradeHand(cfg(), i, st.actions, 0, kit);
      // ten sam przebieg z innymi kartami rywali i innymi niewidocznymi jeszcze kartami
      const used = new Set<number>([...st.seats[0]!.hole, ...st.runout]);
      const free = Array.from({ length: 52 }, (_, c) => c).filter((c) => !used.has(c));
      const holes = st.seats.map((s, k) => (k === 0 ? s.hole : ([free[2 * k]!, free[2 * k + 1]!] as const)));
      const b = gradeHand(cfg(), i, st.actions, 0, kit, { preset: { holes, board: st.runout } });
      expect(b.map((f) => [f.verdict, f.ruleId])).toEqual(a.map((f) => [f.verdict, f.ruleId]));
    }
  });

  it('karta z błędu: ta sama sytuacja z zamienionymi kolorami ma ten sam werdykt (5.6)', () => {
    let checked = 0;
    for (let i = 0; i < 200; i++) {
      const st = playHand(3000 + i);
      for (const f of gradeHand(cfg(), 3000 + i, st.actions, 0, kit)) {
        const sit = situationAt(cfg(), 3000 + i, st.actions, f.index);
        const swapped = permuteSituation(sit, createRng(i));
        expect(swapped.holes).not.toEqual(sit.holes);
        const g = gradeDecision(replaySituation(swapped), f.action, kit);
        expect([g.verdict, g.ruleId]).toEqual([f.verdict, f.ruleId]);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(200);
  });

  it('przekroczony czas: osobny werdykt, karta powtórek, poza wskaźnikiem gry (5.11)', () => {
    const st = playHand(5);
    const hero = st.actions.findIndex((x) => x.seat === 0);
    const f = gradeHand(cfg(), 5, st.actions, 0, kit, { timeouts: [hero] })[0]!;
    expect(f.verdict).toBe('timeout');
    expect(makesCard('timeout')).toBe(true);
    expect(verdictPoints('timeout')).toBeNull();
    expect(verdictPoints('acceptable')).toBe(1);
    expect(verdictPoints('inaccuracy')).toBe(0);
  });

  it('reguły z oceną poza 6-max 100bb ocenia tylko rachunek (5.5)', () => {
    const deep = cfg(200 * BB);
    expect(gradeLast([F], at(0, 'As Ah'), deep).verdict).toBe('unrated');
    expect(gradeLast([F, F, F, F, C, F], at(5, '7s 2h'), deep)).toMatchObject({ verdict: 'mistake', ruleId: 'R-M1-002' });
  });

  it('pokrycie oceny w grze swobodnej (raport „Oceniono X z Y”)', () => {
    let rated = 0;
    let all = 0;
    for (let i = 0; i < 400; i++) {
      const st = playHand(1000 + i);
      for (const f of gradeHand(cfg(), 1000 + i, st.actions, 0, kit)) {
        all++;
        if (f.verdict !== 'unrated') rated++;
      }
    }
    // dokument 14: ok. 1/3 reguł sprawdzalnych; przed flopem większość decyzji ma spot solvera
    expect(rated / all).toBeGreaterThan(0.3);
    expect(classOf(0, 1)).toBe('22');
  });
});
