/// <reference types="jest" />
// FG (08-N4, D-1142, SC-10): widok punktu list-hand (preflop, akcja z jawnej listy klas rąk) z istniejących komponentów: ręka gracza przy stole, opis sytuacji szablonu,
// przyciski z akcji szablonu (zbiór akcji niesie szablon, nie wariant; zamknięte słownictwo AKCJE_LISTY). Ocena: akcja poprawna zgodna, dopuszczalna z wpisu listy dopuszczalna, inna błąd.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { type ListHandVariantDecision, type ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza, tekstAkcji } from '../EkranScenariusza';
import { AKCJE_LISTY, akcjePunktu, bloki, grafPunktow, jestAkcja, ocenyAkcji, poprawnaAkcja, przebiegWariantu, widokDecyzji, type Akcja } from '../wariant';
import { zdaniaLiczb } from '../liczby';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const SYTUACJA = 'Fixture: otwierasz z BTN, CO przebija (3-bet).';
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-fx-lista', module: 'm4', situation: SYTUACJA, table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy', 'sredni'],
  bounds: { latwy: { expected: ['4bet'] }, sredni: { expected: ['call'] } },
  decisions: [{
    street: 'preflop', kind: 'list-hand', rule: 'R-M4-004',
    entries: [
      { hands: ['AA', 'KK'], correct: '4bet' },
      { hands: ['AKs', 'AKo'], correct: '4bet', acceptable: ['call'] },
      { hands: ['JJ', 'TT'], correct: 'call' },
    ],
    actions: [
      { action: '4bet', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, to ręka do 4-betu.' },
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, to ręka do sprawdzenia.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, pas.' },
    ],
  }],
});
const spec = SZABLON.decisions[0]!;
const wariant = (z: number, poziom: ScenarioLevel = 'latwy') => wariantFg(SZABLON, poziom, z);
const punkt = (z: number, poziom: ScenarioLevel = 'latwy'): ListHandVariantDecision => {
  const p = wariant(z, poziom).points[0]!;
  if (p.point !== 'list-hand') throw new Error('nie list-hand');
  return p;
};
const sesja = (z: number, wybory: Akcja[], poziom: ScenarioLevel = 'latwy') => sesjaFg(SZABLON, poziom, wariant(z, poziom), wybory);
/** Ziarno łatwego poziomu z ręką z wpisu z akcją dopuszczalną (AKs/AKo) albo bez niej (AA/KK). */
const ziarnoZ = (dopuszczalna: boolean): number => Array.from({ length: 200 }, (_, i) => i + 1).find((z) => (punkt(z).acceptable.length > 0) === dopuszczalna)!;

