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

// 08-programista-404 (recenzja HC): fixture 402 miał jeden poziom i jeden punkt, więc regres pętli poziomów (tylko latwy) albo indeksu margins (zawsze [0])
// przechodził CI (mutanty H402d, H402e). Poniżej każdy poziom osobno oraz szablon dwupunktowy (draw-call + river-catch: river-catch to punkt 1).
const POZIOMY = ['latwy', 'sredni', 'trudny'] as const;
const dobry = { marginMin: 0.03 };
/** Szablon z trzema poziomami; `bounds[l]` nadpisuje wybrane poziomy, reszta ma margines 0,03. */
const szablon3 = (nadpisz: Partial<Record<(typeof POZIOMY)[number], Record<string, unknown>>>) => ({
  ...szablon({}), levels: [...POZIOMY], bounds: Object.fromEntries(POZIOMY.map((l) => [l, { expected: ['call'], ...(nadpisz[l] ?? dobry) }])),
});
/** Dwa punkty: 0 = draw-call (flop), 1 = river-catch; `margins` ustawia margines osobno na punkt (F5). */
const szablon2 = (nadpisz: Partial<Record<(typeof POZIOMY)[number], Record<string, unknown>>>) => {
  const b = szablon3(nadpisz);
  return {
    ...b,
    decisions: [
      { street: 'flop', kind: 'draw-call', pots: [10], fractions: [0.5], villain: 'bet', calc: 'draw.odds', actions: [{ action: 'call', explanation: 'Masz {{w:reka}}, sprawdzasz.' }, { action: 'fold', explanation: 'Masz {{w:reka}}, pasujesz.' }] },
      ...szablon({}).decisions,
    ],
  };
};
const sciezki = (r: ReturnType<typeof ScenarioTemplate.safeParse>) => (r.success ? [] : r.error.issues.map((i) => i.path.join('.')));

describe('404: bramka 402 obejmuje wszystkie poziomy i oba punkty', () => {
  it('baza porównawcza: szablony poprawne przechodzą (inaczej testy niżej niczego nie dowodzą)', () => {
    expect(ScenarioTemplate.safeParse(szablon3({})).success).toBe(true);
    expect(ScenarioTemplate.safeParse(szablon2({})).success).toBe(true);
  });
  it.each(POZIOMY)('poziom %s: marginMin 0,005 odrzucony, ścieżka wskazuje ten poziom (mutant „tylko latwy”)', (l) => {
    const r = ScenarioTemplate.safeParse(szablon3({ [l]: { marginMin: 0.005 } }));
    expect(r.success).toBe(false);
    expect(sciezki(r)).toEqual([`bounds.${l}.marginMin`]);
  });
  it.each(POZIOMY)('poziom %s, punkt 1 (river-catch): margins[1].min 0,005 odrzucony przy poprawnym margins[0] (mutant „margins[0]”)', (l) => {
    const r = ScenarioTemplate.safeParse(szablon2({ [l]: { margins: [{ min: 0.05, max: null }, { min: 0.005, max: null }] } }));
    expect(r.success).toBe(false);
    expect(sciezki(r)).toEqual([`bounds.${l}.margins`]);
  });
  it.each(POZIOMY)('poziom %s: margins[0].min 0,005 dla punktu draw-call przyjęty, bo bramka dotyczy tylko river-catch', (l) => {
    expect(ScenarioTemplate.safeParse(szablon2({ [l]: { margins: [{ min: 0.005, max: null }, { min: 0.02, max: null }] } })).success).toBe(true);
  });
});

