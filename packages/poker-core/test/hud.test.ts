import { describe, expect, it } from 'vitest';
import { checkHudThresholds, classifyHud, createRng, generateHudSpot, PLAYER_TYPES, type HudThresholds } from '../src';

/** Te same wartości co hud.* w content/numbers.yaml (test w content-build pilnuje zgodności treści z generatorem). */
const T: HudThresholds = { nitMax: 14, regLow: 18, regHigh: 30, loose: 35, passiveGap: 10, aggressiveGap: 3, minHands: 30, readHands: 100 };

describe('typy graczy po statystykach HUD (M10)', () => {
  it('klasyfikuje według R-M10-005, a strefy przejściowe zostawia bez typu', () => {
    expect(classifyHud({ hands: 500, vpip: 12, pfr: 10 }, T)).toBe('nit');
    expect(classifyHud({ hands: 500, vpip: 14, pfr: 11 }, T)).toBe('nit');
    expect(classifyHud({ hands: 500, vpip: 23, pfr: 18 }, T)).toBe('regular');
    expect(classifyHud({ hands: 500, vpip: 42, pfr: 18 }, T)).toBe('passive');
    expect(classifyHud({ hands: 500, vpip: 38, pfr: 36 }, T)).toBe('maniac');
    expect(classifyHud({ hands: 20, vpip: 42, pfr: 18 }, T)).toBe('unknown');
    // strefy przejściowe: VPIP między nitem a regularem, luźny z różnicą 3–10, próba między progami
    expect(classifyHud({ hands: 500, vpip: 16, pfr: 13 }, T)).toBeNull();
    expect(classifyHud({ hands: 500, vpip: 40, pfr: 34 }, T)).toBeNull();
    expect(classifyHud({ hands: 60, vpip: 23, pfr: 18 }, T)).toBeNull();
    // różnica dokładnie 10 to jeszcze nie gracz pasywny („ponad 10”), dokładnie 3 to już nie maniak („poniżej 3”)
    expect(classifyHud({ hands: 500, vpip: 45, pfr: 35 }, T)).toBeNull();
    expect(classifyHud({ hands: 500, vpip: 45, pfr: 42 }, T)).toBeNull();
  });

  it('generator losuje każdy typ, zawsze jednoznacznie klasyfikowalny, z PFR nie większym niż VPIP', () => {
    const rng = createRng(7);
    const seen = new Set<string>();
    for (let i = 0; i < 3000; i++) {
      const s = generateHudSpot(rng, T);
      seen.add(s.type);
      expect(classifyHud(s, T)).toBe(s.type);
      expect(s.pfr).toBeGreaterThanOrEqual(1);
      expect(s.pfr).toBeLessThan(s.vpip);
      expect(s.vpip).toBeLessThan(100);
      if (s.type === 'unknown') expect(s.hands).toBeLessThan(T.minHands);
      else expect(s.hands).toBeGreaterThanOrEqual(T.readHands);
    }
    expect([...seen].sort()).toEqual([...PLAYER_TYPES].sort());
  });

  it('odrzuca niespójne progi', () => {
    expect(() => checkHudThresholds({ ...T, regLow: 14 })).toThrow(/Niespójne/);
    expect(() => checkHudThresholds({ ...T, passiveGap: 4 })).toThrow(/Niespójne/);
    expect(() => checkHudThresholds({ ...T, readHands: 20 })).toThrow(/Niespójne/);
  });
});
