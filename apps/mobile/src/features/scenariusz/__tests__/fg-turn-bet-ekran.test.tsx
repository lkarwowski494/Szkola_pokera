/// <reference types="jest" />
// FG (08-N6, D-1147): widok punktu turn-bet (zakład na turnie z silną ręką wobec drawa: mały albo duży rozmiar) z istniejących komponentów. Poprawny jest zawsze bet-big (R-M7-006),
// bet-small to niedokładność rozmiaru (analogia size-spot/cbet-case, CR WYS-002). Nazwa przycisku z `play.bet` („Zakład 2bb”), nie z `betSmall` („mały c-bet” to zły termin na turnie).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ScenarioLevel, TurnBetVariantDecision } from '@szkola/poker-core';
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
const POZIOM: ScenarioLevel = 'latwy';
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
const wariant = (z: number) => wariantFg(SZABLON, POZIOM, z);
const punkt = (z: number): TurnBetVariantDecision => {
  const p = wariant(z).points[0]!;
  if (p.point !== 'turn-bet') throw new Error('nie turn-bet');
  return p;
};
const sesja = (z: number, wybory: Akcja[]) => sesjaFg(SZABLON, POZIOM, wariant(z), wybory);

describe('FG turn-bet — logika widoku', () => {
  it('akcje: bet-small i bet-big (najtańsza pierwsza), poprawna bet-big', () => {
    for (let z = 1; z <= 20; z++) {
      const p = punkt(z);
      expect(akcjePunktu(p)).toEqual(['bet-small', 'bet-big']);
      expect(poprawnaAkcja(p)).toBe('bet-big');
    }
  });
  it('oceny: bet-big zgodne, bet-small niedokładność (rozmiar, nie błąd)', () => {
    const o = ocenyAkcji(wariant(3), 0);
    expect(o['bet-big']).toBe('zgodne');
    expect(o['bet-small']).toBe('niedokladnosc');
  });
  it('widok: ulica turn, cztery karty stołu, pula z wariantu, bez „do sprawdzenia” (gracz stawia, nie sprawdza)', () => {
    const p = punkt(3);
    const w = widokDecyzji(wariant(3), 0);
    expect(w.ulica).toBe('turn');
    expect(w.stol).toHaveLength(4);
    expect(w.pulaBb).toBe(p.pot);
    expect(w.doSprawdzeniaBb).toBeNull();
  });
  it('graf i przebieg: obie akcje kończą rozdanie, przebieg ocenia wybór', () => {
    const w = wariant(3);
    expect(grafPunktow(w)[0]!.map((a) => a.dalej)).toEqual(['koniec', 'koniec']);
    const r = przebiegWariantu(w, ['bet-big']);
    expect(r.ok && r.wartosc.kroki[0]?.ocena).toBe('zgodne');
    const r2 = przebiegWariantu(w, ['bet-small']);
    expect(r2.ok && r2.wartosc.kroki[0]?.ocena).toBe('niedokladnosc');
  });
  it('FH NIS-004: akcja bez kwoty zakładu to błąd, nie „Zakład 0bb”', () => {
    expect(() => tekstAkcji(wariant(3), 0, 'fold', SZABLON, t)).toThrow(/kwot/i);
  });
  it('08-programista-005: komunikat nazywa rodzaj widoku (turn-bet)', () => {
    expect(() => tekstAkcji(wariant(3), 0, 'fold', SZABLON, t)).toThrow(/^turn-bet: akcja fold/);
  });
  it('nazwy akcji: „Zakład” z kwotą zakładu w bb z wariantu (play.bet), kwota nie w osobnej linii', () => {
    const p = punkt(3);
    const w = wariant(3);
    const mala = tekstAkcji(w, 0, 'bet-small', SZABLON, t);
    const duza = tekstAkcji(w, 0, 'bet-big', SZABLON, t);
    expect(mala.przycisk).toBe(t('play.bet', { bb: p.betSmall }));
    expect(duza.przycisk).toBe(t('play.bet', { bb: p.betBig }));
    expect(mala.nazwa).not.toMatch(/c-bet/i);
    expect(p.betSmall).toBeLessThan(p.betBig);
  });
  it('wyjaśnienia: błąd rozmiaru daje dwa bloki (słabszy: mały, lepszy: duży), zgodny — „dobrze” + „dlaczego nie” małego', () => {
    const w = wariant(3);
    const zle = bloki(w, SZABLON, 0, 'bet-small', t);
    expect(zle.map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual(['slabsza:bet-small', 'lepsza:bet-big']);
    const dobrze = bloki(w, SZABLON, 0, 'bet-big', t);
    expect(dobrze.map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual(['dobrze:bet-big', 'dlaczego_nie:bet-small']);
    expect(dobrze[0]!.tekst).toContain('duży zakład odbiera drawowi cenę');
  });
  it('„Liczby”: brak zdania zamiast zgadniętego (klucze i18n to zadanie dla 06/09)', () => {
    expect(zdaniaLiczb(sesja(3, ['bet-big']), 0, 'bet-big', t)).toEqual([]);
  });
});

describe('FG turn-bet — ekran', () => {
  it('decyzja: stół z czterema kartami, pula, dwa przyciski „Zakład Xbb”; wybór przekazuje bet-small / bet-big', async () => {
    const p = punkt(5);
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja(5, [])} faza="decyzja" koniec={false} onWybierz={onWybierz} {...propsFg()} />);
    expect(screen.getByText(t('play.potLabel', { bb: p.pot }))).toBeTruthy();
    const mala = screen.getByLabelText(t('play.bet', { bb: p.betSmall }));
    const duza = screen.getByLabelText(t('play.bet', { bb: p.betBig }));
    expect(mala.props.accessibilityRole).toBe('button');
    await fireEvent.press(mala);
    expect(onWybierz).toHaveBeenLastCalledWith('bet-small');
    await fireEvent.press(duza);
    expect(onWybierz).toHaveBeenLastCalledWith('bet-big');
  });
  for (const poprawna of [true, false]) {
    it(`ocena (${poprawna ? 'duży' : 'mały'} zakład): werdykt ${poprawna ? 'zgodne' : 'niedokładność'} i wyjaśnienie wybranego rozmiaru`, async () => {
      const wybor: Akcja = poprawna ? 'bet-big' : 'bet-small';
      await render(<PrzebiegScenariusza sesja={sesja(8, [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
      const ekran = tekstEkranu();
      expect(ekran).toContain(t(`grade.${poprawna ? 'zgodne' : 'niedokladnosc'}`));
      expect(ekran).toContain(poprawna ? 'duży zakład odbiera drawowi cenę' : 'mały zakład daje drawowi dobrą cenę');
      if (!poprawna) expect(ekran).toContain('duży zakład odbiera drawowi cenę'); // blok „lepsza”
    });
  }
});
