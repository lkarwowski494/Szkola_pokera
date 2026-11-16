/// <reference types="jest" />
// IB (KO-115, D-1840…D-1849): ekran scenariusza dla rodzajów HO — spr-call (SC-26), check-raise (SC-16), turn-action (SC-18/21), geo-size (SC-27), nit-3bet (SC-30).
// Widoki z inwentarza roli 04 (docs/design/scenariusz-i-ocena.md:97-109): defend/draw-call (pula, „do sprawdzenia”, zakład rywala w dzienniku), flop-size (zakład z kwotą),
// river-value na turnie (zakład bez kwoty), list-hand (sytuacja w przebiegu). Szablony to fixtures z tools/content-build/test/fixtures (nie treść aplikacji);
// wariant z kontekstem generatora tak jak w aplikacji (`getKontekstGeneratora` na bazie treści pl).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { generateVariant, type ScenarioVariant } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { formatujLiczbe } from '@szkola/jezyki';
import i18n from '@/i18n';
import { getKontekstGeneratora, getScenarioTemplates } from '@/data/content/repo';
import { jezykZadan } from '@/features/drills/text';
import { dbCn, ISO_CO, ISO_SB } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza, tekstAkcji } from '../EkranScenariusza';
import { akcjePunktu, bloki, naGenerator, ocenyAkcji, RODZAJE_PUNKTOW_EKRANU, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const bb = (x: number) => formatujLiczbe(x, jezykZadan());
const wyj = (a: string, zdanie: string) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. ${zdanie}` });

const SPR_CALL = ScenarioTemplate.parse({
  id: 'sc-fx-spr-call', module: 'm9', situation: 'Fixture: niski SPR, rywal all-in na flopie.', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 14, levels: ['latwy'],
  bounds: { latwy: { expected: ['call'], sprRange: [1.8, 2.3], pairKind: ['overpair', 'top'], kickerMin: 'K' } },
  decisions: [{ street: 'flop', kind: 'spr-call', rule: 'R-M9-002', spot: 'vs-open.bb-vs-btn', pots: [5.5], stacks: [10, 10.5, 11, 11.5, 12, 12.5],
    actions: [wyj('call', 'SPR ok. {{w:spr}}: sprawdzasz.'), wyj('fold', 'SPR ok. {{w:spr}}: pas oddaje pulę.')] }],
});
const CHECK_RAISE = ScenarioTemplate.parse({
  id: 'sc-fx-check-raise', module: 'm6', situation: 'Fixture: BB z drawem wobec c-betu BTN.', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['raise-big'], draws: ['flush', 'oesd'], flopBroadwayMax: 2, flop: { suits: ['two-tone', 'rainbow'], ranks: ['disconnected', 'semi-connected'] }, reject: ['stol-sparowany'] } },
  decisions: [{ street: 'flop', kind: 'check-raise', rule: 'R-M6-008', spot: 'vs-open.bb-vs-btn', pots: [6], cbet: 1 / 3, multipliers: { big: 4.5, small: 1.5 },
    actions: [wyj('fold', 'Pas oddaje draw.'), wyj('call', 'Sprawdzenie też jest dobre.'), wyj('raise-small', 'Zbyt małe podbicie.'), wyj('raise-big', 'Duże check-raise.')] }],
});
const TURN_ACTION = ScenarioTemplate.parse({
  id: 'sc-fx-turn-action', module: 'm7', situation: 'Fixture: turn, rywal czeka.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['bet-big'], turnClass: 'overcard', flopMiss: true, pairKind: ['top'], flop: { suits: ['rainbow'] }, reject: ['stol-sparowany'] } },
  decisions: [{ street: 'turn', kind: 'turn-action', rule: 'R-M7-001', actions: [wyj('check', 'Czekanie jest dopuszczalne.'), wyj('bet-big', 'Nadkarta paruje twoją rękę, zakład.')] }],
});
const GEO_SIZE = ScenarioTemplate.parse({
  id: 'sc-fx-geo-size', module: 'm9', situation: 'Fixture: set na flopie, rozmiar zakładu.', table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['bet-big'], sprRange: [4, 8] } },
  decisions: [{ street: 'flop', kind: 'geo-size', rule: 'R-M9-009', pots: [20, 25, 30], stacks: [100, 110, 120, 130, 150, 190], streets: 3, small: 1 / 3,
    actions: [wyj('bet-small', 'SPR {{w:spr}}: zakład {{w:rozmiar}}% puli nie wpłaci stacku.'), wyj('bet-big', 'SPR {{w:spr}}: zakład {{w:rozmiar}}% puli wpłaci cały stack.')] }],
});
const NIT_3BET = ScenarioTemplate.parse({
  id: 'sc-fx-nit-3bet', module: 'm10', situation: 'Fixture: bardzo ciasny rywal 3-betuje.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['fold'], marginMin: 0.03 } },
  decisions: [{ street: 'preflop', kind: 'nit-3bet', rule: 'R-M10-007', open: 2.5, threeBet: 10, vpips: [0.08, 0.1],
    actions: [wyj('fold', 'VPIP {{w:vpip}}%: pas.'), wyj('call', 'VPIP {{w:vpip}}%: sprawdzenie to niedokładność.')] }],
});

/** Wariant jak w aplikacji: kontekst generatora z bazy treści (`getKontekstGeneratora`), nie z testu. */
const wariant = (s: ScenarioTemplate, z = 3): ScenarioVariant => generateVariant(naGenerator(s), 'latwy', z, getKontekstGeneratora(dbCn, s));
const pokaz = async (s: ScenarioTemplate, wybory: Akcja[] = [], z = 3, onWybierz = jest.fn()) => {
  const w = wariant(s, z);
  await render(<PrzebiegScenariusza sesja={sesjaFg(s, 'latwy', w, wybory)} faza={wybory.length ? 'ocena' : 'decyzja'} koniec={wybory.length > 0} onWybierz={onWybierz} {...propsFg()} />);
  return w;
};
const punkt = <K extends ScenarioVariant['points'][number]['point']>(w: ScenarioVariant, k: K) => {
  const p = w.points[0]!;
  if (p.point !== k) throw new Error(`nie ${k}`);
  return p as Extract<ScenarioVariant['points'][number], { point: K }>;
};
const nazwa = (k: string) => { const x = t(k); return x.charAt(0).toLocaleUpperCase() + x.slice(1); };

describe('IB: kontekst generatora w aplikacji dla rodzajów HO (getKontekstGeneratora)', () => {
  it.each([SPR_CALL, CHECK_RAISE, TURN_ACTION, GEO_SIZE, NIT_3BET].map((s) => [s.decisions[0]!.kind, s] as const))('%s: wariant powstaje z kontekstem aplikacji', (_k, s) => {
    for (let z = 1; z <= 5; z++) expect(wariant(s, z).points[0]!.point).toBe(s.decisions[0]!.kind);
  });
  // koordynator (odpowiedź na PYTANIE 3): ten sam test także dla iso-size (SC-09; fikstury HX), losowanie z kontekstem z bazy treści
  it.each([['iso-co', ISO_CO], ['iso-sb', ISO_SB]] as const)('%s (size-spot iso-size): wariant powstaje z kontekstem aplikacji', (_k, s) => {
    expect(getKontekstGeneratora(dbCn, s)).toBeDefined();
    for (let z = 1; z <= 5; z++) expect(wariant(s, z).points[0]!).toMatchObject({ point: 'size-spot', check: 'iso-size' });
  });
});

describe('IB spr-call (SC-26): widok defend z all-inem rywala', () => {
  it('decyzja: dziennik „BTN: all-in S bb”, pula P+S i do sprawdzenia S, stos na stole = stack wariantu; przyciski pas i „Sprawdzenie S bb”', async () => {
    const onWybierz = jest.fn();
    const w = await pokaz(SPR_CALL, [], 3, onWybierz);
    const p = punkt(w, 'spr-call');
    const tx = tekstEkranu();
    expect(tx).toMatch(new RegExp(`BTN: all-in ${bb(p.stack)}\\sbb`));
    expect(tx).toContain(t('scenario.pot', { pula: bb(p.pot + p.stack), kwota: bb(p.stack) }));
    expect(tx).toContain(t('scenario.table.seat', { pozycja: 'BB', rola: t('scenario.table.you'), bb: bb(p.stack) }));
    expect(tx).not.toContain(t('scenario.table.seat', { pozycja: 'BB', rola: t('scenario.table.you'), bb: bb(14) }));
    const call = tekstAkcji(w, 0, 'call', SPR_CALL, t);
    expect(call.przycisk).toBe(`${nazwa('scenario.action.call')}\n${t('scenario.action.amountPay', { bb: bb(p.stack) })}`);
    await fireEvent.press(screen.getByText(call.przycisk));
    expect(onWybierz).toHaveBeenLastCalledWith('call');
  });
  it('ocena: call zgodne, fold błąd; wyjaśnienia obu akcji z SPR wariantu (BR-OCE-002)', async () => {
    const w = await pokaz(SPR_CALL, ['call']);
    expect(ocenyAkcji(w, 0, SPR_CALL)).toEqual({ fold: 'blad', call: 'zgodne' });
    const b = bloki(w, SPR_CALL, 0, 'call', t);
    expect(b.map((x) => `${x.rodzaj}:${x.akcja}`)).toEqual(['dobrze:call', 'dlaczego_nie:fold']);
    expect(tekstEkranu()).toMatch(/sprawdzasz/);
    expect(tekstEkranu()).toMatch(new RegExp(`BB: (\\{\\{t:call\\|)?sprawdza(\\}\\})?( \\(call\\))? ${bb(punkt(w, 'spr-call').stack)}\\sbb`));
  });
});

describe('IB check-raise (SC-16): widok defend z przebiciem z kwotą', () => {
  it('decyzja: dziennik „BTN: zakład c bb”, pula P+c / do sprawdzenia c; cztery przyciski: pas, sprawdzenie c, przebicie do Rs, przebicie do Rb', async () => {
    const w = await pokaz(CHECK_RAISE);
    const p = punkt(w, 'check-raise');
    const tx = tekstEkranu();
    expect(tx).toMatch(new RegExp(`BTN: (zakład|\\S+ \\(bet\\)) ${bb(p.cbet)}\\sbb`));
    expect(tx).toContain(t('scenario.pot', { pula: bb(p.pot + p.cbet), kwota: bb(p.cbet) }));
    expect(akcjePunktu(p, CHECK_RAISE.decisions[0])).toEqual(['fold', 'call', 'raise-small', 'raise-big']);
    expect(tekstAkcji(w, 0, 'call', CHECK_RAISE, t).kwota).toBe(t('scenario.action.amountPay', { bb: bb(p.cbet) }));
    expect(tekstAkcji(w, 0, 'raise-small', CHECK_RAISE, t).kwota).toBe(t('scenario.action.amountTo', { bb: bb(p.raiseSmall!) }));
    expect(tekstAkcji(w, 0, 'raise-big', CHECK_RAISE, t).kwota).toBe(t('scenario.action.amountTo', { bb: bb(p.raiseBig) }));
    expect(tekstAkcji(w, 0, 'raise-big', CHECK_RAISE, t).nazwa).toBe(nazwa('scenario.action.raise'));
  });
  it('ocena: raise-big i call zgodne, fold i raise-small niedokładność; po złym rozmiarze dziennik „BB: przebicie do Rs bb” i dwa bloki', async () => {
    const w = await pokaz(CHECK_RAISE, ['raise-small']);
    expect(ocenyAkcji(w, 0, CHECK_RAISE)).toEqual({ fold: 'niedokladnosc', call: 'zgodne', 'raise-small': 'niedokladnosc', 'raise-big': 'zgodne' });
    expect(bloki(w, CHECK_RAISE, 0, 'raise-small', t).map((x) => `${x.rodzaj}:${x.akcja}`)).toEqual(['slabsza:raise-small', 'lepsza:raise-big']);
    const tx = tekstEkranu();
    expect(tx).toMatch(new RegExp(`BB: \\S+( \\(raise\\))? do ${bb(punkt(w, 'check-raise').raiseSmall!)}\\sbb`));
    expect(tx).toMatch(/Zbyt małe podbicie/);
    expect(tx).toMatch(/Duże check-raise/);
  });
});

describe('IB turn-action (SC-18/21): widok river-value na turnie (zakład bez kwoty)', () => {
  it('decyzja: cztery karty, dziennik „BB: czeka”, bez puli; przyciski „Czekanie” i „Zakład” (nie „duży c-bet”)', async () => {
    const onWybierz = jest.fn();
    const w = await pokaz(TURN_ACTION, [], 3, onWybierz);
    const tx = tekstEkranu();
    expect(tx).toMatch(/BB: (czeka|\S+ \(check\))/);
    expect(tx).not.toMatch(/c-bet/);
    const zaklad = tekstAkcji(w, 0, 'bet-big', TURN_ACTION, t);
    expect(zaklad).toMatchObject({ nazwa: nazwa('scenario.action.bet'), kwota: null });
    await fireEvent.press(screen.getByText(zaklad.przycisk));
    expect(onWybierz).toHaveBeenLastCalledWith('bet-big');
  });
  it('ocena: bet-big zgodne, check dopuszczalne; wyjaśnienia obu akcji', async () => {
    const w = await pokaz(TURN_ACTION, ['check']);
    expect(ocenyAkcji(w, 0, TURN_ACTION)).toEqual({ check: 'dopuszczalne', 'bet-big': 'zgodne' });
    const tx = tekstEkranu();
    expect(tx).toMatch(/Czekanie jest dopuszczalne/);
    expect(tx).toMatch(/Nadkarta paruje/);
  });
});

describe('IB geo-size (SC-27): widok flop-size (zakład z kwotą), pula i stack wariantu', () => {
  it('decyzja: dziennik „CO: czeka”, „W puli P bb”, stos = stack wariantu; przyciski „Zakład” z kwotą P·ułamek (0,1 bb)', async () => {
    const w = await pokaz(GEO_SIZE);
    const p = punkt(w, 'geo-size');
    const tx = tekstEkranu();
    expect(tx).toMatch(/CO: (czeka|\S+ \(check\))/);
    expect(screen.getByText(t('scenario.potOnly', { pula: bb(p.pot) }))).toBeTruthy(); // getByText jak fg-turn-bet:110: tekstEkranu() zamienia U+00A0 przed „bb” na spację
    expect(tx).toContain(t('scenario.table.seat', { pozycja: 'BTN', rola: t('scenario.table.you'), bb: bb(p.stack) }));
    const r1 = (x: number) => Math.round(x * 10) / 10;
    expect(tekstAkcji(w, 0, 'bet-small', GEO_SIZE, t)).toMatchObject({ nazwa: nazwa('scenario.action.bet'), kwota: t('scenario.action.amountPay', { bb: bb(r1(p.pot * p.fractionSmall)) }) });
    expect(tekstAkcji(w, 0, 'bet-big', GEO_SIZE, t)).toMatchObject({ nazwa: nazwa('scenario.action.bet'), kwota: t('scenario.action.amountPay', { bb: bb(r1(p.pot * p.fractionBig)) }) });
    expect(tx).not.toMatch(/c-bet/);
  });
  it('ocena: bet-big zgodne, bet-small niedokładność; wyjaśnienia z SPR i rozmiarem wariantu', async () => {
    const w = await pokaz(GEO_SIZE, ['bet-small']);
    const p = punkt(w, 'geo-size');
    expect(ocenyAkcji(w, 0, GEO_SIZE)).toEqual({ 'bet-small': 'niedokladnosc', 'bet-big': 'zgodne' });
    expect(tekstEkranu()).toContain(`zakład ${Math.round(p.fractionBig * 100)}% puli wpłaci cały stack`);
  });
});

describe('IB nit-3bet (SC-30): widok list-hand (sytuacja w przebiegu), 3-bet w dzienniku', () => {
  it('decyzja: sytuacja widoczna, dziennik „BTN: przebicie do 2,5 bb. BB: przebicie do 10 bb”, pula 13 bb / do sprawdzenia 7,5 bb; sprawdzenie 7,5 bb', async () => {
    const w = await pokaz(NIT_3BET);
    expect(screen.getByTestId('nit-3bet-sytuacja')).toHaveTextContent(/bardzo ciasny rywal/);
    const tx = tekstEkranu();
    expect(tx).toMatch(new RegExp(`BTN: \\S+( \\(raise\\))? do ${bb(2.5)}\\sbb\\. BB: \\S+( \\(raise\\))? do 10\\sbb`));
    expect(tx).toContain(t('scenario.pot', { pula: bb(13), kwota: bb(7.5) }));
    expect(tekstAkcji(w, 0, 'call', NIT_3BET, t).kwota).toBe(t('scenario.action.amountPay', { bb: bb(7.5) }));
  });
  it('ocena: fold zgodne, call niedokładność; wyjaśnienie z VPIP wariantu', async () => {
    const w = await pokaz(NIT_3BET, ['call']);
    const p = punkt(w, 'nit-3bet');
    expect(ocenyAkcji(w, 0, NIT_3BET)).toEqual({ fold: 'zgodne', call: 'niedokladnosc' });
    expect(tekstEkranu()).toContain(`VPIP ${Math.round(p.vpip * 100)}%: pas.`);
  });
});

// ID (D-1862): te same rodzaje na prawdziwej treści — 7 szablonów HZ z bazy pl (content/pl/scenarios, nie fixtures), wariant z kontekstem z bazy jak w aplikacji.
const ID_SZABLONY = [['sc-09', 'size-spot'], ['sc-16', 'check-raise'], ['sc-18', 'turn-action'], ['sc-21', 'turn-action'], ['sc-26', 'spr-call'], ['sc-27', 'geo-size'], ['sc-30', 'nit-3bet']] as const;
describe('ID: 7 szablonów HZ z bazy treści pl — losowanie z kontekstem z bazy i ekran bez surowych znaczników', () => {
  const zBazy = getScenarioTemplates(dbCn);
  it('baza pl ma wszystkie 7 szablonów z oczekiwanym rodzajem punktu', () => {
    expect(ID_SZABLONY.map(([id]) => [id, zBazy.find((x) => x.id === id)?.decisions[0]?.kind])).toEqual(ID_SZABLONY.map(([id, k]) => [id, k]));
  });
  it.each(ID_SZABLONY)('%s (%s): każdy poziom daje wariant z kontekstem z bazy (ziarna 1–10)', (id, rodzaj) => {
    const s = zBazy.find((x) => x.id === id)!;
    const ctx = getKontekstGeneratora(dbCn, s);
    // geo-size (SC-27) losuje bez kontekstu: aplikacja go nie buduje (IB D-1843: kontekst tylko dla spr-call, check-raise, turn-action, nit-3bet + rodzajów sprzed HO)
    if (rodzaj === 'geo-size') expect(ctx).toBeUndefined();
    else expect(ctx).toBeDefined();
    for (const poziom of s.levels) {
      for (let z = 1; z <= 10; z++) {
        const p = generateVariant(naGenerator(s), poziom, z, ctx).points[0]!;
        expect(p.point).toBe(rodzaj);
        if (p.point === 'size-spot') expect(p).toMatchObject({ check: 'iso-size' });
        if (p.point === 'nit-3bet') expect(p.vpip).toBeGreaterThanOrEqual(0.08);
        if (p.point === 'nit-3bet') expect(p.vpip).toBeLessThanOrEqual(0.1);
      }
    }
  });
  it.each(ID_SZABLONY)('%s (%s): decyzja i ocena oczekiwanej akcji na ekranie bez surowych znaczników {{…}}', async (id) => {
    const s = zBazy.find((x) => x.id === id)!;
    await pokaz(s);
    expect(tekstEkranu()).not.toMatch(/\{\{|\}\}/);
    const oczekiwana = (s.bounds.latwy as { expected: Akcja[] }).expected[0]!;
    await pokaz(s, [oczekiwana]);
    expect(tekstEkranu()).not.toMatch(/\{\{|\}\}/);
  });
});

describe('IB: lista rodzajów punktów ekranu — przypięcie (to samo literalnie w tools/content-build RODZAJE_NA_EKRANIE)', () => {
  it('RODZAJE_PUNKTOW_EKRANU', () => {
    expect([...RODZAJE_PUNKTOW_EKRANU]).toEqual(['draw-call', 'cbet-case', 'size-spot', 'range-spot', 'icm-call', 'pick-hand', 'turn-bet', 'flop-size', 'river-catch', 'defend', 'list-hand', 'river-value', 'spr-call', 'check-raise', 'turn-action', 'geo-size', 'nit-3bet']);
  });
});
