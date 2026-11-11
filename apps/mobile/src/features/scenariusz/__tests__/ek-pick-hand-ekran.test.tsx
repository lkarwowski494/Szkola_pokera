/// <reference types="jest" />
// KO-072 (SC-23a/b): widok punktu pick-hand (wybór jednej z dwóch rąk) z istniejących komponentów: stół z pięcioma kartami, dwie ręce-kandydaci, przyciski z kartami rąk,
// ocena: poprawna ręka zgodna, druga niedokładność (D-1054). Nowy wygląd (makieta 04) i zdania „Liczby” (SDV/V/F, nowe klucze i18n) to zadania dla 04 i 06/09.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { cardToString, generateVariant, type PickHandVariantDecision, type ScenarioVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { bloki, naGenerator, ocenyAkcji, poprawnaAkcja, widokDecyzji, type Akcja } from '../wariant';
import i18n from '@/i18n';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const SZABLON = {
  id: 'sc-fx-pick-hand', module: 'm8', situation: 'Fixture.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { draws: [], reject: [], expected: ['best-hand'] } },
  decisions: [{
    street: 'river', kind: 'pick-hand', calc: 'bluff.share.bet-half', mode: 'blockers',
    calls: ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AKo', 'AQs'], folds: ['98s', '87s', '76s', '65s', 'T9s', 'J9s', 'QJs'],
    actions: [
      { action: 'hand-a', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}: ta ręka blokuje sprawdzające.' },
      { action: 'hand-b', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}: ta ręka zasłania pasujące.' },
    ],
  }],
} as unknown as ScenarioTemplate;
const wariant = (ziarno: number): ScenarioVariant => generateVariant(naGenerator(SZABLON), 'latwy', ziarno);
const punkt = (w: ScenarioVariant): PickHandVariantDecision => {
  const p = w.points[0]!;
  if (p.point !== 'pick-hand') throw new Error('nie pick-hand');
  return p;
};
const sesja = (w: ScenarioVariant, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon: SZABLON, poziom: 'latwy', wariant: w, wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: SZABLON.id } },
} as unknown as SesjaScenariusza);
const props = { bladZapisu: false, onDalej: jest.fn(), onZakoncz: jest.fn() };
const reka = (h: readonly [number, number]) => h.map(cardToString).join(' ');

describe('KO-072: pick-hand — logika widoku', () => {
  it('akcje, poprawna akcja i oceny: poprawna ręka zgodna, druga niedokładność', () => {
    for (let z = 1; z <= 40; z++) {
      const w = wariant(z);
      const p = punkt(w);
      expect(poprawnaAkcja(p)).toBe(p.correct);
      const o = ocenyAkcji(w, 0);
      const druga: Akcja = p.correct === 'hand-a' ? 'hand-b' : 'hand-a';
      expect(o[p.correct]).toBe('zgodne');
      expect(o[druga]).toBe('niedokladnosc');
      expect(widokDecyzji(w, 0).stol).toHaveLength(5);
      expect(widokDecyzji(w, 0).ulica).toBe('river');
    }
  });
  it('wyjaśnienia: {{w:reka}} to ręka tej akcji (A albo B), nie zawsze pierwsza', () => {
    const w = wariant(3);
    const p = punkt(w);
    const b = bloki(w, SZABLON, 0, p.correct, t);
    const tekst = b.find((x) => x.akcja === 'hand-b')?.tekst ?? '';
    expect(tekst).toContain(`[[${reka(p.hands[1])}]]`);
    expect(b.find((x) => x.akcja === 'hand-a')?.tekst ?? '').toContain(`[[${reka(p.hands[0])}]]`);
  });
});

describe('KO-072: pick-hand — ekran', () => {
  it('decyzja: dwie ręce-kandydaci i dwa przyciski z kartami; wybór przekazuje hand-a / hand-b', async () => {
    const w = wariant(5);
    const p = punkt(w);
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja(w, [])} faza="decyzja" koniec={false} onWybierz={onWybierz} {...props} />);
    expect(screen.getByTestId('pick-hand-rece')).toBeTruthy();
    await fireEvent.press(screen.getByText(reka(p.hands[1])));
    expect(onWybierz).toHaveBeenCalledWith('hand-b');
    await fireEvent.press(screen.getByText(reka(p.hands[0])));
    expect(onWybierz).toHaveBeenCalledWith('hand-a');
  });
  for (const wybierzPoprawna of [true, false]) {
    it(`ocena (${wybierzPoprawna ? 'poprawna' : 'druga'} ręka): ekran pokazuje werdykt i wyjaśnienie wybranej ręki`, async () => {
      const w = wariant(8);
      const p = punkt(w);
      const wybor: Akcja = wybierzPoprawna ? p.correct : p.correct === 'hand-a' ? 'hand-b' : 'hand-a';
      await render(<PrzebiegScenariusza sesja={sesja(w, [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...props} />);
      const ekran = tekstEkranu();
      expect(ekran).toContain(t(`grade.${wybierzPoprawna ? 'zgodne' : 'niedokladnosc'}`));
      expect(ekran).toContain(wybor === 'hand-a' ? 'blokuje sprawdzające' : 'zasłania pasujące');
    });
  }
});
