/// <reference types="jest" />
// FG (08-N7, D-1143, SC-24): widok punktu river-catch (sprawdzenie bluff-catcherem na riverze po zakładzie rywala) z istniejących komponentów: jak draw-call na riverze
// (pula i zakład, pas albo sprawdzenie, ruch rywala w dzienniku), pięć kart stołu, ręka gracza. Ocena: poprawna akcja zgodna, druga błąd (rachunek ceny z marginesem, jak draw-call).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { RiverCatchVariantDecision, ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza, tekstAkcji } from '../EkranScenariusza';
import { akcjePunktu, bloki, grafPunktow, ocenyAkcji, poprawnaAkcja, przebiegWariantu, widokDecyzji, type Akcja } from '../wariant';
import { zdaniaLiczb } from '../liczby';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-fx-river', module: 'm8', situation: 'Fixture: river.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy', 'sredni'],
  bounds: { latwy: { marginMin: 0.03, expected: ['call'] }, sredni: { marginMin: 0.03, expected: ['fold'] } },
  decisions: [{
    street: 'river', kind: 'river-catch', calc: 'bluff.share.bet-half', pots: [10, 20, 40], fractions: [0.33, 0.5, 0.75, 1], bluffShares: [0.15, 0.2, 0.25, 0.3, 0.35, 0.4],
    actions: [
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, rywal blefuje dość często, więc sprawdzasz.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, rywal blefuje zbyt rzadko, więc pasujesz.' },
    ],
  }],
});
/** Poziom łatwy ma akcję oczekiwaną call, średni fold (poziom wybiera akcję oczekiwaną). */
const wariant = (z: number, poziom: ScenarioLevel = 'latwy') => wariantFg(SZABLON, poziom, z);
const punkt = (z: number, poziom: ScenarioLevel = 'latwy'): RiverCatchVariantDecision => {
  const p = wariant(z, poziom).points[0]!;
  if (p.point !== 'river-catch') throw new Error('nie river-catch');
  return p;
};
const sesja = (z: number, wybory: Akcja[], poziom: ScenarioLevel = 'latwy') => sesjaFg(SZABLON, poziom, wariant(z, poziom), wybory);
const druga = (a: 'call' | 'fold'): Akcja => (a === 'call' ? 'fold' : 'call');
const POZIOM_AKCJI = { call: 'latwy', fold: 'sredni' } as const;