describe('FG list-hand — logika widoku', () => {
  it('zbiór akcji z szablonu, w stałej kolejności (pas, sprawdzenie, 4-bet); bez szablonu głośny błąd, nie zgadnięty zbiór', () => {
    expect(akcjePunktu(punkt(1), spec)).toEqual(['fold', 'call', '4bet']);
    expect(() => akcjePunktu(punkt(1))).toThrow(/list-hand.*szablon/);
  });
  it('akcja spoza słownictwa ekranu to błąd z nazwą akcji (bramka budowania odrzuca ją wcześniej)', () => {
    const obca = { ...spec, actions: [...spec.actions, { action: 'squeeze', explanation: 'x' }] } as typeof spec;
    expect(() => akcjePunktu(punkt(1), obca)).toThrow(/squeeze/);
  });
  it('słownictwo listy: przypięcie (to samo literalnie w bramce budowania) i rozpoznanie 4bet jako akcji z bazy', () => {
    expect([...AKCJE_LISTY]).toEqual(['fold', 'check', 'call', 'limp', 'raise', '4bet', 'all-in']);
    expect(jestAkcja('4bet')).toBe(true);
  });
  it('poprawna akcja z wariantu; oceny: poprawna zgodna, dopuszczalna dopuszczalna, inna błąd', () => {
    const p = punkt(ziarnoZ(true));
    expect(p.correct).toBe('4bet');
    expect(poprawnaAkcja(p)).toBe('4bet');
    const o = ocenyAkcji(wariant(ziarnoZ(true)), 0, SZABLON);
    expect(o).toEqual({ fold: 'blad', call: 'dopuszczalne', '4bet': 'zgodne' });
    expect(ocenyAkcji(wariant(ziarnoZ(false)), 0, SZABLON)).toEqual({ fold: 'blad', call: 'blad', '4bet': 'zgodne' });
  });
  it('poziom wybiera akcję oczekiwaną: średni call', () => {
    for (let z = 1; z <= 10; z++) expect(punkt(z, 'sredni').correct).toBe('call');
  });
  it('widok: preflop, pusty stół, bez puli', () => {
    const w = widokDecyzji(wariant(2), 0);
    expect(w).toMatchObject({ ulica: 'preflop', stol: [], pulaBb: null, doSprawdzeniaBb: null });
  });
  it('graf i przebieg: każda akcja kończy rozdanie; przebieg ocenia wybór (4bet zgodne, call dopuszczalne, fold błąd)', () => {
    const z = ziarnoZ(true);
    const w = wariant(z);
    expect(grafPunktow(w, SZABLON)[0]!.map((a) => `${a.akcja}>${a.dalej}`)).toEqual(['fold>koniec', 'call>koniec', '4bet>koniec']);
    const oc = (a: Akcja) => { const r = przebiegWariantu(w, [a], SZABLON); return r.ok ? r.wartosc.kroki[0]?.ocena : null; };
    expect([oc('4bet'), oc('call'), oc('fold')]).toEqual(['zgodne', 'dopuszczalne', 'blad']);
  });
  it('nazwy akcji: pas, sprawdzenie, 4-bet (nowy klucz scenario.action.fourBet), bez kwot', () => {
    const w = wariant(2);
    expect(tekstAkcji(w, 0, '4bet', SZABLON, t)).toMatchObject({ nazwa: t('scenario.action.fourBet'), kwota: null });
    expect(t('scenario.action.fourBet')).toBe('4-bet');
    expect(tekstAkcji(w, 0, 'call', SZABLON, t).kwota).toBeNull();
    expect(tekstAkcji(w, 0, 'fold', SZABLON, t).kwota).toBeNull();
  });
  it('wyjaśnienia: błąd to „słabsza” + „lepsza”, zgodna to „dobrze” + „dlaczego nie” pozostałych akcji', () => {
    const w = wariant(ziarnoZ(false));
    expect(bloki(w, SZABLON, 0, 'fold', t).map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual(['slabsza:fold', 'lepsza:4bet']);
    const dobrze = bloki(w, SZABLON, 0, '4bet', t);
    expect(dobrze.map((b) => `${b.rodzaj}:${b.akcja}`)).toEqual(['dobrze:4bet', 'dlaczego_nie:fold', 'dlaczego_nie:call']);
    expect(dobrze[0]!.tekst).toContain('to ręka do 4-betu');
  });
  it('„Liczby”: brak zdania (ocena z listy, bez rachunku)', () => {
    expect(zdaniaLiczb(sesja(2, ['4bet']), 0, '4bet', t)).toEqual([]);
  });
});

describe('FG list-hand — ekran', () => {
  it('decyzja: opis sytuacji szablonu, ręka gracza, trzy przyciski; wybór przekazuje akcję (w tym 4bet)', async () => {
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja(5, [])} faza="decyzja" koniec={false} onWybierz={onWybierz} {...propsFg()} />);
    expect(screen.getByText(SYTUACJA)).toBeTruthy();
    expect(screen.getByTestId('list-hand-sytuacja')).toBeTruthy();
    const przyciski = screen.getAllByRole('button');
    for (const [wzor, akcja] of [[/^Pas/i, 'fold'], [/^Sprawdzenie/i, 'call'], [/^4-bet/i, '4bet']] as const) {
      await fireEvent.press(przyciski.find((b) => wzor.test(String(b.props.accessibilityLabel ?? '')))!);
      expect(onWybierz).toHaveBeenLastCalledWith(akcja);
    }
    expect(onWybierz).toHaveBeenCalledTimes(3);
  });
  it('EP-004: w tekście ekranu nie ma surowego zapisu kart („Ah Kd”)', async () => {
    await render(<PrzebiegScenariusza sesja={sesja(5, [])} faza="decyzja" koniec={false} onWybierz={jest.fn()} {...propsFg()} />);
    expect(screen.queryByText(/\b[2-9TJQKA][hdcs]\b/)).toBeNull();
  });
  for (const [opis, wybor, ocena, tekst] of [['zgodna', '4bet', 'zgodne', 'to ręka do 4-betu'], ['błędna', 'fold', 'blad', 'pas']] as const) {
    it(`ocena (${opis} akcja): werdykt i wyjaśnienie wybranej akcji`, async () => {
      await render(<PrzebiegScenariusza sesja={sesja(ziarnoZ(false), [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
      const ekran = tekstEkranu();
      expect(ekran).toContain(t(`grade.${ocena}`));
      expect(ekran).toContain(tekst);
    });
  }
  it('ocena akcji dopuszczalnej: werdykt „dopuszczalne”', async () => {
    await render(<PrzebiegScenariusza sesja={sesja(ziarnoZ(true), ['call'])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
    expect(tekstEkranu()).toContain(t('grade.dopuszczalne'));
  });
});
