/// <reference types="jest" />
// FG (08-N2, D-1144, SC-07/15/17): widok punktu defend (obrona BB wobec c-betu na flopie) z istniejących komponentów: jak draw-call na flopie (pula i zakład rywala, pas albo
// sprawdzenie, ruch rywala w dzienniku), trzy karty flopu, ręka z zakresu obrony. Ocena: poprawna akcja zgodna, druga błąd (`defendVsCbet`, jak draw-call).
// Kontekst generatora (zakres obrony) z bazy treści: `getKontekstGeneratora`, jak w ekranie.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { DefendVariantDecision, ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
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
  id: 'sc-fx-defend', module: 'm6', situation: 'Fixture: obrona BB wobec c-betu.', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 100, levels: ['latwy', 'sredni'],
  bounds: { latwy: { expected: ['call'] }, sredni: { expected: ['fold'] } },
  decisions: [{
    street: 'flop', kind: 'defend', rule: 'R-M4-004', spot: 'vs-open.bb-vs-btn', pots: [6, 9], fractions: [0.33],
    actions: [
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ta ręka ma dość, żeby sprawdzić mały zakład.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ta ręka nie ma dość, żeby sprawdzić.' },
    ],
  }],
});
const ctx = getKontekstGeneratora(dbCn, SZABLON);
const wariant = (z: number, poziom: ScenarioLevel = 'latwy') => wariantFg(SZABLON, poziom, z, ctx);
const punkt = (z: number, poziom: ScenarioLevel = 'latwy'): DefendVariantDecision => {
  const p = wariant(z, poziom).points[0]!;
  if (p.point !== 'defend') throw new Error('nie defend');
  return p;
};
const sesja = (z: number, wybory: Akcja[], poziom: ScenarioLevel = 'latwy') => sesjaFg(SZABLON, poziom, wariant(z, poziom), wybory);
const druga = (a: 'call' | 'fold'): Akcja => (a === 'call' ? 'fold' : 'call');

describe('FG defend — logika widoku', () => {
  it('akcje pas i sprawdzenie; poprawna akcja wariantu; oceny: poprawna zgodna, druga błąd', () => {
    for (let z = 1; z <= 30; z++) {
      const p = punkt(z);
      expect(akcjePunktu(p)).toEqual(['fold', 'call']);
      expect(poprawnaAkcja(p)).toBe(p.correct);
      const o = ocenyAkcji(wariant(z), 0);
      expect(o[p.correct]).toBe('zgodne');
      expect(o[druga(p.correct)]).toBe('blad');
    }
  });
  it('poziom wybiera rozstrzygnięcie: łatwy call, średni fold', () => {
    for (let z = 1; z <= 10; z++) {
      expect(punkt(z, 'latwy').correct).toBe('call');
      expect(punkt(z, 'sredni').correct).toBe('fold');
    }
  });
  it('widok: ulica flop, trzy karty stołu, pula po zakładzie rywala i dopłata = zakład', () => {
    const p = punkt(4);
    const w = widokDecyzji(wariant(4), 0);
    expect(w.ulica).toBe('flop');
    expect(w.stol).toHaveLength(3);
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
  it('nazwy akcji: pas bez kwoty, sprawdzenie z kwotą zakładu', () => {
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
    expect(dobrze[0]!.tekst).toContain('ma dość, żeby sprawdzić mały zakład');
  });
  it('„Liczby”: brak zdania zamiast zgadniętego (klucze i18n to zadanie dla 06/09)', () => {
    expect(zdaniaLiczb(sesja(4, ['call']), 0, 'call', t)).toEqual([]);
  });
});

describe('FG defend — ekran', () => {
  it('decyzja: flop, pula i kwota do sprawdzenia, ruch rywala w dzienniku, przyciski pas/sprawdzenie przekazują akcję', async () => {
    const p = punkt(5);
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja(5, [])} faza="decyzja" koniec={false} onWybierz={onWybierz} {...propsFg()} />);
    const ekran = tekstEkranu();
    expect(ekran).toContain(t('scenario.pot', { pula: p.pot + p.bet, kwota: p.bet }));
    expect(ekran).toMatch(new RegExp(`BTN: zakład.* ${p.bet} bb`)); // ruch rywala (term „zakład” z objaśnieniem przy pierwszym użyciu)
    const przyciski = screen.getAllByRole('button');
    const pas = przyciski.find((b) => /^Pas/i.test(String(b.props.accessibilityLabel ?? '')))!;
    await fireEvent.press(pas);
    expect(onWybierz).toHaveBeenLastCalledWith('fold');
    await fireEvent.press(przyciski.find((b) => /^Sprawdzenie/i.test(String(b.props.accessibilityLabel ?? '')))!);
    expect(onWybierz).toHaveBeenLastCalledWith('call');
  });
  for (const poprawna of [true, false]) {
    it(`ocena (${poprawna ? 'poprawna' : 'druga'} akcja): werdykt i wyjaśnienie wybranej akcji`, async () => {
      const wybor: Akcja = poprawna ? 'call' : 'fold';
      await render(<PrzebiegScenariusza sesja={sesja(3, [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
      const ekran = tekstEkranu();
      expect(ekran).toContain(t(`grade.${poprawna ? 'zgodne' : 'blad'}`));
      expect(ekran).toContain(poprawna ? 'ma dość, żeby sprawdzić mały zakład' : 'nie ma dość, żeby sprawdzić');
    });
  }
});
