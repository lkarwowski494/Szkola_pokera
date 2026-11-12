/// <reference types="jest" />
// FR (KO-091, D-1450-seria): widok punktu river-value (bet albo czekanie na riverze z overparą wobec zakresu sprawdzającego; R-M8-001, D-1302) z istniejących komponentów.
// Nazwa „Zakład (bet)” z `scenario.action.bet` (FM, D-1430), bez kwoty (wariant nie niesie zakładu ani puli), czekanie z `scenario.action.check`.
// Poprawna akcja = `correct` wariantu, druga to błąd (rachunek z dwiema akcjami, jak draw-call). „Liczby” (W, L, w): brak zdania do czasu kluczy 06/09.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { RiverValueVariantDecision, ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza, tekstAkcji } from '../EkranScenariusza';
import { akcjePunktu, bloki, grafPunktow, jestAkcja, kwotaAkcji, ocenyAkcji, poprawnaAkcja, przebiegWariantu, widokDecyzji, type Akcja } from '../wariant';
import { zdaniaLiczb } from '../liczby';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const POZIOM: ScenarioLevel = 'latwy';
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-fx-river-value', module: 'm8', situation: 'Fixture: river z pozycji.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { draws: [], marginMin: 0.05, expected: ['bet'] } },
  decisions: [{
    street: 'river', kind: 'river-value', rule: 'R-M4-004',
    calls: ['AJs', 'AJo', 'KJs', 'KJo', 'JTs', 'JTo', 'J9s', 'J9o', '88', '55', 'AKs', 'AKo', 'AQs', 'AQo', 'KQs', 'KQo'],
    folds: ['76s', '65s', '54s', 'T9s', '98s'], pairKind: ['overpair'], dryBoard: true,
    actions: [
      { action: 'bet', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, więcej sprawdzających rąk jest gorszych od twojej niż lepszych.' },
      { action: 'check', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, sprawdzą głównie lepsze ręce.' },
    ],
  }],
});
const wariant = (z: number) => wariantFg(SZABLON, POZIOM, z);
const punkt = (z: number): RiverValueVariantDecision => {
  const p = wariant(z).points[0]!;
  if (p.point !== 'river-value') throw new Error('nie river-value');
  return p;
};
const sesja = (z: number, wybory: Akcja[]) => sesjaFg(SZABLON, POZIOM, wariant(z), wybory);
const wielka = (x: string) => x.charAt(0).toLocaleUpperCase() + x.slice(1);
const inna = (a: Akcja): Akcja => (a === 'bet' ? 'check' : 'bet');

