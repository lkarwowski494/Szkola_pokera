/// <reference types="jest" />
// IJ (P3 recenzji IH, 2c; D-1904 „Otwarte”): `styl.slowoStopnia` / `styl.tytul*` (`sufit`) i `krojKarty` w `theme/tokens.ts:79-80,108` czytają `PixelRatio.getFontScale()` i
// `Dimensions.get('window')` przy KAŻDYM dostępie (getter), nie raz przy imporcie modułu. Test dowodzi, że po zmianie okna (obrót, Dynamic Type) kolejny render daje nowy wynik.
// Granica: komponent bez subskrypcji okna nie renderuje się sam po zmianie — osobna kwestia (D-1912, przypadek brzegowy), nie błąd helpera.
import { Dimensions, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { act, render, screen } from '@testing-library/react-native';
import { styl } from '@/theme/tokens';

const ustaw = (szer: number, skala: number) => act(() => {
  const w = { width: szer, height: 844, scale: 3, fontScale: skala };
  Dimensions.set({ window: w, screen: w });
});
const rozmiar = () => StyleSheet.flatten(screen.getByText('x').props.style).fontSize as number;
function Podstawa() {
  useWindowDimensions();
  return <Text style={styl.slowoStopnia}>x</Text>;
}

describe('IJ: helpery modułowe tokens.ts czytane na żywo', () => {
  it('slowoStopnia: 390 pt / skala 1 → 34; po zmianie okna na 320 pt / AX5 → 34 ÷ 3,12 (sufit liczony od nowa)', async () => {
    await ustaw(390, 1);
    const { rerender } = await render(<Podstawa />);
    expect(rozmiar()).toBeCloseTo(34, 5);
    await ustaw(320, 3.12);
    await rerender(<Podstawa />);
    expect(rozmiar()).toBeCloseTo(34 / 3.12, 5);
    await ustaw(390, 1);
  });
  it('komponent z subskrypcją okna renderuje się sam po zmianie (useWindowDimensions) i bierze nowy wynik helpera bez ponownego montowania', async () => {
    await ustaw(390, 1);
    await render(<Podstawa />);
    expect(rozmiar()).toBeCloseTo(34, 5);
    await ustaw(320, 3.12);
    expect(rozmiar()).toBeCloseTo(34 / 3.12, 5);
    await ustaw(390, 1);
  });
  it('granica (D-1912): komponent bez subskrypcji okna nie renderuje się po zmianie sam', async () => {
    await ustaw(390, 1);
    function Bez() { return <Text style={styl.slowoStopnia}>x</Text>; }
    await render(<Bez />);
    expect(rozmiar()).toBeCloseTo(34, 5);
    await ustaw(320, 3.12);
    expect(rozmiar()).toBeCloseTo(34, 5); // stary wynik do następnego renderu rodzica
    await ustaw(390, 1);
  });
});
