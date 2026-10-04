import { describe, expect, it } from 'vitest';
import { createRng, generateIcmCall, generateIcmSpot, ICM_CALL_MIN_GAP, ICM_TOTAL_CHIPS, icmEquities } from '../src';

describe('ICM (M11)', () => {
  it('equity sumuje się do puli wypłat, a przy równych stackach jest równe', () => {
    const eq = icmEquities([2500, 2500, 2500, 2500], [0.5, 0.3, 0.2]);
    eq.forEach((e) => expect(e).toBeCloseTo(0.25, 12));
    expect(icmEquities([7, 1, 1, 1, 5], [0.4, 0.3, 0.2, 0.1]).reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
  });
  it('krótki stack jest wart więcej niż jego udział w żetonach, duży mniej', () => {
    const [big, , short] = icmEquities([4500, 3500, 2000], [0.6, 0.4]);
    expect(short).toBeGreaterThan(0.2);
    expect(big).toBeLessThan(0.45);
  });
  it('generator: stacki sumują się do puli żetonów i każdy gracz ma co najmniej dwa kroki', () => {
    const rng = createRng(3);
    for (let i = 0; i < 200; i++) {
      const s = generateIcmSpot(rng);
      expect(s.stacks.reduce((a, b) => a + b, 0)).toBe(ICM_TOTAL_CHIPS);
      expect(Math.min(...s.stacks)).toBeGreaterThanOrEqual(1000);
      expect(s.payouts.length).toBe(s.stacks.length - 1);
    }
  });
  it('generator sprawdzenia: próg = BF ÷ (BF + 1), decyzja zgodna z progiem i z odstępem od niego', () => {
    const rng = createRng(11);
    let calls = 0;
    let chipCallsIcmFolds = 0;
    for (let i = 0; i < 300; i++) {
      const s = generateIcmCall(rng);
      expect(s.required).toBeCloseTo(s.bubbleFactor / (s.bubbleFactor + 1), 12);
      expect(s.required).toBeGreaterThan(0);
      expect(s.required).toBeLessThan(1);
      expect(Math.abs(s.handEquity - s.required)).toBeGreaterThanOrEqual(ICM_CALL_MIN_GAP);
      expect(s.correct).toBe(s.handEquity >= s.required ? 'call' : 'fold');
      expect(s.villain).not.toBe(s.hero);
      if (s.correct === 'call') calls++;
      if (s.handEquity > s.requiredChips && s.correct === 'fold') chipCallsIcmFolds++;
    }
    // obie decyzje występują, w tym przypadki „w żetonach sprawdzenie, w ICM pas”
    expect(calls).toBeGreaterThan(30);
    expect(chipCallsIcmFolds).toBeGreaterThan(10);
  });
});