describe('FR river-value — logika widoku', () => {
  it('akcje: czekanie i zakład; `bet` jest akcją ekranu (walidacja wyboru z bazy)', () => {
    expect(jestAkcja('bet')).toBe(true);
    for (let z = 1; z <= 20; z++) {
      const p = punkt(z);
      expect(akcjePunktu(p)).toEqual(['check', 'bet']);
      expect(poprawnaAkcja(p)).toBe(p.correct);
    }
  });
  it('oceny: poprawna zgodne, druga błąd', () => {
    for (let z = 1; z <= 20; z++) {
      const p = punkt(z);
      const o = ocenyAkcji(wariant(z), 0);
      expect(o[p.correct]).toBe('zgodne');
      expect(o[inna(p.correct)]).toBe('blad');
    }
  });
  it('widok: river, pięć kart stołu, bez puli i „do sprawdzenia” (wariant ich nie niesie); bez kwoty zakładu', () => {
    const w = widokDecyzji(wariant(3), 0);
    expect(w.ulica).toBe('river');
    expect(w.stol).toHaveLength(5);
    expect([w.pulaBb, w.doSprawdzeniaBb]).toEqual([null, null]);
    expect(kwotaAkcji(punkt(3), 'bet', SZABLON)).toBeNull();
  });
  it('graf i przebieg: obie akcje kończą rozdanie, przebieg ocenia wybór', () => {
    const p = punkt(3);
    expect(grafPunktow(wariant(3))[0]!.map((a) => a.dalej)).toEqual(['koniec', 'koniec']);
    const r = przebiegWariantu(wariant(3), [p.correct]);
    expect(r.ok && r.wartosc.kroki[0]?.ocena).toBe('zgodne');
    const r2 = przebiegWariantu(wariant(3), [inna(p.correct)]);
    expect(r2.ok && r2.wartosc.kroki[0]?.ocena).toBe('blad');
  });
  it('nazwy akcji: „Zakład (bet)” z scenario.action.bet bez kwoty, „Czekanie” z scenario.action.check', () => {
    const w = wariant(3);
    const zakl = tekstAkcji(w, 0, 'bet', SZABLON, t);
    expect(zakl.nazwa).toBe(wielka(t('scenario.action.bet')));
    expect([zakl.kwota, zakl.przycisk, zakl.fraza]).toEqual([null, zakl.nazwa, t('scenario.action.bet')]);
    expect(tekstAkcji(w, 0, 'check', SZABLON, t).nazwa).toBe(wielka(t('scenario.action.check')));
  });
  it('wyjaśnienia: błąd daje dwa bloki (twoja słabsza, lepsza poprawna), zgodny — „dobrze” + „dlaczego nie” drugiej', () => {
    const p = punkt(3);
    const zle = bloki(wariant(3), SZABLON, 0, inna(p.correct), t);
    expect(zle.map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual([`slabsza:${inna(p.correct)}`, `lepsza:${p.correct}`]);
    const dobrze = bloki(wariant(3), SZABLON, 0, p.correct, t);
    expect(dobrze.map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual([`dobrze:${p.correct}`, `dlaczego_nie:${inna(p.correct)}`]);
  });
  it('„Liczby”: brak zdania zamiast zgadniętego (klucze i18n dla W, L, w to zadanie 06/09)', () => {
    expect(zdaniaLiczb(sesja(3, ['bet']), 0, 'bet', t)).toEqual([]);
  });
});

describe('FR river-value — ekran', () => {
  it('decyzja: pięć kart stołu, bez wiersza puli, dwa przyciski; wybór przekazuje check / bet', async () => {
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja(5, [])} faza="decyzja" koniec={false} onWybierz={onWybierz} {...propsFg()} />);
    expect(tekstEkranu()).not.toMatch(/W puli|Pula/);
    const zakl = screen.getByRole('button', { name: new RegExp(`^${wielka(t('scenario.action.bet')).replace(/[()]/g, '\\$&')}$`) });
    const czek = screen.getByRole('button', { name: new RegExp(`^${wielka(t('scenario.action.check')).replace(/[()]/g, '\\$&')}$`) });
    await fireEvent.press(zakl);
    expect(onWybierz).toHaveBeenLastCalledWith('bet');
    await fireEvent.press(czek);
    expect(onWybierz).toHaveBeenLastCalledWith('check');
  });
  for (const poprawna of [true, false]) {
    it(`ocena (${poprawna ? 'poprawna' : 'błędna'} akcja): werdykt ${poprawna ? 'zgodne' : 'błąd'}, wyjaśnienie wybranej akcji, bez sekcji „Liczby”`, async () => {
      const p = punkt(8);
      const wybor: Akcja = poprawna ? p.correct : inna(p.correct);
      await render(<PrzebiegScenariusza sesja={sesja(8, [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
      const ekran = tekstEkranu();
      expect(ekran).toContain(t(`grade.${poprawna ? 'zgodne' : 'blad'}`));
      expect(ekran).toContain(wybor === 'bet' ? 'więcej sprawdzających rąk jest gorszych' : 'sprawdzą głównie lepsze ręce');
      expect(screen.queryByTestId('liczby')).toBeNull();
    });
  }
});
