/// <reference types="jest" />
// FM (docs/design/fm-turn-bet.md §1 i §2; D-1430, D-1431, D-1434): kryteria akceptacji turn-bet 3–6 (kryteria 1–2 i 7: fg-turn-bet-ekran, grep, telefon).
// FM-02: liczby w wierszu puli i dzienniku przez formatujLiczbe; FM-08: pasek ocen z kwotą przy powtórzonej nazwie (turn-bet i size-spot).
import '@/i18n';
import { render, screen } from '@testing-library/react-native';
import { formatujLiczbe } from '@szkola/jezyki';
import { generateVariant, type SizeSpotVariantDecision, type TurnBetVariantDecision } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { jezykZadan } from '@/features/drills/text';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn, TROJBET } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import { naGenerator, type Akcja } from '../wariant';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const fmt = (x: number) => formatujLiczbe(x, jezykZadan());
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-fx-turn-bet', module: 'm7', situation: 'Fixture: zakład na turnie.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { draws: ['flush'], marginMin: 0.02, expected: ['bet-big'] } },
  decisions: [{
    street: 'turn', kind: 'turn-bet', rule: 'R-M4-004', pots: [8, 16, 24, 40], small: 0.25, big: 0.75,
    actions: [
      { action: 'bet-small', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, mały zakład daje drawowi dobrą cenę.' },
      { action: 'bet-big', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, duży zakład odbiera drawowi cenę.' },
    ],
  }],
});
const w = wariantFg(SZABLON, 'latwy', 5);
const p = w.points[0] as TurnBetVariantDecision;
const bezNbsp = (x: string) => x.replace(/\s/g, ' '); // czytnik i RNTL składają teksty z różnymi odstępami; treść sprawdzana, nie rodzaj spacji
const bet = t('scenario.action.bet');
const Bet = bet.charAt(0).toLocaleUpperCase() + bet.slice(1);
const etykietaPaska = (): string => String(screen.getByLabelText(new RegExp(`^${t('scenario.scale.label', { lista: 'ZZ' }).split('ZZ')[0]!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)).props.accessibilityLabel);
const decyzja = (wybory: Akcja[] = []) => render(<PrzebiegScenariusza sesja={sesjaFg(SZABLON, 'latwy', w, wybory)} faza="decyzja" koniec={false} onWybierz={jest.fn()} {...propsFg()} />);
const ocena = (wybor: Akcja) => render(<PrzebiegScenariusza sesja={sesjaFg(SZABLON, 'latwy', w, [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);

describe('FM turn-bet: kryteria akceptacji 2–6', () => {
  it('kryterium 4: wiersz puli = scenario.potOnly z liczbą sformatowaną wg języka, bez „·” i „do sprawdzenia”', async () => {
    await decyzja();
    const wiersz = t('scenario.potOnly', { pula: fmt(p.pot) });
    expect(screen.getByText(wiersz)).toBeTruthy();
    expect(wiersz).toContain(`${fmt(p.pot)} bb`);
    expect(wiersz).not.toContain('·');
  });
  it('kryterium 3: werdykt zaczyna frazę akcji od małej litery i niesie nazwę z kwotą (wybór i „lepiej”)', async () => {
    await ocena('bet-small');
    const kw = (x: number) => t('scenario.action.amountPay', { bb: fmt(x) });
    const mala = t('scenario.action.withAmount', { akcja: bet, kwota: kw(p.betSmall) });
    const duza = t('scenario.action.withAmount', { akcja: bet, kwota: kw(p.betBig) });
    expect(screen.getByText(t('scenario.verdict.yours', { akcja: mala, lepiej: duza }))).toBeTruthy();
    expect(mala.charAt(0)).toBe(mala.charAt(0).toLocaleLowerCase());
  });
  it('kryterium 5: dziennik twojego zakładu = play.log.bet z pos hero i kwotą sformatowaną (nie „BTN: Zakład 4bb”)', async () => {
    await ocena('bet-big');
    expect(bezNbsp(tekstEkranu())).toContain(bezNbsp(t('play.log.bet', { pos: 'BTN', bb: fmt(p.betBig) })));
    expect(tekstEkranu()).not.toMatch(/BTN: Zakład/);
  });
  it('kryterium 6 (turn-bet): pasek ocen pokazuje nazwę i kwotę przy każdej akcji, czytnik „nazwa, kwota”', async () => {
    await ocena('bet-big');
    const kw = (x: number) => t('scenario.action.amountPay', { bb: fmt(x) });
    const etykieta = etykietaPaska();
    expect(etykieta).toContain(`${Bet}, ${kw(p.betSmall)}`);
    expect(etykieta).toContain(`${Bet}, ${kw(p.betBig)}`);
    expect(screen.getAllByText(`${Bet}\n${kw(p.betSmall)}`)).toBeTruthy();
    expect(screen.getAllByText(`${Bet}\n${kw(p.betBig)}`)).toBeTruthy();
  });
});

describe('FM-08: size-spot, pasek ocen z kwotą przy powtórzonej nazwie; range-spot z różnymi nazwami bez zmian', () => {
  it('size-spot (3-bet): każdy z trzech rozmiarów ma w pasku ocen kwotę', async () => {
    const wz = generateVariant(naGenerator(TROJBET), 'latwy', 5, getKontekstGeneratora(dbCn, TROJBET));
    const sp = wz.points.find((x): x is SizeSpotVariantDecision => x.point === 'size-spot')!;
    const sesja = { id: 's1', szablon: TROJBET, poziom: 'latwy', wariant: wz, wybory: ['raise'], aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-12', strefa: 'Europe/Warsaw', startMs: 0, krok: 1, plan: { liczbaKrokow: 1, trescId: TROJBET.id } } } as unknown as SesjaScenariusza;
    await render(<PrzebiegScenariusza sesja={sesja} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
    const etykieta = etykietaPaska();
    for (const o of sp.options) {
      expect(o.bb).not.toBeNull();
      expect(etykieta).toContain(t('scenario.action.amountTo', { bb: fmt(o.bb ?? Number.NaN) }));
    }
  });
});
