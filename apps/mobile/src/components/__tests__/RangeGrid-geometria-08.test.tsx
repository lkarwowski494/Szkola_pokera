/// <reference types="jest" />
// M2-koordynator-napraw-006 (KO-132, D-2020; wynik roli 04, sekcja 2.3–2.5): etykieta ręki w siatce lekcji jest rysunkiem:
// bez skalowania przez RN (allowFontScaling=false), rozmiar z `wymiaryEtykietySiatki(pole, skala)`, pole = szerokość siatki z `onLayout` / 13.
// Jest nie mierzy układu: tu właściwości `Text` i `View`; wygląd na zrzucie z telefonu (T-SIATKA).
import '@/i18n';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Dimensions, StyleSheet } from 'react-native';
import { RangeGrid } from '@/components/RangeGrid';
import { wymiaryEtykietySiatki } from '@/theme/skalowanie';
import { odstep } from '@/theme/tokens';
import type { RangeSpot } from '@/data/content/repo';

const okno = (szer: number, skala: number) => jest.spyOn(Dimensions, 'get').mockReturnValue({ width: szer, height: 844, scale: 3, fontScale: skala });
afterEach(() => jest.restoreAllMocks());

const spot: RangeSpot = { id: 'x', title: 'Tytuł', hero: 'BB', path: '', playPercent: 0.4, groups: [], uncertain: ['T2s'] };
const stylEtykiety = (hc: string) => StyleSheet.flatten(screen.getByText(hc).props.style) as { fontSize: number; lineHeight: number };

describe('RangeGrid: etykieta ręki jako rysunek (allowFontScaling=false, rozmiar z wymiaryEtykietySiatki)', () => {
  it.each([288, 358, 398])('siatka %d pt: fontSize i lineHeight = wymiaryEtykietySiatki(szerokość / 13, skala) dla skali 1 i 3,12', async (szer) => {
    for (const skala of [1, 3.12]) {
      okno(szer + 2 * odstep.l, skala);
      const { unmount } = await render(<RangeGrid spot={spot} />);
      await fireEvent(screen.getByTestId('siatka-zakresu'), 'layout', { nativeEvent: { layout: { x: 0, y: 0, width: szer, height: szer } } });
      const oczekiwane = wymiaryEtykietySiatki(szer / 13, skala);
      for (const hc of ['AA', 'T2s', '72o']) {
        const e = screen.getByText(hc);
        expect(e.props.allowFontScaling).toBe(false);
        expect(e.props.numberOfLines).toBe(1);
        expect(stylEtykiety(hc).fontSize).toBeCloseTo(oczekiwane.fontSize, 5);
        expect(stylEtykiety(hc).lineHeight).toBeCloseTo(oczekiwane.lineHeight, 5);
      }
      await unmount();
      jest.restoreAllMocks();
    }
  });

  it('przed pierwszym pomiarem pole = (szerokość okna − 2 × odstep.l) / 13; przy skali 3,12 rozmiar rośnie do granicy pola', async () => {
    okno(390, 3.12);
    await render(<RangeGrid spot={spot} />);
    const oczekiwane = wymiaryEtykietySiatki((390 - 2 * odstep.l) / 13, 3.12);
    expect(stylEtykiety('AA').fontSize).toBeCloseTo(oczekiwane.fontSize, 5);
    expect(oczekiwane.fontSize).toBeGreaterThan(8);
  });

  it('zmiana skali tekstu w Ustawieniach (useWindowDimensions) przelicza rozmiar etykiety', async () => {
    await act(() => Dimensions.set({ window: { width: 390, height: 844, scale: 3, fontScale: 1 }, screen: { width: 390, height: 844, scale: 3, fontScale: 1 } }));
    await render(<RangeGrid spot={spot} />);
    const przed = stylEtykiety('AA').fontSize;
    await act(() => Dimensions.set({ window: { width: 390, height: 844, scale: 3, fontScale: 3.12 }, screen: { width: 390, height: 844, scale: 3, fontScale: 3.12 } }));
    expect(stylEtykiety('AA').fontSize).toBeGreaterThan(przed);
  });

  it('kropka klasy niepewnej jest ukryta przed czytnikiem ekranu (znaczenie niesie legenda „mieszana”)', async () => {
    okno(390, 1);
    await render(<RangeGrid spot={spot} />);
    const k = screen.getByTestId('kropka-T2s', { includeHiddenElements: true });
    expect(k.props.accessibilityElementsHidden).toBe(true);
    expect(k.props.importantForAccessibility).toBe('no');
  });
});