describe('FG river-catch — logika widoku', () => {
  it('akcje pas i sprawdzenie; poprawna akcja z rachunku wariantu; oceny: poprawna zgodna, druga błąd (oba rozstrzygnięcia: call na łatwym, fold na średnim; FH ŚR-002)', () => {
    for (const [poprawna, poziom] of Object.entries(POZIOM_AKCJI) as [keyof typeof POZIOM_AKCJI, ScenarioLevel][]) {
      for (let z = 1; z <= 30; z++) {
        const p = punkt(z, poziom);
        expect(p.correct).toBe(poprawna);
        expect(akcjePunktu(p)).toEqual(['fold', 'call']);
        expect(poprawnaAkcja(p)).toBe(poprawna);
        const o = ocenyAkcji(wariant(z, poziom), 0);
        expect(o[poprawna]).toBe('zgodne');
        expect(o[druga(poprawna)]).toBe('blad');
      }
    }
  });
  it('poziom wybiera rozstrzygnięcie: łatwy call, średni fold (oba rodzaje ekranu: pas i sprawdzenie jako poprawna)', () => {
    for (let z = 1; z <= 10; z++) {
      expect(punkt(z, 'latwy').correct).toBe('call');
      expect(punkt(z, 'sredni').correct).toBe('fold');
    }
  });
  it('widok: ulica river, pięć kart stołu, pula po zakładzie rywala i dopłata = zakład', () => {
    const p = punkt(4);
    const w = widokDecyzji(wariant(4), 0);
    expect(w.ulica).toBe('river');
    expect(w.stol).toHaveLength(5);
    expect(w.pulaBb).toBe(p.pot + p.bet);
    expect(w.doSprawdzeniaBb).toBe(p.bet);
  });
  it('graf i przebieg: pas i sprawdzenie kończą rozdanie; przebieg ocenia wybór', () => {
    const w = wariant(4);
    const p = punkt(4);
    expect(grafPunktow(w)[0]!.map((a) => a.dalej)).toEqual(['koniec', 'koniec']);
    const r = przebiegWariantu(w, [p.correct]);
    expect(r.ok && r.wartosc.kroki[0]?.ocena).toBe('zgodne');
    const r2 = przebiegWariantu(w, [druga(p.correct)]);
    expect(r2.ok && r2.wartosc.kroki[0]?.ocena).toBe('blad');
  });
  it('nazwy akcji: pas i sprawdzenie z kwotą zakładu', () => {
    const p = punkt(4);
    const w = wariant(4);
    expect(tekstAkcji(w, 0, 'fold', SZABLON, t).kwota).toBeNull();
    expect(tekstAkcji(w, 0, 'call', SZABLON, t).kwota).toBe(t('scenario.action.amountPay', { bb: p.bet }));
  });
  it('wyjaśnienia: błąd to „słabsza” + „lepsza”, trafienie to „dobrze” + „dlaczego nie” drugiej akcji', () => {
    const w = wariant(3);
    expect(bloki(w, SZABLON, 0, 'fold', t).map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual(['slabsza:fold', 'lepsza:call']);
    const dobrze = bloki(w, SZABLON, 0, 'call', t);
    expect(dobrze.map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual(['dobrze:call', 'dlaczego_nie:fold']);
    expect(dobrze[0]!.tekst).toContain('rywal blefuje dość często');
  });
  // GB (D-1465): zmiana istniejącego testu — klucze KO-098 są w locale i zdania podpięte, więc „brak zdania” (stan FG) przestał być oczekiwanym zachowaniem; treść zdań: gb-liczby-d1465.test.tsx
  it('„Liczby”: dwa zdania (cena i udział blefów; kierunek) — treść sprawdza gb-liczby-d1465', () => {
    expect(zdaniaLiczb(sesja(4, [punkt(4).correct]), 0, punkt(4).correct, t)).toHaveLength(2);
  });
});

describe('FG river-catch — ekran', () => {
  it('decyzja: pięć kart stołu, pula i kwota do sprawdzenia, ruch rywala w dzienniku, przyciski pas/sprawdzenie przekazują akcję', async () => {
    const p = punkt(5);
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja(5, [])} faza="decyzja" koniec={false} onWybierz={onWybierz} {...propsFg()} />);
    const ekran = tekstEkranu();
    expect(ekran).toContain(t('scenario.pot', { pula: p.pot + p.bet, kwota: p.bet }));
    expect(ekran).toMatch(new RegExp(`BB: zakład.* ${p.bet} bb`)); // ruch rywala (term „zakład” z objaśnieniem przy pierwszym użyciu)
    const pas = screen.getByLabelText(/^Pas/i);
    expect(pas.props.accessibilityRole).toBe('button');
    await fireEvent.press(pas);
    expect(onWybierz).toHaveBeenLastCalledWith('fold');
    await fireEvent.press(screen.getAllByRole('button').find((b) => /sprawdzenie/i.test(String(b.props.accessibilityLabel ?? '')))!);
    expect(onWybierz).toHaveBeenLastCalledWith('call');
  });
  for (const poprawna of [true, false]) {
    it(`ocena (${poprawna ? 'poprawna' : 'druga'} akcja): werdykt i wyjaśnienie wybranej akcji`, async () => {
      const wybor: Akcja = poprawna ? 'call' : 'fold';
      await render(<PrzebiegScenariusza sesja={sesja(3, [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
      const ekran = tekstEkranu();
      expect(ekran).toContain(t(`grade.${poprawna ? 'zgodne' : 'blad'}`));
      expect(ekran).toContain(poprawna ? 'rywal blefuje dość często' : 'rywal blefuje zbyt rzadko');
    });
  }
});
