/// <reference types="jest" />
// 08-programista-402 (DEV-13): zdanie river-catch pokazuje procenty bez miejsc po przecinku, a kierunek („więcej/mniej”) liczy z wartości dokładnych.
// Odstęp < 1 pp mógłby dać te same liczby przy zdaniu „więcej/mniej”. Odstęp ≥ 0,01 gwarantuje różne zaokrąglenia (round jest monotoniczne, round(y + 1) = round(y) + 1).
// Schemat (nie bramka tools/) odrzuca szablon river-catch z marginesem poniżej RIVER_CATCH_MARGIN_MIN, także z `margins[i]`.
import { RIVER_CATCH_MARGIN_MIN, ScenarioTemplate } from '@szkola/content-schema';

const szablon = (bounds: Record<string, unknown>) => ({
  id: 'sc-hb-402', module: 'm8', situation: 'Fixture: river.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['call'], ...bounds } },
  decisions: [{
    street: 'river', kind: 'river-catch', calc: 'bluff.share.bet-half', pots: [10, 20], fractions: [0.5, 1], bluffShares: [0.2, 0.4],
    actions: [{ action: 'call', explanation: 'Masz {{w:reka}}, sprawdzasz.' }, { action: 'fold', explanation: 'Masz {{w:reka}}, pasujesz.' }],
  }],
});

describe('402: margines punktu river-catch ≥ RIVER_CATCH_MARGIN_MIN', () => {
  it('stała = 0,01 (1 pp: najmniejszy odstęp dający różne procenty bez miejsc po przecinku)', () => expect(RIVER_CATCH_MARGIN_MIN).toBe(0.01));
  it('marginMin 0,005 odrzucony', () => {
    const r = ScenarioTemplate.safeParse(szablon({ marginMin: 0.005 }));
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.message).join(' ')).toMatch(/river-catch.*marginMin/);
  });
  it('margins[0].min 0,005 odrzucony (margins zastępuje marginMin)', () => {
    expect(ScenarioTemplate.safeParse(szablon({ margins: [{ min: 0.005, max: null }] })).success).toBe(false);
  });
  it('marginMin 0,01 i 0,03 przyjęte; margins[0].min 0,02 przyjęty', () => {
    expect(ScenarioTemplate.safeParse(szablon({ marginMin: 0.01 })).success).toBe(true);
    expect(ScenarioTemplate.safeParse(szablon({ marginMin: 0.03 })).success).toBe(true);
    expect(ScenarioTemplate.safeParse(szablon({ margins: [{ min: 0.02, max: null }] })).success).toBe(true);
  });
  it('brak marginesu w schemacie nadal przechodzi (wymóg > 0 sprawdza bramka build, KO-056)', () => {
    expect(ScenarioTemplate.safeParse(szablon({})).success).toBe(true);
  });
});
