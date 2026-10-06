import { describe, expect, it } from 'vitest';
import {
  actionMenu,
  botDecide,
  botView,
  createRng,
  dealPlayHand,
  finishPlayHand,
  heroAct,
  HERO_SEAT,
  nextActor,
  runAuto,
  styleOf,
  validateAction,
  type AreaGeneratorId,
  type Finding,
  type PlayConfig,
  type PlayHand,
} from '@szkola/poker-core';
import { areaCtx, content, kit, knowledge } from './kit';

const base = (area: AreaGeneratorId | null, seed = 1): PlayConfig => ({
  players: 6,
  stackBb: 100,
  bigBlind: 100,
  seatStyles: Array(5).fill(styleOf('balanced')),
  hands: 20,
  seed,
  area,
});

/** Gracz w testach gra jak bot zbalansowany albo wybiera akcję funkcją. */
function playOut(hp: PlayHand, pc: PlayConfig, choose?: (h: PlayHand) => ReturnType<typeof botDecide>): PlayHand {
  let h = hp;
  for (let i = 0; i < 300; i++) {
    h = runAuto(h, knowledge, pc);
    if (nextActor(h) === 'done') return h;
    const a = choose ? choose(h) : botDecide(botView(h.state), knowledge, styleOf('balanced'), createRng(i + h.seed));
    expect(validateAction(h.state, a)).toBeNull();
    h = heroAct(h, a);
  }
  throw new Error('rozdanie się nie kończy');
}

describe('sesja gry M13', () => {
  it('gra swobodna: button krąży, rozdania się kończą, ocena i wynik w bb', () => {
    const pc = base(null, 42);
    const buttons = new Set<number>();
    let total = 0;
    let decisions = 0;
    for (let n = 0; n < 20; n++) {
      const h = playOut(dealPlayHand(pc, n, areaCtx), pc);
      buttons.add(h.config.button);
      const r = finishPlayHand(h, kit);
      total += r.resultBb;
      decisions += r.findings.length;
      for (const f of r.findings) expect(r.situations.get(f.index)!.heroSeat).toBe(HERO_SEAT);
    }
    expect(buttons.size).toBe(6);
    expect(decisions).toBeGreaterThan(20);
    expect(Number.isFinite(total)).toBe(true);
  });

  it('to samo ziarno sesji daje te same rozdania (odtwarzalność)', () => {
    const pc = base(null, 7);
    const a = playOut(dealPlayHand(pc, 3, areaCtx), pc);
    const b = playOut(dealPlayHand(pc, 3, areaCtx), pc);
    expect(b.state.actions).toEqual(a.state.actions);
  });

  const firstHero = (area: AreaGeneratorId, seed: number) => {
    const pc = base(area, seed);
    return { pc, h: runAuto(dealPlayHand(pc, seed, areaCtx), knowledge, pc) };
  };
  const gradeFirst = (pc: PlayConfig, h: PlayHand, action: Parameters<typeof heroAct>[1]): Finding => {
    const done = playOut(heroAct(h, action), pc);
    return finishPlayHand(done, kit).findings[0]!;
  };
  const areaRules = (m: string) => content.areas.find((a) => a.module === m)!.rules;

  it('obszar M3: gracz otwiera albo pasuje jako pierwszy wchodzący, decyzję ocenia reguła obszaru', () => {
    for (let s = 0; s < 60; s++) {
      const { pc, h } = firstHero('rfi', s);
      expect(nextActor(h)).toBe('hero');
      expect(h.state.street).toBe('preflop');
      expect(h.state.events.filter((e) => e.street === 'preflop' && !e.type.startsWith('post')).every((e) => e.type === 'fold')).toBe(true);
      const f = gradeFirst(pc, h, { type: 'fold' });
      expect(areaRules('m3')).toContain(f.ruleId);
    }
  });

  it('obszar M4: otwarcie przed graczem (spoty solvera) albo limperzy (izolacja)', () => {
    let spots = 0;
    let limps = 0;
    for (let s = 0; s < 80; s++) {
      const { pc, h } = firstHero('vs-open', s);
      expect(nextActor(h)).toBe('hero');
      const raised = h.state.events.some((e) => e.type === 'raise');
      if (raised) {
        spots++;
        expect(areaRules('m4')).toContain(gradeFirst(pc, h, { type: 'fold' }).ruleId);
      } else {
        limps++;
        const iso = actionMenu(h.state, knowledge.sizes).find((m) => m.kind === 'raise')!;
        expect(gradeFirst(pc, h, iso.action).ruleId).toBe('R-M4-012');
      }
    }
    expect(spots).toBeGreaterThan(0);
    expect(limps).toBeGreaterThan(0);
  });

  it('obszar M5: gracz po otwarciu z Buttona na flopie, rywal czekał; decyzję ocenia przypadek c-betu', () => {
    for (let s = 0; s < 60; s++) {
      const { pc, h } = firstHero('cbet-ip', s);
      expect(h.state.street).toBe('flop');
      expect(nextActor(h)).toBe('hero');
      expect(h.auto).toHaveLength(1);
      const f = gradeFirst(pc, h, { type: 'check' });
      expect(areaRules('m5')).toContain(f.ruleId);
    }
  });

  it('obszary M2 i M7: draw wobec zakładu na flopie i turnie, ocena rachunkiem', () => {
    for (const [area, street, module] of [['flop-draw', 'flop', 'm2'], ['turn-draw', 'turn', 'm7']] as const) {
      for (let s = 0; s < 60; s++) {
        const { pc, h } = firstHero(area, s);
        expect(h.state.street).toBe(street);
        expect(h.state.currentBet).toBeGreaterThan(0);
        const f = gradeFirst(pc, h, { type: 'call' });
        expect(areaRules(module)).toContain(f.ruleId);
      }
    }
  });

  it('każdy obszar etapu 1 występuje w grze swobodnej (dokument 14, 4.7)', () => {
    const pc = base(null, 9);
    const modules = new Set<string>();
    for (let n = 0; n < 1500 && modules.size < content.areas.length; n++) {
      const r = finishPlayHand(playOut(dealPlayHand(pc, n, areaCtx), pc), kit);
      for (const f of r.findings) if (f.module) modules.add(f.module);
    }
    for (const a of content.areas) expect(modules).toContain(a.module);
  });

  it('przyciski akcji: legalne, z rozmiarami z treści, bez powtórzeń kwot', () => {
    const pc = base(null, 3);
    for (let n = 0; n < 100; n++) {
      let h = dealPlayHand(pc, n, areaCtx);
      for (let i = 0; i < 50; i++) {
        h = runAuto(h, knowledge, pc);
        if (nextActor(h) === 'done') break;
        const menu = actionMenu(h.state, knowledge.sizes);
        expect(menu.length).toBeGreaterThan(1);
        for (const m of menu) expect(validateAction(h.state, m.action)).toBeNull();
        const tos = menu.filter((m) => m.action.to !== undefined).map((m) => m.action.to);
        expect(new Set(tos).size).toBe(tos.length);
        h = heroAct(h, menu[(n + i) % menu.length]!.action);
      }
    }
  });
});
